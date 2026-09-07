import type { Context, Service } from '@deepseek-ai/cordis';

export interface PluginConfig {
  enableWebTheme?: boolean;
  enableSkillPrompt?: boolean;
  defaultMode?: 'light' | 'dark';
  promptPriority?: number;
}

export interface ValidationResult {
  passed: boolean;
  violations: Array<{
    rule: string;
    match: string;
    fix: string;
  }>;
}

export interface YoRHaTokens {
  light: {
    bgPrimary: string;
    bgSurface: string;
    bgDark: string;
    bgDarkSurface: string;
    fgPrimary: string;
    fgSecondary: string;
    fgInverse: string;
    border: string;
    accent: string;
    accentHover: string;
    warning: string;
    gridPattern: string;
  };
  dark: {
    bgPrimary: string;
    bgSurface: string;
    bgDark: string;
    bgDarkSurface: string;
    fgPrimary: string;
    fgSecondary: string;
    fgInverse: string;
    border: string;
    accent: string;
    accentHover: string;
    warning: string;
    gridPattern: string;
  };
}

export const YORHA_TOKENS: YoRHaTokens = {
  light: {
    bgPrimary: '#BAB5A1',
    bgSurface: '#CDCABE',
    bgDark: '#3F3C36',
    bgDarkSurface: '#4E4B42',
    fgPrimary: '#4E4B42',
    fgSecondary: '#747065',
    fgInverse: '#DCD8C8',
    border: '#4E4B42',
    accent: '#E58D28',
    accentHover: '#D07B18',
    warning: '#B33927',
    gridPattern: 'rgba(78, 75, 66, 0.07)'
  },
  dark: {
    bgPrimary: '#3F3C36',
    bgSurface: '#4E4B42',
    bgDark: '#292723',
    bgDarkSurface: '#36342E',
    fgPrimary: '#DCD8C8',
    fgSecondary: '#A09C8D',
    fgInverse: '#3F3C36',
    border: '#747065',
    accent: '#E58D28',
    accentHover: '#F29E3A',
    warning: '#D94834',
    gridPattern: 'rgba(220, 216, 200, 0.05)'
  }
};

export type ThemeMode = 'light' | 'dark';

export interface ComponentProps {
  className?: string;
  children?: string;
}

export interface PanelProps extends ComponentProps {
  title: string;
  subtitle?: string;
  status?: 'active' | 'idle' | 'warning' | 'critical';
}

export interface ButtonProps extends ComponentProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  onClick?: () => void;
}

export interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  source: string;
  message: string;
}

export interface LogViewProps extends ComponentProps {
  entries: LogEntry[];
  maxLines?: number;
  autoScroll?: boolean;
}

// Cordis service interfaces for type-safe injection
export interface SystemPromptService {
  add(section: { id: string; order: number; content: string }): void;
  remove(id: string): void;
}

export interface ToolsService {
  register(tool: ToolDefinition): void;
  unregister(name: string): void;
}

export interface ThemeService {
  register(theme: ThemeDefinition): void;
  unregister(id: string): void;
}

export interface WebService {
  addStyle(css: string): void;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: object;
  execute: (args: any) => Promise<any>;
}

export interface ThemeDefinition {
  id: string;
  label: string;
  mode: string;
  css: string;
}

// Extended Context type with our services
export interface YoRHaContext extends Context {
  systemPrompt?: SystemPromptService;
  tools?: ToolsService;
  theme?: ThemeService;
  web?: WebService;
}