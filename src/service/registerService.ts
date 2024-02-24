import { MESSAGE, ERROR } from "../constants";
import { deleteInProgressRecord, createInProgressRecord } from "../d1/d1";

const handleStartRegister = async (DB: D1Database, userId: string): Promise<string> => {
  const deleteResult = await deleteInProgressRecord(DB, userId);
  if (!deleteResult) return ERROR.DEFAULT_ERROR;

  const insertResult = await createInProgressRecord(DB, userId);
  return insertResult ? MESSAGE.REGISTER_SYSTOLIC : ERROR.DEFAULT_ERROR;
}

export { handleStartRegister }
