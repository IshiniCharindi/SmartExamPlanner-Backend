CREATE TABLE `department` (
	`department_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`faculty_id` int NOT NULL,
	CONSTRAINT `department_department_id` PRIMARY KEY(`department_id`)
);
--> statement-breakpoint
CREATE TABLE `faculty` (
	`faculty_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	CONSTRAINT `faculty_faculty_id` PRIMARY KEY(`faculty_id`)
);
--> statement-breakpoint
ALTER TABLE `lecturers` ADD `department_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `lecturers` ADD `faculty_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `department` ADD CONSTRAINT `department_faculty_id_faculty_faculty_id_fk` FOREIGN KEY (`faculty_id`) REFERENCES `faculty`(`faculty_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_department_id_department_department_id_fk` FOREIGN KEY (`department_id`) REFERENCES `department`(`department_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_faculty_id_faculty_faculty_id_fk` FOREIGN KEY (`faculty_id`) REFERENCES `faculty`(`faculty_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lecturers` DROP COLUMN `department`;--> statement-breakpoint
ALTER TABLE `lecturers` DROP COLUMN `faculty`;