/**
 * @jest-environment jsdom
 */
import { Util } from './util'
import { DocumentMetaObject } from '../src/DocumentMetaObject'

const util = new Util

const parser = {
  blank: new DocumentMetaObject(util.createDocument('fixtures/blank.html')),
  imdb: new DocumentMetaObject(util.createDocument('fixtures/imdb.com.html'))
}

test('meta object', () => {
  const docObj = parser.imdb.getDocument()
  const data = (new DocumentMetaObject(docObj)).getData()

  expect(data).not.toBeNaN()
})
