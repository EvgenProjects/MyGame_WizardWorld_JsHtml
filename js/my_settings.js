// Global units
var GLOBAL_bullets = [];
var GLOBAL_enemies = [];
var GLOBAL_explosions = [];
var GLOBAL_player = CreateGameObject(0, 0, "player");

// Global variables
var GLOBAL_canvas = null;
var GLOBAL_ctx = null;
var GLOBAL_lastFire = Date.now();
var GLOBAL_gameTime = 0;
var GLOBAL_isGameOver = false;
var GLOBAL_terrainPattern;
var GLOBAL_score = 0;
var GLOBAL_scoreEl = document.getElementById('score');

// Animation
var GLOBAL_imageBackground = 'images/background.png';
var GLOBAL_imageUrls = ['images/player.png', 'images/enemy.png', 'images/background.png'];

function CreateGameObject(x, y, type)
{
	var moveSpeed = 0;

	switch(type)
	{
		case "player":
		{
			sprite = new Sprite(
				'images/player.png',          /* image */
				[{x:27, y:18}, {x:92, y:18}, {x:157, y:18}], /* positions */
				{w:64, h:96},                  /* size */
				4,                               /* animation speed */
				false                            /* once */);

			moveSpeed = 200;
			break;
		}

		case "enemy":
		{
			sprite = new Sprite(
				'images/enemy.png',               /* image */
				[{x:25, y:23}, {x:80, y:23}, {x:135, y:23}], /* positions */
				{w:54, h:61},                    /* size */
				16,                              /* animation speed */
				false                            /* once */);

			moveSpeed = 100;
			break;
		}

		case "bullet_forward":
		{
			sprite = new Sprite(
				'images/player.png',              /* image */
				[{x:26, y:147}], /* positions */
				{w:18, h:8},                    /* size */
				16,                             /* animation speed */
				false                           /* once */);

			moveSpeed = 500;
			break;
		}

		case "bullet_up":
		{
			sprite = new Sprite(
				'images/player.png',              /* image */
				[{x:26, y:158}], /* positions */
				{w:9, h:5},                     /* size */
				16,                             /* animation speed */
				false                           /* once */);

			moveSpeed = 500;
			break;
		}

		case "bullet_down":
		{
			sprite = new Sprite(
				'images/player.png',              /* image */
				[{x:26, y:168}], /* positions */
				{w:9, h:5},                     /* size */
				16,                             /* animation speed */
				false                           /* once */);

			moveSpeed = 500;
			break;
		}

		case "explosion":
		{
			sprite = new Sprite(
				'images/player.png',          /* image */
				[{x:27, y:203}, {x:88, y:203}, {x:149, y:203}, {x:210, y:203}, {x:271, y:203}, {x:332, y:203}], /* positions */
				{w:60, h:60},                  /* size */
				14,                             /* animation speed */
				true                           /* once */);

			moveSpeed = 0;
			break;
		}
	}

	return { 
		pos:       {x:x, y:y}, 
		moveSpeed: moveSpeed,
		sprite:    sprite,
		type:	   type
	};
}