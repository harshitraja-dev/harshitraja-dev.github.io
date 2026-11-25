import * as THREE from 'three';

/**
 * Procedural BIM-style building: storeys drawn as edges, a section plane that
 * sweeps upward and "fills" each storey as it passes, slow orbit + mouse parallax.
 * Returns a cleanup function.
 */
export function mountBuilding(container: HTMLElement): () => void {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);
  renderer.domElement.style.display = 'block';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  camera.position.set(17, 11, 19);
  const target = new THREE.Vector3(0, 4.2, 0);

  const CYAN = 0x4cc9f0;
  const AMBER = 0xffb547;

  const building = new THREE.Group();
  scene.add(building);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(x: T) => {
    disposables.push(x);
    return x;
  };

  const edgeMat = track(new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.6 }));
  const faintMat = track(new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.22 }));

  const STOREYS = 8;
  const H = 1.15;
  const fills: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; y: number; edges: THREE.LineSegments }[] = [];

  for (let i = 0; i < STOREYS; i++) {
    // gentle setbacks toward the top
    const w = i < 5 ? 6 : i < 7 ? 4.6 : 3.2;
    const d = i < 5 ? 4 : i < 7 ? 3.4 : 2.6;
    const y = i * H;

    // slab
    const slab = track(new THREE.BoxGeometry(w, 0.12, d));
    const slabEdges = new THREE.LineSegments(track(new THREE.EdgesGeometry(slab)), edgeMat.clone());
    track(slabEdges.material as THREE.Material);
    slabEdges.position.y = y;
    building.add(slabEdges);

    // storey volume fill (revealed by section plane)
    const vol = track(new THREE.BoxGeometry(w - 0.06, H - 0.14, d - 0.06));
    const mat = track(new THREE.MeshBasicMaterial({ color: AMBER, transparent: true, opacity: 0, depthWrite: false }));
    const mesh = new THREE.Mesh(vol, mat);
    mesh.position.y = y + H / 2;
    building.add(mesh);
    fills.push({ mesh, mat, y, edges: slabEdges });

    // columns on a structural grid
    const pts: number[] = [];
    const nx = Math.round(w / 1.5);
    const nz = Math.round(d / 1.3);
    for (let ix = 0; ix <= nx; ix++) {
      for (let iz = 0; iz <= nz; iz++) {
        const onEdge = ix === 0 || ix === nx || iz === 0 || iz === nz;
        if (!onEdge && (ix + iz) % 2) continue;
        const x = -w / 2 + (ix * w) / nx;
        const z = -d / 2 + (iz * d) / nz;
        pts.push(x, y, z, x, y + H, z);
      }
    }
    const colGeo = track(new THREE.BufferGeometry());
    colGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    building.add(new THREE.LineSegments(colGeo, faintMat));
  }

  // roof slab
  const roof = track(new THREE.BoxGeometry(3.2, 0.12, 2.6));
  const roofEdges = new THREE.LineSegments(track(new THREE.EdgesGeometry(roof)), edgeMat);
  roofEdges.position.y = STOREYS * H;
  building.add(roofEdges);

  // core / lift shaft
  const core = track(new THREE.BoxGeometry(1, STOREYS * H + 0.8, 1));
  const coreEdges = new THREE.LineSegments(track(new THREE.EdgesGeometry(core)), edgeMat);
  coreEdges.position.set(0.6, (STOREYS * H + 0.8) / 2, 0.2);
  building.add(coreEdges);

  // ground grid
  const grid = new THREE.GridHelper(36, 36, 0x2a6f86, 0x14203a);
  (grid.material as THREE.Material).transparent = true;
  (grid.material as THREE.Material).opacity = 0.5;
  track(grid.geometry);
  track(grid.material as THREE.Material);
  scene.add(grid);

  // section plane
  const planeGeo = track(new THREE.PlaneGeometry(8.4, 6.4));
  const planeMat = track(
    new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false }),
  );
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotation.x = -Math.PI / 2;
  const planeEdge = new THREE.LineSegments(
    track(new THREE.EdgesGeometry(planeGeo)),
    track(new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: 0.9 })),
  );
  plane.add(planeEdge);
  scene.add(plane);

  const TOP = STOREYS * H + 0.4;
  const PERIOD = 9; // seconds per sweep cycle

  // interaction
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    camera.aspect = w / h;
    // pull back on narrow screens so the building fits
    camera.zoom = w < 500 ? 0.8 : 1;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  const clock = new THREE.Clock();
  let raf = 0;
  let visible = true;

  const update = (t: number) => {
    const phase = (t % PERIOD) / PERIOD;
    const sweep = Math.min(phase / 0.7, 1); // 70% sweep, 30% hold/fade
    const fade = phase > 0.85 ? 1 - (phase - 0.85) / 0.15 : 1;
    const py = sweep * TOP;
    plane.position.y = py;
    planeMat.opacity = 0.07 * fade;
    (planeEdge.material as THREE.LineBasicMaterial).opacity = 0.9 * fade;

    for (const f of fills) {
      const k = THREE.MathUtils.clamp((py - f.y) / H, 0, 1);
      f.mat.opacity = k * 0.13 * fade;
      const em = f.edges.material as THREE.LineBasicMaterial;
      const near = Math.abs(py - f.y) < 0.35 && fade > 0.5;
      em.color.setHex(near ? AMBER : CYAN);
      em.opacity = near ? 1 : 0.6;
    }
  };

  const render = () => {
    const t = clock.getElapsedTime();
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;
    building.rotation.y = t * 0.12 + mouse.x * 0.25;
    camera.position.y = 11 - mouse.y * 1.5;
    camera.lookAt(target);
    update(t);
    renderer.render(scene, camera);
  };

  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (visible) render();
  };

  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(container);

  if (reduceMotion) {
    building.rotation.y = 0.6;
    camera.lookAt(target);
    update(PERIOD * 0.72);
    renderer.render(scene, camera);
  } else {
    loop();
  }

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('pointermove', onMove);
    ro.disconnect();
    io.disconnect();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  };
}
