const CsvLukup = require('../build/csv-lukup.js').default;
const fs = require('fs');

describe("A suite", function() {
    it("contains spec with an expectation", function() {
      
      var content;
      var data = String(fs.readFileSync('./spec/testfiles/beatles.csv','utf-8'));

      var lukup = new CsvLukup();
      lukup.readcsv(data);

      var colnames = lukup.getColnames();
      console.log(colnames);

      while (lukup.next())  {
        colnames.map(col => {
          console.log(col + ': ' + lukup.getValue(col));
        });
      }

      console.log('done');

      expect(true).toBe(true);

    });
});