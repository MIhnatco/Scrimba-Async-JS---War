/**
 Challenge: Add a button that, when clicked, gets a new deck of cards from the deckofcards API
 
 URL: https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
 
 Log the whole response to the console
 */

 const btn = document.getElementById('btn')

 function callback(){
     fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(response => response.json())
        .then(deck => console.log(deck))

 }

 btn.addEventListener('click', callback)



