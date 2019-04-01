# Node API

My aim is to build Node API 

1. Creating Server
2. Why we need server?
   - Large Dataset
   - Persistence ( User Account Stuffs )
   - API (Application Programming Interface)

3. ExpressJS: Serving files ,Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

```
	var express = require('express');
	var api = express();

	var server = app.listen(3000, listening);

	function listening(req, res){
		console.log("server listening in port 3000")
	}

``` 
Import the package Express as a variable, which acts as func, we can execute.

`app.use(express.static('public'));` 
- Web Server host static file, create a dir named 'public', and create a index.html file with some content. This code let you enable .html file to host "http://localhost:3000" 

- Callback func listening is called, where we show text in console 
 `console.log("server listening in port 3000")`
4. Set up Route: Routing refers to the definition of application end points (URIs) and how they respond to client requests. 

```
	var express = require('express')
	var app = express()

	// respond with "hello world" when a GET request is made to the homepage
	app.get('/', function (req, res) {
  		res.send('hello world')
	})

```
A route method is derived from one of the HTTP methods, and is attached to an instance of the express class.

```
	// GET method route
	app.get('/', function (req, res) {
	  res.send('GET request to the homepage')
	})

	// POST method route
	app.post('/', function (req, res) {
	  res.send('POST request to the homepage')
	})

```

## Route Parameter
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }

```

```
app.get('/users/:userId/books/:bookId', function (req, res) {
	res.send(req.params)
})

```
Follow (http://expressjs.com/en/guide/routing.html)

5. Reading & Updating JSON Data 
```
	var words= {
		"rose":5,
		"sunflower": 4,
		"lilly": 3,
		"goldie":3 
	};

	//route
	app.get('/all',sendAll);

	function sendAll(req, res){
		res.send(words);
	}

```

### Add Word in JSON Data

```
	// user add word
	app.get('/add/:word/:score', addWord);

	function addWord(req, res){
		var data = req.params;
		var word = data.word;
		var score = Number(data.score);

		words[word] = score;
		var reply = {
			msg: 'Thank you for your word'
		}
		res.send(reply);
	}
```

`app.get('/add/:word/:score?', addWord);`
// score is optional route here

### Search route

```
// Search Route, hey do you have word in database javascript 
// object
app.get('/searchme/:word', searchme);
function searchme(req, res){
	var word = req.params.word;
	var reply;
	if(words[word]){
		reply = {
			status: 'Found',
			word : word,
			score : words[word]
		}
	}else{
		reply ={
			status: 'Not Found',
			word: word
		}
	}
	res.send(reply);
}

```

### How to keep data persistence
	Save the data forever
	1.  Data in memory, quit the program, data is
	lost
	2. Save into text file, mostly JSON 
	3. Database: Firebase "database as service"
	4. CouchDB, MongoDB, nedDB

- We require package 'fs' refer to filesystem,and   we us readFileSync('filename.extension')

- Sync vs no sync
	1. readFileSync()
	   // syncronous, blocking line of code, it locks up the server.
	2. readFile
	   // asyncronously

Reading file from JSON

```
	var fs = require('fs');
	// read file content
	var data = fs.readFileSync('words.json','utf-8');
	// read file in json
	var words = JSON.parse(data);

```

writing file to json file

```
	words[word] = score;
		var data = JSON.stringify(words, null , 2);
		// (words, null , 2) - 2 space for element
		fs.writeFile('words.json',data, finished);
		function finished(err){
			console.log('Your word saved!');
			// to match data, added into json file
			reply = {
				status: 'Success',
				word : word,
				score : score
			}
		}
		res.send(reply); 	
```	   

6. Showing Data in front end client

## API Front End Client
 - Show JSON Data to html front end table

```
// Sending parse json data object to route '/'
 app.get('/', function(req, res){
	var data = JSON.stringify(words);
	var newdata = JSON.parse(data);

	console.log("Data in file => "+ newdata);
	res.render('index',{
		data: newdata
	});
});

```

// Accessing javascript object, we are iterating with word and it's score 

```
	  <% var keys = Object.keys(data) %>
	  <% for(var i=0; i<= keys.length; i++) { %>
	 	<% var word = keys[i], score = data[word]; %>
		<tr>
	    <td class="text-left"><%= word %>
	    </td>
		<td class="text-left"><%= score %>
		</td>
	  </tr>
	  <% } %>
```