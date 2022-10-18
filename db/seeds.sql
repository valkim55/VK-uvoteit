INSERT INTO parties (name, description)
    VALUES 
        ('JS Juggernauts', 'The JS Juggernauts eat, breathe, and sleep JavaScript. They can build everything you could ever want in JS, including a new kitchen sink.'),
        ('Heroes of HTML', 'Want to see a mock-up turn into an actual webpage in a matter of minutes? Well, the Heroes of HTML can get it done in a matter of seconds.'),
        ('Git Gurus', 'Need to resolve a merge conflict? The Git Gurus have your back. Nobody knows Git like these folks do.');


INSERT INTO candidates (first_name, last_name, party_id, industry_connected)
VALUES
    ('Harry', 'Potter', 2, 1),
    ('Hermione', 'Granger', 3, 1),
    ('Ronald', 'Weasley', 1, 0),
    ('Cho', 'Chang', 3, 1),
    ('Neville', 'Longbottom', 2, 1),
    ('Draco', 'Malfoy', 2, 0),
    ('Luna', 'Lovegood', 3, 0),
    ('Seamus', 'Finnigan', 1, 1),
    ('Cedric', 'Diggory', 1, 1),
    ('Dean', 'Thomas', NULL, 1);

    