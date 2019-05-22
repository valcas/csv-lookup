# csv-lookup
Utility for loading a CSV file and looking up row data by header name

<b>CSV Content...</b>
"firstname","lastname"
"John","Lennon"
"George","Harrison"
"Paul","McCartney"
"Ringo","Starr"

<b>Using CsvLukup...</b>

var lukup = new CsvLukup({headerRow:0, dataRow:1});
lukup.readcsv(data);

while (lukup.next())  {
    var fullname = lukup.getValue('firstname') + lukup.getValue('lastname');
    console.log(fullname); // 'John Lennon', 'George Harrison', etc...
}

