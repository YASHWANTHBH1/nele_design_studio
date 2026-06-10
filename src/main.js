if (window.React && window.ReactDOM) {
const { createElement: h } = React;

const projects = [
  {
    title: "Architectural Visualization",
    type: "Residential render series",
    tone: "Warm ivory facade study with late-afternoon light",
    className: "project-architecture",
  },
  {
    title: "Product Design",
    type: "Object language and form direction",
    tone: "Ruby surface study with gallery-grade shadows",
    className: "project-product",
  },
  {
    title: "Graphic Design",
    type: "Identity system and editorial campaign",
    tone: "Sun yellow brand field with restrained typography",
    className: "project-graphic",
  },
];

const services = [
  "Architectural Visualization",
  "Graphic Design",
  "Product Design",
];

const clients = ["Atelier Vora", "Maven Build", "Luma House", "Forma Works", "Aster Living"];

function Logo({ compact = false }) {
  return h(
    "a",
    { className: compact ? "brand brand-compact" : "brand", href: "#top", "aria-label": "Nele Design Studio home" },
    h("span", { className: "brand-mark", "aria-hidden": "true" }, "NDS"),
    h(
      "span",
      { className: "brand-text" },
      h("strong", null, "Nele"),
      h("span", null, "Design Studio")
    )
  );
}

function Button({ children, variant = "primary", href = "#" }) {
  return h("a", { className: `button button-${variant}`, href }, children);
}

function MediaFrame({ className, label, meta, wide = false }) {
  return h(
    "div",
    { className: `media-frame ${wide ? "media-wide" : ""} ${className || ""}` },
    h("div", { className: "frame-inner" }),
    h(
      "div",
      { className: "frame-caption" },
      h("span", null, label),
      h("small", null, meta)
    )
  );
}

function Header() {
  return h(
    "header",
    { className: "site-header" },
    Logo({ compact: true }),
    h(
      "nav",
      { className: "nav-links", "aria-label": "Primary navigation" },
      h("a", { href: "#work" }, "Work"),
      h("a", { href: "#studio" }, "Studio"),
      h("a", { href: "#services" }, "Services"),
      h("a", { href: "#contact" }, "Contact")
    )
  );
}

function Hero() {
  return h(
    "section",
    { className: "hero section-band", id: "top" },
    h(
      "div",
      { className: "hero-copy" },
      Logo({}),
      h("p", { className: "eyebrow" }, "Premium multidisciplinary design house"),
      h("h1", null, "Designing Spaces. Defining Experiences."),
      h(
        "p",
        { className: "hero-lede" },
        "Nele Design Studio shapes architectural imagery, visual identities, and product stories with a calm editorial eye and a precise design process."
      ),
      h(
        "div",
        { className: "hero-actions" },
        Button({ href: "#work", children: "View Our Work" }),
        Button({ href: "#services", variant: "secondary", children: "Explore Services" })
      )
    ),
    h(
      "div",
      { className: "hero-visual" },
      MediaFrame({
        className: "hero-frame",
        label: "Hero render / video slot",
        meta: "Replace with architectural film or render",
        wide: true,
      })
    )
  );
}

function FeaturedProjects() {
  return h(
    "section",
    { className: "featured section-band", id: "work" },
    h(
      "div",
      { className: "section-heading" },
      h("p", { className: "eyebrow" }, "Featured Projects"),
      h("h2", null, "Visual stories across space, product, and brand.")
    ),
    h(
      "div",
      { className: "project-grid" },
      ...projects.map((project, index) =>
        h(
          "article",
          { className: "project", key: project.title },
          MediaFrame({
            className: project.className,
            label: `Project ${String(index + 1).padStart(2, "0")}`,
            meta: project.type,
          }),
          h("div", { className: "project-meta" }, h("h3", null, project.title), h("p", null, project.tone))
        )
      )
    )
  );
}

function Philosophy() {
  return h(
    "section",
    { className: "philosophy", id: "studio" },
    h(
      "div",
      { className: "philosophy-media" },
      MediaFrame({
        className: "studio-frame",
        label: "Studio atmosphere / process film",
        meta: "Dark editorial media placement",
        wide: true,
      })
    ),
    h(
      "div",
      { className: "philosophy-copy" },
      h("p", { className: "eyebrow" }, "Studio Philosophy"),
      h(
        "h2",
        null,
        "We design the feeling before the object, the frame before the image, and the experience before the detail."
      ),
      h(
        "p",
        null,
        "Every output is treated as a complete visual world: composed, restrained, and built to make the viewer pause."
      )
    )
  );
}

function Services() {
  return h(
    "section",
    { className: "services section-band", id: "services" },
    h(
      "div",
      { className: "section-heading narrow" },
      h("p", { className: "eyebrow" }, "Services"),
      h("h2", null, "A focused studio model for design-led brands and spaces.")
    ),
    h(
      "div",
      { className: "service-list" },
      ...services.map((service, index) =>
        h(
          "article",
          { className: "service-row", key: service },
          h("span", null, String(index + 1).padStart(2, "0")),
          h("h3", null, service),
          h("p", null, "Creative direction, production-ready design systems, and premium visual presentation tailored to the project context.")
        )
      )
    )
  );
}

function Trust() {
  const marqueeItems = [...clients, ...clients];

  return h(
    "section",
    { className: "trust section-band" },
    h("p", { className: "eyebrow" }, "Trusted by design-conscious teams"),
    h(
      "div",
      { className: "client-marquee", "aria-label": "Client names" },
      h(
        "div",
        { className: "client-track" },
        ...marqueeItems.map((client, index) =>
          h("span", { key: `${client}-${index}` }, client)
        )
      )
    )
  );
}

function Footer() {
  return h(
    "footer",
    { className: "footer", id: "contact" },
    h(
      "div",
      null,
      Logo({ compact: true }),
      h("p", null, "Architectural visualization, graphic design, and product design for premium experiences.")
    ),
    h(
      "div",
      { className: "footer-contact" },
      h("a", { href: "mailto:hello@neledesign.studio" }, "hello@neledesign.studio"),
      h("a", { href: "#top" }, "Back to top")
    )
  );
}

function App() {
  return h(React.Fragment, null, Header(), h("main", null, Hero(), FeaturedProjects(), Philosophy(), Services(), Trust()), Footer());
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));
}
