const cards = document.querySelectorAll('.memory-card');

let hasFilppedCard = false;
let lockBoard = false;
let firstCard, secondcard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFilppedCard) {
        // first click
        hasFilppedCard = true;
        firstCard = this;

        return;
    }
    // second click
    hasFilppedCard = false;
    secondcard = this;

    // do cards match
    checkForMatch();

}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondcard.dataset.framework
    
    // shorter method of writting if statement
    isMatch ? disableCards() : unflipCards();
    
    // if (firstCard.dataset.framework === secondcard.dataset.framework) {
    //     // it's a match
    //     disableCards();
    // } else {
    //     // not a match
    //     unflipCards();
    // }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard); 
    secondcard.removeEventListener('click', flipCard);
    
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');            
        secondcard.classList.remove('flip')

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFilppedCard, lockBoard] = [false, false];
    [firstCard, secondcard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));