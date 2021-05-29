-- Create a new table called 'FavoriteTeams' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.FavoriteTeams', 'U') IS NOT NULL
DROP TABLE dbo.FavoriteTeams
GO
-- Create the table in the specified schema
CREATE TABLE dbo.FavoriteTeams
(
    username VARCHAR(255) NOT NULL,  -- primary key column
    team_id INT NOT NULL,
    PRIMARY KEY (username, team_id),
    FOREIGN KEY (username) 
    REFERENCES Users (username)
    ON DELETE NO ACTION ON UPDATE NO ACTION,
    -- specify more columns here
);
GO