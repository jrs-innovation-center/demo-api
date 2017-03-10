const PouchDB = require('pouchdb-http')
const mapreduce  = require('pouchdb-mapreduce')
PouchDB.plugin(mapreduce)
const dbAddress = "http://localhost:" + process.env.DBPORT + '/' + process.env.DATABASE
const db = new PouchDB(dbAddress)
const {
    omit,
    replace,
    toLower,
    prop,
    path,
    map,
    compose, lensIndex, view, filter
} = require('ramda')

const dal = {
    getAuto: getAuto,
    addAuto: addAuto,
    listAutos: listAutos,
    listSalesByDriver: listSalesByDriver
}

module.exports = dal

////////////////////////
///   Autos
////////////////////////
function listAutos(cb) {

    db.query('autos', {
        include_docs: true
    }, function(err, autos) {

        if (err) return cb(err)

        const result = compose(
            map(doc => removeTypeProperty(doc)),
            map(row => row.doc)
        )(path(['rows'], autos))

        cb(null, result)
        //cb(null, map(row => row.doc, path(['rows'], autos)))
    })

}


function getAuto(autoId, cb) {
    db.get(autoId, function(err, car) {
        if (err) return cb(err)
        cb(null, removeTypeProperty(car))
    })
}



function addAuto(auto, cb) {
    if (checkAutoRequiredFields(auto)) {
        db.put(generateAutoID(auto), function(err, addedAuto) {
            if (err) return cb(err)
            cb(null, addedAuto)
        })
    } else {
        // send a custom error back that look couch-ish
        cb({
            error: 'missing property',
            reason: 'missing property',
            name: 'missing_property',
            status: 400,
            message: 'Include all required fields: make, model, and trim.'
        })
    }
}

////////////////////////
///  sales by driver
////////////////////////
function listSalesByDriver(driverID, cb) {
    db.query('sales', {
        include_docs: true,
        start_key: [driverID, 1],
        end_key: [driverID, 2]
    }, function(err, sales) {
        if (err) return cb(err)
        // map over query results (sales) and return the docs
        const docs = map(row => row.doc)(path(['rows'], sales))
        // grab the first doc (driver) from the docs using lensIndex()
        const newDriverDoc = view(lensIndex(0), docs)
        // grab the sales docs from the docs using filter.
        // Then set the sales docs to new property named sales
        newDriverDoc.sales = filter(sale => sale.driverID, docs)
        cb(null, newDriverDoc)
    })
}

////////////////////////
///    HELPERS!
////////////////////////
function checkAutoRequiredFields(auto) {
    return prop('make', auto) && prop('model', auto) && prop('trim', auto)
}

function idHelp(id) {
    return toLower(replace(/ /g, '_', id))
}

function generateAutoID(auto) {
    const id = "auto_" + auto.make + "_" + auto.model + "_" + auto.trim
    auto._id = idHelp(id)
    return auto
}

function removeTypeProperty(doc) {
    return omit(['type'], doc)
}
