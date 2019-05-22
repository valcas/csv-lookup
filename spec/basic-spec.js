const CsvLukup = require('../build/csv-lukup.js').default;
const fs = require('fs');

describe("A suite", function() {
    it("contains spec with an expectation", function() {
      
      var content;
      var data = String(fs.readFileSync('./spec/testfiles/beatles.csv','utf-8'));

      var lukup = new CsvLukup({delimiter:',', headerRow:0, dataRow:1, trailerRows:0});
      lukup.readcsv(data);

      var colnames = lukup.getColnames();
      console.log(colnames);

      while (lukup.next())  {
        var row = ''
        colnames.map(col => {
          row += lukup.getValue(col) + ':';
        });
        console.log(row.substring(0, row.length - 1));
      }

      console.log('done');

      expect(true).toBe(true);

    });
});