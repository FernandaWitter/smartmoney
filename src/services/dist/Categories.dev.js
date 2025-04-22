"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategorySumByDate = exports.getCategoryList = void 0;

var _DBConfig = require("../database/DBConfig");

var _entryService = require("../database/services/entryService");

var getCategoryList = function getCategoryList() {
  var db, catList;
  return regeneratorRuntime.async(function getCategoryList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _DBConfig.connectToDatabase)());

        case 3:
          db = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _entryService.getCategories)(db));

        case 6:
          catList = _context.sent;
          return _context.abrupt("return", catList);

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

exports.getCategoryList = getCategoryList;

var getCategorySumByDate = function getCategorySumByDate(days, category) {
  var db, catList;
  return regeneratorRuntime.async(function getCategorySumByDate$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 4;
          return regeneratorRuntime.awrap((0, _DBConfig.connectToDatabase)());

        case 4:
          db = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap((0, _entryService.getCategorySummary)(db, days, category));

        case 7:
          catList = _context2.sent;
          return _context2.abrupt("return", catList);

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getCategorySumByDate = getCategorySumByDate;