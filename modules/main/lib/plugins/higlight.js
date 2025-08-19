import Vue from 'vue'
import hljs from 'highlightjs'
import hljsCurl from 'highlightjs-curl'

hljs.registerLanguage('cURL', hljsCurl)
hljs.configure({
    cssSelector: 'code',
})

Vue.directive('si-highlight', {
    deep: true,
    bind: highlight,
    update: highlight,
})

function highlight(el, binding) {
    if (el.tagName !== 'CODE') {
        const blocks = el.querySelectorAll('code')

        blocks.forEach(block => {
            highlight(block, binding)
        })
    } else {
        if (typeof binding.value === 'string') el.textContent = binding.value
        hljs.highlightBlock(el)
    }
}
