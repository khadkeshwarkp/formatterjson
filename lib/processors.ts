import yaml from 'js-yaml';

export interface ProcessResult {
  output: string;
  error: string | null;
  /** 1-indexed line number of the error, if available */
  errorLine: number | null;
}

// ─── JSON Diff ───────────────────────────────────────────────────
const DIFF_DELIMITER = '\n---\n';

export function jsonDiff(input: string): ProcessResult {
  try {
    const trimmed = input.trim();
    if (!trimmed) return { output: '', error: null, errorLine: null };
    const parts = trimmed.split(DIFF_DELIMITER);
    if (parts.length < 2) {
      return { output: '', error: 'Paste two JSON objects separated by "---" on its own line', errorLine: null };
    }
    const [leftStr, rightStr] = [parts[0].trim(), parts[1].trim()];
    const left = JSON.parse(leftStr);
    const right = JSON.parse(rightStr);
    const lines: string[] = [];
    const diff = compareValues(left, right, '');
    if (diff.added.length === 0 && diff.removed.length === 0 && diff.changed.length === 0) {
      return { output: '✓ No differences — both JSON objects are identical', error: null, errorLine: null };
    }
    diff.added.forEach(({ path, value }) => lines.push(`+ ${path}: ${formatValue(value)}`));
    diff.removed.forEach(({ path, value }) => lines.push(`- ${path}: ${formatValue(value)}`));
    diff.changed.forEach(({ path, oldVal, newVal }) =>
      lines.push(`~ ${path}:\n    - ${formatValue(oldVal)}\n    + ${formatValue(newVal)}`)
    );
    return { output: lines.join('\n'), error: null, errorLine: null };
  } catch (e) {
    return parseJsonError(e);
  }
}

function formatValue(v: unknown): string {
  if (v === null) return 'null';
  if (typeof v === 'string') return `"${v}"`;
  if (typeof v === 'object') return JSON.stringify(v).slice(0, 80) + (JSON.stringify(v).length > 80 ? '...' : '');
  return String(v);
}

interface DiffResult {
  added: { path: string; value: unknown }[];
  removed: { path: string; value: unknown }[];
  changed: { path: string; oldVal: unknown; newVal: unknown }[];
}

function compareValues(left: unknown, right: unknown, path: string): DiffResult {
  const result: DiffResult = { added: [], removed: [], changed: [] };
  if (typeof left !== 'object' || left === null || Array.isArray(left)) {
    if (typeof right !== 'object' || right === null || Array.isArray(right)) {
      if (JSON.stringify(left) !== JSON.stringify(right)) {
        result.changed.push({ path: path || 'root', oldVal: left, newVal: right });
      }
    } else {
      result.removed.push({ path: path || 'root', value: left });
      result.added.push({ path: path || 'root', value: right });
    }
    return result;
  }
  if (typeof right !== 'object' || right === null || Array.isArray(right)) {
    result.removed.push({ path: path || 'root', value: left });
    result.added.push({ path: path || 'root', value: right });
    return result;
  }
  const leftObj = left as Record<string, unknown>;
  const rightObj = right as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(leftObj), ...Object.keys(rightObj)]);
  for (const key of allKeys) {
    const p = path ? `${path}.${key}` : key;
    if (!(key in leftObj)) {
      result.added.push({ path: p, value: rightObj[key] });
    } else if (!(key in rightObj)) {
      result.removed.push({ path: p, value: leftObj[key] });
    } else {
      const l = leftObj[key];
      const r = rightObj[key];
      if (JSON.stringify(l) !== JSON.stringify(r)) {
        if (typeof l === 'object' && l !== null && !Array.isArray(l) && typeof r === 'object' && r !== null && !Array.isArray(r)) {
          const nested = compareValues(l, r, p);
          result.added.push(...nested.added);
          result.removed.push(...nested.removed);
          result.changed.push(...nested.changed);
        } else {
          result.changed.push({ path: p, oldVal: l, newVal: r });
        }
      }
    }
  }
  return result;
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

