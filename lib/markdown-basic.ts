export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

/** Stable URL-safe id from heading text (strips simple markdown markers). */
export function slugifyHeading(text: string): string {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Collect h2–h4 headings for the right-hand "On this page" nav. */
export function extractToc(md: string): TocItem[] {
  const items: TocItem[] = [];
  const seen = new Map<string, number>();
  for (const line of md.replace(/\r\n/g, "\n").split("\n")) {
    if (line.startsWith("```")) continue;
    const match = /^(#{2,4})\s+(.+)$/.exec(line);
    if (!match) continue;
    const level = match[1].length as 2 | 3 | 4;
    const text = match[2].trim();
    let id = slugifyHeading(text) || "section";
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;
    items.push({ id, text, level });
  }
  return items;
}

/**
 * Minimal Markdown → HTML for trusted admin docs (no user input).
 * Supports headings, paragraphs, lists, tables, fenced code, links, bold, hr, inline code.
 */
export function markdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let inCode = false;
  let codeLang = "";
  let codeLines: string[] = [];
  let inUl = false;
  let inOl = false;
  let tableRows: string[][] = [];
  let inTable = false;
  const headingIds = new Map<string, number>();
  const headingIdFor = (text: string) => {
    let id = slugifyHeading(text) || "section";
    const count = headingIds.get(id) ?? 0;
    headingIds.set(id, count + 1);
    if (count > 0) id = `${id}-${count + 1}`;
    return id;
  };

  const closeLists = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      out.push("</ol>");
      inOl = false;
    }
  };

  const flushTable = () => {
    if (!inTable || tableRows.length === 0) {
      tableRows = [];
      inTable = false;
      return;
    }
    const [header, ...body] = tableRows;
    const isSep = (row: string[]) => row.every((c) => /^:?-+:?$/.test(c.trim()));
    const rows = body[0] && isSep(body[0]) ? body.slice(1) : body;
    out.push("<table><thead><tr>");
    for (const cell of header) out.push(`<th>${inline(cell.trim())}</th>`);
    out.push("</tr></thead><tbody>");
    for (const row of rows) {
      out.push("<tr>");
      for (const cell of row) out.push(`<td>${inline(cell.trim())}</td>`);
      out.push("</tr>");
    }
    out.push("</tbody></table>");
    tableRows = [];
    inTable = false;
  };

  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const inline = (s: string) => {
    let t = escapeHtml(s);
    t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    t = t.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2">$1</a>',
    );
    return t;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      if (inCode) {
        out.push(
          `<pre><code class="language-${escapeHtml(codeLang)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`,
        );
        codeLines = [];
        codeLang = "";
        inCode = false;
      } else {
        closeLists();
        flushTable();
        inCode = true;
        codeLang = line.slice(3).trim();
      }
      i += 1;
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      i += 1;
      continue;
    }

    if (/^\|(.+)\|$/.test(line.trim()) || (line.includes("|") && /^\s*\|/.test(line))) {
      closeLists();
      const cells = line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|");
      if (!inTable) inTable = true;
      tableRows.push(cells);
      i += 1;
      continue;
    }

    if (inTable) flushTable();

    if (/^---+$/.test(line.trim())) {
      closeLists();
      out.push("<hr />");
      i += 1;
      continue;
    }

    const heading = /^(#{1,4})\s+(.+)$/.exec(line);
    if (heading) {
      closeLists();
      const level = heading[1].length;
      const rawText = heading[2].trim();
      const id = headingIdFor(rawText);
      out.push(
        `<h${level} id="${escapeHtml(id)}">${inline(rawText)}</h${level}>`,
      );
      i += 1;
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      if (inOl) {
        out.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${inline(line.replace(/^[-*]\s+/, ""))}</li>`);
      i += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      if (inUl) {
        out.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        out.push("<ol>");
        inOl = true;
      }
      out.push(`<li>${inline(line.replace(/^\d+\.\s+/, ""))}</li>`);
      i += 1;
      continue;
    }

    if (line.trim() === "") {
      closeLists();
      i += 1;
      continue;
    }

    closeLists();
    out.push(`<p>${inline(line)}</p>`);
    i += 1;
  }

  closeLists();
  flushTable();
  if (inCode) {
    out.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  }

  return out.join("\n");
}
