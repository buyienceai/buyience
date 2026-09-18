import type { BlogFaqItem } from "../components/BlogFaq";

type ParsedArticle = {
  body: string;
  faqTitle: string;
  faqItems: BlogFaqItem[];
};

/**
 * Extract a markdown FAQ block (`## FAQ…` / `## Frequently Asked Questions`
 * + `### Question?` answers) and leave the rest of the article intact.
 */
export function parseBlogFaq(source: string): ParsedArticle {
  // Use [ \t:]* (not \s) so the optional spacer cannot consume the newline
  // before the first ### question — e.g. `## FAQ's\n### What is…`.
  const match = source.match(
    /^## ((?:FAQ'?s?[ \t:]*[^\n]*|Frequently Asked Questions[^\n]*))\r?\n/im,
  );
  if (!match || match.index === undefined) {
    return { body: source, faqTitle: "Questions, answered", faqItems: [] };
  }

  // Marketing FaqSection always uses the same title; the MDX H2 is only a marker.
  const faqTitle = "Questions, answered";

  const afterHeading = source.slice(match.index + match[0].length);
  const nextH2 = afterHeading.search(/^## /m);
  const faqBlock = nextH2 === -1 ? afterHeading : afterHeading.slice(0, nextH2);
  const afterFaq = nextH2 === -1 ? "" : afterHeading.slice(nextH2);

  const faqItems: BlogFaqItem[] = [];
  const parts = faqBlock.split(/^### /m).slice(1);
  let trailingCta = "";

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const nl = part.indexOf("\n");
    const q = (nl === -1 ? part : part.slice(0, nl)).trim();
    let rest = nl === -1 ? "" : part.slice(nl + 1);

    if (i === parts.length - 1) {
      const ctaMatch = rest.match(
        /\n\n((?:Want to |Curious |Have a |Considering |Running |Have questions)[\s\S]*)$/i,
      );
      if (ctaMatch) {
        trailingCta = ctaMatch[1].trim();
        rest = rest.slice(0, ctaMatch.index).trimEnd();
      }
    }

    const a = rest.trim();
    if (!q || !a) continue;
    faqItems.push({ q, a });
  }

  const before = source.slice(0, match.index).trimEnd();
  const pieces = [before];
  if (trailingCta) pieces.push(trailingCta);
  if (afterFaq.trim()) pieces.push(afterFaq.trim());
  const body = pieces.join("\n\n");

  return { body, faqTitle, faqItems };
}
