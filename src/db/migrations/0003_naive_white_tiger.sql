CREATE TABLE `degree` (
	`degree_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`faculty_id` int NOT NULL,
	CONSTRAINT `degree_degree_id` PRIMARY KEY(`degree_id`)
);
--> statement-breakpoint
DROP TABLE `department`;--> statement-breakpoint
ALTER TABLE `lecturers` DROP FOREIGN KEY `lecturers_department_id_department_department_id_fk`;
--> statement-breakpoint
ALTER TABLE `lecturers` ADD `degree_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `degree` ADD CONSTRAINT `degree_faculty_id_faculty_faculty_id_fk` FOREIGN KEY (`faculty_id`) REFERENCES `faculty`(`faculty_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_degree_id_degree_degree_id_fk` FOREIGN KEY (`degree_id`) REFERENCES `degree`(`degree_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lecturers` DROP COLUMN `department_id`;