/**
 * Triggers an event when all images in the document have loaded
 * Written by Ryan Boylett <ryan@boylett.uk>
 * Version 1.0.0
 */

jQuery(function($)
{
	var all_images = [],
		bg_selector = '*[style*="background-image:"][style*="url("]',
		img_selector = 'img[src]:not([src=""])',
		load_one = function(e)
		{
			if(all_images != null)
			{
				var all_loaded = true;

				for(var i in all_images)
				{
					if(all_images[i].o == this)
					{
						all_images[i].loaded = true;
					}

					else if(!all_images[i].loaded)
					{
						all_loaded = false;
					}
				}

				if(all_loaded)
				{
					console.log(all_images);

					$(document).trigger('all-images-loaded', e || {});

					all_images = null;
				}
			}
		};

	$(bg_selector).each(function()
	{
		var img = new Image();

		all_images.push({ o: img, loaded: false });

		img.onload = img.onerror = load_one;
		img.src = $(this).css('background-image').trim().replace(/^url\((.*?)\)$/i, '$1');
	});

	$(img_selector).each(function()
	{
		all_images.push({ o: this, loaded: false });
	})
	.on('load error', load_one);
});