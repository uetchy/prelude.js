# prelude.js

prelude.js is a simple and flexible preloader works with CommonJS, AMD and `<script>`.

# Requirements

* Nothing

# Installation

```console
$ npm install --save prelude-js
```

or

```console
$ bower install --save prelude-js
```

# How to Use

```html
<script src="/path/to/prelude.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const loader = new Prelude();
    loader.add([
      { from: '/images/picture.jpg' },
      { from: 'http://example.com/sample.png' }
    ]);
    loader.on('end', result => {
      document.body.appendChild( result.get('picture') )
      document.body.appendChild( result.get('sample') )
    });
  });
</script>
```

Prelude also supports CommonJS, AMD style including options. This is more modern way:

```js
const domready = require('domready')
const Prelude = require('prelude')

domready(() => {
  // preload assets
  const loader = new Prelude()
  loader.add({ from: 'http://cdn.example.com/bgm.mp3' })
  loader.on('end', result => {
    // assets ready
    const track = result.get('bgm')
    track.play()
  })
})
```

# Contributing

This is open-source project. Feel free to open new issue!

# Credits

Maintained by [Yasuaki Uechi](https://uechi.io)

Licensed under MIT License
