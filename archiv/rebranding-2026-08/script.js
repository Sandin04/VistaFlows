/* =========================================================================
   VistaFlows – Interaktionen
   ========================================================================= */
(function () {
  "use strict";

  var onReady = function (fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  };

  onReady(function () {
    /* ------------------------------------------------- Anfrage-Modal ----- */
    var modal = document.getElementById("demoModal");
    var modalPackage = document.getElementById("modalPackage");
    var modalTitle = document.querySelector("[data-modal-title]");
    var lastFocus = null;

    function openModal(label) {
      if (!modal) return;
      lastFocus = document.activeElement;
      var name = label || "Kostenloses Erstgespräch";
      if (modalPackage) modalPackage.value = name;
      if (modalTitle) modalTitle.textContent = name + " anfragen";
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var first = modal.querySelector("input:not([type=hidden]):not(.hidden-field)");
      if (first) setTimeout(function () { first.focus(); }, 60);
    }

    function closeModal() {
      if (!modal || !modal.classList.contains("active")) return;
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.addEventListener("click", function (e) {
      var opener = e.target.closest("[data-open-modal]");
      if (opener) {
        e.preventDefault();
        openModal(opener.getAttribute("data-package"));
        closeMobileMenu();
        return;
      }
      if (e.target.closest("[data-close-modal]")) { closeModal(); return; }
      if (e.target === modal) closeModal();
    });

    /* Fokus im Modal halten */
    if (modal) {
      modal.addEventListener("keydown", function (e) {
        if (e.key !== "Tab") return;
        var f = modal.querySelectorAll('button, [href], input:not([type=hidden]), select, textarea');
        var list = Array.prototype.filter.call(f, function (el) { return el.offsetParent !== null; });
        if (!list.length) return;
        var first = list[0], last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      });
    }

    /* ------------------------------------------------- Mobiles Menü ------ */
    var menuOpen = document.querySelector("[data-menu-open]");
    var menuClose = document.querySelector("[data-menu-close]");
    var panel = document.querySelector("[data-mobile-panel]");

    function openMobileMenu() {
      if (!panel) return;
      panel.classList.add("active");
      document.body.classList.add("menu-open");
      if (menuOpen) menuOpen.setAttribute("aria-expanded", "true");
    }
    function closeMobileMenu() {
      if (!panel) return;
      panel.classList.remove("active");
      document.body.classList.remove("menu-open");
      if (menuOpen) menuOpen.setAttribute("aria-expanded", "false");
    }
    if (menuOpen) menuOpen.addEventListener("click", openMobileMenu);
    if (menuClose) menuClose.addEventListener("click", closeMobileMenu);
    if (panel) {
      panel.addEventListener("click", function (e) {
        if (e.target === panel || e.target.tagName === "A") closeMobileMenu();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeModal(); closeMobileMenu(); }
    });

    /* ------------------------------------------------- FAQ --------------- */
    document.querySelectorAll(".faq-q").forEach(function (q) {
      q.addEventListener("click", function () {
        var item = q.closest(".faq-item");
        if (!item) return;
        var box = item.closest(".faq");
        var willOpen = !item.classList.contains("active");
        if (box) {
          box.querySelectorAll(".faq-item").forEach(function (o) {
            if (o !== item) {
              o.classList.remove("active");
              var ob = o.querySelector(".faq-q");
              if (ob) ob.setAttribute("aria-expanded", "false");
            }
          });
        }
        item.classList.toggle("active", willOpen);
        q.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });

    /* ------------------------------------------------- Reveal ------------ */
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("visible"); ro.unobserve(en.target); }
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
      reveals.forEach(function (el) { ro.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("visible"); });
    }

    /* ------------------------------------------------- 360°-Hotspots ----- */
    function scopeOf(el) { return el.closest(".tour-screen, .portfolio-screen"); }

    function showCard(hotspot) {
      var scope = scopeOf(hotspot);
      if (!scope) return;
      var card = scope.querySelector("[data-hotspot-card]");
      if (!card) return;

      scope.querySelectorAll(".hotspot").forEach(function (h) { h.classList.remove("is-active"); });
      hotspot.classList.add("is-active");

      var d = hotspot.dataset;
      var set = function (sel, val) {
        var el = card.querySelector(sel);
        if (el && val) el.textContent = val;
      };
      set("[data-card-kicker]", d.hotspotKicker || "Hotspot");
      set("[data-card-title]", d.hotspotTitle || "Interaktiver Infopunkt");
      set("[data-card-text]", d.hotspotText || "");

      var img = card.querySelector("[data-card-image]");
      if (img && d.hotspotImage) img.style.backgroundImage = 'url("' + d.hotspotImage + '")';

      var primary = card.querySelector("[data-card-primary]");
      if (primary) {
        if (d.hotspotPrimary) primary.textContent = d.hotspotPrimary;
        primary.setAttribute("data-package", d.hotspotTitle || "360° Tour");
      }

      card.classList.add("active");
      scope.classList.add("has-card");
    }

    document.querySelectorAll(".hotspot").forEach(function (h) {
      h.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        showCard(h);
      });
    });

    document.querySelectorAll("[data-hotspot-close]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        var scope = scopeOf(btn);
        if (!scope) return;
        var card = scope.querySelector("[data-hotspot-card]");
        if (card) card.classList.remove("active");
        scope.classList.remove("has-card");
        scope.querySelectorAll(".hotspot").forEach(function (h) { h.classList.remove("is-active"); });
      });
    });

    /* Beim Laden bleibt die Karte zu, damit das Bild sichtbar ist.
       Die Inhalte werden trotzdem schon einmal befüllt. */
    document.querySelectorAll(".tour-screen, .portfolio-screen").forEach(function (scope) {
      var active = scope.querySelector(".hotspot.is-active") || scope.querySelector(".hotspot");
      var card = scope.querySelector("[data-hotspot-card]");
      if (active && card) {
        showCard(active);
        card.classList.remove("active");
        scope.classList.remove("has-card");
      }
    });

    /* ------------------------------------------------- Formulare --------- */
    var AJAX = "https://formsubmit.co/ajax/info@vistaflows.com";

    document.querySelectorAll("#leadForm, #modalForm, #widerrufForm").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        var btn = form.querySelector('button[type="submit"]');
        var original = btn ? btn.textContent : "";
        if (btn) { btn.textContent = "Wird gesendet..."; btn.disabled = true; }

        var next = form.querySelector('input[name="_next"]');
        var target = "/danke";
        if (next && next.value) {
          try { target = new URL(next.value).pathname; } catch (err) { target = next.value; }
        }

        var data = {};
        new FormData(form).forEach(function (v, k) { data[k] = v; });

        fetch(AJAX, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (res) {
            if (!res.ok) throw new Error("Senden fehlgeschlagen");
            form.reset();
            window.location.href = target;
          })
          .catch(function () {
            window.location.href = "/fehler";
          })
          .finally(function () {
            if (btn) { btn.textContent = original; btn.disabled = false; }
          });
      });
    });

    /* ------------------------------------------------- Scroll-Fortschritt */
    var bar = document.querySelector("[data-scroll-bar]");
    var sticky = document.querySelector("[data-sticky-cta]");
    var ticking = false;

    function onScroll() {
      var top = window.pageYOffset || document.documentElement.scrollTop;
      var height = document.documentElement.scrollHeight - window.innerHeight;

      if (bar) bar.style.width = (height > 0 ? (top / height) * 100 : 0) + "%";
      if (sticky) sticky.classList.toggle("is-visible", top > 520);

      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();

    /* ------------------------------------------------- Zahlen-Animation -- */
    var counters = document.querySelectorAll("[data-count]");
    if (counters.length && "IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          co.unobserve(el);
          var target = parseInt(el.getAttribute("data-count"), 10) || 0;
          var suffix = el.getAttribute("data-suffix") || "";
          var start = null, dur = 1100;
          function step(ts) {
            if (!start) start = ts;
            var p = Math.min((ts - start) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (c) { co.observe(c); });
    }

    /* ------------------------------------------------- Karten-Leuchten --- */
    if (window.matchMedia("(hover: hover)").matches) {
      document.querySelectorAll(".card").forEach(function (card) {
        card.addEventListener("mousemove", function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
          card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        });
      });
    }
  });
})();
