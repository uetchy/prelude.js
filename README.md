# prelude.js

prelude.js is a simple and advanced preloader plugin work with CommonJS, AMD and `<script>`.
Web designers can focus on just design without think about unnecessary things.

# Requirements

* Nothing

# Features

* You need to write some Javascript code to set up plugin, but not necessary to write a verbose HTML tag!
* This is compatible with existing project but you need to modify the HTML tag only if it has a CSS background-image.

# How to Use

```js
<script src="/path/to/prelude.js"></script>
<script>
	document.addEventListener("DOMContentLoaded", function() {
    var loader = new Prelude();
    loader.add([
      { from: '/images/picture.jpg' },
      { from: 'http://example.com/sample.png' }
    ]);
    loader.on('end', function(result) {
      document.body.appendChild( result.get('picture') )
      document.body.appendChild( result.get('sample') )
    });
  });
</script>
```

This is more modern way:

```coffee
domready = require 'domready'
Prelude  = require 'prelude'

domready ->
  # preload assets
  loader = new Prelude()
  loader.add from: 'http://cdn.example.com/Go To Hell(ie remix).mp3'
  loader.on 'end', (result) ->
    # assets ready
    track = result.get 'Go To Hell(ie remix)'
    track.play()
```

## Configurations



## Events

### end

# Contributing

Pull requests are welcome!

# Credits

Maintained by Yasuaki Uechi <uetchy@randompaper.co>
Licensed under MIT License
