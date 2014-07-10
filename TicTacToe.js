/* 
!TODO allow for first player choice?
!TODO allow for board freeze or timeout before new game
*/

function TicTacToe($scope) {
    // initialize new game
    ($scope.init = function() {
        $scope.board = new Board();
        $scope.players = [
            {
                icon: 'X',
                score: 0
            },
            {
                icon: 'O',
                score: 0
            }
        ];
        $scope.turn = "X goes first";
    })();

    var x_win = 0,
        o_win = 0;

    function Board() {
        var self = this;

        var player = 0,
            moves = 0;

        // use base2 values for binary matching
        // example: 111000000 = 3 accross top row
        // replace each with 'X' or 'O' when selected
        this.rows = [
            [256, 128, 64],
            [32, 16, 8],
            [4, 2, 1]
        ];
        
        // if free box, add value to player total
        // check score for win or draw
        this.select = function(r,c) {
            if (typeof (this.rows[r][c]) == 'string') {
                alert("Choose a different box!");
            }
            else {
                $scope.players[player].score += this.rows[r][c];
                
                if (this.checkScore(player)) {
                    alert($scope.players[player].icon + " wins! Resetting the board...");
                    player == 0 ? x_win++ : o_win++;
                    $scope.record = "X wins: " + x_win + " -- O wins: " + o_win;
                    $scope.init();
                }
                else {
                    this.rows[r][c] = $scope.players[player].icon;
                    player = 1 - player;
                    moves += 1;

                    if (moves == 9) {
                        alert("Tie game, resetting the board...");
                        $scope.init();
                    }
                    else {
                        $scope.turn = $scope.players[player].icon + "'s turn";
                    }
                }
            }
        }

        this.checkScore = function(player) {
            var win = [448, 56, 7, 292, 146, 73, 273, 84]; // binary-decimal values

            for (var i in win) {
                if (($scope.players[player].score & win[i]) === win[i]) {
                    return true;
                }
            }
            return false;
        }
    }

}

function Second($scope) {
    $scope.temp = "placeholder for a second game"
}