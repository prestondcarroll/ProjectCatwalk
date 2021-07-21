var express = require('express');
const PORT = 3000;

var app = express();

// app.use( express.json() );

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../client/dist'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
