CREATE TABLE documents (
    uid         varchar(64) NOT NULL UNIQUE,
    type        varchar(10) NOT NULL,
    updated     varchar(255) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data        text
);
