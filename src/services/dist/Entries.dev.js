"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteEntry = exports.updateEntry = exports.saveEntry = exports.getEntryFilterID = exports.getEntryList = void 0;

var _DBConfig = require("../database/DBConfig");

var _entryService = require("../database/services/entryService");

var getEntryList = function getEntryList(days, category, limit) {
  var db, entries;
  return regeneratorRuntime.async(function getEntryList$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _DBConfig.connectToDatabase)());

        case 3:
          db = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _entryService.getEntries)(db, days, category, limit));

        case 6:
          entries = _context.sent;
          return _context.abrupt("return", entries);

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

exports.getEntryList = getEntryList;

var getEntryFilterID = function getEntryFilterID(id) {
  var db, entry;
  return regeneratorRuntime.async(function getEntryFilterID$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _DBConfig.connectToDatabase)());

        case 3:
          db = _context2.sent;
          _context2.next = 6;
          return regeneratorRuntime.awrap((0, _entryService.getEntryByID)(db, id));

        case 6:
          entry = _context2.sent;
          return _context2.abrupt("return", entry);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.getEntryFilterID = getEntryFilterID;

var saveEntry = function saveEntry(data) {
  var db;
  return regeneratorRuntime.async(function saveEntry$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _DBConfig.connectToDatabase)());

        case 3:
          db = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap((0, _entryService.saveEntryItem)(db, data));

        case 6:
          return _context3.abrupt("return", _context3.sent);

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.saveEntry = saveEntry;

var updateEntry = function updateEntry(data) {
  var db;
  return regeneratorRuntime.async(function updateEntry$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 5;
          return regeneratorRuntime.awrap((0, _DBConfig.connectToDatabase)());

        case 5:
          db = _context4.sent;
          _context4.next = 8;
          return regeneratorRuntime.awrap((0, _entryService.updateEntryItem)(db, data));

        case 8:
          return _context4.abrupt("return", _context4.sent);

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);

        case 14:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.updateEntry = updateEntry;

var deleteEntry = function deleteEntry(id) {
  var db;
  return regeneratorRuntime.async(function deleteEntry$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap((0, _DBConfig.connectToDatabase)());

        case 3:
          db = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap((0, _entryService.deleteEntryItem)(db, id));

        case 6:
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.error(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.deleteEntry = deleteEntry;