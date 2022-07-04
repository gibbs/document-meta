import { DocumentMeta } from './DocumentMeta'

interface MetaObject {
  title: string | null
  description: string | null
  charset: string | null
  canonical: string | null
  alternatives: object | null
  dc: object | null
  favicons: object | null
  jsonld: object | null
  opengraph: object | null
  robots: string | null
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
      charset: this.getCharset(),
      canonical: this.getCanonicalURL(),
      alternatives: this.getAlternatives(),
      dc: this.getDublinCore(),
      favicons: this.getFavicons(),
      jsonld: this.getJSONLD(),
      opengraph: this.getOpengraph(),
      robots: this.getRobots(),
      twitter: this.getTwitter(),
      viewport: this.getViewport(),
      other: this.getUnqueried()
    }
  }
}
