// load images
EXPORT_ImagesLoader.loadImages(GLOBAL_imageUrls, /*all load finished*/ () => {
		
	// create canvas
	GLOBAL_canvas = document.createElement("canvas");
	GLOBAL_ctx = GLOBAL_canvas.getContext("2d");
	var canvasDiv = document.getElementById('canvas-div');
	GLOBAL_canvas.width = canvasDiv.style.width.replace('px', '');
	GLOBAL_canvas.height = canvasDiv.style.height.replace('px', '');
	canvasDiv.appendChild(GLOBAL_canvas);

	// set background
	GLOBAL_terrainPattern = GLOBAL_ctx.createPattern(EXPORT_ImagesLoader.findImage(GLOBAL_imageBackground), '' /*'repeat'*/);

	document.getElementById('play-again').addEventListener('click', function() {
		gameReset();
	});

	gameReset();

	EXPORT_GameLoop();
});

function gameReset()
{
	document.getElementById('game-over-overlay').style.display = 'none';
	GLOBAL_isGameOver = false;
	GLOBAL_gameTime = 0;
	GLOBAL_score = 0;

	GLOBAL_enemies = [];
	GLOBAL_bullets = [];

	GLOBAL_player.pos.x = 0;
	GLOBAL_player.pos.y = GLOBAL_canvas.height / 2;
}

function gameOver()
{
	document.getElementById('game-over').style.display = 'block';
	document.getElementById('game-over-overlay').style.display = 'block';
	GLOBAL_isGameOver = true;
}

// draw
function IMPLEMENT_GameDrawOnCanvas(dt) 
{
	this.render = function (entity)
	{
		GLOBAL_ctx.save();
		GLOBAL_ctx.translate(entity.pos.x, entity.pos.y);
		entity.sprite.render(GLOBAL_ctx);
		GLOBAL_ctx.restore();
	}

	GLOBAL_ctx.fillStyle = GLOBAL_terrainPattern;
	GLOBAL_ctx.fillRect(0, 0, GLOBAL_canvas.width, GLOBAL_canvas.height);

	if (!GLOBAL_isGameOver)
		render(GLOBAL_player);

	for (var i=0; i<GLOBAL_bullets.length; i++)
		render(GLOBAL_bullets[i]);

	for (var i=0; i<GLOBAL_enemies.length; i++)
		render(GLOBAL_enemies[i]);

	for (var i=0; i<GLOBAL_explosions.length; i++)
		render(GLOBAL_explosions[i]);
};

// keyboard
function IMPLEMENT_GameHandleKeyboard(dt) 
{
	if (EXPORT_keyboard.IsKeyPressed('DOWN') || EXPORT_keyboard.IsKeyPressed('s'))
		GLOBAL_player.pos.y += GLOBAL_player.moveSpeed * dt;

	if (EXPORT_keyboard.IsKeyPressed('UP') || EXPORT_keyboard.IsKeyPressed('w'))
		GLOBAL_player.pos.y -= GLOBAL_player.moveSpeed * dt;

	if (EXPORT_keyboard.IsKeyPressed('LEFT') || EXPORT_keyboard.IsKeyPressed('a'))
		GLOBAL_player.pos.x -= GLOBAL_player.moveSpeed * dt;

	if (EXPORT_keyboard.IsKeyPressed('RIGHT') || EXPORT_keyboard.IsKeyPressed('d'))
		GLOBAL_player.pos.x += GLOBAL_player.moveSpeed * dt;

	if (EXPORT_keyboard.IsKeyPressed('SPACE') && !GLOBAL_isGameOver && Date.now() - GLOBAL_lastFire > 100) 
	{
		var x = GLOBAL_player.pos.x + GLOBAL_player.sprite.size.w / 2;
		var y = GLOBAL_player.pos.y + GLOBAL_player.sprite.size.h / 2;

		GLOBAL_bullets.push( CreateGameObject(x, y, "bullet_forward") );
		GLOBAL_bullets.push( CreateGameObject(x, y, "bullet_up") );
		GLOBAL_bullets.push( CreateGameObject(x, y, "bullet_down") );

		GLOBAL_lastFire = Date.now();
	}
}