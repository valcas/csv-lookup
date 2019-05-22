const CsvLukup = require('../build/csv-lukup.js').default;
const fs = require('fs');

describe("A suite", function() {
    it("contains spec with an expectation", function() {
      
      var content;
      var data = String(fs.readFileSync('./spec/testfiles/beatles.csv','utf-8'));

      var lukup = new CsvLukup();
      lukup.readcsv(data);

      while (lukup.next())  {
          console.log(lukup.getValueAt(0) + ":" + lukup.getValueAt(1));
      }

      console.log('done');

      expect(true).toBe(true);

    });
});