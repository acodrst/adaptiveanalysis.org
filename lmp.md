# Introduction

A logical map makes sense of related concepts by limiting the visualization to necessary functional elements.  Triple System Analysis ( \tsa) and Adaptive Analysis ( \trs) explain how to use multi-level maps to understand systems [@h_triple_2023] [@h_adaptive_2024].  This how-to guide (\ada)  builds on those ideas, but limits the flow model to materials and data.  Data might live on paper, a computer hard disk, as memories of childhood, or shared cultural forms in our dreams [@samson_evidence_2023].  Data flows in our daily lives as we run reports, write in our diary, account for money, message our friends, maintain contacts, and many other things that rely on other services to process and store our data.  Those services rely on others.  Restaurants often require data flow to accept customers, as orders  and payment are handled by external services.  When there is a network interruption, business grinds to a halt.  Supply chains of production and distribution of materials like eggs, steel, mobile phones or lettuce can also cause significant disruption when interrupted.  Creating a map of these flows prior to failure can help recovery.  Often it is cost-prohibitive to map all possible flows prior to failure; however, the methods describe by this paper our intended to be quick enough to use at time of failure.  Data flow maps were introduced in the 1970s to analyze complicated data processing, and were proven to be an effective cognitive aid  [@gane_structured_1977].   [@Fig:top] is an example map that uses adopts the symbols and conventions

![Top](images/Top.svg){#fig:top s=.63 a=r}

The rounded rectangle blue nodes are transformations.  The teal rectangle nodes are agents that are the sources or sinks of data or intelligence.  The reddish-brown nodes store data or materials at rest.  Dotted lines within the node represent data.  Solid lines represent materials.  As I explained in \trs, data flow diagrams are behind agents that operate transforms.  This is why I think it is OK to mix the nodes, as most of the function is behind the screens, the black box of the device or report that assists the transform. Magenta dots in the corner of a transform/process node mean the node can be expanded by clicking.  An orange dot means that notes and narrative will show with a pointer hover.  A blue dot in the lower right corner of a material transform means there is a connection to the associated full data flow.

\clearpage

# Map Presentations
## Simple Web
 Let's start with the graph stack format introduced in \trs to create the graph in [@Fig:top]. I'm going to assume that you can use NPM, or, at least can bribe a programmer with a beverage and food to help you [@noauthor_nodejs_nodate].  We will continue to build out more sophisticated features, but for now, create a blank directory, cd into it, and install text-model-dot, gsdot-svg, and http-server with NPM:

``` {#lst:first_graph  .txt .numberLines}
$ npm install text-model-dot gsdot-svg http-server
added 101 packages in 3s
```
 We now have a new directory called node_modules which contains the software.    It is also possible to go directly to the repository on GitHub and download the software, but getting used to NPM will help us later on [@h_acodrsttext-model-dot_2025].  Create a file named index.html in the directory with this content:
 
``` {#lst:index .html .numberLines}
<!DOCTYPE html><html lang="en"><title>Top</title>
<div id="map"></div>
<script type="module">
  import { model_to_dots } from "./node_modules/text-model-dot/text-model-dot.js"
  import { gsdot_svg } from "./node_modules/gsdot-svg/dist/gsdot-svg.bundle.js"
  async function main() {
    const model = await (await fetch('./node_modules/text-model-dot/example.txt')).text()
    const dot_lines = model_to_dots(model).dots["Top"];
    await gsdot_svg(dot_lines,'default','map');
  }
  main()
</script></html>
```

Start up a web server to see the graph:

``` {#lst:list_software .text .numberLines}
$ npx http-server
Starting up http-server, serving ./

http-server version: 14.1.1

http-server settings: 
CORS: disabled
Cache: 3600 seconds
Connection Timeout: 120 seconds
Directory Listings: visible
AutoIndex: visible
Serve GZIP Files: false
Serve Brotli Files: false
Default File Extension: none

Available on:
  http://127.0.0.1:8080
Hit CTRL-C to stop the server

```
Browse to   http://127.0.0.1:8080, and you'll see a graph like [@Fig:top].

\clearpage

# Road Trip Toolkit

## Local Documentation

The map is generated via JavaScript, CSS, and HTML.  Spin off a project right now to understand how to run documentation locally.  This can be done by running a local version of MDN Web Docs [@noauthor_mdn_nodate].  As of this writing (2025-03-09), the way I do it is I fork content and yari as parallel repositories.  (Note that there are some instructions that say to install yari as a subdirectory of content).  Then run:

```{#lst:yari .text .numberLines}
yarn install
yarn dev
```
To update later, change to the local repository and run:
```{#lst:yari .text .numberLines}
git pull origin main
yarn
yarn dev
```
Going forward, just use ```yarn start```.  Browse to http://localhost:3000 to see a local MDN.  Test by disconnecting from the Internet.

\clearpage


# References

<div id="refs"></div>

\newpage

\

\newpage