"use strict";

require("@babel/polyfill");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Poder ejecutar el codigo en distintos entornos
function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_server["default"].listen(_server["default"].get('port')));

        case 2:
          console.log('Server on port ', _server["default"].get('port'));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

main();