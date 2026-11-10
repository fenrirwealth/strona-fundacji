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
    import('three').then(async T => {
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
      let map: InstanceType<typeof T.Texture>;
      try { map = await new T.TextureLoader().loadAsync('/assets/generated/flag-cinematic-real-v3.webp'); }
      catch { renderer.dispose(); return; }
      if (cancelled) { map.dispose(); renderer.dispose(); return; }
      map.colorSpace = T.SRGBColorSpace;
      map.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      const geometry = new T.PlaneGeometry(4.8, 3.6, 80, 60);
      // Photorealistic fabric, finished in Photoshop. Its lighting is baked into
      // the transparent plate; restrained deformation preserves the woven detail.
      const material = new T.MeshBasicMaterial({ map, transparent: true, side: T.DoubleSide, toneMapped: false, depthWrite: false });
      const flag = new T.Mesh(geometry, material);
      flag.castShadow = false; flag.receiveShadow = false;
      const assembly = new T.Group();
      assembly.rotation.set(0, -.08, .06); assembly.position.set(.3, .1, 0);
      assembly.add(flag); scene.add(assembly);
      const poleGeometry = new T.CylinderGeometry(.025, .035, 5.2, 20);
      const poleMaterial = new T.MeshStandardMaterial({ color: '#b8bcc5', metalness: .8, roughness: .27 });
      const pole = new T.Mesh(poleGeometry, poleMaterial);
      pole.position.set(-2.35, -.63, -.04); assembly.add(pole);
      const finialGeometry = new T.SphereGeometry(.065, 16, 16);
      const finial = new T.Mesh(finialGeometry, poleMaterial);
      finial.position.set(-2.35, 2.01, -.04); assembly.add(finial);
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
          const v = (y + 1.8) / 3.6;
          const wave = Math.sin(u * 7.5 - time * 1.7 + v * 1.4);
          const edge = u * u;
          pos.setXYZ(i,
            x + .06 * edge * Math.sin(time * 1.3 + v * 2),
            y + .09 * edge * wave,
            .12 * u * wave + .035 * edge * Math.sin(v * 6 - time * 2));
        }
        pos.needsUpdate = true;
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
