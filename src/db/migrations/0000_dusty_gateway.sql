CREATE TABLE `audit_logs` (
	`log_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`action` varchar(255),
	`timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
	`details` text,
	CONSTRAINT `audit_logs_log_id` PRIMARY KEY(`log_id`)
);
--> statement-breakpoint
CREATE TABLE `degree` (
	`degree_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`faculty_id` int NOT NULL,
	CONSTRAINT `degree_degree_id` PRIMARY KEY(`degree_id`)
);
--> statement-breakpoint
CREATE TABLE `exam_halls` (
	`hall_id` int AUTO_INCREMENT NOT NULL,
	`hall_name` varchar(100) NOT NULL,
	`max_capacity` int NOT NULL,
	`location` varchar(100),
	CONSTRAINT `exam_halls_hall_id` PRIMARY KEY(`hall_id`)
);
--> statement-breakpoint
CREATE TABLE `exam_sessions` (
	`session_id` int AUTO_INCREMENT NOT NULL,
	`exam_date` date NOT NULL,
	`start_time` time NOT NULL,
	`end_time` time NOT NULL,
	`subject_code` varchar(10),
	`student_count` int NOT NULL,
	CONSTRAINT `exam_sessions_session_id` PRIMARY KEY(`session_id`)
);
--> statement-breakpoint
CREATE TABLE `faculty` (
	`faculty_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	CONSTRAINT `faculty_faculty_id` PRIMARY KEY(`faculty_id`)
);
--> statement-breakpoint
CREATE TABLE `hall_allocations` (
	`allocation_id` int AUTO_INCREMENT NOT NULL,
	`session_id` int,
	`hall_id` int,
	`allocated_capacity` int,
	CONSTRAINT `hall_allocations_allocation_id` PRIMARY KEY(`allocation_id`)
);
--> statement-breakpoint
CREATE TABLE `lecturers` (
	`lecturer_id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`degree_id` int NOT NULL,
	`rank` varchar(50),
	`faculty_id` int NOT NULL,
	`availability` json,
	`email` varchar(100),
	`phone` varchar(20),
	CONSTRAINT `lecturers_lecturer_id` PRIMARY KEY(`lecturer_id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`notification_id` int AUTO_INCREMENT NOT NULL,
	`lecturer_id` int,
	`message` text,
	`sent_at` datetime DEFAULT CURRENT_TIMESTAMP,
	`via` enum('Email','SMS'),
	CONSTRAINT `notifications_notification_id` PRIMARY KEY(`notification_id`)
);
--> statement-breakpoint
CREATE TABLE `staff_assignments` (
	`assignment_id` int AUTO_INCREMENT NOT NULL,
	`session_id` int,
	`lecturer_id` int,
	`role` enum('Supervisor','Invigilator','Hall Attendant'),
	`manual_override` int DEFAULT 0,
	CONSTRAINT `staff_assignments_assignment_id` PRIMARY KEY(`assignment_id`)
);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`subject_code` varchar(10) NOT NULL,
	`subject_name` varchar(100) NOT NULL,
	`degree_program` varchar(50),
	`year_of_study` int,
	`paper_setters` text,
	CONSTRAINT `subjects_subject_code` PRIMARY KEY(`subject_code`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`role` enum('Admin','Editor','Viewer','Coordinator') NOT NULL,
	`email` varchar(100),
	`phone` varchar(20),
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `degree` ADD CONSTRAINT `degree_faculty_id_faculty_faculty_id_fk` FOREIGN KEY (`faculty_id`) REFERENCES `faculty`(`faculty_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_degree_id_degree_degree_id_fk` FOREIGN KEY (`degree_id`) REFERENCES `degree`(`degree_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lecturers` ADD CONSTRAINT `lecturers_faculty_id_faculty_faculty_id_fk` FOREIGN KEY (`faculty_id`) REFERENCES `faculty`(`faculty_id`) ON DELETE no action ON UPDATE no action;