--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

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
-- Name: _conversation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._conversation (
    id bigint NOT NULL,
    deleted_by_host boolean NOT NULL,
    guest_user_username character varying(255) NOT NULL,
    property_id bigint NOT NULL
);


ALTER TABLE public._conversation OWNER TO postgres;

--
-- Name: _conversation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public._conversation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._conversation_id_seq OWNER TO postgres;

--
-- Name: _conversation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public._conversation_id_seq OWNED BY public._conversation.id;


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
    sent_on timestamp(6) without time zone,
    text oid,
    conversation_id bigint NOT NULL,
    sent_by_username character varying(255) NOT NULL
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
    name character varying(255) NOT NULL,
    space_area smallint NOT NULL,
    type character varying(255),
    city_id bigint,
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
-- Name: _public_transport_accesses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._public_transport_accesses (
    property_id bigint NOT NULL,
    accessed_by_bus boolean NOT NULL,
    accessed_by_metro boolean NOT NULL,
    accessed_by_railway boolean NOT NULL,
    accessed_by_tram boolean NOT NULL
);


ALTER TABLE public._public_transport_accesses OWNER TO postgres;

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
-- Name: _conversation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._conversation ALTER COLUMN id SET DEFAULT nextval('public._conversation_id_seq'::regclass);


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
-- Name: 16613; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16613');


ALTER LARGE OBJECT 16613 OWNER TO postgres;

--
-- Name: 16614; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16614');


ALTER LARGE OBJECT 16614 OWNER TO postgres;

--
-- Name: 16615; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16615');


ALTER LARGE OBJECT 16615 OWNER TO postgres;

--
-- Name: 16616; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16616');


ALTER LARGE OBJECT 16616 OWNER TO postgres;

--
-- Name: 16617; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16617');


ALTER LARGE OBJECT 16617 OWNER TO postgres;

--
-- Name: 16618; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16618');


ALTER LARGE OBJECT 16618 OWNER TO postgres;

--
-- Name: 16619; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16619');


ALTER LARGE OBJECT 16619 OWNER TO postgres;

--
-- Name: 16620; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16620');


ALTER LARGE OBJECT 16620 OWNER TO postgres;

--
-- Name: 16621; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16621');


ALTER LARGE OBJECT 16621 OWNER TO postgres;

--
-- Name: 16622; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16622');


ALTER LARGE OBJECT 16622 OWNER TO postgres;

--
-- Name: 16623; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16623');


ALTER LARGE OBJECT 16623 OWNER TO postgres;

--
-- Name: 16624; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16624');


ALTER LARGE OBJECT 16624 OWNER TO postgres;

--
-- Name: 16625; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16625');


ALTER LARGE OBJECT 16625 OWNER TO postgres;

--
-- Name: 16626; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16626');


ALTER LARGE OBJECT 16626 OWNER TO postgres;

--
-- Name: 16627; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16627');


ALTER LARGE OBJECT 16627 OWNER TO postgres;

--
-- Name: 16628; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16628');


ALTER LARGE OBJECT 16628 OWNER TO postgres;

--
-- Name: 16629; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16629');


ALTER LARGE OBJECT 16629 OWNER TO postgres;

--
-- Name: 16630; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16630');


ALTER LARGE OBJECT 16630 OWNER TO postgres;

--
-- Name: 16631; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16631');


ALTER LARGE OBJECT 16631 OWNER TO postgres;

--
-- Name: 16632; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16632');


ALTER LARGE OBJECT 16632 OWNER TO postgres;

--
-- Name: 16633; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16633');


ALTER LARGE OBJECT 16633 OWNER TO postgres;

--
-- Name: 16634; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16634');


ALTER LARGE OBJECT 16634 OWNER TO postgres;

--
-- Name: 16635; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16635');


ALTER LARGE OBJECT 16635 OWNER TO postgres;

--
-- Name: 16636; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16636');


ALTER LARGE OBJECT 16636 OWNER TO postgres;

--
-- Name: 16637; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16637');


ALTER LARGE OBJECT 16637 OWNER TO postgres;

--
-- Name: 16638; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16638');


ALTER LARGE OBJECT 16638 OWNER TO postgres;

--
-- Name: 16639; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16639');


ALTER LARGE OBJECT 16639 OWNER TO postgres;

--
-- Name: 16640; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16640');


ALTER LARGE OBJECT 16640 OWNER TO postgres;

--
-- Name: 16641; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16641');


ALTER LARGE OBJECT 16641 OWNER TO postgres;

--
-- Name: 16642; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16642');


ALTER LARGE OBJECT 16642 OWNER TO postgres;

--
-- Name: 16643; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16643');


ALTER LARGE OBJECT 16643 OWNER TO postgres;

--
-- Name: 16644; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16644');


ALTER LARGE OBJECT 16644 OWNER TO postgres;

--
-- Name: 16645; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16645');


ALTER LARGE OBJECT 16645 OWNER TO postgres;

--
-- Name: 16646; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16646');


ALTER LARGE OBJECT 16646 OWNER TO postgres;

--
-- Name: 16647; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16647');


ALTER LARGE OBJECT 16647 OWNER TO postgres;

--
-- Name: 16648; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16648');


ALTER LARGE OBJECT 16648 OWNER TO postgres;

--
-- Name: 16649; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16649');


ALTER LARGE OBJECT 16649 OWNER TO postgres;

--
-- Name: 16650; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16650');


ALTER LARGE OBJECT 16650 OWNER TO postgres;

--
-- Name: 16651; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16651');


ALTER LARGE OBJECT 16651 OWNER TO postgres;

--
-- Name: 16652; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16652');


ALTER LARGE OBJECT 16652 OWNER TO postgres;

--
-- Name: 16653; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16653');


ALTER LARGE OBJECT 16653 OWNER TO postgres;

--
-- Name: 16654; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16654');


ALTER LARGE OBJECT 16654 OWNER TO postgres;

--
-- Name: 16655; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16655');


ALTER LARGE OBJECT 16655 OWNER TO postgres;

--
-- Name: 16656; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16656');


ALTER LARGE OBJECT 16656 OWNER TO postgres;

--
-- Name: 16657; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16657');


ALTER LARGE OBJECT 16657 OWNER TO postgres;

--
-- Name: 16658; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16658');


ALTER LARGE OBJECT 16658 OWNER TO postgres;

--
-- Name: 16659; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16659');


ALTER LARGE OBJECT 16659 OWNER TO postgres;

--
-- Name: 16660; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16660');


ALTER LARGE OBJECT 16660 OWNER TO postgres;

--
-- Name: 16661; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16661');


ALTER LARGE OBJECT 16661 OWNER TO postgres;

--
-- Name: 16662; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16662');


ALTER LARGE OBJECT 16662 OWNER TO postgres;

--
-- Name: 16663; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16663');


ALTER LARGE OBJECT 16663 OWNER TO postgres;

