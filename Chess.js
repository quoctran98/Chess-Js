WIP Features Pawns changing into other pieces, en passant

Functions and variables for menu screen. Also includes all buttons that change colors when moused over.
{
var aiOption = false;

var inGame = false;

function mouseMove() {
	if (getMouseCoords(event)[0]  250 && getMouseCoords(event)[0]  727 
	&& getMouseCoords(event)[1]  407 && getMouseCoords(event)[1]  555 && inGame == false) {
		drawMenuPerson();
	} else if (getMouseCoords(event)[0]  250 && getMouseCoords(event)[0]  727 
	&& getMouseCoords(event)[1]  116 && getMouseCoords(event)[1]  262 && inGame == false) {
		drawMenuAI();
	} else if (getMouseCoords(event)[0]  710 && getMouseCoords(event)[0]  940 
	&& getMouseCoords(event)[1]  550 && getMouseCoords(event)[1]  645 && inGame == true) {
		drawMenuButtonOn();
	} else if (inGame == true) {
		drawMenuButtonOff();
	} else if (inGame == false) {
		drawMenuAIOff();
		drawMenuPersonOff();
	};
}

function drawMenuButtonOn () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var menuButtonOn = new Image();
	menuButtonOn.src = menuButtonOn.png;
	menuButtonOn.onload = function() {
	ctx.drawImage(menuButtonOn,710,550,230,91);
	};
};

function drawMenuButtonOff () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var menuButtonOff = new Image();
	menuButtonOff.src = menuElementsmenuButtonOff.png;
	menuButtonOff.onload = function() {
	ctx.drawImage(menuButtonOff,710,550,230,91);
	};
};

function drawMenuScreen () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var menu = new Image();
	menu.src = menuElementsmenu.png;
	menu.onload = function() {
	ctx.drawImage(menu,0,0,975,675);
	};
};

function drawMenuAI () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var menuPlayAI = new Image();
	menuPlayAI.src = menuElementsmenuPlayAI.png;
	menuPlayAI.onload = function() {
	ctx.drawImage(menuPlayAI,254,117,473,145);
	};
};

function drawMenuAIOff () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var menuPlayAIOff = new Image();
	menuPlayAIOff.src = menuElementsmenuPlayAIOff.png;
	menuPlayAIOff.onload = function() {
	ctx.drawImage(menuPlayAIOff,254,117,473,145);
	};
};

function drawMenuPersonOff () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var menuPlayPersonOff = new Image();
	menuPlayPersonOff.src = menuElementsmenuPlayPersonOff.png;
	menuPlayPersonOff.onload = function() {
	ctx.drawImage(menuPlayPersonOff,253,408,473,145);
	};
};

function drawMenuPerson () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var menuPlayPerson = new Image();
	menuPlayPerson.src = menuElementsmenuPlayPerson.png;
	menuPlayPerson.onload = function() {
	ctx.drawImage(menuPlayPerson,253,408,473,145);
	};
};

function drawChessplayer () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var chessplayer = new Image();
	var randomInt = (Math.floor(Math.random()  (10)) + 1);
	chessplayer.src = menuElementschessBackground9.png;
	chessplayer.onload = function() {
	ctx.drawImage(chessplayer,0,0,975,675);
	};
}

drawChessplayer();
drawMenuScreen();
drawMenuAIOff();
drawMenuPersonOff();

};

Functions and varibles for clicking on the screen.
{
Every time the canvas is pressed, the x and y coordinates of the mouse are logged in nextTurnOrigin the first time and nextTurnDestination.
At the beginning of the next turn, mouseStopVar should be reset to 0.

Offset for the canvas from the edge of the screen. I should change this.
var xOffset = 10;
var yOffset = 10;

var nextTurnOrigin = [0,0];
var nextTurnDestination = [0,0];

function getMouseCoords (event) {
	return [event.clientX - xOffset, event.clientY - yOffset];
};

function getMouseCoordsOrigin(event) {
	nextTurnOrigin[0] = event.clientX - xOffset;
	nextTurnOrigin[1] = event.clientY - yOffset;
};

function getMouseCoordsDestination(event) {
	nextTurnDestination[0] = event.clientX - xOffset;
	nextTurnDestination[1] = event.clientY - yOffset;
};

var mouseStopVar = 0; 

This function calls gameLoop after two clicks are registered and the coords have been recorded, then it resets mouseStopVar.
If the mouse is not clicked within the chessboard, menuClicks is called.
function mouseStop () {
	if (getMouseCoords(event)[0]  675 && inGame == true) {
		clearWarningBox();
	};
	if (mouseStopVar == 0 && getMouseCoords(event)[0]  675 && inGame == true) {
		getMouseCoordsOrigin(event);
		if (mouseToArray(nextTurnOrigin) == empty) {
			drawNoPiece();
		} else if (turnChoose() == true) {
			drawBlueOutline(nextTurnOrigin[0], nextTurnOrigin[1]);
			mouseStopVar = mouseStopVar + 1;
		} else {
			drawWrongPiece();
		};
	} else if (getMouseCoords(event)[0]  675 && inGame == true){
		getMouseCoordsDestination(event);
		gameLoop();
		mouseStopVar = 0;
	} else if (getMouseCoords(event)[0]  710 && getMouseCoords(event)[0]  940 
	&& getMouseCoords(event)[1]  550 && getMouseCoords(event)[1]  645 && inGame == true) {
		inGame = false;
		chessboardReset();
		drawMenuScreen();
	} else if (inGame == false) {
		if (getMouseCoords(event)[0]  253 && getMouseCoords(event)[0]  727 
		&& getMouseCoords(event)[1]  116 && getMouseCoords(event)[1]  262 && inGame == false) {
			aiOption = true;
			inGame = true;
			drawChessboardOutline();
			drawChessboard();
			whiteTurn();
		} else if (getMouseCoords(event)[0]  250 && getMouseCoords(event)[0]  727 
		&& getMouseCoords(event)[1]  407 && getMouseCoords(event)[1]  555 && inGame == false) {
			aiOption = false;
			inGame = true;
			drawChessboardOutline();
			drawChessboard();
			whiteTurn();
		};
	};
};

}; 

