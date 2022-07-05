type MetaElements = Array<Element|HTMLMetaElement|HTMLLinkElement>

export class DocumentMeta {
  private readonly document: Document
  private readonly meta: MetaElements = []
  private readonly queried: MetaElements = []

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
  public getQueried (): MetaElements {
    return this.queried
  }

  /**
   * @returns Array of meta elements that have not been queried
   */
  public getUnqueried (): MetaElements {
    return this.meta.filter(item => !this.queried.includes(item))
  }

  /**
   * @returns Object meta and link elements that have not been queried
   */
  public getOther (): object | null {
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
  public getAlternatives (): object | null {
    const elements = this.document.querySelectorAll('link[rel*="alternate"]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Apple specific link elements
   */
  public getApple (): object | null {
    const elements = this.document.querySelectorAll('[name^="apple-" i], [rel^="apple-"]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns App Link metadata
   */
  public getAppLink (): object | null {
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
  public getDNSPrefetch (): object | null {
    const elements = this.document.querySelectorAll('link[rel="dns-prefetch" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Link preconnect elements
   */
  public getPreconnect (): object | null {
    const elements = this.document.querySelectorAll('link[rel="preconnect" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Link prefetching elements
   */
  public getPrefetch (): object | null {
    const elements = this.document.querySelectorAll('link[rel="prefetch" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Link preload elements
   */
  public getPreload (): object | null {
    const elements = this.document.querySelectorAll('link[rel="preload" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns DCMI prefixed meta elements
   */
  public getDublinCore (): object | null {
    const elements = this.document.querySelectorAll('meta[name^="dc." i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns All icon link elements
   */
  public getFavicons (): object | null {
    const elements = this.document.querySelectorAll('link[rel*="icon" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Parsed JSON+LD script data
   */
  public getJSONLD (): object | null {
    const elements = this.document.querySelectorAll('script[type="application/ld+json" i]')
    const jsonld: { [key: string]: any } = {}

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
   * @returns OpenGraph prefixed meta elements
   */
  public getOpengraph (): object | null {
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
  public getStylesheets (): object | null {
    const elements = this.document.querySelectorAll('link[rel*="stylesheet" i]')

    return this.getNodeListAttributes(elements)
  }

  /**
   * @returns Twitter prefixed meta elements
   */
  public getTwitter (): object | null {
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

  private getElementArrayAttributes (elements: MetaElements): object | null {
    return this.getMixedElementAttributes(elements)
  }

  private getNodeListAttributes (items: NodeList): object | null {
    return this.getMixedElementAttributes(items)
  }

  private getMixedElementAttributes (elements: any): object | null {
    const attributes: { [key: string]: any } = {}

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
      })

      return attributes
    }

    return null
  }
}
