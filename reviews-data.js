// BlackBox Creations — review rendering.
// Reviews live in reviews.json (published only after owner approval via the
// one-click link in the notification email). This loader fetches that file
// and renders cards into #bb-reviews (all tools, or one via data-tool).
window.BB_TOOL_NAMES = {
  "one-click-mesh-suite": "One Click Mesh Suite",
  "arccanvas": "ArcCanvas – Curved VR UI Toolkit",
  "nexpath": "NexPath – A* Pathfinding",
  "meshweld-pro-lite": "MeshWeld Pro Lite",
  "mesh-simplifier": "Mesh Simplifier",
  "batch-lod-generator": "Batch LOD Generator",
  "udp-networking-pro": "UDP Networking Pro",
  "smart-prop-placement": "Smart Prop Placement",
  "complete-creator-bundle": "The Complete Creator Bundle"
};

function bbStars(n) {
  var s = "";
  for (var i = 0; i < 5; i++) s += i < n ? "★" : "☆";
  return s;
}

function bbReviewCard(r, showTool) {
  var d = document.createElement("div");
  d.className = "card";
  var stars = document.createElement("div");
  stars.style.cssText = "color:#ffb02e;font-size:1.2rem;letter-spacing:2px";
  stars.textContent = bbStars(r.rating);
  var meta = document.createElement("div");
  meta.style.cssText = "font-weight:700";
  meta.textContent = r.name + " ";
  var src = document.createElement("span");
  src.style.cssText = "color:var(--muted);font-weight:500;font-size:.86rem";
  src.textContent = "· " + r.source;
  meta.appendChild(src);
  d.appendChild(stars);
  d.appendChild(meta);
  if (showTool) {
    var t = document.createElement("div");
    t.style.cssText = "color:var(--accent);font-weight:600;font-size:.94rem";
    t.textContent = window.BB_TOOL_NAMES[r.tool] || r.tool;
    d.appendChild(t);
  }
  var p = document.createElement("p");
  p.textContent = r.text;
  d.appendChild(p);
  return d;
}

window.bbRenderReviews = function () {
  var box = document.getElementById("bb-reviews");
  if (!box) return;
  var only = box.getAttribute("data-tool");
  fetch("reviews.json", { cache: "no-store" })
    .then(function (res) { return res.json(); })
    .then(function (all) {
      var grid = document.createElement("div");
      grid.className = "grid";
      var count = 0;
      Object.keys(all).forEach(function (key) {
        if (only && key !== only) return;
        (all[key] || []).forEach(function (r) {
          r.tool = key;
          grid.appendChild(bbReviewCard(r, !only));
          count++;
        });
      });
      if (count === 0) {
        var p = document.createElement("p");
        p.innerHTML = 'No reviews yet — be the first to <a href="reviews.html#leave-review">share your experience</a>.';
        box.appendChild(p);
      } else {
        box.appendChild(grid);
      }
    })
    .catch(function () {
      var p = document.createElement("p");
      p.textContent = "Reviews could not be loaded right now.";
      box.appendChild(p);
    });
};
