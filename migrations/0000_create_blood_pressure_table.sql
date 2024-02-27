CREATE TABLE `blood_pressure_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`systolic_blood_pressure` integer,
	`diastolic_blood_pressure` integer,
	`date` text
);
--> statement-breakpoint
CREATE TABLE `in_progress_blood_pressure_records` (
	`user_id` text PRIMARY KEY NOT NULL,
	`systolic_blood_pressure` integer,
	`diastolic_blood_pressure` integer,
	`date` text,
	`created_at` text
);
