const express = require('express');
const app = express();
const db = require('./db/connection');

//don't have to specify index.js file because once you link directory Node will automatically look for it
const apiRoutes = require('./routes/apiRoutes');    

// express middleware to parse incoming data
app.use(express());
app.use(express.urlencoded({extended: false}));

//by adding /api here we won't have to add it into individual route expressions as we move them into their respective folders
app.use('/api', apiRoutes);     

//route handler for requests that aren't supported by app
app.use((req, res) => {
    res.status(400).end();
});

const PORT = process.env.PORT || 3001;
db.connect(err => {
    if(err)  throw err;
    console.log('connected to the election database')
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
});
