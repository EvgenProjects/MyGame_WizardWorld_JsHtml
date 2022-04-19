// Collisions
function IsBoxIntersects(x1, y1, w1, h1, x2, y2, w2, h2)
{
	let left1 = x1;
	let top1 = y1;
	let right1 = x1 + w1;
	let bottom1 = y1 + h1;

	let left2 = x2;
	let top2 = y2;
	let right2 = x2 + w2;
	let bottom2 = y2 + h2;

    var isNotIntersects = right1 <= left2 || left1 >= right2 || bottom1 <= top2 || top1 >= bottom2;
	return !isNotIntersects;
}

function MoveItemsAndDeleteIfNeed(items, funcMove, funcDelete)
{
	for (var i=(items.length-1); i>=0; i--)
	{
		funcMove(items[i]);

		if (funcDelete(items[i]))
			items.splice(i, 1); // delete item
	}
}

function FindCollisionWithArrayItems(obj, items)
{
	for (var i=(items.length-1); i>=0; i--)
	{
		let pos = items[i].pos;
		let size = items[i].sprite.size;

		if ( IsBoxIntersects(items[i].pos.x, items[i].pos.y, items[i].sprite.size.w, items[i].sprite.size.h, 
							obj.pos.x, obj.pos.y, obj.sprite.size.w, obj.sprite.size.h) ) 
		{
			return i;
		}
	}
	return -1;
}
