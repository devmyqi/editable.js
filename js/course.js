'use strict';

const Table = function(data={}) {
	// properties
	this.selector = data.selector ? data.selector : 'table';
	this.element = document.querySelector(this.selector);
	this.objects = data.objects ? data.objects : [];
	this.fields = Array.from(this.element.querySelectorAll('thead tr th')).map(
		(element) => { return element.getAttribute('title'); });
	this.actions = {
		delete: {element:'i',classes:['delete','fas','fa-trash'],eventHandler:'rowDelete'},
		edit: {element:'i',classes:['edit','fas','fa-edit'],eventHandler:'rowEdit'},
		submit: {element:'i',classes:['submit','far','fa-check-square'],eventHandler:'rowSubmit'},
		clear: {element:'i',classes:['clear','fas','fa-eraser'],eventHandler:'rowClear'},
		moveup: {element:'i',classes:['moveup','fas','fa-arrow-up'],eventHandler:'rowMoveUp'},
		addrow: {element:'i',classes:['addrow','fas','fa-plus-square'],eventHandler:'rowAddNew'},
	};
	// table functions
	this.addTableBody = function() {
		console.log('adding table body')
		const tbody = this.element.querySelector('tbody')
			? this.element.querySelector('tbody')
			: document.createElement('tbody');
		this.element.appendChild(tbody);
		Array.from(this.element.querySelectorAll('table > tr')).map(element =>
			tbody.appendChild(element)); // moves rows in tbody
	}
	this.addRowActions = function() {
		Array.from(this.element.querySelectorAll('tbody > tr')).map((row) => {
			this.setRowActions(row)
		});
	};
	// data functions
	this.validObjects = function() {
		return this.objects.filter(object =>
			this.fields.every(field => Object.keys(object).includes(field)));
	};
	this.addObjects = function() {
		this.validObjects().map((object) => {
			const row = document.createElement('tr');
			this.fields.map(field => {
				const cell = document.createElement('td');
				cell.setAttribute('contenteditable','false');
				cell.innerText = object[field];
				row.appendChild(cell);
			}); this.element.querySelector('tbody').appendChild(row);
			// this.setRowActions(row);
		});
	};
	// event function
	this.rowDelete = function(event) {
		event.target.parentNode.parentNode.remove();
		this.addRowActions();
	};
	this.rowEdit = function(event) {
		const row = event.target.parentNode.parentNode;
		Array.from(row.querySelectorAll('td[contenteditable]')).map(element =>
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
	// element function
	this.getActionElement = function(action) {
		const props = Object.keys(this.actions).includes(action) ? this.actions[action] : false;
		if ( ! props ) return console.warn('undefined action element:',action);
		const element = document.createElement(props.element);
		props.classes.map(className => element.classList.add(className));
		element.addEventListener('click',event => this[props.eventHandler](event));
		return element;
	};
	// other functions
	this.setRowActions = function(row) { // row actions with event handler
		let actionCell = row.querySelector('td.actions');
		if ( ! actionCell ) {
			actionCell = document.createElement('td');
			actionCell.classList.add('actions');
			row.appendChild(actionCell);
		};
		Array.from(actionCell.querySelectorAll('*')).map(element =>
			element.remove()); // remove all actions first (avoid duclicates)
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
	// initialization
	console.log('new Table object initialized: ',this.selector);
	/* debugging output
	console.log('element:',this.element);
	console.log('Table:',this);
	console.log('fields:',this.fields);
	console.log('fields:',this.fields)
	console.log('objects:',this.objects);
	console.log('valid:',this.validObjects());
	*/
	this.addTableBody();

	this.addObjects();
	this.addRowActions();

	console.log(this.getActionElement('edit'));
};
