const JsonConfig = require('json-config/lib/json-config').default;

export default class CsvLukup {

    constructor(options)   {
        this.options = options;
        this.config = new JsonConfig(options);
        this.delimiter = this.config.getValue('delimiter', ',');
        this.headerRow = this.config.getValue('headerRow', -1);
        this.dataRow = this.config.getValue('dataRow', 1) + this.headerRow;
        this.trailerRows = this.config.getValue('trailerRows', 0);
    }

    setNewLineChar(content)    {
        if (content.indexOf('\r\n') > -1)   {
            this.newline = '\r\n';
        } else {
            this.newline = '\n';
        }
    }

    readcsv(content)  {

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

    getColnames()   {
        return this.colnames;
    }

    next()  {
        this.cursor++;
        return (this.cursor < this.rows.length);
    }

    getValue(colname)   {
        return this.rows[this.cursor][this.colnames.indexOf(colname)];
    }

    getValueAt(index)  {
        return this.rows[this.cursor][index];
    }

    readColNames()  {
        var headerStr = this.lines[this.headerRow];
        this.colnames = this.lineToArr(headerStr);
    }

    lineToArr(line) {
        
        var tmpArr = line.split(this.delimiter);
        var fields = [];
        var tmpValue = null;

        tmpArr.map(field => {
            if (field.length > 1 && (field.startsWith('"')))  {
                if (field.endsWith('"'))    {
                    fields.push(this.stripFieldQuotes(field));
                } else {
                    tmpValue = field;
                }
            } else {
                if (tmpValue)   {
                    tmpValue += this.delimiter + field;
                    if (field.endsWith('"'))    {
                        fields.push(this.stripFieldQuotes(tmpValue.substring(1, tmpValue.length - 1)));
                        tmpValue = null;
                    }
                } else {                    
                    fields.push(this.stripFieldQuotes(field));
                }
            }
        });

        return fields;

    }

    stripFieldQuotes(field)  {
        if (field.startsWith('"'))  {
            field = field.substring(1, field.length - 1);
        }
        return field;
    }

    readDataLines() {
        var startRow = this.dataRow;
        var endRow = this.lines.length - startRow - this.trailerRows + this.headerRow;
        this.rows = [];
        for (var i = startRow; i <= endRow; i++)  {
            var tmp = this.lines[i];
            var rowData = this.lineToArr(tmp);
            this.rows.push(rowData);
        }
    }

}