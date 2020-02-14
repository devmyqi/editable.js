# ediTable - editable tables

ediTable is a very small javascript library to easily embed editable tables
on your website. It is very eas to setup, just define an table in your websites
HTML code and load the script!

## specification

* small library (<3k)
* no requirements
* pure vanillaJS
* easy to setup

## features

* edit table rows
* data from (json)
* data in HTML
* moving rows

next
* logging configurable
* filter table rows
* sort table rows
* configurable actions
* column data types
* formatting numbers
* local storage

future
* configuration environment
* table, row and cell actions
* edit table cells
* data from json api
* auto insert, suggestions
* mouse navigation
* save to server

## versions

* v0.0.1	alpha1	20-02-15

## usage

1. load the script into your website

```html
<head>
	...
	<script src="js/editable.js"></script>
</head>
```

2. create the data table

```html
<table id="myTable">
	<thead>
		<tr>
			<th data-field="col1">column 1</th>
			<th data-field="col2">column 2</th>
		</tr>
	</thead>
	<tbody>
	<tbody>
</table>
```

3. initialize the editable table

```html
<script>
	'use strict';
	const editable = new Editable({selector:'table#myTable'});
</script>
```
