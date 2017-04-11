(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.randomart = factory();
  }
}(this, function() {
  var defaultSymbols = {
      "-2": "E", // end
      "-1": "S", // start
      "0": " ",
      "1": ".",
      "2": "o",
      "3": "+",
      "4": "=",
      "5": "*",
      "6": "B",
      "7": "O",
      "8": "X",
      "9": "@",
      "10": "%",
      "11": "&",
      "12": "#",
      "13": "/",
      "14": "^"
    };

    var special = {
      end: -2,
      start: -1,
      empty: 0
    }

    var defaultBounds = {
      width: 17,
      height: 9
    };

    function createBoard(bounds, value) {
      var result = [];

      for (var i=0; i<bounds.width; i++) {
        result[i] = [];
        for (var j=0; j<bounds.height; j++) {
          result[i][j] = value;
        }
      }

      return result;
    }

    function generateBoard(data, options) {
      var options = options || {};
      var bounds = options.bounds || defaultBounds;

      var board = createBoard(bounds, special.empty);

      var x = Math.floor(bounds.width / 2);
      var y = Math.floor(bounds.height / 2);

      board[x][y] = special.start;

    data.forEach(function(b) {
      for (var s=0; s<8; s+=2) {
        var d = (b >> s) & 3;

        switch (d) {
          case 0: // up
          case 1:
            if (y > 0) y--;
            break;
          case 2: // down
          case 3:
            if (y < (bounds.height - 1)) y++;
            break;
        }
        switch (d) {
          case 0: // left
          case 2:
            if (x > 0) x--;
            break;
          case 1: // right
          case 3:
            if (x < (bounds.width - 1)) x++;
            break;
        }

        if (board[x][y] >= special.empty) board[x][y]++;
      }
    });

    board[x][y] = special.end;

    return {
      board: board,
      bounds: bounds
    };
  }

  function boardToString(board, options) {
    var options = options || {};
    var symbols = options.symbols || defaultSymbols;

    var width = board.bounds.width;
    var height = board.bounds.height;

    result = [];

    for (var i=0; i<height; i++) {
      result[i] = [];
      for (var j=0; j<width; j++) {
        result[i][j] = symbols[board.board[j][i]] || symbols[special.empty];
      }
      result[i] = result[i].join('');
    }

    return result.join('\n');
  }

  function randomart(data, options) {
    if (!data) throw Error('missing data parameter');
    var options = options || {};

    return boardToString(generateBoard(data, options), options);
  }

  return randomart;
}));
