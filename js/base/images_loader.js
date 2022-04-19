(function() {

	/////////////////////////////
	//          EXPORT         //
	/////////////////////////////

	window.EXPORT_ImagesLoader = { 
		loadImages: LoadImages,
		findImage: FindImage
    };

	////////////////////////////
	//     internal code      //
	////////////////////////////

	var mapUrlToImage = {};
	var callbackWhenAllImagesLoaded = null;

	// Load images by array of urls
	function LoadImages(arrUrls, callback)
	{
		callbackWhenAllImagesLoaded = callback;
		arrUrls.forEach( url => LoadImage(url) );
	}


	// Load Image
	function LoadImage(url) 
	{
		// take from cache
		if(mapUrlToImage[url])
		{
			return mapUrlToImage[url];
		}

		// create image
		var img = new Image();
		img.onload = function() 
		{
			mapUrlToImage[url] = img;
                
			if (isReady())
				callbackWhenAllImagesLoaded();
		};

		// clear cache
		mapUrlToImage[url] = null;

		// load image
		img.src = url;
	}

	function FindImage(url) {
		return mapUrlToImage[url];
	}

	function isReady()
	{
		for (var url in mapUrlToImage)
		{
			if( !mapUrlToImage[url] )
				return false;
		}
		return true;
	}
})();