CREATE TABLE `company_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255) NOT NULL,
	`contact_name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`industry` varchar(255) NOT NULL,
	`revenue_range` varchar(100) NOT NULL,
	`interest_reasons` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `company_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lender_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firm_name` varchar(255) NOT NULL,
	`contact_name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`deal_size_ranges` json NOT NULL,
	`preferred_industries` json NOT NULL,
	`debt_types` json NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lender_submissions_id` PRIMARY KEY(`id`)
);
