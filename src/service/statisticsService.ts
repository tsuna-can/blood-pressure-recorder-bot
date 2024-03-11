import { deleteInProgressRecord, getAverageByUserId } from '../d1/d1'

const handleStatistics = async (DB: D1Database, userId: string) => {
  const deleteResult = await deleteInProgressRecord(DB, userId)
  const average = await getAverageByUserId(DB, userId)
  const systolic = average?.systolic
  const diastolic = average?.diastolic

  if (systolic !== undefined || diastolic !== undefined) {
    return `平均値を表示します\nSystolic : ${systolic}\nDiastolic : ${diastolic}`
  }

  return 'No data'
}

export { handleStatistics }
