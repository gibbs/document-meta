type MetaElement = Array<HTMLMetaElement|HTMLLinkElement>

interface MetaObject {
  title: string | null
  description: string | null
  apple: Record<string, unknown> | null
  applink: Record<string, unknown> | null
  charset: string | null
  canonical: string | null
  alternatives: Record<string, unknown> | null
  dc: Record<string, unknown> | null
  dnsPrefetch: Record<string, unknown> | null
  favicons: Record<string, unknown> | null
  jsonld: Record<string, unknown> | null
  manifest: string | null
  opengraph: Record<string, unknown> | null
  preconnect: Record<string, unknown> | null
  prefetch: Record<string, unknown> | null
  preload: Record<string, unknown> | null
  robots: string | null
  stylesheets: Record<string, unknown> | null
  twitter: Record<string, unknown> | null
  viewport: string | null
  other: Record<string, unknown> | null
}
