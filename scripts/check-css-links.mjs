import http from "http";

function get(path) {
  return new Promise((res, rej) => {
    http
      .get("http://localhost:3005" + path, (r) => {
        let d = "";
        r.on("data", (c) => (d += c));
        r.on("end", () => res(d));
      })
      .on("error", rej);
  });
}

for (const p of ["/", "/pricing", "/about", "/ai-quote-engine"]) {
  const html = await get(p);
  const css = [...html.matchAll(/\/_next\/static\/chunks\/[^"']+\.css/g)].map(
    (m) => m[0],
  );
  console.log(p, css.length, css.map((c) => c.split("/").pop()).join(", "));
}
