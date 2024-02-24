const deleteInProgressRecord = async (DB: D1Database, userId: String) => {
  const results = await DB.prepare(`DELETE FROM in_progress_blood_pressure_records WHERE user_id = ?`).bind(userId).run();
  return results.success
}

const createInProgressRecord = async (DB: D1Database, userId: String) => {
  const results = await DB.prepare(`INSERT INTO in_progress_blood_pressure_records (user_id) VALUES (?)`).bind(userId).run();
  return results.success
}

const getInProgressRecord = async (DB: D1Database, userId: String) => {

}

const updateSysotolic = async (DB: D1Database, userId: String, text: String) => {

}

const updateDiastolic = async (DB: D1Database, userId: String, text: String) => {

}

const updateHeartRate = async (DB: D1Database, userId: String, text: String) => {

}

const createBloodPressureRecord = async (DB: D1Database, userId: String) => {

}

export { deleteInProgressRecord, createInProgressRecord, getInProgressRecord, updateSysotolic, updateDiastolic, updateHeartRate, createBloodPressureRecord }
