import Vue from 'vue'
import atoms from './atoms'
import bases from './bases'
import molecules from './molecules'
import organisms from './organisms'
import templates from './templates'

// get options passed from module.js
const options = JSON.parse(`<%= JSON.stringify(options) %>`)

const types = [atoms, bases, molecules, organisms, templates]

const registerComponent = component => {
    Vue.component(component.name, {
        extends: component,
    })
}

types.forEach(type => {
    const components = Object.keys(type)
    components.forEach(key => {
        const el = type[key]
        registerComponent(el)
    })
})
