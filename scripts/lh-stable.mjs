import { execSync } from "child_process";
import fs from "fs";
import http from "http";

function warmup() {
  return new Promise((resolve, reject) => {
    http
      .get("http://localhost:3005/", (res) => {
        res.resume();
        res.on("end", resolve);
      })
      .on("error", reject);
  });
}

function summarize(file) {
  const r = JSON.parse(fs.readFileSync(file, "utf8"));
  const a = r.audits;
  const items = a["network-requests"]?.details?.items || [];
  return {
    perf: Math.round(r.categories.performance.score * 100),
    lcp: a["largest-contentful-paint"].displayValue,
    tbt: a["total-blocking-time"].displayValue,
    cls: a["cumulative-layout-shift"].displayValue,
    fcp: a["first-contentful-paint"].displayValue,
    fonts: items.filter((x) => x.resourceType === "Font").length,
    css: items
      .filter((x) => x.resourceType === "Stylesheet")
      .map((x) => x.url.split("/").pop()),
    cssBytes: items
      .filter((x) => x.resourceType === "Stylesheet")
      .reduce((s, i) => s + (i.transferSize || 0), 0),
    third: items.filter((x) =>
      /gtm|facebook|fbevents|vercel|speed-insights/i.test(x.url),
    ).length,
    totalBytes: items.reduce((s, i) => s + (i.transferSize || 0), 0),
  };
}

await warmup();
await new Promise((r) => setTimeout(r, 3000));

for (let i = 1; i <= 3; i++) {
  const out = `./lh-stable${i}.json`;
  try {
    execSync(
      `npx --yes lighthouse@12.8.2 http://localhost:3005/ --only-categories=performance --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --output=json --output-path=${out} --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet`,
      { stdio: "inherit" },
    );
  } catch (e) {
    // EPERM on temp cleanup is common on this machine; report may still exist
  }
  if (fs.existsSync(out)) {
    console.log(`RUN ${i}`, JSON.stringify(summarize(out)));
  } else {
    console.log(`RUN ${i} FAILED — no report`);
  }
  await new Promise((r) => setTimeout(r, 8000));
}
