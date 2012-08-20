日本語ドキュメントは[こちら](https://github.com/oame/jquery.prelude/blob/master/README.ja.md)

# jQuery Prelude (also known as "jquery.naz")

jQuery Prelude is a simple and advanced preloader plugin for jQuery.
Web designers can focus on just design without think about unnecessary things.

# Requirements

* jQuery 1.7.2+

# Features

* You need to write some Javascript code to set up plugin, but not necessary to write a verbose HTML tag!
* This is compatible with existing project but you need to modify the HTML tag only if it has a CSS background-image.

# How to Use

Add `jquery.prelude-1.5.js` to your project(e.g. `javascripts/`)  
If you want to smaller size, please add `jquery.prelude-1.5.min.js` to your project instead of `jquery.prelude-1.5.js`.

Add `jquery.prelude.css` to your stylesheets folder(as a `stylesheets/`) and edit it as you like!

Add add following codes to inner of &lt;header&gt;(jQuery is required :o).

	<link rel="stylesheet" type="text/css" href="/path/to/jquery.prelude.css" media="all"/>
	<script type="text/javascript" src="/path/to/jquery.prelude-1.5.js"></script>
	<script type="text/javascript">
	$(function(){
	  $("body").prelude();
	  $("body").on("preloaded", function(){
	    // Yay! "preloaded" is called when plugin has complete preloaded all of resources!
	  });
	});
	</script>

The simplest setup is now complete!
Other samples is contained in the `example/`. Take a look if you like!

### How to preload CSS background-image

jQuery Prelude will automatically preloaded with a tag without special action.
(if you not want to be added automatically, you should set `smart_prelude: false` to option)

	<img src="hoge" />
	<audio src="hoge" />

However, the CSS background-image attribute that may be distributed to the external file is not the case above. For example,

	/* CSS */
	#pic {
	  background: url(images/pic1.jpg) 0 0 no-repeat;
	}
	
	/* HTML */
	<div id="pic"></div>

If you want to let pick up the following code to her,

	/* CSS */
	#pic {
	  background: url(images/pic1.jpg) 0 0 no-repeat;
	  /* background: 0 0 no-repeat; */
	}
	
	/* HTML */
	<div id="pic" data-preload="images/pic1.jpg"></div>

You should rewrite as described above.

## Configurations

Options can be specified with the argument of jQuery Prelude is as following.
If the option is not set will be initialized with this setting automatically.
    
    animate: true, /* true => Using .animate, false => Doesn't use */
    smart_prelude: true, /* Locate <img> and <audio> and add automatically to preload query. */
    auto_assets: true, /* Preparing HTML for preloader automatically. */
    auto_hide: true, /* To fade-out preploader when preloaded all of resources. */
    hide_speed: 1000, /* Fade-out speed */
    show_text: true, /* Show loading text. */
    loading_text: ":percent %", /* :percent is replaced by the rate of progression. */
    animation: {
      interval: 20, /* The update frequency of the timer. */
      speed: 1000 /* Animation speed(milli seconds) */
    }

## Event Handler

### on preloaded

Called when the preload is complete. it's a good idea to visualize the content at this timing.

	$("body").on("preloaded", function(event){
      $("#container").css("display", "block");
      $("#container").animate({opacity: 1}, 800);
      $("#player").trigger("play");
    });

### on preload_progress

Called when progress has changed(Use cse: implement custom animation).

	$("body").on("preload_progress", function(event, percent, finished_count, total_count){
	  /* percent => Current progress(%)
	   * finished_count => Count of loaded resources.
	   * total_count => Count of resources in remining query.
	   */
	  $("#circle").animate({transform: "rotate("+percent+")"});
	});

# Adoption case

* ADAMANT HEART - <http://0050.attri.me/> | Designed by sekka.
* Lost World -ロストワールド- - http://8lemo.com/products/lost/ | Designed by narugami.

# Contribution

If you have any improvement / new feature requests, please tell us in reply to my [Twitter](http://twitter.com/o_ame) or writing to the [box for opinions](http://tracht.ameapp.com/w/5) anonymously.

Pull requests are welcome!

# Credits

Maintained by o_ame - <http://oameya.com>  
Licensed by MIT License

※Sample pictures shot by me :)