\set ON_ERROR_STOP on

\echo '--- Création du rôle aspc ---'
DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'aspc') THEN
        CREATE ROLE aspc LOGIN PASSWORD '<PG_PASSWORD>';
        RAISE NOTICE 'Rôle aspc créé.';
    ELSE
        RAISE NOTICE 'Rôle aspc déjà existant.';
    END IF;
END
$$;

\echo '--- Création de la base aspc_db ---'
DO
$$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'aspc_db') THEN
        CREATE DATABASE aspc_db OWNER aspc;
        RAISE NOTICE 'Base aspc_db créée.';
    ELSE
        RAISE NOTICE 'Base aspc_db déjà existante.';
    END IF;
END
$$;

GRANT ALL PRIVILEGES ON DATABASE aspc_db TO aspc;

\echo '--- Connexion à aspc_db ---'
\connect aspc_db

\echo '--- Activation des extensions ---'
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

\echo '--- Initialisation terminée ---'

