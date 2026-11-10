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
      renderer.toneMappingExposure = 1.1;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFSoftShadowMap;
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(34, 1, .1, 30);
      camera.position.set(.1, .1, 8.8);
      camera.lookAt(0, 0, 0);
      scene.add(new T.HemisphereLight(0xc8ddff, 0x221826, .65));
      const key = new T.DirectionalLight(0xfff5e6, 4.2); key.position.set(-3, 4, 2); key.castShadow = true; key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -4; key.shadow.camera.right = 4;
      key.shadow.camera.top = 4; key.shadow.camera.bottom = -4;
      key.shadow.bias = -.001; key.shadow.normalBias = .015; scene.add(key);
      const rim = new T.DirectionalLight(0xbfdcff, 3); rim.position.set(4, 3, -2); scene.add(rim);
      const textureCanvas = document.createElement('canvas');
      textureCanvas.width = 1024; textureCanvas.height = 640;
      const ctx = textureCanvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 1024, 320);
      ctx.fillStyle = '#c8102e'; ctx.fillRect(0, 320, 1024, 320);
      // Fine woven threads, with equal horizontal white and red fields.
      ctx.fillStyle = 'rgba(20,15,25,.025)';
      for (let x = 0; x < 1024; x += 3) ctx.fillRect(x, 0, 1, 640);
      ctx.fillStyle = 'rgba(255,255,255,.025)';
      for (let y = 0; y < 640; y += 3) ctx.fillRect(0, y, 1024, 1);
      const map = new T.CanvasTexture(textureCanvas); map.colorSpace = T.SRGBColorSpace;
      map.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      const geometry = new T.PlaneGeometry(4.8, 3, 160, 80);
      const material = new T.MeshPhysicalMaterial({ map, side: T.DoubleSide, roughness: .78, metalness: 0, sheen: .65, sheenColor: new T.Color('#ffffff'), sheenRoughness: .65 });
      const flag = new T.Mesh(geometry, material);
      flag.castShadow = true; flag.receiveShadow = true;
      const assembly = new T.Group();
      assembly.rotation.set(.08, -.3, .12); assembly.position.set(.3, .1, 0);
      assembly.add(flag); scene.add(assembly);
      const poleGeometry = new T.CylinderGeometry(.025, .035, 5.2, 20);
      const poleMaterial = new T.MeshStandardMaterial({ color: '#b8bcc5', metalness: .8, roughness: .27 });
      const pole = new T.Mesh(poleGeometry, poleMaterial);
      pole.position.set(-2.43, -.85, 0); assembly.add(pole);
      const finialGeometry = new T.SphereGeometry(.065, 16, 16);
      const finial = new T.Mesh(finialGeometry, poleMaterial);
      finial.position.set(-2.43, 1.79, 0); assembly.add(finial);
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
          const v = (y + 1.5) / 3;
          // Traveling folds gather near the fixed hoist and open toward the free edge.
          // Longitudinal compression keeps the fabric from looking like an elastic sheet.
          const gust = .88 + .12 * Math.sin(time * .7);
          const phase = u * 9.2 - time * 2.15 + v * 1.5;
          const billow = Math.sin(phase) * (.16 + .52 * u) * gust;
          const diagonal = Math.sin(u * 16 - v * 3.4 - time * 2.8) * .11 * u;
          const gather = Math.sin(v * 12 + u * 13 - time * 1.6) * .07 * Math.sin(Math.PI * u);
          const sag = -.4 * Math.sin(u * Math.PI * .8) * (1 - .3 * v);
          const flutter = .1 * u * u * Math.sin(time * 3.5 - u * 8 + v * 3);
          pos.setXYZ(i, -2.4 + 4.15 * u + .13 * u * Math.cos(phase), y + sag + flutter, u * .25 + (billow + diagonal + gather) * Math.min(1, u * 8));
        }
        pos.needsUpdate = true; geometry.computeVertexNormals();
        camera.position.set(.12 + Math.sin(time * .12) * .13, .12 + Math.cos(time * .16) * .08, 8.5 + Math.sin(time * .14) * .25);
        camera.lookAt(0, -.08, 0);
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
      dispose = () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); geometry.dispose(); poleGeometry.dispose(); finialGeometry.dispose(); poleMaterial.dispose(); material.dispose(); map.dispose(); renderer.dispose(); renderer.domElement.remove(); element.classList.remove('flag-ready'); };
    }).catch(() => {});
    return () => { cancelled = true; dispose(); };
  }, [visible]);

  if (!visible) return null;
  return <section className={`independence${paused ? " independence-is-paused" : ""}`} aria-labelledby="independence-title">
    <div className="independence-atmosphere" aria-hidden="true" /><div className="independence-haze" aria-hidden="true" />
    <div className="independence-content">
      <p className="independence-kicker"><span />11 listopada · Narodowe Święto Niepodległości</p>
      <h2 id="independence-title"><span className="independence-title-main">Niepodległa.</span><em>Z pokolenia<br />na pokolenie.</em></h2>
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
