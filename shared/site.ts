export type StarterSite = {
  name: string;
  slug: string;
  headline: string;
  subheadline: string;
  cta: string;
  accent: string;
};

export function slugifySiteName(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function buildStarterRepo(site: StarterSite) {
  return {
    project: site.name,
    slug: site.slug,
    generatedAt: new Date().toISOString(),
    files: {
      "README.md": `# ${site.name}\n\nA starter site exported from SiteRo.\n`,
      "index.html": `<!-- ${site.name} starter page -->\n<h1>${site.headline}</h1>\n<p>${site.subheadline}</p>\n<button>${site.cta}</button>\n`,
      "styles.css": `:root { --accent: ${site.accent}; }\nbody { font-family: system-ui, sans-serif; }\n`,
      "script.js": `document.querySelector('button')?.addEventListener('click', () => console.log('Hello from ${site.name}'));\n`,
    },
  };
}
