var slug = require('..')
  , assert = require('proclaim')

describe('slug()', function () {

  it('should not modify a url-safe string', function () {
    assert.equal(slug('latest-news'), 'latest-news')
    assert.equal(slug('-'), '')
  })

  it('should convert non-word characters to dashes', function () {
    assert.equal(slug('my great blog post'), 'my-great-blog-post')
    assert.equal(slug('who.are_you?'), 'who-are-you')
    assert.equal(slug('%^T%^~!@##$$#%^$^/?????.'), 't')
  })

  it('should replace non-english alphanumeric characters', function () {
    assert.equal(slug('Füße'), 'fusse')
    assert.equal(slug('lýs'), 'lys')
    assert.equal(slug('£5+5'), '5-5')
    assert.equal(slug('è'), 'e')
  })

  it('should not produce a string with successive dashes', function () {
    assert.equal(slug('this cost £50'), 'this-cost-50')
    assert.equal(slug('eh----what'), 'eh-what')
    assert.equal(slug('Foo & Bar Bazing Day:'), 'foo-bar-bazing-day')
  })

  it('should not produce a string with leading/trailing dashes', function () {
    assert.equal(slug('----boo!--'), 'boo')
  })

  it('should convert to lower case', function () {
    assert.equal(slug('HEY ThErE'), 'hey-there')
  })

  it('should use a custom separator if present', function () {
    assert.equal(slug('I ♥ you', ' '), 'i you')
    assert.equal(slug('I ♥ you', '_'), 'i_you')
  })

  it('should convert letter-like chars into english alphanumeric chars', function () {
    for (var key in slug.chars) {
      if (slug.chars.hasOwnProperty(key)) {
        assert.ok(/\w+/.test(slug(key)), key + slug(key))
      }
    }
  })

  it('should do what it says in the readme', function () {
    assert.equal(slug('My fantastic blog post'), 'my-fantastic-blog-post')
    assert.equal(slug('Today I found £5'), 'today-i-found-5')
    assert.equal(slug('I ♥ you'), 'i-you')
    assert.equal(slug('Kevin Spacey', ' '), 'kevin spacey')
  })

  it('should accept a regex of chars to strip rather than replace with dashes', function () {
    assert.equal(slug('Ben\'s slugg module', /'/g), 'bens-slugg-module')
    assert.equal(slug('Ben\'s slugg module', '_', /'/g), 'bens_slugg_module')
  })

})