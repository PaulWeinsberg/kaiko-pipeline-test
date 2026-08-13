// Kaiko website repos — commit message rules (SRE-1570).
//
// Conventional Commits, validated on EVERY commit of a PR by the `commitlint` workflow
// (we rebase-and-merge, so each commit lands on master as-is and must be valid).
//
// Kaiko convention on top of Conventional Commits: value-bearing commits carry a tracking
// reference in the scope — either the Notion "Website priorities" entry (`WP-XX`) or the
// Linear issue (`SRE-XXXX`) — e.g. `feat(WP-91): …`, `fix(SRE-1644): …`,
// `refactor(WP-91): …`, `perf(SRE-1644): …`. Housekeeping types (chore/ci/build/docs/
// test/style/revert) may omit the scope.
//
// Both prefixes are accepted because the two backlogs are real and neither covers the
// other: `WP-XX` entries are created in Notion by the marketing side, `SRE-XXXX` issues in
// Linear by the platform side, and infrastructure work often has no WP entry to point at.
// Accepting only `WP-XX` made the correct type more expensive than the wrong one — a
// user-visible fix with no WP entry gets written as `chore:`, which release-please does not
// release. That is exactly how the featured-image fix of #160 ended up on master with no
// image containing it.
const TRACKING_SCOPE = /^(WP|SRE)-\d+$/;
const SCOPE_REQUIRED_TYPES = ['feat', 'fix', 'refactor', 'perf'];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow the uppercase `WP-` / `SRE-` scope (don't force scope casing).
    'scope-case': [0],
    'tracking-scope': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'tracking-scope': ({ type, scope }) => {
          if (!type || !SCOPE_REQUIRED_TYPES.includes(type)) return [true];
          if (scope && TRACKING_SCOPE.test(scope)) return [true];
          return [
            false,
            `${type} commits must carry a WP-XX or SRE-XXXX scope, e.g. ${type}(WP-91): … ` +
              `or ${type}(SRE-1644): … (the Notion or Linear reference for the change)`,
          ];
        },
      },
    },
  ],
};
