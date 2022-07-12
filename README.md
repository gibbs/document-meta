# Document Meta

![Tests](https://github.com/gibbs/document-meta/actions/workflows/test.yml/badge.svg)
[![Coverage](https://coveralls.io/repos/github/gibbs/document-meta/badge.svg?branch=master)](https://coveralls.io/github/gibbs/document-meta?branch=master)
![Version](https://img.shields.io/github/tag/gibbs/document-meta.svg)

An ES module to simplify extracting meta data from 
[Document](https://developer.mozilla.org/en-US/docs/Web/API/Document) objects
in browser contexts.

## Installation

```bash
npm install --save-dev document-meta
```

## Example Usage

```javascript
import { DocumentMeta } from 'document-meta'

// Using the current document object
const meta = new DocumentMeta(document)

// Log metadata
console.log(meta.getData())

// Get the canonical URL
const canonicalURL = meta.getCanonicalURL()

if (canonicalURL !== null) {
  console.log(canonicalURL)
}
```
