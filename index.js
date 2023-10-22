const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('Hahahaha, setup complete');
});

app.listen(8000, () => {
    console.log('App is listening at port 8000');
});