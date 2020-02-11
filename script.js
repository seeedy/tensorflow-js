const axios = require('axios');

async function getData() {
    const data = await axios
        .get(
            'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2020-01-01'
        )
        .then(res => res.json());
    console.log(data);

    /* function computeSMA(data, window) {
        console.log(data);
        let r_avgs = [];
        let avg_prev = 0;
    
        for (let i = 0; i <= Object.keys(data).length - window; i++) {
            let curr_avg = 0.0;
            let t = i + window;
    
            for (let j = i; j < t && j <= Object.keys(data).length; j++) {
                curr_avg += data[j].price / window;
            }
            r_avgs.push({
                set: data.slice(i, i + window),
                date: data[i].date,
                avg: curr_avg
            });
            avg_prev = curr_avg;
        }
        return r_avgs;
    } */

    async function cleanData() {
        const data = await getData();
        const { bpi } = data;
        console.log(Obj.entries(bpi));
        const days = Object.keys(bpi);

        let cleaned = [];
        /* for (let i = 0; i <= days.length; i++) {
            cleaned.push(;
        } */
        console.log(cleaned);

        tfvis.render.scatterplot(
            { name: 'BTCUSD' },
            { values },
            {
                xLabel: 'date',
                yLabel: '$',
                height: 300
            }
        );
    }
}
