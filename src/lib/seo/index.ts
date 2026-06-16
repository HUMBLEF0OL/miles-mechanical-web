export { buildMetadata, localizedUrl } from './metadata'
export type { BuildMetadataOptions } from './metadata'
export {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
  webPageJsonLd,
  breadcrumbJsonLd,
  articleJsonLd,
  faqJsonLd,
} from './json-ld'
export type { WebPageJsonLdInput, BreadcrumbItem, ArticleJsonLdInput, FaqEntry } from './json-ld'
export { publicRoutes, privatePaths } from './registry'
export type { PublicRoute } from './registry'
