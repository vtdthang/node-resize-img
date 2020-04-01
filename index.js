const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');
const resize = require('./resize');

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.static('public'));
server.set('view engine', 'ejs');

server.use('/upload', router);

// server.get('/', (req, res) => {
//     const widthString = req.query.width;
//     const heightString = req.query.height;
//     const format = req.query.format;

//     let width, height
//     if (widthString) {
//         width = parseInt(widthString)
//     }
//     if (heightString) {
//         height = parseInt(heightString)
//     }

//     res.type(`image/${format || 'png'}`);
//     resize('nodejs.png', format, width, height).pipe(res);
// });

server.listen(8000, () => {
    console.log("Server is running");
});