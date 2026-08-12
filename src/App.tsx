import type { ReactNode } from "react";
import "./styles.css";

function Arrow() {
  return <span className="arrow-icon" aria-hidden="true" />;
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
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label="Isaac Levin, home">
          IL<span>.</span>
        </a>
        <a className="header-link" href="#work">Selected work</a>
      </header>

      <section className="intro" id="top">
        <div className="intro-copy">
          <p className="eyebrow">Isaac Levin · Portfolio</p>
          <h1>Products I&apos;ve <em>built.</em></h1>
          <p>A selection of products across Torah, media, and AI.</p>
        </div>

        <div className="portrait-stage">
          <span className="portrait-shape shape-acid" aria-hidden="true" />
          <span className="portrait-shape shape-blue" aria-hidden="true" />
          <figure className="portrait">
            <img src="/isaac-levin.png" alt="Isaac Levin" />
            <figcaption>
              <span>Isaac Levin</span>
              <span>Queens, NY · 2026</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="project-marquee" aria-label="Featured projects">
        <div className="marquee-track">
          <span>ShiurBank</span><i>◆</i>
          <span>Levin Times</span><i>◆</i>
          <span>Torahly</span><i>◆</i>
          <span>ShiurBank</span><i>◆</i>
          <span>Levin Times</span><i>◆</i>
          <span>Torahly</span><i>◆</i>
        </div>
      </div>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="work-heading">
          <div>
            <p className="section-kicker">Selected work</p>
            <span className="work-count">01 / 03</span>
          </div>
          <h2 id="work-title">Three products.<br />Built for real use.</h2>
        </div>

        <div className="project-grid">
          <article className="project-card project-featured shiurbank-card">
            <div className="project-media">
              <img
                src="/projects/shiurbank-home-2026.png"
                alt="ShiurBank home feed with teacher subscriptions, sponsorship options, and recent shiurim"
                width="2119"
                height="1147"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="project-copy">
              <p className="project-label">01 · Founder · Product · Engineering · Growth</p>
              <h3>ShiurBank</h3>
              <p className="project-tagline">Privacy and control for Torah teachers.</p>
              <p className="project-description">
                A Torah platform where teachers and institutions publish,
                organize, share, and monetize content while controlling who can
                see and hear it. Built across web, iOS, Android, and phone, then
                grown through direct sales, outreach, onboarding, and marketing.
              </p>
              <ul className="project-details" aria-label="ShiurBank capabilities">
                <li>Teacher privacy</li>
                <li>Access controls</li>
                <li>Web + mobile + phone</li>
                <li>Sales + marketing</li>
              </ul>
              <ExternalLink className="project-link" href="https://www.shiurbank.org/">
                View ShiurBank <Arrow />
              </ExternalLink>
            </div>
          </article>

          <article className="project-card levin-card">
            <div className="project-media">
              <img
                src="/projects/levin-times-home-2026.png"
                alt="Levin Times homepage with featured reporting and the latest articles"
                width="2119"
                height="1147"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="project-copy">
              <p className="project-label">02 · Product design + engineering</p>
              <h3>Levin Times</h3>
              <p className="project-tagline">An independent media publication.</p>
              <p className="project-description">
                An opinion, analysis, and culture publication with reader
                accounts, contributor applications, editorial workflows, media
                management, submissions, and publishing.
              </p>
              <ExternalLink className="project-link" href="https://levintimes.com/">
                View Levin Times <Arrow />
              </ExternalLink>
            </div>
          </article>

          <article className="project-card torahly-card">
            <div className="project-media">
              <img
                src="/projects/torahly-source-finder-2026.png"
                alt="Torahly Source Finder showing ranked Hebrew and English matches for a Torah phrase"
                width="2119"
                height="1147"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="project-copy">
              <p className="project-label">03 · AI product development</p>
              <h3>Torahly</h3>
              <p className="project-tagline">Find the source behind a Torah phrase.</p>
              <p className="project-description">
                A source finder for Tanach, Mishnah, Gemara, and available
                commentary, with ranked Hebrew and English results that people
                can inspect and trust.
              </p>
              <ExternalLink className="project-link" href="https://www.torahly.com/">
                View Torahly <Arrow />
              </ExternalLink>
            </div>
          </article>
        </div>
      </section>

      <footer>
        <p>© 2026 Isaac Levin</p>
        <a href="#top">Back to top</a>
      </footer>
    </main>
  );
}
