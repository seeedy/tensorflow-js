const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello');
});

/* app.get('/btc', (req, res) => {
    const url =
        'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2020-01-01';
    axios.get(url).then(response => {
        const { data } = response;
        res.json(data);
    });
}); */

app.listen(6969, () => console.log('serving on port 6969 '));
