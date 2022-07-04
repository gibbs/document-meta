export class DocumentMeta {
  private readonly document: Document
  private readonly meta: HTMLMetaElement[] = []
  private readonly link: HTMLLinkElement[] = []
  private readonly queried: Array<Element|HTMLMetaElement|HTMLLinkElement> = []

  /**
   * Extract metadata from HTML document objects
   * @param document The document object to query against
   */
  constructor (document: Document) {
    this.document = document

    // Get all meta/link elements
    const meta = document.querySelectorAll('meta')
    const link = document.querySelectorAll('link')

    // Set nodelist items
    this.meta = Array.from(meta)
    this.link = Array.from(link)
  }

  /**
   * @returns Array of meta elements queried
   */
  public getQueried (): Array<Element|HTMLMetaElement|HTMLLinkElement> {
    return this.queried
  }

  /**
   * @returns Array of meta elements that have not been queried
   */
  public getUnqueried (): Array<Element|HTMLMetaElement|HTMLLinkElement> {
    return [...this.meta, ...this.link].filter(item => !this.queried.includes(item))
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
   * @returns OpenGraph prefixed meta elements
   */
  public getOpengraph (): object | null {
    const elements = this.document.querySelectorAll('meta[property^="og:" i]')

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
   * @returns Twitter prefixed meta elements
   */
  public getTwitter (): object | null {
    const elements = this.document.querySelectorAll('meta[property^="twitter:" i]')

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

  private getNodeListAttributes (items: NodeList): object | null {
    const listAttributes: { [key: string]: any } = {}

    if (items.length > 0) {
      items.forEach((element: any, index) => {
        const elementAttributes: { [key: string]: { name: string, value: string } } = {}

        for (const key of Object.keys(element.attributes)) {
          const value = element.attributes[key]

          elementAttributes[value.name] = {
            name: value.name,
            value: value.value
          }
        }

        listAttributes[index] = elementAttributes
        this.queried.push(element)
      })

      return listAttributes
    }

    return null
  }
}
