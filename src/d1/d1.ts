import { drizzle } from 'drizzle-orm/d1'
import { bloodPressureRecords, inProgressBloodPressureRecords } from './schema'
import { eq } from 'drizzle-orm'

const deleteInProgressRecord = async (DB: D1Database, userId: string) => {
  const results = await DB.prepare(
    `DELETE FROM in_progress_blood_pressure_records WHERE user_id = ?`,
  )
    .bind(userId)
    .run()
  return results.success
}

const createInProgressRecord = async (
  DB: D1Database,
  userId: string,
): Promise<boolean> => {
  const results = await drizzle(DB)
    .insert(inProgressBloodPressureRecords)
    .values({
      userId,
    })
    .run()
  return results.success
}

const getInProgressRecord = async (DB: D1Database, userId: string) => {
  const results = await drizzle(DB)
    .select()
    .from(inProgressBloodPressureRecords)
    .where(eq(inProgressBloodPressureRecords.userId, userId))
    .get()
  return results
}

const updateSysotolic = async (
  DB: D1Database,
  userId: string,
  text: string,
): Promise<boolean> => {
  const results = await DB.prepare(
    `UPDATE in_progress_blood_pressure_records SET systolic_blood_pressure = ? WHERE user_id = ?`,
  )
    .bind(text, userId)
    .run()
  return results.success
}

const updateDiastolic = async (
  DB: D1Database,
  userId: string,
  text: string,
): Promise<boolean> => {
  const results = await DB.prepare(
    `UPDATE in_progress_blood_pressure_records SET diastolic_blood_pressure = ? WHERE user_id = ?`,
  )
    .bind(text, userId)
    .run()
  return results.success
}

const createBloodPressureRecord = async (
  DB: D1Database,
  userId: string,
  diastolic: number,
  systolic: number,
  date: string,
): Promise<boolean> => {
  const results = await DB.prepare(
    `INSERT INTO blood_pressure_records (user_id, diastolic_blood_pressure, systolic_blood_pressure, date) VALUES (?, ?, ?, ?)`,
  )
    .bind(userId, diastolic, systolic, date)
    .run()
  return results.success
}

const getBloodPressureRecordsByUserId = async (
  DB: D1Database,
  userId: string,
) => {
  const results = await drizzle(DB)
    .select()
    .from(bloodPressureRecords)
    .where(eq(bloodPressureRecords.userId, userId))
    .orderBy(bloodPressureRecords.date)
  return results
}

export {
  deleteInProgressRecord,
  createInProgressRecord,
  getInProgressRecord,
  updateSysotolic,
  updateDiastolic,
  createBloodPressureRecord,
  getBloodPressureRecordsByUserId,
}
