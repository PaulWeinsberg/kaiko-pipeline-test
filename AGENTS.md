# Project guidelines

## Conventional Commits

All commits must follow the Conventional Commits specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- feat: new feature
- fix: bug fix
- docs: documentation changes
- style: formatting, missing semicolons, etc.
- refactor: code change that neither fixes a bug nor adds a feature
- perf: performance improvement
- test: adding or updating tests
- build: build system or external dependencies
- ci: CI configuration changes
- chore: other changes not modifying src or test files

## Ticket Scopes (Mandatory)

The scope in the commit message **must** be a ticket reference matching the pattern `WP-<digits>` (e.g., `WP-123`).

This is **required** for the following types:
- feat
- fix
- refactor
- perf

For all other types (`docs`, `style`, `test`, `build`, `ci`, `chore`), the ticket scope is optional.

Examples:
- feat(WP-98): add OAuth2 login support
- fix(WP-456): handle null response in getUser
- refactor(WP-789): simplify user authentication flow
- docs(readme): update installation instructions
- chore: bump dependency versions
