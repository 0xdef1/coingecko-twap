#!/usr/bin/env node

const axios = require('axios');
const _ = require('lodash');
const yargs = require('yargs');

const argv = yargs
    .option('id', {
        description: 'Coingecko asset ID',
        type: 'string'
    })
    .option('days', {
        description: 'Length of the TWAP in days',
        type: 'int'
    })
    .demandOption(['id','days'])
    .help()
    .argv

let coinId = argv.id;
let days = argv.days;

(async () => {
    let url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=hourly`
    let response = await axios.get(url)
    let twap = _(response.data.prices)
        .meanBy(p => p[1])
    console.log(twap)
})()