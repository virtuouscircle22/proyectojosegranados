"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dbArduino = require("../dbArduino");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();

var MongoClient = require('mongodb').MongoClient; //Database connection


//RUTAS PARA ARDUINO
router.post('/', function _callee(req, res) {
  var estacion, fechaInicial, fechaFinal, db, respuesta;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          estacion = parseInt(req.body.id); //"Spain"

          fechaInicial = req.body.fechaInicial; // new Date("2020-03-19")

          fechaFinal = req.body.fechaFinal; //new Date("2020-03-25")

          _context.next = 5;
          return regeneratorRuntime.awrap((0, _dbArduino.connectArduino)());

        case 5:
          db = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(db.collection('DatosDispositivosFijos').aggregate([{
            $match: {
              ID: estacion,
              $and: [{
                date: {
                  $gte: fechaInicial
                }
              }, {
                date: {
                  $lte: fechaFinal
                }
              }]
            }
          }, {
            $project: {
              estacion: "$ID",
              date: {
                $dateFromString: {
                  dateString: {
                    $substr: [{
                      $dateToString: {
                        date: "$date",
                        format: "%Y-%m-%d"
                      }
                    }, 0, 10]
                  },
                  // coger los 16 primeros para cuando no haya segundos
                  format: "%Y-%m-%d" // -> on-line :%S 

                }
              },
              contaminantes: [{
                nombre: "NO",
                v: "$NO"
              }, {
                nombre: "NH3",
                v: "$NH3"
              }, {
                nombre: "CO",
                v: "$CO"
              }, {
                nombre: "CO2",
                v: "$CO2"
              }, {
                nombre: "PM10",
                v: "$PM10"
              }, {
                nombre: "PM25",
                v: "$PM25"
              }]
            }
          }, {
            $unwind: "$contaminantes"
          }, {
            $group: {
              _id: {
                ID: "$estacion",
                fecha: "$date",
                contaminantes: "$contaminantes.nombre"
              },
              v: {
                $max: "$contaminantes.v"
              }
            }
          }, {
            $project: {
              _id: 0,
              ID: "$_id.ID",
              fecha: "$_id.fecha",
              contaminante: "$_id.contaminantes",
              valor: "$v"
            }
          }]).toArray());

        case 8:
          respuesta = _context.sent;
          // console.log(result);
          res.json(respuesta);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/ultimos', function _callee2(req, res) {
  var db, spain, greece, bulgarian, respuesta;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _dbArduino.connectArduino)());

        case 2:
          db = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(db.collection('DatosDispositivosFijos').aggregate([{
            $match: {
              "ID": "Spain"
            }
          }, {
            $sort: {
              date: -1
            }
          }, {
            $limit: 1
          }, {
            $project: {
              _id: 0,
              estacion: "$ID",
              date: {
                $dateFromString: {
                  dateString: {
                    $substr: [{
                      $dateToString: {
                        date: "$date",
                        format: "%Y-%m-%d"
                      }
                    }, 0, 10]
                  },
                  // coger los 16 primeros para cuando no haya segundos
                  format: "%Y-%m-%d" // -> on-line :%S 

                }
              },
              contaminantes: [{
                nombre: "NO",
                v: "$NO"
              }, {
                nombre: "NH3",
                v: "$NH3"
              }, {
                nombre: "CO",
                v: "$CO"
              }, {
                nombre: "CO2",
                v: "$CO2"
              }, {
                nombre: "PM10",
                v: "$PM10"
              }, {
                nombre: "PM25",
                v: "$PM25"
              }]
            }
          }, {
            $unwind: "$contaminantes"
          }, {
            $project: {
              _id: 0,
              estacion: 1,
              fecha: "$date",
              contaminante: "$contaminantes.nombre",
              valor: "$contaminantes.v"
            }
          }]).toArray());

        case 5:
          spain = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(db.collection('DatosDispositivosFijos').aggregate([{
            $match: {
              "ID": "Greece"
            }
          }, {
            $sort: {
              date: -1
            }
          }, {
            $limit: 1
          }, {
            $project: {
              _id: 0,
              estacion: "$ID",
              date: {
                $dateFromString: {
                  dateString: {
                    $substr: [{
                      $dateToString: {
                        date: "$date",
                        format: "%Y-%m-%d"
                      }
                    }, 0, 10]
                  },
                  // coger los 16 primeros para cuando no haya segundos
                  format: "%Y-%m-%d" // -> on-line :%S 

                }
              },
              contaminantes: [{
                nombre: "NO",
                v: "$NO"
              }, {
                nombre: "NH3",
                v: "$NH3"
              }, {
                nombre: "CO",
                v: "$CO"
              }, {
                nombre: "CO2",
                v: "$CO2"
              }, {
                nombre: "PM10",
                v: "$PM10"
              }, {
                nombre: "PM25",
                v: "$PM25"
              }]
            }
          }, {
            $unwind: "$contaminantes"
          }, {
            $project: {
              _id: 0,
              estacion: 1,
              fecha: "$date",
              contaminante: "$contaminantes.nombre",
              valor: "$contaminantes.v"
            }
          }]).toArray());

        case 8:
          greece = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(db.collection('DatosDispositivosFijos').aggregate([{
            $match: {
              "ID": "Bulgarian"
            }
          }, {
            $sort: {
              date: -1
            }
          }, {
            $limit: 1
          }, {
            $project: {
              _id: 0,
              estacion: "$ID",
              date: {
                $dateFromString: {
                  dateString: {
                    $substr: [{
                      $dateToString: {
                        date: "$date",
                        format: "%Y-%m-%d"
                      }
                    }, 0, 10]
                  },
                  // coger los 16 primeros para cuando no haya segundos
                  format: "%Y-%m-%d" // -> on-line :%S 

                }
              },
              contaminantes: [{
                nombre: "NO",
                v: "$NO"
              }, {
                nombre: "NH3",
                v: "$NH3"
              }, {
                nombre: "CO",
                v: "$CO"
              }, {
                nombre: "CO2",
                v: "$CO2"
              }, {
                nombre: "PM10",
                v: "$PM10"
              }, {
                nombre: "PM25",
                v: "$PM25"
              }]
            }
          }, {
            $unwind: "$contaminantes"
          }, {
            $project: {
              _id: 0,
              estacion: 1,
              fecha: "$date",
              contaminante: "$contaminantes.nombre",
              valor: "$contaminantes.v"
            }
          }]).toArray());

        case 11:
          bulgarian = _context2.sent;
          respuesta = {
            spain: spain,
            greece: greece,
            bulgarian: bulgarian
          };
          res.json(respuesta);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
var _default = router;
exports["default"] = _default;