--
-- Name: 16664; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16664');


ALTER LARGE OBJECT 16664 OWNER TO postgres;

--
-- Name: 16665; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16665');


ALTER LARGE OBJECT 16665 OWNER TO postgres;

--
-- Name: 16666; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16666');


ALTER LARGE OBJECT 16666 OWNER TO postgres;

--
-- Name: 16667; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16667');


ALTER LARGE OBJECT 16667 OWNER TO postgres;

--
-- Name: 16668; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16668');


ALTER LARGE OBJECT 16668 OWNER TO postgres;

--
-- Name: 16669; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16669');


ALTER LARGE OBJECT 16669 OWNER TO postgres;

--
-- Name: 16670; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16670');


ALTER LARGE OBJECT 16670 OWNER TO postgres;

--
-- Name: 16671; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16671');


ALTER LARGE OBJECT 16671 OWNER TO postgres;

--
-- Name: 16672; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16672');


ALTER LARGE OBJECT 16672 OWNER TO postgres;

--
-- Name: 16673; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16673');


ALTER LARGE OBJECT 16673 OWNER TO postgres;

--
-- Name: 16674; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16674');


ALTER LARGE OBJECT 16674 OWNER TO postgres;

--
-- Name: 16675; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16675');


ALTER LARGE OBJECT 16675 OWNER TO postgres;

--
-- Name: 16676; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16676');


ALTER LARGE OBJECT 16676 OWNER TO postgres;

--
-- Name: 16677; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16677');


ALTER LARGE OBJECT 16677 OWNER TO postgres;

--
-- Name: 16678; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16678');


ALTER LARGE OBJECT 16678 OWNER TO postgres;

--
-- Name: 16679; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16679');


ALTER LARGE OBJECT 16679 OWNER TO postgres;

--
-- Name: 16680; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16680');


ALTER LARGE OBJECT 16680 OWNER TO postgres;

--
-- Name: 16681; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16681');


ALTER LARGE OBJECT 16681 OWNER TO postgres;

--
-- Name: 16682; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16682');


ALTER LARGE OBJECT 16682 OWNER TO postgres;

--
-- Name: 16696; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16696');


ALTER LARGE OBJECT 16696 OWNER TO postgres;

--
-- Name: 16697; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16697');


ALTER LARGE OBJECT 16697 OWNER TO postgres;

--
-- Name: 16698; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16698');


ALTER LARGE OBJECT 16698 OWNER TO postgres;

--
-- Name: 16699; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16699');


ALTER LARGE OBJECT 16699 OWNER TO postgres;

--
-- Name: 16700; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16700');


ALTER LARGE OBJECT 16700 OWNER TO postgres;

--
-- Name: 16701; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16701');


ALTER LARGE OBJECT 16701 OWNER TO postgres;

--
-- Name: 16702; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16702');


ALTER LARGE OBJECT 16702 OWNER TO postgres;

--
-- Name: 16703; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16703');


ALTER LARGE OBJECT 16703 OWNER TO postgres;

--
-- Name: 16704; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('16704');


ALTER LARGE OBJECT 16704 OWNER TO postgres;

--
-- Name: 19430; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19430');


ALTER LARGE OBJECT 19430 OWNER TO postgres;

--
-- Name: 19431; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19431');


ALTER LARGE OBJECT 19431 OWNER TO postgres;

--
-- Name: 19433; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19433');


ALTER LARGE OBJECT 19433 OWNER TO postgres;

--
-- Name: 19435; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19435');


ALTER LARGE OBJECT 19435 OWNER TO postgres;

--
-- Name: 19437; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19437');


ALTER LARGE OBJECT 19437 OWNER TO postgres;

--
-- Name: 19438; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19438');


ALTER LARGE OBJECT 19438 OWNER TO postgres;

--
-- Data for Name: _admin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._admin (username) FROM stdin;
admin
\.


--
-- Data for Name: _available_time_slot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._available_time_slot (id, end_date, start_date, property_id) FROM stdin;
1	2023-10-04	2023-10-01	1
2	2023-11-04	2023-11-01	1
3	2023-10-05	2023-10-01	2
4	2023-11-05	2023-11-01	2
7	2023-10-07	2023-10-01	4
8	2023-11-07	2023-11-01	4
11	2023-10-09	2023-10-01	6
12	2023-11-09	2023-11-01	6
13	2023-10-10	2023-10-01	7
14	2023-11-10	2023-11-01	7
15	2023-10-11	2023-10-01	8
16	2023-11-11	2023-11-01	8
123	2023-09-25	2023-08-08	20
124	2023-10-13	2023-10-08	20
125	2023-10-04	2023-10-01	20
126	2023-11-04	2023-11-01	20
127	2023-11-24	2023-11-21	20
128	2023-09-25	2023-08-08	21
129	2023-10-13	2023-10-08	21
130	2023-10-04	2023-10-01	21
131	2023-11-04	2023-11-01	21
132	2023-11-22	2023-11-21	21
201	2023-11-06	2023-11-01	3
202	2023-10-06	2023-10-05	3
203	2023-10-02	2023-10-01	3
204	2023-10-08	2023-10-01	5
205	2023-11-08	2023-11-03	5
207	2023-09-22	2023-09-15	23
208	2023-10-13	2023-10-06	23
206	2023-09-08	2023-09-05	23
220	2023-09-02	2023-09-01	35
221	2023-09-28	2023-09-15	35
211	2023-09-26	2023-09-14	29
222	2023-09-15	2023-09-14	38
224	2023-11-12	2023-11-11	9
225	2023-11-10	2023-11-08	9
226	2023-10-06	2023-10-01	10
227	2023-11-30	2023-11-12	10
228	2023-09-27	2023-09-26	10
\.


