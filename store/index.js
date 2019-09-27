import DocumentFetcher from '~/services/document-fetcher'

export const state = () => ({
  organizationNavItems: [],
  mainNavItems: [],
  topItems: [],
  bottomItems: [],
  resourcesNavItems: [],
  aboutNavItems: []
})
export const actions = {
  async nuxtServerInit({ commit }, { app }) {
    commit('updateNavigation', await getNavigation(app.i18n))
  },
  async updateNavigation({ commit }, i18n) {
    commit('updateNavigation', await getNavigation(i18n))
  }
}
export const mutations = {
  updateNavigation(state, navigations) {
    function navItems(response, type) {
      return response.data.body.filter((body) => body.primary.type === type)
    }

    state.organizationNavItems = navItems(navigations, 'organizations-nav')
    state.mainNavItems = navItems(navigations, 'main-nav')
    state.topItems = navItems(navigations, 'burger-menu-top')
    state.bottomItems = navItems(navigations, 'burger-menu-bottom')
    state.resourcesNavItems = navItems(navigations, 'ressources-nav')
    state.aboutNavItems = navItems(navigations, 'about-nav')
  }
}

function getNavigation(i18n) {
  return DocumentFetcher(i18n).getNavigation()
}
