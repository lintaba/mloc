"use strict";
/**
 * ConnectFour model
 *
 * @constructor
 * @this {ConnectFour}
 */
var ConnectFour=function(){
	this.currentPlayer="a";
	this.columns=[];
};
/**
 * pass the turn to the next player
 *
 * @this {ConnectFour}
 * @private
 */
ConnectFour.prototype.nextPlayer=function(){
	this.currentPlayer=this.currentPlayer==="a"?"b":"a";
};
/**
 * get the value from a field
 *
 * @private
 * @this {ConnectFour}
 * @param {number} x coordinate (column)
 * @param {number} y coordinate (row)
 * @return {string|boolean} a,b, or false
 */
ConnectFour.prototype.getField=function(x,y){
	return this.columns[x] && this.columns[x][y] || false;
};
/**
 * calculate the max height of the columns
 *
 * @private
 * @this {ConnectFour}
 * @return {number} max height
 */
ConnectFour.prototype.getRowTop=function(){
	var rowTop=0;
	for(var i=0;i<this.columns.length;++i){
		if(this.columns[i]){
			rowTop=Math.max(rowTop,this.columns[i].length);
		}
	}
	return rowTop;
};

/**
 * "drops" a marker to the selected column, as the current player
 *
 * @public
 * @this {ConnectFour}
 * @param {number} column where the marker will be inserted
 */

ConnectFour.prototype.nextStep=function(column){
	if(!this.columns[column]){
		this.columns[column]=[];
	}
	this.columns[column].push(this.currentPlayer);
	this.nextPlayer();
	return this;
};
/**
 * calculate if any of the players has won. A player has won, if the game contains 4 of the same a or b's in a row, column, or diagonal.
 *
 * @this {ConnectFour}
 * @public
 * @return {'a' | 'b' | ''} indicate the winner player
 */
ConnectFour.prototype.winner=function(){
	var _rowTop=this.getRowTop(),
		_cols=this.columns.length,
		c,r,lst,fnd;

	//check 4 in rows
	for(r=0;r<_rowTop;++r){
		for(c=0,lst='x',fnd=0;c<_cols;++c){
			if(this.getField(c,r)){
				if(this.getField(c,r)!=lst){
					lst=this.getField(c,r);
					fnd=1;
				}else{
					++fnd;
					if(fnd==4){
						//we have the winner
						return lst;
					}
				}
			}else{
				fnd=0;
				lst='';
			}
		}
	}

	//check 4 in cols
	for(c=0;c<_cols;++c){
		for(r=0,lst='x',fnd=0;r<_rowTop;++r){
			if(this.getField(c,r)){
				if(this.getField(c,r)!=lst){
					lst=this.getField(c,r);
					fnd=1;
				}else{
					++fnd;
					if(fnd==4){
						//we have the winner
						return lst;
					}
				}
			}else{
				fnd=0;
				lst='x';
			}
		}
	}

	//check 4 diagonals
	for(r=-_cols;r<_rowTop+_cols;++r){
		for(c=0,lst='x',fnd=0;c<_cols;++c){
			if(this.getField(c,r+c)){
				if(this.getField(c,r+c)!=lst){
					lst=this.getField(c,r+c);
					fnd=1;
				}else{
					++fnd;
					if(fnd==4){
						//we have the winner
						return lst;
					}
				}
			}else{
				fnd=0;
				lst='x';
			}
		}
	}
	//check 4 diagonals
	for(r=-_cols;r<_rowTop+_cols;++r){
		for(c=0,lst='x',fnd=0;c<_cols;++c){
			if(this.getField(c,r-c)){
				if(this.getField(c,r-c)!=lst){
					lst=this.getField(c,r-c);
					fnd=1;
				}else{
					++fnd;
					if(fnd==4){
						//we have the winner
						return lst;
					}
				}
			}else{
				fnd=0;
				lst='x';
			}
		}
	}
	//there is no winner..
	return "";
};


module.exports=ConnectFour;
