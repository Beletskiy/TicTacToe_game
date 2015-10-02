// todo rewrite to object-style --------ready------------

function Game () { // function-constructor
    this.gFieldArr = null;
    this.width = 0;
    this.height = 0;
}

Game.prototype.start = function (w, h) {
    this.width = w;
    this.height = h;
    this.gFieldArr = [];
    for (var a=0; a<this.width; a++) {
        var t = [];
        for (var b=0; b<this.height; b++){
            t.push(0);
        }
        this.gFieldArr.push(t);
    }
    var table = document.createElement('table'),
        tr, td, img,
        self = this;

    for (var i=0; i<this.width; i++) {
        tr = document.createElement('tr');
        table.appendChild(tr);
        for (var j=0; j<this.height; j++) {
            td = document.createElement('td');
            tr.appendChild(td);

            img = document.createElement('img');
            td.appendChild(img);
            img.setAttribute('id', 'c_'+i+'_'+j);
            img.setAttribute('src', 'img/blank.png');
            img.setAttribute('alt', ' ');
            img.addEventListener("click", function(e){
                // var 1
                var el = e.currentTarget,
                    id = el.getAttribute('id'),
                    parts = id.split('_'),
                    x = parts[1],
                    y = parts[2];
                self.onCellClick(x, y);
            } );
        }
    }
    gameField.appendChild(table);
};

Game.prototype.onCellClick = function (x, y) {
    var winner,
        self = this;
    if (typeof this.gFieldArr[x][y] == 'number') {
        self.setCell(x, y, 'x');
        winner = self.isWin();
    }
    if ( !winner ) {
        self.compMove(); // start comp game
    } else {
        var mes = winner + ' wins!';
        alert(mes);
    }
};

Game.prototype.setCell = function (x,y,player) {
    this.gFieldArr[x][y]=player;
    var picName="c_"+x+"_"+y; // create picture name
    if (player == 'x') {
        document.getElementById(picName).classList.add("tic");
    }
    if (player == 'o') {
        document.getElementById(picName).classList.add("toe");
    }
    return true;
};

Game.prototype.isWin = function () {
    var curX = 0,
        curY = 0,
        verticalsStr ='',
        horizontalsStr ='',
        diagonalsStr = '',
        diagonals = [],
        verticals = [],
        self = this,
        horizontals = [];

    for (var c = 0; c < this.width; c++){
        diagonals[c] = [];
        verticals[c] = [];
        horizontals[c] = [];
        for (var d = 0; d < this.height; d++){
            diagonals[c][d] = 0;
            verticals[c][d] = 0;
            horizontals[c][d] = 0;
        }
    }
 /*   for (var c=0; c<this.width; c++) {
        var tt = [];
        for (var d=0; d<this.height; d++){
            tt.push(0);
        }
        diagonals.push(tt);
        verticals.push(tt);
        horizontals.push(tt);
    } */

    for (curX = 0 ; curX<=this.gFieldArr.length-3 ; curX++) {
        for (curY = 0; curY <= this.gFieldArr[0].length - 3; curY++) {// --- If the size of the field more than 3.
            for (var i = 0; i < 3; i++) {
                diagonals[0][i] = this.gFieldArr[i + curX][i + curY] ;
                diagonals[1][i] = this.gFieldArr[2 - i + curX][i + curY] ;

                if (i == 2) {
                   for (var b = 0; b < 2; b++) {
                       diagonalsStr = diagonals[b].join('');
                       var whoWin = self.isBuiltFromOneSymbol(diagonalsStr);

                       if (!whoWin) {
                           continue;
                       }
                       return whoWin; //whoWin
                   }
                }
                for (var j=0; j<3; j++) {
                     verticals[i][j] = this.gFieldArr[j + curX][i + curY];
                     horizontals[i][j] = this.gFieldArr[i + curX][j + curY];

                    if ((i == 2)&&(j == 2)) {
                        for (var k = 0; k < 3; k++) {
                            verticalsStr = verticals[k].join('');
                            horizontalsStr = horizontals[k].join('');
                            var whoWin1 = self.isBuiltFromOneSymbol(verticalsStr);
                            var whoWin2 = self.isBuiltFromOneSymbol(horizontalsStr);
                            if ((!whoWin1)&&(!whoWin2)) {
                                continue;
                            }
                            if (whoWin1) {
                                return whoWin1; //whoWin
                            } else {
                                return whoWin2; //whoWin
                            }
                        }
                    }
                }
            }
        }
    }
    return false; // If no one wins
};
Game.prototype.compMove = function () {
    var z = 0,
        x = 0,
        y = 0,
        self = this,
        winner;
    while (z == 0) {
        x = self.getRand(0, this.width - 1);
        y = self.getRand(0, this.height -1);
        if (typeof this.gFieldArr[x][y] == 'number') {
            self.setCell(x, y, 'o');
            z++;
            winner = self.isWin();
            if (winner) {
                var mes = winner + ' wins!';
                alert(mes);
            }
        }
    }
};
Game.prototype.getRand = function (min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
Game.prototype.isBuiltFromOneSymbol = function (str) {
    var letter,
        firstLetter = str[0],
        result = true;
    if (firstLetter != '0') {
        for (var i = 0; i < str.length; i++) {
            letter = str[i];
            if (letter != firstLetter) {
                result = false;
            }
        }
        if (result) {
            return firstLetter;
        } else {
            return null;
        }
    }
};

var game = new Game();
game.start(3,3);

/*function Game () {
    this.drawer = new HTMLDrawer();
    //this.drawer = new CanvasDrawer();
    // this.drawer.drawField (this.field)
}

function HTMLDrawer () {

}

function CanvasDrawer () {

} */