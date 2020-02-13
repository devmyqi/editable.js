# ediTable - editable tables

ediTable is a very small javascript library to easily embed editable tables
on your website.

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
* filter table rows
* sort table rows
* column data types
* formatting numbers
* local storage

future
* edit table cells
* data from json api
* save to server

## versions

* v0.0.1	alpha1	20-02-15

## usage

1. load the script into your website

```html
<head>
	...
	<script src="editable.js"></script>
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
	const table = new Table({selector:'table#myTable'});
</script>
```
