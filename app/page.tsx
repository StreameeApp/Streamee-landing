'use client';

import { useEffect, useRef, useState } from 'react';

const GithubMark = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.02c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.3-5.27-1.29-5.27-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.7 5.39-5.28 5.68.42.36.78 1.06.78 2.14v3.06c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

const ribbonText = <>DISCOVER <i /> WATCH <i /> FEEL EVERYTHING <i /> YOUR MEDIA <i /> YOUR RULES <i /></>;

function InteractiveBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    let pointerX = -1000;
    let pointerY = -1000;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles = Array.from({ length: 58 }, (_, index) => ({
      x: (index * 137.5) % 1000,
      y: (index * 83.7) % 700,
      vx: Math.sin(index * 2.1) * .12,
      vy: Math.cos(index * 1.7) * .1,
      size: index % 7 === 0 ? 1.7 : .8,
    }));
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.forEach((particle, index) => {
        if (particle.x > width) particle.x = (index * 137.5) % Math.max(width, 1);
        if (particle.y > height) particle.y = (index * 83.7) % Math.max(height, 1);
      });
    };
    const move = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
    };
    const leave = () => { pointerX = -1000; pointerY = -1000; };
    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        const dx = pointerX - particle.x;
        const dy = pointerY - particle.y;
        const distance = Math.hypot(dx, dy);
        if (!reducedMotion && distance < 240 && distance > 1) {
          const force = (1 - distance / 240) * .035;
          particle.vx += (-dy / distance) * force;
          particle.vy += (dx / distance) * force;
        }
        if (!reducedMotion) {
          particle.vx *= .987;
          particle.vy *= .987;
          particle.x += particle.vx;
          particle.y += particle.vy;
        }
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;
      });
      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const a = particles[first];
          const b = particles[second];
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 128) {
            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);
            context.strokeStyle = `rgba(255, 138, 76, ${(1 - distance / 128) * .13})`;
            context.lineWidth = .65;
            context.stroke();
          }
        }
      }
      particles.forEach((particle) => {
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.size > 1 ? 'rgba(255,160,104,.55)' : 'rgba(219,221,226,.3)';
        context.fill();
      });
      if (pointerX > 0) {
        for (let ring = 0; ring < 3; ring += 1) {
          const radius = 34 + ring * 28 + Math.sin(time / 900 + ring) * 5;
          context.beginPath();
          context.arc(pointerX, pointerY, radius, time / 1500 + ring, time / 1500 + ring + Math.PI * 1.12);
          context.strokeStyle = `rgba(255, 138, 76, ${.22 - ring * .055})`;
          context.lineWidth = ring === 0 ? 1.2 : .7;
          context.stroke();
        }
      }
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', leave);
    draw(0);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', leave);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-backdrop" aria-hidden="true" />;
}

function LiveCaptions() {
  const captions = [
    ['00:42:18', 'Every word, right on cue.'],
    ['00:42:21', 'Following the story as it unfolds.'],
    ['00:42:24', 'Generated locally. Arriving live.'],
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % captions.length), 2400);
    return () => window.clearInterval(timer);
  }, [captions.length]);
  return (
    <div className="caption-demo" aria-label={`Live subtitle preview: ${captions[active][1]}`}>
      <small key={`time-${active}`}>{captions[active][0]}</small>
      <strong key={`line-${active}`}>{captions[active][1]}</strong>
      <span aria-hidden="true"><i /><i /><i /><i /><i /></span>
    </div>
  );
}

function SmartSkipDemo() {
  return (
    <div className="timeline-demo" aria-label="Animated intro detection and skip preview">
      <div className="timeline-status"><span>SEGMENT FOUND</span><b>INTRO · 01:28</b></div>
      <div className="timeline-track"><i className="timeline-buffer" /><i className="intro-segment">INTRO</i><i className="timeline-playhead" /><span className="skip-flash">SKIPPED +88s</span></div>
      <div className="timeline-times"><span>00:00</span><span>01:28</span><span>02:06</span></div>
    </div>
  );
}