Chessboard Outline Drawing Functions
{

function whiteTurn () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var whiteTurn = new Image();
	whiteTurn.src = guiElementswhiteTurn.png;
	whiteTurn.onload = function() {
	ctx.drawImage(whiteTurn,680,65,300,100);
	};
};

function blackTurn () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
	var blackTurn = new Image();
	blackTurn.src = guiElementsblackTurn.png;
	blackTurn.onload = function() {
	ctx.drawImage(blackTurn,680,65,300,100);
	};
};

function drawChessboardOutline () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
    var background = new Image();
    background.src = guiElementsbackground.png;
    background.onload = function() {
     ctx.drawImage(background,0,0,975,675);
    };
	
	if (aiOption) {
		whiteTurn();
	} else if (playerTurn == 1) {
		whiteTurn();
	} else if (playerTurn == -1) {
		blackTurn();
	};

drawMenuButtonOff();

};

function drawBlueOutline (x,y) { 
	var xNew = x;
	var yNew = y;
	
	while (xNew % 75 != 0) {
		xNew = xNew - 1;
	};
	
	while (yNew % 75 != 0) {
		yNew = yNew - 1;
	};

	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
    var blue_outline = new Image();
    blue_outline.src = guiElementsblue_outline.png;
    blue_outline.onload = function() {
     ctx.drawImage(blue_outline,xNew,yNew,75,75);
	};	
	
};

function drawInvalidMove () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
    var invalidMove = new Image();
    invalidMove.src = guiElementsinvalidMove.png;
    invalidMove.onload = function() {
     ctx.drawImage(invalidMove,675,270,300,100);
    };
};

function drawWrongPiece () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
    var wrongPiece = new Image();
    wrongPiece.src = guiElementswrongPiece.png;
    wrongPiece.onload = function() {
     ctx.drawImage(wrongPiece,675,270,300,100);
    };
};

function drawNoPiece () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
    var noPiece = new Image();
    noPiece.src = guiElementsnoPiece.png;
    noPiece.onload = function() {
     ctx.drawImage(noPiece,675,270,300,100);
    };
};

function clearWarningBox () {
	var c = document.getElementById(chessboard);
	var ctx = c.getContext(2d);
    var clearWarningBox = new Image();
    clearWarningBox.src = guiElementsclearWarningBox.png;
    clearWarningBox.onload = function() {
     ctx.drawImage(clearWarningBox,675,270,300,100);
    };
};

};
			
Chessboard Arrays and Chessboard Drawing  Piece Placing Function
{

NOTE THAT NAMING OF THE ARRAYS IS BACKWARDS FROM ACTUAL DISPLAY LABELS ON THE CANVAS 
(i.e. chessBoard1 is actually labeled 8, chessBoard5 is actually labeled 4, chessBoard8 is actually labeled 1, etc...)

var empty = ;

var ro = ro;
var kn = kn;
var bi = bi;
var qu = qu;
var ki = ki;
var pa = pa;

var RO = RO;
var KN = KN;
var BI = BI;
var QU = QU;
var KI = KI;
var PA = PA;

var chessBoard1 = [ro,kn,bi,qu,ki,bi,kn,ro];
var chessBoard2 = [pa,pa,pa,pa,pa,pa,pa,pa];
var chessBoard3 = [empty,empty,empty,empty,empty,empty,empty,empty];
var chessBoard4 = [empty,empty,empty,empty,empty,empty,empty,empty];
var chessBoard5 = [empty,empty,empty,empty,empty,empty,empty,empty];
var chessBoard6 = [empty,empty,empty,empty,empty,empty,empty,empty];
var chessBoard7 = [PA,PA,PA,PA,PA,PA,PA,PA];	
var chessBoard8 = [RO,KN,BI,QU,KI,BI,KN,RO];

This function places a piece on 'HTMLchessboard' 
Input Chess Piece Variable, X-Coord on Canvas, Y-Coord on Canvas
Output none (only draws the pieces using .png images (inlcuded in folder) on the html canvas, 'HTMLchessboard')
NOTE Only called through drawChessboard becuase only it has the appropriate x and y coordinates for the canvas.
function placePiece (piece, x, y) {
	switch(piece) {
		case RO
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var whiteRook = new Image();
			whiteRook.src = chessPieceswhiteRook.png;
			whiteRook.onload = function() {
				ctx.drawImage(whiteRook,x,y,75,75);
			};	
			break;
		case KN
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var whiteKnight = new Image();
			whiteKnight.src = chessPieceswhiteKnight.png;
			whiteKnight.onload = function() {
				ctx.drawImage(whiteKnight,x,y,75,75);
			};	
			break;
		case BI
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var whiteBishop = new Image();
			whiteBishop.src = chessPieceswhiteBishop.png;
			whiteBishop.onload = function() {
				ctx.drawImage(whiteBishop,x,y,75,75);
			};	
			break;
		case QU
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var whiteQueen = new Image();
			whiteQueen.src = chessPieceswhiteQueen.png;
			whiteQueen.onload = function() {
				ctx.drawImage(whiteQueen,x,y,75,75);
			};	
			break;
		case KI
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var whiteKing = new Image();
			whiteKing.src = chessPieceswhiteKing.png;
			whiteKing.onload = function() {
				ctx.drawImage(whiteKing,x,y,75,75);
			};	
			break;
		case PA
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var whitePawn = new Image();
			whitePawn.src = chessPieceswhitePawn.png;
			whitePawn.onload = function() {
				ctx.drawImage(whitePawn,x,y,75,75);
			};	
			break;
		case ro
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var blackRook = new Image();
			blackRook.src = chessPiecesblackRook.png;
			blackRook.onload = function() {
				ctx.drawImage(blackRook,x,y,75,75);
			};	
			break;
		case kn
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var blackKnight = new Image();
			blackKnight.src = chessPiecesblackKnight.png;
			blackKnight.onload = function() {
				ctx.drawImage(blackKnight,x,y,75,75);
			};	
			break;
		case bi
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var blackBishop = new Image();
			blackBishop.src = chessPiecesblackBishop.png;
			blackBishop.onload = function() {
				ctx.drawImage(blackBishop,x,y,75,75);
			};	
			break;
		case qu
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var blackQueen = new Image();
			blackQueen.src = chessPiecesblackQueen.png;
			blackQueen.onload = function() {
				ctx.drawImage(blackQueen,x,y,75,75);
			};	
			break;
		case ki
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var blackKing = new Image();
			blackKing.src = chessPiecesblackKing.png;
			blackKing.onload = function() {
				ctx.drawImage(blackKing,x,y,75,75);
			};	
			break;
		case pa
			var c = document.getElementById(chessboard);
			var ctx = c.getContext(2d);
			var blackPawn = new Image();
			blackPawn.src = chessPiecesblackPawn.png;
			blackPawn.onload = function() {
				ctx.drawImage(blackPawn,x,y,75,75);
			};
			break;
	};		
};	

This function places uses the Chessboard Arrays above to place a peice on 'HTMLchessboard'
This function should be run after every movePiece or every turn so changes are reflected on the canvas, 'HTMLchessboard'
Relies On placePiece
function drawChessboard () {
	var i = 0;
    while (i  8) {
		placePiece(chessBoard1[i],((75  i) + 75), 0);
        i++;
    };
	var i = 0;
    while (i  8) {
		placePiece(chessBoard2[i],((75  i) + 75), 75);
        i++;
    };	
	var i = 0;
    while (i  8) {
		placePiece(chessBoard3[i],((75  i) + 75), 150);
        i++;
    };
	var i = 0;
    while (i  8) {
		placePiece(chessBoard4[i],((75  i) + 75), 225);
        i++;
    };	
	var i = 0;
    while (i  8) {
		placePiece(chessBoard5[i],((75  i) + 75), 300);
        i++;
    };
	var i = 0;
    while (i  8) {
		placePiece(chessBoard6[i],((75  i) + 75), 375);
        i++;
    };	
	var i = 0;
    while (i  8) {
		placePiece(chessBoard7[i],((75  i) + 75), 450);
        i++;
    };
	var i = 0;
    while (i  8) {
		placePiece(chessBoard8[i],((75  i) + 75), 525);
        i++;
    };		
};
};

