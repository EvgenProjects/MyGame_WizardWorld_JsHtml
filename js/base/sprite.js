(function() {
	function Sprite(url, positions, size, speed, once) {
		this.url = url;
		this.positions = positions;
		this.size = size;
		this.speed = typeof speed === 'number' ? speed : 0;
		this.once = once;

		this._index = 0;
	};

	Sprite.prototype = 
	{
		update: function(dt)
		{
			this._index += this.speed*dt;
		},

		render: function(ctx) 
		{
			let pictureIndex = 0;

			if(this.speed > 0) 
			{
				var max = this.positions.length;
				var idx = Math.floor(this._index);
				pictureIndex = idx % max;

				if(this.once && idx >= max) 
				{
					this.done = true;
					return;
				}
			}

			ctx.drawImage(EXPORT_ImagesLoader.findImage(this.url),
				this.positions[pictureIndex].x, this.positions[pictureIndex].y,
				this.size.w, this.size.h,
				0, 0,
				this.size.w, this.size.h);
		}
	};

	// export class
	window.Sprite = Sprite;
})();