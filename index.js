
    const newDeckBtn = document.getElementById('btn')
    const drawCardBtn = document.getElementById('draw')
    let deckId;

    const cardsContainer = document.getElementById("cards")
    const winner = document.querySelector('#winner-text')
    const remainingText = document.querySelector('#remainingCards')

/**
 * Challenge:
 * 
 * Disable the Draw button when we have no more cards to draw from
 * in the deck.
 * 
 * Disable both the functionality of the button (i.e. change
 * `disabled` to true on the button) AND the styling (i.e. add
 * a `disabled` CSS class to make it look unclickable)
 */

/**
 * Returns id of deck of cards
 */
    function callback(){
        fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
            .then(response => response.json())
            .then(deck => { 
                console.log(deck) 
                deckId = deck.deck_id;       
                remainingText.textContent = `Remaining cards: ${deck.remaining}`;

            })  
        }
        
        newDeckBtn.addEventListener('click', callback)
        
        drawCardBtn.addEventListener('click', function(){
            fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                
                remainingText.textContent = `Remaining cards: ${data.remaining}`;
                
                cardsContainer.children[0].innerHTML = `
                <img src=${data.cards[0].image} class="card" />` 
                
                cardsContainer.children[1].innerHTML = `
                <img src=${data.cards[1].image} class="card" />` 
                
                console.log(determineCardWinner(data.cards[0].value, data.cards[1].value))
                if(data.remaining === 0){
                    drawCardBtn.disabled = true;
                }
            })
    });



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