function LiveMeter() {
  const values = [
    { value: '−18.4', level: 38, gain: '+2.1 dB' },
    { value: '−16.9', level: 51, gain: '+1.4 dB' },
    { value: '−15.8', level: 66, gain: '+0.6 dB' },
    { value: '−16.2', level: 59, gain: '+0.9 dB' },
    { value: '−14.7', level: 78, gain: '−0.3 dB' },
    { value: '−17.1', level: 47, gain: '+1.6 dB' },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % values.length), 720);
    return () => window.clearInterval(timer);
  }, [values.length]);
  const reading = values[active];
  return (
    <div className="meter" style={{ '--meter-level': `${reading.level}%` } as React.CSSProperties} aria-label={`Live loudness ${reading.value} LUFS, gain ${reading.gain}`}>
      <div className="meter-reading"><small>SHORT-TERM LOUDNESS</small><strong key={reading.value}>{reading.value} <em>LUFS</em></strong><span key={reading.gain}>RIDER {reading.gain}</span></div>
      <div className="meter-line"><i /></div>
      <div className="meter-labels"><span>−24</span><span>−18</span><span>−12</span><span>−6</span></div>
    </div>
  );
}

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty('--pointer-x', `${event.clientX}px`);
      root.style.setProperty('--pointer-y', `${event.clientY}px`);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      root.style.setProperty('--scroll-progress', `${max > 0 ? (window.scrollY / max) * 100 : 0}%`);
    };
    const observed = root.querySelectorAll('.manifesto-grid, .cinema-panel, .section-heading, .feature-card, .control-grid article, .open-inner');
    observed.forEach((element) => element.classList.add('will-reveal'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible'));
    }, { threshold: .14 });
    observed.forEach((element) => observer.observe(element));
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const moveStage = (event: React.PointerEvent<HTMLElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    stage.style.setProperty('--rx', `${y * -5}deg`);
    stage.style.setProperty('--ry', `${x * 7}deg`);
    stage.style.setProperty('--mx', `${(x + .5) * 100}%`);
    stage.style.setProperty('--my', `${(y + .5) * 100}%`);
  };

  const resetStage = () => {
    stageRef.current?.style.setProperty('--rx', '0deg');
    stageRef.current?.style.setProperty('--ry', '0deg');
  };

  return (
    <main ref={mainRef}>
      <div className="scroll-progress" aria-hidden="true" />
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

      <section className="hero" id="top" onPointerMove={moveStage} onPointerLeave={resetStage}>
        <InteractiveBackdrop />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-index" aria-hidden="true">STREAMEE / 2026<br />DESKTOP MEDIA EXPERIENCE</div>
        <div className="eyebrow"><i /> This is your screening room</div>
        <h1><span>Make movie night</span><br /><em>feel like an event.</em></h1>
        <p className="hero-copy">One obsessive Windows app for discovering what’s next—and experiencing every frame on your terms.</p>
        <div className="hero-actions">
          <a className="button primary" href="https://github.com/StreameeApp/Streamee-app/releases/latest">Get Streamee <span>↗</span></a>
          <a className="button secondary" href="https://github.com/StreameeApp/Streamee-app"><GithubMark /> View on GitHub</a>
        </div>
        <p className="compatibility"><span>⊞</span> Windows 10 &amp; 11 <b>•</b> Free &amp; open source <b>•</b> Powered by MPV</p>

        <div className="product-stage" ref={stageRef} aria-label="Interactive Streamee desktop application preview">
          <div className="stage-orbit orbit-one" aria-hidden="true" />
          <div className="stage-orbit orbit-two" aria-hidden="true" />
          <div className="stage-halo" aria-hidden="true" />
          <div className="window">
            <div className="window-bar">
              <div className="window-brand"><span className="mini-mark" /> Streamee</div>
              <div className="window-controls"><i /><i /><i /></div>
            </div>
            <img src="/streamee-board.png" alt="Streamee discovery board showing Continue Watching and a personal media library" />
          </div>
          <aside className="floating-note note-left"><span className="note-icon">◫</span><span><small>LOCAL FIRST</small><strong>Your choices stay yours.</strong></span></aside>
          <aside className="floating-note note-right"><span className="note-icon">⌁</span><span><small>POWERED BY MPV</small><strong>Playback without compromise.</strong></span></aside>
          <aside className="floating-note note-top"><span className="live-dot" /><span><small>WHISPERLIVE</small><strong>Subtitles appearing now</strong></span></aside>
        </div>
        <a className="scroll-cue" href="#experience"><span>SCROLL TO ENTER</span><i /></a>
      </section>

      <div className="kinetic-ribbon" aria-hidden="true"><div className="ribbon-track"><span>{ribbonText}</span><span>{ribbonText}</span><span>{ribbonText}</span><span>{ribbonText}</span></div></div>

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

      <section className="statement" aria-label="Streamee philosophy">
        <div className="statement-line">NO FEED TO PLEASE.</div>
        <div className="statement-line outline">NO PLATFORM TO SERVE.</div>
        <div className="statement-line accent">JUST THE NIGHT AHEAD.</div>
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
            <LiveCaptions />
          </article>
          <article className="feature-card warm-card">
            <div className="feature-number">03</div><span className="feature-icon">↗</span>
            <h3>Smart enough<br />to stay out of the way.</h3>
            <p>Conservative intro, recap, and outro detection—with Smart Next prepared before you need it.</p>
            <SmartSkipDemo />
          </article>
          <article className="feature-card feature-wide">
            <div><div className="feature-number">04</div><span className="feature-icon">dB</span><h3>Dialogue that stays with you.</h3><p>A real-time EBU R128 loudness rider lifts sustained quiet material, holds during silence, and protects the final output from clipping.</p></div>
            <LiveMeter />
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
