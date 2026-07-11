/* ICACT 2026 — shared behaviour: header/footer injection, nav, countdown, reveal, hero net */
(function () {
  "use strict";

  var SUBMIT = "https://app.confconnects.com/conference/wwrazM5QB8hSDwWL78wx";
  var IEEE_REC = "https://conferences.ieee.org/conferences_events/conferences/conferencedetails/70625";
  var page = document.body.getAttribute("data-page") || "";

  var NAV = [
    ["home", "index.html", "Home"],
    ["about", "about.html", "About"],
    ["cfp", "call-for-papers.html", "Call for Papers"],
    ["committee", "committee.html", "Committee"],
    ["registration", "registration.html", "Registration"],
    ["venue", "venue.html", "Venue"],
    ["contact", "contact.html", "Contact"]
  ];

  /* ---------- Header ---------- */
  function headerHTML() {
    var links = NAV.map(function (n) {
      return '<a href="' + n[1] + '"' + (page === n[0] ? ' class="active"' : "") + ">" + n[2] + "</a>";
    }).join("");
    return (
      '<header class="site-header"><div class="wrap site-header__in">' +
        '<a class="brand" href="index.html">' +
          '<img class="brand__mark" src="assets/icact-logo-mark.svg" alt="ICACT logo">' +
          '<span class="brand__txt"><b>ICACT 2026</b><span>Advanced Computing Technologies</span></span>' +
        "</a>" +
        '<button class="navtoggle" aria-label="Menu" aria-expanded="false">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
        "</button>" +
        '<nav class="nav">' + links +
          '<a class="btn btn--solid" href="' + SUBMIT + '" target="_blank" rel="noopener">Submit Paper</a>' +
        "</nav>" +
      "</div></header>"
    );
  }

  /* ---------- Footer ---------- */
  function footerHTML() {
    var quick = NAV.map(function (n) { return '<a href="' + n[1] + '">' + n[2] + "</a>"; }).join("");
    return (
      '<footer class="site-footer"><div class="wrap">' +
        '<div class="foot__top">' +
          '<div class="foot__brand">' +
            '<a class="brand" href="index.html">' +
              '<img class="brand__mark" src="assets/icact-logo-mark.svg" alt="ICACT logo">' +
              '<span class="brand__txt"><b>ICACT 2026</b><span>Advanced Computing Technologies</span></span>' +
            "</a>" +
            "<p>The 2026 IEEE 3rd International Conference on Advanced Computing Technologies — a global hybrid platform for advanced computing research, hosted in Kathmandu, Nepal.</p>" +
            '<img class="ieee" src="assets/ieee-logo-white.svg" alt="IEEE — Advancing Technology for Humanity">' +
          "</div>" +
          '<div class="foot__col"><h4>Explore</h4>' + quick + "</div>" +
          '<div class="foot__col"><h4>Authors</h4>' +
            '<a href="' + SUBMIT + '" target="_blank" rel="noopener">Submit a Paper</a>' +
            '<a href="call-for-papers.html">Call for Papers</a>' +
            '<a href="https://www.ieee.org/conferences/publishing/templates.html" target="_blank" rel="noopener">IEEE Templates</a>' +
            '<a href="' + IEEE_REC + '" target="_blank" rel="noopener">IEEE Conf. Record #70625</a>' +
          "</div>" +
        "</div>" +
        '<div class="foot__bot">' +
          "2026 IEEE 3rd International Conference on Advanced Computing Technologies (ICACT) · " +
          'IEEE Conference Record No. <a href="' + IEEE_REC + '" target="_blank" rel="noopener">70625</a> · ' +
          "1–2 September 2026 · Hilton, Kathmandu, Nepal · Hybrid Mode · Technically sponsored by the IEEE Nepal Section.<br>" +
          "© 2026 ICACT. All rights reserved. · <a href=\"mailto:secretaryicact@gmail.com\">secretaryicact@gmail.com</a>" +
        "</div>" +
      "</div></footer>"
    );
  }

  var h = document.getElementById("site-header");
  if (h) h.outerHTML = headerHTML();
  var f = document.getElementById("site-footer");
  if (f) f.outerHTML = footerHTML();

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".navtoggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revs = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revs.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revs.forEach(function (el) { io.observe(el); });
  } else {
    revs.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Countdown to 1 September 2026 ---------- */
  var cd = document.getElementById("countdown");
  if (cd) {
    var target = new Date("2026-09-01T09:00:00+05:45").getTime(); // Nepal time
    var els = {
      days: cd.querySelector('[data-cd="days"]'),
      hours: cd.querySelector('[data-cd="hours"]'),
      mins: cd.querySelector('[data-cd="mins"]'),
      secs: cd.querySelector('[data-cd="secs"]')
    };
    var tick = function () {
      var diff = target - Date.now();
      if (diff < 0) diff = 0;
      var d = Math.floor(diff / 86400000);
      var hh = Math.floor((diff % 86400000) / 3600000);
      var mm = Math.floor((diff % 3600000) / 60000);
      var ss = Math.floor((diff % 60000) / 1000);
      if (els.days) els.days.textContent = d;
      if (els.hours) els.hours.textContent = ("0" + hh).slice(-2);
      if (els.mins) els.mins.textContent = ("0" + mm).slice(-2);
      if (els.secs) els.secs.textContent = ("0" + ss).slice(-2);
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Hero network canvas ---------- */
  var canvas = document.getElementById("net");
  if (canvas && canvas.getContext && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var ctx = canvas.getContext("2d");
    var pts = [], W, H, raf;
    function size() {
      var r = canvas.getBoundingClientRect();
      W = canvas.width = r.width; H = canvas.height = r.height;
      var count = Math.min(60, Math.floor(W / 26));
      pts = [];
      for (var i = 0; i < count; i++) {
        pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        for (var j = i + 1; j < pts.length; j++) {
          var q = pts[j], dx = p.x - q.x, dy = p.y - q.y, dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 128) {
            ctx.strokeStyle = "rgba(143,197,234," + (0.16 * (1 - dist / 128)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(167,204,227,0.7)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    size(); draw();
    window.addEventListener("resize", function () { cancelAnimationFrame(raf); size(); draw(); });
  }

  /* ---------- Footer year already static (2026) ---------- */
})();
