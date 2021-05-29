-- Create a new table called 'Users' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    username VARCHAR(255) NOT NULL PRIMARY KEY, -- primary key column
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
    -- specify more columns here
);
GO