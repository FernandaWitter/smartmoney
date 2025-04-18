"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _Entries = require("../services/Entries");

var _native = require("@react-navigation/native");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useEntries = function useEntries(days, category, limit) {
  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      entries = _useState2[0],
      setEntries = _useState2[1];

  var isFocused = (0, _native.useIsFocused)();
  (0, _react.useEffect)(function () {
    var loadEntries = function loadEntries() {
      var entryList;
      return regeneratorRuntime.async(function loadEntries$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap((0, _Entries.getEntryList)(days, category, limit));

            case 2:
              entryList = _context.sent;
              setEntries(entryList);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    loadEntries();
  }, [isFocused, days, category]);
  return [entries];
};

var _default = useEntries;
exports["default"] = _default;