"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectArduino = connectArduino;

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function connectArduino() {
  var client, db;
  return regeneratorRuntime.async(function connectArduino$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_mongodb["default"].connect('mongodb+srv://userRODB:QaqfW1SovAXtBDWh@cluster0-mms5n.mongodb.net/DatosCalidadAire?retryWrites=true&w=majority', {
            useUnifiedTopology: true
          }));

        case 3:
          client = _context.sent;
          db = client.db('DatosCalidadAire');
          console.log('DB calidadAire is connected');
          return _context.abrupt("return", db);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}