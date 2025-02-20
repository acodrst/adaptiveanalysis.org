import * as d3 from "d3";
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
  const svg = d3.select("#graph svg");
  const blob = new Blob([
    svg.node().outerHTML,
  ], { type: "text/plain;charset=utf-8" });
  saveAs(blob, localStorage.getItem("path"));
  history.back()
}
function render(level) {
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
  document.getElementById("graph").innerHTML = site.diagrams[level];
  const gr = d3.select("#graph svg");
  const zoom = d3.zoom()
    .on("zoom", zoomed);
  function zoomed(e) {
    gr.attr("transform", e.transform);
  }
  d3.select("#graph").call(zoom);
  gr.selectAll(".node")
    .each(function () {
      const node = d3.select(this);
      if (node.attr("class").includes("datastores")) {
        const pl = node.selectAll("polyline");
        pl.attr("stroke-dasharray", "3,3");
      }
      if (
        node.attr("class").includes("transform") ||
        node.attr("class").includes("process")
      ) {
        const bbox = node.node().getBBox();
        bar = node.attr("class").includes("transform") ? "3,0" : "3,3";
        node.append("line")
          .attr("x1", bbox.x)
          .attr("y1", bbox.y + 17)
          .attr("x2", bbox.x + bbox.width)
          .attr("y2", bbox.y + 17)
          .attr("stroke-dasharray", bar)
          .attr("stroke", "#33bbee")
          .attr("stroke-width", "2px");
        if (node.attr("class").includes("zoomable")) {
          node.append("circle")
            .attr("cx", bbox.x + 1)
            .attr("cy", bbox.y + 1)
            .attr("r", "3")
            .attr("stroke", "#ee3377")
            .attr("fill", "#ee3377");
        }
        if (node.attr("class").includes("noteattached")) {
          node.append("circle")
            .attr("cx", bbox.x + bbox.width - 1)
            .attr("cy", bbox.y + 1)
            .attr("r", "3")
            .attr("stroke", "#ee7733")
            .attr("fill", "#ee7733");
        }
        if (node.attr("class").includes("has_subclass")) {
          node.append("circle")
            .attr("cx", bbox.x + bbox.width - 1)
            .attr("cy", bbox.y + bbox.height - 1)
            .attr("r", "3")
            .attr("stroke", "#0077bb")
            .attr("fill", "#0077bb");
        }
      }
    });
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
  document.getElementById("home").style.display="block";
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
    : hash in site.diagrams
    ? render(hash)
    : home();
}
globalThis.addEventListener("hashchange", () => {
  refresh();
});
