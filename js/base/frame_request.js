
// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
	return window.requestAnimationFrame       ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(callback){
			window.setTimeout(callback, 1000 / 60);
        };
})();

var lastTime = null;

function EXPORT_GameLoop() {
	var now = Date.now();
	if (lastTime==null)
		lastTime = now;
	var dt = (now - lastTime) / 1000.0;

	IMPLEMENT_GameMove(dt);

	IMPLEMENT_GameDrawOnCanvas(dt);

	IMPLEMENT_GameHandleKeyboard(dt);

	lastTime = now;

	requestAnimFrame(EXPORT_GameLoop);
}
