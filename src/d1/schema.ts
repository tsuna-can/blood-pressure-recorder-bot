/*
  DO NOT RENAME THIS FILE FOR DRIZZLE-ORM TO WORK
*/
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const bloodPressureRecords = sqliteTable('blood_pressure_records', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  userId: text('user_id').notNull(),
  systolicBP: integer('systolic_blood_pressure'),
  diastolicBP: integer('diastolic_blood_pressure'),
  date: text('date'),
})

export const inProgressBloodPressureRecords = sqliteTable(
  'in_progress_blood_pressure_records',
  {
    userId: text('user_id').primaryKey().notNull(),
    systolicBP: integer('systolic_blood_pressure'),
    diastolicBP: integer('diastolic_blood_pressure'),
    date: text('date'),
    createdAt: text('created_at'),
  },
)
