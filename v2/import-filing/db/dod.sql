CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
create table filings(
	id smallserial primary key,
	full_text place_of_work text,
	amount numeric,
	filing_date date
)
create table contracts (
	id smallserial primary key,
	contract_number text,
	contractor_id smallint references contractors(id) not null,
	department_id smallint references departments(id) not null,
);

-- All filings where a contract was mentioned.  Or all contracts mentioned in a filing
create table contract_filings (
	id smallserial primary key,
	filing_id smallint references filings(id) not null,
	contract_id smallint references contracts(id) not null,

);
create table keyword (

	
);



create table person(
	 id smallserial primary key,
	 name text
	 contractor_id smallint references contractor(id) not null,

);
create table departments(
	 id smallserial primary key,
	 name text
);


create table contractors (
	id smallserial primary key,
	name text,
	ceo text,
	cfo text,

)



ALTER TABLE departments ADD COLUMN uuid uuid NOT NULL DEFAULT uuid_generate_v1();
ALTER TABLE contracts ADD COLUMN uuid uuid NOT NULL DEFAULT uuid_generate_v1();
ALTER TABLE contractors ADD COLUMN uuid uuid NOT NULL DEFAULT uuid_generate_v1();
ALTER TABLE filing ADD COLUMN uuid uuid NOT NULL DEFAULT uuid_generate_v1();
ALTER TABLE people ADD COLUMN uuid uuid NOT NULL DEFAULT uuid_generate_v1();