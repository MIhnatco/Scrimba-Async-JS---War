
    const newDeckBtn = document.getElementById('btn')
    const drawCardBtn = document.getElementById('draw')
    let deckId;

    const cardsContainer = document.getElementById("cards")



 function callback(){
     fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(response => response.json())
        .then(deck => {
            console.log(deck)
            
            deckId = deck.deck_id;

                     
        })
        
    }
    
    newDeckBtn.addEventListener('click', callback)
    
    drawCardBtn.addEventListener('click', function(){
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
            .then(response => response.json())
            .then(data => {console.log(data)
            
                cardsContainer.children[0].innerHTML = `
                    <img src=${data.cards[0].image} class="card" />` 
                cardsContainer.children[1].innerHTML = `
                    <img src=${data.cards[0].image} class="card" />` 
            })
    });

/**
 * Challenge 1:
 * 
 * Create a spot in the HTML for the cards to be placed in.
 * Typical playing cards have a 5:7 ratio (width-to-height).
 */

/**
 * Challenge 2:
 * 
 * Place each of the cards we draw into its respective card-slot
 * Hint: consider using element.children in the DOM instead of
 * giving each card-slot its own unique ID
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/children
 */