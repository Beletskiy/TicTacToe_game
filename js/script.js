/**
 * Created by alexey on 28.09.15.
 */
var gFieldArr=[]; // game field
function createField(w,h){
         gFieldArr=new Array(w);
         for (i=0;i<w;i++) {
             gFieldArr[i]=new Array(h);
         }

         var gameField="<table>";
         for (j=0;j<h;j++) {
              gameField+="<tr>";
              for (i=0;i<w;i++) {
                  gameField+="<td>";
                  gameField+="<img id='c"+i+"_"+j+"' src='img/c_null.gif' alt=' ' onclick='onCellClick("+i+","+j+")'>";
                  gameField+="</td>";
              }
                           gameField+="</tr>";
                          }
    document.getElementById('gameField').innerHTML = gameField+"</table>";
}

function onCellClick(x,y) {
        if (gFieldArr[x][y]==undefined) {
              var win = isWin(); // check for victory
              if ( !win ) setCell(x,y, 'x');
              win = isWin();
              if ( !win ) {
                           compGame(); // start comp game
                            win = isWin();
              }

               else {
                       var mes = win + ' wins!';
                       alert(mes);
                }
    }
}
function setCell(x,y,player) {
    gFieldArr[x][y]=player;
    var imgsrc='img/c_null.gif';
    if (player=='x') imgsrc='img/x.jpg';
    if (player=='o') imgsrc='img/o.jpg';
    var picName="c"+x+"_"+y; // create picture name
    document.getElementById(picName).src = imgsrc;
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
            if (whoWin != null) for (i = 0; i < 3; i++) if (gFieldArr[i + curX][i + curY] != whoWin) whoWin = null;
            if (whoWin != null) return whoWin; // if somebody win
            whoWin = gFieldArr[2 + curX][curY];
            if (whoWin != null) for (i = 0; i < 3; i++) if (gFieldArr[2 - i + curX][i + curY] != whoWin) whoWin = null;
            if (whoWin != null) return whoWin;

            // ------------------ check verticals -----------------------------
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
    z = 0;
    while (z == 0) {
            x = rand(0, 2);
            y = rand(0, 2);
            if (gFieldArr[x][y] == undefined) {
                 setCell(x, y, 'o');
                 z++;

                var win = isWin();
                if ( !win ) {
                    win = isWin();
                }
                else {
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
