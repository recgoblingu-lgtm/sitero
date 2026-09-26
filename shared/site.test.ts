import { describe, expect, it } from "vitest";
import { buildStarterRepo, slugifySiteName } from "./site";

describe("SiteRo shared site helpers", () => {
  it("turns a site name into a safe free-domain slug", () => {
    expect(slugifySiteName("  Northstar / Studio  ")).toBe("northstar-studio");
    expect(slugifySiteName("A very long site name with punctuation!"))
      .toBe("a-very-long-site-name-with-punctuation");
  });

  it("creates a portable starter repo with the current site content", () => {
    const repo = buildStarterRepo({
      name: "Northstar Studio",
      slug: "northstar-studio",
      headline: "Make space for better work.",
      subheadline: "A calm studio for brands.",
      cta: "See our approach",
      accent: "#275c4d",
    });

    expect(repo.project).toBe("Northstar Studio");
    expect(Object.keys(repo.files)).toEqual(["README.md", "index.html", "styles.css", "script.js"]);
    expect(repo.files["index.html"]).toContain("Make space for better work.");
    expect(repo.files["styles.css"]).toContain("#275c4d");
  });
});
