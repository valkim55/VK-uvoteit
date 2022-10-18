const express = require('express');
const app = express();

app.use(express());
app.use(express.urlencoded({extended: false}));



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})