Mouse Coords -- Chessboard Array Coords -- Chess Piece Variable FUNCTIONS
{

This function returns the peice on the chessboard.
Input Mouse Coords in the Array [x,y] 
Output Chess Piece Variable
function mouseToArray (mouseCoords) {
	var x = mouseCoords[0];
	var y = mouseCoords[1];
	var column = 0;
	if ((x  75) && (x  150)) {
		column = 0;
	} else if ((x  150) && (x = 225)) {
		column = 1;
	} else if ((x  225) && (x = 300)) {
		column = 2; 
	} else if ((x  300) && (x = 375)) {
		column = 3;
	} else if ((x  375) && (x = 450)) {
		column = 4;
	} else if ((x  450) && (x = 525)) {
		column = 5;
	} else if ((x  525) && (x = 600)) {
		column = 6;
	} else if ((x  600) && (x = 675)) {
		column = 7;
	} else {
		column = 0;
	};
	
	if ((y  0) && (y  75)) {
		return chessBoard1[column]; 
	} else if ((y  75) && (y = 150)) {
		return chessBoard2[column]; 
	} else if ((y  150) && (y = 225)) {
		return chessBoard3[column]; 
	} else if ((y  225) && (y = 300)) {
		return chessBoard4[column]; 
	} else if ((y  300) && (y = 375)) {
		return chessBoard5[column]; 
	} else if ((y  375) && (y = 450)) {
		return chessBoard6[column]; 
	} else if ((y  450) && (y = 525)) {
		return chessBoard7[column]; 
	} else if ((y  525) && (y = 600)) {
		return chessBoard8[column]; 
	} else {
		return chessBoard1[column]; 
	};
	
};

This function returns the coords as an array [x,y] on the chessbord, but y-axis labeling is flipped from the labels on the drawn board. 
Input Mouse Coords in the Array [x,y]
Output Chessboard Array Coords
function mouseToCoords (mouseCoords) {
	var x = mouseCoords[0];
	var y = mouseCoords[1];	
	var coords = ['x','y'];
	var column = 0;
	var row = 0;
	if ((x  75) && (x  150)) {
		column = 1;
	} else if ((x  150) && (x = 225)) {
		column = 2;
	} else if ((x  225) && (x = 300)) {
		column = 3; 
	} else if ((x  300) && (x = 375)) {
		column = 4;
	} else if ((x  375) && (x = 450)) {
		column = 5;
	} else if ((x  450) && (x = 525)) {
		column = 6;
	} else if ((x  525) && (x = 600)) {
		column = 7;
	} else if ((x  600) && (x = 675)) {
		column = 8;
	} else {
		column = 1;
	};
	
	if ((y  0) && (y  75)) {
		row = (1); 
	} else if ((y  75) && (y = 150)) {
		row = (2); 
	} else if ((y  150) && (y = 225)) {
		row = (3); 
	} else if ((y  225) && (y = 300)) {
		row = (4); 
	} else if ((y  300) && (y = 375)) {
		row = (5); 
	} else if ((y  375) && (y = 450)) {
		row = (6); 
	} else if ((y  450) && (y = 525)) {
		row = (7); 
	} else if ((y  525) && (y = 600)) {
		row = (8); 
	} else {
		row = (1); 
	};
	coords = [column, row];
	return coords;
};

This function takes the coords as an array [x,y] and returns the peice.
Input Chessboard Array Coords
Output Chess Piece Variable
function coordsToArray (coords) {
	var column = (coords[0] - 1);
	var finalLocation = 0;
	switch(coords[1]) {
		case 1
			finalLocation = chessBoard1[column];
			break;
		case 2
			finalLocation = chessBoard2[column];
			break;
		case 3
			finalLocation = chessBoard3[column];
			break;
		case 4
			finalLocation = chessBoard4[column];
			break;
		case 5
			finalLocation = chessBoard5[column];
			break;
		case 6
			finalLocation = chessBoard6[column];
			break;
		case 7
			finalLocation = chessBoard7[column];
			break;
		case 8
			finalLocation = chessBoard8[column];
			break;
	};
	return finalLocation;
};

This function looks for where a certain piece is.
Input Chess Piece Variable
Output Chessboard Array Coords
function arrayToCoords (piece) {
	var i = 0;
	while (i  8) {
		if (piece == chessBoard1[i]) {
			i = 100;			
			return [1,i];
		} else if (piece == chessBoard2[i]) {
			i = 100;
			return [2,i];
		} else if (piece == chessBoard3[i]) {
			i = 100;
			return [3,i];
		} else if (piece == chessBoard4[i]) {
			i = 100;
			return [4,i];
		} else if (piece == chessBoard5[i]) {
			i = 100;
			return [5,i];
		} else if (piece == chessBoard6[i]) {
			i = 100;
			return [6,i];
		} else if (piece == chessBoard7[i]) {
			i = 100;
			return [7,i];
		} else if (piece == chessBoard8[i]) {
			i = 100;
			return [8,i];
		} else {
			i++;
		};		
	};
};

This function takes the coords as an array [x,y] and returns the upper left coordinate of the square for the canvas.
Input Chessboard Array Coords
Output Canvas Coords as an array [x,y]
function coordsToCanvas (coords) {
	var canvasCoords = ['x','y'];
	canvasCoords[0] = coords[0]  75;
	canvasCoords[1] = (coords[1]  75) - 75;
};
};