// ─── CSV → JSON ──────────────────────────────────────────────────
export function csvToJson(input: string): ProcessResult {
  try {
    const trimmed = input.trim();
    if (!trimmed) return { output: '', error: null, errorLine: null };
    const lines = trimmed.split(/\r?\n/).filter((l) => l.length > 0);
    if (lines.length === 0) return { output: '[]', error: null, errorLine: null };
    const headers = parseCsvLine(lines[0]);
    const rows = lines.slice(1).map((line) => {
      const vals = parseCsvLine(line);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = vals[i] ?? '';
      });
      return obj;
    });
    return { output: JSON.stringify(rows, null, 2), error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : String(e), errorLine: null };
  }
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === '"') {
      let val = '';
      i++;
      while (i < line.length) {
        if (line[i] === '"' && line[i + 1] === '"') {
          val += '"';
          i += 2;
        } else if (line[i] === '"') {
          i++;
          break;
        } else {
          val += line[i++];
        }
      }
      result.push(val);
    } else {
      const comma = line.indexOf(',', i);
      const end = comma === -1 ? line.length : comma;
      result.push(line.slice(i, end).trim());
      i = comma === -1 ? line.length : comma + 1;
    }
  }
  return result;
}

// ─── YAML Formatter ───────────────────────────────────────────────
export function yamlFormat(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const obj = yaml.load(input);
    const out = yaml.dump(obj, { indent: 2, lineWidth: -1 });
    return { output: out, error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : String(e), errorLine: null };
  }
}

// ─── YAML → JSON ──────────────────────────────────────────────────
export function yamlToJson(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const obj = yaml.load(input);
    return { output: JSON.stringify(obj, null, 2), error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : String(e), errorLine: null };
  }
}

// ─── JSON Schema Generator ────────────────────────────────────────
export function jsonSchemaGenerate(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const obj = JSON.parse(input);
    const schema = inferSchema(obj);
    return { output: JSON.stringify(schema, null, 2), error: null, errorLine: null };
  } catch (e) {
    return parseJsonError(e);
  }
}

function inferSchema(value: unknown): Record<string, unknown> {
  if (value === null) return { type: 'null' };
  if (typeof value === 'boolean') return { type: 'boolean' };
  if (typeof value === 'number') return { type: 'number' };
  if (typeof value === 'string') return { type: 'string' };
  if (Array.isArray(value)) {
    const itemSchema = value.length > 0 ? inferSchema(value[0]) : { type: 'string' };
    return { type: 'array', items: itemSchema };
  }
  if (typeof value === 'object') {
    const props: Record<string, unknown> = {};
    const required: string[] = [];
    for (const [k, v] of Object.entries(value)) {
      props[k] = inferSchema(v);
      required.push(k);
    }
    return { type: 'object', properties: props, required };
  }
  return { type: 'string' };
}

// ─── JWT Decode ───────────────────────────────────────────────────
export function jwtDecode(input: string): ProcessResult {
  try {
    const trimmed = input.trim();
    if (!trimmed) return { output: '', error: null, errorLine: null };
    const parts = trimmed.split('.');
    if (parts.length < 2) return { output: '', error: 'Invalid JWT: expected header.payload', errorLine: null };
    const base64UrlDecode = (s: string): string => {
      const base64 = s.replace(/-/g, '+').replace(/_/g, '/');
      const pad = base64.length % 4;
      const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
      const binary = atob(padded);
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    };
    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    const result = { header, payload };
    return { output: JSON.stringify(result, null, 2), error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : String(e), errorLine: null };
  }
}

// ─── XML Formatter ────────────────────────────────────────────────
export function xmlFormat(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/xml');
    if (doc.querySelector('parsererror')) {
      const msg = doc.querySelector('parsererror')?.textContent ?? 'XML parse error';
      return { output: '', error: msg, errorLine: null };
    }
    const formatted = formatXmlNode(doc.documentElement, 0);
    const decl = input.includes('<?xml') ? '<?xml version="1.0" encoding="UTF-8"?>\n' : '';
    return { output: decl + formatted, error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : String(e), errorLine: null };
  }
}

