-- Create a new table called 'Users' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL
DROP TABLE dbo.Users
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Users
(
    username VARCHAR(10) NOT NULL PRIMARY KEY, -- primary key column
    password VARCHAR(255) NOT NULL,
    -- specify more columns here
);
GO