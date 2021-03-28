CREATE TABLE meta (
    document    integer UNIQUE,
    title       varchar(255),
    FOREIGN KEY(document) REFERENCES documents(uid)
);
