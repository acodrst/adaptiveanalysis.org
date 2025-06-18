// This is quite specific to my personal needs, but can be adapted.
// It listens on port 8000 for a path.  On Zettlr, the Vim mode uses 
// plugins/vim-mode.ts, which is bound to :w.  So, just put something like this:
// if (process.env.CL_CM_WEBSOCK_PORT) {
// const ws = new WebSocket(`ws://localhost:${process.env.CL_CM_WEBSOCK_PORT}`);
// ws.addEventListener("open", () => {
// ws.send(filePath)
// ws.close()
// })
// };
// in the code to transmit the path of the file being saved.
// This is some dangerous code, as I need to clear out directories
// until I figure out how to get Pandoc to use specific paths, not relative
// for the temp images.
function clear_ink_sync_bib(){
  for (let i of ['log','ada','sya']){
    try {
      Deno.removeSync(`/home/divine/websites/site/${i}/svg-inkscape`, { recursive: true })
    } catch (err) {
      if (!(err instanceof Deno.errors.NotFound)) {
        throw err;
      }
    }
    Deno.copyFileSync(
      "/home/divine/websites/My Library.bib",
      `/home/divine/websites/site/${i}/assets/My Library.bib`
    );
}
}
Deno.serve((req) => {
  if (req.headers.get("upgrade") != "websocket") {
    return new Response(null, { status: 501 });
  }
  const { socket, response } = Deno.upgradeWebSocket(req);
  socket.addEventListener("message", (event) => {
    if (event.data.includes("log.md")) {
      clear_ink_sync_bib()
      let p_c = [
        "--highlight-style=tango",
        "--pdf-engine=lualatex",
        "--pdf-engine-opt=-shell-escape",
        "--embed-resources",
        "--filter",
        "pandoc-crossref",
        "--filter",
        "/home/divine/websites/site/log/src/filt.js",
        "--citeproc",
        "-o",
        "/home/divine/websites/site/log/assets/log.pdf",
        "/home/divine/websites/site/log/log.md",
        "/home/divine/websites/site/log/assets/metadata.yaml",
      ];
      console.log(`running pandoc ${p_c.join(" ")}`);
      new Deno.Command("pandoc", {
        args: p_c,
      }).outputSync();
    }
    if (event.data.includes("lmp.md")) {
      clear_ink_sync_bib()
      let p_c = [
        "--highlight-style=tango",
        "--pdf-engine=lualatex",
        "--pdf-engine-opt=-shell-escape",
        "--embed-resources",
        "--filter",
        "pandoc-crossref",
        "--filter",
        "/home/divine/websites/site/ada/src/filt.js",
        "--citeproc",
        "-o",
        "/home/divine/websites/site/ada/assets/lmp.pdf",
        "/home/divine/websites/site/ada/lmp.md",
        "/home/divine/websites/site/ada/assets/metadata.yaml",
      ];
      console.log(`running pandoc ${p_c.join(" ")}`);
      new Deno.Command("pandoc", {
        args: p_c,
      }).outputSync();
    }
    if (event.data.includes("sya.md")) {
      clear_ink_sync_bib()
      let p_c = [
        "--highlight-style=tango",
        "--pdf-engine=lualatex",
        "--pdf-engine-opt=-shell-escape",
        "--embed-resources",
        "--filter",
        "pandoc-crossref",
        "--filter",
        "/home/divine/websites/site/sya/src/filt.js",
        "--citeproc",
        "-o",
        "/home/divine/websites/site/sya/assets/sya.pdf",
        "/home/divine/websites/site/sya/sya.md",
        "/home/divine/websites/site/sya/assets/metadata.yaml",
      ];
      console.log(`running pandoc ${p_c.join(" ")}`);
      new Deno.Command("pandoc", {
        args: p_c,
      }).outputSync();
    }
  });
  return response;
});
