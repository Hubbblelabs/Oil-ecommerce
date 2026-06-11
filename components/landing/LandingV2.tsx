"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/providers/CartProvider";
import "./landing-v2.css";

export interface LandingProduct {
  id: string;
  name: string;
  price: number;
  image: string | null;
  category: string;
}

/* Art-directed gradient tones stand in for product photography until
   real images are uploaded; captions describe the intended shot. */
const TONES = [
  { tone: "ph--oil", cap: "Golden groundnut pour into dark glass" },
  { tone: "ph--sesame", cap: "Amber sesame oil, seeds scattered on stone" },
  { tone: "ph--coconut", cap: "Half-set coconut oil, fresh kernels, soft light" },
  { tone: "ph--mustard", cap: "Pungent amber mustard oil, mustard flowers, side light" },
] as const;

function toneFor(name: string, fallbackIndex = 0) {
  const n = name.toLowerCase();
  if (n.includes("sesame") || n.includes("gingelly")) return TONES[1];
  if (n.includes("coconut")) return TONES[2];
  if (n.includes("mustard")) return TONES[3];
  if (n.includes("groundnut") || n.includes("peanut")) return TONES[0];
  return TONES[fallbackIndex % TONES.length];
}

const SLOTS = [
  { idx: "01 — Bestseller", tag: "Nutty, golden, made for everyday fire.", mini: "★ 4.9 · 1,240" },
  { idx: "02 — Aromatic", tag: "Toasty, warm, the soul of southern kitchens.", mini: "★ 4.8 · 890" },
  { idx: "03 — Hair & Body", tag: "Clean, cool, fragrant of the coast.", mini: "★ 4.9 · 2,100" },
  { idx: "04 — Kachi Ghani", tag: "Sharp, bold, unmistakably alive.", mini: "★ 4.7 · 760" },
];

const TICKER_ITEMS = [
  "100% Unrefined",
  "Wood-Churned Ghani",
  "No Chemicals",
  "Single-Village Origin",
  "Four Generations",
  "Pressed Below 38°C",
];

const MANIFESTO: { text: string; gold?: boolean }[] = [
  ...split("Industrial oil is bleached, deodorised and rushed. Ours is coaxed from the seed by wooden presses, at the pace of"),
  ...split("bullocks and patience", true),
  ...split("— and you can taste the difference slowness makes."),
];

function split(text: string, gold?: boolean) {
  return text.split(/\s+/).map((w) => ({ text: w, gold }));
}

const VOICES_ROW_1 = [
  { quote: "You can smell the difference the moment you open the bottle. Straight back to my grandmother's kitchen.", name: "Ananya R.", city: "Bengaluru", av: "ph--village" },
  { quote: "Switched the whole family to the groundnut oil a year ago. Nothing from a supermarket comes close.", name: "Vikram S.", city: "Pune", av: "ph--sesame" },
  { quote: "The mustard oil has that proper sharp kick. Finally a brand that doesn't dilute the character out of it.", name: "Priya M.", city: "Kolkata", av: "ph--mustard" },
];
const VOICES_ROW_2 = [
  { quote: "Beautiful packaging, faster delivery than expected, and the coconut oil is divine for my hair.", name: "Meera K.", city: "Kochi", av: "ph--coconut" },
  { quote: "Our dosas have never tasted better. The sesame oil is worth every rupee.", name: "Arjun T.", city: "Chennai", av: "ph--oil" },
  { quote: "I gift the discovery set to every new homeowner I know. It never misses.", name: "Nisha D.", city: "Hyderabad", av: "ph--field" },
];

const PROCESS_ROWS = [
  { no: "i.", title: "Farm", text: "Single-village farms, rain-fed and rotated by season.", tone: "ph--field", dark: true },
  { no: "ii.", title: "Seed Selection", text: "Hand-sorted, sun-dried on courtyard floors.", tone: "ph--village", dark: true },
  { no: "iii.", title: "Traditional Pressing", text: "Turned slowly in a wooden ghani, never above 38°C.", tone: "ph--oil-deep", dark: true },
  { no: "iv.", title: "Packaging", text: "Settled for days, then bottled in light-proof dark glass.", tone: "ph--studio", dark: false },
  { no: "v.", title: "Delivery", text: "Shipped fresh to your door within the week.", tone: "ph--oil", dark: true },
];

