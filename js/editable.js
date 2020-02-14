/*	meta information
	filename: js/editable.js
	description: editable tables
	version: v0.0.1 (alpha1)
	author: Michael Wronna, Konstanz
	created: 2020-02-13
	modified: 2020-02-14
*/

'use strict'; // not required, just a reminder

const Config = function() {
	/* properties */
	this.loglevel = 63;
	/* editable */
	this.allowEmpty = true; // missing fields in data objects
	/* functions */
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
	/* initialize */
	this.log(1,'new Config instance initialized: '+this.loglevel);
} // end of Config constructor function

const config = new Config(); // instance MUST be present

const Editable = function(data={}) {
	/* argument processing */
	if ( typeof data !== 'object' ) {
		return config.log(16,'invalid data type for new Editable()');
	};
	/* properties */
	this.objects = data.objects ? data.objects : [];
	this.selector = data.selector ? data.selector : 'table';
	this.element = document.querySelector(this.selector)
	if ( ! this.element ) {
		return config.log(16,'unable to create table on node: '+this.selector);
	};
	this.fields = Array.from(this.element.querySelectorAll('thead tr th'))
		.map(element => element.dataset.field)
		.filter(field => field !== undefined);
	if ( ! this.fields.length ) {
		return config.log(16,'no data fields defined in table: '+this.selector);
	};
	/* table functions */
	this.getFields = function() {
		config.log(4,'getting the data fields for table: '+this.selector);
	};
	this.normalizeTable = function() {
		config.log(4,'normalizing the editable table: '+this.selector);
		// check for a unique tr with th
		// create thead and tbody
		// move table rows into tbody
		// getting fields as return

	};
	/* row functions */
	this.addRow = function(object) {
		config.log(4,'adding row into editable table: '+this.selector);
	};
	this.addRows = function(objects) {
		config.log(2,'adding rows into editable table: '+this.selector);
		this.objects.map(object => this.addRow(object));
	};
	/* handler functions */
	/* initialize */
	config.log(1,'new Editable instance initialized: '+this.selector);
	/* call core functions */
	console.log('fields:',this.fields);
	// this.normalizeTable();
	this.addRows(this.objects);

	/* debugging output */
	// console.log(this.objects);
}; // end of Editable constructor function
