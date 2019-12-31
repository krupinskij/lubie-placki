DROP TABLE IF EXISTS public.directions;
DROP SEQUENCE IF EXISTS public.directions_id_seq;
DROP SEQUENCE IF EXISTS public.hibernate_sequence;

CREATE TABLE public.directions (
    id bigint NOT NULL,
    text text NOT NULL,
    direction_order integer NOT NULL,
    recipe_id integer NOT NULL
);

ALTER TABLE public.directions OWNER TO postgres;

CREATE SEQUENCE public.directions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.directions_id_seq OWNER TO postgres;

ALTER SEQUENCE public.directions_id_seq OWNED BY public.directions.id;

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

DROP TABLE IF EXISTS public.hints;
DROP SEQUENCE IF EXISTS public.hints_id_seq;

CREATE TABLE public.hints (
    id bigint NOT NULL,
    text text NOT NULL,
    recipe_id integer NOT NULL
);

ALTER TABLE public.hints OWNER TO postgres;

CREATE SEQUENCE public.hints_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.hints_id_seq OWNER TO postgres;

ALTER SEQUENCE public.hints_id_seq OWNED BY public.hints.id;

DROP TABLE IF EXISTS public.ingredients;
DROP SEQUENCE IF EXISTS public.ingredients_id_seq;

CREATE TABLE public.ingredients (
    id bigint NOT NULL,
    name text NOT NULL,
    quantity integer NOT NULL,
    unit text NOT NULL,
    recipe_id integer NOT NULL
);

ALTER TABLE public.ingredients OWNER TO postgres;


CREATE SEQUENCE public.ingredients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_id_seq OWNER TO postgres;


ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;

DROP TABLE IF EXISTS public.recipes;
DROP SEQUENCE IF EXISTS public.recipes_id_seq;

CREATE TABLE public.recipes (
    id bigint NOT NULL,
    title text NOT NULL,
    description text,
    type text NOT NULL
);


ALTER TABLE public.recipes OWNER TO postgres;


CREATE SEQUENCE public.recipes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_id_seq OWNER TO postgres;


ALTER SEQUENCE public.recipes_id_seq OWNED BY public.recipes.id;


ALTER TABLE ONLY public.directions ALTER COLUMN id SET DEFAULT nextval('public.directions_id_seq'::regclass);


ALTER TABLE ONLY public.hints ALTER COLUMN id SET DEFAULT nextval('public.hints_id_seq'::regclass);


ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);


ALTER TABLE ONLY public.recipes ALTER COLUMN id SET DEFAULT nextval('public.recipes_id_seq'::regclass);


INSERT INTO public.directions (id, text, direction_order, recipe_id) VALUES (5, 'Zmieszaj wszystko', 1, 1);
INSERT INTO public.directions (id, text, direction_order, recipe_id) VALUES (6, 'Zrób piernik', 2, 1);
INSERT INTO public.directions (id, text, direction_order, recipe_id) VALUES (11, 'Zmieszaj wszystko', 1, 8);
INSERT INTO public.directions (id, text, direction_order, recipe_id) VALUES (12, 'Zrób sernik', 2, 8);


INSERT INTO public.hints (id, text, recipe_id) VALUES (7, 'Użyj pierkarnika', 1);
INSERT INTO public.hints (id, text, recipe_id) VALUES (13, 'Użyj pierkarnika', 8);


INSERT INTO public.ingredients (id, name, quantity, unit, recipe_id) VALUES (2, 'mąka', 500, 'g', 1);
INSERT INTO public.ingredients (id, name, quantity, unit, recipe_id) VALUES (3, 'woda', 250, 'ml', 1);
INSERT INTO public.ingredients (id, name, quantity, unit, recipe_id) VALUES (9, 'mąka', 500, 'g', 8);
INSERT INTO public.ingredients (id, name, quantity, unit, recipe_id) VALUES (10, 'woda', 250, 'ml', 8);


INSERT INTO public.recipes (id, title, description, type) VALUES (1, 'piernik', 'Fajny piernik', 'piernik');
INSERT INTO public.recipes (id, title, description, type) VALUES (8, 'sernik', 'Fajny sernik', 'sernik');


SELECT pg_catalog.setval('public.directions_id_seq', 1, false);


SELECT pg_catalog.setval('public.hibernate_sequence', 13, true);


SELECT pg_catalog.setval('public.hints_id_seq', 1, false);


SELECT pg_catalog.setval('public.ingredients_id_seq', 1, false);


SELECT pg_catalog.setval('public.recipes_id_seq', 1, false);


ALTER TABLE ONLY public.directions
    ADD CONSTRAINT directions_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.hints
    ADD CONSTRAINT hints_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


ALTER TABLE ONLY public.directions
    ADD CONSTRAINT directions_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);


ALTER TABLE ONLY public.hints
    ADD CONSTRAINT hints_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);


ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipes(id);
