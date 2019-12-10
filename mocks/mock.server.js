const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const uuidv4  = require("uuid/v4");

var originsWhitelist = [
	'http://localhost:3000'
	// add more whitelisted URLs here comma separated
];
var corsOptions = {
	origin: function(origin, callback) {
		var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
		callback(null, isWhitelisted);
	},
	credentials: true
}


// const fireRequest = function(req, res, query) {
// 	const payload = (req.query) ? req.query.query : query;
// 	const filckrAPIURL = `https://api.flickr.com/services/feeds/photos_public.gne?tags=${payload}
//     &format=json&jsoncallback=JSONP_CALLBACK`;

// 	request.get({
// 			url: filckrAPIURL,
// 			gzip: true
// 		},
// 		function(error, response, body) {
// 			if (error) {
// 				res.send({
// 					error: error
// 				});
// 			}
// 			body = body.replace('JSONP_CALLBACK(', '');
// 			body = body.replaceAt(body.length - 1, ' ');
// 			res.json(JSON.parse(body)); // converts and sends JSON
// 		});
// }

// // string replace at index function
// String.prototype.replaceAt = function(index, replacement) {
// 	return this.substr(0, index) + replacement + this.substr(index + replacement.length);
// }

// whitelist domains for CORS/CORB
app.use(cors(corsOptions));


app.use((req, res, next) => {
	console.log('[mock] requested URL:', req.url);
	next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

var documentList = [];

app.get('/get-document-by-id', function(req, res) {
	console.log('inside /get-document-by-id endpoint', req.query, documentList);
	for (var i = 0; i < documentList.length; i++) {
		if (documentList[i]._id === req.query.id) {
			res.send(documentList[i]);
		}
	}
});

app.post('/create-document', function(req, res) {
	console.log('inside document/create-document endpoint', req.body);
	var obj = Object.assign(req.body, {_id: uuidv4()});
	documentList.push(obj);
	res.send({data: 'document successfully added'});
});

app.post('/update-document', (req, res) => {
	console.log(req.body,'request body-------------')
	var document = req.body;
	for (var i = 0; i < documentList.length; i++) {
		if (document.id === documentList[i]._id) {
			documentList[i].document_title = document.document_title;
			documentList[i].desc = document.desc;
			documentList[i].publisher = document.publisher;
			break;
		}
	}
    res.send(documentList);
});

// /**Api to delete the document */
app.delete('/delete-document', (req, res) => {
    for (var i = 0; i < documentList.length; i++) {
		if (documentList[i]._id === req.query.id) {
			documentList.splice(i, 1);
			res.send(documentList);
		}
	}
});

/**Api to get the list of document */
app.get('/get-document', (req, res) => {
    res.send(documentList);
});


const server = app.listen(3456, function() {
	console.log("[mock] mock server listening on port %s...", server.address().port);
});