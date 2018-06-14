--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.3
-- Dumped by pg_dump version 9.6.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dod_filings; Type: DATABASE; Schema: -; Owner: Mehrotra
--

CREATE DATABASE dod_filings WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE dod_filings OWNER TO "Mehrotra";

\connect dod_filings

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Departments; Type: TABLE; Schema: public; Owner: Mehrotra
--

CREATE TABLE "Departments" (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Departments" OWNER TO "Mehrotra";

--
-- Name: ProjectRelationships; Type: TABLE; Schema: public; Owner: Mehrotra
--

CREATE TABLE "ProjectRelationships" (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    "ProjectId" uuid,
    "RelationshipId" uuid,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "ProjectRelationships" OWNER TO "Mehrotra";

--
-- Name: Projects; Type: TABLE; Schema: public; Owner: Mehrotra
--

CREATE TABLE "Projects" (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    full_text text NOT NULL,
    amount double precision NOT NULL,
    checked boolean DEFAULT false,
    contract_numbers text NOT NULL,
    "DepartmentId" uuid,
    filing_date timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Projects" OWNER TO "Mehrotra";

--
-- Name: Relationships; Type: TABLE; Schema: public; Owner: Mehrotra
--

CREATE TABLE "Relationships" (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    type character varying(255) NOT NULL,
    title text NOT NULL,
    info text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE "Relationships" OWNER TO "Mehrotra";

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: Mehrotra
--

CREATE TABLE "SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE "SequelizeMeta" OWNER TO "Mehrotra";

--
-- Data for Name: Departments; Type: TABLE DATA; Schema: public; Owner: Mehrotra
--

COPY "Departments" (id, name, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: ProjectRelationships; Type: TABLE DATA; Schema: public; Owner: Mehrotra
--

COPY "ProjectRelationships" (id, "ProjectId", "RelationshipId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Projects; Type: TABLE DATA; Schema: public; Owner: Mehrotra
--

COPY "Projects" (id, full_text, amount, checked, contract_numbers, "DepartmentId", filing_date, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Relationships; Type: TABLE DATA; Schema: public; Owner: Mehrotra
--

COPY "Relationships" (id, type, title, info, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: Mehrotra
--

COPY "SequelizeMeta" (name) FROM stdin;
20180516032759-create-department.js
20180516032823-create-project.js
20180516032941-create-relationship.js
20180516032942-create-join.js
\.


--
-- Name: Departments Departments_pkey; Type: CONSTRAINT; Schema: public; Owner: Mehrotra
--

ALTER TABLE ONLY "Departments"
    ADD CONSTRAINT "Departments_pkey" PRIMARY KEY (id);


--
-- Name: ProjectRelationships ProjectRelationships_pkey; Type: CONSTRAINT; Schema: public; Owner: Mehrotra
--

ALTER TABLE ONLY "ProjectRelationships"
    ADD CONSTRAINT "ProjectRelationships_pkey" PRIMARY KEY (id);


--
-- Name: Projects Projects_pkey; Type: CONSTRAINT; Schema: public; Owner: Mehrotra
--

ALTER TABLE ONLY "Projects"
    ADD CONSTRAINT "Projects_pkey" PRIMARY KEY (id);


--
-- Name: Relationships Relationships_pkey; Type: CONSTRAINT; Schema: public; Owner: Mehrotra
--

ALTER TABLE ONLY "Relationships"
    ADD CONSTRAINT "Relationships_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: Mehrotra
--

ALTER TABLE ONLY "SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: ProjectRelationships ProjectRelationships_ProjectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Mehrotra
--

ALTER TABLE ONLY "ProjectRelationships"
    ADD CONSTRAINT "ProjectRelationships_ProjectId_fkey" FOREIGN KEY ("ProjectId") REFERENCES "Projects"(id) ON DELETE CASCADE;


--
-- Name: ProjectRelationships ProjectRelationships_RelationshipId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Mehrotra
--

ALTER TABLE ONLY "ProjectRelationships"
    ADD CONSTRAINT "ProjectRelationships_RelationshipId_fkey" FOREIGN KEY ("RelationshipId") REFERENCES "Relationships"(id) ON DELETE CASCADE;


--
-- Name: Projects Projects_DepartmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: Mehrotra
--

ALTER TABLE ONLY "Projects"
    ADD CONSTRAINT "Projects_DepartmentId_fkey" FOREIGN KEY ("DepartmentId") REFERENCES "Departments"(id);


--
-- PostgreSQL database dump complete
--

