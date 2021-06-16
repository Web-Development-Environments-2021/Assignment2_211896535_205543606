-- Create a new table called 'EventsCalendar' in schema 'dbo'
-- Drop the table if it already exists
IF OBJECT_ID('dbo.EventsCalendar', 'U') IS NOT NULL
DROP TABLE dbo.EventsCalendar
GO
-- Create the table in the specified schema
CREATE TABLE dbo.EventsCalendar
(
    event_id INT NOT NULL PRIMARY KEY,
    event_date DATE NOT NULL ,
    event_hour DATETIME NOT NULL,
    event_minute INT NOT NULL,
    event_description VARCHAR(255) NOT NULL,
    match_id INT NOT NULL,
    FOREIGN KEY (match_id)
    REFERENCES Matches (match_id)
    ON DELETE CASCADE ON UPDATE CASCADE
);
GO