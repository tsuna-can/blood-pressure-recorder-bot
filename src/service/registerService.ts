import { format } from 'date-fns'
import {
  createBloodPressureRecord,
  createInProgressRecord,
  deleteInProgressRecord,
  getInProgressRecord,
  updateSysotolic,
} from '../d1/d1'
import { ERROR, MESSAGE } from '../util/constants'

const handleStartRegister = async (
  DB: D1Database,
  userId: string,
): Promise<string> => {
  const deleteResult = await deleteInProgressRecord(DB, userId)
  if (!deleteResult) return ERROR.DEFAULT_ERROR

  const insertResult = await createInProgressRecord(DB, userId)
  return insertResult ? MESSAGE.REGISTER_SYSTOLIC : ERROR.DEFAULT_ERROR
}

const handleRegister = async (
  DB: D1Database,
  userId: string,
  text: string,
): Promise<string> => {
  // Validate input
  if (Number.isNaN(Number(text))) {
    return ERROR.NOT_NUMERIC
  }

  const inProgressRecord = await getInProgressRecord(DB, userId)
  if (inProgressRecord === null || inProgressRecord === undefined) {
    console.error('inProgressRecord is null')
    return ERROR.DEFAULT_ERROR
  }

  const inProgressSysotolic = inProgressRecord.systolicBP
  const inProgressDiastolic = inProgressRecord.diastolicBP
  const date = inProgressRecord.date || format(new Date(), 'yyyy-MM-dd')

  // Register systolic as temp data
  if (inProgressSysotolic === null) {
    const updateResult = await updateSysotolic(DB, userId, text)
    return updateResult ? MESSAGE.REGISTER_DIASTOLIC : ERROR.DEFAULT_ERROR
  }

  // Register record
  if (inProgressDiastolic === null) {
    const diastolic = Number(text)
    const createResult = await createBloodPressureRecord(
      DB,
      userId,
      diastolic,
      inProgressSysotolic,
      date,
    )
    await deleteInProgressRecord(DB, userId)
    return createResult
      ? `${MESSAGE.REGISTER_DONE}\nSystolic : ${inProgressSysotolic}\nDiastolic : ${diastolic}`
      : ERROR.DEFAULT_ERROR
  }

  console.error('inProgressRecord status is invalid')
  return ERROR.DEFAULT_ERROR
}

export { handleStartRegister, handleRegister }
