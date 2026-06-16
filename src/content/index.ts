// Barrel for the content-driven marketing data layer. Pages import from
// '@/content' to render copy that lives as data, not in JSX — so adding a
// service or city is a content edit, never a rebuild (FR-SA-3).

export {
  services,
  getService,
  serviceSlugs,
  type ServiceContent,
  type ServiceAccent,
  type ServiceProcessStep,
  type ServiceFaq,
} from './services'

export { areas, getArea, areaSlugs, type AreaContent, type AreaReview } from './areas'

export { reviews, featuredReviews, googleReviewsUrl, type Review } from './reviews'

export {
  credentials,
  proofPoints,
  values,
  timeline,
  owner,
  type CompanyValue,
  type TimelineEntry,
} from './company'

export {
  pages,
  whatHappensNext,
  type PageContent,
  type PageHero,
  type PageSeo,
} from './pages'
