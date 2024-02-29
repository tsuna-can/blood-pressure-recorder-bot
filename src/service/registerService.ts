import { MESSAGE, ERROR } from '../util/constants'
import { format } from 'date-fns'
import {
  deleteInProgressRecord,
  createInProgressRecord,
  getInProgressRecord,
  updateDiastolic,
  updateSysotolic,
  createBloodPressureRecord,
} from '../d1/d1'

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
  if (isNaN(Number(text))) {
    return ERROR.NOT_NUMERIC
  }

  const inProgressRecord = await getInProgressRecord(DB, userId)
  if (inProgressRecord === null || inProgressRecord === undefined) {
    console.error('inProgressRecord is null')
    return ERROR.DEFAULT_ERROR
  }

  const sysotolic = inProgressRecord.systolicBP
  const diastolic = inProgressRecord.diastolicBP
  const date = inProgressRecord.date || format(new Date(), 'yyyy-MM-dd')

  if (sysotolic === null) {
    const updateResult = await updateSysotolic(DB, userId, text)
    return updateResult ? MESSAGE.REGISTER_DIASTOLIC : ERROR.DEFAULT_ERROR
  } else if (diastolic === null) {
    const updateResult = await updateDiastolic(DB, userId, text)
    createBloodPressureRecord(DB, userId, Number(text), sysotolic, date)
    deleteInProgressRecord(DB, userId)
    return updateResult ? MESSAGE.REGISTER_DONE : ERROR.DEFAULT_ERROR
  } else {
    console.error('inProgressRecord status is invalid')
    return ERROR.DEFAULT_ERROR
  }
}

export { handleStartRegister, handleRegister }
