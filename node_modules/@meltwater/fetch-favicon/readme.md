# ![fetch-favicon](/img/logo.png)

[![Circle CI](https://circleci.com/gh/meltwater/fetch-favicon.svg?style=svg&circle-token=58431fbfc2ecc57479f4b9255afb806ccff83c6b)](https://circleci.com/gh/meltwater/fetch-favicon)
[![Dependency Status](https://david-dm.org/meltwater/fetch-favicon.svg)](https://david-dm.org/meltwater/fetch-favicon)
[![devDependency Status](https://david-dm.org/meltwater/fetch-favicon/dev-status.svg)](https://david-dm.org/meltwater/fetch-favicon#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/%40meltwater%2Ffetch-favicon.svg)](https://badge.fury.io/js/%40meltwater%2Ffetch-favicon)

Favicons can be difficult. They come in several different formats, no page seems to have them all, and it is hard to know which one to use when you want the best. `fetch-favicon` takes the complexity out by finding them all and choosing the best for you.

## Installation

```
npm install @meltwater/fetch-favicon --save
```

## Using fetch-favicon
### getFavicon(url, [size])

```javascript
// using an ES6 transpiler, like babel
import fetchFavicon from '@meltwater/fetch-favicon'

// not using an ES6 transpiler
var fetchFavicon = require('@meltwater/fetch-favicon').fetchFavicon

fetchFavicon('https://www.github.com')

/*
'https://github.com/apple-touch-icon.png'
*/
```
#### Arguments
- __url:__ the address of the web page to be searched for favicons
- __size:__ _(optional)_ an integer that represents a prefered minimum width/height of the favicon. If none of the retrieved favicons meet this constraint or the size information is not available, fetch-favicon will still return a favicon.

- __returns:__ the address of a favicons. If no favicons are found it will return the address of the `favicon.ico` off of the root (i.e. `https://www.github.com/favicon.ico`)

### getFavicons(url, [size])

```javascript
// using an ES6 transpiler, like babel
import { fetchFavicons } from '@meltwater/fetch-favicon'

// not using an ES6 transpiler
var fetchFavicons = require('@meltwater/fetch-favicon').fetchFavicons

fetchFavicons('https://www.github.com')

/*
[
  {"href":"http://github.com/apple-touch-icon.png","name":"apple-touch-icon"},
  {"href":"http://github.com/apple-touch-icon-57x57.png","name":"apple-touch-icon","size":57,"active":true},
  {"href":"http://github.com/apple-touch-icon-60x60.png","name":"apple-touch-icon","size":60},
  {"href":"http://github.com/apple-touch-icon-72x72.png","name":"apple-touch-icon","size":72},
  {"href":"http://github.com/apple-touch-icon-76x76.png","name":"apple-touch-icon","size":76},
  {"href":"http://github.com/apple-touch-icon-114x114.png","name":"apple-touch-icon","size":114},
  {"href":"http://github.com/apple-touch-icon-120x120.png","name":"apple-touch-icon","size":120},
  {"href":"http://github.com/apple-touch-icon-144x144.png","name":"apple-touch-icon","size":144},
  {"href":"http://github.com/apple-touch-icon-152x152.png","name":"apple-touch-icon","size":152},
  {"href":"http://github.com/apple-touch-icon-180x180.png","name":"apple-touch-icon","size":180},
  {"href":"https://assets-cdn.github.com/images/modules/open_graph/github-logo.png","name":"og:image"},
  {"href":"https://assets-cdn.github.com/images/modules/open_graph/github-mark.png","name":"og:image"},
  {"href":"https://assets-cdn.github.com/images/modules/open_graph/github-octocat.png","name":"og:image"},
  {"href":"/windows-tile.png","name":"msapplication-TileImage"},
  {"href":"https://assets-cdn.github.com/favicon.ico","name":"icon"},
  {"href":"http://github.com/favicon.ico","name":"favicon.ico"}
]
*/
```
#### Arguments
- __url:__ the address of the web page to be searched for favicons
- __size:__ _(optional)_ an integer that represents a prefered minimum width/height of the favicon.

- __returns:__ an array of all the favicons found on the web page.
  - _href:_ _(string)_ location of the favicon image
  - _name:_ _(string)_ type of favicon
  - _size:_ _(int)_ size of favicon (if available)
  - _active:_ _(bool)_ `true` for the favicon returned by `getFavicon`. `undefined` for all others.

## Contributing

#### Code Conventions
Use [standard](http://standardjs.com/). CI won't pass without it.

#### Tests
Add tests where appropriate. See the test [readme](/test/unit/readme.md) for some suggestions.

#### Semantic Versioning
Format commit messages to conform to [conventional-changelog](https://github.com/ajoslin/conventional-changelog). This drives the semantic versioning of the module.

## Additional Information

- [favicon-cheat-sheet](https://github.com/audreyr/favicon-cheat-sheet) is a great resource for understanding all the idiosyncrasies of favicons.

## License

MIT
