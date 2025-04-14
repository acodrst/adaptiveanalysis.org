const emoji = "📉";
const domain = "adaptiveanalysis.org";
const backup = Deno.env.get("CL_ADA_BACKUP");
import { create, web_deal } from "fpng-sign-serve";
const site = {};
let p_c = [
  "--highlight-style=tango",
  "--pdf-engine=lualatex",
  "--pdf-engine-opt=-shell-escape",
  "--embed-resources",
  "--filter",
  "pandoc-crossref",
  "--filter",
  "src/filt.js",
  "--citeproc",
  "-o",
  "assets/lmp.pdf",
  "lmp.md",
  "assets/metadata.yaml",
];
console.log(`running pandoc ${p_c.join(" ")}`);
new Deno.Command("pandoc", {
  args: p_c,
}).outputSync();
p_c = [
  "--highlight-style=tango",
  "--filter",
  "pandoc-crossref",
  "--filter",
  "src/filt.js",
  "--citeproc",
  "-s",
  "-o",
  "assets/lmp_head.html",
  "--table-of-contents",
  "-t",
  "html5",
  "lmp.md",
  "assets/metadata.yaml",
];
console.log(`running pandoc ${p_c.join(" ")}`);
new Deno.Command("pandoc", {
  args: p_c,
}).outputSync();
site.pdf = Array.from(Deno.readFileSync("assets/lmp.pdf"));
site.viewer = Deno.readTextFileSync("assets/pdf_page.html");
site.page = Deno.readTextFileSync("assets/page.html");
let chompy=Deno.readTextFileSync("assets/lmp_head.html").match(
  /<header id="title-block-header">.+?<h1 class="title">/s,
)
site.html = chompy.input.slice(chompy.index+32,-22)
site.css = Deno.readTextFileSync("assets/style.css");
create(site,domain,backup,emoji)
Deno.serve({
  port: 3052,
  hostname: "0.0.0.0",
  handler: (req) => web_deal(req,domain),
});
