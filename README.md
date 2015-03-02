# prelude.js

prelude.js is a simple and advanced preloader plugin work with CommonJS, AMD and `<script>`.
Web designers can focus on just design without think about unnecessary things.

# Requirements

* Nothing

# Features

* You need to write some Javascript code to set up plugin, but not necessary to write a verbose HTML tag!
* This is compatible with existing project but you need to modify the HTML tag only if it has a CSS background-image.

# How to Use

Put `prelude.js` to your project.

```js
<script src="/path/to/prelude.js" type="text/javascript"></script>
<script type="text/javascript">
	document.addEventListener("DOMContentLoaded", function() {
    var prelude = new Prelude();
  });
</script>
```

or

```js
domready = require('domready');
Prelude = require('prelude');

domready(function() {
  var prelude = new Prelude();
});
```

## Configurations

Options can be specified with the argument of jQuery Prelude is as following.
If the option is not set will be initialized with this setting automatically.

    smart_preload: true, /* Locate <img> and <audio> and add automatically to preload query. */
    auto_add_source: true, /* When some element preloaded, add src or background-image to this one automatically. */
    auto_prepare_assets: true, /* Preparing HTML for preloader automatically. */
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
* 水の都のオートマタ - <http://unisonia.jp/01a/> | Designed by sekka.

# Contributing

If you have any improvement / new feature requests, please tell us in reply to my [Twitter](http://twitter.com/o_ame) or writing to the [box for opinions](http://tracht.ameapp.com/w/5) anonymously.

Pull requests are welcome!

# Credits

Maintained by Yasuaki Uechi <uetchy@randompaper.co>
Licensed by MIT License
