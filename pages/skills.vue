<template>
  <div class="page competences">
    <header class="page-header">
      <div class="container md padding-container">
        <prismic-rich-text
          :field="document.page_title"
          class="page-header__title"
        />
      </div>
    </header>

    <main class="page-body">
      <section-slice
        v-for="(item, index) in document.body"
        :key="`item-${index}`"
        :content="item"
        :section-class="'area'"
        :container-class="'container md padding-container'"
        :flex-container-class="'competence'"
      >
      </section-slice>
    </main>
    <prismic-edit-button :document-id="documentId" />
  </div>
</template>

<script>
import { documents, documentFetcher } from '~/services/document-fetcher'
import SectionSlice from '~/components/slices/section'
export default {
  name: 'Skills',
  nuxtI18n: {
    paths: {
      'fr-fr': '/competences',
      'en-gb': '/skills',
    },
  },
  components: { SectionSlice },
  async asyncData({ app, error, req, currentPagePath }) {
    try {
      const document = await documentFetcher(app.i18n, req).get(
        documents.skills
      )
      if (process.client) window.prismic.setupEditButton()
      return {
        currentPagePath,
        meta: document.data.meta,
        document: document.data,
        documentId: document.id,
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e })
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  head() {
    const meta = this.$getMeta(this.meta, this.currentPagePath, this.$prismic)
    const pageTitle = 'Compétences | Pix'
    return {
      title: pageTitle,
      meta,
    }
  },
}
</script>

<style lang="scss">
.page.competences {
  h1,
  h2,
  h3,
  h4,
  p {
    font-family: 'Open Sans', Arial, sans-serif;
  }

  .area {
    padding: 40px 0;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }

    &:nth-child(even) {
      background-color: $grey-3;
    }

    h2,
    h3,
    h4 {
      font-weight: 400;
    }

    .competence {
      margin-bottom: 60px;

      h3 {
        margin-bottom: 6px;
        font-size: 20px;
        line-height: 27px;
      }

      p {
        font-weight: 300;
        line-height: 24px;
      }

      h4 {
        font-size: 14px;
      }

      .competence__description {
        margin-bottom: 22px;
        font-size: 15px;
        line-height: 24px;
        font-weight: 300;
      }

      .competence__theme-title {
        text-transform: uppercase;
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 6px;
      }

      .competence__themes {
        font-size: 14px;
        line-height: 20px;
        font-weight: 300;
      }
    }
  }
}
</style>
