"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _dbHistoricos = require("../dbHistoricos");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();

var MongoClient = require('mongodb').MongoClient; //Database connection


router.post('/', function _callee(req, res) {
  var estacion, fechaInicial, fechaFinal, db, respuesta;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          estacion = parseInt(req.body.id); //8495

          fechaInicial = req.body.fechaInicial; //"2020-01-01"

          fechaFinal = req.body.fechaFinal; //"2020-01-05"

          _context.next = 5;
          return regeneratorRuntime.awrap((0, _dbHistoricos.connectHistoricos)());

        case 5:
          db = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(db.collection('documentos').aggregate([{
            $match: {
              "data.idx": estacion,
              $and: [{
                "data.time.s": {
                  $gte: fechaInicial
                }
              }, {
                "data.time.s": {
                  $lte: fechaFinal
                }
              }]
            }
          }, {
            $project: {
              _id: 0,
              "data.idx": 1,
              date: {
                $dateFromString: {
                  dateString: {
                    $substr: ["$data.time.s", 0, 10]
                  },
                  // coger los 16 primeros para cuando no haya segundos
                  format: "%Y-%m-%d" // -> on-line :%S 

                }
              },
              datos: {
                $objectToArray: "$data.iaqi"
              }
            }
          }, {
            $unwind: "$datos"
          }, {
            $project: {
              "data.idx": 1,
              datos: 1,
              date: 1
            }
          }, {
            $group: {
              _id: {
                fecha: "$date",
                cont: "$datos.k"
              },
              v: {
                $max: {
                  $cond: {
                    "if": {
                      $gte: ["$datos.v.v", ""]
                    },
                    then: 0,
                    "else": "$datos.v.v"
                  }
                }
              }
            }
          }, {
            $project: {
              _id: 0,
              fecha: "$_id.fecha",
              contaminante: "$_id.cont",
              valor: "$v"
            }
          }, {
            $sort: {
              "_id.fecha": 1
            }
          }]).toArray());

        case 8:
          respuesta = _context.sent;
          res.json(respuesta);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/ultimo', function _callee2(req, res) {
  var db, spain, greece, bulgarian, respuesta;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _dbHistoricos.connectHistoricos)());

        case 2:
          db = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(db.collection('documentos').aggregate([{
            $match: {
              "data.idx": 8495
            }
          }, {
            $project: {
              _id: 0,
              "data.idx": 1,
              date: {
                $dateFromString: {
                  dateString: {
                    $substr: ["$data.time.s", 0, 10]
                  },
                  // coger los 16 primeros para cuando no haya segundos
                  format: "%Y-%m-%d" // -> on-line :%S 

                }
              },
              datos: {
                $objectToArray: "$data.iaqi"
              }
            }
          }, {
            $sort: {
              "date": -1
            }
          }, {
            $limit: 1
          }, {
            $unwind: "$datos"
          }, {
            $project: {
              "data.idx": 1,
              datos: 1,
              date: 1
            }
          }, {
            $group: {
              _id: {
                estacion: "$data.idx",
                fecha: "$date",
                cont: "$datos.k"
              },
              v: {
                $max: {
                  $cond: {
                    "if": {
                      $eq: ["$datos.v.v", ""]
                    },
                    then: 0,
                    "else": "$datos.v.v"
                  }
                }
              }
            }
          }, {
            $project: {
              _id: 0,
              estacion: "$_id.estacion",
              fecha: "$_id.fecha",
              contaminante: "$_id.cont",
              valor: "$v"
            }
          }]).toArray());

        case 5:
          spain = _context2.sent;
          _context2.next = 8;
          return regeneratorRuntime.awrap(db.collection('documentos').aggregate([{
            $match: {
              "data.idx": 12410
            }
          }, {
            $project: {
              _id: 0,
              "data.idx": 1,
              date: {
                $dateFromString: {
                  dateString: {
                    $substr: ["$data.time.s", 0, 10]
                  },
                  // coger los 16 primeros para cuando no haya segundos
                  format: "%Y-%m-%d" // -> on-line :%S 

                }
              },
              datos: {
                $objectToArray: "$data.iaqi"
              }
            }
          }, {
            $sort: {
              "date": -1
            }
          }, {
            $limit: 1
          }, {
            $unwind: "$datos"
          }, {
            $project: {
              "data.idx": 1,
              datos: 1,
              date: 1
            }
          }, {
            $group: {
              _id: {
                estacion: "$data.idx",
                fecha: "$date",
                cont: "$datos.k"
              },
              v: {
                $max: {
                  $cond: {
                    "if": {
                      $eq: ["$datos.v.v", ""]
                    },
                    then: 0,
                    "else": "$datos.v.v"
                  }
                }
              }
            }
          }, {
            $project: {
              _id: 0,
              estacion: "$_id.estacion",
              fecha: "$_id.fecha",
              contaminante: "$_id.cont",
              valor: "$v"
            }
          }]).toArray());

        case 8:
          greece = _context2.sent;
          _context2.next = 11;
          return regeneratorRuntime.awrap(db.collection('documentos').aggregate([{
            $match: {
              "data.idx": 8084
            }
          }, {
            $project: {
              _id: 0,
              "data.idx": 1,
              date: {
                $dateFromString: {
                  dateString: {
                    $substr: ["$data.time.s", 0, 10]
                  },
                  // coger los 16 primeros para cuando no haya segundos
                  format: "%Y-%m-%d" // -> on-line :%S 

                }
              },
              datos: {
                $objectToArray: "$data.iaqi"
              }
            }
          }, {
            $sort: {
              "date": -1
            }
          }, {
            $limit: 1
          }, {
            $unwind: "$datos"
          }, {
            $project: {
              "data.idx": 1,
              datos: 1,
              date: 1
            }
          }, {
            $group: {
              _id: {
                estacion: "$data.idx",
                fecha: "$date",
                cont: "$datos.k"
              },
              v: {
                $max: {
                  $cond: {
                    "if": {
                      $eq: ["$datos.v.v", ""]
                    },
                    then: 0,
                    "else": "$datos.v.v"
                  }
                }
              }
            }
          }, {
            $project: {
              _id: 0,
              estacion: "$_id.estacion",
              fecha: "$_id.fecha",
              contaminante: "$_id.cont",
              valor: "$v"
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