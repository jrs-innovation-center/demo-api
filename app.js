// console.log("process.env.DBPORT", process.env.DBPORT)
// console.log("process.env.DATABASE", process.env.DATABASE)
// console.log("process.env.APIPORT", process.env.APIPORT)
//
const express = require('express')
const app = express()
const port = process.env.APIPORT || 4000
const {
    getAuto,
    addAuto,
    listAutos,
    getDriver,
    listDrivers,
    getDriverWithSales
} = require('./dal.js')
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const {
    path
} = require('ramda')

app.use(bodyParser.json({
    type: 'application/json'
}))


/////////////////////////
//     automobiles
/////////////////////////
app.get('/automobiles', function(req, res, next) {

    listAutos(function(err, autos) {
        if (err) next(new HTTPError(err.status, err.message, err))
        res.status(200).send(autos)
    })
})

app.post('/automobiles', function(req, res, next) {
    addAuto(req.body, function(err, auto) {
        if (err) next(new HTTPError(err.status, err.message, err))
        res.status(201).send(auto)

    })
})

app.get('/automobiles/:autoId', function(req, res, next) {
    getAuto(req.params.autoId, function(err, auto) {
        if (err) next(new HTTPError(err.status, err.message, err))
        res.status(200).send(auto)
    })
})








/////////////////////////
//       drivers
/////////////////////////
app.get('/drivers', function(req, res, next) {
    listDrivers(function(err, drivers) {
        if (err) next(new HTTPError(err.status, err.message, err))
        res.status(200).send(drivers)
    })
})

app.get('/drivers/:driverID', function(req, res, next) {
    path(['query', 'showsales'], req) === 'true' ?
        getDriverWithSales(req.params.driverID, function(err, driverWithSales) {
            if (err) next(new HTTPError(err.status, err.message, err))
            res.status(200).send(driverWithSales)
        }) : getDriver(req.params.driverID, function(err, driver) {
            if (err) next(new HTTPError(err.status, err.message, err))
            res.status(200).send(driver)
        })
})





app.get('/', function(req, res) {
    res.status(200).send('Hello World!')
})

app.use(function(err, req, res, next) {
    console.log("error!", err)
    res.status(err.status)
    res.send(err)
})

app.listen(port, function() {
    console.log('Example app listening on port:', port)
})
