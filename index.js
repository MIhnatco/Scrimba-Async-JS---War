
    const newDeckBtn = document.getElementById('btn');
    const drawCardBtn = document.getElementById('draw');
    let deckId;

    const cardsContainer = document.getElementById("cards");
    const winner = document.querySelector('#winner-text');
    const remainingText = document.querySelector('#remainingCards');

    const computerScore = document.querySelector("#cpScore");
    const playerScore = document.querySelector("#playerScore");

    let compScore = 0;
    let plScore = 0;
/**
 * Challenge:
 * 
 * Keep score! Every time the computer wins a hand, add a point to
 * the computer's score. Do the same for every time you win a hand.
 * If it's a war, no points are awarded to either player. If it's 
 * a war (same card values), no one is awarded points.
 * 
 * Display the computer's score above the top card, display your
 * own score BELOW the bottom card.
 * 
 * Track the scores in a global variable defined at the top of this file
 * 
 * Add to the global scores inside the `determineCardWinner` function below.
 */

/**
 * Challenge:
 * 
 * Display the final winner in the header at the top by
 * replacing the text of the h2.
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

                    compScore > plScore ? winner.textContent = "The computer won the game!" : compScore < plScore ? winner.textContent = "Congratulation, you win!" : "It's a tie game."
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
        compScore++;
        computerScore.textContent = `Computer score: ${compScore}`;

    } else if (card1ValueIndex < card2ValueIndex){
        winner.textContent = "You win!"
        plScore += 1;
        playerScore.textContent = `Your score: ${plScore}`;;
    } else {
        winner.textContent = 'War!'
    }


}