Piece Check Functions
These checks use algorithmns determine whether or not a chess move is valid.
These functions are called through the moveCheck function only.
{
function kingCheck (origin, destination){
	if ((Math.abs(origin[0] - destination[0]) = 1) && (Math.abs(origin[1] - destination[1]) = 1)) {
		return true;
	} else {
		return false;
	};
};

function queenCheck (origin, destination) {
	if ((origin[0] == destination[0])  (origin[1] == destination[1])) {
		return true;
	} else if (Math.abs(origin[0] - destination[0]) == Math.abs(origin[1] - destination[1])) {
		return true;
	} else {
		return false;
	};
};

function rookCheck (origin, destination) {
	if ((origin[0] == destination[0])  (origin[1] == destination[1])) {
		return true;
	} else {
		return false;
	};
};

function bishopCheck (origin, destination) {
	if (Math.abs(origin[0] - destination[0]) == Math.abs(origin[1] - destination[1])) {
		return true;
	} else {
		return false;
	};
};

function knightCheck (origin, destination) {
	if ((Math.abs(origin[0] - destination[0]) == 2) && (Math.abs(origin[1] - destination[1]) == 1)) {
		return true;
	} else if ((Math.abs(origin[1] - destination[1]) == 2) && (Math.abs(origin[0] - destination[0]) == 1)) {
		return true;
	} else {
		return false;
	};
};

function whitePawnCheck (origin, destination) {
	if ((Math.abs(destination[0] - origin[0]) == 1) && (coordsToArray(destination) != empty) && (origin[1] - destination[1] == 1)) {
		return true;
	} else if (coordsToArray(destination) != empty) {
		return false;
	} else if ((origin[0] == destination[0]) && (origin[1] - destination[1] == 1)){
		return true;	
	} else if ((origin[0] == destination[0]) && (origin[1] - destination[1] == 2) && (origin[1] == 7)) {
		return true;
	} else {
		return false;
	};
};

function blackPawnCheck (origin, destination) {
	if ((Math.abs(destination[0] - origin[0]) == 1) && (coordsToArray(destination) != empty) && (destination[1] - origin[1] == 1)) {
		return true; 
	} else if (coordsToArray(destination) != empty) {
		return false;
	} else if ((origin[0] == destination[0]) && (destination[1] - origin[1] == 1)){
		return true;
	} else if ((origin[0] == destination[0]) && (destination[1] - origin[1] == 2) && (origin[1] == 2)) {
		return true;
	} else {
		return false;
	};
};
};

Special Gamerules Functions
These are to be tested for before normal movement checks in gameLoop.
Includes whiteCastling, blackCastling
{

var whiteCastleYet = false; 
var blackCastleYet = false;

This function checks if white is trying to castle queenside or kingside and checks the validity as well as moves the pieces.
Input none (run through gameLoop())
Output Boolean and calls on movePiece
Relies On mouseToCoords, mouseToArray, nextTurnDestination, nextTurnOrigin,movePiece, and the chessBoard arrays
function whiteCastling() {
	var destinationCoords = mouseToCoords(nextTurnDestination);
	if (mouseToArray(nextTurnOrigin) == KI && destinationCoords[0] == 7 && whiteCastleYet == false
	&& destinationCoords[1] == 8 && chessBoard8[7] == RO && chessBoard8[6] == empty && chessBoard8[5] == empty) {
		movePiece(mouseToCoords(nextTurnOrigin),mouseToCoords(nextTurnDestination));
		movePiece(['8','8'],['6','8']);
		console.log (White has kingside castled.);
		return true;		
	} else if (mouseToArray(nextTurnOrigin) == KI && destinationCoords[0] == 2 && blackCastleYet == false
	&& destinationCoords[1] == 8 && chessBoard8[0] == RO && chessBoard8[1] == empty && chessBoard8[2] == empty && chessBoard8[3] == empty) {
		movePiece(mouseToCoords(nextTurnOrigin),mouseToCoords(nextTurnDestination));
		movePiece(['1','8'],['3','8']);
		console.log (White has queenside castled.);
		return true;		
	} else {
		return false;
	};
};

This function checks if black is trying to castle queenside or kingside and checks the validity as well as moves the pieces.
Input none (run through gameLoop())
Output Boolean and calls on movePiece
Relies On mouseToCoords, mouseToArray, nextTurnDestination, nextTurnOrigin,movePiece, and the chessBoard arrays
function blackCastling() {
	var destinationCoords = mouseToCoords(nextTurnDestination);
	if (mouseToArray(nextTurnOrigin) == ki && destinationCoords[0] == 7 
	&& destinationCoords[1] == 1 && chessBoard1[7] == ro && chessBoard1[6] == empty && chessBoard1[5] == empty) {
		movePiece(mouseToCoords(nextTurnOrigin),mouseToCoords(nextTurnDestination));
		movePiece(['8','1'],['6','1']);
		console.log (White has kingside castled.);
		return true;
	} else if (mouseToArray(nextTurnOrigin) == ki && destinationCoords[0] == 2
	&& destinationCoords[1] == 1 && chessBoard1[0] == ro && chessBoard1[1] == empty && chessBoard1[2] == empty && chessBoard1[3] == empty) {
		movePiece(mouseToCoords(nextTurnOrigin),mouseToCoords(nextTurnDestination));
		movePiece(['1','1'],['3','1']);
		console.log (White has queenside castled.);
		return true;
	} else {
		return false;
	};
};

};

