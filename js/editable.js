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
	// functions
	this.log = function(level,message) {
		console.log('cl',level,message);
	};
	// initialize
	this.log(1,'new Config instance initialized');
} // end of Config constructor function

const config = new Config(); // instance MUST be present

const Table = function(dataObj={}) {
	// properties
	this.selector = 'table';
	// functions
	// initialize
	config.log(1,'test');
}; // end of Table constructor function

