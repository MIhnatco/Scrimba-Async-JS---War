
    const newDeckBtn = document.getElementById('btn')
    const drawCardBtn = document.getElementById('draw')
    let deckId;

    const cardsContainer = document.getElementById("cards")
    const winner = document.querySelector('#winner-text')



 function callback(){
     fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(response => response.json())
        .then(deck => {
                 
            deckId = deck.deck_id;
                    
        })
        
    }
    
    newDeckBtn.addEventListener('click', callback)
    
    drawCardBtn.addEventListener('click', function(){
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            
                cardsContainer.children[0].innerHTML = `
                    <img src=${data.cards[0].image} class="card" />` 

                cardsContainer.children[1].innerHTML = `
                    <img src=${data.cards[1].image} class="card" />` 

                console.log(determineCardWinner(data.cards[0].value, data.cards[1].value))
            })
    });

/**
 * Challenge:
 * 
 * Try to determine which of the 2 cards is the "winner" (has higher value)
 * Aces are the card with the highest "score"
 * 
 * In parts:
 * 
 * 1. Create a function that takes 2 card objects as parameters, 
 * `card1` and `card2`. These card objects have a property called
 * `value`, which can be any one of the following strings, in
 * order of rising "score":
 * 
 * "2", "3", "4", "5", "6", "7", "8", "9", 
 * "10", "JACK", "QUEEN", "KING", "ACE"
 * 
 * I.e. "2" is the lowest score and "ACE" is the highest.
 * 
 * The function should determine which of the 2 cards (`card1`
 * or `card2`) has the higher score, or if they have the same score.
 * 
 * Log which card wins (or "It's a tie!" 
 * if they're the same) to the console
 */

/**
 * Challenge:
 * 
 * Try to determine which of the 2 cards is the "winner" (has higher value)
 * Aces are the card with the highest "score"
 * 
 * Part 2:
 * Instead of logging the winner to the console, 
 * display an `h2` on the screen above the 2 cards 
 * that declares who the winner is.
 * 
 * If card1 is the higher card, display "Computer wins!"
 * If card2 is the higher card, display "You win!"
 * If they're equal, display "War!"
 */


/**
 * Returns a winner among two cards, or a tie.
 * @param {number} card1 - card 1
 * @param {number} card2 - card 2
 */
function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];

    const card1ValueIndex = valueOptions.indexOf(card1);
    const card2ValueIndex = valueOptions.indexOf(card2);

    if (card1ValueIndex > card2ValueIndex){
        winner.textContent = "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex){
        winner.textContent = "You win!"
    } else {
        winner.textContent = 'War!'
    }


}