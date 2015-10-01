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
        document.getElementById(picName).classList.add("tic");
    }
    if (player == 'o') {
        document.getElementById(picName).classList.add("toe");
    }
    return true;
}

function isWin() {
    // todo refactor & reformat -------------------ready--------------
    // todo move all checks to one cycle ----------ready--------------
    /* check areas 3 x 3 */
    var curX = 0,
        curY = 0,
        whoWin = 0,
        diagonal = '',
        reverseDiagonal = '',
        vertical = '',
        vertical1 = '',
        vertical2 = '',
        vertical3 = '',
        horizontal = '',
        horizontal1 = '',
        horizontal2 = '',
        horizontal3 = '';

    for (curX = 0 ; curX<=gFieldArr.length-3 ; curX++) {
        for (curY = 0; curY <= gFieldArr[0].length - 3; curY++) {// If the size of the field more than 3.
                for (var i = 0; i < 3; i++) {
                   diagonal += gFieldArr[i + curX][i + curY] ;
                   reverseDiagonal += gFieldArr[2 - i + curX][i + curY] ;

                    if (i == 2) {
                        if ((diagonal == 'xxx')||(reverseDiagonal == 'xxx')){
                            whoWin = 'x';
                            return whoWin;
                        }
                        if ((diagonal == 'ooo')||(reverseDiagonal == 'ooo')){
                            whoWin = 'o';
                            return whoWin;
                        }
                    }
                    for (var j=0; j<3; j++) {
                        vertical += gFieldArr[j + curX][i + curY];
                        horizontal += gFieldArr[i + curX][j + curY];

                        if ((i == 2)&&(j == 2)) {
                            vertical1 = vertical.substr(0,3);
                            vertical2 = vertical.substr(3,3);
                            vertical3 = vertical.substr(6,3);
                            horizontal1 = horizontal.substr(0,3);
                            horizontal2 = horizontal.substr(3,3);
                            horizontal3 = horizontal.substr(6,3);

                            if ((vertical1 == 'xxx')||(vertical2 == 'xxx')||(vertical3 == 'xxx')||
                                (horizontal1 == 'xxx')||(horizontal2 == 'xxx')||(horizontal3 == 'xxx')) {
                                whoWin = 'x';
                                return whoWin;
                            }
                            if ((vertical1 == 'ooo')||(vertical2 == 'ooo')||(vertical3 == 'ooo')||
                                (horizontal1 == 'ooo')||(horizontal2 == 'ooo')||(horizontal3 == 'ooo')) {
                                whoWin = 'o';
                                return whoWin;
                            }

                        }

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


