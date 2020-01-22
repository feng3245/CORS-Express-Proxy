const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const http = require('http');
const querystring = require('querystring');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
res.send('Hello World!!!');
});

app.get('/api/courses', (req, res)=>{
res.send([1,2,3]);
});

app.get('/api/posts/:year/:month', (req, res)=>{
console.log(req);
	res.send(req.options);
});
app.post('/api/posts', (req, res)=>{
console.log(req.body);
	res.send([]);
});
app.post('/api/proxy/:domain/:path', (req, res)=>{
	let httpreq = http.request({host: req.params.domain, path: req.params.path, method: 'POST', port: 80, headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(querystring.stringify(req.body))} }, (response) =>{
		console.log(response);
		response.on('data', (chunk)=>{res.send(chunk)});
		//response.on('end', ()=>{res.send(response);});

	});
	console.log(httpreq);
	httpreq.write(querystring.stringify(req.body));
	httpreq.end();
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
