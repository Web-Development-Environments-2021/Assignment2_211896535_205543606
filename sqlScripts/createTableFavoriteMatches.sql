-- Create a new table called 'FavoriteMatches' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.FavoriteMatches', 'U') IS NOT NULL
DROP TABLE dbo.FavoriteMatches
GO
-- Create the table in the specified schema
CREATE TABLE dbo.FavoriteMatches
(
    -- two primary key column
    username VARCHAR(255) NOT NULL,
    match_id INT NOT NULL,
    PRIMARY KEY (username, match_id),
    FOREIGN KEY (username) 
    REFERENCES Users (username)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (match_id) 
    REFERENCES Matches (match_id)
    ON DELETE CASCADE ON UPDATE CASCADE
    );
GO