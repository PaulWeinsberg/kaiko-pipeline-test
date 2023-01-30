module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    ignorePatterns: ['static/*'],
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
    },
    extends: [
        '@nuxtjs',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended',
    ],
    plugins: ['prettier'],
    rules: {
        // Core
        indent: 'off',
        curly: 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': 'off',
        // Vue / nuxt
        'vue/attributes-order': 'error',
        'vue/multi-word-component-names': ['off'],
        'vue/script-indent': 'off',
        camelcase: [
            'warn',
            {
                properties: 'never',
                ignoreImports: true,
                ignoreDestructuring: true,
            },
        ],
        'no-new': 'off',
        // Disable Karen
        // 'vue/require-explicit-emits': 'off',
        // 'no-unused-vars': 'off',
        // 'arrow-parens': 'off',
        // 'capitalized-comments': 'off',
        // 'nuxt/no-cjs-in-config': 'off',
        // 'no-param-reassign': 'off',
        // 'operator-linebreak': 'off',
        // 'arrow-body-style': 'off',
        // 'no-use-before-define': 'off',
        // 'no-shadow': 'off',
        // 'no-plusplus': 'off',
        // 'prefer-destructuring': 'off',
        // quotes: 'off',
    },
}
