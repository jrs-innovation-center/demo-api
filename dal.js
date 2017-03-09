const PouchDB = require('pouchdb-http')
const dbAddress = "http://localhost:" + process.env.DBPORT + '/' + process.env.DATABASE
const db = new PouchDB(dbAddress)
const {omit} = require('ramda')

const dal = {
  getAuto: getAuto
}

module.exports = dal

////////////////////////
///   Autos
////////////////////////
function getAuto(autoId, cb) {
    db.get(autoId, function(err, car) {
        if (err) {
            console.log("err: ", err)
            return cb(err)
        }
        cb(null, removeTypeProperty(car))
    })
}

////////////////////////
///    HELPERS!
////////////////////////

function removeTypeProperty (doc) {
  return omit(['type'], doc)
}
