'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CsvLookup = function () {
    function CsvLookup(options) {
        _classCallCheck(this, CsvLookup);

        this.options = options;
    }

    _createClass(CsvLookup, [{
        key: 'readfile',
        value: function readfile(content) {

            content = atob(content.substring(content.indexOf(',') + 1, content.length));
            if (content.startsWith('sep=')) {
                content = content.substring(content.indexOf('\n')).trim();
            }
            this.lines = content.split("\n");
            this.readColNames();
            this.readDataLines();
            this.cursor = -1;
        }
    }, {
        key: 'next',
        value: function next() {
            this.cursor++;
            return this.cursor < this.rows.length;
        }
    }, {
        key: 'getValue',
        value: function getValue(colname) {
            var index = this.colnames.indexOf(colname);
            return this.rows[this.cursor][index];
        }
    }, {
        key: 'readColNames',
        value: function readColNames() {
            var headerStr = this.lines[this.getOption('headerRow', 0)];
            this.colnames = this.lineToArr(headerStr);
        }
    }, {
        key: 'lineToArr',
        value: function lineToArr(line) {
            var _this = this;

            var tmpArr = line.split(',');
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
                        tmpValue += "," + field;
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
        key: 'stripFieldQuotes',
        value: function stripFieldQuotes(field) {
            if (field.startsWith('"')) {
                field = field.substring(1, field.length - 1);
            }
            return field;
        }
    }, {
        key: 'readDataLines',
        value: function readDataLines() {
            var startRow = this.getOption('datarow', 1);
            var endRow = this.lines.length - startRow - this.getOption('trailerRows', 0);
            this.rows = [];
            for (var i = startRow; i <= endRow; i++) {
                var tmp = this.lines[i];
                var rowData = this.lineToArr(tmp);
                this.rows.push(rowData);
            }
        }
    }, {
        key: 'getOption',
        value: function getOption(name, def) {
            if (this.options[name]) {
                return this.options[name];
            } else {
                return def;
            }
        }
    }]);

    return CsvLookup;
}();

exports.default = CsvLookup;
