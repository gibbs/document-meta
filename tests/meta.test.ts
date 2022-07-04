/**
 * @jest-environment jsdom
 */
import { Util } from './util'
import { DocumentMeta } from '../src/DocumentMeta'

const util = new Util

const parser = {
  blank: new DocumentMeta(util.createDocument('fixtures/blank.html')),
  google: new DocumentMeta(util.createDocument('fixtures/google.com.html')),
  imdb: new DocumentMeta(util.createDocument('fixtures/imdb.com.html')),
  instagram: new DocumentMeta(util.createDocument('fixtures/instagram.com.html')),
  phoenixlibrary: new DocumentMeta(util.createDocument('fixtures/library.phoenix.edu.html')),
  wikipedia: new DocumentMeta(util.createDocument('fixtures/wikipedia.org.html')),
}

test('document object', () => {
  const html = parser.blank.getDocument()

  expect(html).not.toBeNaN()
  expect(html).toBeInstanceOf(Document)
})

test('markup', () => {
  const markup = parser.blank.getDocumentHTML()

  expect(markup).not.toBeNaN()
  expect(typeof markup).toEqual('string')
})

test('title', () => {
  const title = parser.google.getTitle()

  expect(title).not.toBeNaN()
  expect(typeof title).toEqual('string')
  expect(title).toEqual('Google')
})

test('description', () => {
  const withDescription = parser.wikipedia.getDescription()
  const withoutDescription = parser.blank.getDescription()

  expect(withDescription).not.toBeNaN()
  expect(withDescription).toEqual(
    expect.stringContaining('Wikipedia')
  )

  expect(withoutDescription).not.toBeNaN()
  expect(withoutDescription).toBeNull()
})

test('alternate', () => {
  const withAlternate = parser.instagram.getAlternatives()
  const withoutAlternate = parser.blank.getAlternatives()

  expect(withAlternate).not.toBeNaN()
  expect(withAlternate).toBeInstanceOf(Object)

  expect(withoutAlternate).not.toBeNaN()
  expect(withoutAlternate).toBeNull()
})

test('canonical', () => {
  const withCanonical = parser.imdb.getCanonicalURL()
  const withoutCanonical = parser.blank.getCanonicalURL()

  expect(withCanonical).not.toBeNaN()
  expect(withCanonical).toEqual('https://www.imdb.com/title/tt1343727/')

  expect(withoutCanonical).not.toBeNaN()
  expect(withoutCanonical).toBeNull()
})

test('charset', () => {
  const withCharset = parser.imdb.getCharset()
  const withoutCharset = parser.blank.getCharset()

  expect(withCharset).not.toBeNaN()
  expect(withCharset).toEqual('utf-8')

  expect(withoutCharset).not.toBeNaN()
  expect(withoutCharset).toBeNull()
})

test('dublin core', () => {
  const withDC = parser.phoenixlibrary.getDublinCore()
  const withoutDC = parser.blank.getDublinCore()

  expect(withDC).not.toBeNaN()
  expect(withDC).toBeInstanceOf(Object)

  expect(withoutDC).not.toBeNaN()
  expect(withoutDC).toBeNull()
})

test('favicons', () => {
  const withFavicons = parser.imdb.getFavicons()
  const withoutFavicons = parser.blank.getFavicons()

  expect(withFavicons).not.toBeNaN()
  expect(withFavicons).toBeInstanceOf(Object)

  expect(withoutFavicons).not.toBeNaN()
  expect(withoutFavicons).toBeNull()
})

test('json+ld', () => {
  const withJSONLD = parser.imdb.getJSONLD()
  const withoutJSONLD = parser.blank.getJSONLD()

  expect(withJSONLD).not.toBeNaN()
  expect(withJSONLD).toBeInstanceOf(Object)

  expect(withoutJSONLD).not.toBeNaN()
  expect(withoutJSONLD).toBeNull()
})

test('opengraph', () => {
  const withOpengraph = parser.imdb.getOpengraph()
  const withoutOpengraph = parser.blank.getOpengraph()

  expect(withOpengraph).not.toBeNaN()
  expect(withOpengraph).toBeInstanceOf(Object)

  expect(withoutOpengraph).not.toBeNaN()
  expect(withoutOpengraph).toBeNull()
})

test('robots', () => {
  const withRobots = parser.instagram.getRobots()
  const withoutRobots = parser.blank.getRobots()

  expect(withRobots).not.toBeNaN()
  expect(withRobots).toEqual('noimageindex, noarchive')

  expect(withoutRobots).not.toBeNaN()
  expect(withoutRobots).toBeNull()
})

test('twitter', () => {
  const withTwitter = parser.imdb.getTwitter()
  const withoutTwitter = parser.blank.getTwitter()

  expect(withTwitter).not.toBeNaN()
  expect(withTwitter).toBeInstanceOf(Object)

  expect(withoutTwitter).not.toBeNaN()
  expect(withoutTwitter).toBeNull()
})

test('viewport', () => {
  const withViewport = parser.imdb.getViewport()
  const withoutViewport = parser.blank.getViewport()

  expect(withViewport).not.toBeNaN()
  expect(typeof withViewport).toEqual('string')
  expect(withViewport).toEqual('width=device-width')

  expect(withoutViewport).not.toBeNaN()
  expect(withoutViewport).toBeNull()
})

test('uncollected', () => {
  parser.imdb.getViewport()
  parser.imdb.getDescription()

  const uncollected = parser.imdb.getOther()
  const collected = parser.imdb.getCollected()
  const intersection = uncollected.filter(element => collected.includes(element))

  expect(intersection).toHaveLength(0)
})
