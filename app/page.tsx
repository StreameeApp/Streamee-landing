const GithubMark = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.27-1.29-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.39-5.28 5.68.42.36.78 1.06.78 2.14v3.06c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Streamee home">
          <span className="brand-mark"><span /></span>
          <span>Streamee</span>
        </a>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#features">Features</a>
          <a href="#open-source">Open source</a>
        </div>
        <a className="nav-cta" href="https://github.com/StreameeApp/Streamee-app/releases/latest">Download for Windows</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow" aria-hidden="true" />
        <div className="eyebrow"><i /> Crafted for the big screen</div>
        <h1>Your media.<br /><em>Beautifully yours.</em></h1>
        <p className="hero-copy">Discover what to watch, play the sources you trust, and experience every frame through a desktop player built around you.</p>
        <div className="hero-actions">
          <a className="button primary" href="https://github.com/StreameeApp/Streamee-app/releases/latest">Get Streamee <span>↗</span></a>
          <a className="button secondary" href="https://github.com/StreameeApp/Streamee-app"><GithubMark /> View on GitHub</a>
        </div>
        <p className="compatibility"><span>⊞</span> Windows 10 &amp; 11 <b>•</b> Free &amp; open source</p>

        <div className="product-stage" aria-label="Streamee desktop application preview">
          <div className="stage-orbit orbit-one" aria-hidden="true" />
          <div className="stage-orbit orbit-two" aria-hidden="true" />
          <div className="window">
            <div className="window-bar">
              <div className="window-brand"><span className="mini-mark" /> Streamee</div>
              <div className="window-controls"><i /><i /><i /></div>
            </div>
            <img src="/streamee-board.png" alt="Streamee discovery board showing Continue Watching and a personal media library" />
          </div>
          <aside className="floating-note note-left"><span className="note-icon">◫</span><span><small>LOCAL FIRST</small><strong>Your choices stay yours.</strong></span></aside>
          <aside className="floating-note note-right"><span className="note-icon">⌁</span><span><small>POWERED BY MPV</small><strong>Playback without compromise.</strong></span></aside>
        </div>
      </section>

      <section className="manifesto section-shell" id="experience">
        <p className="kicker">01 / THE EXPERIENCE</p>
        <div className="manifesto-grid">
          <h2>Not another<br />streaming service.<br /><em>Your command center.</em></h2>
          <div className="manifesto-copy">
            <p>Streamee brings discovery, your library, and serious playback into one refined Windows desktop experience.</p>
            <p>No bundled media. No locked-in catalog. You choose the services you trust and the sources you are authorized to play.</p>
            <div className="principles">
              <span><b>01</b> Your sources</span>
              <span><b>02</b> Your settings</span>
              <span><b>03</b> Your history</span>
            </div>
          </div>
        </div>
      </section>

      <section className="cinema-panel section-shell">
        <div className="cinema-copy">
          <p className="kicker">DETAIL WITHOUT THE NOISE</p>
          <h2>A library that feels<br /><em>alive.</em></h2>
          <p>Move from a beautifully organized board to rich title pages, cast, seasons, trailers, ratings, watchlists, and the next thing worth watching.</p>
          <ul>
            <li><span>↗</span> Continue exactly where you left off</li>
            <li><span>↗</span> Browse TMDB-powered discovery</li>
            <li><span>↗</span> Sync watchlists and history with Trakt</li>
          </ul>
        </div>
        <div className="cinema-shot">
          <div className="shot-label"><i /> TITLE VIEW</div>
          <img src="/streamee-details.png" alt="Streamee title details interface with cast, ratings and related titles" />
        </div>
      </section>

      <section className="feature-section section-shell" id="features">
        <div className="section-heading">
          <p className="kicker">02 / BUILT DIFFERENT</p>
          <h2>Every frame,<br /><em>considered.</em></h2>
          <p>Streamee’s playback stack is not an afterthought. It is the product.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card feature-large">
            <div className="feature-number">01</div><span className="feature-icon">◉</span>
            <h3>MPV at the core.</h3>
            <p>Bundled, anchored to the Streamee window, and tuned with track control, resume, speed, fullscreen, and a configurable processing chain.</p>
            <div className="audio-wave" aria-hidden="true">{[22,38,58,31,72,94,49,64,84,36,55,78,45,67,29,52,88,61,34,73,48,91,41,63].map((height,index)=><i key={index} style={{height}} />)}</div>
          </article>
          <article className="feature-card">
            <div className="feature-number">02</div><span className="feature-icon">CC</span>
            <h3>Subtitles,<br />generated live.</h3>
            <p>WhisperLive progressively transcribes the selected audio track on your own machine, with CPU and CUDA support.</p>
            <div className="caption-demo"><small>00:42:18</small><strong>Every word, right on cue.</strong><span><i /><i /><i /><i /><i /></span></div>
          </article>
          <article className="feature-card warm-card">
            <div className="feature-number">03</div><span className="feature-icon">↗</span>
            <h3>Smart enough<br />to stay out of the way.</h3>
            <p>Conservative intro, recap, and outro detection—with Smart Next prepared before you need it.</p>
            <div className="timeline-demo"><span>INTRO</span><i /><b>42:16</b></div>
          </article>
          <article className="feature-card feature-wide">
            <div><div className="feature-number">04</div><span className="feature-icon">dB</span><h3>Dialogue that stays with you.</h3><p>A real-time EBU R128 loudness rider lifts sustained quiet material, holds during silence, and protects the final output from clipping.</p></div>
            <div className="meter"><div className="meter-reading"><small>INTEGRATED</small><strong>−16.2 <em>LUFS</em></strong></div><div className="meter-line"><i /></div><div className="meter-labels"><span>−24</span><span>−18</span><span>−12</span><span>−6</span></div></div>
          </article>
        </div>
      </section>

      <section className="control-section section-shell">
        <p className="kicker">03 / YOUR RULES</p>
        <h2>Power without<br /><em>the prescription.</em></h2>
        <div className="control-grid">
          <article><span>01</span><h3>Bring your add-ons</h3><p>Install compatible source services you choose. Streamee keeps configured URLs in Windows Credential Manager and returns only opaque stream handles to the interface.</p></article>
          <article><span>02</span><h3>Tune the picture</h3><p>Choose upscaling, sharpening, denoising, debanding, HDR handling, or optional SVP integration—without being locked into one rendering profile.</p></article>
          <article><span>03</span><h3>Keep it close</h3><p>Persistent cache is optional. Playback history and preferences stay on your device, and the phone remote is served only while you enable it.</p></article>
        </div>
      </section>

      <section className="open-section" id="open-source">
        <div className="open-inner section-shell">
          <div className="open-mark"><GithubMark /></div>
          <p className="kicker">OPEN BY DESIGN</p>
          <h2>Built in the open.<br /><em>Yours to inspect.</em></h2>
          <p>Streamee is free software for Windows, built with Tauri, Rust, React, TypeScript, and MPV. Follow the code, report an issue, or help shape what comes next.</p>
          <div className="hero-actions">
            <a className="button primary" href="https://github.com/StreameeApp/Streamee-app/releases/latest">Download latest release <span>↗</span></a>
            <a className="button secondary" href="https://github.com/StreameeApp/Streamee-app"><GithubMark /> Explore the repository</a>
          </div>
          <div className="tech-line"><span>TAURI 2</span><i /><span>RUST</span><i /><span>REACT</span><i /><span>MPV</span><i /><span>GPL-3.0+</span></div>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark"><span /></span><strong>Streamee</strong></div>
        <p>Discover freely. Watch responsibly.</p>
        <div><a href="https://github.com/StreameeApp/Streamee-app">GitHub</a><a href="https://github.com/StreameeApp/Streamee-app/releases/latest">Releases</a><a href="https://github.com/StreameeApp/Streamee-app/blob/main/LICENSE">License</a></div>
      </footer>
    </main>
  );
}
