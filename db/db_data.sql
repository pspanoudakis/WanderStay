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
-- Name: 19190; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19190');


ALTER LARGE OBJECT 19190 OWNER TO postgres;

--
-- Name: 19191; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19191');


ALTER LARGE OBJECT 19191 OWNER TO postgres;

--
-- Name: 19192; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19192');


ALTER LARGE OBJECT 19192 OWNER TO postgres;

--
-- Name: 19193; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19193');


ALTER LARGE OBJECT 19193 OWNER TO postgres;

--
-- Name: 19194; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19194');


ALTER LARGE OBJECT 19194 OWNER TO postgres;

--
-- Name: 19195; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19195');


ALTER LARGE OBJECT 19195 OWNER TO postgres;

--
-- Name: 19196; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19196');


ALTER LARGE OBJECT 19196 OWNER TO postgres;

--
-- Name: 19197; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19197');


ALTER LARGE OBJECT 19197 OWNER TO postgres;

--
-- Name: 19198; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19198');


ALTER LARGE OBJECT 19198 OWNER TO postgres;

--
-- Name: 19199; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19199');


ALTER LARGE OBJECT 19199 OWNER TO postgres;

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
-- Name: 19432; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19432');


ALTER LARGE OBJECT 19432 OWNER TO postgres;

--
-- Name: 19433; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19433');


ALTER LARGE OBJECT 19433 OWNER TO postgres;

--
-- Name: 19434; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19434');


ALTER LARGE OBJECT 19434 OWNER TO postgres;

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
-- Name: 19439; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19439');


ALTER LARGE OBJECT 19439 OWNER TO postgres;

--
-- Name: 19440; Type: BLOB; Schema: -; Owner: postgres
--

SELECT pg_catalog.lo_create('19440');


ALTER LARGE OBJECT 19440 OWNER TO postgres;

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
5	2023-10-06	2023-10-01	3
6	2023-11-06	2023-11-01	3
7	2023-10-07	2023-10-01	4
8	2023-11-07	2023-11-01	4
9	2023-10-08	2023-10-01	5
10	2023-11-08	2023-11-01	5
11	2023-10-09	2023-10-01	6
12	2023-11-09	2023-11-01	6
13	2023-10-10	2023-10-01	7
14	2023-11-10	2023-11-01	7
15	2023-10-11	2023-10-01	8
16	2023-11-11	2023-11-01	8
17	2023-10-12	2023-10-01	9
18	2023-11-12	2023-11-01	9
19	2023-10-13	2023-10-01	10
20	2023-11-13	2023-11-01	10
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
\.


--
-- Data for Name: _host; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._host (username) FROM stdin;
admin
\.


--
-- Data for Name: _image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._image (id, is_main, path) FROM stdin;
\.


--
-- Data for Name: _message; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._message (id, sent_on, text, conversation_id, sent_by_username) FROM stdin;
\.


--
-- Data for Name: _property; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property (id, address, description, latitude, longitude, name, space_area, type, city_id, host_username) FROM stdin;
1	Address 1	19430	\N	\N	Property 1	1	PRIVATE_PROPERTY	1	admin
2	Address 2	19431	\N	\N	Property 2	1	PRIVATE_PROPERTY	2	admin
3	Address 3	19432	\N	\N	Property 3	1	PRIVATE_PROPERTY	3	admin
4	Address 4	19433	\N	\N	Property 4	1	PRIVATE_PROPERTY	4	admin
5	Address 5	19434	\N	\N	Property 5	1	PRIVATE_PROPERTY	5	admin
6	Address 6	19435	\N	\N	Property 6	1	PRIVATE_PROPERTY	6	admin
7	Address 7	19437	\N	\N	Property 7	1	PRIVATE_PROPERTY	7	admin
8	Address 8	19438	\N	\N	Property 8	1	PRIVATE_PROPERTY	8	admin
9	Address 9	19439	\N	\N	Property 9	1	PRIVATE_PROPERTY	9	admin
10	Address 10	19440	\N	\N	Property 10	1	PRIVATE_PROPERTY	10	admin
\.


--
-- Data for Name: _property_amenities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._property_amenities (property_id, has_elevator, has_heating, has_kitchen, has_lounge, has_parking, has_refrigerator, has_tv, has_wifi, num_bathrooms, num_bedrooms, num_beds) FROM stdin;
1	t	f	t	f	t	t	f	f	1	1	1
2	f	t	f	t	f	f	t	t	2	2	2
3	t	f	t	f	t	t	f	f	3	3	3
4	f	t	f	t	f	f	t	t	4	4	4
5	t	f	t	f	t	t	f	f	5	5	5
6	f	t	f	t	f	f	t	t	6	6	6
7	t	f	t	f	t	t	f	f	7	7	7
8	f	t	f	t	f	f	t	t	8	8	8
9	t	f	t	f	t	t	f	f	9	9	9
10	f	t	f	t	f	f	t	t	10	10	10
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
1	20	f	1	1	t	f
2	20	t	2	2	f	t
3	20	f	3	3	t	f
4	20	t	4	4	f	t
5	20	f	5	5	t	f
6	20	t	6	6	f	t
7	20	f	7	7	t	f
8	20	t	8	8	f	t
9	20	f	9	9	t	f
10	20	t	10	10	f	t
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
ADMIN
GUEST
HOST
\.


--
-- Data for Name: _user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._user (username, email, first_name, is_active, is_locked, last_name, mobile_number, password, image_id) FROM stdin;
admin	\N	\N	t	f	\N	\N	$2a$10$BxQnaglUv1IptBPrIjySiun8uEssBD9fjG7MctLxk5AbyVATTVNle	\N
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_role (user_username, role_name) FROM stdin;
admin	ADMIN
admin	GUEST
admin	HOST
\.


--
-- Name: _available_time_slot_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._available_time_slot_id_seq', 20, true);


--
-- Name: _city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._city_id_seq', 381, true);


--
-- Name: _conversation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._conversation_id_seq', 1, false);


--
-- Name: _country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._country_id_seq', 120, true);


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

SELECT pg_catalog.setval('public._property_id_seq', 10, true);


--
-- Name: _reservation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._reservation_id_seq', 1, false);


--
-- Name: _review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public._review_id_seq', 1, false);


--
-- Data for Name: BLOBS; Type: BLOBS; Schema: -; Owner: -
--

BEGIN;

SELECT pg_catalog.lo_open('19190', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632031');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19191', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632032');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19192', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632033');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19193', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632034');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19194', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632035');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19195', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632036');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19196', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632037');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19197', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632038');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19198', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632039');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19199', 131072);
SELECT pg_catalog.lowrite(0, '\x44657363203130');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19430', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632031');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19431', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632032');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19432', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632033');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19433', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632034');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19434', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632035');
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

SELECT pg_catalog.lo_open('19439', 131072);
SELECT pg_catalog.lowrite(0, '\x446573632039');
SELECT pg_catalog.lo_close(0);

SELECT pg_catalog.lo_open('19440', 131072);
SELECT pg_catalog.lowrite(0, '\x44657363203130');
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

