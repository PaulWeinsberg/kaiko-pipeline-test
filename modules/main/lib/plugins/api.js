import { isFunction } from './../core'

const createAxios = ($axios, { apiUrl, apiKey }) => {
    const api = $axios.create({
        headers: {
            common: {
                Accept: 'application/json, text/plain, */*',
                'X-Auth-Token': apiKey,
            },
        },
        credentials: false,
        withCredentials: false,
        baseURL: apiUrl,
    })

    return api
}

/**
 * Permet de récupérer la liste des endpoints
 * @param {Object|String} endpoints La liste des endpoints
 * @param {Object} store Le store
 * @returns {{endpointsObj: {}, endpointsArr: *[]}}
 */
const getEndpoints = (endpoints, store) => {
    // On prépare notre objet d'endpoints
    let endpointsObj = {}
    if (typeof endpoints === 'object')
        endpointsObj = {
            ...endpoints,
        }
    if (typeof endpoints === 'string') endpointsObj.base = endpoints
    if (!store?.state?.base?.isSet) endpointsObj._base = '/base'
    // Avec notre objet, on crée un tableau d'endpoints
    const endpointsArr = Object.keys(endpointsObj).map(key => endpointsObj[key])

    return { endpointsArr, endpointsObj }
}

const apiFactory = (apiAxios, store) => ({
    get: async (
      endpoints = {},
      { config, onSuccess = null, onError = null } = {}
    ) => {
        // On récupère nos endpoints
        const { endpointsArr, endpointsObj } = getEndpoints(endpoints, store)
        // On prépare nos promesses
        const promisesArray = endpointsArr.map(endpoint => {
            return apiAxios.get(endpoint, config)
        })
        // Permet de faire nos appels en parallèle en gérant les erreurs comme on le souhaite
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
        await Promise.allSettled(promisesArray).then(results =>
          results.forEach((results, i) => {
              const { status, value, reason } = results
              const slug = Object.keys(endpointsObj).find((_, j) => i === j)

              if (status === 'rejected' && isFunction(onError)) {
                  if (reason.response) {
                      const { status: statusError, statusText } =
                        reason.response
                      onError({
                          status: statusError,
                          statusText,
                          slug,
                          response: reason.response,
                      })
                  } else {
                      onError({
                          status: 404,
                          statusText: 'Error',
                          slug,
                          response: reason.response,
                      })
                  }
              }
              if (status === 'fulfilled' && isFunction(onSuccess)) {
                  if (slug === '_base') {
                      store.dispatch('base/dispatchBase', value.data)
                  } else {
                      const toReturn = {}
                      toReturn[slug] = value.data
                      onSuccess(toReturn, results)
                  }
              }
          })
        )
    },
})

export default function ({ $axios, $config, store, error }, inject) {
    const apiAxios = createAxios($axios, $config)
    const api = apiFactory(apiAxios, store, $config)
    inject('api', api)
}
