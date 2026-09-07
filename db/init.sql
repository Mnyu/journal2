SELECT 'CREATE DATABASE chakrview'
WHERE NOT EXISTS (
    SELECT FROM pg_database WHERE datname = 'chakrview'
)\gexec