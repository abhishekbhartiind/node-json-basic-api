document.getElementById('submit').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
	
  var word = document.getElementById('word').value();
  var score = document.getElementById('score').value();
  console.log(word+'-----'+score);
  alert(word+'-----'+score);
}
