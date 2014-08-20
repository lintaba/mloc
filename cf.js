"use strict";


var Stream = require("stream"),
    util = require("util"),
    ConnectFourModel=require("./connectFour.js");

function ConnectFour() {

	//initialize a new game model
	this.gameModel=new ConnectFourModel();

	Stream.Transform.apply(this, arguments);
};

util.inherits(ConnectFour, Stream.Transform);

ConnectFour.prototype._transform = function _transform(chunk, encoding, callback) {
	// Magic happens here :)

	//assuming chunk contains only positive integers, separated by spaces
	var input=chunk.toString().split(" ");
	for(var i=0;i<input.length;++i){
		var step=input[i];
		if(step){
			if(step.match(/^\d+$/) === null){
				return callback(new Error('Error: input may contain only numbers.'));
			}
			this.gameModel.nextStep(step);
		}
	}

	var winner=this.gameModel.winner();
	callback(null,winner);
};


module.exports = ConnectFour;
