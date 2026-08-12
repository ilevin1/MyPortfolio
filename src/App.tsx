import { useEffect, useState, type ReactNode } from "react";
import "./styles.css";

function Arrow({
  direction = "up-right",
}: {
  direction?: "up-right" | "right" | "down" | "up";
}) {
  return <span className={`arrow-icon arrow-${direction}`} aria-hidden="true" />;
}

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handlePointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${event.clientY}px`);
    };
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };

    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("isaacglevin@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      <div className="cursor-glow" aria-hidden="true" />

      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Isaac Levin, home">
          IL<span>.</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="available" href="mailto:isaacglevin@gmail.com">
          <span /> Open to good problems
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow reveal-up">AI product developer · Full-stack engineer</p>
          <h1 className="reveal-up delay-1">
            I turn ambitious ideas into products that feel <em>inevitable.</em>
          </h1>
          <p className="hero-intro reveal-up delay-2">
            I&apos;m Isaac Levin—a builder and founder creating useful technology
            at the intersection of AI, media, and Torah.
          </p>
          <div className="hero-actions reveal-up delay-3">
            <a className="button button-dark" href="#work">
              See what I&apos;ve built <Arrow direction="down" />
            </a>
            <a className="text-link" href="mailto:isaacglevin@gmail.com">
              Start a conversation <Arrow />
            </a>
          </div>
        </div>

        <div className="portrait-stage reveal-up delay-2">
          <div className="portrait-disc disc-one" aria-hidden="true" />
          <div className="portrait-disc disc-two" aria-hidden="true" />
          <figure className="portrait-frame">
            <img src="/isaac-levin.png" alt="Isaac Levin" />
            <figcaption>
              <span>Isaac Levin</span>
              <span>Queens, NY · 2026</span>
            </figcaption>
          </figure>
          <span className="float-label label-one">PRODUCT</span>
          <span className="float-label label-two">ENGINEERING</span>
          <span className="float-label label-three">AI</span>
        </div>

        <p className="hero-index" aria-hidden="true">01—26</p>
      </section>

      <div className="marquee" aria-label="Highlights">
        <div className="marquee-track">
          <span>FOUNDER OF SHIURBANK</span><i>◆</i>
          <span>BUILDING AT ARTSCROLL</span><i>◆</i>
          <span>SHIPPING WEB + MOBILE + VOICE</span><i>◆</i>
          <span>FOUNDER OF SHIURBANK</span><i>◆</i>
          <span>BUILDING AT ARTSCROLL</span><i>◆</i>
          <span>SHIPPING WEB + MOBILE + VOICE</span><i>◆</i>
        </div>
      </div>

      <section className="work-section" id="work">
        <div className="section-heading">
          <p className="section-kicker">Selected work · 2025—Now</p>
          <h2>Real products.<br />Real people using them.</h2>
          <p className="section-note">
            I work across product, design, engineering, infrastructure, and launch.
            The interesting part is making all of it feel like one thing.
          </p>
        </div>

        <article className="case-study shiurbank-case">
          <div className="case-number">01</div>
          <div className="case-copy">
            <p className="case-label">Founder & sole product engineer</p>
            <h3>ShiurBank</h3>
            <p className="case-tagline">
              The Torah platform built for how people actually learn.
            </p>
            <p className="case-description">
              A production platform for teachers and institutions to publish,
              organize, share, and monetize Torah content—across the web, iOS,
              Android, and a phone call-in experience.
            </p>
            <ul className="feature-list" aria-label="ShiurBank capabilities">
              <li>Product strategy</li>
              <li>Web + mobile</li>
              <li>Payments</li>
              <li>Media infrastructure</li>
              <li>Analytics</li>
              <li>Production operations</li>
            </ul>
            <ExternalLink className="project-link" href="https://www.shiurbank.org/">
              Visit live product <Arrow />
            </ExternalLink>
          </div>
          <div className="case-visual shiurbank-visual">
            <img
              src="/projects/shiurbank-home-2026.png"
              alt="ShiurBank home feed with teacher subscriptions, sponsorship options, and recent shiurim"
            />
            <div className="visual-stamp">LIVE PRODUCT · 2026</div>
          </div>
        </article>

        <article className="case-study levin-case">
          <div className="case-number">02</div>
          <div className="case-copy">
            <p className="case-label">Product design & engineering</p>
            <h3>Levin Times</h3>
            <p className="case-tagline">A newsroom, not just another news site.</p>
            <p className="case-description">
              An opinion, analysis, and culture publication with the full editorial
              system behind it: reader accounts, contributor applications, role-based
              workflows, media management, submissions, and publishing.
            </p>
            <ul className="feature-list" aria-label="Levin Times capabilities">
              <li>Editorial system</li>
              <li>Custom CMS</li>
              <li>Contributor newsroom</li>
              <li>Secure permissions</li>
              <li>Publication design</li>
            </ul>
            <ExternalLink className="project-link" href="https://levintimes.com/">
              Visit publication <Arrow />
            </ExternalLink>
          </div>
          <div className="case-visual levin-visual">
            <div className="product-shot">
              <img
                src="/projects/levin-times-home-2026.png"
                alt="Levin Times homepage with featured reporting and the latest articles"
              />
              <span className="product-shot-label">LIVE PUBLICATION · 2026</span>
            </div>
          </div>
        </article>

        <article className="case-study torahly-case">
          <div className="case-number">03</div>
          <div className="case-copy">
            <p className="case-label">AI product development</p>
            <h3>Torahly</h3>
            <p className="case-tagline">Find the source behind any Torah phrase.</p>
            <p className="case-description">
              A source-finding system that searches Tanach, Mishnah, Gemara, and
              available commentary with deterministic matching—returning ranked,
              bilingual results people can inspect and trust.
            </p>
            <ul className="feature-list" aria-label="Torahly capabilities">
              <li>Deterministic retrieval</li>
              <li>Hebrew + English</li>
              <li>Ranked matching</li>
              <li>Source navigation</li>
              <li>Search UX</li>
            </ul>
            <ExternalLink className="project-link" href="https://www.torahly.com/">
              Explore Torahly <Arrow />
            </ExternalLink>
          </div>
          <div className="case-visual torahly-visual">
            <div className="product-shot">
              <img
                src="/projects/torahly-source-finder-2026.png"
                alt="Torahly Source Finder showing ranked Hebrew and English matches for a Torah phrase"
              />
              <span className="product-shot-label">SOURCE FINDER · LIVE</span>
            </div>
          </div>
        </article>
      </section>

      <section className="about-section" id="about">
        <div className="about-statement">
          <p className="section-kicker">About</p>
          <h2>
            I don&apos;t just write code. I own the <span>whole problem.</span>
          </h2>
        </div>
        <div className="about-copy">
          <p>
            I&apos;m a product-minded engineer who likes taking an idea from its first
            sketch through databases, interfaces, mobile releases, and the strange
            edge cases that only appear in production.
          </p>
          <p>
            The goal is never technology for its own sake. It&apos;s to make something
            technically serious feel obvious, useful, and genuinely good to use.
          </p>
          <div className="skill-cloud" aria-label="Skills">
            {[
              "React", "React Native", "TypeScript", "Node.js", "PostgreSQL",
              "Supabase", "LLM systems", "Product design", "Shipping",
            ].map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </div>
      </section>

      <section className="context-section" aria-labelledby="context-title">
        <div className="context-intro">
          <p className="section-kicker">Experience & foundation</p>
          <h2 id="context-title">Built across the stack.<br />Grounded in the outcome.</h2>
          <p>
            My path spans AI product development, full-stack engineering,
            research, and operations—experience that helps me turn a fuzzy
            problem into a product people can rely on.
          </p>
          <a href="/resume/isaac-levin-resume.pdf" target="_blank" rel="noreferrer">
            Read the full résumé <Arrow />
          </a>
        </div>
        <div className="timeline">
          <div className="timeline-item current">
            <span className="timeline-year">2026—NOW</span>
            <div>
              <h3>AI Product Developer</h3>
              <p className="timeline-place">ArtScroll</p>
              <p>Building explainable AI tools for manuscript review, source verification, and Hebrew-English text discovery.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="timeline-year">2025—NOW</span>
            <div>
              <h3>Founder & Product Engineer</h3>
              <p className="timeline-place">ShiurBank</p>
              <p>Owning product, engineering, infrastructure, operations, and launch across every surface.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="timeline-year">2025</span>
            <div>
              <h3>AI Research Intern</h3>
              <p className="timeline-place">Shapiro + Raj</p>
              <p>Built multimodal OCR, search, and longitudinal research synthesis workflows.</p>
            </div>
          </div>
          <div className="timeline-item">
            <span className="timeline-year">2024</span>
            <div>
              <h3>Capital Markets Intern</h3>
              <p className="timeline-place">Cushman & Wakefield</p>
              <p>Automated deal workflows and eliminated more than 200 hours of manual work.</p>
            </div>
          </div>
          <div className="timeline-item education">
            <span className="timeline-year">B.S. · 2026</span>
            <div>
              <h3>Computer Science</h3>
              <p className="timeline-place">Touro University</p>
              <p>Dean&apos;s List · Executive Presidential Scholarship · CS Club President</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="section-kicker">Let&apos;s make something excellent</p>
        <h2>Have a hard problem<br />worth building?</h2>
        <div className="contact-row">
          <a className="contact-email" href="mailto:isaacglevin@gmail.com">
            isaacglevin@gmail.com <Arrow />
          </a>
          <button type="button" onClick={copyEmail}>{copied ? "Copied!" : "Copy email"}</button>
        </div>
        <div className="social-links">
          <ExternalLink href="https://github.com/ilevin1">GitHub <Arrow /></ExternalLink>
          <ExternalLink href="https://rb.gy/hzw0w9">LinkedIn <Arrow /></ExternalLink>
          <ExternalLink href="https://www.shiurbank.org/">ShiurBank <Arrow /></ExternalLink>
        </div>
        <div className="contact-orbit" aria-hidden="true">
          <span>IDEA</span><Arrow direction="right" /><span>BUILD</span><Arrow direction="right" /><span>SHIP</span>
        </div>
      </section>

      <footer>
        <p>© 2026 Isaac Levin</p>
        <a href="#top">Back to top <Arrow direction="up" /></a>
      </footer>
    </main>
  );
}