function formatXmlNode(node: Element, depth: number): string {
  const indent = '  '.repeat(depth);
  const attrs = Array.from(node.attributes)
    .map((a) => ` ${a.name}="${a.value.replace(/"/g, '&quot;')}"`)
    .join('');
  const children = Array.from(node.childNodes);
  const textChild = children.find((n) => n.nodeType === Node.TEXT_NODE);
  const text = textChild?.textContent?.trim() ?? '';
  const elemChildren = children.filter((n) => n.nodeType === Node.ELEMENT_NODE);
  if (elemChildren.length === 0) {
    if (text) return `${indent}<${node.tagName}${attrs}>${escapeXml(text)}</${node.tagName}>\n`;
    return `${indent}<${node.tagName}${attrs} />\n`;
  }
  let out = `${indent}<${node.tagName}${attrs}>\n`;
  for (const c of elemChildren) {
    out += formatXmlNode(c as Element, depth + 1);
  }
  return out + `${indent}</${node.tagName}>\n`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ─── XML Validator ────────────────────────────────────────────────
export function xmlValidate(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/xml');
    const err = doc.querySelector('parsererror');
    if (err) {
      return { output: '', error: err.textContent ?? 'Invalid XML', errorLine: null };
    }
    return { output: '✓ Valid XML', error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : String(e), errorLine: null };
  }
}

// ─── XML → JSON ───────────────────────────────────────────────────
export function xmlToJson(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/xml');
    if (doc.querySelector('parsererror')) {
      const msg = doc.querySelector('parsererror')?.textContent ?? 'XML parse error';
      return { output: '', error: msg, errorLine: null };
    }
    const obj = xmlElementToJson(doc.documentElement);
    return { output: JSON.stringify(obj, null, 2), error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : String(e), errorLine: null };
  }
}

function xmlElementToJson(el: Element): unknown {
  const attrs: Record<string, string> = {};
  for (const a of Array.from(el.attributes)) {
    attrs[`@${a.name}`] = a.value;
  }
  const childNodes = Array.from(el.childNodes);
  const textNodes = childNodes.filter((n) => n.nodeType === Node.TEXT_NODE);
  const text = textNodes.map((n) => n.textContent?.trim()).join('').trim();
  const elemChildren = childNodes.filter((n) => n.nodeType === Node.ELEMENT_NODE) as Element[];
  if (elemChildren.length === 0) {
    if (Object.keys(attrs).length === 0) return text || {};
    return { ...attrs, _: text || undefined };
  }
  const obj: Record<string, unknown> = { ...attrs };
  for (const c of elemChildren) {
    const key = c.tagName;
    const val = xmlElementToJson(c);
    if (obj[key] === undefined) {
      obj[key] = val;
    } else if (Array.isArray(obj[key])) {
      (obj[key] as unknown[]).push(val);
    } else {
      obj[key] = [obj[key], val];
    }
  }
  return obj;
}

// ─── URL Encode / Decode ──────────────────────────────────────────
export function urlEncode(input: string): ProcessResult {
  try {
    if (!input) return { output: '', error: null, errorLine: null };
    return { output: encodeURIComponent(input), error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: String(e), errorLine: null };
  }
}

export function urlDecode(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    return { output: decodeURIComponent(input.replace(/\+/g, ' ')), error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: 'Invalid URL-encoded string', errorLine: null };
  }
}

// ─── HTML Formatter ───────────────────────────────────────────────
export function htmlFormat(input: string): ProcessResult {
  try {
    if (!input.trim()) return { output: '', error: null, errorLine: null };
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    const html = doc.documentElement.outerHTML;
    // Simple indent formatter: add newlines and indent
    let out = '';
    let indent = 0;
    const parts = html.replace(/>\s*</g, '>\n<').split('\n');
    for (const part of parts) {
      const trimmed = part.trim();
      if (!trimmed) continue;
      if (trimmed.startsWith('</')) indent = Math.max(0, indent - 1);
      out += '  '.repeat(indent) + trimmed + '\n';
      if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.startsWith('<?') && !trimmed.endsWith('/>') && !/^<(meta|link|br|hr|input|img)\s/i.test(trimmed)) {
        indent++;
      }
    }
    return { output: out.trimEnd(), error: null, errorLine: null };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : String(e), errorLine: null };
  }
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
