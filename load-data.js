const PouchDB = require('pouchdb-http')
const dbAddress = "http://localhost:" + process.env.DBPORT + '/' + process.env.DATABASE
const db = new PouchDB(dbAddress)




db.bulkDocs([{
        _id: "auto_jeep_grand_cherokee_touring_edition",
        make: "Jeep",
        model: "Grand Cherokee",
        baseCost: 25000,
        trim: "Touring Edition",
        gasGuzzlerTax: true,
        type: "auto"
    },
    {
        _id: "auto_jeep_grand_cherokee_overland",
        make: "Jeep",
        model: "Grand Cherokee",
        baseCost: 27000,
        trim: "Overland",
        gasGuzzlerTax: true,
        type: "auto"
    },
    {
        _id: "auto_jeep_grand_cherokee_summit",
        make: "Jeep",
        model: "Grand Cherokee",
        baseCost: 29000,
        trim: "summit",
        gasGuzzlerTax: true,
        type: "auto"
    },
    {
        _id: "auto_aston_martin_db9_sport",
        make: "Aston Martin",
        model: "DB9",
        baseCost: 109000,
        trim: "Sport",
        gasGuzzlerTax: false,
        type: "auto"
    },
    {
        _id: "auto_aston_martin_db11_turbo",
        make: "Aston Martin",
        model: "DB1",
        baseCost: 115000,
        trim: "Turbo",
        gasGuzzlerTax: false,
        type: "auto"
    },
    {
        _id: "driver_andretti_mario",
        lastName: "Andretti",
        firstName: "Mario",
        type: "driver"
    },
    {
        _id: "driver_yarborough_cale",
        lastName: "Yarborough",
        firstName: "Cale",
        type: "driver"
    },
    {
        _id: "driver_elliot_bill",
        lastName: "Elliot",
        firstName: "Bill",
        type: "driver"
    },
    {
        _id: "sale_elliot_bill_aston_martin_db11_turbo",
        saleDate: "2017-03-09",
        cost: 130000,
        driverID: "driver_elliot_bill",
        autoID: "auto_aston_martin_db11_turbo",
        vin: "2342lkfsdkl3q4342423",
        type: "sale"
    },
    {
        _id: "sale_andretti_mario_aston_martin_db11_turbo",
        saleDate: "2017-03-09",
        cost: 135000,
        driverID: "driver_andretti_mario",
        autoID: "auto_aston_martin_db11_turbo",
        vin: "42342kl34jkl23h4",
        type: "sale"
    }
], function(err, response) {
    if (err) return console.log(err)
    console.log(JSON.stringify(response, null, 2))
})
