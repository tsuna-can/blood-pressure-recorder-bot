import {
  deleteInProgressRecord,
  getBloodPressureRecordsByUserId,
} from '../d1/d1'

const handleDisplayAll = async (DB: D1Database, userId: string) => {
  const deleteResult = await deleteInProgressRecord(DB, userId)
  const records = await getBloodPressureRecordsByUserId(DB, userId)

  const result = records
    .map(
      record => `${record.date}, ${record.systolicBP}, ${record.diastolicBP}`,
    )
    .join('\n')

  return `Date, Systolic, Diastolic\n${result}`
}

export { handleDisplayAll }
