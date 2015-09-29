// todo rewrite to object-style

function Game () {
    this.field = null;
}

Game.prototype.start = function (w, h) {
    // some code here
};

var gFieldArr=[]; // game field
function createField(w,h){
    // todo init all elements in array
    gFieldArr=new Array(w);
    for (i=0;i<w;i++) {
        gFieldArr[i]=new Array(h);
    }

    // todo document.createElement
    // todo document.createFragment
  /*  var gameField="<table>";
    for (var j=0;j<h;j++) {
        gameField+="<tr>";
        for (var i=0;i<w;i++) {
            gameField+="<td>";
            // todo setAttribute
            // todo addEventListener
            gameField+="<img id='c"+i+"_"+j+"' src='img/c_null.gif' alt=' ' onclick='onCellClick("+i+","+j+")'>";
            gameField+="</td>";
        }
        gameField+="</tr>";
    }
    document.getElementById('gameField').innerHTML = gameField+"</table>"; */
}

function onCellClick(x,y) {
    //if (typeof gFieldArr[x][y] == 'string') {
    //if (!!gFieldArr[x][y]) {
    if (gFieldArr[x][y]==undefined) {
        // todo naming
        var win = isWin(); // check for victory
        // todo remove redundant if's
        if ( !win ) setCell(x,y, 'x');
            win = isWin();
        if ( !win ) {
            // todo naming
            compGame(); // start comp game
            // todo remove redundant calls
            win = isWin();
        } else {
            var mes = win + ' wins!';
            alert(mes);
        }
    }
}
function setCell(x,y,player) {
    if (gFieldArr[x][y] !== undefined) {
        return false;
    }

    gFieldArr[x][y]=player;
    var imgsrc='img/c_null.gif';
    if (player=='x') imgsrc='img/x.jpg';
    if (player=='o') imgsrc='img/o.jpg';
    var picName="c"+x+"_"+y; // create picture name
    // todo use CSS + classes
    document.getElementById(picName).src = imgsrc;

    return true;
}
// test
// test
// test
// test

function isWin() {
    // check areas 3 x 3
    for ( curX=0 ; curX<=gFieldArr.length-3 ; curX++) {
        for (curY = 0; curY <= gFieldArr[0].length - 3; curY++) {  // If the size of the field more than 3.

            // ------------------check the diagonals---------------------------
            var whoWin = gFieldArr[curX][curY];
            if (whoWin != null) {
                for (i = 0; i < 3; i++) {
                    if (gFieldArr[i + curX][i + curY] != whoWin) {
                        whoWin = null;
                    }
                }
            }
            // todo refactor & reformat
            if (whoWin != null) return whoWin; // if somebody win
            whoWin = gFieldArr[2 + curX][curY];
            if (whoWin != null) for (i = 0; i < 3; i++) if (gFieldArr[2 - i + curX][i + curY] != whoWin) whoWin = null;
            if (whoWin != null) return whoWin;

            // ------------------ check verticals -----------------------------
            // todo move all checks to one cycle
            for (i = 0; i < 3; i++) {
                whoWin = gFieldArr[curX + i][curY];
                if (whoWin != null) for (j = 0; j < 3; j++) if (gFieldArr[i + curX][j + curY] != whoWin) whoWin = null;
                if (whoWin != null) return whoWin;
            }

            // -------------------check horizontals ----------------------------
            for (j = 0; j < 3; j++) {
                whoWin = gFieldArr[curX][curY + j];
                if (whoWin != null) for (i = 0; i < 3; i++) if (gFieldArr[i + curX][j + curY] != whoWin) whoWin = null;
                if (whoWin != null) return whoWin;
            }
        }
    }
    return false; // If no one wins
}

//test
function compGame() {
    // todo remove globals
    z = 0;
    while (z == 0) {
            x = rand(0, 2);
            y = rand(0, 2);
        // todo check type of variable
            if (gFieldArr[x][y] == undefined) {
                 setCell(x, y, 'o');
                 z++;

                var win = isWin();
                if ( !win ) {
                    win = isWin();
                } else {
                    var mes = win + ' wins!';
                    alert(mes);
                }
            }
    }
}
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

createField(3,3);


