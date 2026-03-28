-- This is the query to insert a new account into the account table.
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- This is the query to update the account with the email 'tony@starkent.com'
UPDATE account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com';

-- This is the query to delete the account with the email 'tony@starkent.com'
DELETE FROM account
WHERE account_email = 'tony@starkent.com';

-- This is the query to select all the vehicles that are classified as 'small interiors' and have a make of 'GM' and model of 'Hummer'.
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- This is the query to select all the sport vehicles and their classifications.
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c
  ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- This changes the local pathways to include the vehicles folder.
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

-- This is the link to the video of myself rebuilding the database connections.
-- https://youtu.be/bLsdpckHNH8