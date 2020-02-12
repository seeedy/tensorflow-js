import '@babel/polyfill';
import axios from 'axios';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';

async function getData() {
    console.log('getting data');
    const data = await axios.get(
        'https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=2020-01-01'
    );
    return data;
}

async function cleanData() {
    const data = await getData();
    const { bpi } = data.data;
    const values = Object.values(bpi);
    const days = Object.keys(bpi);

    const rawData = days.map(day => {
        const index = days.indexOf(day);
        return { x: day, y: values[index] };
    });
    console.log({ rawData });

    const series1 = Array(100)
        .fill(0)
        .map(y => Math.random() * 100 - Math.random() * 150)
        .map((y, x) => ({ x, y }));
    const series2 = Array(100)
        .fill(0)
        .map(y => Math.random() * 100 - Math.random() * 150)
        .map((y, x) => ({ x, y }));

    const smaData = getSMAData(rawData, 50);
    console.log({ smaData });

    const surface = { name: 'Chart', tab: 'Charts' };

    tfvis.render.linechart(
        surface,
        { values: [rawData, smaData] },
        { xLabel: 'days' }
    );
    /* tfvis.render.linechart(
        { name: 'SMA', tab: 'Charts' },
        { values: smaData },
        { xLabel: 'days' }
    ); */
}

function getSMAData(data, period) {
    const dates = data.map(d => d.x);
    const values = data.map(d => d.y);
    console.log(values);

    let avgs = [];
    function calculateSMA(avg) {
        avgs.push(avg);
        if (avgs.length > period) {
            avgs.splice(0, 1);
        }

        let sum = 0;

        for (var i in avgs) {
            sum += avgs[i];
        }

        let n = period;
        if (avgs.length < period) {
            n = avgs.length;
        }
        return sum / n;
    }

    let smaData = [];
    for (var i in values) {
        var n = values[i];
        var sma = calculateSMA(n);
        smaData.push({ x: dates[i], y: sma });
    }
    return smaData;
}

document.addEventListener('DOMContentLoaded', cleanData);
