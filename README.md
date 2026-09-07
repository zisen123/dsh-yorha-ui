# dsh-plugin-yorha-ui

**NieR:Automata (YoRHa) industrial terminal theme** for the DeepSeek Harness Web GUI.

Turns the DSH Web shell (`http://127.0.0.1:3080`) into a strict, sand-and-charcoal
industrial terminal: zero border radius, crisp 1px/0.5px borders instead of
shadows, amber `#E58D28` accents, and monospace data/code faces — in both light
and dark color schemes.

## How DSH loads plugins (why the old version did nothing)

DSH plugins are **profile bundles**, not plain npm libraries:

1. A bundle package declares `"dsh": { "bundle": { "patch": "./cordis.patch.yml" } }`
   in `package.json`. `dsh plugin --profile web add` only *installs* a dependency;
   the reconciliation step promotes it into the profile's `dsh.profile.bundles`
   list **only when that declaration exists**. The previous version had no such
   declaration, so the CLI printed a warning and installed it as a plain
   dependency that nothing ever loads.
2. The `cordis.patch.yml` **inserts a loader entry** (a plugin row) into the
   profile roster. Without an inserted row, even a promoted bundle does nothing.
3. GUI plugins are **dual-face**: the same row loads a host half
   (`main` / `exports["."]`) in the node process and a browser half
   (`exports["./client"]`) in the Web GUI. The browser half is discovered from
   the package's `dsh.client` declaration.

## Install (from this checkout)

```powershell
# 1. rebuild the dist/ output
pnpm install
pnpm run build

# 2. add / re-add the plugin into the "web" profile
dsh plugin --profile web add -w .

# 3. restart DSH Web (the process serving http://127.0.0.1:3080), then refresh
```

After a successful install, `~/.dsh/profiles/web/package.json` lists the plugin
under both `dependencies` **and** `dsh.profile.bundles`. The GUI applies the
YoRHa layer on boot and follows the Appearance (light/dark) toggle.

Remove it with:

```powershell
dsh plugin --profile web remove -w dsh-plugin-yorha-ui
```

## Manual activation (no re-install)

If the package is already a dependency of the web profile (e.g. after an older
`dsh plugin ... add .`), you can enable it by inserting a row into the profile's
user patch layer `~/.dsh/profiles/web/cordis.patch.yml`:

```yaml
- insert:
    - id: ui-yorha
      name: 'dsh-plugin-yorha-ui'
```

Because the profile watches that file live, the loader picks the row up without
a restart (refresh the page afterwards); for a fresh bundle promotion a restart
is still required.

## What this package does

| Concern | Mechanism |
|---|---|
| GUI colors / typography / elevation | `src/client.ts` stacks an alias-token layer via the `theme` service (`theme.overrideTokens`) so it survives light/dark switching and the theme presenter's repaints. |
| Zero radius, flat shadows, industrial focus | A supplemental stylesheet under `body.dsh-plugin-yorha` (`YORHA_STRICT_CSS`). |
| Host half | Empty cordis plugin (`src/index.ts`): the row must exist on the host for the client-module loader to serve the browser half. |

The visual layer adds a subtle 32px registration grid and paper grain, a
segmented system rail across the top edge, hard three-column chassis lines, an
amber sidebar activity notch, a compact command-seat divider, and a
high-contrast terminal frame around the composer. Decorative marks use empty
CSS geometry so they do not add noise to the accessibility tree.

Token coverage: every `--dsw-alias-*` / `--dsw-specific-*` surface token, Shiki
syntax colors, scrollbars, elevation/shadow tokens, and the code font face.

Tune the palette in `src/client.ts` (remove the `--dsw-font-family` pair to
keep the stock UI font, adjust `YORHA_STRICT_CSS`, etc.), then rebuild and
`dsh plugin --profile web update -w dsh-plugin-yorha-ui` (or re-run the add).

## Scope

`src/prompt`, `src/tools`, `src/templates`, `src/theme/tokens.css` and
`src/types.ts` are earlier drafts of an agent-facing "skill" plugin. That API
(system-prompt/tool/theme/web services injected into one `apply()`) is **not**
how DSH loads GUI plugins and those files are not part of the build; they are
kept for reference only. Agent-level additions (a prompt section or validator
tool) belong to a separate agent-preset composition or a host tool plugin, not
to this theme bundle.

## License

MIT
