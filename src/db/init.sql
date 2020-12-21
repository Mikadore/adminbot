/*
    create tables for the DB to function
*/
CREATE DATABASE discord;
USE discord;

/*ID === snowflake*/

CREATE TABLE Tickets
(
    serverid        VARCHAR (32)    NOT NULL,  
    ticketid        VARCHAR (32)    NOT NULL,   
    open            BOOL,          
    creator         VARCHAR (32),              
    creation_date   DATETIME,       
    assignee        VARCHAR (32),               
    PRIMARY KEY(serverid)
)

CREATE TABLE TicketsConfig
(
    serverid        VARCHAR (32)    NOT NULL,   
    messageid       VARCHAR (32),               
    messagechanid   VARCHAR (32),
    parentid        VARCHAR (32),
    emojiid         VARCHAR (32),
    PRIMARY KEY(serverid)
)