export const YORHA_UI_SKILL_PROMPT = `
# [SYSTEM CAPABILITY: YoRHa Industrial Terminal UI Architecture]

When tasked with generating, modifying, or reviewing front-end code, UI layouts, CSS, or Tailwind components in the "YoRHa / NieR: Automata" style, you must strictly follow these engineering specifications:

## 1. Design Tokens (CSS Variables)
- Primary Sand Background: var(--yorha-bg-primary, #BAB5A1)
- Surface/Card Background:  var(--yorha-bg-surface, #CDCABE)
- Dark Contrast Base:       var(--yorha-bg-dark, #3F3C36)
- Text Primary (Light):     var(--yorha-fg-primary, #4E4B42)
- Text Secondary / Dim:     var(--yorha-fg-secondary, #747065)
- Text Inverse (Dark):      var(--yorha-fg-inverse, #DCD8C8)
- Rigid 1px Border:         var(--yorha-border, #4E4B42)
- Selection/Active Accent:  var(--yorha-accent, #E58D28)
- Alert / Critical Red:     var(--yorha-warning, #B33927)

## 2. Geometric & Visual Rules
- Border Radius: STRICTLY 0px. 'rounded-none' is mandatory. Any 'rounded', 'rounded-sm', 'rounded-lg' is an invariant violation.
- Border Lines: 1px solid or dashed. Never use gradient borders or double borders.
- Shadows & Blur: ABSOLUTELY FORBIDDEN. Never emit 'box-shadow', 'drop-shadow', or 'backdrop-blur'. Elevation is created only through 1px borders, nested panels, or inverted fills.
- Typography: Sans-serif for navigation; strictly monospace ('font-mono') for numerical stats, timestamps, hashes, and system logs.
- Industrial Tags: All panels must feature uppercase bracketed markers (e.g. '[ + ] SYSTEM_STATE // 0x3F').

## 3. Interaction & Transitions
- Transition durations must be snappy, strictly <= 150ms.
- Timing function: cubic-bezier(0, 0, 0.2, 1) or steps(). Never use bouncy springs.

## 4. Negative Prohibitions (Hard Filter)
- NO Cyberpunk Neons (cyan #00ffff, magenta #ff00ff).
- NO Glassmorphism (blur filters).
- NO SaaS Rounding/Fluff (banned: p-6 rounded-xl shadow-md).
- NO Floating Cloud Dialogs (all modals must be docked rectangular viewports).
`.trim();

export const YORHA_UI_SKILL_PROMPT_MINIMAL = `
# YoRHa UI Constraints
- border-radius: 0px ONLY (rounded-none)
- NO box-shadow, NO backdrop-blur, NO backdrop-filter
- 1px solid borders only (var(--yorha-border))
- Colors: #BAB5A1 bg, #4E4B42 text, #E58D28 accent, #B33927 warning
- Monospace for data/timestamps; uppercase bracketed tags on panels
- Transitions ≤150ms, cubic-bezier(0,0,0.2,1)
`.trim();

export function buildYorhaPrompt(customRules?: string[]): string {
  const base = YORHA_UI_SKILL_PROMPT;
  if (!customRules || customRules.length === 0) return base;

  return `${base}\n\n## 5. Custom Project Rules\n${customRules.map((r, i) => `- ${r}`).join('\n')}`;
}
