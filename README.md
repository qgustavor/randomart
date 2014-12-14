randomart
====

Generate OpenSSH style "randomart" images based on key fingerprints.

This is a shameless, slightly modified port of [calmh/randomart](https://github.com/calmh/randomart) to JS.

You will need Mocha in order to run the tests.

Example
====

```javascript

randomart = require('randomart');

console.log(randomart([
  0x9b, 0x4c, 0x7b, 0xce, 0x7a, 0xbd, 0x0a, 0x13,
  0x61, 0xfb, 0x17, 0xc2, 0x06, 0x12, 0x0c, 0xed
]));
```

```
    .+.
      o.
     .. +
      Eo =
        S + .
       o B . .
        B o..
         *...
        .o+...
```

Credits
====

Thanks to @calmh for their hard work! May the opensource gods reward them with seventy-two non-terrible window managers.
