export default class CsvLookup {

    constructor(options)   {
        this.options = options;
    }

    readfile(content)  {

        content = atob(content.substring(content.indexOf(',') + 1, content.length));
        if (content.startsWith('sep=')) {
            content = content.substring(content.indexOf('\n')).trim();
        }
        this.lines = content.split("\n");
        this.readColNames();
        this.readDataLines();
        this.cursor = -1;

    }

    next()  {
        this.cursor++;
        return (this.cursor < this.rows.length);
    }

    getValue(colname)   {
        var index = this.colnames.indexOf(colname);
        return this.rows[this.cursor][index];
    }

    readColNames()  {
        var headerStr = this.lines[this.getOption('headerRow', 0)];
        this.colnames = this.lineToArr(headerStr);
    }

    lineToArr(line) {
        
        var tmpArr = line.split(',');
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
                    tmpValue += "," + field;
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
        var startRow = this.getOption('datarow', 1);
        var endRow = this.lines.length - startRow - this.getOption('trailerRows', 0);
        this.rows = [];
        for (var i = startRow; i <= endRow; i++)  {
            var tmp = this.lines[i];
            var rowData = this.lineToArr(tmp);
            this.rows.push(rowData);
        }
    }

    getOption(name, def) {
        if (this.options[name]) {
            return this.options[name];
        } else {
            return def;
        }
    }

}