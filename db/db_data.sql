--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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
-- Name: _admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._admins (
    username character varying(255) NOT NULL
);


ALTER TABLE public._admins OWNER TO postgres;

--
-- Name: _available_time_slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._available_time_slots (
    id bigint NOT NULL,
    end_date timestamp(6) without time zone NOT NULL,
    start_date timestamp(6) without time zone NOT NULL
);


ALTER TABLE public._available_time_slots OWNER TO postgres;

--
-- Name: _available_time_slots_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._available_time_slots_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._available_time_slots_id_seq OWNER TO postgres;

--
-- Name: _available_time_slots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._available_time_slots_id_seq OWNED BY public._available_time_slots.id;


--
-- Name: _cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._cities (
    id bigint NOT NULL,
    name character varying(255),
    country_id bigint NOT NULL
);


ALTER TABLE public._cities OWNER TO postgres;

--
-- Name: _cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._cities_id_seq OWNER TO postgres;

--
-- Name: _cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._cities_id_seq OWNED BY public._cities.id;


--
-- Name: _countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._countries (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public._countries OWNER TO postgres;

--
-- Name: _countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._countries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._countries_id_seq OWNER TO postgres;

--
-- Name: _countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._countries_id_seq OWNED BY public._countries.id;


--
-- Name: _guests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._guests (
    username character varying(255) NOT NULL
);


ALTER TABLE public._guests OWNER TO postgres;

--
-- Name: _hosts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._hosts (
    username character varying(255) NOT NULL
);


ALTER TABLE public._hosts OWNER TO postgres;

--
-- Name: _images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._images (
    id bigint NOT NULL,
    blob oid,
    path character varying(255)
);


ALTER TABLE public._images OWNER TO postgres;

--
-- Name: _images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._images_id_seq OWNER TO postgres;

--
-- Name: _images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._images_id_seq OWNED BY public._images.id;


--
-- Name: _messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._messages (
    id bigint NOT NULL,
    user_from_username character varying(255) NOT NULL,
    user_to_username character varying(255) NOT NULL
);


ALTER TABLE public._messages OWNER TO postgres;

--
-- Name: _messages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._messages_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._messages_id_seq OWNER TO postgres;

--
-- Name: _messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._messages_id_seq OWNED BY public._messages.id;


--
-- Name: _properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._properties (
    id bigint NOT NULL,
    city_id bigint NOT NULL,
    host_username character varying(255) NOT NULL
);


ALTER TABLE public._properties OWNER TO postgres;

--
-- Name: _properties_available_slots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._properties_available_slots (
    property_id bigint NOT NULL,
    available_slots_id bigint NOT NULL
);


ALTER TABLE public._properties_available_slots OWNER TO postgres;

--
-- Name: _properties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._properties_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._properties_id_seq OWNER TO postgres;

--
-- Name: _properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._properties_id_seq OWNED BY public._properties.id;


--
-- Name: _properties_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._properties_images (
    property_id bigint NOT NULL,
    images_id bigint NOT NULL
);


ALTER TABLE public._properties_images OWNER TO postgres;

--
-- Name: _reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._reservations (
    id bigint NOT NULL,
    guest_username character varying(255) NOT NULL,
    property_id bigint NOT NULL
);


ALTER TABLE public._reservations OWNER TO postgres;

--
-- Name: _reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._reservations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._reservations_id_seq OWNER TO postgres;

--
-- Name: _reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._reservations_id_seq OWNED BY public._reservations.id;


--
-- Name: _roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._roles (
    name character varying(255) NOT NULL
);


ALTER TABLE public._roles OWNER TO postgres;

--
-- Name: _users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._users (
    username character varying(255) NOT NULL,
    email character varying(255),
    password character varying(255) NOT NULL,
    image_id bigint
);


ALTER TABLE public._users OWNER TO postgres;

--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_username character varying(255) NOT NULL,
    roles_name character varying(255) NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: _available_time_slots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._available_time_slots ALTER COLUMN id SET DEFAULT nextval('public._available_time_slots_id_seq'::regclass);


--
-- Name: _cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._cities ALTER COLUMN id SET DEFAULT nextval('public._cities_id_seq'::regclass);


--
-- Name: _countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._countries ALTER COLUMN id SET DEFAULT nextval('public._countries_id_seq'::regclass);


--
-- Name: _images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._images ALTER COLUMN id SET DEFAULT nextval('public._images_id_seq'::regclass);


--
-- Name: _messages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._messages ALTER COLUMN id SET DEFAULT nextval('public._messages_id_seq'::regclass);


--
-- Name: _properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties ALTER COLUMN id SET DEFAULT nextval('public._properties_id_seq'::regclass);


--
-- Name: _reservations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._reservations ALTER COLUMN id SET DEFAULT nextval('public._reservations_id_seq'::regclass);


--
-- Data for Name: _admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._admins (username) FROM stdin;
\.


--
-- Data for Name: _available_time_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._available_time_slots (id, end_date, start_date) FROM stdin;
\.


--
-- Data for Name: _cities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._cities (id, name, country_id) FROM stdin;
\.


--
-- Data for Name: _countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._countries (id, name) FROM stdin;
\.


--
-- Data for Name: _guests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._guests (username) FROM stdin;
\.


--
-- Data for Name: _hosts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._hosts (username) FROM stdin;
\.


--
-- Data for Name: _images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._images (id, blob, path) FROM stdin;
\.


--
-- Data for Name: _messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._messages (id, user_from_username, user_to_username) FROM stdin;
\.


--
-- Data for Name: _properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._properties (id, city_id, host_username) FROM stdin;
\.


--
-- Data for Name: _properties_available_slots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._properties_available_slots (property_id, available_slots_id) FROM stdin;
\.


--
-- Data for Name: _properties_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._properties_images (property_id, images_id) FROM stdin;
\.


--
-- Data for Name: _reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._reservations (id, guest_username, property_id) FROM stdin;
\.


--
-- Data for Name: _roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._roles (name) FROM stdin;
\.


--
-- Data for Name: _users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._users (username, email, password, image_id) FROM stdin;
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_username, roles_name) FROM stdin;
\.


