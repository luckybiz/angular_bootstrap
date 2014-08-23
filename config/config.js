module.exports = {
    development: {
      db: 'mongodb://localhost/bi-interface',
      port: 8000,
      staticMaxAge: 0 //disabled
    }
  , test: {

    }
  , production: {
      db: 'mongodb://localhost/bi-interface',
      port: 8000,
      staticMaxAge: 86400000 //one day
    }
}