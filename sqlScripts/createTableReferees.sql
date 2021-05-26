-- Create a new table called 'Referees' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Referees', 'U') IS NOT NULL
DROP TABLE dbo.Referees
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Referees
(
    referee_id INT NOT NULL PRIMARY KEY, -- primary key column
    fullname VARCHAR(255) NOT NULL,
    -- specify more columns here
);
GO