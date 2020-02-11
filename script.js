async function getData() {
    const data = await fetch(
        'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2020-01-01'
    ).then(res => res.json());
    return data;
}

async function prepareData() {
    const data = await getData();
    console.log(data);

    const { bpi } = data;
    const days = Object.keys(bpi);
    const values = Object.values(bpi);

    let prepared = [];
    for (let i = 0; i <= days.length; i++) {
        prepared.push({ date: days[i], price: values[i] });
    }
    console.log(prepared);

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

prepareData();

/* http.get(
    {
        host: 'api.coindesk.com',
        path: '/v1/bpi/historical/close.json?start=2019-01-01&end=2020-01-01'
    },
    res => {
        // Continuously update stream with data
        var body = '';
        res.on('data', chunk => {
            body += chunk;
        });
        res.on('end', function() {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            console.log(parsed);
            const { bpi } = parsed;
            const days = Object.keys(bpi);
            const values = Object.values(bpi);
            let data = [];
            for (let i = 0; i <= days.length; i++) {
                data.push({ date: days[i], price: values[i] });
            }
            console.log(data);
            const window = 50;

            const simpleMA = computeSMA(data, window);
            console.log(simpleMA);
        });
    }
);

function computeSMA(data, window) {
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
}
 */
