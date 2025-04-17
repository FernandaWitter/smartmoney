"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBalanceSummary = exports.getBalance = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _moment = _interopRequireDefault(require("moment"));

var _DBConfig = require("../database/DBConfig");

var _entryService = require("../database/services/entryService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getBalance = function getBalance() {
  var db, balance;
  return regeneratorRuntime.async(function getBalance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _DBConfig.connectToDatabase)());

        case 3:
          db = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _entryService.getCurrentBalance)(db));

        case 6:
          balance = _context.sent;
          return _context.abrupt("return", balance);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getBalance = getBalance;

var getBalanceSummary = function getBalanceSummary(days) {
  var db, balanceUntilDate, entriesUntilDate;
  return regeneratorRuntime.async(function getBalanceSummary$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _DBConfig.connectToDatabase)());

        case 3:
          db = _context2.sent;
          _context2.t0 = parseFloat;
          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _entryService.getCurrentBalance)(db, days));

        case 7:
          _context2.t1 = _context2.sent;
          balanceUntilDate = (0, _context2.t0)(_context2.t1);
          _context2.next = 11;
          return regeneratorRuntime.awrap((0, _entryService.getEntriesForTimePeriod)(db, days));

        case 11:
          entriesUntilDate = _context2.sent;
          entriesUntilDate = (0, _lodash["default"])(entriesUntilDate).groupBy(function (entry) {
            return (0, _moment["default"])(entry.date).format('YYYYMMDD');
          }).map(function (entry) {
            return _lodash["default"].sumBy(entry, 'amount');
          }).map(function (amount, index, collection) {
            return balanceUntilDate + _lodash["default"].sum(_lodash["default"].slice(collection, 0, index + 1));
          });
          return _context2.abrupt("return", entriesUntilDate);

        case 16:
          _context2.prev = 16;
          _context2.t2 = _context2["catch"](0);
          console.error(_context2.t2);

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.getBalanceSummary = getBalanceSummary;