--
-- Name: _available_time_slots_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._available_time_slots_id_seq', 1, false);


--
-- Name: _cities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._cities_id_seq', 1, false);


--
-- Name: _countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._countries_id_seq', 1, false);


--
-- Name: _images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._images_id_seq', 1, false);


--
-- Name: _messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._messages_id_seq', 1, false);


--
-- Name: _properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._properties_id_seq', 1, false);


--
-- Name: _reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._reservations_id_seq', 1, false);


--
-- Name: _admins _admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._admins
    ADD CONSTRAINT _admins_pkey PRIMARY KEY (username);


--
-- Name: _available_time_slots _available_time_slots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._available_time_slots
    ADD CONSTRAINT _available_time_slots_pkey PRIMARY KEY (id);


--
-- Name: _cities _cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._cities
    ADD CONSTRAINT _cities_pkey PRIMARY KEY (id);


--
-- Name: _countries _countries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._countries
    ADD CONSTRAINT _countries_pkey PRIMARY KEY (id);


--
-- Name: _guests _guests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._guests
    ADD CONSTRAINT _guests_pkey PRIMARY KEY (username);


--
-- Name: _hosts _hosts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._hosts
    ADD CONSTRAINT _hosts_pkey PRIMARY KEY (username);


--
-- Name: _images _images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._images
    ADD CONSTRAINT _images_pkey PRIMARY KEY (id);


--
-- Name: _messages _messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._messages
    ADD CONSTRAINT _messages_pkey PRIMARY KEY (id);


--
-- Name: _properties _properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties
    ADD CONSTRAINT _properties_pkey PRIMARY KEY (id);


--
-- Name: _reservations _reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._reservations
    ADD CONSTRAINT _reservations_pkey PRIMARY KEY (id);


--
-- Name: _roles _roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._roles
    ADD CONSTRAINT _roles_pkey PRIMARY KEY (name);


--
-- Name: _users _users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._users
    ADD CONSTRAINT _users_pkey PRIMARY KEY (username);


--
-- Name: _properties_available_slots uk_hrlwprdvsbo47eyhf82ls3ie5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties_available_slots
    ADD CONSTRAINT uk_hrlwprdvsbo47eyhf82ls3ie5 UNIQUE (available_slots_id);


--
-- Name: _properties_images uk_tf5r5giycq51h8p0f2pfqwmji; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties_images
    ADD CONSTRAINT uk_tf5r5giycq51h8p0f2pfqwmji UNIQUE (images_id);


