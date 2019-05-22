# csv-lookup
Utility for loading a CSV file and looking up row data by header name

<b>CSV Content...</b>
<pre>
"firstname","lastname"
"John","Lennon"
"George","Harrison"
"Paul","McCartney"
"Ringo","Starr"
</pre>

<b>Using CsvLukup...</b>

<pre>
var lukup = new CsvLukup({headerRow:0, dataRow:1});
lukup.readcsv(data);

while (lukup.next())  {
    var fullname = lukup.getValue('firstname') + lukup.getValue('lastname');
    console.log(fullname); // 'John Lennon', 'George Harrison', etc...
}
</pre>

<b>Installation...</b>

<pre>
npm install valcas/csv-lukup#1.0.0
</pre>

<b>Usage...</b>

<pre>
import CsvLukup from 'csv-lukup';
</pre>
