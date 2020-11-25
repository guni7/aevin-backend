module.exports = [
  {
    'fileName': 'no-favicon.html',
    'response': 'http://example.com/favicon.ico'
  },
  {
    'fileName': 'link-icon.html',
    'response': 'http://example.com/myicon.png'
  },
  {
    'fileName': 'link-shortcut-icon.html',
    'response': 'http://example.com/myicon.png'
  },
  {
    'fileName': 'apple-touch-icon.html',
    'response': 'http://example.com/myicon.png'
  },
  {
    'fileName': 'apple-touch-icon-precomposed.html',
    'response': 'http://example.com/myicon.png'
  },
  {
    'fileName': 'twitter-image.html',
    'response': 'http://example.com/myicon.png'
  },
  {
    'fileName': 'og-image.html',
    'response': 'http://example.com/myicon.png'
  },
  {
    'fileName': 'msapplication-TileImage.html',
    'response': 'http://example.com/myicon.png'
  },
  {
    'fileName': 'all-favicon.html',
    'response': 'http://example.com/apple-touch-icon-precomposed.png',
    'predicates': [
      (i) => i.name === 'apple-touch-icon-precomposed',
      (i) => i.name === 'apple-touch-icon',
      (i) => i.name === 'favicon.ico'
    ]
  },
  {
    'fileName': 'all-favicon.html',
    'response': 'http://example.com/apple-touch-icon.png',
    'predicates': [
      (i) => i.name === 'apple-touch-icon',
      (i) => i.name === 'apple-touch-icon-precomposed',
      (i) => i.name === 'favicon.ico'
    ]
  },
  {
    'fileName': 'all-favicon.html',
    'response': 'http://example.com/favicon.ico',
    'predicates': [
      (i) => i.name === 'favicon.ico'
    ]
  },
  {
    'fileName': 'all-favicon.html',
    'minSize': 144,
    'response': 'http://example.com/twitter_image.png',
    'predicates': [
      (i, s) => i.name === 'twitter:image' && i.size >= s,
      (i) => i.name === 'apple-touch-icon-precomposed'
    ]
  },
  {
    'fileName': 'all-favicon.html',
    'minSize': 144,
    'response': 'http://example.com/twitter_image.png',
    'predicates': [
      (i, s) => i.name === 'twitter:image',
      (i) => i.name === 'apple-touch-icon-precomposed'
    ]
  },
  {
    'fileName': 'all-favicon.html',
    'minSize': 196,
    'response': 'http://example.com/apple-touch-icon-precomposed.png',
    'predicates': [
      (i, s) => i.name === 'twitter:image' && i.size >= s,
      (i) => i.name === 'apple-touch-icon-precomposed'
    ]
  }
]
