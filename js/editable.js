/*	meta information
	filename: js/editable.js
	description: editable tables
	version: v0.0.1 (alpha1)
	author: Michael Wronna, Konstanz
	created: 2020-02-13
	modified: 2020-02-13
*/

'use strict'; // not required, just a reminder

const Log = function(level,message) {
	console.log(level,message);
} // end of Log function

const Config = function() {
	// properties
	this.loglevel = 63;
	// functions
	this.log = function(level,message) {
		const logdate = function() {
			const date = new Date();
			return String(date.getHours()).padStart(2,'0') + ':'
				+ String(date.getMinutes()).padStart(2,'0') + ':'
				+ String(date.getSeconds()).padStart(2,'0') + '.'
				+ String(date.getMilliseconds()).padStart(3,'0');
		};
		const logtype = function(level) {
			const logtypes = {1:'info',2:'info',4:'info',8:'warning',16:'error',32:'debug'};
			return logtypes[level] ? logtypes[level] : 'undef';
		};
		const logcommand = function(level) {
			if ( level === 16 ) { return 'error';
			} else if ( level == 8 ) { return 'warn';
			} else { return 'log'; }
		};
		if ( this.loglevel & level ) {
			const command = logcommand(level);
			console[command](`${logdate()} [${logtype(level)}] (${level}) ${message}`);
		};
	};
	// initialize
	this.log(1,'new Config instance initialized');
} // end of Config constructor function

const config = new Config(); // instance MUST be present

const Editable = function(dataObj={}) {
	// argument processing
	if ( typeof dataObj !== 'object' ) {
		return config.log(16,'invalid data type for new Editable()');
	};
	// properties
	this.selector = 'table';
	// handler functions
	// table functions
	// row functions
	// initialize
	config.log(1,'new Editable instance initialized');
}; // end of Editable constructor function
