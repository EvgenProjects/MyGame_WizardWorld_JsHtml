function IMPLEMENT_GameMove(dt)
{
	GLOBAL_gameTime += dt;

	DontAllowPlayerMoveOutOfCanvas();

	MoveItems(dt);

	CheckCollisions();

	GLOBAL_scoreEl.innerHTML = GLOBAL_score;

	CreateNewItemsByTime(dt);
}

function CreateNewItemsByTime(dt)
{
	// create new items
	if( Math.random() < 1 - Math.pow(0.995, GLOBAL_gameTime)) 
	{
		if (GLOBAL_enemies.length<10) // max count enemies in screen
			GLOBAL_enemies.push( CreateGameObject(GLOBAL_canvas.width /*x*/, Math.random() * (GLOBAL_canvas.height - 39) /*y*/ , "enemy") );
	}
}

function MoveItems(dt)
{
	MoveItemsAndDeleteIfNeed( [GLOBAL_player], 
		(item) => {  /* move action*/
			item.sprite.update(dt);
		}, 
		(item) => false /* delete condition*/
	);

	MoveItemsAndDeleteIfNeed( GLOBAL_bullets, 
		(item) => {  /* move action*/

			switch(item.type) {
				case 'bullet_up': item.pos.y -= item.moveSpeed * dt; break;
				case 'bullet_down': item.pos.y += item.moveSpeed * dt; break;
				default: item.pos.x += item.moveSpeed * dt;
			}
		}, 
		(item) => { /* delete condition*/
			return item.pos.y<0 || item.pos.y>GLOBAL_canvas.height || item.pos.x>GLOBAL_canvas.width;
		}
	);

	MoveItemsAndDeleteIfNeed( GLOBAL_enemies, 
		(item) => {  /* move action*/
			item.pos.x -= item.moveSpeed * dt;
			item.sprite.update(dt);
		}, 
		(item) => { /* delete condition*/
			return item.pos.x + item.sprite.size.w < 0;
		}
	);

	MoveItemsAndDeleteIfNeed( GLOBAL_explosions, 
		(item) => {  /* move action*/
			item.sprite.update(dt);
		},
		(item) => { /* delete condition*/
			return item.sprite.done;
		}
	);
}

function CheckCollisions()
{
	// collisions
	let foundCollisionIndex = -1;
	for (var i=(GLOBAL_enemies.length-1); i>=0; i--)
	{
		foundCollisionIndex = FindCollisionWithArrayItems(GLOBAL_enemies[i], [GLOBAL_player]);
		if (foundCollisionIndex != -1)
			gameOver();

		foundCollisionIndex = FindCollisionWithArrayItems(GLOBAL_enemies[i], GLOBAL_bullets);
		if (foundCollisionIndex != -1)
		{
			// remove enemy
			GLOBAL_enemies.splice(i, 1);

			// Add score
			GLOBAL_score += 100;

			// Add an explosion
			GLOBAL_explosions.push( CreateGameObject(GLOBAL_bullets[foundCollisionIndex].pos.x, GLOBAL_bullets[foundCollisionIndex].pos.y, "explosion") );

			// remove bullet
			GLOBAL_bullets.splice(foundCollisionIndex, 1);
		}
	}
}

function DontAllowPlayerMoveOutOfCanvas()
{
	if (GLOBAL_player.pos.x < 0)
		GLOBAL_player.pos.x = 0;
	else if(GLOBAL_player.pos.x > GLOBAL_canvas.width - GLOBAL_player.sprite.size.w)
		GLOBAL_player.pos.x = GLOBAL_canvas.width - GLOBAL_player.sprite.size.w;

	if (GLOBAL_player.pos.y < 0)
		GLOBAL_player.pos.y = 0;
	else if(GLOBAL_player.pos.y > GLOBAL_canvas.height - GLOBAL_player.sprite.size.h)
		GLOBAL_player.pos.y = GLOBAL_canvas.height - GLOBAL_player.sprite.size.h;
}