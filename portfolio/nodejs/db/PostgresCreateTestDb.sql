DROP TABLE nodejs_users;
COMMIT;

CREATE TABLE nodejs_users (
  id   UUID PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  surname VARCHAR(100)
);

COMMIT;

INSERT INTO nodejs_users (firstname,lastname,surname) VALUES ('firstname1', 'lastname1','surname1');
INSERT INTO nodejs_users (firstname,lastname,surname) VALUES ('firstname2', 'lastname2','surname1');
INSERT INTO nodejs_users (firstname,lastname,surname) VALUES ('firstname3', 'lastname3','surname1');
INSERT INTO nodejs_users (firstname,lastname,surname) VALUES ('firstname4', 'lastname4','surname1');
INSERT INTO nodejs_users (firstname,lastname,surname) VALUES ('firstname5', 'lastname5','surname1');
INSERT INTO nodejs_users (firstname,lastname,surname) VALUES ('firstname6', 'lastname6','surname1');

COMMIT;



select *
from   nodejs_users
