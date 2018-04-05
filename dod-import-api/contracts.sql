CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create table contractor(
	 id smallserial primary key,
	 name text
);
create table department(
	 id smallserial primary key,
	 name text
);

create table contract (
	 id smallserial primary key,
	 contract_number text,
	 for_what text,
	 contractor_id smallint references contractor(id) not null,
	 department_id smallint references department(id) not null,
	 place_of_work text,
	 contracting_activity text, 
	 amount numeric,
	 contract_date date
);
ALTER TABLE contract ADD COLUMN "foreign" boolean;
ALTER TABLE department ADD COLUMN uuid uuid NOT NULL DEFAULT uuid_generate_v1();
ALTER TABLE contract ADD COLUMN uuid uuid NOT NULL DEFAULT uuid_generate_v1();
ALTER TABLE contractor ADD COLUMN uuid uuid NOT NULL DEFAULT uuid_generate_v1();
