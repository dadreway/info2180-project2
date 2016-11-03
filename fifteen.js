///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Extra features done                                                                                                          ///
//End of Game notification - screen flashes and updates text on screen to tell user that they have sucessfully solved the puzzle///
//                                                                                                                              ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Student id: 620088048                                                                                                         ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


"use strict";

var div;
var x;
var y;
var fval; //used for flashing background when user completes puzzle

window.onload = function () //populates browser window with elements
{
	var shufflebutton = document.getElementById('shufflebutton');
	var puzzle = document.getElementById('puzzlearea');
	div = puzzle.getElementsByTagName("div");

	alert("the puzzle will auto shuffle 3 seconds after you close this window.");// informing the user that the game will auto shuffle.

	for (var i=0; i<div.length; i++)
	{
		$(div[i]).addClass('puzzlepiece');
		div[i].style.left = (i%4*100)+'px';
		div[i].style.top =(parseInt(i/4)*100)+'px';
		div[i].style.backgroundPosition = '-' + div[i].style.left + ' ' + '-' + div[i].style.top;

		setTimeout(shuffle,3000);// runs the shuffle function to set up the gaem board.

		div[i].onmouseover = function()//used to highlight movable pieces.
		{
			if (checkmove(parseInt(this.innerHTML)) == 1)//checks to see if tile is movable.
			{
				$(this).addClass('movablepiece');//applies properties from 'movablepiece' in .css to tile.

			}
		};

		div[i].onmouseout = function()// if tile is movable but the user navigates away from it. the properies added to it are removed.
		{
			$(this).removeClass('movablepiece');
		};

		div[i].onclick = function()// checks to see if tile can be moved and moves it. upon recieving the 'click' event
		{
			if (checkmove(parseInt(this.innerHTML))== 1)
			{
				slidetile(this.innerHTML-1);
				if (checkfinish())
				{
					splashupdate();
					winner();
					
				}
				return;
			}
		};
	}

	x = '300px';
	y = '300px';

	shufflebutton.onclick = shuffle; //allows user to suffle the tiles when they click on the shuffle button
	

};

function shuffle(){ //function to shuffle the tiles.
	for (var i=0; i<250; i++)
		{
			var randomgenstore = parseInt(Math.random()* 100) %4;
			if (randomgenstore == 0)
			{
				var temp = calculatetop(x,y);
				if ( temp != -1)
				{
					slidetile(temp);
				}
			}
			if (randomgenstore == 1)
			{
				var temp = calculatebottom(x,y);
				if ( temp != -1) 
				{
					slidetile(temp);
				}
			}

			if (randomgenstore == 2)
			{
				var temp = calculateleft(x,y);
				if ( temp != -1)
				{
					slidetile(temp);
				}
			}

			if (randomgenstore == 3)
			{
				var temp = calculateright(x,y);
				if (temp != -1)
				{
					slidetile(temp);
				}
			}
		}

};

// this function checks all the posible movements for a tile, up, down,lef or right, then returns a 1.
//the result from this fucntion  is used by the .onclick in the window.onload to move the tile 
function checkmove(pos)
{
	if (calculateleft(x,y)==(pos-1))
	{
		return 1;

	}

	if (calculateright(x,y)==(pos-1))
	{
		return 1;

	}

	if (calculatetop(x,y)==(pos-1))
	{
		return 1;

	}

	if (calculatebottom(x,y)==(pos-1))
	{
		return 1;

	}
};

function calculatetop(x,y)
{
	var xval = parseInt(x);
	var yval = parseInt(y);

	if (yval>0) 
	{	
		for (var i =0; i<div.length; i++) {
			if(parseInt(div[i].style.top)+ 100 == yval && parseInt(div[i].style.left)==xval)
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	}

};
function calculateleft(x,y)
{
	var xval = parseInt(x);
	var yval = parseInt(y);

	if (xval > 0) 
	{
		for (var i = 0; i < div.length; i++) 
		{
			if (parseInt(div[i].style.left) + 100 == xval&& parseInt(div[i].style.top) == yval)
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	}
};

function calculatebottom(x,y)
{
	var xval = parseInt(x);
	var yval = parseInt(y);
	if (yval<300) 
	{
		for (var i = 0; i <div.length; i++) 
		{
			if (parseInt(div[i].style.top) - 100 == yval && parseInt(div[i].style.left)== xval)
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	}
};
function calculateright(x,y)
{
	var xval = parseInt(x);
	var yval = parseInt(y);

	if (xval <300 ) 
	{
		for (var i=0; i < div.length; i++) {
		
			if (parseInt(div[i].style.left) - 100 == xval && parseInt(div[i].style.top) == yval) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	}
};
// this function is used to 'swap' the tiles.
function slidetile(pos){
	var tempstore = div[pos].style.top;
	div[pos].style.top = y;
	y = tempstore;

	tempstore = div[pos].style.left;
	div[pos].style.left = x;
	x = tempstore;
}

function checkfinish(){ //checks to see if the puzzle has been solved.
	var token = true;
	for (var i = 0; i < div.length; i++) {
		var y = parseInt(div[i].style.top);
		var x = parseInt(div[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			token = false;
			break;
		}
	}
	return token;
}

function winner() { //uses set interval to change the background colour of the body, every 1000 milliseconds
	setInterval(winflash, 1000);
};

function splashupdate(){
	var b = document.getElementsByTagName("h1");
	b[0].innerHTML = "YOU WIN!!!!! REFRESH PAGE TO PLAY AGAIN";
};

function winflash (){ //fucntion used to change the background colour when user solves the puzzle.
	var body = document.getElementsByTagName('body');
	if (fval == 1){
		body[0].style.backgroundColor = "red";
		fval = 2;
	} else {
		body[0].style.backgroundColor = "green"
		fval = 1;
	}
}

