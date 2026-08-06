export function getJournalHeadingId(text: string, index: number) {
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `journal-section-${slug || "section"}-${index + 1}`;
}
