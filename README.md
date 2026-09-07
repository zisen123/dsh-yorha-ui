# dsh-yorha-ui

English | [简体中文](README.zh-CN.md)

[![CI](https://github.com/MrmoLabs/dsh-yorha-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/MrmoLabs/dsh-yorha-ui/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/dsh-yorha-ui.svg)](https://www.npmjs.com/package/dsh-yorha-ui)
[![GitHub release](https://img.shields.io/github/v/release/MrmoLabs/dsh-yorha-ui?display_name=tag)](https://github.com/MrmoLabs/dsh-yorha-ui/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-35322c.svg)](LICENSE)

A **NieR:Automata / YoRHa-inspired industrial terminal theme** for DeepSeek Harness Web.

It reshapes the DSH Web workspace, session list, composer, and overlays with sand-toned paper, charcoal structural lines, and amber status markers while preserving the original interactions and light/dark appearance modes.

![dsh-yorha-ui visual preview](docs/yorha-ui-preview.svg)

> Theme preview: a structured representation of the plugin's actual visual rules. It contains no additional animation or game assets.

## Features

- Sand and charcoal palettes that follow the DSH appearance mode
- Square geometry, hard borders, and shadow-free industrial surfaces
- YoRHa-style workspace navigation with project headers, mechanical rails, and a reverse-video active session
- A 32px registration grid, subtle paper texture, and segmented system rail
- Consistent colors for the composer, menus, dialogs, code blocks, and syntax highlighting
- A clickable `YoRHa // TACTICAL INTERFACE 11945` repository link in the lower-right corner
- No runtime CDN, image dependencies, or page animations
- Theme-token overrides that survive DSH theme repaints

## Install

### Install from npm (stable release)

After the first npm release is available:

```powershell
dsh plugin --profile web add -w dsh-yorha-ui
```

Without a globally installed `dsh` command:

```powershell
npx.cmd --yes @deepseek-ai/dsh@latest plugin --profile web add -w dsh-yorha-ui
```

### Install from source

```powershell
git clone https://github.com/MrmoLabs/dsh-yorha-ui.git
cd dsh-yorha-ui
pnpm install
pnpm run build
dsh plugin --profile web add -w .
```

Restart DSH Web after installation, then refresh `http://127.0.0.1:3080`.

## Update and uninstall

Update the npm release:

```powershell
dsh plugin --profile web update -w dsh-yorha-ui
```

Uninstall the plugin:

```powershell
dsh plugin --profile web remove -w dsh-yorha-ui
```

If you previously installed the development package under its former name, `dsh-plugin-yorha-ui`, remove that package before installing `dsh-yorha-ui`.

## Why installing a regular npm library is not enough

A DSH GUI plugin is a profile bundle rather than a JavaScript export alone:

1. `package.json` declares the profile patch through `dsh.bundle.patch`.
2. `cordis.patch.yml` inserts `dsh-yorha-ui` into the DSH plugin roster.
3. The host entry lets DSH load the plugin, while the browser entry registers the same module ID through `window.__ModuleLoader__`.
4. The browser module calls `theme.overrideTokens()` and mounts a strictly scoped supplemental stylesheet.

If the bundle declaration, profile row, or browser module ID is missing, the dependency may appear installed while the page remains unchanged.

## Development and verification

Node.js 22 or later is required.

```powershell
pnpm install
pnpm run check
pnpm run build
npm.cmd pack --dry-run
```

Build output is written to `dist/`:

- `dist/index.js`: DSH host entry
- `dist/client.js`: self-registering browser bundle with no relative runtime dependencies

## Automated releases

The repository contains two GitHub Actions workflows:

- `CI` installs dependencies, type-checks, builds, and verifies the package on every push to `main` and every pull request.
- `Release` verifies that a pushed `v*` tag matches the `package.json` version, creates a GitHub Release with the `.tgz` archive attached, and publishes the same archive through npm Trusted Publishing.

### One-time npm setup

`dsh-yorha-ui` has not been published to the npm registry yet. The package owner must initialize the package once, then add this Trusted Publisher in the npm package settings:

| npm setting | Value |
|---|---|
| Provider | GitHub Actions |
| Organization or user | `MrmoLabs` |
| Repository | `dsh-yorha-ui` |
| Workflow filename | `release.yml` |
| Environment | Leave empty |
| Allowed action | `npm publish` |

The workflow uses short-lived GitHub OIDC credentials and does not require a long-lived `NPM_TOKEN` repository secret. Once configured, npm automatically generates provenance for public packages published from this public repository.

### Publish a new version

Update and commit the package version first:

```powershell
npm.cmd version patch --no-git-tag-version
npm.cmd run check
npm.cmd run build
git add package.json dist
git commit -m "release: prepare v0.2.2"
```

Create and push a tag that exactly matches the package version:

```powershell
git tag -a v0.2.2 -m "Release v0.2.2"
git push origin main
git push origin v0.2.2
```

No manual GitHub Release creation is needed after the tag is pushed. Follow the process under **Actions → Release** in the repository.

## Project scope

`src/client.ts` contains the current theme implementation. `src/prompt`, `src/tools`, `src/templates`, `src/theme/tokens.css`, and `src/types.ts` are early agent-facing plugin drafts. They are retained as design references and are not included in the current build.

## Disclaimer

This is an unofficial community theme. It is not affiliated with Square Enix, PlatinumGames, or the NieR franchise rights holders, and it contains no original game assets.

## License

[MIT](LICENSE)
