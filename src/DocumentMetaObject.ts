import { DocumentMeta } from './DocumentMeta'

interface MetaObject {
  title: string | null
  description: string | null
  apple: object | null
  applink: object | null
  charset: string | null
  canonical: string | null
  alternatives: object | null
  dc: object | null
  dnsPrefetch: object | null
  favicons: object | null
  jsonld: object | null
  manifest: string | null
  opengraph: object | null
  preconnect: object | null
  prefetch: object | null
  preload: object | null
  robots: string | null
  stylesheets: object | null
  twitter: object | null
  viewport: string | null
  other: object | null
}

export class DocumentMetaObject extends DocumentMeta {
  /**
   * @returns An object of metadata
   */
  public getData (): MetaObject {
    return {
      title: this.getTitle(),
      description: this.getDescription(),
      apple: this.getApple(),
      applink: this.getAppLink(),
      charset: this.getCharset(),
      canonical: this.getCanonicalURL(),
      alternatives: this.getAlternatives(),
      dc: this.getDublinCore(),
      dnsPrefetch: this.getDNSPrefetch(),
      favicons: this.getFavicons(),
      jsonld: this.getJSONLD(),
      manifest: this.getManifest(),
      opengraph: this.getOpengraph(),
      preconnect: this.getPreconnect(),
      prefetch: this.getPrefetch(),
      preload: this.getPreload(),
      robots: this.getRobots(),
      stylesheets: this.getStylesheets(),
      twitter: this.getTwitter(),
      viewport: this.getViewport(),
      other: this.getOther()
    }
  }
}
