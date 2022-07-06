export class DocumentMeta {
  private readonly document: Document
  private readonly meta: MetaElement = []
  private readonly queried: MetaElement = []

  /**
   * Extract metadata from HTML document objects
   * @param document The document object to query against
   */
  constructor (document: Document) {
    this.document = document

    // Get all meta and link elements
    this.meta = Array.from(document.querySelectorAll('meta, link'))
  }

  /**
   * @returns Array of meta elements queried
   */
  public getQueried (): MetaElement {
    return this.queried
  }

  /**
   * @returns Array of meta elements that have not been queried
   */
  public getUnqueried (): MetaElement {
    return this.meta.filter(item => !this.queried.includes(item))
  }

  /**
   * @returns Object meta and link elements that have not been queried
   */
  public getOther (): Record<string, unknown> | null {
    return this.getElementArrayAttributes(this.getUnqueried())
  }

  /**
   * @returns Document interface used during instantiation
   */
  public getDocument (): Document {
    return this.document
  }

  /**
   * @returns The full document HTML
   */
  public getDocumentHTML (): string {
    return this.document.documentElement.innerHTML
  }

  /**
   * @returns All head metadata elements
   */
  public getHeadElements (): NodeList {
    return this.document.querySelectorAll('head > *')
  }

  /**
   * @returns The head element HTML markup
   */
  public getHeadHTML (): string {
    return this.document.head.innerHTML
  }

  /**
   * @returns The body element HTML markup
   */
  public getBodyHTML (): string {
    return this.document.body.innerHTML
  }

  /**
   * @returns The document.title property
   */
  public getTitle (): string {
    return this.document.title
  }

  /**
   * @returns The description metadata content
   */
  public getDescription (): string | null {
    const element = this.document.querySelector('meta[name="description"]')

    if (element instanceof HTMLMetaElement) {
      this.queried.push(element)

      return element.content
    }

    return null
  }

  /**
   * @returns Alternative relationship link elements
   */
  public getAlternatives (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('link[rel*="alternate"]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Apple specific link elements
   */
  public getApple (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('[name^="apple-" i], [rel^="apple-"]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns App Link metadata
   */
  public getAppLink (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('meta[property^="al:" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Canonical link element
   */
  public getCanonicalURL (): string | null {
    const element = this.document.querySelector('link[rel="canonical"]')

    if (element instanceof HTMLLinkElement) {
      this.queried.push(element)

      return element.getAttribute('href')
    }

    return null
  }

  /**
   * @returns Charset meta element attribute value
   */
  public getCharset (): string | null {
    const element = this.document.querySelector('meta[charset]')

    if (element instanceof HTMLMetaElement) {
      this.queried.push(element)

      return element.getAttribute('charset')
    }

    return null
  }

  /**
   * @returns Link dns-prefetch elements
   */
  public getDNSPrefetch (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('link[rel="dns-prefetch" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Link preconnect elements
   */
  public getPreconnect (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('link[rel="preconnect" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Link prefetching elements
   */
  public getPrefetch (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('link[rel="prefetch" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Link preload elements
   */
  public getPreload (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('link[rel="preload" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns DCMI prefixed meta elements
   */
  public getDublinCore (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('meta[name^="dc." i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns All icon link elements
   */
  public getFavicons (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('link[rel*="icon" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Parsed JSON+LD script data
   */
  public getJSONLD (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('script[type="application/ld+json" i]')
    const jsonld: { [key: string]: Record<string, unknown> } = {}

    if (elements.length > 0) {
      elements.forEach((element, index) => {
        jsonld[index] = JSON.parse(element.innerHTML)
      })

      return jsonld
    }

    return null
  }

  /**
   * @returns Web app manifest link element
   */
  public getManifest (): string | null {
    const element = this.document.querySelector('link[rel="manifest" i]')

    if (element instanceof HTMLLinkElement) {
      this.queried.push(element)

      return element.getAttribute('href')
    }

    return null
  }

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

  /**
   * @returns OpenGraph prefixed meta elements
   */
  public getOpengraph (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('meta[property^="og:" i], meta[name^="og:" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Robots meta directives
   */
  public getRobots (): string | null {
    const element = this.document.querySelector('meta[name="robots" i]')

    if (element instanceof HTMLMetaElement) {
      this.queried.push(element)

      return element.content
    }

    return null
  }

  /**
   * @returns Link stylesheet elements
   */
  public getStylesheets (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('link[rel*="stylesheet" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Twitter prefixed meta elements
   */
  public getTwitter (): Record<string, unknown> | null {
    const elements = this.document.querySelectorAll('meta[property^="twitter:" i], meta[name^="twitter:" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Viewport meta element content
   */
  public getViewport (): string | null {
    const element = this.document.querySelector('meta[name="viewport" i]')

    if (element instanceof HTMLMetaElement) {
      this.queried.push(element)

      return element.content
    }

    return null
  }

  private getElementArrayAttributes (elements: MetaElement): Record<string, unknown> | null {
    return this.getMixedElementAttributes(elements)
  }

  private getNodeListAttributes (items: NodeList): Record<string, unknown> | null {
    return this.getMixedElementAttributes(items)
  }

  private getMixedElementAttributes (elements: any): Record<string, unknown> | null {
    const attributes: { [key: string]: Record<string, unknown> } = {}

    if (elements.length > 0) {
      elements.forEach((element: any, index: any) => {
        const elementAttributes: { [key: string]: { name: string, value: string } } = {}

        for (const key of Object.keys(element.attributes)) {
          const value = element.attributes[key]

          elementAttributes[value.name] = {
            name: value.name,
            value: value.value
          }
        }

        attributes[index] = elementAttributes
        this.queried.push(element)
      })

      return attributes
    }

    return null
  }
}
