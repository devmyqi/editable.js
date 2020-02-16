/*	meta information
	filename: js/editable.js
	description: editable tables
	version: v0.0.1 (alpha1)
	author: Michael Wronna, Konstanz
	created: 2020-02-13
	modified: 2020-02-16
*/

'use strict'; // not required, just a reminder

const Config = function() {
	/* properties */
	this.loglevel = 63;
	/* editable */
	this.allowEmpty = false; // missing fields in data objects
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
	config.log(1,'new Editable instance initialized: '+this.selector);
	if ( ! this.element ) {
		return config.log(16,'unable to create table on node: '+this.selector);
	};
	/* table functions */
	this.normalizeTable = function() { // return arry of field objects
		config.log(2,'normalizing the editable table: '+this.selector);
		// get table head and body
		const thead = this.element.querySelector('thead')
			? this.element.querySelector('thead') : document.createElement('thead');
		const tbody = this.element.querySelector('tbody')
			? this.element.querySelector('tbody') : document.createElement('tbody');
		// get head and data rows
		const headRows = Array.from(this.element.querySelectorAll('tr > th:first-child'))
			.map(element => element.parentNode);
		const dataRows = Array.from(this.element.querySelectorAll('tr > td:first-child'))
			.map(element => element.parentNode);
		// only one head row append to table head
		const headRow = headRows.shift();
		headRows.map(element => element.remove());
		thead.appendChild(headRow);
		// append data rows to table body
		dataRows.map(dataRow => tbody.appendChild(dataRow));
		// return the list of field objects
		return Array.from(headRow.querySelectorAll('th')).map(headCell => {
			const field = {};
			if ( ! headCell.dataset.field ) { return null; }
			field.name = headCell.dataset.field;
			// next two lines for future use
			if ( headCell.dataset.type ) { field.type = headCell.dataset.type; }
			if ( headCell.dataset.type ) { field.type = headCell.dataset.type; }
			return field;
		}).filter(field => field !== null);
	};
	this.fields = this.normalizeTable();
	if ( ! this.fields.length ) {
		return config.log(16,'table has no editable fields: '+this.selector);
	};
	this.addRowActions = function() {
		Array.from(this.element.querySelectorAll('tbody > tr'))
			.map(row => this.setRowActions(row));
	}
	/* row functions */
	this.addDataRow = function(object) {
		const tableBody = this.element.querySelector('tbody');
		const row = document.createElement('tr');
		this.fields.map(field => {
			const cell = document.createElement('td');
			cell.textContent = Object.keys(object).includes(field.name)
				? object[field.name] : '';
			cell.setAttribute('contenteditable','false');
			row.appendChild(cell);
		});
		const empty = Array.from(row.querySelectorAll('td')).map(cell =>
			cell.textContent < 1) .filter(isEmpty => isEmpty === true).length;
		// append row or return
		if ( empty === Object.keys(this.fields).length ) { return null; // all empty
		} else if ( empty > 0 && ! config.allowEmpty ) { return null; // empty not allowed
		} else { tableBody.appendChild(row); }
		config.log(4,'adding row into editable table: '+this.selector);
	};
	// event function
	this.rowDelete = function(event) {
		event.target.parentNode.parentNode.remove();
		this.addRowActions();
	};
	this.rowEdit = function(event) {
		const row = event.target.parentNode.parentNode;
		console.log('row to edit:',row);
		Array.from(row.querySelectorAll('td')).map(element =>
			element.setAttribute('contenteditable','true'));
		row.querySelector('td[contenteditable]').focus();
		this.setRowActions(row);
	};
	this.rowSubmit = function(event) {
		const row = event.target.parentNode.parentNode;
		Array.from(row.querySelectorAll('td[contenteditable]')).map(element =>
			element.setAttribute('contenteditable','false'));
		this.setRowActions(row);
	};
	this.rowClear = function(event) {
		const row = event.target.parentNode.parentNode;
		Array.from(row.querySelectorAll('td[contenteditable]')).map(element =>
			element.innerText = '');
	};
	this.rowMoveUp = function(event) {
		const row = event.currentTarget.parentNode.parentNode;
		row.parentNode.insertBefore(row,row.previousElementSibling);
		this.addRowActions();
	};
	this.rowAddNew = function(event) {
		const row = document.createElement('tr');
		this.fields.map((field) => {
			const cell = document.createElement('td');
			cell.setAttribute('contenteditable','true');
			row.appendChild(cell);
		}); this.element.querySelector('tbody').appendChild(row);
		this.addRowActions();
	};
	/* action functions */
	this.actions = {
		delete: {element:'i',classes:['delete','fas','fa-trash'],eventHandler:'rowDelete'},
		edit: {element:'i',classes:['edit','fas','fa-edit'],eventHandler:'rowEdit'},
		submit: {element:'i',classes:['submit','far','fa-check-square'],eventHandler:'rowSubmit'},
		clear: {element:'i',classes:['clear','fas','fa-eraser'],eventHandler:'rowClear'},
		moveup: {element:'i',classes:['moveup','fas','fa-arrow-up'],eventHandler:'rowMoveUp'},
		addrow: {element:'i',classes:['addrow','fas','fa-plus-square'],eventHandler:'rowAddNew'},
	};
	this.getActionElement = function(action) {
		const props = Object.keys(this.actions).includes(action) ? this.actions[action] : false;
		if ( ! props ) return console.warn('undefined action element:',action);
		const element = document.createElement(props.element);
		props.classes.map(className => element.classList.add(className));
		element.addEventListener('click',event => this[props.eventHandler](event));
		return element;
	};
	this.setRowActions = function(row) {
		let actionCell = row.querySelector('td.actions');
		if ( ! actionCell ) {
			actionCell = document.createElement('td');
			actionCell.classList.add('actions');
			row.appendChild(actionCell);
		};
		Array.from(actionCell.querySelectorAll('*'))
			.map(element => element.remove()); // remove all actions
		if ( row.querySelector('td[contenteditable=true]') ) {
			actionCell.appendChild(this.getActionElement('submit'));
			actionCell.appendChild(this.getActionElement('clear'));
		} else { // regular cell, not editable
			actionCell.appendChild(this.getActionElement('delete'));
			actionCell.appendChild(this.getActionElement('edit'));
			actionCell.appendChild(this.getActionElement('moveup'));
		}
		if ( ! row.nextElementSibling ) {
			actionCell.appendChild(this.getActionElement('addrow'));
		};
	};
	/* initialize */
	/* call core functions */
	this.objects.map(object => this.addDataRow(object)); // add rows for object list

	Array.from(this.element.querySelectorAll('tbody > tr'))
		.map(row => this.setRowActions(row));

	/* debugging output */
	// console.log(this.objects);
}; // end of Editable constructor function
