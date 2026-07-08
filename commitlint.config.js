// Kaiko website repos — commit message rules (SRE-1570).
//
// Conventional Commits, validated on EVERY commit of a PR by the `commitlint` workflow
// (we rebase-and-merge, so each commit lands on master as-is and must be valid).
//
// Kaiko convention on top of Conventional Commits: value-bearing commits carry the
// WP-XX reference in the scope — e.g. `feat(WP-91): …`, `fix(WP-91): …`,
// `refactor(WP-91): …`, `perf(WP-91): …`. Housekeeping types (chore/ci/build/docs/
// test/style/revert) may omit the scope.
const WP_SCOPE = /^WP-\d+$/;
const SCOPE_REQUIRED_TYPES = ['feat', 'fix', 'refactor', 'perf'];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow the uppercase `WP-` scope (don't force scope casing).
    'scope-case': [0],
    'wp-scope': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'wp-scope': ({ type, scope }) => {
          if (!type || !SCOPE_REQUIRED_TYPES.includes(type)) return [true];
          if (scope && WP_SCOPE.test(scope)) return [true];
          return [
            false,
            `${type} commits must carry a WP-XX scope, e.g. ${type}(WP-91): … ` +
              `(WP-XX is the Notion→PR→changelog reference)`,
          ];
        },
      },
    },
  ],
};
