const emoji = "📉";
const domain = "adaptiveanalysis.org";
const backup = Deno.env.get("CL_ADA_BACKUP");
const dt = new Date();
const tss = dt.toISOString().replaceAll(":", "").replaceAll("-", "").replaceAll(
  ".",
  "",
);
import * as base64 from "byte-base64";
import { fpng } from "fpng";
import { Graphviz } from "@hpcc-js/wasm-graphviz";

const graphviz = await Graphviz.load();
const site = { diagrams: {}, nn: {} };
const ids = new Set();
const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

function rn() {
  let id;
  const one = chars[Math.floor(Math.random() * 26)];
  const rest = () => chars[Math.floor(Math.random() * 36)];
  do id = one + rest() + rest(); while (ids.has(id));
  ids.add(id);
  return id;
}
function model_to_dots(model) {
  const num_ids = { "Top": { "dpath": "Top", "path": "0" } };
  let dots = {};
  let last_command, last_object, last_predicate, last_subject;
  let level = [];
  let items = [];
  for (const line of model.trim().split(/\s*\n+\s*/)) {
    if (line.includes("::") && line.slice(0, 2) != "//") {
      level = [];
      last_command = line.split(":: ")[1];
    } else {
      if (last_command == "level") {
        level.push(line.replaceAll(' ', ""));
        dots[level.join(".")] = {};
      } 
      if (
        ["narrative","note"]
          .includes(last_command)
      ) {
        site.nn[`${Object.keys(dots).slice(-1)[0]}.${last_subject.replaceAll(' ', '')}`] =
        site.nn[`${Object.keys(dots).slice(-1)[0]}.${last_subject.replaceAll(' ', '')}`] || {}
        site.nn[`${Object.keys(dots).slice(-1)[0]}.${last_subject.replaceAll(' ', '')}`][last_command]=line
      }
      if (
        ["processes", "datastores", "transforms", "agents", "locations"]
          .includes(last_command)
      ) {
        last_subject = line;
      }
  }
    }
    var row = 0;
    let data_id = 1;
    for (const line of model.trim().split(/\s*\n+\s*/)) {
      if (line.slice(0, 2) != "//") {
        const l_lbl = line.replace(/ /g, "\\n");
        const l_nd = line.replace(/ /g, "");
        const l_lvl = level.join(".") + "." + l_nd;
        if (line.includes("::")) {
          last_command = line.split(":: ")[1];
          if (last_command == "level") {
            level = [];
            data_id = 1;
          }
        } else {

          if (last_command != "level") {
            if (
              ["narrative", "note"]
                .includes(last_command)
            ) {
              site.nn[`${level.join('.')}.${last_subject.replaceAll(' ', '')}`] =
                site.nn[`${level.join('.')}.${last_subject.replaceAll(' ', '')}`] || {}
              site.nn[`${level.join('.')}.${last_subject.replaceAll(' ', '')}`][last_command] = line

            }
            if (
              ["processes", "datastores", "transforms", "agents", "locations"]
                .includes(last_command)
            ) {
              if (["datastores", "locations"].includes(last_command)) {
                data_id++;
                dots[level.join(".")][line] =
                  `"${line}" [id="${rn()}" color="#cc3311" shape="record" class="${last_command}" label="<f0> R${data_id}|<f1> ${l_lbl} "]`;
              }
              if (["transforms", "processes"].includes(last_command)) {
                let res = level.concat(l_nd).reduce(
                  (p, c, i, a) => {
                    if (!p[c]) {
                      p[c] = {
                        "dpath": `${a.slice(0, i + 1).join(".")}`,
                        "path": `${p["path"]}.${Object.keys(p).length}`,
                      };
                    }
                    return p[c];
                  },
                  num_ids,
                );
                let narr=site.nn[`${level.join(".")}.${line.replaceAll(' ','')}`]?.narrative || line
                let note=site.nn[`${level.join(".")}.${line.replaceAll(' ','')}`]?.note || ''
                if (note!='') note='note: '+note 
                  const zoom = dots?.[res.dpath] ? "zoomable" : "zoomnotable";
                const note_attached=(narr==line && note=='') ? "notenotattached" : "noteattached"
                dots[level.join(".")][line] = zoom == "zoomnotable"
                  ? `"${line}" [id="${rn()}" tooltip="${narr}\n${note}" color="#33bbee" shape="rectangle" style="rounded" class="${last_command} ${zoom} ${note_attached}" label="${res.path}\n${l_lbl}"]`
                  : `"${line}" [id="${rn()}" tooltip="${narr}\n${note}" color="#33bbee" href="#${res.dpath}" shape="rectangle" style="rounded" class="${last_command} ${zoom} ${note_attached}" label="${res.path}\n${l_lbl}"]`;
              }
              if ("agents" == last_command) {
                dots[level.join(".")][line] =
                  `"${line}" [id="${rn()}" color="#009988" shape="rectangle" class="${last_command}" label="${l_lbl}" ]`;
              }
              last_subject = line;
            } else {
              if (["forward", "back", "both"].includes(last_command)) {
                items = [];
                last_object = line;
                last_predicate = last_command;
                dots[level.join(".")][
                  last_subject + "." + last_command + "." + last_object
                ] = `"${last_subject}" -> "${line}" [ dir="${last_predicate}"]`;
              } else {
                if (["items"].includes(last_command)) {
                  items.push(line);
                  dots[level.join(".")][
                    last_subject + "." + last_predicate + "." + last_object
                  ] = `"${last_subject}" -> "${last_object}" [tooltip="${items.join("\n")
                  }" dir="${last_predicate}"]`;
                }
              }
            }
          } else {
            level.push(l_nd);
          }
        }
        row++;
      }
    }
    return { "dots": dots };
  }
  //const stack = `${Deno.readTextFileSync("assets/model.txt")}\n${Deno.readTextFileSync("assets/dmodel.txt")}`
  //Deno.writeTextFileSync('fullstack.txt', stack)
  const model=Deno.readTextFileSync("assets/model.txt")
  let dots = model_to_dots(model).dots;
  for (let i in dots) {
    const dot = `digraph {
 esep=".20" overlap=false splines=true charset="utf-8"
graph [fontname="Arial"]
 edge [penwidth="2" arrowsize="0.5" arrowtail="vee" arrowhead="vee" color="#bbbbbb" fontname="Arial"]
  node [penwidth="2" margin=".1,0" fontname="Arial"]
  ${Object.values(dots[i]).join("\n")}\n
  }`;
    site.diagrams[i] = graphviz.neato(dot);
  }
  const p_c = ['--highlight-style=kate', '--pdf-engine=lualatex', '--pdf-engine-opt=-shell-escape','--embed-resources=true', '--filter',
    'pandoc-crossref','--lua-filter','assets/wrap.lua','--citeproc', '-o', 'assets/description.pdf', 'README.md', 'assets/metadata.yaml']
  const command = new Deno.Command('pandoc', {
    args: p_c
  })
  console.log(`running pandoc ${p_c.join(' ')}`)
  const { code, stdout, stderr } = command.outputSync();
  site.pdf = Array.from(Deno.readFileSync("assets/description.pdf"));
  site.viewer = Deno.readTextFileSync("assets/pdf_page.html");
  site.page = Deno.readTextFileSync("assets/page.html");
  site.css = Deno.readTextFileSync("assets/style.css");
  const st = JSON.stringify(site);
  Deno.writeTextFileSync("site.txt", `let site=${st}\n`);
  const text = Deno.readTextFileSync("site.txt") +
    Deno.readTextFileSync("dist/app.bundle.js");
  function arr_to_hex(u8arr) {
    return `${Array.from(u8arr, (i) => i.toString(16).padStart(2, "0")).join("")
      }`;
  }
  const last_hash = Deno.readTextFileSync("data_sha512.txt");
  const cur_hash = arr_to_hex(
    new Uint8Array(
      await crypto.subtle.digest("SHA-512", new TextEncoder().encode(text)),
    ),
  );

  if (last_hash.trim() != cur_hash.trim()) {
    Deno.writeTextFileSync("data_sha512.txt", cur_hash);
    const fp_obj = fpng(` Verify sig at floppypng.com - ${tss}`, text);
    let a32h = arr_to_hex(fp_obj.im.slice(-20, -16));
    console.log(`Generated FloppyPNG Size=${fp_obj.ln}`);

    const priv = Deno.readTextFileSync(Deno.env.get("CL_PRIV")).replace(
      /.*KEY-----(.+?)-----END.*/smg,
      "$1",
    );
    const b_der_str = globalThis.atob(priv);
    const b_der = Uint8Array.from([...b_der_str].map((c) =>
      c.charCodeAt()
    )).buffer;
    const prv = await globalThis.crypto.subtle.importKey(
      "pkcs8",
      b_der,
      {
        name: "RSA-PSS",
        hash: "SHA-256",
      },
      true,
      ["sign"],
    );
    const sig = await crypto.subtle.sign(
      {
        name: "RSA-PSS",
        hash: "SHA-256",
        saltLength: 32,
      },
      prv,
      fp_obj.im,
    );
    const u8sig = new Uint8Array(sig);
    const pages = ["html", "local.html"]
    Deno.writeFileSync(`${tss}-${a32h}.png`, fp_obj.im);
    Deno.writeTextFileSync(`${tss}-${a32h}.txt`, base64.bytesToBase64(u8sig));
    Deno.writeFileSync(`${backup}${tss}-${a32h}.png`, fp_obj.im);
    for await (const i of Deno.readDir("./")) {
      if (
        i.name != `${tss}-${a32h}.png` &&
        i.name.match(/^\d{8}T\d{9}Z\-\w{8}.png$/)
      ) {
        console.log(`removing ${i.name}`);
        Deno.remove(i.name);
      }
      if (
        i.name != `${tss}-${a32h}.txt` &&
        i.name.match(/^\d{8}T\d{9}Z\-\w{8}.txt$/)
      ) {
        console.log(`removing ${i.name}`);
        Deno.remove(i.name);
      }
    }
    for (let i of pages) {
      console.log(`${tss}-${a32h}`)
      Deno.writeTextFileSync(
        `${domain}.page.${i}`, Deno.readTextFileSync(`assets/pageops.${i}`)
          .replaceAll("thisistss", tss)
          .replaceAll("thisisadler", a32h)
          .replaceAll("thisisemoji", emoji)
          .replaceAll("thisistextlength", st.length)
          .replaceAll("thisislength", fp_obj.ln)
        //.replaceAll("<iframe></iframe>", Deno.readTextFileSync("adaptiveanalysis.org.page.pdf.local.html"))
      );
    }
  }
  function web_deal(req) {
    if (req.method == "GET") {
      const u = new URL(req.url);
      const page = u.pathname == "/"
        ? `${domain}.page.local.html`
        : u.pathname.replace("/", "");
      let npg;
      let response;
      try {
        console.log(page);
        npg = Deno.readFileSync(page);
        const type = page.split(".").slice(-1);
        response = new Response(npg, {
          status: 200,
          headers: {
            "content-type": types[type],
          },
        });
      } catch {
        console.log("error 404");
        response = new Response(npg, {
          status: 404,
          headers: {
            "content-type": "text/plain;charset=utf-8",
          },
        });
      }
      return response;
    }
  }
  const types = {
    "js": "text/javascript;charset=utf-8",
    "mjs": "text/javascript;charset=utf-8",
    "css": "text/css",
    "svg": "image/svg+xml",
    "html": "text/html",
    "map": "application/json",
    "json": "application/json",
    "xz": "application/gzip",
    "png": "image/png",
    "zst": "application/zstd",
    "txt": "text/plain",
    "jpg": "image/jpg",
    "gif": "image/gif",
    "WebM": "video/webm",
    "mp4": "video/mp4",
    "mpg": "video/mp4",
    "webm": "video/webm",
    "ico": "image/x-icon",
  };
  Deno.serve({
    port: 3052,
    hostname: "0.0.0.0",
    handler: (req) => web_deal(req),
  });