--
-- Data for Name: _city; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._city (id, name, country_id) FROM stdin;
1	New Kingston	1
2	Pyongyang	2
3	Shymkent	3
4	Colombo	4
5	Antipolo	5
6	Baghdad	6
7	Al Basrah al Qadimah	6
8	Zaporizhzhya	7
9	Bouake	8
10	Abobo	8
11	Leeds	9
12	Kuala Lumpur	10
13	Krakow	11
14	Belgrade	12
15	Cheongju-si	2
16	Ta'if	13
17	Stockholm	14
18	Taiz	15
19	Tembisa	16
20	Can Tho	17
21	Mississauga	18
22	Montreal	18
23	Puente Alto	19
24	As Sulaymaniyah	6
25	Naples	20
26	Medellin	21
27	Yerevan	22
28	Melbourne	23
29	Cartagena	21
30	Edmonton	18
31	Brisbane	23
32	Libreville	24
33	Santiago de los Caballeros	25
34	Algiers	26
35	Alexandria	27
36	Kowloon	28
37	Glasgow	9
38	Kakamega	29
39	Agadir	30
40	Ulan Bator	31
41	Muscat	32
42	Paranaque City	5
43	Kota Bharu	10
44	Busan	2
45	Seongnam-si	2
46	Malacca	10
47	Bremen	33
48	Mosul	6
49	Basrah	6
50	Mukalla	15
51	Harare	34
52	Essen	33
53	Kabul	35
54	N'Djamena	36
55	Sevastopol	7
56	Jeddah	13
57	Singapore	37
58	Poznan	11
59	Makati City	5
60	Odesa	7
61	Marrakesh	30
62	Niamey	38
63	Liverpool	9
64	Bucaramanga	21
65	Boumerdas	26
66	Asmara	39
67	Pikine	40
68	Dakar	40
69	Barcelona	41
70	Kampala	42
71	Bloemfontein	16
72	Abu Ghurayb	6
73	Antwerpen	43
74	Bangui	44
75	Irbid	45
76	Bishkek	46
77	Klang	10
78	Dublin	47
79	Dammam	13
80	Dushanbe	48
81	Asuncion	49
82	Tebessa	26
83	Hamburg	33
84	Al Ahmadi	50
85	Beirut	51
86	Lilongwe	52
87	Conakry	53
88	Montevideo	54
89	Valencia	55
90	Kharkiv	7
91	Petaling Jaya	10
92	Arequipa	56
93	Brussels	43
94	Cotonou	57
95	Minsk	58
96	Lubumbashi	59
97	Valencia	41
98	Comilla	60
99	San Miguel de Tucuman	61
100	Ha'il	13
101	Touba	40
102	Damascus	62
103	Tunis	63
104	Ipoh	10
105	Kuantan	10
106	Kathmandu	64
107	Las Pinas	5
108	Ibague	21
109	Copenhagen	65
110	Port Elizabeth	16
111	Cape Town	16
112	Haiphong	17
113	Yangon	66
114	Kirkuk	6
115	Al Mawsil al Jadidah	6
116	Munich	33
117	Hong Kong	28
118	Kigali	67
119	Mbuji-Mayi	59
120	Santiago	19
121	Pohang	2
122	Kimhae	2
123	Cheonan	2
124	General Santos	5
125	Jerusalem	68
126	Brampton	18
127	Lviv	7
128	Kyiv	7
129	Port Said	27
130	Asyut	27
131	Budapest	69
132	Frankfurt am Main	33
133	Aden	15
134	Phnom Penh	70
135	Nouakchott	71
136	Rome	20
137	Johor Bahru	10
138	Sultanah	13
139	Sofia	72
140	Berlin	33
141	Guayaquil	73
142	Buenos Aires	61
143	Nuernberg	33
144	Koeln	33
145	Duisburg	33
146	Riga	74
147	Rabat	30
148	Blantyre	52
149	Zarqa	45
150	Villa Nueva	75
151	Tegucigalpa	76
152	Fes	30
153	Rotterdam	77
154	Lima	56
155	Quezon City	5
156	Bulawayo	34
157	Bogota	21
158	Santiago de Cuba	78
159	Quito	73
160	Tanta	27
161	Shubra al Khaymah	27
162	Cairo	27
163	Al Mahallah al Kubra	27
164	Birmingham	9
165	Port-au-Prince	79
166	Dresden	33
167	Homyel'	58
168	Winnipeg	18
169	Kingston	1
170	Nairobi	29
171	Kota Kinabalu	10
172	Al Mansurah	27
173	Sevilla	41
174	Madrid	41
175	Erbil	6
176	Genoa	20
177	Buraydah	13
178	Mogadishu	80
179	Homs	62
180	Lisbon	81
181	Taguig	5
182	Banqiao	82
183	Thuan An	17
184	Sanaa	15
185	Pretoria	16
186	Pietermaritzburg	16
187	Abu Dhabi	83
188	Rosario	61
189	Vancouver	18
190	Kinshasa	59
191	Cucuta	21
192	Luanda	84
193	Takeo	70
194	Daegu	2
195	Vilnius	85
196	Kampung Baru Subang	10
197	Subang Jaya	10
198	Maputo	86
199	Cebu City	5
200	Callao	56
201	Tashkent	87
202	Maturin	55
203	Donetsk	7
204	Taichung	82
205	Hanoi	17
206	Santo Domingo Oeste	25
207	Malaga	41
208	Santo Domingo Este	25
209	Al Fayyum	27
210	Sarajevo	88
211	London	9
212	Accra	89
213	Gwangju	2
214	Ansan-si	2
215	Casablanca	30
216	Nyala	90
217	Bucharest	91
218	Dnipro	7
219	Pasig City	5
220	Omdurman	90
221	Khartoum	90
222	Ouagadougou	92
223	Santa Cruz de la Sierra	93
224	Djibouti	94
225	Grosszschocher	33
226	Caracas	55
227	Durban	16
228	Bien Hoa	17
229	Mandalay	66
230	Macau	95
231	Nampula	86
232	San Pedro Sula	76
233	Kandahar	35
234	Gold Coast	23
235	Najran	13
236	Bangkok	96
237	Samarkand	87
238	Kaohsiung	82
239	Da Nang	17
240	Tripoli	97
241	Sale	30
242	Trujillo	56
243	Davao	5
244	Madinat an Nasr	27
245	Tuen Mun	28
246	Kleinzschocher	33
247	Herat	35
248	Vienna	98
249	San Salvador	99
250	Ciudad Guayana	55
251	Barcelona	55
252	Al Hudaydah	15
253	Soweto	16
254	Benoni	16
255	Ho Chi Minh City	17
256	Pointe-Noire	59
257	Brazzaville	59
258	Cordoba	61
259	Aktobe	3
260	Chisinau	100
261	Wroclaw	11
262	Oslo	101
263	Caloocan City	5
264	Lome	102
265	Kryvyy Rih	7
266	Amman	45
267	Goyang-si	2
268	Monrovia	103
269	Meknes	30
270	Antananarivo	104
271	Helsinki	105
272	Barquisimeto	55
273	Marseille	106
274	Lyon	106
275	Kumasi	89
276	Suez	27
277	Giza	27
278	Suwon	2
279	Incheon	2
280	Hwaseong-si	2
281	Changwon	2
282	Bamako	107
283	Beira	86
284	Amsterdam	77
285	Manila	5
286	Calamba	5
287	Medina	13
288	Taipei	82
289	Hamilton	18
290	Daejeon	2
291	Turin	20
292	Edinburgh	9
293	Namangan	87
294	Santo Domingo	25
295	Yaounde	108
296	Sharjah	83
297	Al Ain City	83
298	Perth	23
299	Bucheon-si	2
300	Tangier	30
301	Nay Pyi Taw	66
302	Karbala	6
303	Milan	20
304	Athens	109
305	Mecca	13
306	Freetown	110
307	Bujumbura	111
308	Quebec	18
309	Havana	78
310	Dhaka	60
311	Mazar-e Sharif	35
312	Mar del Plata	61
313	Salta	61
314	Managua	112
315	Hamhung	2
316	Seoul	2
317	Benghazi	97
318	Sheffield	9
319	Camayenne	53
320	Zagreb	113
321	Tabuk	13
322	Riyadh	13
323	Matola	86
324	Jeonju	2
325	Almaty	3
326	Maracay	55
327	Budta	5
328	Cali	21
329	Abidjan	8
330	Douala	108
331	Leipzig	33
332	Hannover	33
333	Duesseldorf	33
334	Dubai	83
335	Guatemala City	75
336	Cuenca	73
337	Addis Ababa	114
338	Baku	115
339	Lodz	11
340	Mombasa	29
341	Ulsan	2
342	Ra's Bayrut	51
343	Malingao	5
344	Warsaw	11
345	Goeteborg	14
346	Dar es Salaam	116
347	Adelaide	23
348	Chattogram	60
349	Bobo-Dioulasso	92
350	La Paz	93
351	Calgary	18
352	Ottawa	18
353	Toronto	18
354	Kisangani	59
355	Shah Alam	10
356	Johannesburg	16
357	Paris	106
358	Sydney	23
359	Khulna	60
360	Aleppo	62
361	Ar Raqqah	62
362	Anyang-si	2
363	Nasiriyah	6
364	Palermo	20
365	Tbilisi	117
366	Victoria	28
367	Lusaka	118
368	Rajshahi	60
369	Rangpur	60
370	Cochabamba	93
371	Barranquilla	21
372	Prague	119
373	Stuttgart	33
374	Oran	26
375	Zaragoza	41
376	Dortmund	33
377	Chiclayo	56
378	Maracaibo	55
379	Latakia	62
380	Ashgabat	120
381	Tainan	82
\.


