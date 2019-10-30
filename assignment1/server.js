/*********************************************************************************
*		WEB322:	Assignment 1
*		I	declare	that	this	assignment	is	my	own	work	in	accordance	with	Seneca		Academic	Policy.		
*		No	part	of	this	assignment	has	been	copied	manually	or	electronically	from	any	other	source
*		(including	web	sites)	or	distributed	to	other	students.
*	
*		Name:	Sahul Narang	Student	ID:	136560166	Date:	2017/09/10
*
*		Online	(Heroku)	URL:    https://young-citadel-57886.herokuapp.com/
*
********************************************************************************/	
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Sahul Narang - 136560166");
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);