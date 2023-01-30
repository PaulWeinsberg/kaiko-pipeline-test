export default function ({ $gtm, route, app }) {
    const gtmCode = app.store.state.options.options?.configuration?.gtm_code
    if (gtmCode) $gtm.init(gtmCode)
}