--
-- Data for Name: _conversation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._conversation (id, deleted_by_host, guest_user_username, property_id) FROM stdin;
2	f	guest	37
4	f	newhost	10
5	f	admin	10
3	f	pavlos	10
1	f	guest	10
6	f	admin	5
8	f	pavlos	38
7	t	admin	9
9	t	pavlos	35
\.


--
-- Data for Name: _country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._country (id, name) FROM stdin;
1	Jamaica
2	Korea
3	Kazakhstan
4	Sri Lanka
5	Philippines
6	Iraq
7	Ukraine
8	Côte d'Ivoire
9	United Kingdom
10	Malaysia
11	Poland
12	Serbia
13	Saudi Arabia
14	Sweden
15	Yemen
16	South Africa
17	Viet Nam
18	Canada
19	Chile
20	Italy
21	Colombia
22	Armenia
23	Australia
24	Gabon
25	Dominican Republic
26	Algeria
27	Egypt
28	Hong Kong
29	Kenya
30	Morocco
31	Mongolia
32	Oman
33	Germany
34	Zimbabwe
35	Afghanistan
36	Chad
37	Singapore
38	Niger
39	Eritrea
40	Senegal
41	Spain
42	Uganda
43	Belgium
44	Central African Republic
45	Jordan
46	Kyrgyzstan
47	Ireland
48	Tajikistan
49	Paraguay
50	Kuwait
51	Lebanon
52	Malawi
53	Guinea
54	Uruguay
55	Venezuela
56	Peru
57	Benin
58	Belarus
59	Congo
60	Bangladesh
61	Argentina
62	Syrian Arab Republic
63	Tunisia
64	Nepal
65	Denmark
66	Myanmar
67	Rwanda
68	Israel
69	Hungary
70	Cambodia
71	Mauritania
72	Bulgaria
73	Ecuador
74	Latvia
75	Guatemala
76	Honduras
77	Netherlands
78	Cuba
79	Haiti
80	Somalia
81	Portugal
82	Taiwan
83	United Arab Emirates
84	Angola
85	Lithuania
86	Mozambique
87	Uzbekistan
88	Bosnia and Herzegovina
89	Ghana
90	Sudan
91	Romania
92	Burkina Faso
93	Bolivia
94	Djibouti
95	Macau
96	Thailand
97	Libyan Arab Jamahiriya
98	Austria
99	El Salvador
100	Moldova
101	Norway
102	Togo
103	Liberia
104	Madagascar
105	Finland
106	France
107	Mali
108	Cameroon
109	Greece
110	Sierra Leone
111	Burundi
112	Nicaragua
113	Croatia
114	Ethiopia
115	Azerbaijan
116	Tanzania
117	Georgia
118	Zambia
119	Czech Republic
120	Turkmenistan
\.


--
-- Data for Name: _guest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._guest (username) FROM stdin;
admin
pavlos
guest
newhost
\.


--
-- Data for Name: _host; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._host (username) FROM stdin;
admin
host1
host2
newhost
\.


--
-- Data for Name: _image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._image (id, is_main, path) FROM stdin;
3	f	3.png
4	f	4.jpg
5	t	5.jpg
40	t	40.jpg
73	f	73.jpg
74	f	74.jpg
75	f	75.png
45	t	45.jpg
46	t	46.jpg
76	f	76.jpg
77	f	77.jpg
78	f	78.jpg
79	f	79.jpg
80	f	80.jpg
81	f	81.jpg
82	f	82.jpg
83	f	83.png
84	f	84.png
85	f	85.jpg
86	f	86.jpg
91	f	91.jpg
94	f	94.jpg
90	f	90.png
92	t	92.jpg
96	t	96.jpg
97	f	97.jpg
98	f	98.jpg
100	f	100.jpg
99	t	99.jpg
101	f	101.jpg
102	f	102.jpg
103	f	103.jpg
104	t	104.jpg
105	t	105.jpg
106	f	106.jpg
107	f	107.png
108	f	108.png
\.


