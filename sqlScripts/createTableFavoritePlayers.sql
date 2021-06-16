-- Create a new table called 'createTableFavoritePlayers' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.FavoritePlayers', 'U') IS NOT NULL
DROP TABLE dbo.FavoritePlayers
GO
-- Create the table in the specified schema
CREATE TABLE dbo.FavoritePlayers
(
    username VARCHAR(255) NOT NULL,  -- primary key column
    player_id INT NOT NULL,
    PRIMARY KEY (username, player_id),
    FOREIGN KEY (username) 
    REFERENCES Users (username)
    ON DELETE CASCADE ON UPDATE CASCADE,
    -- specify more columns here
);
GO