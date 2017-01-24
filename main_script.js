/*
* Encoding:
*   Calculate how many times the passphrase will be stirred and XOR'ed against the text as the fourth root of the length of the message +1
*   Stir the passphrase - cut the first char and join it to the end
*   Build the key - repeat the edited passphrase to match the length of the text
*   XOR the key against the text; return the result
*   Grab the passphrase edited in step 2 and the result from step 4; repeat steps 2-4 as many times as set in step 1
*
* Decoding:
*   Magic.
*/

'use strict';
var encoding_rounds = 4;

/*
** Build a key with a length equal to the initial text
*/
var build_cyph = function(pass, length) {
	var cyph = '';
	for(var i=0; i<length; i++) {
		var len = pass.length;
		cyph += pass.charAt(i % len);
	}
	return cyph;
}

/*
** Encode
*/

var cypher = function(message, cyph) {

//Calculate how many times the passphrase will be stirred
	encoding_rounds = Math.floor(Math.sqrt(Math.sqrt(message.length)))+1;

	for( var j=0; j < encoding_rounds; j++ ) {
//Build a key by sending the first char to the
		cyph = cyph.slice(1) + cyph.slice(0,1);
		var key = build_cyph(cyph, message.length);		

//XOR the chars one-by-one		
		for( var i=0, xor = ''; i<message.length; i++ ) {
			var c = message.charCodeAt(i);
			var d = key.charCodeAt(i);
			var next_char_xor = String((c ^ d)+33);
			next_char_xor = String.fromCharCode(next_char_xor);
			xor += next_char_xor;
		}
	}
//Voila!	
	return xor;
}

/*
** Decode - reversing the above
*/

var reverse_xor = function(gibberish,pass) {
	encoding_rounds = Math.floor(Math.sqrt(Math.sqrt(gibberish.length)))+1;	
	for( var j=0; j<encoding_rounds; j++ )	{
		var decyphered = '';
//Redundant piece below, to be fixed
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
