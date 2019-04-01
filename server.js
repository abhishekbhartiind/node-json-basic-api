var fs = require('fs');
// read file content
var data = fs.readFileSync('words.json','utf-8');
// read file in json
var words = JSON.parse(data);
console.log(words);
//javascript Object

// words : score
var express = require('express'),
	app = express()
;
var bodyParser = require('body-parser');

app.set('view engine','ejs');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var server = app.listen(4000, listen);

function listen() {
	console.log('listening in port 4000')
}

app.use(express.static('./public'));
//app.use(express.static('public'));


app.get('/', function(req, res){
	var data = JSON.stringify(words);
	var newdata = JSON.parse(data);

	console.log("Data in file => "+ newdata);
	res.render('index',{
		data: newdata
	});
});



app.get('/search/:flower/:num', sendFlower);
//callback func, you make routes, search is the route 
// followed by var flower with { : }


//callback function sendFlower
function sendFlower(req, res){
  var data = req.params;
  var num = data.num;
  var reply = '';	
  for (var i = 0; i < num; i++) {
  	reply += "I love"+ data.flower +" too";
  }
  console.log('callback sendFlower func called.');		
  res.send(reply);
}

//--------------
// user add word
app.get('/add/:word/:score?', addWord);
// score is optional route here

function addWord(req, res){
	var data = req.params;
	var word = data.word;
	var score = Number(data.score);
	var reply;
	if(!score){
		reply = {
			msg: 'score is required!'
		}
	  res.send(reply);
	}else{
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
	}
}

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

// basic route to show all javascript object in 
// json file

app.get('/all',sendAll);

function sendAll(req, res){
	res.send(words);
}