Move Validity Check Functions
Includes moveCheck(), samePlace() turnChoose() eatPiece()
{
This function finds the correct piece check function and runs it. 
MASTER FUNCTION Calls on samePlace() turnChoose() eatPiece()
Input Chess Piece Variable
Output Boolean based on the Piece Check Functions 
Relies On mouseToCoords, nextTurnDestination, nextTurnOrigin
function moveCheck (piece) {
	var movementCheck = false;
	if ((piece == KI)  (piece == ki)) {
		movementCheck = kingCheck(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
	} else if ((piece == QU)  (piece == qu)) {
		movementCheck = queenCheck(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
	} else if ((piece == BI)  (piece == bi)) {
		movementCheck = bishopCheck(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
	} else if ((piece == KN)  (piece == kn)) {
		movementCheck = knightCheck(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
	} else if ((piece == RO)  (piece == ro)) {
		movementCheck = rookCheck(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
	} else if (piece == PA) {
		movementCheck = whitePawnCheck(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
	} else {
		movementCheck = blackPawnCheck(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
	};
	
	var collisionDetectionRookVar = true;
	var collisionDetectionBishopVar = true;
	var collisionDetectionQueenVar = true;
	var collisionDetectionWhitePawnVar = true;
	var collisionDetectionBlackPawnVar = true;	
	
	if (mouseToArray(nextTurnOrigin) == RO  mouseToArray(nextTurnOrigin) == ro) { collisionDetectionRookVar = collisionDetectionRook(); };
	if (mouseToArray(nextTurnOrigin) == BI  mouseToArray(nextTurnOrigin) == bi) { collisionDetectionBishopVar = collisionDetectionBishop(); };
	if (mouseToArray(nextTurnOrigin) == QU  mouseToArray(nextTurnOrigin) == qu) { collisionDetectionQueenVar = collisionDetectionQueen(); };
	if (mouseToArray(nextTurnOrigin) == PA) { collisionDetectionWhitePawnVar = collisionDetectionWhitePawn(); };
	if (mouseToArray(nextTurnOrigin) == pa) { collisionDetectionBlackPawnVar = collisionDetectionBlackPawn(); };	
	
	return movementCheck && samePlace() && eatPiece() && turnChoose() && collisionDetectionRookVar && collisionDetectionBishopVar 
	&& collisionDetectionQueenVar && collisionDetectionBlackPawnVar && collisionDetectionWhitePawnVar; 
	
};

This function tells gameLoop() whether or not peices are trying to move to the same place they started on.
Input none (uses nextTurnOrigin and nextTurnDestination)
Output Boolean
Relies On mouseToCoords, mouseToArray, nextTurnOrigin. nextTurnDestination
function samePlace() {
	var originCoords = mouseToCoords(nextTurnOrigin);
	var destinationCoords = mouseToCoords(nextTurnDestination);
	if ((originCoords[0] == destinationCoords[0]) && (originCoords[1] == destinationCoords[1])) {
		return false;	
	} else {
		return true;
	};
};

This function determines whether or not it is your turn.
Input none (uses nextTurnOrigin and nextTurnDestination)
Output Boolean
Relies On mouseToCoords, mouseToArray, nextTurnOrigin. nextTurnDestination
function turnChoose() {
	if ((playerTurn == 1) && (mouseToArray(nextTurnOrigin) == KI  mouseToArray(nextTurnOrigin) == QU 
	 mouseToArray(nextTurnOrigin) == BI  mouseToArray(nextTurnOrigin) == KN  mouseToArray(nextTurnOrigin) == RO  mouseToArray(nextTurnOrigin) == PA)) {
		return true;
	} else if ((playerTurn == -1) && (mouseToArray(nextTurnOrigin) == ki  mouseToArray(nextTurnOrigin) == qu
	 mouseToArray(nextTurnOrigin) == bi  mouseToArray(nextTurnOrigin) == kn  mouseToArray(nextTurnOrigin) == ro  mouseToArray(nextTurnOrigin) == pa)){
		return true;
	} else {
		return false;
	};
};

This function determines whether or not you can eat a particular piece.
Input none (uses nextTurnOrigin and nextTurnDestination)
Output Boolean
Relies On mouseToCoords, mouseToArray, nextTurnOrigin. nextTurnDestination
function eatPiece() {
	if ((playerTurn == -1) && (mouseToArray(nextTurnDestination) == KI  mouseToArray(nextTurnDestination) == QU 
	 mouseToArray(nextTurnDestination) == BI  mouseToArray(nextTurnDestination) == KN  mouseToArray(nextTurnDestination) == RO  mouseToArray(nextTurnDestination) == PA  mouseToArray(nextTurnDestination) == empty)) {
		return true;
	} else if ((playerTurn == 1) && (mouseToArray(nextTurnDestination) == ki  mouseToArray(nextTurnDestination) == qu 
	 mouseToArray(nextTurnDestination) == bi  mouseToArray(nextTurnDestination) == kn  mouseToArray(nextTurnDestination) == ro  mouseToArray(nextTurnDestination) == pa  mouseToArray(nextTurnDestination) == empty)){
		return true;
	} else {
		return false;
	};	
};

This function determines whether or not a rook is going through another piece.
Input none (uses nextTurnOrigin and nextTurnDestination)
Output Boolean
Relies On mouseToArray , mouseToCoords , coordsToArray , and MUCH MORE!
function collisionDetectionRook () {
	
	var originCoords = mouseToCoords(nextTurnOrigin);
	var destinationCoords = mouseToCoords(nextTurnDestination);
	
	if (destinationCoords[0] == originCoords[0]) { For Vertical Movement
		if (originCoords[1]  destinationCoords[1]) { Going Down
			var y = originCoords[1];
			while (y  (destinationCoords[1])) {
				y++;
				if (coordsToArray([originCoords[0],y.toString()]) != empty) {
					if (coordsToArray([originCoords[0],y.toString()]) != mouseToArray(nextTurnDestination)) {
						return false;
					};
				};
			};
		} else if (originCoords[1]  destinationCoords[1]) { Going Up
			var y = originCoords[1];
			while (y  (destinationCoords[1])) {
				y--;	
				if (coordsToArray([originCoords[0],y.toString()]) != empty) {
					if (coordsToArray([originCoords[0],y.toString()]) != mouseToArray(nextTurnDestination)) {
						return false;
					};
				};
			};
		};
		
	} else if (destinationCoords[1] == originCoords[1]) { For Horizontal Movement
		if (originCoords[0]  destinationCoords[0]) { Going Right
			var x = originCoords[0];
			while (x  (destinationCoords[0])) {
				x++;
				if (coordsToArray([x.toString(),originCoords[1]]) != empty) {
					if (coordsToArray([x.toString(),originCoords[1]]) != mouseToArray(nextTurnDestination)) {
						return false;
					};
				};
			};
		} else if (originCoords[0]  destinationCoords[0]) { Going Left
			var x = originCoords[0];
			while (x  (destinationCoords[0])) {
				x--;
				if (coordsToArray([x.toString(),originCoords[1]]) != empty) {
					if (coordsToArray([x.toString(),originCoords[1]]) != mouseToArray(nextTurnDestination)) {
						return false;
					};
				};
			};
		};
	};
	return true;
};

This function determines whether or not a bishop is going through another piece.
Input none (uses nextTurnOrigin and nextTurnDestination)
Output Boolean
Relies On mouseToArray , mouseToCoords , coordsToArray , and MUCH MORE!
function collisionDetectionBishop () {
	
	var originCoords = mouseToCoords(nextTurnOrigin);
	var destinationCoords = mouseToCoords(nextTurnDestination);
	
	if (destinationCoords[0]  originCoords[0]) { For Rightward Movement
		if (originCoords[1]  destinationCoords[1]) { Going Down - Diagonally
			var y = originCoords[1];
			var x = originCoords[0];
			while (y  destinationCoords[1] && x  destinationCoords[0]) {
				y++;
				x++;
				if (coordsToArray([x.toString(),y.toString()]) != empty) {
					if (coordsToArray([x.toString(),y.toString()]) != mouseToArray(nextTurnDestination)) {
						return false;
					};
				};
			};
		} else if (originCoords[1]  destinationCoords[1]) { Going Up - Diagonally
			var y = originCoords[1];
			var x = originCoords[0];
			while (y  destinationCoords[1] && x  destinationCoords[0]) {
				y--;
				x++;
				if (coordsToArray([x.toString(),y.toString()]) != empty) {
					if (coordsToArray([x.toString(),y.toString()]) != mouseToArray(nextTurnDestination)) {
						return false;
					};
				};
			};
		};
		
	} else if (destinationCoords[0]  originCoords[0]) { For Leftward Movement
		if (originCoords[1]  destinationCoords[1]) { Going Down - Diagonally
			var y = originCoords[1];
			var x = originCoords[0];
			while (y  destinationCoords[1] && x  destinationCoords[0]) {
				y++;
				x--;
				if (coordsToArray([x.toString(),y.toString()]) != empty) {
					if (coordsToArray([x.toString(),y.toString()]) != mouseToArray(nextTurnDestination)) {
						return false;
					};
				};
			};
		} else if (originCoords[1]  destinationCoords[1]) { Going Up - Diagonally
			var y = originCoords[1];
			var x = originCoords[0];
			while (y  destinationCoords[1] && x  destinationCoords[0]) {
				y--;
				x--;
				if (coordsToArray([x.toString(),y.toString()]) != empty) {
					if (coordsToArray([x.toString(),y.toString()]) != mouseToArray(nextTurnDestination)) {
						return false;
					};
				};
			};
		};
	};
	return true;
};


This function determines whether or not a queen is going through another piece.
Input none (uses nextTurnOrigin and nextTurnDestination)
Output Boolean
Relies On collisionDetectionBishop and collisionDetectionRook
function collisionDetectionQueen () {
	return collisionDetectionBishop() && collisionDetectionRook();
};

This function determines whether or not a black pawn is going through another piece for its first move.
Input none (uses nextTurnOrigin and nextTurnDestination)
Output Boolean
Relies On 
function collisionDetectionBlackPawn () {
	var originCoords = mouseToCoords(nextTurnOrigin);
	var destinationCoords = mouseToCoords(nextTurnDestination);

	if (originCoords[1] + 2 == destinationCoords[1]) {
		if (coordsToArray([originCoords[0].toString(), 3]) != empty) {
			return false;
		} else {
			return true;
		};	
	} else {
		return true;
	};
};

This function determines whether or not a white pawn is going through another piece for its first move.
Input none (uses nextTurnOrigin and nextTurnDestination)
Output Boolean
Relies On 
function collisionDetectionWhitePawn () {
	var originCoords = mouseToCoords(nextTurnOrigin);
	var destinationCoords = mouseToCoords(nextTurnDestination);

	if (originCoords[1] - 2 == destinationCoords[1]) {
		if (coordsToArray([originCoords[0].toString(), 6]) != empty) {
			return false;
		} else {
			return true;
		};	
	} else {
		return true;
	};
};

}

Moves peices as using array coords of origin and destination. 
Input Chessboard Array Coords
Output none (changes location of pieces in the chessboard arrays)
Relies On coordsToArray
function movePiece (origin, destination) {

	var originPiece = coordsToArray(origin);
	var destinationColumn
	var destinationColumn = destination[0] - 1;
	switch(destination[1]) { replaces the eaten piece with a blank square
		case 1
			chessBoard1[destinationColumn] = empty;
			break;
		case 2
			chessBoard2[destinationColumn] = empty;
			break;
		case 3
			chessBoard3[destinationColumn] = empty;
			break;
		case 4
			chessBoard4[destinationColumn] = empty;
			break;
		case 5
			chessBoard5[destinationColumn] = empty;
			break;
		case 6
			chessBoard6[destinationColumn] = empty;
			break;
		case 7
			chessBoard7[destinationColumn] = empty;
			break;
		case 8
			chessBoard8[destinationColumn] = empty;
			break;
	};
	
	drawChessboardOutline();
	drawChessboard();
	
	switch(destination[1]) { puts the chess piece in the destination 
		case 1
			chessBoard1[destinationColumn] = originPiece;
			break;
		case 2
			chessBoard2[destinationColumn] = originPiece;
			break;
		case 3
			chessBoard3[destinationColumn] = originPiece;
			break;
		case 4
			chessBoard4[destinationColumn] = originPiece;
			break;
		case 5
			chessBoard5[destinationColumn] = originPiece;
			break;
		case 6
			chessBoard6[destinationColumn] = originPiece;
			break;
		case 7
			chessBoard7[destinationColumn] = originPiece;
			break;
		case 8
			chessBoard8[destinationColumn] = originPiece;
			break;
	};
	var originColumn = origin[0] - 1;
	switch(origin[1]) { makes the origin blank
		case 1
			chessBoard1[originColumn] = empty;
			break;
		case 2
			chessBoard2[originColumn] = empty;
			break;
		case 3
			chessBoard3[originColumn] = empty;
			break;
		case 4
			chessBoard4[originColumn] = empty;
			break;
		case 5
			chessBoard5[originColumn] = empty;
			break;
		case 6
			chessBoard6[originColumn] = empty;
			break;
		case 7
			chessBoard7[originColumn] = empty;
			break;
		case 8
			chessBoard8[originColumn] = empty;
			break;
	};
		
};
 
Gives the value of a chess piece based on this httpchess.stackexchange.comquestions2409how-many-points-is-each-chess-piece-worth
Input Chessboard Piece Array Variable
Output Integer
function chessPieceValue (array) {
	if (array == KI  array == ki) {
		return 100;
	} else if (array == QU  array == qu) {
		return 9;
	} else if (array == RO  array == ro) {
		return 5;
	} else if (array == BI  array == bi) {
		return 3;
	} else if (array == KN  array == kn) {
		return 3;
	} else if (array == PA  array == pa) {
		return 2;
	} else {
		return 1;
	};
};

function distanceFormula (array1, array2) {
	return (-1  (Math.sqrt(((array2[0] - array1[0])  (array2[0] - array1[0])) + ((array2[1] - array1[1])  (array2[1] - array1[1])))));
};

Resets the chessboard to starting positions. Also resets turn count.
function chessboardReset () {
	playerTurn = 1;

	chessBoard1 = [ro,kn,bi,qu,ki,bi,kn,ro];
	chessBoard2 = [pa,pa,pa,pa,pa,pa,pa,pa];
	chessBoard3 = [empty,empty,empty,empty,empty,empty,empty,empty];
	chessBoard4 = [empty,empty,empty,empty,empty,empty,empty,empty];
	chessBoard5 = [empty,empty,empty,empty,empty,empty,empty,empty];
	chessBoard6 = [empty,empty,empty,empty,empty,empty,empty,empty];
	chessBoard7 = [PA,PA,PA,PA,PA,PA,PA,PA];	
	chessBoard8 = [RO,KN,BI,QU,KI,BI,KN,RO];
	
};

START CALLING FUNCTIONS AND DOING GAMEFLOW STUFF 
 
Gameflow Variables and Loops

var playerTurn = 1;

function getRandomIntInclusive(min, max) {
	return Math.floor(Math.random()  (max - min + 1)) + min;
};

Chess AI
It pulls random numbers and runs them through moveCheck and the best of the first five viable ones is selected as a movement.
function chessAI () {

	var chessAI = 0;
	var chessAICounter = 1;
	var chessAIDone = false;
	
	var nextTurnOriginTemp1 = ['x', 'y'];
	var nextTurnDestinationTemp1 = ['x', 'y'];
	var tempCoordsInfo1 = 0;
	var nextTurnOriginTemp2 = ['x', 'y'];
	var nextTurnDestinationTemp2 = ['x', 'y'];
	var tempCoordsInfo2 = 0;		
	var nextTurnOriginTemp3 = ['x', 'y'];
	var nextTurnDestinationTemp3 =['x', 'y'];
	var tempCoordsInfo3 = 0;		
	var nextTurnOriginTemp4 = ['x', 'y'];		
	var nextTurnDestinationTemp4 = ['x', 'y'];
	var tempCoordsInfo4 = 0;		
	var nextTurnOriginTemp5 = ['x', 'y'];		
	var nextTurnDestinationTemp5 = ['x', 'y'];
	var tempCoordsInfo5 = 0;
	
	while (playerTurn == -1 && chessAI == 0) {
		
		nextTurnOrigin = [getRandomIntInclusive(75, 675), getRandomIntInclusive(0, 600)];
		nextTurnDestination = [getRandomIntInclusive(75, 675), getRandomIntInclusive(0, 600)];
		
		if (moveCheck(mouseToArray(nextTurnOrigin)) == true && mouseToArray(nextTurnDestination) == KI) {
			movePiece(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
			drawChessboardOutline();
			drawChessboard();
			setTimeout(alert (Black has won. You've been beaten by an AI that plays by choosing random numbers. Way to go.), 1000);
			break;
		} else if (moveCheck(mouseToArray(nextTurnOrigin)) == true && chessAIDone == false) {
			if (tempCoordsInfo1 == 0) {
				nextTurnOriginTemp1	= nextTurnOrigin;
				nextTurnDestinationTemp1 = nextTurnDestination;
				if (mouseToArray(nextTurnDestination) == empty) {
					tempCoordsInfo1 = distanceFormula(mouseToCoords(nextTurnOrigin), arrayToCoords(KI));
				} else {
					tempCoordsInfo1 = chessPieceValue(mouseToArray(nextTurnDestination));		
				};
			} else if (tempCoordsInfo2 == 0) {
				nextTurnOriginTemp2	= nextTurnOrigin;
				nextTurnDestinationTemp2 = nextTurnDestination;
				if (mouseToArray(nextTurnDestination) == empty) {
					tempCoordsInfo2 = distanceFormula(mouseToCoords(nextTurnOrigin), arrayToCoords(KI));
				} else {
					tempCoordsInfo2 = chessPieceValue(mouseToArray(nextTurnDestination));		
				};		
			} else if (tempCoordsInfo3 == 0) {
				nextTurnOriginTemp3 = nextTurnOrigin;
				nextTurnDestinationTemp3 = nextTurnDestination;
				if (mouseToArray(nextTurnDestination) == empty) {
					tempCoordsInfo3 = distanceFormula(mouseToCoords(nextTurnOrigin), arrayToCoords(KI));
				} else {
					tempCoordsInfo3 = chessPieceValue(mouseToArray(nextTurnDestination));		
				};			
			} else if (tempCoordsInfo4 == 0) {
				nextTurnOriginTemp4	= nextTurnOrigin;
				nextTurnDestinationTemp4 = nextTurnDestination;
				if (mouseToArray(nextTurnDestination) == empty) {
					tempCoordsInfo4 = distanceFormula(mouseToCoords(nextTurnOrigin), arrayToCoords(KI));
				} else {
					tempCoordsInfo4 = chessPieceValue(mouseToArray(nextTurnDestination));		
				};		
			} else if (tempCoordsInfo5 == 0) {
				nextTurnOriginTemp5	= nextTurnOrigin;
				nextTurnDestinationTemp5 = nextTurnDestination;
				if (mouseToArray(nextTurnDestination) == empty) {
					tempCoordsInfo5 = distanceFormula(mouseToCoords(nextTurnOrigin), arrayToCoords(KI));
				} else {
					tempCoordsInfo5 = chessPieceValue(mouseToArray(nextTurnDestination));		
				};
			} else {
				chessAIDone = true;
			};
		} else if (moveCheck(mouseToArray(nextTurnOrigin)) == true && chessAIDone == true) {
			
			var chessAITempArray = [tempCoordsInfo1, tempCoordsInfo2, tempCoordsInfo3, tempCoordsInfo4, tempCoordsInfo5];
			
			var largestChessAI = Math.max.apply(Math, chessAITempArray);
			
			if (largestChessAI == tempCoordsInfo1) {
				nextTurnOrigin = nextTurnOriginTemp1;
				nextTurnDestination = nextTurnDestinationTemp1;
			} else if (largestChessAI == tempCoordsInfo2) {
				nextTurnOrigin = nextTurnOriginTemp2;
				nextTurnDestination = nextTurnDestinationTemp2;
			} else if (largestChessAI == tempCoordsInfo3) {
				nextTurnOrigin = nextTurnOriginTemp3;
				nextTurnDestination = nextTurnDestinationTemp3;
			} else if (largestChessAI == tempCoordsInfo4) {
				nextTurnOrigin = nextTurnOriginTemp4;
				nextTurnDestination = nextTurnDestinationTemp4;
			} else {
				nextTurnOrigin = nextTurnOriginTemp5;
				nextTurnDestination = nextTurnDestinationTemp5;
			};
		
			chessAI = 1;
			console.log(chessAI has found a valid move on iteration  + chessAICounter);
			playerTurn = 1;
			originBeforeMovement = mouseToArray(nextTurnOrigin); Only used for console log.
			movePiece(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
			drawChessboardOutline();
			drawChessboard();
			console.log(originBeforeMovement +  moved to  + mouseToCoords(nextTurnDestination));	
			break;
		
		} else {
			chessAICounter = chessAICounter + 1;
		};
	
	};
};

This function is called when mouseStop is called for the second time and moves pieces.
function gameLoop () {
	if ((mouseToArray(nextTurnDestination)) == KI && moveCheck(mouseToArray(nextTurnOrigin)) == true) {
		movePiece(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));	
		setTimeout(alert (Black has won!), 1000);		
		drawChessboardOutline();
		drawChessboard();
		
	} else if ((mouseToArray(nextTurnDestination)) == ki && moveCheck(mouseToArray(nextTurnOrigin)) == true) {
		movePiece(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));	
		setTimeout(alert (White has won!), 1000);		
		drawChessboardOutline();
		drawChessboard();
		
	} else if (moveCheck(mouseToArray(nextTurnOrigin)) == false) {
		drawChessboardOutline();
		drawChessboard();		
		drawInvalidMove();
		
	} else if (mouseToArray(nextTurnOrigin) == empty) {
		drawNoPiece();
		drawChessboardOutline();
		drawChessboard();
		
	} else if (whiteCastling() == true && whiteCastleYet == false) { 
		whiteCastling();
		whiteCastleYet = true;
		drawChessboardOutline();
		drawChessboard();
				
		if (playerTurn == 1 && aiOption == true){
			playerTurn = -1;
			setTimeout(chessAI(), 500);
		} else {
			playerTurn = playerTurn  -1;
		};
				
	} else if (blackCastling() == true && blackCastleYet == false) { 
		blackCastleYet = true;
		drawChessboardOutline();
		drawChessboard();

		if (playerTurn == 1 && aiOption == true){
			playerTurn = -1;
			setTimeout(chessAI(), 500);
		} else {
			playerTurn = playerTurn  -1;
		};
		
	} else if (moveCheck(mouseToArray(nextTurnOrigin)) == true) {
		originBeforeMovement = mouseToArray(nextTurnOrigin); Only used for console.log
		movePiece(mouseToCoords(nextTurnOrigin), mouseToCoords(nextTurnDestination));
		drawChessboardOutline();
		drawChessboard();
		
		For console log.
		console.log(originBeforeMovement +  moved to  + mouseToCoords(nextTurnDestination));
		console.log(chessBoard1);
		console.log(chessBoard2);
		console.log(chessBoard3);
		console.log(chessBoard4);
		console.log(chessBoard5);
		console.log(chessBoard6);
		console.log(chessBoard7);
		console.log(chessBoard8);
		For console log.
		
		if (playerTurn == 1 && aiOption == true){
			whiteTurn();
			playerTurn = -1;
			setTimeout(chessAI(), 500);
		} else if (aiOption == false) {
			playerTurn = playerTurn  -1;
			if (playerTurn == 1) {
				whiteTurn();
			} else {
				blackTurn();
			};
	} else {
		console.log (else on gameLoop has been passed);
	};
};	
};