// Create a value to write a new .csv file
const toCSV = function(arr) {
	// Array was passed
	if (Array.isArray(arr)) { 
		arr.forEach(function(item) {
			// Array item is array too
			if (Array.isArray(item)) { 
				// Convert each column-row value
				item.forEach(function(val, index, arr) {
					if (typeof(val) === 'string') {
						if ((val.indexOf('\,') !== -1) || (val.indexOf('\"') !== -1) || (val.indexOf('\;') !== -1)) {
							arr[index] = `"${val}"`;
						} else if (val === '') {
							arr[index] = `""`;
						}
					}
				});
			} 
			// Array item isn't an array -> return error message
			else {
				let error = new Error('You should pass array which contains arrays as columns with values');
				return `Error: ${error.message}`;
			}
		});
		// Creating value for .csv file and return it
		const csv = arr.join('\n');
		return csv;
	} 
	// The passed value isn't an array -> return error message
	else {
		let error = new Error('You should pass array which contains arrays as columns with values');
		return `Error: ${error.message}`;
	}
}

// Convert values from string to number / boolean if it's needed
const convertVal = function(val) {
	if (!!Number(val)) {
		// String contains number
		if (Number(val) == val) { 
			val = Number(val);
		}
	} 
	// String contains boolean
	else if (val === 'true' || val === 'false') {
		val = !!val;
	}
	return val;
}

// Parse .csv file to javascript array
const parseCSV = function(csv) {
	csv = csv.toString();
	// Creating initial array, containing strings of .csv file columns
	let arr = csv.split('\n');
	// If the column is empty -> remove it
	arr = arr.filter(function(item) {
		if (item !== '') {
			return item;
		}
	});
	// Parse each column of .csv file
	arr = arr.map(function(item) {
		let newItem = [], str = '';
		let isInside = false, doubleQuotes = false;

		// Parse each symbol in .csv file column
		for (let i = 0; i < item.length; i++) {
			// If the current column-row value is enclosed in double quotes -> flag isInside = true
			if (!isInside && item[i] === '"') {
				isInside = true;
			} 
			// If we're inside the current column-row value and there're quotes -> add one quote to str, flag doubleQuotes = true
			else if (!doubleQuotes && isInside && item[i] === '"' && item[i + 1] === '"') {
				doubleQuotes = true;
				str += '"';
			} 
			// If we're inside the current column-row value and there're second quote -> flag doubleQuote = false
			else if (doubleQuotes && isInside && item[i] === '"') {
				doubleQuotes = false;
			} 
			// If we're inside the current column-row value and we meet double quotes (the end of the value) -> flag isInside = false
			else if (!doubleQuotes && isInside && item[i] === '"') {
				isInside = false;
			} 
			// If we're inside the current column-row value and we meet common symbol -> add it to str
			else if (isInside) {
				str += item[i];
			} 
			// If we're not inside and we meet comma (delimiter) -> push the str to array, making str empty
			else if (!isInside && item[i] === ',') {
				// Convert stored column-row value from string to number / boolean (if it's needed)
				str = convertVal(str);
				// Push stored value to array
				newItem.push(str);
				str = '';
			} 
			// If we're not inside and we meet common symbol -> add it to str
			else if (!isInside && item[i] !== ',') {
				str += item[i];
			}
			// If it's the last item in column -> push the str to array
			if (i === (item.length - 1)) {
				// Convert stored column-row value from string to number / boolean (if it's needed)
				str = convertVal(str);
				// Push stored value to array
				newItem.push(str);
			}
		}
		// Return array which contains values of a current column
		return newItem;
	});
	// Return final array
	return arr;
}

module.exports = {
	parseCSV,
	toCSV
};