--
-- Data for Name: _message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._message (id, sent_on, text, conversation_id, sent_by_username) FROM stdin;
1	2023-09-03 21:45:45.85	16657	1	guest
2	2023-09-03 22:08:04.583	16658	1	admin
3	2023-09-03 22:13:55.85	16659	2	admin
4	2023-09-03 22:16:37.282	16660	3	pavlos
5	2023-09-03 22:17:39.956	16661	2	guest
6	2023-09-03 22:18:00.002	16662	1	guest
7	2023-09-03 22:21:25.687	16663	4	newhost
8	2023-09-03 22:22:40.392	16664	3	pavlos
9	2023-09-03 22:23:34.203	16665	1	admin
10	2023-09-04 21:09:36.452	16666	1	admin
11	2023-09-04 21:17:35.364	16667	1	guest
12	2023-09-05 00:20:32.797	16668	1	guest
13	2023-09-05 00:25:40.644	16669	1	guest
14	2023-09-05 00:26:33.524	16670	1	admin
15	2023-09-05 01:20:40.799	16671	1	admin
16	2023-09-05 01:21:49.538	16672	1	guest
17	2023-09-05 01:22:34.087	16673	1	admin
18	2023-09-05 09:55:01.55	16674	1	guest
19	2023-09-05 10:02:00.6	16675	1	admin
20	2023-09-05 10:09:05.473	16676	1	guest
21	2023-09-05 10:11:15.768	16677	1	guest
22	2023-09-05 10:12:09.31	16678	1	guest
23	2023-09-05 10:25:04.855	16679	1	guest
24	2023-09-05 12:14:05.564	16680	1	admin
25	2023-09-05 12:14:22.412	16681	1	guest
40	2023-09-05 22:07:45.164	16696	5	admin
41	2023-09-05 22:08:51.404	16697	5	admin
42	2023-09-05 22:09:09.827	16698	5	admin
43	2023-09-05 22:09:55.973	16699	5	admin
44	2023-09-05 22:09:57.751	16700	5	admin
45	2023-09-05 22:09:59.283	16701	5	admin
46	2023-09-05 22:10:08.032	16702	5	admin
47	2023-09-06 03:36:53.284	16703	5	admin
48	2023-09-06 03:40:05.035	16704	4	admin
49	2023-09-09 01:24:50.811	16623	6	admin
50	2023-09-09 10:56:52.49	16626	5	admin
51	2023-09-09 20:01:37.654	16627	1	admin
52	2023-09-09 20:02:52.678	16628	1	guest
53	2023-09-12 15:20:06.318	16636	3	pavlos
54	2023-09-12 19:53:25.32	16637	7	admin
55	2023-09-13 02:01:01.152	16645	8	pavlos
56	2023-09-16 13:47:06.959	16646	8	pavlos
57	2023-09-16 13:47:45.075	16651	9	pavlos
58	2023-09-16 14:44:11.187	16652	9	pavlos
59	2023-09-16 14:48:11.703	16655	9	admin
\.


--
-- Data for Name: _property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property (id, address, description, latitude, longitude, name, space_area, type, city_id, host_username) FROM stdin;
1	Address 1	19430	\N	\N	Property 1	1	PRIVATE_PROPERTY	1	admin
2	Address 2	19431	\N	\N	Property 2	1	PRIVATE_PROPERTY	2	admin
4	Address 4	19433	\N	\N	Property 4	1	PRIVATE_PROPERTY	4	admin
6	Address 6	19435	\N	\N	Property 6	1	PRIVATE_PROPERTY	6	admin
7	Address 7	19437	\N	\N	Property 7	1	PRIVATE_PROPERTY	7	admin
8	Address 8	19438	\N	\N	Property 8	1	PRIVATE_PROPERTY	8	admin
20	Address 10 New	16630	38.116828199666465	23.86143414444651	Property 11	100	SHARED_ROOM	304	admin
21	Address 10 New	16631	38.116828199666465	23.86143414444651	Property 12	100	SHARED_ROOM	304	admin
10	Paris 10, 15576	16635	48.85463513865946	2.3488421781654005	Property 10	100	SHARED_ROOM	357	admin
3	Aktobe Address	16638	50.28758439955974	57.22366269767212	Property 3	1	SHARED_ROOM	259	admin
5	Address 5	16639	\N	\N	Property 5	1	SHARED_ROOM	5	admin
23	Athens 15579	16640	38.11191993108296	23.839817679525154	Νέο Κατάλυμα	1	PRIVATE_ROOM	304	admin
26		16642	38.116828199666465	23.86143414444651	Νέο Κατάλυμα 2	1	PRIVATE_PROPERTY	247	admin
27	Herat	16643	38.116828199666465	23.86143414444651	Νέο Κατάλυμα 2	1	PRIVATE_PROPERTY	247	admin
28	Herat	16644	38.116828199666465	23.86143414444651	Νέο Κατάλυμα 2	1	PRIVATE_PROPERTY	247	admin
29	Kabul2	16647	38.116828199666465	23.86143414444651	Νέο Κατάλυμα	1	SHARED_ROOM	53	admin
30		16648	38.116828199666465	23.86143414444651	Νέο	1	PRIVATE_PROPERTY	233	admin
32		16649	38.116828199666465	23.86143414444651	Νέο Κατάλυμα	1	PRIVATE_PROPERTY	311	admin
33		16650	38.116828199666465	23.86143414444651	Νέο Κατάλυμα	1	PRIVATE_PROPERTY	248	admin
35		16653	48.203861544782384	16.36163084552657	Κατάλυμα 35	1	PRIVATE_PROPERTY	248	admin
37		16656	38.116828199666465	23.86143414444651	Test Κατάλυμα 37	1	PRIVATE_PROPERTY	258	admin
9	Avenue Victor Biaka Boda	16629	5.3094243223138875	-4.014006194476011	Property 9	1	PRIVATE_PROPERTY	329	admin
38	Rue Ahmed Chaib	16632	36.776627629845066	3.058801978018564	Host Κατάλυμα	1	PRIVATE_PROPERTY	34	host1
40		16682	38.116828199666465	23.86143414444651	Transport Κατάλυμα	1	PRIVATE_PROPERTY	258	admin
\.


--
-- Data for Name: _property_amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property_amenities (property_id, has_elevator, has_heating, has_kitchen, has_lounge, has_parking, has_refrigerator, has_tv, has_wifi, num_bathrooms, num_bedrooms, num_beds) FROM stdin;
1	t	f	t	f	t	t	f	f	1	1	1
2	f	t	f	t	f	f	t	t	2	2	2
4	f	t	f	t	f	f	t	t	4	4	4
5	t	f	t	f	t	t	f	f	5	5	5
6	f	t	f	t	f	f	t	t	6	6	6
7	t	f	t	f	t	t	f	f	7	7	7
8	f	t	f	t	f	f	t	t	8	8	8
9	t	f	t	f	t	t	f	f	9	9	9
20	t	t	t	t	t	t	t	t	22	22	22
21	t	t	t	t	t	t	t	t	22	22	22
10	f	t	f	t	f	f	t	t	2	2	2
3	t	f	t	f	t	t	t	f	3	3	3
23	f	t	t	t	t	t	t	t	1	1	2
26	f	f	f	f	f	f	f	f	0	0	0
27	f	f	f	f	f	f	f	f	0	0	0
28	f	f	f	f	f	f	f	f	0	0	0
29	f	f	f	f	f	f	f	t	0	0	2
30	f	f	f	f	f	f	f	f	0	0	0
32	f	f	f	f	f	f	f	f	0	0	0
33	f	f	f	f	f	f	f	f	0	0	0
35	f	f	f	f	f	f	f	f	0	0	1
37	f	f	f	f	f	f	f	f	0	0	1
38	f	f	f	f	f	f	f	f	0	0	1
40	f	f	f	f	f	f	f	f	0	0	0
\.


