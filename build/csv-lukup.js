"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var JsonConfig = require('json-config/lib/json-config')["default"];

var CsvLukup =
/*#__PURE__*/
function () {
  function CsvLukup(options) {
    _classCallCheck(this, CsvLukup);

    this.options = options;
    this.config = new JsonConfig(options);
    this.delimiter = this.config.getValue('delimiter', ',');
    this.headerRow = this.config.getValue('headerRow', -1);
    this.dataRow = this.config.getValue('dataRow', 1) + this.headerRow;
    this.trailerRows = this.config.getValue('trailerRows', 0);
  }

  _createClass(CsvLukup, [{
    key: "setNewLineChar",
    value: function setNewLineChar(content) {
      if (content.indexOf('\r\n') > -1) {
        this.newline = '\r\n';
      } else {
        this.newline = '\n';
      }
    }
  }, {
    key: "readcsv",
    value: function readcsv(content) {
      this.setNewLineChar(content);

      if (content.startsWith('sep=')) {
        content = content.substring(content.indexOf(this.newline)).trim();
      }

      this.lines = content.split(this.newline);

      if (this.headerRow > -1) {
        this.readColNames();
      }

      this.readDataLines();
      this.cursor = -1;
    }
  }, {
    key: "getColnames",
    value: function getColnames() {
      return this.colnames;
    }
  }, {
    key: "next",
    value: function next() {
      this.cursor++;
      return this.cursor < this.rows.length;
    }
  }, {
    key: "getValue",
    value: function getValue(colname) {
      return this.rows[this.cursor][this.colnames.indexOf(colname)];
    }
  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      return this.rows[this.cursor][index];
    }
  }, {
    key: "readColNames",
    value: function readColNames() {
      var headerStr = this.lines[this.headerRow];
      this.colnames = this.lineToArr(headerStr);
    }
  }, {
    key: "lineToArr",
    value: function lineToArr(line) {
      var _this = this;

      var tmpArr = line.split(this.delimiter);
      var fields = [];
      var tmpValue = null;
      tmpArr.map(function (field) {
        if (field.length > 1 && field.startsWith('"')) {
          if (field.endsWith('"')) {
            fields.push(_this.stripFieldQuotes(field));
          } else {
            tmpValue = field;
          }
        } else {
          if (tmpValue) {
            tmpValue += _this.delimiter + field;

            if (field.endsWith('"')) {
              fields.push(_this.stripFieldQuotes(tmpValue.substring(1, tmpValue.length - 1)));
              tmpValue = null;
            }
          } else {
            fields.push(_this.stripFieldQuotes(field));
          }
        }
      });
      return fields;
    }
  }, {
    key: "stripFieldQuotes",
    value: function stripFieldQuotes(field) {
      if (field.startsWith('"')) {
        field = field.substring(1, field.length - 1);
      }

      return field;
    }
  }, {
    key: "readDataLines",
    value: function readDataLines() {
      var startRow = this.dataRow;
      var endRow = this.lines.length - startRow - this.trailerRows + this.headerRow;
      this.rows = [];

      for (var i = startRow; i <= endRow; i++) {
        var tmp = this.lines[i];
        var rowData = this.lineToArr(tmp);
        this.rows.push(rowData);
      }
    }
  }]);

  return CsvLukup;
}();

exports["default"] = CsvLukup;