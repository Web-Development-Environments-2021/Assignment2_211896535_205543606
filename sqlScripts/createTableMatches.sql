-- Create a new table called 'Matches' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.Matches', 'U') IS NOT NULL
DROP TABLE dbo.Matches
GO
-- Create the table in the specified schema
CREATE TABLE dbo.Matches
(
    match_id DATE NOT NULL ,
    match_hour DATETIME NOT NULL,
    home_team VARCHAR(255) NOT NULL,
    away_team VARCHAR(255) NOT NULL,
    stadium VARCHAR(255) NOT NULL,
    result VARCHAR(255),
    event_calendar xml
    -- specify more columns here
);
GO