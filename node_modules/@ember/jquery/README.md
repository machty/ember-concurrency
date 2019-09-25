ember-jquery
==============================================================================

Ember has been historically coupled to jQuery. As part of 
[RFC294](https://github.com/emberjs/rfcs/blob/master/text/0294-optional-jquery.md#introduce-emberjquery-package)
jQuery has been made optional and this addon will explicitly add the jQuery integration functionality.

Installation
------------------------------------------------------------------------------

```
ember install @ember/jquery
```

You should also explicitly tell Ember to enable its jQuery integration:

```bash
ember install @ember/optional-features
ember feature:enable jquery-integration
``` 

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
