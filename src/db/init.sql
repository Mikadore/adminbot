/*
    create tables for the DB to function
*/
CREATE DATABASE discord;
USE discord;

/*Servers are identified by their snowflake*/

CREATE TABLE Tickets
(
    serverid        VARCHAR (32)    NOT NULL,   /*Snowflake*/
    ticketid        VARCHAR (32)    NOT NULL,   /*Snowflake of the ticket's channel*/
    open            BOOL ,          
    creator         VARCHAR (32),               /*Snowflake*/
    creation_date   DATETIME,       
    assignee        VARCHAR (32)                /*Snowflake*/
)

CREATE TABLE TicketsConfig
(
    serverid        VARCHAR (32),    NOT NULL,  /*SNOWFLAKE*/
    messageid       VARCHAR (32),               /*SNOWFLAKE*/
    parentid        VARCHAR (32)
)
