(function() {

	/////////////////////////////
	//  <-  EXPORT functions   //
	/////////////////////////////

	window.EXPORT_keyboard = {
		IsKeyPressed: key => pressedKeys[key.toUpperCase()]
	};

	////////////////////////////
	//     internal code      //
	////////////////////////////

	var pressedKeys = {};

	function setKey(event, status)
	{
		var code = event.keyCode;
		var key = String.fromCharCode(code); // convert ASCII codes to letters

		if (code==32)
			key = 'SPACE';
		else if (code==37)
			key = 'LEFT';
		else if (code==38)
			key = 'UP';
		else if (code==39)
			key = 'RIGHT';
		else if (code==40)
			key = 'DOWN';

		pressedKeys[key] = status;
	}

	document.addEventListener('keydown', e => setKey(e, true) );
	document.addEventListener('keyup',   e => setKey(e, false) );
	document.addEventListener('blur',    () => pressedKeys = {} );

})();