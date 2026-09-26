import { describe, expect, it } from "vitest";
import { buildStarterRepo, slugifySiteName } from "../shared/site";

describe("SiteRo site helpers", () => {
  it("normalizes names for free preview domains", () => {
    expect(slugifySiteName("  Northstar / Studio  ")).toBe("northstar-studio");
  });

  it("exports the current design as a four-file starter repo", () => {
    const repo = buildStarterRepo({
      name: "Northstar Studio",
      slug: "northstar-studio",
      headline: "Make space for better work.",
      subheadline: "A calm studio for brands.",
      cta: "See our approach",
      accent: "#275c4d",
    });

    expect(Object.keys(repo.files)).toEqual(["README.md", "index.html", "styles.css", "script.js"]);
    expect(repo.files["index.html"]).toContain("Make space for better work.");
    expect(repo.files["styles.css"]).toContain("#275c4d");
  });
});
