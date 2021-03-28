CREATE TABLE tags (
    tag         varchar(255) NOT NULL,
    document    varchar(64) NOT NULL,
    FOREIGN KEY(document) REFERENCES documents(uid)
);
