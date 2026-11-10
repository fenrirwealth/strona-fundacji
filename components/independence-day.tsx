'use client';

import { useEffect, useRef, useState } from 'react';
import './independence-day.css';

const START = Date.parse('2026-11-10T00:00:00+01:00');
const END = Date.parse('2026-11-12T00:00:00+01:00');

/** A bounded seasonal installation; Warsaw dates, independent of visitor timezone. */
export function IndependenceDay() {
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const pause = useRef(false);
  useEffect(() => {
    const check = () => setVisible(Date.now() >= START && Date.now() < END);
    check();
    const timer = setInterval(check, 30000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => { pause.current = paused; }, [paused]);
  useEffect(() => {
    if (!visible || !host.current) return;
    const element = host.current;
    let cancelled = false;
    let dispose = () => {};
    import('three').then(T => {
      if (cancelled) return;
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
      catch { return; } // The static flag remains visible without WebGL.
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(34, 1, .1, 30);
      camera.position.set(.3, .15, 7.8);
      camera.lookAt(0, 0, 0);
      scene.add(new T.HemisphereLight(0xeaf2ff, 0x493547, 2.2));
      const key = new T.DirectionalLight(0xfff5e6, 3.6); key.position.set(-3, 5, 5); scene.add(key);
      const rim = new T.DirectionalLight(0xbfdcff, 2); rim.position.set(3, 1, -3); scene.add(rim);
      const textureCanvas = document.createElement('canvas');
      textureCanvas.width = 1024; textureCanvas.height = 640;
      const ctx = textureCanvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 1024, 320);
      ctx.fillStyle = '#b90829'; ctx.fillRect(0, 320, 1024, 320);
      // Fine woven threads, with equal horizontal white and red fields.
      ctx.fillStyle = 'rgba(20,15,25,.055)';
      for (let x = 0; x < 1024; x += 3) ctx.fillRect(x, 0, 1, 640);
      ctx.fillStyle = 'rgba(255,255,255,.065)';
      for (let y = 0; y < 640; y += 3) ctx.fillRect(0, y, 1024, 1);
      const map = new T.CanvasTexture(textureCanvas); map.colorSpace = T.SRGBColorSpace;
      map.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      const geometry = new T.PlaneGeometry(4.8, 3, 100, 56);
      const material = new T.MeshPhysicalMaterial({ map, side: T.DoubleSide, roughness: .62, metalness: 0, sheen: .28, sheenColor: new T.Color('#ffffff'), sheenRoughness: .65 });
      const flag = new T.Mesh(geometry, material);
      flag.rotation.set(-.08, -.23, .08); scene.add(flag);
      const original = Float32Array.from(geometry.attributes.position.array);
      const pos = geometry.attributes.position;
      const reduced = matchMedia('(prefers-reduced-motion: reduce)');
      let inView = true, frame = 0, time = 1.8, previous = 0, rendered = false;
      const draw = (now: number) => {
        frame = requestAnimationFrame(draw);
        const delta = previous ? Math.min((now - previous) / 1000, .05) : 0;
        previous = now;
        if (!inView || document.hidden) return;
        if (rendered && (pause.current || reduced.matches)) return;
        if (!pause.current && !reduced.matches) time += delta * .85;
        for (let i = 0; i < pos.count; i++) {
          const x = original[i * 3], y = original[i * 3 + 1], u = (x + 2.4) / 4.8;
          const amplitude = .07 + Math.pow(u, .7) * .39;
          const wave = x * 2.8 - time * 2.1 + y * .65;
          pos.setXYZ(i, x - u * .13 * Math.sin(wave), y + u * .13 * Math.sin(x * 1.6 - time * 1.5) - .12 * u, amplitude * Math.sin(wave) + .075 * u * Math.sin(x * 5.6 + y * 2 - time * 2.7));
        }
        pos.needsUpdate = true; geometry.computeVertexNormals();
        renderer.render(scene, camera); rendered = true;
      };
      const resize = new ResizeObserver(() => {
        const w = element.clientWidth, h = element.clientHeight;
        rendered = false; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
      });
      const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; });
      element.appendChild(renderer.domElement);
      element.classList.add('flag-ready');
      resize.observe(element); observer.observe(element); frame = requestAnimationFrame(draw);
      dispose = () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); geometry.dispose(); material.dispose(); map.dispose(); renderer.dispose(); renderer.domElement.remove(); element.classList.remove('flag-ready'); };
    }).catch(() => {});
    return () => { cancelled = true; dispose(); };
  }, [visible]);

  if (!visible) return null;
  return <section className="independence" aria-labelledby="independence-title">
    <div className="independence-orbit" aria-hidden="true" />
    <div className="independence-content">
      <p className="independence-kicker"><span />11 listopada · Narodowe Święto Niepodległości</p>
      <h2 id="independence-title">Wolność.<br />Wspólnota.<br /><em>Dobre jutro.</em></h2>
      <blockquote className="independence-quote" cite="https://www.gov.pl/web/obrona-narodowa/szef-mon-na-dniu-podchorazego-">„Być zwyciężonym i nie ulec — to zwycięstwo.”<cite>Józef Piłsudski</cite></blockquote><p className="independence-description">W biało-czerwonych barwach świętujemy to, co nas łączy. Z troską o dzieci. Z wiarą w przyszłość.</p>
      <a className="independence-link" href="#swiateczna-zbiorka">Twórzmy razem dobre jutro <span aria-hidden="true">↗</span></a>
    </div>
    <div className="independence-art" role="img" aria-label="Biało-czerwona flaga Polski, delikatnie falująca na wietrze">
      <div className="independence-year" aria-hidden="true">11<span>/</span>11</div>
      <div className="independence-flag" ref={host} aria-hidden="true"><div className="independence-fallback" /></div>
      <div className="independence-caption">1918 — 2026 <span>Wspólnie pielęgnujemy wolność</span></div>
    </div>
    <button type="button" className="independence-pause" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Wznów animację' : 'Zatrzymaj animację'}</button>
    <div className="independence-bottom" aria-hidden="true"><span /> <span /></div>
  </section>;
}