--
-- Data for Name: _property_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property_image (property_id, image_id) FROM stdin;
4	40
20	45
21	46
3	96
3	97
5	3
5	4
5	5
23	99
23	100
29	101
29	102
37	104
35	103
38	106
9	105
9	107
40	108
10	91
10	94
10	90
10	92
\.


--
-- Data for Name: _property_rules; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property_rules (property_id, base_day_cost, events_allowed, min_reservation_days, per_guest_cost, pets_allowed, smoking_allowed) FROM stdin;
1	20	f	1	1	t	f
2	20	t	2	2	f	t
4	20	t	4	4	f	t
5	20	f	5	5	t	f
6	20	t	6	6	f	t
7	20	f	7	7	t	f
8	20	t	8	8	f	t
9	20	f	9	9	t	f
20	200	f	1	100	f	f
21	200	f	1	100	f	f
10	20	f	1	10	t	f
3	30	f	3	10	t	f
23	100	t	1	40	f	t
26	0	f	1	0	f	f
27	0	f	1	0	f	f
28	0	f	1	0	f	f
29	10	t	1	11	f	f
30	0	f	1	0	f	f
32	0	f	1	0	f	f
33	0	f	1	0	f	f
35	0	f	1	0	t	f
37	0	f	1	0	f	f
38	0	f	1	0	f	f
40	0	f	1	0	f	f
\.


--
-- Data for Name: _public_transport_accesses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._public_transport_accesses (property_id, accessed_by_bus, accessed_by_metro, accessed_by_railway, accessed_by_tram) FROM stdin;
1	f	f	f	f
2	f	f	f	f
3	f	f	f	f
4	f	f	f	f
5	f	f	f	f
6	f	f	f	f
7	f	f	f	f
8	f	f	f	f
9	f	f	f	f
20	f	f	f	f
21	f	f	f	f
23	f	f	f	f
26	f	f	f	f
27	f	f	f	f
28	f	f	f	f
29	f	f	f	f
30	f	f	f	f
32	f	f	f	f
33	f	f	f	f
35	f	f	f	f
37	f	f	f	f
38	f	f	f	f
40	t	t	t	t
10	t	t	f	f
\.


--
-- Data for Name: _reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._reservation (id, end_date, num_persons, start_date, guest_username, property_id) FROM stdin;
1	2023-10-08	10	2023-10-04	admin	10
2	2023-11-08	10	2023-11-04	admin	10
3	2023-11-08	9	2023-11-04	admin	9
4	2023-10-08	9	2023-10-04	admin	9
5	2023-10-04	9	2023-10-01	admin	9
6	2023-10-12	9	2023-10-09	admin	9
7	2023-10-09	9	2023-10-08	admin	9
8	2023-11-11	9	2023-11-10	admin	9
9	2023-11-04	9	2023-11-02	admin	9
11	2023-11-02	9	2023-11-01	admin	9
12	2023-11-24	1	2023-11-22	admin	21
13	2023-09-26	1	2023-09-13	admin	10
14	2023-10-05	3	2023-10-02	admin	3
15	2023-11-03	1	2023-11-01	admin	5
16	2023-09-05	1	2023-09-01	admin	23
17	2023-09-12	1	2023-09-05	admin	29
18	2023-09-07	1	2023-09-02	admin	35
19	2023-09-14	1	2023-09-09	pavlos	38
20	2023-09-12	1	2023-09-07	pavlos	35
21	2023-09-14	1	2023-09-12	admin	29
22	2023-09-16	1	2023-09-15	pavlos	38
23	2023-09-11	1	2023-09-10	pavlos	38
\.


--
-- Data for Name: _review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._review (id, created_on, stars, text, guest_username, property_id) FROM stdin;
2	2023-10-01	1	16613	admin	9
3	2023-10-02	1	16614	admin	9
4	2023-10-03	1	16615	admin	9
5	2023-10-04	1	16616	admin	9
6	2023-10-05	2	16617	admin	9
7	2023-10-06	2	16618	admin	9
8	2023-10-07	3	16619	admin	9
9	2023-10-08	3	16620	admin	9
10	2023-10-09	4	16621	admin	9
11	2023-10-10	4	16622	admin	9
12	2023-08-20	3	16624	admin	8
13	2023-08-20	2	16625	admin	7
14	2023-08-29	3	16634	admin	10
15	2023-09-01	5	16641	admin	23
16	2023-09-02	2	16654	admin	35
17	2023-09-09	3	16633	pavlos	38
\.


--
-- Data for Name: _role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._role (name) FROM stdin;
ADMIN
GUEST
HOST
\.


--
-- Data for Name: _user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._user (username, email, first_name, is_active, is_locked, last_name, mobile_number, password, image_id) FROM stdin;
newhost			t	f			$2a$10$LrERlmncI.xZ6DFiBR8cde/dPg4yZdjOro2XTENiSuHnUjlFvxo..	\N
pavlos	pavlos.spanoudakis@gmail.com	Pavlos	t	f	Spanoudakis	6971852396	$2a$10$m7WkMY4LbbotM40pmeXSBOY4T4xfBFCHEyOwLTF.dA5ZAqeFUho8q	\N
admin	admin@admin.admin	Admin	t	f	Admin	696969	$2a$10$BxQnaglUv1IptBPrIjySiun8uEssBD9fjG7MctLxk5AbyVATTVNle	\N
host2			t	f			$2a$10$gbL2kwVXhv12M60sW7urs.oo15YyEFdZa5Re5czCa79TO8rWI/J/C	\N
guest			f	f			$2a$10$AlmQxZClpPB0odWSDpjv7uzD7PF4LujwIrQMz/.0JEhANl41wsZ7m	\N
host1	h@h.h	\N	t	f	\N		$2a$10$0rZwuotrsEilXU8EE4CsOOiW4pWndJJ866Xm6EsXuwd1Zttf8QHX.	\N
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_role (user_username, role_name) FROM stdin;
host1	HOST
guest	GUEST
host2	HOST
newhost	GUEST
newhost	HOST
pavlos	GUEST
admin	ADMIN
admin	GUEST
admin	HOST
\.


--
-- Name: _available_time_slot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._available_time_slot_id_seq', 228, true);


--
-- Name: _city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._city_id_seq', 381, true);


--
-- Name: _conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._conversation_id_seq', 9, true);


--
-- Name: _country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._country_id_seq', 120, true);


--
-- Name: _image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._image_id_seq', 108, true);


--
-- Name: _message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._message_id_seq', 59, true);


--
-- Name: _property_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._property_id_seq', 40, true);


--
-- Name: _reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._reservation_id_seq', 23, true);


--
-- Name: _review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._review_id_seq', 17, true);


--
-- Data for Name: BLOBS; Type: BLOBS; Schema: -; Owner: -
--

BEGIN;

