--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)

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
-- Name: pokemon_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pokemon_type (
    id_pokemon integer NOT NULL,
    id_type integer NOT NULL
);


--
-- Name: pokemons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pokemons (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    weight double precision NOT NULL
);


--
-- Name: pokemons_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pokemons_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pokemons_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pokemons_id_seq OWNED BY public.pokemons.id;


--
-- Name: types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.types (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.types_id_seq OWNED BY public.types.id;


--
-- Name: pokemons id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pokemons ALTER COLUMN id SET DEFAULT nextval('public.pokemons_id_seq'::regclass);


--
-- Name: types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.types ALTER COLUMN id SET DEFAULT nextval('public.types_id_seq'::regclass);


--
-- Data for Name: pokemon_type; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pokemon_type VALUES (60, 51);
INSERT INTO public.pokemon_type VALUES (61, 51);
INSERT INTO public.pokemon_type VALUES (61, 52);
INSERT INTO public.pokemon_type VALUES (62, 53);
INSERT INTO public.pokemon_type VALUES (62, 52);
INSERT INTO public.pokemon_type VALUES (64, 53);
INSERT INTO public.pokemon_type VALUES (65, 49);
INSERT INTO public.pokemon_type VALUES (65, 50);
INSERT INTO public.pokemon_type VALUES (66, 54);
INSERT INTO public.pokemon_type VALUES (67, 54);
INSERT INTO public.pokemon_type VALUES (67, 55);
INSERT INTO public.pokemon_type VALUES (68, 56);
INSERT INTO public.pokemon_type VALUES (68, 57);


--
-- Data for Name: pokemons; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.pokemons VALUES (62, 'Butterfree', '2023-01-21 15:32:06.090308', 32);
INSERT INTO public.pokemons VALUES (64, 'Caterpie', '2023-01-22 16:31:26.376188', 2.9);
INSERT INTO public.pokemons VALUES (65, 'Bulbasaur', '2023-01-23 08:09:24.337463', 6.9);
INSERT INTO public.pokemons VALUES (66, 'Squirtle', '2023-01-23 11:13:57.757828', 9);
INSERT INTO public.pokemons VALUES (67, 'Polywrath', '2023-01-23 11:15:00.486186', 54);
INSERT INTO public.pokemons VALUES (68, 'Jynx', '2023-01-23 11:17:29.300639', 40.6);
INSERT INTO public.pokemons VALUES (60, 'Charmander', '2023-01-21 15:27:40.766746', 8.5);
INSERT INTO public.pokemons VALUES (61, 'Charizard', '2023-01-21 15:28:05.173728', 90.5);


--
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.types VALUES (49, 'Grass', '2023-01-21 15:26:22.041254');
INSERT INTO public.types VALUES (50, 'Poison', '2023-01-21 15:26:22.051178');
INSERT INTO public.types VALUES (51, 'Fire', '2023-01-21 15:27:40.761208');
INSERT INTO public.types VALUES (52, 'Flying', '2023-01-21 15:28:05.168337');
INSERT INTO public.types VALUES (53, 'Bug', '2023-01-21 15:32:06.084805');
INSERT INTO public.types VALUES (54, 'Water', '2023-01-23 11:13:57.753282');
INSERT INTO public.types VALUES (55, 'Fighting', '2023-01-23 11:15:00.481406');
INSERT INTO public.types VALUES (56, 'Ice', '2023-01-23 11:17:29.29688');
INSERT INTO public.types VALUES (57, 'Psychic', '2023-01-23 11:17:29.299501');


--
-- Name: pokemons_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pokemons_id_seq', 68, true);


--
-- Name: types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.types_id_seq', 57, true);


--
-- Name: pokemon_type pokemon_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pokemon_type
    ADD CONSTRAINT pokemon_type_pkey PRIMARY KEY (id_pokemon, id_type);


--
-- Name: pokemons pokemons_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pokemons
    ADD CONSTRAINT pokemons_name_key UNIQUE (name);


--
-- Name: pokemons pokemons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pokemons
    ADD CONSTRAINT pokemons_pkey PRIMARY KEY (id);


--
-- Name: types types_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_name_key UNIQUE (name);


--
-- Name: types types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (id);


--
-- Name: pokemon_type pokemon_type_id_pokemon_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pokemon_type
    ADD CONSTRAINT pokemon_type_id_pokemon_fkey FOREIGN KEY (id_pokemon) REFERENCES public.pokemons(id);


--
-- Name: pokemon_type pokemon_type_id_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pokemon_type
    ADD CONSTRAINT pokemon_type_id_type_fkey FOREIGN KEY (id_type) REFERENCES public.types(id);


--
-- PostgreSQL database dump complete
--

