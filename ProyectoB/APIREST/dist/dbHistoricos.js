"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectHistoricos = connectHistoricos;

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function connectHistoricos() {
  var client, db;
  return regeneratorRuntime.async(function connectHistoricos$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_mongodb["default"].connect('mongodb+srv://aire:aire@cluster0-sentg.mongodb.net/test?retryWrites=true&w=majority', {
            useUnifiedTopology: true
          }));

        case 3:
          client = _context.sent;
          db = client.db('test');
          console.log('DB aireHistoricos is connected');
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