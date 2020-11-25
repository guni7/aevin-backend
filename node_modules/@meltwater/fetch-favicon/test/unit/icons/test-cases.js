module.exports = [
  {
    'fileName': 'no-favicon.html',
    'response': [
      {
        'href': 'http://www.example.com/favicon.ico',
        'name': 'favicon.ico',
        'active': true
      }
    ]
  },
  {
    'fileName': 'all-favicon.html',
    'predicates': [
      (i) => i.name === 'apple-touch-icon-precomposed',
      (i) => i.name === 'apple-touch-icon',
      (i) => i.name === 'favicon.ico'
    ],
    'response': [{
      href: 'http://example.com/apple-touch-icon.png',
      name: 'apple-touch-icon'
    }, {
      href: 'http://example.com/apple-touch-icon-precomposed.png',
      name: 'apple-touch-icon-precomposed',
      active: true
    }, {
      href: 'http://example.com/icon.png',
      name: 'icon'
    }, {
      href: 'http://example.com/shortcut_icon.png',
      name: 'shortcut icon'
    }, {
      href: 'http://example.com/msapplication-TileImage.png',
      name: 'msapplication-TileImage'
    }, {
      href: 'http://example.com/og_image.png',
      name: 'og:image'
    }, {
      href: 'http://example.com/twitter_image.png',
      name: 'twitter:image'
    }, {
      href: 'http://www.example.com/favicon.ico',
      name: 'favicon.ico'
    }]
  },
  {
    'fileName': 'all-favicon.html',
    'predicates': [
      (i) => i.name === 'apple-touch-icon',
      (i) => i.name === 'apple-touch-icon-precomposed',
      (i) => i.name === 'favicon.ico'
    ],
    'response': [{
      href: 'http://example.com/apple-touch-icon.png',
      name: 'apple-touch-icon',
      active: true
    }, {
      href: 'http://example.com/apple-touch-icon-precomposed.png',
      name: 'apple-touch-icon-precomposed'
    }, {
      href: 'http://example.com/icon.png',
      name: 'icon'
    }, {
      href: 'http://example.com/shortcut_icon.png',
      name: 'shortcut icon'
    }, {
      href: 'http://example.com/msapplication-TileImage.png',
      name: 'msapplication-TileImage'
    }, {
      href: 'http://example.com/og_image.png',
      name: 'og:image'
    }, {
      href: 'http://example.com/twitter_image.png',
      name: 'twitter:image'
    }, {
      href: 'http://www.example.com/favicon.ico',
      name: 'favicon.ico'
    }]
  },
  {
    'fileName': 'all-favicon.html',
    'predicates': [
      (i) => i.name === 'favicon.ico',
      (i) => i.name === 'apple-touch-icon',
      (i) => i.name === 'apple-touch-icon-precomposed'
    ],
    'response': [{
      href: 'http://example.com/apple-touch-icon.png',
      name: 'apple-touch-icon'
    }, {
      href: 'http://example.com/apple-touch-icon-precomposed.png',
      name: 'apple-touch-icon-precomposed'
    }, {
      href: 'http://example.com/icon.png',
      name: 'icon'
    }, {
      href: 'http://example.com/shortcut_icon.png',
      name: 'shortcut icon'
    }, {
      href: 'http://example.com/msapplication-TileImage.png',
      name: 'msapplication-TileImage'
    }, {
      href: 'http://example.com/og_image.png',
      name: 'og:image'
    }, {
      href: 'http://example.com/twitter_image.png',
      name: 'twitter:image'
    }, {
      href: 'http://www.example.com/favicon.ico',
      name: 'favicon.ico',
      active: true
    }]
  }
]