const fmt = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

function titleCase(s: string) {
  return s.charAt(0) + s.slice(1).toLowerCase();
}

export function LandingV2({
  products,
  className,
}: {
  products: LandingProduct[];
  className?: string;
}) {
  const { items, itemCount, addItem, updateQuantity } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [loaderPhase, setLoaderPhase] = useState<"loading" | "done" | "gone">("loading");
  const [count, setCount] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const maniRef = useRef<HTMLParagraphElement>(null);
  const hwrapRef = useRef<HTMLElement>(null);
  const htrackRef = useRef<HTMLDivElement>(null);
  const hbarRef = useRef<HTMLElement>(null);
  const vrow1Ref = useRef<HTMLDivElement>(null);
  const vrow2Ref = useRef<HTMLDivElement>(null);

  const subtotal = items.reduce((a, c) => a + parseFloat(c.price) * c.quantity, 0);

  const addToCart = useCallback(
    (p: LandingProduct) => {
      addItem({
        productId: p.id,
        name: p.name,
        price: String(p.price),
        image: p.image,
        category: p.category,
      });
      setCartOpen(true);
    },
    [addItem]
  );

  const addDiscoverySet = useCallback(() => {
    for (const p of products) {
      addItem({
        productId: p.id,
        name: p.name,
        price: String(p.price),
        image: p.image,
        category: p.category,
      });
    }
    setCartOpen(true);
  }, [addItem, products]);

  const discoveryPrice = products.reduce((a, p) => a + p.price, 0);

  /* ---------- Loader ---------- */
  useEffect(() => {
    const iv = setInterval(() => {
      setCount((n) => {
        const next = n + Math.floor(Math.random() * 16) + 5;
        if (next >= 100) clearInterval(iv);
        return Math.min(100, next);
      });
    }, 110);
    const t1 = setTimeout(() => setLoaderPhase("done"), 2200);
    const t2 = setTimeout(() => setLoaderPhase("gone"), 3500);
    return () => {
      clearInterval(iv);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* ---------- Smooth anchor scrolling while mounted ---------- */
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  /* ---------- Cursor + magnetic ---------- */
  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    const root = rootRef.current!;
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(loop);
    };
    const onOver = (e: Event) => {
      const hit = (e.target as Element).closest("a,button,.hcard,.vcard,.prow");
      root.classList.toggle("cur-hover", !!hit);
    };

    window.addEventListener("mousemove", onMove);
    root.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    const magnetics = Array.from(root.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const str = 20;
    const cleanups = magnetics.map((el) => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${(x / r.width) * str}px,${(y / r.height) * str}px)`;
      };
      const leave = () => {
        el.style.transform = "";
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  /* ---------- Scroll engine: progress, parallax, manifesto, gallery ---------- */
  useEffect(() => {
    const prog = progRef.current!;
    const heroBg = heroBgRef.current!;
    const mani = maniRef.current!;
    const maniSection = mani.closest("section")!;
    const words = Array.from(mani.querySelectorAll<HTMLElement>(".w"));
    const hwrap = hwrapRef.current!;
    const htrack = htrackRef.current!;
    const hbar = hbarRef.current!;

    /* size the horizontal section: scroll height = track overflow + viewport */
    const sizeH = () => {
      const overflow = htrack.scrollWidth - window.innerWidth;
      hwrap.style.height = window.innerHeight + Math.max(0, overflow) + "px";
    };

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      if (y < vh) heroBg.style.transform = `translateY(${y * 0.3}px) scale(1.04)`;

      const r = maniSection.getBoundingClientRect();
      const start = vh * 0.85;
      const end = vh * 0.25;
      const t = Math.min(1, Math.max(0, (start - r.top) / (r.height * 0.9 + start - end)));
      const lit = Math.floor(t * words.length * 1.15);
      words.forEach((w, i) => w.classList.toggle("lit", i < lit));

      const hr = hwrap.getBoundingClientRect();
      const total = hwrap.offsetHeight - vh;
      if (total > 0) {
        const p = Math.min(1, Math.max(0, -hr.top / total));
        const overflow = htrack.scrollWidth - window.innerWidth;
        htrack.style.transform = `translateX(${-p * overflow}px)`;
        hbar.style.transform = `scaleX(${p})`;
      }
    };

    const onResize = () => {
      sizeH();
      onScroll();
    };

    sizeH();
    onScroll();
    document.fonts?.ready.then(() => {
      sizeH();
      onScroll();
    });
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ---------- Nav solid state ---------- */
  useEffect(() => {
    const hero = heroRef.current!;
    const io = new IntersectionObserver(
      ([e]) => setNavSolid(!e.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  /* ---------- Chapter image reveals ---------- */
  useEffect(() => {
    const root = rootRef.current!;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("open");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    root.querySelectorAll(".ch-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ---------- Voices marquee rows ---------- */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const rows: { el: HTMLDivElement; x: number; speed: number }[] = [
      { el: vrow1Ref.current!, x: 0, speed: -0.45 },
      { el: vrow2Ref.current!, x: -vrow2Ref.current!.scrollWidth / 2, speed: 0.45 },
    ];
    let raf = 0;
    const step = () => {
      for (const row of rows) {
        row.x += row.speed;
        const half = row.el.scrollWidth / 2;
        if (row.x <= -half) row.x += half;
        if (row.x >= 0 && row.speed > 0) row.x -= half;
        row.el.style.transform = `translateX(${row.x}px)`;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={rootRef} className={`lv2 ${className ?? ""}`}>
      <div className="cursor" aria-hidden="true">
        <div className="cursor__ring" ref={ringRef} />
        <div className="cursor__dot" ref={dotRef} />
      </div>
      <div className="progress" aria-hidden="true">
        <span ref={progRef} />
      </div>

      {loaderPhase !== "gone" && (
        <div className={`loader${loaderPhase === "done" ? " done" : ""}`}>
          <div className="loader__word">
            {"Sameya".split("").map((ch, i) => (
              <i key={i} style={{ animationDelay: `${i * 0.06}s` }}>
                {ch}
              </i>
            ))}
          </div>
          <div className="loader__tag">Cold-Pressed · Est. 1952</div>
          <div className="loader__count">{String(count).padStart(2, "0")}</div>
        </div>
      )}

      <div className="grain-fixed" aria-hidden="true" />
      <div className="rail rail--l">Shri Sameya Village — Single Origin</div>
      <div className="rail rail--r">Cold-Pressed Oils — Est. 1952</div>

      {/* ===== NAV ===== */}
      <nav className={`nav nav--dark${navSolid ? " nav--solid" : ""}`}>
        <Link className="nav__brand" href="/">
          Shri Sameya<small>Village Oils</small>
        </Link>
        <div className="nav__links">
          <Link href="/products">Collection</Link>
          <a href="#chapters">Our Story</a>
          <a href="#process">Process</a>
          <Link href="/oil-guide">Journal</Link>
        </div>
        <div className="nav__right">
          <Link href="/orders" className="nav__account">
            Account
          </Link>
          <button className="nav__cart" onClick={() => setCartOpen(true)}>
            Cart <span className="dot">{itemCount}</span>
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <header className={`hero${loaderPhase !== "loading" ? " in" : ""}`} ref={heroRef}>
        <div className="hero__bg" ref={heroBgRef} />
        <div className="hero__blob" />
        <div className="hero__drip" aria-hidden="true" />
        <div className="hero__grain" />
        <div className="hero__vig" />
        <div className="hero__inner">
          <div className="hero__meta">
            <span>
              <b>①</b>&nbsp; Wood-churned ghani
            </span>
            <span>Single village origin</span>
            <span className="hide-s">
              <b>②</b>&nbsp; Nothing refined
            </span>
          </div>
          <h1>
            <span className="ln">
              <span>Tradition,</span>
            </span>
            <span className="ln">
              <span>
                <span className="indent" />
                pressed into
              </span>
            </span>
            <span className="ln">
              <span>
                <em>every drop.</em>
              </span>
            </span>
          </h1>
          <div className="hero__foot">
            <p className="hero__sub">
              Unrefined oils drawn slowly from one Indian village — the way four
              generations of our family have always made them.
            </p>
            <div className="hero__cta">
              <Link href="/products" className="btn btn--light" data-magnetic>
                <span className="btn__label">Shop Collection</span>
                <span className="btn-arrow">→</span>
              </Link>
              <a href="#chapters" className="btn btn--on-dark" data-magnetic>
                <span className="btn__label">Our Story</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="ticker">
        <div className="ticker__track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* ===== MANIFESTO ===== */}
      <section className="manifesto" id="manifesto">
        <div className="wrap">
          <div className="manifesto__meta">
            <div className="eyebrow-row">
              <span className="rule" />
              <span className="kicker">A Quiet Manifesto</span>
              <span className="rule" />
            </div>
          </div>
          <p ref={maniRef}>
            {MANIFESTO.map((w, i) => (
              <span key={i} className={w.gold ? "w gold" : "w"}>
                {w.text + " "}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ===== CHAPTERS ===== */}
      <section className="chapters" id="chapters">
        <article className="chapter">
          <div className="chapter__sticky">
            <div className="chapter__no">Chapter i</div>
            <h2>
              One village,
              <br />
              <em>one promise.</em>
            </h2>
            <p>
              Sameya sits between rain-fed groundnut fields and a grove of old
              coconut palms. Every bottle we sell begins within walking distance
              of the press house our great-grandfather built.
            </p>
            <Link className="link chapter__link" href="/products">
              Meet the oils <span>→</span>
            </Link>
          </div>
          <div className="chapter__media">
            <figure>
              <div className="ph ph--village ch-reveal" data-dark="">
                <div className="ph__vig" />
                <span className="ph__cap">
                  Dawn over the village press house, mist on groundnut fields
                </span>
              </div>
              <figcaption>
                <span>The press house</span>
                <span>06:12 am</span>
              </figcaption>
            </figure>
            <p className="chapter__quote">
              &ldquo;The ghani doesn&rsquo;t hurry. Neither do we.&rdquo;
            </p>
            <figure>
              <div className="ph ph--field wide ch-reveal" data-dark="">
                <div className="ph__vig" />
                <span className="ph__cap">
                  Farmers walking sun-dried sesame rows, baskets on hips
                </span>
              </div>
              <figcaption>
                <span>Harvest walk</span>
                <span>Field nº 3</span>
              </figcaption>
            </figure>
          </div>
        </article>

        <article className="chapter">
          <div className="chapter__sticky">
            <div className="chapter__no">Chapter ii</div>
            <h2>
              Pressed cold,
              <br />
              <em>kept whole.</em>
            </h2>
            <p>
              Seeds are sun-dried on courtyard floors, then turned in a wooden
              ghani below 38°C. No solvents, no refining, no hurry — the oil
              settles for days before it is bottled in dark glass.
            </p>
          </div>
          <div className="chapter__media">
            <figure>
              <div className="ph ph--oil-deep ch-reveal" data-dark="">
                <div className="ph__vig" />
                <span className="ph__cap">
                  Macro: first golden press pearling off the wooden ghani
                </span>
              </div>
              <figcaption>
                <span>First press</span>
                <span>38°C max</span>
              </figcaption>
            </figure>
            <figure>
              <div className="ph ph--oil wide ch-reveal" data-dark="">
                <div className="ph__vig" />
                <span className="ph__cap">
                  Oil settling in steel urns, shafts of afternoon light
                </span>
              </div>
              <figcaption>
                <span>Settling room</span>
                <span>Day 4 of 6</span>
              </figcaption>
            </figure>
          </div>
        </article>
      </section>

      {/* ===== HORIZONTAL PRODUCTS ===== */}
      <section className="hwrap" id="collection" ref={hwrapRef}>
        <div className="hsticky">
          <div className="hhead">
            <div>
              <div className="eyebrow-row u-mb-s">
                <span className="rule" />
                <span className="kicker">The Collection</span>
              </div>
              <h2>Four oils. One village.</h2>
            </div>
            <div className="hint">
              <span>Scroll</span>
              <span className="bar">
                <i ref={hbarRef} />
              </span>
            </div>
          </div>
          <div className="htrack" ref={htrackRef}>
            {products.map((p, i) => {
              const slot = SLOTS[i % SLOTS.length];
              const tone = toneFor(p.name, i);
              return (
                <article className="hcard" key={p.id}>
                  <Link
                    className="hcard__media"
                    href={`/products/${p.id}`}
                    aria-label={p.name}
                  >
                    <div className={`ph ${tone.tone}`}>
                      <div className="ph__vig" />
                      {p.image ? (
                        <Image
                          className="ph__img"
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="(max-width: 900px) 80vw, 30vw"
                        />
                      ) : (
                        <span className="ph__cap">{tone.cap}</span>
                      )}
                    </div>
                    <span className="hcard__idx">{slot.idx}</span>
                    {!p.image && (
                      <div className="hcard__bottle">
                        <div className="glassbottle">
                          <div className="cap" />
                          <div className="neck" />
                          <div className="body" />
                          <div className="label" />
                        </div>
                      </div>
                    )}
                  </Link>
                  <div className="hcard__row">
                    <h3>{p.name}</h3>
                    <span className="p">{fmt(p.price)}</span>
                  </div>
                  <div className="t">{slot.tag}</div>
                  <div className="hcard__cta">
                    <button className="btn" data-magnetic onClick={() => addToCart(p)}>
                      <span className="btn__label">Add to Cart</span>
                    </button>
                    <span className="mini">{slot.mini}</span>
                  </div>
                </article>
              );
            })}
            <div className="hend">
              <Link href="/products" data-magnetic>
                <span>
                  View the
                  <br />
                  full collection →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="proc" id="process">
        <div className="proc__head">
          <div>
            <div className="eyebrow-row u-mb-s">
              <span className="rule" />
              <span className="kicker">Seed to Bottle</span>
            </div>
            <h2>Five unhurried steps</h2>
          </div>
          <p>
            Hover each step — the process is slow on purpose, and we
            wouldn&rsquo;t change a thing.
          </p>
        </div>
        <div className="prows">
          {PROCESS_ROWS.map((row) => (
            <div className="prow" key={row.no}>
              <div className="prow__in">
                <span className="prow__no">{row.no}</span>
                <h3>{row.title}</h3>
                <p>{row.text}</p>
              </div>
              <div
                className={`prow__img ph ${row.tone}`}
                {...(row.dark ? { "data-dark": "" } : {})}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== VOICES ===== */}
      <section className="voices">
        <div className="voices__head">
          <div className="eyebrow-row u-mb-s">
            <span className="rule" />
            <span className="kicker">From Our Kitchens</span>
            <span className="rule" />
          </div>
          <h2>Loved at the table</h2>
        </div>
        {[
          { cards: VOICES_ROW_1, ref: vrow1Ref },
          { cards: VOICES_ROW_2, ref: vrow2Ref },
        ].map((row, ri) => (
          <div className="vrow" key={ri} ref={row.ref}>
            {[...row.cards, ...row.cards].map((v, i) => (
              <div
                className="vcard"
                key={i}
                aria-hidden={i >= row.cards.length || undefined}
              >
                <div className="stars">★★★★★</div>
                <blockquote>&ldquo;{v.quote}&rdquo;</blockquote>
                <div className="who">
                  <span className={`av ph ${v.av}`} />
                  <span>
                    <b>{v.name}</b>
                    <small>{v.city}</small>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* ===== FINAL CTA + FOOTER ===== */}
      <footer className="final" id="final">
        <div className="final__glow" />
        <div className="final__inner">
          <h2>
            Taste the <em>difference</em>
            <br />
            slowness makes.
          </h2>
          <p>
            Start with the four-oil discovery set, or build your own pantry.
            Free delivery on your first order.
          </p>
          <div className="final__cta">
            <Link href="/products" className="btn btn--light" data-magnetic>
              <span className="btn__label">Shop the Collection</span>
              <span className="btn-arrow">→</span>
            </Link>
            {products.length > 0 && (
              <button className="btn btn--on-dark" data-magnetic onClick={addDiscoverySet}>
                <span className="btn__label">
                  Add Discovery Set · {fmt(discoveryPrice)}
                </span>
              </button>
            )}
          </div>
        </div>

        <div className="final__grid">
          <div>
            <h5>Shri Sameya Village</h5>
            <p className="final__about">
              Cold-pressed village oils, made slowly by one family since 1952.
            </p>
          </div>
          <div>
            <h5>Shop</h5>
            <ul>
              <li>
                <Link href="/products">All Oils</Link>
              </li>
              <li>
                <Link href="/products?category=COOKING">Groundnut</Link>
              </li>
              <li>
                <Link href="/products?category=PREMIUM">Sesame</Link>
              </li>
              <li>
                <Link href="/products">Discovery Set</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li>
                <a href="#chapters">Our Story</a>
              </li>
              <li>
                <a href="#process">Process</a>
              </li>
              <li>
                <Link href="/orders">Account</Link>
              </li>
              <li>
                <Link href="/admin/dashboard">Admin</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Join the Village</h5>
            <p className="final__note">
              Seasonal harvest notes and recipes. No noise.
            </p>
            <form
              className="final__news"
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
            >
              <input type="email" placeholder="Your email" required />
              <button aria-label="Subscribe">{subscribed ? "✓" : "→"}</button>
            </form>
            <div className="final__social">
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">YouTube</a>
            </div>
          </div>
        </div>
        <div className="final__base">
          <span>© 2026 Shri Sameya Village</span>
          <span>Pressed in India · Shipped with care</span>
        </div>
        <div className="final__wordmark" aria-hidden="true">
          Sa<em>m</em>eya
        </div>
      </footer>

      {/* ===== CART DRAWER ===== */}
      <div
        className={`scrim${cartOpen ? " open" : ""}`}
        onClick={() => setCartOpen(false)}
      />
      <aside className={`drawer${cartOpen ? " open" : ""}`} aria-label="Shopping cart">
        <div className="drawer__head">
          <h3 className="serif">Your Cart</h3>
          <button
            className="drawer__close"
            aria-label="Close"
            onClick={() => setCartOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="drawer__body">
          {items.length === 0 ? (
            <p className="drawer__empty">Your cart is empty.</p>
          ) : (
            items.map((c) => (
              <div className="citem" key={c.productId}>
                <div className={`ph citem__thumb ${toneFor(c.name).tone}`}>
                  {c.image && (
                    <Image
                      className="ph__img"
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="74px"
                    />
                  )}
                </div>
                <div className="citem__main">
                  <h4>{c.name}</h4>
                  <div className="citem__sub">
                    {titleCase(c.category)} · Dark glass
                  </div>
                  <div className="citem__row">
                    <div className="citem__qty">
                      <button
                        aria-label={`Remove one ${c.name}`}
                        onClick={() => updateQuantity(c.productId, c.quantity - 1)}
                      >
                        –
                      </button>
                      <span>{c.quantity}</span>
                      <button
                        aria-label={`Add one ${c.name}`}
                        onClick={() => updateQuantity(c.productId, c.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="citem__price">
                      {fmt(parseFloat(c.price) * c.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="drawer__foot">
          <div className="drawer__row">
            <span>Subtotal</span>
            <span>{items.length ? fmt(subtotal) : "—"}</span>
          </div>
          <div className="drawer__row">
            <span>Delivery</span>
            <span className="drawer__free">Free</span>
          </div>
          <div className="drawer__total">
            <span className="lbl">Total</span>
            <span className="val">{items.length ? fmt(subtotal) : "—"}</span>
          </div>
          <Link href="/checkout" className="btn">
            <span className="btn__label">Checkout</span>
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </aside>
    </div>
  );
}
