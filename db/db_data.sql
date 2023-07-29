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
-- Name: _admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._admin (
    username character varying(255) NOT NULL
);


ALTER TABLE public._admin OWNER TO postgres;

--
-- Name: _available_time_slot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._available_time_slot (
    id bigint NOT NULL,
    end_date date NOT NULL,
    start_date date NOT NULL,
    property_id bigint NOT NULL
);


ALTER TABLE public._available_time_slot OWNER TO postgres;

--
-- Name: _available_time_slot_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._available_time_slot_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._available_time_slot_id_seq OWNER TO postgres;

--
-- Name: _available_time_slot_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._available_time_slot_id_seq OWNED BY public._available_time_slot.id;


--
-- Name: _city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._city (
    id bigint NOT NULL,
    name character varying(255),
    country_id bigint NOT NULL
);


ALTER TABLE public._city OWNER TO postgres;

--
-- Name: _city_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._city_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._city_id_seq OWNER TO postgres;

--
-- Name: _city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._city_id_seq OWNED BY public._city.id;


--
-- Name: _country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._country (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public._country OWNER TO postgres;

--
-- Name: _country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._country_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._country_id_seq OWNER TO postgres;

--
-- Name: _country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._country_id_seq OWNED BY public._country.id;


--
-- Name: _guest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._guest (
    username character varying(255) NOT NULL
);


ALTER TABLE public._guest OWNER TO postgres;

--
-- Name: _host; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._host (
    username character varying(255) NOT NULL
);


ALTER TABLE public._host OWNER TO postgres;

--
-- Name: _image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._image (
    id bigint NOT NULL,
    data oid,
    is_main boolean NOT NULL,
    path character varying(255)
);


ALTER TABLE public._image OWNER TO postgres;

--
-- Name: _image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._image_id_seq OWNER TO postgres;

--
-- Name: _image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._image_id_seq OWNED BY public._image.id;


--
-- Name: _message; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._message (
    id bigint NOT NULL,
    deleted_by_host boolean NOT NULL,
    sent_by_guest boolean NOT NULL,
    text oid,
    guest_user_username character varying(255) NOT NULL,
    host_user_username character varying(255) NOT NULL,
    property_id bigint NOT NULL
);


ALTER TABLE public._message OWNER TO postgres;

--
-- Name: _message_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._message_id_seq OWNER TO postgres;

--
-- Name: _message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._message_id_seq OWNED BY public._message.id;


--
-- Name: _property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._property (
    id bigint NOT NULL,
    address character varying(255),
    description oid,
    latitude double precision,
    longitude double precision,
    space_area smallint NOT NULL,
    type character varying(255),
    city_id bigint NOT NULL,
    host_username character varying(255) NOT NULL,
    CONSTRAINT _property_space_area_check CHECK (((space_area <= 30000) AND (space_area >= 1)))
);


ALTER TABLE public._property OWNER TO postgres;

--
-- Name: _property_amenities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._property_amenities (
    property_id bigint NOT NULL,
    has_elevator boolean NOT NULL,
    has_heating boolean NOT NULL,
    has_kitchen boolean NOT NULL,
    has_lounge boolean NOT NULL,
    has_parking boolean NOT NULL,
    has_refrigerator boolean NOT NULL,
    has_tv boolean NOT NULL,
    has_wifi boolean NOT NULL,
    num_bathrooms smallint NOT NULL,
    num_bedrooms smallint NOT NULL,
    num_beds smallint NOT NULL
);


ALTER TABLE public._property_amenities OWNER TO postgres;

--
-- Name: _property_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._property_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._property_id_seq OWNER TO postgres;

--
-- Name: _property_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._property_id_seq OWNED BY public._property.id;


--
-- Name: _property_image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._property_image (
    property_id bigint NOT NULL,
    image_id bigint NOT NULL
);


ALTER TABLE public._property_image OWNER TO postgres;

--
-- Name: _property_rules; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._property_rules (
    property_id bigint NOT NULL,
    base_day_cost integer NOT NULL,
    events_allowed boolean NOT NULL,
    min_reservation_days smallint NOT NULL,
    per_guest_cost integer NOT NULL,
    pets_allowed boolean NOT NULL,
    smoking_allowed boolean NOT NULL
);


ALTER TABLE public._property_rules OWNER TO postgres;

--
-- Name: _reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._reservation (
    id bigint NOT NULL,
    end_date date NOT NULL,
    num_persons smallint NOT NULL,
    start_date date NOT NULL,
    guest_username character varying(255) NOT NULL,
    property_id bigint NOT NULL,
    CONSTRAINT _reservation_num_persons_check CHECK (((num_persons <= 100) AND (num_persons >= 1)))
);


ALTER TABLE public._reservation OWNER TO postgres;

--
-- Name: _reservation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._reservation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._reservation_id_seq OWNER TO postgres;

--
-- Name: _reservation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._reservation_id_seq OWNED BY public._reservation.id;


--
-- Name: _review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._review (
    id bigint NOT NULL,
    created_on date,
    stars smallint NOT NULL,
    text oid,
    guest_username character varying(255) NOT NULL,
    property_id bigint NOT NULL,
    CONSTRAINT _review_stars_check CHECK (((stars <= 5) AND (stars >= 1)))
);


ALTER TABLE public._review OWNER TO postgres;

--
-- Name: _review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._review_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._review_id_seq OWNER TO postgres;

--
-- Name: _review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._review_id_seq OWNED BY public._review.id;


--
-- Name: _role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._role (
    name character varying(255) NOT NULL
);


ALTER TABLE public._role OWNER TO postgres;

--
-- Name: _user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._user (
    username character varying(255) NOT NULL,
    email character varying(255),
    first_name character varying(255),
    is_active boolean NOT NULL,
    is_locked boolean NOT NULL,
    last_name character varying(255),
    mobile_number character varying(255),
    password character varying(255) NOT NULL,
    image_id bigint
);


ALTER TABLE public._user OWNER TO postgres;

--
-- Name: user_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_role (
    user_username character varying(255) NOT NULL,
    role_name character varying(255) NOT NULL
);


ALTER TABLE public.user_role OWNER TO postgres;

--
-- Name: _available_time_slot id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._available_time_slot ALTER COLUMN id SET DEFAULT nextval('public._available_time_slot_id_seq'::regclass);


--
-- Name: _city id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._city ALTER COLUMN id SET DEFAULT nextval('public._city_id_seq'::regclass);


--
-- Name: _country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._country ALTER COLUMN id SET DEFAULT nextval('public._country_id_seq'::regclass);


--
-- Name: _image id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._image ALTER COLUMN id SET DEFAULT nextval('public._image_id_seq'::regclass);


--
-- Name: _message id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._message ALTER COLUMN id SET DEFAULT nextval('public._message_id_seq'::regclass);


--
-- Name: _property id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property ALTER COLUMN id SET DEFAULT nextval('public._property_id_seq'::regclass);


--
-- Name: _reservation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._reservation ALTER COLUMN id SET DEFAULT nextval('public._reservation_id_seq'::regclass);


--
-- Name: _review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._review ALTER COLUMN id SET DEFAULT nextval('public._review_id_seq'::regclass);


--
-- Data for Name: _admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._admin (username) FROM stdin;
\.


--
-- Data for Name: _available_time_slot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._available_time_slot (id, end_date, start_date, property_id) FROM stdin;
\.


--
-- Data for Name: _city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._city (id, name, country_id) FROM stdin;
\.


--
-- Data for Name: _country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._country (id, name) FROM stdin;
\.


--
-- Data for Name: _guest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._guest (username) FROM stdin;
\.


--
-- Data for Name: _host; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._host (username) FROM stdin;
\.


--
-- Data for Name: _image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._image (id, data, is_main, path) FROM stdin;
\.


--
-- Data for Name: _message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._message (id, deleted_by_host, sent_by_guest, text, guest_user_username, host_user_username, property_id) FROM stdin;
\.


--
-- Data for Name: _property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property (id, address, description, latitude, longitude, space_area, type, city_id, host_username) FROM stdin;
\.


--
-- Data for Name: _property_amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property_amenities (property_id, has_elevator, has_heating, has_kitchen, has_lounge, has_parking, has_refrigerator, has_tv, has_wifi, num_bathrooms, num_bedrooms, num_beds) FROM stdin;
\.


--
-- Data for Name: _property_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property_image (property_id, image_id) FROM stdin;
\.


--
-- Data for Name: _property_rules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property_rules (property_id, base_day_cost, events_allowed, min_reservation_days, per_guest_cost, pets_allowed, smoking_allowed) FROM stdin;
\.


--
-- Data for Name: _reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._reservation (id, end_date, num_persons, start_date, guest_username, property_id) FROM stdin;
\.


--
-- Data for Name: _review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._review (id, created_on, stars, text, guest_username, property_id) FROM stdin;
\.


--
-- Data for Name: _role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._role (name) FROM stdin;
\.


--
-- Data for Name: _user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._user (username, email, first_name, is_active, is_locked, last_name, mobile_number, password, image_id) FROM stdin;
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_role (user_username, role_name) FROM stdin;
\.


--
-- Name: _available_time_slot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._available_time_slot_id_seq', 1, false);


--
-- Name: _city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._city_id_seq', 1, false);


--
-- Name: _country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._country_id_seq', 1, false);


--
-- Name: _image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._image_id_seq', 1, false);


--
-- Name: _message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._message_id_seq', 1, false);


--
-- Name: _property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._property_id_seq', 1, false);


--
-- Name: _reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._reservation_id_seq', 1, false);


--
-- Name: _review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._review_id_seq', 1, false);


--
-- Name: _admin _admin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._admin
    ADD CONSTRAINT _admin_pkey PRIMARY KEY (username);


--
-- Name: _available_time_slot _available_time_slot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._available_time_slot
    ADD CONSTRAINT _available_time_slot_pkey PRIMARY KEY (id);


--
-- Name: _city _city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._city
    ADD CONSTRAINT _city_pkey PRIMARY KEY (id);


--
-- Name: _country _country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._country
    ADD CONSTRAINT _country_pkey PRIMARY KEY (id);


--
-- Name: _guest _guest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._guest
    ADD CONSTRAINT _guest_pkey PRIMARY KEY (username);


--
-- Name: _host _host_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._host
    ADD CONSTRAINT _host_pkey PRIMARY KEY (username);


--
-- Name: _image _image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._image
    ADD CONSTRAINT _image_pkey PRIMARY KEY (id);


--
-- Name: _message _message_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._message
    ADD CONSTRAINT _message_pkey PRIMARY KEY (id);


--
-- Name: _property_amenities _property_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property_amenities
    ADD CONSTRAINT _property_amenities_pkey PRIMARY KEY (property_id);


--
-- Name: _property _property_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property
    ADD CONSTRAINT _property_pkey PRIMARY KEY (id);


--
-- Name: _property_rules _property_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property_rules
    ADD CONSTRAINT _property_rules_pkey PRIMARY KEY (property_id);


--
-- Name: _reservation _reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._reservation
    ADD CONSTRAINT _reservation_pkey PRIMARY KEY (id);


--
-- Name: _review _review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._review
    ADD CONSTRAINT _review_pkey PRIMARY KEY (id);


--
-- Name: _role _role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._role
    ADD CONSTRAINT _role_pkey PRIMARY KEY (name);


--
-- Name: _user _user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._user
    ADD CONSTRAINT _user_pkey PRIMARY KEY (username);


--
-- Name: _property_image uk_nwqyy78bpn53oh09d00r0b8ex; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property_image
    ADD CONSTRAINT uk_nwqyy78bpn53oh09d00r0b8ex UNIQUE (image_id);


--
-- Name: _message fk2lo5n6s81pgw1i5p10xr7mwnb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._message
    ADD CONSTRAINT fk2lo5n6s81pgw1i5p10xr7mwnb FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: _message fk3u8rfbixm4egfrhcpix6vljr8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._message
    ADD CONSTRAINT fk3u8rfbixm4egfrhcpix6vljr8 FOREIGN KEY (guest_user_username) REFERENCES public._guest(username);


--
-- Name: _property_image fk5x3c14t8ba3h7q9oxohhwi7w1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property_image
    ADD CONSTRAINT fk5x3c14t8ba3h7q9oxohhwi7w1 FOREIGN KEY (image_id) REFERENCES public._image(id);


--
-- Name: _guest fk6rrhwdymf2h8r11prloj6trlv; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._guest
    ADD CONSTRAINT fk6rrhwdymf2h8r11prloj6trlv FOREIGN KEY (username) REFERENCES public._user(username);


--
-- Name: _admin fk7jfyrf06is42rj0ew7vqwxcc6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._admin
    ADD CONSTRAINT fk7jfyrf06is42rj0ew7vqwxcc6 FOREIGN KEY (username) REFERENCES public._user(username);


--
-- Name: _review fk899yk967a74k2x4c1t92fyvlp; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._review
    ADD CONSTRAINT fk899yk967a74k2x4c1t92fyvlp FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: _property fkabtywbe39bpfxiu6b2cs7ew8g; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property
    ADD CONSTRAINT fkabtywbe39bpfxiu6b2cs7ew8g FOREIGN KEY (host_username) REFERENCES public._host(username);


--
-- Name: _reservation fkbgwrnp0uu1ravesto5wjb6efp; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._reservation
    ADD CONSTRAINT fkbgwrnp0uu1ravesto5wjb6efp FOREIGN KEY (guest_username) REFERENCES public._guest(username);


--
-- Name: _host fkde18beh4v94w1jnphl9pkhr54; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._host
    ADD CONSTRAINT fkde18beh4v94w1jnphl9pkhr54 FOREIGN KEY (username) REFERENCES public._user(username);


--
-- Name: _review fkfsfl2skpkkf4w9gccnw1ieptk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._review
    ADD CONSTRAINT fkfsfl2skpkkf4w9gccnw1ieptk FOREIGN KEY (guest_username) REFERENCES public._guest(username);


--
-- Name: _city fkg502tjt7on6mkh3hv0ryh9xwh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._city
    ADD CONSTRAINT fkg502tjt7on6mkh3hv0ryh9xwh FOREIGN KEY (country_id) REFERENCES public._country(id);


--
-- Name: _message fkgg64gispyo6k1u4p1gr8uafkh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._message
    ADD CONSTRAINT fkgg64gispyo6k1u4p1gr8uafkh FOREIGN KEY (host_user_username) REFERENCES public._host(username);


--
-- Name: user_role fkgij1lvdsbw3jjlpah59d6v88m; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT fkgij1lvdsbw3jjlpah59d6v88m FOREIGN KEY (role_name) REFERENCES public._role(name);


--
-- Name: _property_amenities fkgqkr2p669gb61wpx2d9pj6on6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property_amenities
    ADD CONSTRAINT fkgqkr2p669gb61wpx2d9pj6on6 FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: _reservation fkk06j87som9djp7k1hhs53938l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._reservation
    ADD CONSTRAINT fkk06j87som9djp7k1hhs53938l FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: user_role fklq0c9ngoogy42vinpnlvooxh1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT fklq0c9ngoogy42vinpnlvooxh1 FOREIGN KEY (user_username) REFERENCES public._user(username);


--
-- Name: _user fkneckpy9ho21e3bgy8h0w69fwq; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._user
    ADD CONSTRAINT fkneckpy9ho21e3bgy8h0w69fwq FOREIGN KEY (image_id) REFERENCES public._image(id);


--
-- Name: _available_time_slot fko5k9uxpt0csdnykrd42f1nj6x; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._available_time_slot
    ADD CONSTRAINT fko5k9uxpt0csdnykrd42f1nj6x FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: _property_rules fkrbqpegebsitv3bci7vlnlq64t; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property_rules
    ADD CONSTRAINT fkrbqpegebsitv3bci7vlnlq64t FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: _property_image fksae3s022qpdpgpk00ejm49q3r; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property_image
    ADD CONSTRAINT fksae3s022qpdpgpk00ejm49q3r FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: _property fksd6durf0wa7fdfmk8j83okx43; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._property
    ADD CONSTRAINT fksd6durf0wa7fdfmk8j83okx43 FOREIGN KEY (city_id) REFERENCES public._city(id);


--
-- PostgreSQL database dump complete
--

