/* global  describe, beforeEach, it, expect */
import nock from 'nock'
import { fetchFavicons } from '../../../source/index'
import testCases from './test-cases'
import config from '../../../source/config'

describe('icons', () => {
  const defaultSelectors = config.selectors
  const defaultPredicates = config.predicates

  beforeEach(() => {
    config.selectors = defaultSelectors
    config.predicates = defaultPredicates
  })

  testCases.forEach((testCase, index) => {
    it('should return favicon JSON from ' + testCase.fileName, () => {
      const exampleUrl = 'http://www.example.com/'
      const scope = nock(exampleUrl)
        .get('/')
        .replyWithFile(200, './test/unit/icons/' + testCase.fileName)

      config.selectors = testCase.selectors || config.selectors
      config.predicates = testCase.predicates || config.predicates

      return fetchFavicons(exampleUrl)
        .then((actual) => {
          expect(actual).to.deep.equal(testCase.response)
          scope.done()
        })
    })
  })
})
