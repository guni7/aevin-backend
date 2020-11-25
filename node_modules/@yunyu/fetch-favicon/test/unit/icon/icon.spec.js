/* global  describe, beforeEach, it, expect */
import nock from 'nock'
import fetchFavicon from '../../../source/index'
import testCases from './test-cases'
import config from '../../../source/config'

describe('icon', () => {
  const defaultSelectors = config.selectors
  const defaultPredicates = config.predicates

  beforeEach(() => {
    config.selectors = defaultSelectors
    config.predicates = defaultPredicates
  })

  testCases.forEach((testCase, index) => {
    it('should find a favicon in ' + testCase.fileName, () => {
      const exampleUrl = 'http://example.com/'
      const scope = nock(exampleUrl)
        .get('/')
        .replyWithFile(200, './test/unit/icon/' + testCase.fileName)

      config.selectors = testCase.selectors || config.selectors
      config.predicates = testCase.predicates || config.predicates

      return fetchFavicon(exampleUrl, testCase.minSize)
        .then((actual) => {
          expect(actual).to.equal(testCase.response)
          scope.done()
        })
    })
  })
})
