// todo rewrite to object-style

function Game () { // function-constructor
    this.gFieldArr = null;
    this.width = 0;
    this.height = 0;
}

Game.prototype.start = function (w, h) {
    // some code here
    this.width = w;
    this.height = h;
    //gFieldArr=new Array(this.width);
    var gFieldArr = [];
    for (var a=0; a<this.width; a++) {
        //gFieldArr[a]=new Array(this.height);
        var t = [];
        for (var b=0; b<this.height; b++){
            t.push(0);
        }
        gFieldArr.push(t);
    }
    console.log(gFieldArr, 'from start ');
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
                // var 2
                //   var x = i,
                //      y = j;

            } );
        }
    }

    gameField.appendChild(table);
};

Game.prototype.onCellClick = function (x, y) {
    console.log('Do it!!!');
    var winner;
    if (typeof this.gFieldArr[x][y] == 'number') {
        setCell(x, y, 'x');
        winner = isWin();
    }
    if ( !winner ) {
        compMove(); // start comp game
    } else {
        var mes = winner + ' wins!';
        alert(mes);
    }
};
var game = new Game();
game.start(3,3);



