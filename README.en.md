# jquery.naz

Simple preloader for jQuery.

## Requirements

* jQuery 1.7.2+

## How to use

1. Add `jquery.naz-1.0.js` to your project(e.g. `javascripts/`)  
If you want to smaller size, please add `jquery.naz-1.0.min.js` to your project instead of `jquery.naz-1.0.js`.
2. Add `jquery.naz.css` to your stylesheets folder(as a `stylesheets/`) and edit it as you like!
3. Add add following codes to inner of &lt;header&gt;(jQuery is required :o).

      <link rel="stylesheet" type="text/css" href="/path/to/jquery.naz.css" media="all"/>
  		<script type="text/javascript" src="/path/to/jquery.naz-1.0.js"></script>
  		<script type="text/javascript">
  		$(function(){
    	  $("body").naz({
      	    animate: false, /* true => Use .animate method, false => doesn't use */
      		smart_naz: true, /* Looking for <img> or <audio> tags, preload automatically. */
      		auto_assets: true, /* Prepare Preloader wrapper html code automatically. */
      		interval: 20,
    		animation: { // For :animate
      		  speed: 1000, /* Animation speed(milli seconds) */
      		  loadingText: "Loading..."
   			},
    		nonanimate: { // For :nonanimate
      		  loadingText: ":percent %" /* :percent replaced to percentage of progress. */
    		}
    	  });

    	  $("body").bind("preloaded", function(){
      	    // Yay! This method is called when resources has been preloaded.
    	  });
   	  	});
  		</script>

 5. Process is complete. make it easy!
 
### Hint

#### Default configuration

  	config = {
      animate: false,
      interval: 20,
      smart_naz: false,
      auto_assets: true,
      animation: { // For :animate
        speed: 1000,
        loadingText: "Loading..."
      },
      nonanimate: { // For :nonanimate
        loadingText: ":percent %"
      }
    }

## Credits

Maintained by oame - http://oameya.com  
Licensed by MIT License

Sample picture was shot by me ;)