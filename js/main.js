$(function() {
  /*----- app's state (variables) -----*/
  var state;
  var player;
  var winner;

  /*----- event listeners -----*/
  $('table').on('click', 'td', handleClick)

  $('.reset').on('click', function() {
    $('.message').html('Welcome, Player X plays first')
    init();
  })

  /*----- functions -----*/
  function init() {
    state = new Array(9);
    state.fill(null);
    player = 'X';
    winner = null;

    render();
  }

  function render() {
    state.forEach(function(elem, idx) {
      var $currentSquare = $(`#${idx}`);
      
      $currentSquare.html(elem);
      
    });
  }

  function handleClick() {
    var squareNum = parseInt($(this).attr('id'));

    if (getWinner()) {
      return;
    }

    if (!state[squareNum]) {
    state[squareNum] = player;
    (player === 'X')? player = 'O': player = 'X';
    }
    $('.message').html(`Player ${player}'s turn!`)

    getWinner() && $('.message').html(`Player ${winner} Wins! Congrats!`);

    render();
  }

  function getWinner () {
    var winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (var i = 0; i < winningCombos.length; i++) {
      var line = winningCombos[i];
      [first, second, third] = line;
      if (state[first] && (state[first] === state[second]) && (state[first] === state[third])) {
        return winner = state[first];
      }
    }

    return null;
  }

  init ();
});