# csv-parser
This module contains functions for writing new .csv file or parsing existing .csv file.

## Using

Firstly you should clone this repository in your application using git clone command.

```
git clone https://github.com/NikitaKemarskiy/csv-parser.git
```
Then you should require it in your application. This module is an object with two methods: "parseCSV" for parsing existing .csv file to array and "toCSV" for creating a value to write a new .csv file.

```javascript
const csvParser = require('./csv-parser'); // Require csv-parser package
const fs = require('fs'); // Require file stream module to read / write .csv files

const filePath = 'cars.csv'; // Path to your .csv file 
const cars = [ // Array of arrays which contains table data to write it in .csv file
	[1997, 'Ford', 'E350', 'Hello, "Daydreamin"', 3000.00, true],
	[1999, 'Chevy', "Venture «Extended Edition»", "", 4900.00, false],
	[1996, 'Jeep', 'Grand Cherokee', "MUST SELL! air, moon roof, loaded", 4799.00, false]
];

// Writing to .csv file
const csv = csvParser.toCSV(cars);
fs.writeFile(filePath, csv, function(error) {
	if (error) {
		console.error(`Error: ${error.message}`);
	} else {
		console.log(`${filePath} was successfully written`);
	}
});

// Reading existing .csv file
fs.readFile(filePath, function(error, data) {
	if (error) {
		console.error(`Error: ${error.message}`);
	} else {
		const csv = csvParser.parseCSV(data);
		console.log(csv);
	}
});
```


