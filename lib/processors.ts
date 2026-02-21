export interface ProcessResult {
  output: string;
  error: string | null;
  /** 1-indexed line number of the error, if available */
  errorLine: number | null;
}

// ─── JSON Formatter ──────────────────────────────────────────────
export function formatJson(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const obj = JSON.parse(input);
    return { output: JSON.stringify(obj, null, 2), error: null, errorLine: null };
  } catch (e) {
    return parseJsonError(e);
  }
}

// ─── JSON Validator ──────────────────────────────────────────────
export function validateJson(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    JSON.parse(input);
    return { output: '✓ Valid JSON', error: null, errorLine: null };
  } catch (e) {
    return parseJsonError(e);
  }
}

// ─── JSON Minifier ───────────────────────────────────────────────
export function minifyJson(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const obj = JSON.parse(input);
    return { output: JSON.stringify(obj), error: null, errorLine: null };
  } catch (e) {
    return parseJsonError(e);
  }
}

// ─── JSON → XML ──────────────────────────────────────────────────
export function jsonToXml(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const obj = JSON.parse(input);
    const xml = toXml(obj, 'root', 0);
    return {
      output: '<?xml version="1.0" encoding="UTF-8"?>\n' + xml,
      error: null,
      errorLine: null,
    };
  } catch (e) {
    return parseJsonError(e);
  }
}

function toXml(value: unknown, tag: string, depth: number): string {
  const indent = '  '.repeat(depth);
  const inner = '  '.repeat(depth + 1);

  if (value === null || value === undefined) {
    return `${indent}<${tag} />\n`;
  }

  if (Array.isArray(value)) {
    let xml = `${indent}<${tag}>\n`;
    value.forEach((item, i) => {
      xml += toXml(item, `item_${i}`, depth + 1);
    });
    xml += `${indent}</${tag}>\n`;
    return xml;
  }

  if (typeof value === 'object') {
    let xml = `${indent}<${tag}>\n`;
    for (const [key, val] of Object.entries(value)) {
      const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
      xml += toXml(val, safeKey, depth + 1);
    }
    xml += `${indent}</${tag}>\n`;
    return xml;
  }

  const escaped = String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return `${indent}<${tag}>${escaped}</${tag}>\n`;
}

// ─── JSON → CSV ──────────────────────────────────────────────────
export function jsonToCsv(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const data = JSON.parse(input);
    const arr = Array.isArray(data) ? data : [data];
    if (arr.length === 0) return { output: '', error: null, errorLine: null };
    const headers = Array.from(new Set(arr.flatMap((row) => Object.keys(row))));
    const csvRows = [
      headers.map(escapeCsvField).join(','),
      ...arr.map((row) =>
        headers.map((h) => escapeCsvField(row[h] ?? '')).join(',')
      ),
    ];
    return { output: csvRows.join('\n'), error: null, errorLine: null };
  } catch (e) {
    return parseJsonError(e);
  }
}

function escapeCsvField(value: unknown): string {
  const str = typeof value === 'object' ? JSON.stringify(value) : String(value ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// ─── JSON → YAML ─────────────────────────────────────────────────
export function jsonToYaml(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const obj = JSON.parse(input);
    return { output: toYaml(obj, 0), error: null, errorLine: null };
  } catch (e) {
    return parseJsonError(e);
  }
}

function toYaml(value: unknown, indent: number): string {
  const pad = '  '.repeat(indent);
  if (value === null || value === undefined) return 'null\n';
  if (typeof value === 'boolean') return `${value}\n`;
  if (typeof value === 'number') return `${value}\n`;
  if (typeof value === 'string') {
    if (value.includes('\n') || value.includes(':') || value.includes('#')) {
      return `"${value.replace(/"/g, '\\"')}"\n`;
    }
    return `${value}\n`;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]\n';
    return value.map((item) => {
      const inner = toYaml(item, indent + 1);
      if (typeof item === 'object' && item !== null) {
        return `${pad}- ${inner.trimStart()}`;
      }
      return `${pad}- ${inner}`;
    }).join('');
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (entries.length === 0) return '{}\n';
    return entries.map(([key, val]) => {
      const inner = toYaml(val, indent + 1);
      if (typeof val === 'object' && val !== null) {
        return `${pad}${key}:\n${inner}`;
      }
      return `${pad}${key}: ${inner}`;
    }).join('');
  }
  return `${String(value)}\n`;
}

// ─── Base64 Encode / Decode ──────────────────────────────────────
export function base64Encode(input: string): ProcessResult {
  try {
    if (!input) return { output: '', error: null, errorLine: null };
    const encoded = btoa(
      new TextEncoder()
        .encode(input)
        .reduce((s, b) => s + String.fromCharCode(b), '')
    );
    return { output: encoded, error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: String(e), errorLine: null };
  }
}

export function base64Decode(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const binary = atob(input.trim());
    const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    return { output: decoded, error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: 'Invalid Base64 string', errorLine: null };
  }
}

// ─── Helpers ─────────────────────────────────────────────────────
function parseJsonError(e: unknown): ProcessResult {
  const msg = e instanceof Error ? e.message : String(e);
  const lineMatch = msg.match(/position\s+(\d+)/i);
  let errorLine: number | null = null;
  if (lineMatch) {
    // position is character offset — approximate line from that
    errorLine = null; // browser engines report position, not line
  }
  return { output: '', error: msg, errorLine };
}
