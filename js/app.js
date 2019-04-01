

//attributes
let cards=document.getElementsByClassName('card');
let notOpendCards=[...cards];
let deck= document.getElementsByClassName('deck')[0];
var matchedCards = [];
var moves = 0;
var timing;
let time = 0;
var start = true;
let Stars = 3;
var matched = 0;
var stars = document.getElementsByClassName('fa-star');
var star = 2;

//behavioral 
window.onload = function(){
    startGame();
  document.querySelector('.deck').addEventListener('click', playing);
  document.querySelector('.restart').addEventListener('click', restartGame);
}
//functions
function startGame() {
   
    shuffle(notOpendCards);

for (let value of notOpendCards) {
    deck.appendChild(value);
  }
    
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function playing(){
      if (event.target.classList.contains('card') && matchedCards.length < 2){
        if (!event.target.classList.contains('match') && !matchedCards.includes(event.target)){ 
          if (start){
            startTime(1);
            start = false;
          }
          cardOpend(event.target);
          matchedCards.push(event.target); 
          if (matchedCards.length == 2){ 
            cardMatchingCheck();
            checkScore();
            moves++;

          }
          document.querySelector('.moves').innerHTML = moves;

        }
      }
      if (matched == 8){
        loosGame();
      }
    
}
function cardOpend(action){
  action.classList.toggle("open"); 
  action.classList.toggle("show");
}
function manageTime(counter){
    if(counter==1){
            document.querySelector('.time').innerHTML = time;
    }else{
          clearInterval();
    }
}
function startTime(){
  time = 0;
  setInterval(Timer, 1000);
}
function Timer(){
    if(moves!=0){
            time++;
    manageTime(1);   
    }
}

function checkScore(){
      if (moves === 10 || moves === 20 || moves === 30){
          const starsList = document.getElementsByClassName('fa')[star];
          star--;
         starsList.classList.remove('fa-star');
          starsList.classList.add('fa-star-o');
  }
}
function cardMatchingCheck(){
  let firstCard = matchedCards[0];
  let secondCard = matchedCards[1];
  if (firstCard.firstElementChild.className === secondCard.firstElementChild.className){
    secondCard.classList.toggle('match');
    firstCard.classList.toggle('match');
    matchedCards = [];
    matched++; 
  }
  else{
      setTimeout(function(){
      cardOpend(firstCard);
      cardOpend(secondCard);
      matchedCards = [];
    }, 400);
  }


}
function restartGame(){
    startGame();
}
function loosGame(){

let starsShow = star+1;

  swal({
    title: "Good job!",
    text: "Gongrats! You took "+ time+ " seconds, With "+ starsShow + " Stars",
    icon: "success",
    button: "Play Again!",
  }).then((restart) => {
    if (restart) {
      restartGame();
    }
  });

  
}
