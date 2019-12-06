/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dice, dice2, winningScore;
var diceDOM = document.querySelector('.dice');
var diceDOM2 = document.querySelector('.dice2');
reset();



document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // random number
        var dice = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);
        // display result
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        // update the round score if rolled number not 1
        if (dice !== 1 && dice2 !== 1) {
            // add score to scoreround
            if ((dice === 6 || dice2 === 6) && (prevDice === 6 || prevDice2 === 6)) {
                scores[activePlayer] = 0;
                document.querySelector("#score-" + activePlayer).textContent = 0;
                nextPlayer();
            }
            prevDice = dice;
            prevDice2 = dice2;
            roundScore += dice + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;
        // update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            // hide dice
            diceDOM.style.display = 'none';
            diceDOM2.style.display = 'none';
            // display winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', reset);

function nextPlayer() {
    roundScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    //diceDOM.style.display = 'none';
    //diceDOM2.style.display = 'none';
    prevDice = null;
    prevDice2 = null;
}

function reset() {
    // reset state
    gamePlaying = true;
    diceDOM.style.display = 'none';
    diceDOM2.style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    scores = [0, 0];
    roundScore = 0;
    // random first player
    activePlayer = Math.floor(Math.random() * 2);
    activePlayer === 0 ? document.querySelector('.player-0-panel').classList.add('active') : document.querySelector('.player-1-panel').classList.add('active');
    // remove winner names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    prevDice = null;
    prevDice2 = null;
    // set winning score based on input value
    var domWinScore = document.querySelector('.winning-score').value;
    if (!isNaN(domWinScore) && !(domWinScore === '')) {
        winningScore = parseInt(domWinScore);
        console.log(winningScore);
    } else {
        winningScore = 100;
        console.log(winningScore);
    }
}