SELECT pg_catalog.lo_open('16613', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787430');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16614', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787431');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16615', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787432');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16616', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787433');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16617', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787434');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16618', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787435');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16619', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787436');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16620', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787437');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16621', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787438');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16622', 131072);
SELECT pg_catalog.lowrite(0, '\x7465787439');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16623', 131072);
SELECT pg_catalog.lowrite(0, '\x68656c6c6f21');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16624', 131072);
SELECT pg_catalog.lowrite(0, '\x48656c6c6f20576f726c6421212132');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16625', 131072);
SELECT pg_catalog.lowrite(0, '\x48656c6c6f20576f726c64');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16626', 131072);
SELECT pg_catalog.lowrite(0, '\x627965');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16627', 131072);
SELECT pg_catalog.lowrite(0, '\x726574657374696e6720f09f988e');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16628', 131072);
SELECT pg_catalog.lowrite(0, '\x6865686565656520f09fa4a3');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16629', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632039');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16630', 131072);
SELECT pg_catalog.lowrite(0, '\x44657363203131');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16631', 131072);
SELECT pg_catalog.lowrite(0, '\x44657363203132');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16632', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16633', 131072);
SELECT pg_catalog.lowrite(0, '\x746573742072657669657720f09f988b');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16634', 131072);
SELECT pg_catalog.lowrite(0, '\x477265617421');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16635', 131072);
SELECT pg_catalog.lowrite(0, '\x44657363203130204e4557');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16636', 131072);
SELECT pg_catalog.lowrite(0, '\x68656c6c6f20776f726c64');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16637', 131072);
SELECT pg_catalog.lowrite(0, '\x68693921');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16638', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632033');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16639', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632035');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16640', 131072);
SELECT pg_catalog.lowrite(0, '\x4465736372697074696f6e');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16641', 131072);
SELECT pg_catalog.lowrite(0, '\x212121');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16642', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16643', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16644', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16645', 131072);
SELECT pg_catalog.lowrite(0, '\x68657921');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16646', 131072);
SELECT pg_catalog.lowrite(0, '\x68656c6c6f21');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16647', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16648', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16649', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16650', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16651', 131072);
SELECT pg_catalog.lowrite(0, '\x3338');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16652', 131072);
SELECT pg_catalog.lowrite(0, '\x6f6f6f6f6f6f6f7073');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16653', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16654', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16655', 131072);
SELECT pg_catalog.lowrite(0, '\x68656c6c6f');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16656', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16657', 131072);
SELECT pg_catalog.lowrite(0, '\x68656c6c6f20776f726c6421');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16658', 131072);
SELECT pg_catalog.lowrite(0, '\x68656c6c6f21');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16659', 131072);
SELECT pg_catalog.lowrite(0, '\x68656c6c6f212121212121');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16660', 131072);
SELECT pg_catalog.lowrite(0, '\x68656c6c6f207061766c6f73212121212121');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16661', 131072);
SELECT pg_catalog.lowrite(0, '\x2168656c6c6f20616761696e21');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16662', 131072);
SELECT pg_catalog.lowrite(0, '\x2168656c6c6f20616761696e21');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16663', 131072);
SELECT pg_catalog.lowrite(0, '\x2168656c6c6f2068656c6c6f21');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16664', 131072);
SELECT pg_catalog.lowrite(0, '\x696d206261636b');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16665', 131072);
SELECT pg_catalog.lowrite(0, '\x6261636b');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16666', 131072);
SELECT pg_catalog.lowrite(0, '\x74657374');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16667', 131072);
SELECT pg_catalog.lowrite(0, '\x74657374206261636b');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16668', 131072);
SELECT pg_catalog.lowrite(0, '\x424c4141414141414141414141');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16669', 131072);
SELECT pg_catalog.lowrite(0, '\x68656c6c6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16670', 131072);
SELECT pg_catalog.lowrite(0, '\x48454c4c4f20465249454e44');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16671', 131072);
SELECT pg_catalog.lowrite(0, '\x48454c4c4f20414741494e21212121212121');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16672', 131072);
SELECT pg_catalog.lowrite(0, '\x41414141414141414141414141414141');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16673', 131072);
SELECT pg_catalog.lowrite(0, '\x62796521');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16674', 131072);
SELECT pg_catalog.lowrite(0, '\x4d55493a204d697373696e67206c6963656e7365206b65792e0a0a546865206c6963656e7365206b6579206973206d697373696e672e20596f75206d69676874206e6f7420626520616c6c6f77656420746f207573652060406d75692f782d646174652d7069636b6572732d70726f602077686963682069732070617274206f66204d554920582050726f2e0a0a546f20736f6c7665207468652069737375652c20796f752063616e20636865636b20746865206672656520747269616c20636f6e646974696f6e733a2068747470733a2f2f6d75692e636f6d2f722f782d6c6963656e73652d747269616c2e0a496620796f752061726520656c696769626c65206e6f20616374696f6e73206172652072657175697265642e20496620796f7520617265206e6f7420656c696769626c6520746f20746865206672656520747269616c2c20796f75206e65656420746f2070757263686173652061206c6963656e73652068747470733a2f2f6d75692e636f6d2f722f782d6765742d6c6963656e7365206f722073746f70207573696e672074686520736f66747761726520696d6d6564696174656c792e');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16675', 131072);
SELECT pg_catalog.lowrite(0, '\x4f4b2120f09f9881');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16676', 131072);
SELECT pg_catalog.lowrite(0, '\x74657374');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16677', 131072);
SELECT pg_catalog.lowrite(0, '\x7465737432');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16678', 131072);
SELECT pg_catalog.lowrite(0, '\x74');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16679', 131072);
SELECT pg_catalog.lowrite(0, '\x62727272727272727272');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16680', 131072);
SELECT pg_catalog.lowrite(0, '\x48454c4c4f');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16681', 131072);
SELECT pg_catalog.lowrite(0, '\x4849205448455245');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16682', 131072);
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16696', 131072);
SELECT pg_catalog.lowrite(0, '\x6e657721');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16697', 131072);
SELECT pg_catalog.lowrite(0, '\x46696e616c20526573756c740a496e2065697468657220796f757220557365722053657474696e6773206f7220576f726b73706163652053657474696e6773204a534f4e2066696c652c20796f752073686f756c6420686176652061206c696e652072656164696e67202266696c65732e696e7365727446696e616c4e65776c696e65223a20747275652c2077697468696e207468652070726f7669646564206375726c792062726163657320287b207d292e204164646974696f6e616c6c792c20696e207468652053657474696e677320706167652c2074686520636865636b626f7820756e646572207468652068656164696e67202746696c65733a20496e736572742046696e616c204e65776c696e65272077696c6c2062652073656c65637465642e0a0a56697375616c2053747564696f20436f64652077696c6c206e6f772061646420616e20656d707479206c696e6520746f2074686520656e64206f662066696c6573207768656e206265696e672073617665642c2069662074686572652069736e277420616c7265616479206f6e652e');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16698', 131072);
SELECT pg_catalog.lowrite(0, '\x46696e616c20526573756c7420496e2065697468657220796f757220557365722053657474696e6773206f7220576f726b73706163652053657474696e6773204a534f4e2066696c652c20796f752073686f756c6420686176652061206c696e652072656164696e67202266696c65732e696e7365727446696e616c4e65776c696e65223a20747275652c2077697468696e207468652070726f7669646564206375726c792062726163657320287b207d292e204164646974696f6e616c6c792c20696e207468652053657474696e677320706167652c2074686520636865636b626f7820756e646572207468652068656164696e67202746696c65733a20496e736572742046696e616c204e65776c696e65272077696c6c2062652073656c65637465642e2056697375616c2053747564696f20436f64652077696c6c206e6f772061646420616e20656d707479206c696e6520746f2074686520656e64206f662066696c6573207768656e206265696e672073617665642c2069662074686572652069736e277420616c7265616479206f6e652e');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16699', 131072);
SELECT pg_catalog.lowrite(0, '\x46696e616c20526573756c7420496e2065697468657220796f757220557365722053657474696e6773206f7220576f726b73706163652053657474696e6773204a534f4e2066696c652c20796f752073686f756c6420686176652061206c696e652072656164696e67202266696c65732e696e7365727446696e616c4e65776c696e65223a20747275652c2077697468696e207468652070726f7669646564206375726c792062726163657320287b207d292e204164646974696f6e616c6c792c20696e207468652053657474696e677320706167652c2074686520636865636b626f7820756e646572207468652068656164696e67202746696c65733a20496e736572742046696e616c204e65776c696e65272077696c6c2062652073656c65637465642e2056697375616c2053747564696f20436f64652077696c6c206e6f772061646420616e20656d707479206c696e6520746f2074686520656e64206f662066696c6573207768656e206265696e672073617665642c2069662074686572652069736e277420616c7265616479206f6e652e0a0a');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16700', 131072);
SELECT pg_catalog.lowrite(0, '\x46696e616c20526573756c7420496e2065697468657220796f757220557365722053657474696e6773206f7220576f726b73706163652053657474696e6773204a534f4e2066696c652c20796f752073686f756c6420686176652061206c696e652072656164696e67202266696c65732e696e7365727446696e616c4e65776c696e65223a20747275652c2077697468696e207468652070726f7669646564206375726c792062726163657320287b207d292e204164646974696f6e616c6c792c20696e207468652053657474696e677320706167652c2074686520636865636b626f7820756e646572207468652068656164696e67202746696c65733a20496e736572742046696e616c204e65776c696e65272077696c6c2062652073656c65637465642e2056697375616c2053747564696f20436f64652077696c6c206e6f772061646420616e20656d707479206c696e6520746f2074686520656e64206f662066696c6573207768656e206265696e672073617665642c2069662074686572652069736e277420616c7265616479206f6e652e0a0a');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16701', 131072);
SELECT pg_catalog.lowrite(0, '\x46696e616c20526573756c7420496e2065697468657220796f757220557365722053657474696e6773206f7220576f726b73706163652053657474696e6773204a534f4e2066696c652c20796f752073686f756c6420686176652061206c696e652072656164696e67202266696c65732e696e7365727446696e616c4e65776c696e65223a20747275652c2077697468696e207468652070726f7669646564206375726c792062726163657320287b207d292e204164646974696f6e616c6c792c20696e207468652053657474696e677320706167652c2074686520636865636b626f7820756e646572207468652068656164696e67202746696c65733a20496e736572742046696e616c204e65776c696e65272077696c6c2062652073656c65637465642e2056697375616c2053747564696f20436f64652077696c6c206e6f772061646420616e20656d707479206c696e6520746f2074686520656e64206f662066696c6573207768656e206265696e672073617665642c2069662074686572652069736e277420616c7265616479206f6e652e0a0a');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16702', 131072);
SELECT pg_catalog.lowrite(0, '\x69');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16703', 131072);
SELECT pg_catalog.lowrite(0, '\x46696e616c20526573756c7420496e2065697468657220796f757220557365722053657474696e6773206f7220576f726b73706163652053657474696e6773204a534f4e2066696c652c20796f752073686f756c6420686176652061206c696e652072656164696e67202266696c65732e696e7365727446696e616c4e65776c696e65223a20747275652c2077697468696e207468652070726f7669646564206375726c792062726163657320287b207d292e204164646974696f6e616c6c792c20696e207468652053657474696e677320706167652c2074686520636865636b626f7820756e646572207468652068656164696e67202746696c65733a20496e736572742046696e616c204e65776c696e65272077696c6c2062652073656c65637465642e2056697375616c2053747564696f20436f64652077696c6c206e6f772061646420616e20656d707479206c696e6520746f2074686520656e64206f662066696c6573207768656e206265696e672073617665642c2069662074686572652069736e277420616c7265616479206f6e652e');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('16704', 131072);
SELECT pg_catalog.lowrite(0, '\x686921');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19430', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632031');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19431', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632032');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19433', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632034');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19435', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632036');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19437', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632037');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19438', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632038');
SELECT pg_catalog.lo_close(0);

