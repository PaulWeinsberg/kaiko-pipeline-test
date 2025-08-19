import queryString from 'query-string'

export default function (context, inject) {
    inject('queryString', queryString)
}
