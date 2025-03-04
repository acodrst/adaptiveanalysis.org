import { model_to_dots } from "text-model-dot"
import { gsdot_svg } from "gsdot-svg"
document.body.insertAdjacentHTML("beforeend", site.page);
document.getElementById("home").insertAdjacentHTML("beforeend", site.html);
const iframe = document.createElement("iframe");
iframe.srcdoc = site.viewer.replace("thisistss", t).replace("thisisadler", a)
  .replace("thisislength", g).replace("thisistextlength", tl);
iframe.id = "pdf_frame";
document.getElementById("pdf").appendChild(iframe);
const style = document.createElement("style");
style.textContent = site.css;
document.head.appendChild(style);
function svg_out() {
  const blob = new Blob([
    localStorage.getItem('svg_content'),
  ], { type: "text/plain;charset=utf-8" });
  saveAs(blob, localStorage.getItem("path"));
  history.back();
}
async function render(level) {
  document.getElementById("terms").style.display = "none";
  document.getElementById("pdf").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById("graph").style.display = "block";
  document.getElementById("path").style.display = "block";
  document.getElementById("content").style.gridRow = "3";
  const lev = [];
  const leva = [];
  for (const i of level.split(".")) {
    lev.push(i);
    leva.push(`<a href="#${lev.join(".")}">${i}</a>`);
  }
  localStorage.setItem("path", `${lev.join(".")}.svg`);
  document.getElementById("path").innerHTML = `${
    leva.join(".")
  } &nbsp; <a href="#export" title="Model">Export SVG</a>`;
  localStorage.setItem('svg_content', await gsdot_svg(model_to_dots(site.model).dots[level],'default','graph'));
}

function terms() {
  document.getElementById("terms").style.display = "block";
  document.getElementById("pdf").style.display = "none";
  document.getElementById("graph").style.display = "none";
  document.getElementById("path").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById("content").style.gridRow = "2/4";
}
function home() {
  document.getElementById("terms").style.display = "none";
  document.getElementById("pdf").style.display = "none";
  document.getElementById("graph").style.display = "none";
  document.getElementById("path").style.display = "none";
  document.getElementById("home").style.display = "block";
  document.getElementById("content").style.gridRow = "2/4";
}
function description() {
  document.getElementById("terms").style.display = "none";
  document.getElementById("pdf").style.display = "flex";
  document.getElementById("graph").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById("path").style.display = "none";
  document.getElementById("content").style.gridRow = "2/4";
}
refresh();
function refresh() {
  const hash = globalThis.location.hash.substring(1) || "home";
  hash == "terms"
    ? terms()
    : hash == "export"
    ? svg_out()
    : hash == "pdf"
    ? description()
    : hash.includes('Top')
    ? render(hash)
    : home();
}
globalThis.addEventListener("hashchange", () => {
  refresh();
});
