"use strict";
var div;
var x;
var y;

window.onload = function()//populates browser window with elements
{
	var puzzle = document.getElementById('puzzlearea');
	div = puzzle.getElementByTagName('div');

	for (var i=0; i<div.length; i++)
	{
		div[i].className = "puzzlepiece";
		div[i].style.left = (i%4*100)+'px';
		div[i].style.top =(parseInt(i/4)*100)+'px';
		div[i].style.backgroundPosition = '-' + div[i].style.left + ' ' + '-' + div[i].style.top;
		div[i].onmouseover = function()
		{
			if (checkmove(parseInt(this.innerHTML)) == 1)
			{
				this.style.border = "2px solid red";
				this.style.color = "#006600";
			}
		};

		div[i].onmouseout = function()
		{
			this.style.border = "2px solid black";
			this.style.color = "#000000";
		};

		div[i].onclick = function()
		{
			if (checkmove(parseInt(this.innerHTML))== 1)
			{
				slidetile(this.innerHTML-1);
				if (checkfinish())
				{
					winner();
				}
				return;
			}
		};
	}

	x = '300px';
	y = '300px';

	var shufflebutton = document.getElementById('shufflebutton');
	shufflebutton.onclick = function()
	{

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
				var temp = calculatebottom(x,z);
				if ( temp != -1) 
				{
					slidetile(temp);
				}
			}

			if (randomgenstore == 2)
			{
				var temp = calculateleft(x,z);
				if ( temp != -1)
				{
					slidetile(temp);
				}
			}

			if (randomgenstore == 3)
			{
				var temp = calculateright(x,z);
				if (temp != -1)
				{
					slidetile(temp);
				}
			}
		}
	};

};

function checkmove(pos)
{
	if (calculateleft(x,y)==(pos-1))//remember to check if == 1 in onload
	{
		return 1;

	}

	if (calculateright(x,y)==(pos-1))//remember to check if == 1 in onload
	{
		return 1;

	}

	if (calculatetop(x,y)==(pos-1))//remember to check if == 1 in onload
	{
		return 1;

	}

	if (calculatebottom(x,y)==(pos-1))//remember to check if == 1 in onload
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
			return i;
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
		if (parseInt(div[i].style.left) - 100 == xval && parseInt(div[i].style.top)) 
		{
			return i;
		}
	}
	else
	{
		return -1;
	}
};

function slidetile(pos){
	var tempstore = div[pos].style.top;
	div[pos].style.top = y;
	y = tempstore;

	tempstore = div[pos].style.left;
	div[pos].style.left = x;
	x = tempstore;
}

function checkfinish(){
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

function winner (){
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundColor = "#FF0000";
}
