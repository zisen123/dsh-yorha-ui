import { ValidationResult } from '../types.js';

export function validateYoRHaCode(code: string): ValidationResult {
  const violations: Array<{ rule: string; match: string; fix: string }> = [];

  // 1. 检查是否有圆角类名或 CSS
  const roundedRegex = /(rounded-(?:sm|md|lg|xl|2xl|3xl|full)|border-radius:\s*(?!0(?:px)?)[^;]+;)/gi;
  let match: RegExpExecArray | null;
  while ((match = roundedRegex.exec(code)) !== null) {
    violations.push({
      rule: 'NO_BORDER_RADIUS',
      match: match[0],
      fix: 'Replace with 0px / rounded-none'
    });
  }

  // 2. 检查阴影
  const shadowRegex = /(shadow-(?:sm|md|lg|xl|2xl|inner)|box-shadow:\s*(?!none)[^;]+;)/gi;
  while ((match = shadowRegex.exec(code)) !== null) {
    violations.push({
      rule: 'NO_BOX_SHADOW',
      match: match[0],
      fix: 'Remove shadow completely. Use 1px rigid borders instead.'
    });
  }

  // 3. 检查模糊效果 (毛玻璃)
  const blurRegex = /(backdrop-blur(?:-[a-z0-9]+)?|filter:\s*blur\([^)]+\)|backdrop-filter:[^;]+;)/gi;
  while ((match = blurRegex.exec(code)) !== null) {
    violations.push({
      rule: 'NO_GLASSMORPHISM',
      match: match[0],
      fix: 'Remove backdrop-blur. Use solid high-contrast surface fills.'
    });
  }

  // 4. 检查赛博朋克霓虹色
  const neonRegex = /(#00ffff|#ff00ff|cyan-(?:400|500)|fuchsia-(?:500|600))/gi;
  while ((match = neonRegex.exec(code)) !== null) {
    violations.push({
      rule: 'NO_CYBERPUNK_NEON',
      match: match[0],
      fix: 'Use #E58D28 for accents or #BAB5A1 / #4E4B42 for monochrome theme.'
    });
  }

  // 5. 检查柔和内边距模式
  const softPaddingRegex = /(p-(?:6|8|10|12|16)|padding:\s*(?:1\.5rem|2rem|2\.5rem|3rem|4rem))/gi;
  while ((match = softPaddingRegex.exec(code)) !== null) {
    violations.push({
      rule: 'NO_SOFT_SAAS_PADDING',
      match: match[0],
      fix: 'Use tight padding: p-2 / p-3 (8px/12px) for terminal density.'
    });
  }

  // 6. 检查圆角按钮/卡片模式
  const saasCardRegex = /(rounded-(?:lg|xl|2xl).*shadow|shadow.*rounded-(?:lg|xl|2xl))/gi;
  while ((match = saasCardRegex.exec(code)) !== null) {
    violations.push({
      rule: 'NO_SAAS_CARD_PATTERN',
      match: match[0],
      fix: 'Use .yorha-panel with clip-path cut-corner and 1px border.'
    });
  }

  // 7. 检查是否缺少工业标签
  const panelRegex = /<div[^>]*class="[^"]*panel[^"]*"[^>]*>/gi;
  let panelMatch: RegExpExecArray | null;
  let hasPanel = false;
  while ((panelMatch = panelRegex.exec(code)) !== null) {
    hasPanel = true;
    const panelContent = code.slice(panelMatch.index, panelMatch.index + 500);
    if (!/\[\s*\+\s*\]/.test(panelContent) && !/\[\s*-\s*\]/.test(panelContent)) {
      violations.push({
        rule: 'MISSING_INDUSTRIAL_TAG',
        match: panelMatch[0],
        fix: 'Add industrial tag like "[ + ] MODULE_NAME // 0xXX" in panel header.'
      });
    }
  }

  return {
    passed: violations.length === 0,
    violations
  };
}

export function formatValidationResult(result: ValidationResult): string {
  if (result.passed) {
    return '[YoRHa Protocol Status]: All constraints verified. Code passed inspection.';
  }

  const lines = [
    `[YoRHa Protocol Violation]: Found ${result.violations.length} prohibited pattern(s). Please refactor immediately.`,
    ''
  ];

  result.violations.forEach((v, i) => {
    lines.push(`${i + 1}. [${v.rule}]`);
    lines.push(`   Found: ${v.match}`);
    lines.push(`   Fix:   ${v.fix}`);
    lines.push('');
  });

  return lines.join('\n');
}

export function createValidatorTool() {
  return {
    name: 'yorha_validate_ui',
    description: 'Audit front-end HTML/CSS/Tailwind snippets against strict NieR:Automata YoRHa design constraints.',
    parameters: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'The HTML, JSX, CSS, or Tailwind markup to validate'
        }
      },
      required: ['code']
    },
    execute: async ({ code }: { code: string }) => {
      const result = validateYoRHaCode(code);
      return {
        compliant: result.passed,
        violations: result.violations,
        summary: formatValidationResult(result)
      };
    }
  };
}