const fs = require('fs')
const path = require('path')

export class Util {
  private projectRootPath: string

  constructor() {
    this.projectRootPath = path.resolve(__dirname)
  }

  public getProjectRootPath(): string {
    return this.projectRootPath
  }

  public loadFixture(file: string, relative: boolean = true) {
    const fixturePath = relative ? path.resolve(this.projectRootPath, file) : file
    const fixtureData = fs.readFileSync(fixturePath, 'utf8')

    return fixtureData
  }

  public createDocument(file: string, relative: boolean = true) {
    const html = this.loadFixture(file, relative)
    const doc = document.implementation.createHTMLDocument()

    doc.write(html)

    return doc
  }
}
