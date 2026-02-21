export interface ToolMeta {
  id: string;
  name: string;
  route: string;
  category: 'json' | 'encoding';
  description: string;
  shortDescription: string;
  icon: string;
  keywords: string[];
  sampleInput: string;
  sampleOutput: string;
  faq: { q: string; a: string }[];
  relatedTools: string[];
  seoH1: string;
  seoExtra: {
    comparisonTitle: string;
    comparisonRows: { label: string; left: string; right: string }[];
    commonErrors: string[];
    useCases: string[];
    longDescription: string;
  };
}

export const TOOLS: ToolMeta[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    route: '/json-formatter',
    category: 'json',
    description:
      'Format and beautify your JSON data with proper indentation. Paste raw JSON and get a clean, readable output instantly.',
    shortDescription: 'Beautify JSON with proper indentation',
    icon: '{ }',
    keywords: ['json', 'formatter', 'beautify', 'prettify', 'indent', 'pretty print'],
    sampleInput: '{"name":"John Doe","age":30,"address":{"street":"123 Main St","city":"Springfield"},"hobbies":["reading","gaming","cooking"]}',
    sampleOutput: '{\n  "name": "John Doe",\n  "age": 30,\n  "address": {\n    "street": "123 Main St",\n    "city": "Springfield"\n  },\n  "hobbies": [\n    "reading",\n    "gaming",\n    "cooking"\n  ]\n}',
    seoH1: 'JSON Formatter — Beautify & Pretty Print JSON Online Free',
    seoExtra: {
      comparisonTitle: 'Formatted vs Minified JSON',
      comparisonRows: [
        { label: 'Readability', left: 'Easy to read and debug', right: 'Hard to read' },
        { label: 'File Size', left: 'Larger due to whitespace', right: 'Smallest possible' },
        { label: 'Use Case', left: 'Development, debugging, code review', right: 'Production, APIs, storage' },
        { label: 'Indentation', left: '2 or 4 spaces per level', right: 'No indentation' },
        { label: 'Line Breaks', left: 'One property per line', right: 'Single line' },
      ],
      commonErrors: [
        'Trailing commas after the last property in an object or array are not valid JSON',
        'Single quotes around strings — JSON requires double quotes',
        'Unquoted property keys — all JSON keys must be wrapped in double quotes',
        'Missing commas between properties or array elements',
        'Comments (// or /* */) are not allowed in standard JSON',
      ],
      useCases: [
        'Debugging API responses by making minified JSON readable',
        'Preparing JSON configuration files for code review',
        'Formatting database exports for analysis',
        'Making JSON payloads readable in documentation',
        'Cleaning up JSON output from command-line tools',
      ],
      longDescription: 'JSON (JavaScript Object Notation) is the most widely used data interchange format on the web. When JSON is transmitted over networks or stored in databases, it is often minified to save bandwidth. Our JSON Formatter tool takes compressed or unformatted JSON and transforms it into a clean, indented structure with 2-space indentation, proper line breaks, and consistent formatting. This makes it easy to visually inspect nested objects, debug API responses, and prepare configuration files for version control. The formatter handles all valid JSON types including strings, numbers, booleans, null values, arrays, and deeply nested objects. Processing happens entirely in your browser using the native JSON.parse and JSON.stringify APIs, so your data remains private and never touches any server.',
    },
    faq: [
      {
        q: 'What is JSON Formatter?',
        a: 'JSON Formatter is a free online tool that takes raw or minified JSON data and formats it with proper indentation and line breaks, making it easy to read and debug.',
      },
      {
        q: 'How do I format JSON online?',
        a: 'Paste your JSON into the editor on the left panel and press Ctrl+Enter or click the Run button. The formatted output with proper indentation appears instantly in the right panel.',
      },
      {
        q: 'Is my JSON data safe when using this tool?',
        a: 'Yes. All processing happens entirely in your browser using JavaScript. No data is ever sent to any server. You can verify this by checking the Network tab in your browser DevTools.',
      },
      {
        q: 'What indentation does the JSON formatter use?',
        a: 'The formatter uses 2-space indentation by default. Each nested level of objects and arrays is indented by 2 additional spaces for clear visual hierarchy.',
      },
      {
        q: 'Can I format invalid JSON?',
        a: 'No. The formatter requires valid JSON as input. If your JSON has syntax errors like trailing commas, unquoted keys, or single quotes, you will see an error message. Use our JSON Validator to identify the exact errors first.',
      },
    ],
    relatedTools: ['json-validator', 'json-minifier', 'json-to-xml'],
  },
  {
    id: 'json-validator',
    name: 'JSON Validator',
    route: '/json-validator',
    category: 'json',
    description:
      'Validate your JSON data and get detailed error messages with line numbers. Instantly find syntax errors in any JSON string.',
    shortDescription: 'Validate JSON and find syntax errors',
    icon: '✓',
    keywords: ['json', 'validator', 'lint', 'check', 'syntax', 'verify'],
    sampleInput: '{"name": "Test", "items": [1, 2, 3], "valid": true}',
    sampleOutput: '✓ Valid JSON',
    seoH1: 'JSON Validator — Check & Validate JSON Syntax Online Free',
    seoExtra: {
      comparisonTitle: 'JSON Validator vs JSON Formatter',
      comparisonRows: [
        { label: 'Purpose', left: 'Checks if JSON is syntactically correct', right: 'Reformats valid JSON with indentation' },
        { label: 'Output', left: 'Valid/Invalid status with error details', right: 'Reformatted JSON string' },
        { label: 'Modifies Input', left: 'No — read-only check', right: 'Yes — reformats whitespace' },
        { label: 'Error Reporting', left: 'Detailed error messages with position', right: 'Only shows parsing errors' },
        { label: 'Best For', left: 'Debugging broken JSON', right: 'Making valid JSON readable' },
      ],
      commonErrors: [
        'Trailing comma after the last element — remove the comma before the closing bracket',
        'Single quotes instead of double quotes — JSON strictly requires double quotes for strings and keys',
        'Missing closing brackets — every { must have a matching } and every [ must have a matching ]',
        'Undefined or NaN values — these are not valid JSON; use null instead',
        'Unescaped special characters in strings — backslashes, newlines, and tabs must be escaped',
      ],
      useCases: [
        'Debugging API response errors before processing in your application',
        'Validating JSON configuration files before deployment',
        'Checking JSON payloads before sending POST/PUT requests',
        'Verifying JSON data exported from databases or spreadsheets',
        'Testing JSON output from code generators and templating systems',
      ],
      longDescription: 'JSON validation is a critical step in any development workflow that involves data interchange. Even a single misplaced comma, missing bracket, or unquoted key can cause an entire API request to fail or a configuration file to be rejected. Our JSON Validator parses your input using the browser\'s native JSON.parse engine and reports the exact error type and character position when validation fails. Unlike basic syntax checkers, this tool provides human-readable error messages that help you pinpoint problems quickly. For valid JSON, you get a clear confirmation message. The validator handles all JSON data types and structures including deeply nested objects, large arrays, Unicode characters, and escaped sequences. Because all validation happens in your browser, there is zero latency and your sensitive data never leaves your machine.',
    },
    faq: [
      {
        q: 'What is JSON Validator?',
        a: 'JSON Validator is a free online tool that checks whether your JSON string is syntactically correct. It highlights exact error positions with detailed messages to help you fix issues quickly.',
      },
      {
        q: 'What types of errors can it detect?',
        a: 'It detects all JSON syntax errors including missing brackets, trailing commas, unquoted keys, invalid escape sequences, duplicate keys, and improperly nested structures.',
      },
      {
        q: 'Does JSON Validator modify my data?',
        a: 'No. The validator is read-only — it only checks your JSON for errors and never changes your input data. If you want to reformat your JSON, use the JSON Formatter.',
      },
      {
        q: 'What is the difference between JSON Validator and JSON Lint?',
        a: 'JSON Lint is another name for JSON validation. Our JSON Validator performs the same function as JSONLint — it parses your JSON and reports syntax errors. Both terms refer to checking JSON for correctness.',
      },
      {
        q: 'Can I validate very large JSON files?',
        a: 'Yes. Since validation runs in your browser, it can handle large JSON files limited only by your browser\'s memory. For files over 10MB, processing may take a few seconds.',
      },
    ],
    relatedTools: ['json-formatter', 'json-minifier', 'json-to-xml'],
  },
  {
    id: 'json-minifier',
    name: 'JSON Minifier',
    route: '/json-minifier',
    category: 'json',
    description:
      'Minify JSON by removing all whitespace and line breaks. Reduce file size for storage, APIs, and network transmission.',
    shortDescription: 'Minify JSON to reduce size',
    icon: '⊟',
    keywords: ['json', 'minifier', 'compress', 'compact', 'minimize', 'uglify'],
    sampleInput: '{\n  "name": "John Doe",\n  "age": 30,\n  "address": {\n    "street": "123 Main St",\n    "city": "Springfield"\n  }\n}',
    sampleOutput: '{"name":"John Doe","age":30,"address":{"street":"123 Main St","city":"Springfield"}}',
    seoH1: 'JSON Minifier — Compress & Minify JSON Online Free',
    seoExtra: {
      comparisonTitle: 'Minified vs Formatted JSON',
      comparisonRows: [
        { label: 'File Size', left: 'Smallest possible', right: 'Larger due to whitespace' },
        { label: 'Readability', left: 'Not human-readable', right: 'Easy to read' },
        { label: 'Use Case', left: 'APIs, storage, production', right: 'Development, debugging' },
        { label: 'Bandwidth', left: 'Reduces network transfer', right: 'Uses more bandwidth' },
        { label: 'Performance', left: 'Faster parsing (fewer characters)', right: 'Slightly slower parsing' },
      ],
      commonErrors: [
        'Input must be valid JSON — minification fails if the JSON has syntax errors',
        'Minification does not remove data — it only strips whitespace characters',
        'Unicode characters are preserved exactly as they appear in the original',
        'Numeric precision is maintained — no rounding or truncation occurs',
        'Empty objects {} and empty arrays [] remain unchanged after minification',
      ],
      useCases: [
        'Reducing JSON payload size before sending API requests',
        'Compressing JSON configuration files for production deployment',
        'Minimizing localStorage usage in web applications',
        'Preparing JSON data for embedding in HTML or JavaScript',
        'Reducing bandwidth costs for JSON-heavy API endpoints',
      ],
      longDescription: 'JSON minification is the process of removing all unnecessary whitespace, line breaks, and indentation from a JSON string while preserving its data integrity. This produces the most compact valid JSON representation, which is critical for reducing bandwidth usage in API responses, minimizing storage costs in databases, and improving parse performance in client-side applications. Our JSON Minifier processes your data entirely in the browser — it parses the JSON into a JavaScript object and re-serializes it without any formatting. The output is guaranteed to be valid JSON with identical data to the original. Typical size reductions range from 20% to 60% depending on the original formatting. For production APIs that serve millions of requests, even small per-response savings add up to significant bandwidth and cost reductions.',
    },
    faq: [
      {
        q: 'What is JSON Minifier?',
        a: 'JSON Minifier is a free tool that compresses JSON by stripping all unnecessary whitespace, line breaks, and indentation to produce the smallest valid JSON string possible.',
      },
      {
        q: 'Why should I minify JSON?',
        a: 'Minified JSON uses less bandwidth and storage. It is ideal for API responses, configuration payloads, embedding in scripts, and any scenario where file size matters.',
      },
      {
        q: 'Does minification change my data?',
        a: 'No. Only whitespace characters are removed. All data values, structure, key names, and nesting remain identical. You can always re-format minified JSON back to readable form.',
      },
      {
        q: 'How much smaller does JSON get after minification?',
        a: 'Typical size reductions range from 20% to 60%, depending on how much indentation and formatting the original JSON contained. Deeply nested JSON with large indentation sees the biggest reductions.',
      },
      {
        q: 'Is JSON Minifier the same as JSON Compressor?',
        a: 'JSON minification and compression are often used interchangeably, but technically minification removes whitespace while compression (like gzip) uses algorithms to further reduce size. This tool performs minification.',
      },
    ],
    relatedTools: ['json-formatter', 'json-validator', 'json-to-xml'],
  },
  {
    id: 'json-to-xml',
    name: 'JSON to XML',
    route: '/json-to-xml',
    category: 'json',
    description:
      'Convert JSON data to well-formed XML. Supports nested objects, arrays, and all JSON value types with proper indentation.',
    shortDescription: 'Convert JSON to XML format',
    icon: '⇄',
    keywords: ['json', 'xml', 'convert', 'transform', 'export', 'converter'],
    sampleInput: '{"bookstore":{"book":[{"title":"The Great Gatsby","author":"F. Scott Fitzgerald","year":1925},{"title":"1984","author":"George Orwell","year":1949}]}}',
    sampleOutput: '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n  <bookstore>\n    <book>\n      <item_0>\n        <title>The Great Gatsby</title>\n        <author>F. Scott Fitzgerald</author>\n        <year>1925</year>\n      </item_0>\n    </book>\n  </bookstore>\n</root>',
    seoH1: 'JSON to XML Converter — Convert JSON to XML Online Free',
    seoExtra: {
      comparisonTitle: 'JSON vs XML Comparison',
      comparisonRows: [
        { label: 'Syntax', left: 'Key-value pairs, arrays', right: 'Tags with attributes' },
        { label: 'Readability', left: 'More compact', right: 'More verbose' },
        { label: 'Data Types', left: 'String, number, boolean, null, array, object', right: 'All text (needs schema for types)' },
        { label: 'File Size', left: 'Smaller', right: 'Larger due to closing tags' },
        { label: 'Parsing', left: 'Native in JavaScript', right: 'Requires XML parser' },
        { label: 'Comments', left: 'Not supported', right: 'Supported' },
      ],
      commonErrors: [
        'Invalid JSON input — make sure your JSON is valid before converting',
        'Keys with special characters get sanitized (spaces become underscores)',
        'Arrays produce <item_0>, <item_1> elements — not repeated same-name tags',
        'Null values produce self-closing tags like <field />',
        'Root element is always <root> — rename after export if needed',
      ],
      useCases: [
        'Migrating data from JSON-based APIs to XML-based legacy systems',
        'Generating XML feeds from JSON data sources',
        'Converting JSON configuration to XML format for Java/.NET applications',
        'Creating SOAP payloads from RESTful JSON responses',
        'Exporting data for systems that only accept XML input',
      ],
      longDescription: 'JSON and XML are the two most common data interchange formats used in software development. While JSON dominates modern web APIs due to its compact syntax and native JavaScript support, many enterprise systems, SOAP web services, and legacy applications still require XML. Our JSON to XML converter bridges this gap by transforming any valid JSON structure into well-formed, properly indented XML. The conversion handles all JSON types: strings become text content, numbers and booleans become text nodes, null values produce self-closing tags, arrays are wrapped with indexed child elements, and nested objects create hierarchical XML elements. Special characters in keys are automatically sanitized to produce valid XML element names. The output includes an XML declaration header and uses 2-space indentation for readability.',
    },
    faq: [
      {
        q: 'How does JSON to XML conversion work?',
        a: 'Each JSON key becomes an XML element name. String, number, and boolean values become text content. Arrays are wrapped in a parent element with numbered child items (item_0, item_1). Null values produce self-closing tags.',
      },
      {
        q: 'Does it handle deeply nested JSON?',
        a: 'Yes. The converter recursively processes all levels of nesting. Deeply nested objects and arrays are converted into properly indented, hierarchical XML elements.',
      },
      {
        q: 'Can I convert XML back to JSON?',
        a: 'This tool currently only converts JSON to XML. An XML to JSON converter is planned for a future release. You can use other tools in the meantime for the reverse conversion.',
      },
      {
        q: 'What happens to special characters in JSON keys?',
        a: 'JSON keys containing spaces, dots, or other special characters are automatically sanitized. Non-alphanumeric characters (except hyphens and underscores) are replaced with underscores to produce valid XML element names.',
      },
      {
        q: 'Is the output valid XML?',
        a: 'Yes. The output includes a proper XML declaration (<?xml version="1.0" encoding="UTF-8"?>) and all elements are properly nested and closed. Special characters in values are escaped using XML entities (&amp; &lt; &gt;).',
      },
    ],
    relatedTools: ['json-formatter', 'json-validator', 'json-minifier'],
  },
  {
    id: 'base64',
    name: 'Base64 Encode/Decode',
    route: '/base64',
    category: 'encoding',
    description:
      'Encode text to Base64 or decode Base64 strings back to plain text. Supports full UTF-8 encoding for multi-byte characters.',
    shortDescription: 'Encode and decode Base64 strings',
    icon: 'B64',
    keywords: ['base64', 'encode', 'decode', 'binary', 'text', 'encoder', 'decoder'],
    sampleInput: 'Hello, World! This is a test string for Base64 encoding.',
    sampleOutput: 'SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgdGVzdCBzdHJpbmcgZm9yIEJhc2U2NCBlbmNvZGluZy4=',
    seoH1: 'Base64 Encoder & Decoder — Encode and Decode Base64 Online Free',
    seoExtra: {
      comparisonTitle: 'Base64 vs Plain Text',
      comparisonRows: [
        { label: 'Characters Used', left: 'A-Z, a-z, 0-9, +, /, = (64 chars)', right: 'Full ASCII/Unicode range' },
        { label: 'Size', left: '~33% larger than original', right: 'Original size' },
        { label: 'Binary Safe', left: 'Yes — any binary data can be encoded', right: 'No — binary data may be corrupted' },
        { label: 'Transport Safe', left: 'Safe for email, URLs, JSON', right: 'May break in certain transports' },
        { label: 'Encryption', left: 'No — Base64 is encoding, not encryption', right: 'N/A' },
      ],
      commonErrors: [
        'Base64 is encoding, not encryption — do not use it to protect sensitive data',
        'Invalid Base64 strings cause decode errors — ensure the input has valid characters and correct padding',
        'Line breaks in Base64 strings may cause issues — remove them before decoding',
        'Non-ASCII characters require UTF-8 encoding before Base64 encoding',
        'Missing padding characters (=) at the end may produce incorrect decode results',
      ],
      useCases: [
        'Encoding images or files for embedding in HTML data URIs',
        'Encoding binary attachments for email (MIME) transport',
        'Creating Base64-encoded API authentication tokens',
        'Encoding data for safe inclusion in JSON strings',
        'Debugging encoded values in JWT tokens, cookies, and API headers',
      ],
      longDescription: 'Base64 is a binary-to-text encoding scheme that converts binary data into a string of printable ASCII characters. It uses a 64-character alphabet (A-Z, a-z, 0-9, +, /) plus = for padding. Base64 encoding is essential in web development for embedding binary data in text-based formats like HTML, CSS, JSON, and email. Common use cases include data URIs for inline images, MIME encoding for email attachments, encoding binary API payloads, and debugging JWT tokens. Our encoder handles full UTF-8 text by first converting multi-byte characters to their byte representation before encoding. The decoder reverses this process, properly handling UTF-8 byte sequences. Base64 encoding increases data size by approximately 33%, which is the trade-off for transport safety. Remember that Base64 is not encryption — it is a reversible encoding scheme that provides no security.',
    },
    faq: [
      {
        q: 'What is Base64 encoding?',
        a: 'Base64 is a binary-to-text encoding scheme that represents binary data as printable ASCII characters using a 64-character alphabet. It is commonly used in emails, data URIs, API tokens, and JWT.',
      },
      {
        q: 'How do I switch between encode and decode mode?',
        a: 'Use the mode toggle (Encode/Decode) above the editor. In Encode mode, your input is plain text and the output is Base64. In Decode mode, the input is Base64 and the output is plain text.',
      },
      {
        q: 'Does this tool support UTF-8 characters?',
        a: 'Yes. The tool uses the TextEncoder and TextDecoder APIs to properly handle multi-byte UTF-8 characters including emojis, Chinese characters, Arabic text, and other Unicode content.',
      },
      {
        q: 'Is Base64 the same as encryption?',
        a: 'No. Base64 is encoding, not encryption. Anyone can decode a Base64 string without any key. Never use Base64 to protect sensitive data — use proper encryption algorithms like AES instead.',
      },
      {
        q: 'Why does Base64 make the data larger?',
        a: 'Base64 encoding represents every 3 bytes of input as 4 ASCII characters, resulting in approximately 33% size increase. This is the trade-off for making binary data safe to transmit through text-based protocols.',
      },
    ],
    relatedTools: ['json-formatter', 'json-minifier', 'json-validator'],
  },
];

export const TOOL_MAP = Object.fromEntries(TOOLS.map((t) => [t.id, t]));

export const CATEGORIES = [
  { id: 'json', label: 'JSON Tools' },
  { id: 'encoding', label: 'Encoding' },
] as const;
