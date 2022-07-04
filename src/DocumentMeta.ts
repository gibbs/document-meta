export class DocumentMeta {
  private readonly document: Document
  private readonly meta: HTMLMetaElement[] = []
  private readonly link: HTMLLinkElement[] = []
  private readonly collected: Array<Element|HTMLMetaElement|HTMLLinkElement> = []

  constructor (document: Document) {
    this.document = document

    // Get all meta/link elements
    const meta = document.querySelectorAll('meta')
    const link = document.querySelectorAll('link')

    // Set nodelist items
    this.meta = Array.from(meta)
    this.link = Array.from(link)
  }

  public getCollected (): Array<Element|HTMLMetaElement|HTMLLinkElement> {
    return this.collected
  }

  public getOther (): Array<Element|HTMLMetaElement|HTMLLinkElement> {
    return [...this.meta, ...this.link].filter(item => !this.collected.includes(item))
  }

  public getDocument (): Document {
    return this.document
  }

  public getDocumentHTML (): string {
    return this.document.documentElement.innerHTML
  }

  public getTitle (): string {
    return this.document.title
  }

  public getDescription (): string | null {
    const element = this.document.querySelector('meta[name="description"]')

    if (element instanceof HTMLMetaElement) {
      this.collected.push(element)

      return element.content
    }

    return null
  }

  public getAlternatives (): object | null {
    const elements = this.document.querySelectorAll('link[rel*="alternate"]')

    return this.getNodeListAttributes(elements)
  }

  public getCanonicalURL (): string | null {
    const element = this.document.querySelector('link[rel="canonical"]')

    if (element instanceof HTMLLinkElement) {
      this.collected.push(element)

      return element.getAttribute('href')
    }

    return null
  }

  public getCharset (): string | null {
    const element = this.document.querySelector('meta[charset]')

    if (element instanceof HTMLMetaElement) {
      this.collected.push(element)

      return element.getAttribute('charset')
    }

    return null
  }

  public getDublinCore (): object | null {
    const elements = this.document.querySelectorAll('meta[name^="dc." i]')

    return this.getNodeListAttributes(elements)
  }

  public getFavicons (): object | null {
    const elements = this.document.querySelectorAll('link[rel*="icon" i]')

    return this.getNodeListAttributes(elements)
  }

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

  public getOpengraph (): object | null {
    const elements = this.document.querySelectorAll('meta[property^="og:" i]')

    return this.getNodeListAttributes(elements)
  }

  public getRobots (): string | null {
    const element = this.document.querySelector('meta[name="robots" i]')

    if (element instanceof HTMLMetaElement) {
      this.collected.push(element)

      return element.content
    }

    return null
  }

  public getTwitter (): object | null {
    const elements = this.document.querySelectorAll('meta[property^="twitter:" i]')

    return this.getNodeListAttributes(elements)
  }

  public getViewport (): string | null {
    const element = this.document.querySelector('meta[name="viewport" i]')

    if (element instanceof HTMLMetaElement) {
      this.collected.push(element)

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
        this.collected.push(element)
      })

      return listAttributes
    }

    return null
  }
}
