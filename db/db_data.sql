--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._user (
    username character varying(255) NOT NULL,
    email character varying(255),
    password character varying(255),
    role character varying(255)
);


ALTER TABLE public._user OWNER TO postgres;

--
-- Data for Name: _user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._user (username, email, password, role) FROM stdin;
pavlos	pavlos@pavlos.com	$2a$10$7yH6VJvfYAcZFb2hvc6sQ.liuzCzmD6Psfx/wHWaFJ05hWPjcfLo6	VISITOR
admin	pavlos@admin.com	$2a$10$3SyOyMGHMrf11vVS/hKaNuKVi.ycPvkSsBjzGUA9sJR.eAl595lHC	VISITOR
test	test@admin.com	$2a$10$0HI/spwzYXBdYvDgxe4O8eiuf7BNXZXS4LwfCMgFGsomXhViNYJgy	VISITOR
admin2	admin@admin.com	$2a$10$j3AnSnZSSsfAg9XDjqjiiuco.09u3PTvkF9iS1yHFfQeX6GaDYwiO	VISITOR
\.


--
-- Name: _user _user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._user
    ADD CONSTRAINT _user_pkey PRIMARY KEY (username);


--
-- PostgreSQL database dump complete
--