--
-- Name: _properties fk1or8eccv16dkxmsup4jpdv3qg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties
    ADD CONSTRAINT fk1or8eccv16dkxmsup4jpdv3qg FOREIGN KEY (city_id) REFERENCES public._cities(id);


--
-- Name: _hosts fk4lpkhjkeqt8d1axqd364xegvj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._hosts
    ADD CONSTRAINT fk4lpkhjkeqt8d1axqd364xegvj FOREIGN KEY (username) REFERENCES public._users(username);


--
-- Name: _messages fk523ehipmxkle42svbscfrqi8d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._messages
    ADD CONSTRAINT fk523ehipmxkle42svbscfrqi8d FOREIGN KEY (user_to_username) REFERENCES public._users(username);


--
-- Name: _reservations fk7fpr770ffjohokmsla3ea62xp; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._reservations
    ADD CONSTRAINT fk7fpr770ffjohokmsla3ea62xp FOREIGN KEY (guest_username) REFERENCES public._guests(username);


--
-- Name: _properties fkaae1prh8j0ro3uao2k1dhk69b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties
    ADD CONSTRAINT fkaae1prh8j0ro3uao2k1dhk69b FOREIGN KEY (host_username) REFERENCES public._hosts(username);


--
-- Name: _properties_images fkb0f6w4lpk6jjuetsxb57ipqg9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties_images
    ADD CONSTRAINT fkb0f6w4lpk6jjuetsxb57ipqg9 FOREIGN KEY (images_id) REFERENCES public._images(id);


--
-- Name: _users fkb0yb80l2npjk5dddifdck0g77; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._users
    ADD CONSTRAINT fkb0yb80l2npjk5dddifdck0g77 FOREIGN KEY (image_id) REFERENCES public._images(id);


--
-- Name: _guests fkdhfrjgtl3j0vs0w4are28mmi3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._guests
    ADD CONSTRAINT fkdhfrjgtl3j0vs0w4are28mmi3 FOREIGN KEY (username) REFERENCES public._users(username);


--
-- Name: user_roles fkedqcddqvagfj3fkcg9e51ss57; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkedqcddqvagfj3fkcg9e51ss57 FOREIGN KEY (roles_name) REFERENCES public._roles(name);


--
-- Name: user_roles fkeof4gobyro4ev2u5pwv7q0b9x; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT fkeof4gobyro4ev2u5pwv7q0b9x FOREIGN KEY (user_username) REFERENCES public._users(username);


--
-- Name: _properties_images fkkhdr8rr36kmm8p2goonjh50wc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties_images
    ADD CONSTRAINT fkkhdr8rr36kmm8p2goonjh50wc FOREIGN KEY (property_id) REFERENCES public._properties(id);


--
-- Name: _messages fkm0m17hug3jeextdy7s15n09dm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._messages
    ADD CONSTRAINT fkm0m17hug3jeextdy7s15n09dm FOREIGN KEY (user_from_username) REFERENCES public._users(username);


--
-- Name: _properties_available_slots fkoce70l04l2iju3l5ly921fqx4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties_available_slots
    ADD CONSTRAINT fkoce70l04l2iju3l5ly921fqx4 FOREIGN KEY (available_slots_id) REFERENCES public._available_time_slots(id);


--
-- Name: _reservations fkp6ygnedsvfb4pim2rur6aua1r; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._reservations
    ADD CONSTRAINT fkp6ygnedsvfb4pim2rur6aua1r FOREIGN KEY (property_id) REFERENCES public._properties(id);


--
-- Name: _admins fkpvwqog78tlwkdwl03kct15r5p; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._admins
    ADD CONSTRAINT fkpvwqog78tlwkdwl03kct15r5p FOREIGN KEY (username) REFERENCES public._users(username);


--
-- Name: _properties_available_slots fkq3p3sukwr0o3fcddd20l0r4l5; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._properties_available_slots
    ADD CONSTRAINT fkq3p3sukwr0o3fcddd20l0r4l5 FOREIGN KEY (property_id) REFERENCES public._properties(id);


--
-- Name: _cities fks041dh4why3bw5ss4tfykcoah; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._cities
    ADD CONSTRAINT fks041dh4why3bw5ss4tfykcoah FOREIGN KEY (country_id) REFERENCES public._countries(id);


--
-- PostgreSQL database dump complete
--

