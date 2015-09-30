// todo rewrite to object-style

function Game () {
    this.field = null;
}

Game.prototype.start = function (w, h) {
    // some code here
};

var gFieldArr=[]; // game field

function createField(w,h){
    // todo init all elements in array --------------ready-----------------
    gFieldArr=new Array(w);
    for (var a=0;a<w;a++) {
        gFieldArr[a]=new Array(h);
        for (var b=0; b<h; b++){
            gFieldArr[a][b] = 0;
        }
    }


    // todo document.createElement ------------------ready-------
    // todo document.createFragment
    // todo setAttribute --------------------ready---------------
    // todo addEventListener-----------------ready---------------

    var table = document.createElement('table'),
        tr, td, img;
    gameField.appendChild(table);

    for (var i=0; i<w; i++) {
        tr = document.createElement('tr');
        table.appendChild(tr);
        for (var j=0; j<h; j++) {
            td = document.createElement('td');
            tr.appendChild(td);

            img = document.createElement('img');
            td.appendChild(img);
            img.setAttribute('id', 'c_'+i+'_'+j);
            img.setAttribute('src', 'img/blank.png');
            //img.classList.add('blank');
            img.setAttribute('alt', ' ');
            img.addEventListener("click", function(e){
                // var 1
                var el = e.currentTarget,
                    id = el.getAttribute('id'),
                    parts = id.split('_'),
                    x = parts[1],
                    y = parts[2];

                // var 2
             //   var x = i,
              //      y = j;
                onCellClick(x, y);
            } );
        }
    }

}

function onCellClick(x,y) {
    //if (typeof gFieldArr[x][y] == 'string') {
    //if (!!gFieldArr[x][y]) {
        // todo naming --------------------------ready---------------
        // todo remove redundant if's --------------ready------------
        // todo naming ----------------------------ready-------------
        // todo remove redundant calls ------------ready-------------
    var winner;
    if (typeof gFieldArr[x][y] == 'number') {
        setCell(x, y, 'x');
        winner = isWin();
    }
    if ( !winner ) {
        compMove(); // start comp game
    } else {
        var mes = winner + ' wins!';
        alert(mes);
    }
}
function setCell(x,y,player) {
    // todo use CSS + classes --------------------ready--------------
    gFieldArr[x][y]=player;
    var picName="c_"+x+"_"+y; // create picture name
    if (player == 'x') {
        document.getElementById(picName).classList.remove("blank");
        document.getElementById(picName).classList.add("tic");
    }
    if (player == 'o') {
        document.getElementById(picName).classList.remove("blank");
        document.getElementById(picName).classList.add("toe");
    }
    return true;
}

function isWin() {
    // todo refactor & reformat
    // todo move all checks to one cycle
    // check areas 3 x 3
    var curX = 0,
        curY = 0,
        whoWin;
    for (curX = 0 ; curX<=gFieldArr.length-3 ; curX++) {
        for (curY = 0; curY <= gFieldArr[0].length - 3; curY++) {// If the size of the field more than 3.
            /* whoWin = gFieldArr[curX][curY];
            if (whoWin != null) {
                for (var i = 0; i < 3; i++) {
                    if ((gFieldArr[i + curX][i + curY] != whoWin)&&(gFieldArr[2 - i + curX][2-i + curY] != whoWin)){
                        whoWin = null;
                    }
                    if (whoWin != null) {
                        return whoWin
                    }

                    for (var j=0; j<3; j++) {
                        if ((gFieldArr[i+curX][j+curx] != whoWin)&&(gFieldArr[j+curX][i+curY] != whoWin)) {
                            whoWin = null;
                        }
                        if (whoWin!=0) {
                            return whoWin;
                        }
                    }
                }
            } */

            // ------------------check the diagonals---------------------------
            whoWin = gFieldArr[curX][curY];
            if (whoWin != null) {
                for (i = 0; i < 3; i++) {
                    if (gFieldArr[i + curX][i + curY] != whoWin) {
                        whoWin = null;
                    }
                }
            }
            if (whoWin != null) {
                return whoWin;
            } // if somebody win
            whoWin = gFieldArr[2 + curX][curY];
            if (whoWin != null) {
                for (i = 0; i < 3; i++) {
                    if (gFieldArr[2 - i + curX][i + curY] != whoWin) {
                        whoWin = null;
                    }
                }
            }
            if (whoWin != null) {
                return whoWin;
            }
            // ------------------ check verticals -----------------------------

            for (i = 0; i < 3; i++) {
                whoWin = gFieldArr[curX + i][curY];
                if (whoWin != null) {
                    for (j = 0; j < 3; j++) {
                        if (gFieldArr[i + curX][j + curY] != whoWin) {
                            whoWin = null;
                        }
                    }
                }
                if (whoWin != null) {
                    return whoWin;
                }
            }

            // -------------------check horizontals ----------------------------
            for (j = 0; j < 3; j++) {
                whoWin = gFieldArr[curX][curY + j];
                if (whoWin != null) {
                    for (i = 0; i < 3; i++) {
                        if (gFieldArr[i + curX][j + curY] != whoWin) {
                            whoWin = null;
                        }
                    }
                }
                if (whoWin != null) {
                    return whoWin;
                }
            }
        }
    }
    return false; // If no one wins
}

function compMove() {
    // todo remove globals ----------------------ready------------------
    var z = 0,
        x = 0,
        y = 0,
        winner;
    while (z == 0) {
             x = rand(0, 2);
             y = rand(0, 2);
        // todo check type of variable ----------ready-------------------
            if (typeof gFieldArr[x][y] == 'number') {
                 setCell(x, y, 'o');
                 z++;
                 winner = isWin();
                if (winner) {
                    var mes = winner + ' wins!';
                    alert(mes);
                }
            }
    }
}
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

createField(3,3);


