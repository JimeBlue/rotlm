// Social crawlers (WhatsApp, Facebook, LinkedIn, ...) only read the first part
// of the HTML. The global CSS is inlined into the head (~180 KB), and the page's
// description and og:* tags were rendered after it, past the point where
// crawlers stop reading, so link previews had no image or description.
// Give the SEO tags a priority that renders them ahead of the inline styles.
//
// useSeoMeta() stores its tags as one "_flatMeta" entry that is expanded into
// real <meta> tags by another hook later on; every expanded tag inherits the
// entry's priority, so it is set on the placeholder as well as on plain metas
// (the ones from nuxt.config and the i18n module).
const SEO_META = /^(?:description$|og:|twitter:)/
const PRIORITY = 20

export default defineNuxtPlugin(() => {
  const head = injectHead()
  head.hooks.hook('entries:normalize', ({ tags }) => {
    for (const tag of tags) {
      if (tag.tag === '_flatMeta') {
        tag.tagPriority = PRIORITY
        continue
      }
      if (tag.tag !== 'meta') {
        continue
      }
      const key = String(tag.props?.property ?? tag.props?.name ?? '')
      if (SEO_META.test(key)) {
        tag.tagPriority = PRIORITY
      }
    }
  })
})
