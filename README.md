# prelude.js

prelude.js is a simple and flexible preloader works with CommonJS, AMD and `<script>`.

# Requirements

* Nothing

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

Prelude also supports CommonJS, AMD -style including options.
This is more modern way:

```coffee
domready = require 'domready'
Prelude  = require 'prelude'

domready ->
  # preload assets
  loader = new Prelude()
  loader.add from: 'http://cdn.example.com/Go To The Hell(ie remix).mp3'
  loader.on 'end', (result) ->
    # assets ready
    track = result.get 'Go To The Hell(ie remix)'
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
