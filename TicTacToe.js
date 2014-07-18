/* 
!TODO allow for first player choice?
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
        $scope.restart = false;
        $scope.gameover = false;
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
            if (!$scope.gameover && typeof(this.rows[r][c]) == 'string') {
                $scope.turn = $scope.players[player].icon + ", you must choose an open box!";
            }
            else if (!$scope.gameover) {
                $scope.players[player].score += this.rows[r][c];
                this.rows[r][c] = $scope.players[player].icon;
                
                if (this.checkScore(player)) {
                    player === 0 ? x_win++ : o_win++;
                    $scope.record = "X wins: " + x_win + " -- O wins: " + o_win;
                    this.reset($scope.players[player].icon);
                }
                else {
                    player = 1 - player; // switch player
                    moves += 1;

                    if (moves == 9) {
                        this.reset(false);
                    }
                    else {
                        $scope.turn = $scope.players[player].icon + "'s turn";
                    }
                }
            }
        };

        this.reset = function(winner) {
            if (!winner) {
                $scope.winner = "Tie Game";
            }
            else {
                $scope.winner = winner + " wins!";
            }
            $scope.turn = "Game Over!";
            $scope.gameover = true;
            $scope.restart = true;
        };

        this.checkScore = function(player) {
            var win = [448, 56, 7, 292, 146, 73, 273, 84]; // binary-decimal values

            for (var i in win) {
                if (($scope.players[player].score & win[i]) === win[i]) {
                    return true;
                }
            }
            return false;
        };
    }

}

function Second($scope) {
    $scope.temp = "placeholder for a second game";
}