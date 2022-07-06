/**
 * @jest-environment jsdom
 */
import { Util } from './util'
import { DocumentMeta } from '../src/DocumentMeta'

const util = new Util

const parser = {
  blank: new DocumentMeta(util.createDocument('fixtures/blank.html')),
  amazon: new DocumentMeta(util.createDocument('fixtures/amazon.co.uk.html')),
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

test('apple', () => {
  const withApple = parser.instagram.getApple()
  const withoutApple = parser.blank.getApple()

  expect(withApple).not.toBeNaN()
  expect(withApple).toBeInstanceOf(Object)

  expect(withoutApple).not.toBeNaN()
  expect(withoutApple).toBeNull()
})

test('app links', () => {
  const withAppLink = parser.instagram.getAppLink()
  const withoutAppLink = parser.blank.getAppLink()

  expect(withAppLink).not.toBeNaN()
  expect(withAppLink).toBeInstanceOf(Object)

  expect(withoutAppLink).not.toBeNaN()
  expect(withoutAppLink).toBeNull()
})

test('body HTML', () => {
  const withBodyHTML = parser.wikipedia.getBodyHTML()
  const withoutBodyHTML = parser.blank.getBodyHTML()

  expect(withBodyHTML).not.toBeNaN()
  expect(typeof withBodyHTML).toEqual('string')

  expect(withoutBodyHTML).not.toBeNaN()
  expect(withoutBodyHTML.trim()).toEqual('')
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

test('dns-prefetch', () => {
  const withDNSPrefetch = parser.amazon.getDNSPrefetch()
  const withoutDNSPrefetch = parser.blank.getDNSPrefetch()

  expect(withDNSPrefetch).not.toBeNaN()
  expect(withDNSPrefetch).toBeInstanceOf(Object)

  expect(withoutDNSPrefetch).not.toBeNaN()
  expect(withoutDNSPrefetch).toBeNull()
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

test('head elements', () => {
  const withHeadElements = parser.google.getHeadElements()
  const withoutHeadElements = parser.blank.getHeadElements()

  expect(withHeadElements).not.toBeNaN()
  expect(withHeadElements).toBeInstanceOf(NodeList)

  expect(withoutHeadElements).not.toBeNaN()
  expect(withoutHeadElements).toBeInstanceOf(NodeList)
})

test('head HTML', () => {
  const withHeadHTML = parser.google.getHeadHTML()
  const withoutHeadHTML = parser.blank.getHeadHTML()

  expect(withHeadHTML).not.toBeNaN()
  expect(typeof withHeadHTML).toEqual('string')

  expect(withoutHeadHTML).not.toBeNaN()
  expect(withoutHeadHTML.trim()).toEqual('')
})

test('json+ld', () => {
  const withJSONLD = parser.imdb.getJSONLD()
  const withoutJSONLD = parser.blank.getJSONLD()

  expect(withJSONLD).not.toBeNaN()
  expect(withJSONLD).toBeInstanceOf(Object)

  expect(withoutJSONLD).not.toBeNaN()
  expect(withoutJSONLD).toBeNull()
})

test('manifest', () => {
  const withManifest = parser.instagram.getManifest()
  const withoutManifest = parser.blank.getManifest()

  expect(withManifest).not.toBeNaN()
  expect(withManifest).toEqual('/data/manifest.json')

  expect(withoutManifest).not.toBeNaN()
  expect(withoutManifest).toBeNull()
})

test('get data', () => {
  const data = parser.instagram.getData()

  expect(data).not.toBeNaN()
  expect(data).not.toBeNull()
})


test('opengraph', () => {
  const withOpengraph = parser.imdb.getOpengraph()
  const withoutOpengraph = parser.blank.getOpengraph()

  expect(withOpengraph).not.toBeNaN()
  expect(withOpengraph).toBeInstanceOf(Object)

  expect(withoutOpengraph).not.toBeNaN()
  expect(withoutOpengraph).toBeNull()
})

test('preconnect', () => {
  const withPreconnect = parser.wikipedia.getPreconnect()
  const withoutPreconnect = parser.blank.getPreconnect()

  expect(withPreconnect).not.toBeNaN()
  expect(withPreconnect).toBeInstanceOf(Object)

  expect(withoutPreconnect).not.toBeNaN()
  expect(withoutPreconnect).toBeNull()
})

test('prefetch', () => {
  const withPrefetch = parser.instagram.getPrefetch()
  const withoutPrefetch = parser.blank.getPrefetch()

  expect(withPrefetch).not.toBeNaN()
  expect(withPrefetch).toBeInstanceOf(Object)

  expect(withoutPrefetch).not.toBeNaN()
  expect(withoutPrefetch).toBeNull()
})

test('preload', () => {
  const withPreload = parser.instagram.getPreload()
  const withoutPreload = parser.blank.getPreload()

  expect(withPreload).not.toBeNaN()
  expect(withPreload).toBeInstanceOf(Object)

  expect(withoutPreload).not.toBeNaN()
  expect(withoutPreload).toBeNull()
})

test('robots', () => {
  const withRobots = parser.instagram.getRobots()
  const withoutRobots = parser.blank.getRobots()

  expect(withRobots).not.toBeNaN()
  expect(withRobots).toEqual('noimageindex, noarchive')

  expect(withoutRobots).not.toBeNaN()
  expect(withoutRobots).toBeNull()
})

test('stylesheets', () => {
  const withStylesheets = parser.instagram.getStylesheets()
  const withoutStylesheets = parser.blank.getStylesheets()

  expect(withStylesheets).not.toBeNaN()
  expect(withStylesheets).toBeInstanceOf(Object)

  expect(withoutStylesheets).not.toBeNaN()
  expect(withoutStylesheets).toBeNull()
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

test('unqueried', () => {
  parser.imdb.getViewport()
  parser.imdb.getDescription()

  const unqueried = parser.imdb.getUnqueried()
  const queried = parser.imdb.getQueried()
  const intersection = unqueried.filter(element => queried.includes(element))

  expect(intersection).toHaveLength(0)
})

test('unqueried attributes', () => {
  parser.imdb.getViewport()
  parser.imdb.getDescription()

  const unqueriedAttributes = parser.imdb.getOther()

  expect(unqueriedAttributes).not.toBeNaN()
  expect(unqueriedAttributes).not.toBeNull()

  // @ts-ignore
  expect(Object.values(unqueriedAttributes).length).toBeGreaterThan(0)
})

test('no unqueried attributes', () => {
  const unqueriedAttributes = parser.blank.getOther()

  expect(unqueriedAttributes).toBeNull()
})
