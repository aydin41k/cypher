'use strict';
var encoding_rounds = 4;

var build_cyph = function(pass, length) {
	var cyph = '';
	for(var i=0; i<length; i++) {
		var len = pass.length;
		cyph += pass.charAt(i % len);
	}
	return cyph;
}

var cypher = function(message, cyph) {
	encoding_rounds = Math.floor(Math.sqrt(Math.sqrt(message.length)))+1;
	console.log('encoding '+encoding_rounds+' times.');
	for( var j=0; j < encoding_rounds; j++ ) {
		cyph = cyph.slice(1) + cyph.slice(0,1);
		console.log('cyph '+j+'. '+cyph);
		var key = build_cyph(cyph, message.length);		
		for( var i=0, xor = ''; i<message.length; i++ ) {
			var c = message.charCodeAt(i);
			var d = key.charCodeAt(i);
			var next_char_xor = String((c ^ d)+33);
			next_char_xor = String.fromCharCode(next_char_xor);
			xor += next_char_xor;
		}
	}
	return xor;
}

var reverse_xor = function(gibberish,pass) {
	encoding_rounds = Math.floor(Math.sqrt(Math.sqrt(gibberish.length)))+1;	
	for( var j=0; j<encoding_rounds; j++ )	{
		var decyphered = '';
		pass = pass.slice(1) + pass.slice(0,1);
		console.log('pass '+j+'. '+pass);		
		var key = build_cyph(pass, gibberish.length);	
		for(var i=0; i<gibberish.length; i++) {
			var gibb_current_char = gibberish.charCodeAt(i)-33;
			var key_current_char = key.charCodeAt(i);
			decyphered += String.fromCharCode(gibb_current_char ^ key_current_char);		
		}
	}	
	return decyphered;	
}	