COMMIT;

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
-- Name: _conversation _conversation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._conversation
    ADD CONSTRAINT _conversation_pkey PRIMARY KEY (id);


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
-- Name: _public_transport_accesses _public_transport_accesses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._public_transport_accesses
    ADD CONSTRAINT _public_transport_accesses_pkey PRIMARY KEY (property_id);


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
-- Name: _message fk58x69j9pqcyn75ls5t6o67nd7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._message
    ADD CONSTRAINT fk58x69j9pqcyn75ls5t6o67nd7 FOREIGN KEY (conversation_id) REFERENCES public._conversation(id);


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
-- Name: _message fkelcaebrjg5ynpsgm29wa0hrme; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._message
    ADD CONSTRAINT fkelcaebrjg5ynpsgm29wa0hrme FOREIGN KEY (sent_by_username) REFERENCES public._user(username);


--
-- Name: _conversation fkeug5b5q3uanp61n0j3vld3864; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._conversation
    ADD CONSTRAINT fkeug5b5q3uanp61n0j3vld3864 FOREIGN KEY (property_id) REFERENCES public._property(id);


--
-- Name: _public_transport_accesses fkexa02guuco23vr8dh2pmshfe1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._public_transport_accesses
    ADD CONSTRAINT fkexa02guuco23vr8dh2pmshfe1 FOREIGN KEY (property_id) REFERENCES public._property(id);


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
-- Name: _conversation fkn5c7prfy764cw18xi1139iwr9; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._conversation
    ADD CONSTRAINT fkn5c7prfy764cw18xi1139iwr9 FOREIGN KEY (guest_user_username) REFERENCES public._guest(username);


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

