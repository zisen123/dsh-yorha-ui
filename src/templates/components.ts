// YoRHa Terminal UI Components - Template Definitions
// These are framework-agnostic template strings for code generation

export const YoRHaPanel = (props: {
  title: string;
  subtitle?: string;
  status?: 'active' | 'idle' | 'warning' | 'critical';
  children: string;
  className?: string;
}): string => {
  const statusClass = props.status ? ` ${props.status}` : '';
  const statusIndicator = props.status ? `
    <span class="status-indicator${statusClass}">
      ${props.status.toUpperCase()}
    </span>` : '';

  return `
<div class="yorha-panel${props.className ? ` ${props.className}` : ''}">
  <div class="yorha-panel-header">
    <span>${props.title}</span>
    ${statusIndicator}
  </div>
  <div class="yorha-panel-body">
    ${props.children}
  </div>
</div>`.trim();
};

export const YoRHaButton = (props: {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  children: string;
  onClick?: string;
  className?: string;
}): string => {
  const variantClass = props.variant ? ` ${props.variant}` : '';
  const disabledAttr = props.disabled ? ' disabled' : '';
  const clickHandler = props.onClick ? ` onclick="${props.onClick}"` : '';

  return `
<button class="yorha-btn${variantClass}${disabledAttr}"${clickHandler}>
  ${props.children}
</button>`.trim();
};

export const YoRHaLogView = (props: {
  entries: Array<{
    timestamp: string;
    level: 'info' | 'warn' | 'error' | 'debug';
    source: string;
    message: string;
  }>;
  maxLines?: number;
  className?: string;
}): string => {
  const entries = props.maxLines
    ? props.entries.slice(-props.maxLines)
    : props.entries;

  const rows = entries.map(entry => `
  <div class="yorha-log-entry ${entry.level}">
    <span class="timestamp">${entry.timestamp}</span>
    <span class="level ${entry.level}">${entry.level.toUpperCase()}</span>
    <span class="source">${entry.source}</span>
    <span class="message">${entry.message}</span>
  </div>`).join('');

  return `
<div class="yorha-log-view${props.className ? ` ${props.className}` : ''}">
${rows}
</div>`.trim();
};

export const YoRHaList = (props: {
  items: Array<{
    id: string;
    label: string;
    badge?: string;
    badgeVariant?: 'active' | 'warning' | 'idle';
    active?: boolean;
    onClick?: string;
  }>;
  className?: string;
}): string => {
  const rows = props.items.map(item => `
  <div class="yorha-list-item${item.active ? ' active' : ''}"${item.onClick ? ` onclick="${item.onClick}"` : ''}>
    <span>${item.label}</span>
    ${item.badge ? `<span class="badge ${item.badgeVariant || ''}">${item.badge}</span>` : ''}
  </div>`).join('');

  return `
<div class="yorha-list${props.className ? ` ${props.className}` : ''}">
${rows}
</div>`.trim();
};

export const YoRHaInput = (props: {
  placeholder?: string;
  value?: string;
  onChange?: string;
  className?: string;
}): string => {
  return `
<input
  type="text"
  class="yorha-input${props.className ? ` ${props.className}` : ''}"
  placeholder="${props.placeholder || ''}"
  value="${props.value || ''}"
  ${props.onChange ? `onchange="${props.onChange}"` : ''}
/>`.trim();
};

export const YoRHaTag = (props: {
  label: string;
  variant?: 'active' | 'warning' | 'idle';
  className?: string;
}): string => {
  const variantClass = props.variant ? ` ${props.variant}` : '';
  return `
<span class="yorha-tag${variantClass}${props.className ? ` ${props.className}` : ''}">
  ${props.label}
</span>`.trim();
};

export const YoRHaProgress = (props: {
  value: number;
  max?: number;
  variant?: 'default' | 'warning';
  className?: string;
}): string => {
  const percentage = Math.min(100, Math.max(0, (props.value / (props.max || 100)) * 100));
  const variantClass = props.variant ? ` ${props.variant}` : '';

  return `
<div class="yorha-progress${variantClass}${props.className ? ` ${props.className}` : ''}">
  <div class="yorha-progress-bar" style="width: ${percentage}%"></div>
</div>`.trim();
};

export const YoRHaTerminal = (props: {
  children: string;
  scanlines?: boolean;
  className?: string;
}): string => {
  const scanlinesClass = props.scanlines ? ' yorha-scanlines' : '';

  return `
<div class="yorha-terminal${scanlinesClass}${props.className ? ` ${props.className}` : ''}">
  ${props.children}
</div>`.trim();
};

// Complete page template
export const YoRHaPageTemplate = (props: {
  title: string;
  panels: Array<{
    title: string;
    content: string;
    status?: 'active' | 'idle' | 'warning' | 'critical';
  }>;
  scanlines?: boolean;
}): string => {
  const panelHtml = props.panels.map(p => YoRHaPanel({
    title: p.title,
    status: p.status,
    children: p.content
  })).join('\n\n');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${props.title}</title>
  <link rel="stylesheet" href="/yorha-tokens.css">
  <style>
    body { margin: 0; padding: 16px; min-height: 100vh; }
    .page-grid { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
  </style>
</head>
<body>
  ${YoRHaTerminal({
    children: `
    <div class="page-grid">
      ${panelHtml}
    </div>`,
    scanlines: props.scanlines
  })}
</body>
</html>`.trim();
};
