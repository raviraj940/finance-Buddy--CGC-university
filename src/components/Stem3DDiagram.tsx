import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  PROGRAMMES_DATASET,
  CGCUET_SCHOLARSHIPS,
  JEE_MAIN_SCHOLARSHIPS
} from '../data/cgcFinancialDataset';
import { ProgrammeFee } from '../types';
import {
  RotateCcw,
  Sparkles,
  Info,
  DollarSign,
  Award,
  BookOpen,
  ArrowRight,
  Maximize2,
  Cpu,
  Layers
} from 'lucide-react';

interface Stem3DDiagramProps {
  onAskAboutProgramme: (question: string) => void;
}

export const Stem3DDiagram: React.FC<Stem3DDiagramProps> = ({ onAskAboutProgramme }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedProgCode, setSelectedProgCode] = useState<string>('BTECH_CSE');
  const [cgcuetScore, setCgcuetScore] = useState<number>(91);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);

  // STEM programmes filter
  const stemProgrammes = PROGRAMMES_DATASET.filter(p => p.isStem);
  const currentProgramme = stemProgrammes.find(p => p.code === selectedProgCode) || stemProgrammes[0];

  // Calculate scholarship band
  const matchedSlab = CGCUET_SCHOLARSHIPS.find(
    s => cgcuetScore >= (s.minScore ?? 0) && cgcuetScore <= (s.maxScore ?? 100)
  );
  const waiverPercent = matchedSlab ? matchedSlab.percentageWaiver : 0;
  const semTuition = currentProgramme.semesterFee;
  const scholarshipAmt = (semTuition * waiverPercent) / 100;
  const netSemTuition = semTuition - scholarshipAmt;
  const netFirstSemPayable = netSemTuition + currentProgramme.examFeePerSem + currentProgramme.refundableSecurity;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc); // soft slate-50
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.04);

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 14, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(10, 20, 15);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 1.2, 50);
    blueLight.position.set(-10, 8, -10);
    scene.add(blueLight);

    // Central University Core Node
    const coreGroup = new THREE.Group();
    const coreGeo = new THREE.DodecahedronGeometry(2.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8, // CGC Royal Blue
      roughness: 0.2,
      metalness: 0.4,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Wireframe halo around core
    const haloGeo = new THREE.SphereGeometry(2.8, 16, 16);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x93c5fd,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    coreGroup.add(haloMesh);
    scene.add(coreGroup);

    // Concentric Scholarship Tier Rings
    const ringColors = [0x10b981, 0x06b6d4, 0x3b82f6, 0x8b5cf6, 0xf59e0b, 0xec4899];
    const ringRadii = [5.5, 7.5, 9.5, 11.5, 13.5, 15.5];
    const ringsGroup = new THREE.Group();

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[i % ringColors.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.28,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringsGroup.add(ringMesh);
    });
    scene.add(ringsGroup);

    // STEM Discipline Nodes
    const nodeMeshes: { mesh: THREE.Mesh; prog: ProgrammeFee; baseAngle: number; radius: number }[] = [];
    const stemGroup = new THREE.Group();

    stemProgrammes.forEach((prog, index) => {
      const angle = (index / stemProgrammes.length) * Math.PI * 2;
      const radius = 8.5 + (index % 3) * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (index % 2 === 0 ? 1 : -1) * 1.2;

      // Unique geometry for disciplines
      let geom: THREE.BufferGeometry;
      if (prog.code.includes('AIML')) {
        geom = new THREE.OctahedronGeometry(1.2, 0);
      } else if (prog.code.includes('DS')) {
        geom = new THREE.CylinderGeometry(0.8, 0.8, 1.6, 16);
      } else if (prog.code.includes('CYBER')) {
        geom = new THREE.IcosahedronGeometry(1.1, 0);
      } else if (prog.code.includes('BIOTECH')) {
        geom = new THREE.TorusGeometry(0.8, 0.35, 12, 24);
      } else if (prog.code.includes('MECH')) {
        geom = new THREE.BoxGeometry(1.4, 1.4, 1.4);
      } else {
        geom = new THREE.SphereGeometry(1.1, 24, 24);
      }

      const isCurrent = prog.code === selectedProgCode;
      const mat = new THREE.MeshStandardMaterial({
        color: isCurrent ? 0x2563eb : 0x475569,
        roughness: 0.3,
        metalness: 0.6,
        emissive: isCurrent ? 0x1d4ed8 : 0x000000,
        emissiveIntensity: isCurrent ? 0.4 : 0,
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, y, z);
      mesh.userData = { progCode: prog.code };
      stemGroup.add(mesh);

      // Connecting line to core
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      stemGroup.add(line);

      nodeMeshes.push({ mesh, prog, baseAngle: angle, radius });
    });
    scene.add(stemGroup);

    // Mouse drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationAngle = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      stemGroup.rotation.y += deltaX * 0.006;
      ringsGroup.rotation.y += deltaX * 0.003;
      coreGroup.rotation.y += deltaX * 0.004;

      camera.position.y = Math.max(5, Math.min(22, camera.position.y - deltaY * 0.05));
      camera.lookAt(0, 0, 0);

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Raycasting to click nodes
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes.map(n => n.mesh));

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const code = hit.userData.progCode;
        if (code) {
          setSelectedProgCode(code);
        }
      }
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('click', onClick);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow idle orbit
      if (isAutoRotate && !isDragging) {
        stemGroup.rotation.y += 0.0025;
        ringsGroup.rotation.y -= 0.001;
        coreGroup.rotation.y += 0.004;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;
      }

      // Individual node self-rotations
      nodeMeshes.forEach((item, idx) => {
        item.mesh.rotation.y += 0.01;
        item.mesh.position.y += Math.sin(elapsedTime * 2 + idx) * 0.003;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Responsive Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('click', onClick);
      renderer.dispose();
    };
  }, [selectedProgCode, isAutoRotate]);

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-slate-50">
      {/* 3D Canvas Viewport */}
      <div className="flex-1 relative flex flex-col min-h-[380px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-slate-200">
        {/* Canvas Toolbar Header */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs pointer-events-auto">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-800">
                CGC Mohali STEM & Financial Topology
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                WebGL 3D
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 pointer-events-auto">
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className={`p-2 rounded-xl border text-xs font-medium transition-all shadow-xs ${
                isAutoRotate
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Toggle Auto Rotation"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin [animation-duration:8s]' : ''}`} />
            </button>
          </div>
        </div>

        {/* The Three.js Mount Canvas */}
        <div ref={mountRef} className="flex-1 w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Bottom Legend Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex flex-wrap items-center justify-between gap-2">
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs text-[11px] text-slate-600 flex items-center space-x-3 pointer-events-auto">
            <span className="font-semibold text-slate-800">Controls:</span>
            <span>Drag to rotate</span>
            <span>•</span>
            <span>Click node to inspect</span>
          </div>

          {/* Quick node selector buttons */}
          <div className="hidden sm:flex items-center space-x-1.5 pointer-events-auto bg-white/90 backdrop-blur-md p-1 rounded-xl border border-slate-200 shadow-xs">
            {stemProgrammes.slice(0, 5).map(p => (
              <button
                key={p.code}
                onClick={() => setSelectedProgCode(p.code)}
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedProgCode === p.code
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {p.code.replace('BTECH_', '').replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Inspection & Interactive Financial Calculator Panel */}
      <div className="w-full lg:w-96 p-5 overflow-y-auto bg-white space-y-5 border-l border-slate-200/80 shadow-xs">
        {/* Selected STEM Course Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" />
            <span>{currentProgramme.department}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-snug">
            {currentProgramme.name}
          </h2>
          <p className="text-xs text-slate-600">
            {currentProgramme.stemSpecialization || "Advanced Technology & Engineering Track"}
          </p>
        </div>

        {/* Documented Fee Card */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span>Documented Fee (Session 2026–27)</span>
            <span className="text-emerald-700">Page 4</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
              <span className="text-[11px] text-slate-500 block">Semester Tuition</span>
              <span className="text-base font-bold text-slate-900">
                ₹{currentProgramme.semesterFee.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200/80">
              <span className="text-[11px] text-slate-500 block">Annual Tuition</span>
              <span className="text-base font-bold text-slate-900">
                ₹{currentProgramme.annualFee.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="text-xs space-y-1 text-slate-600 pt-1 border-t border-slate-200/60">
            <div className="flex justify-between">
              <span>Examination Fee:</span>
              <span className="font-semibold text-slate-800">₹{currentProgramme.examFeePerSem.toLocaleString('en-IN')} / sem</span>
            </div>
            <div className="flex justify-between">
              <span>Refundable Security:</span>
              <span className="font-semibold text-slate-800">₹{currentProgramme.refundableSecurity.toLocaleString('en-IN')} (one-time)</span>
            </div>
          </div>
        </div>

        {/* Interactive CGCUET Scholarship Simulator */}
        <div className="p-4 rounded-xl bg-white border border-blue-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-900">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Interactive CGCUET Scholarship Slab</span>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {waiverPercent}% Waiver
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span>Your CGCUET Score:</span>
              <span className="font-bold text-blue-700">{cgcuetScore.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="0.5"
              value={cgcuetScore}
              onChange={(e) => setCgcuetScore(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>60% (25%)</span>
              <span>80% (50%)</span>
              <span>90% (85%)</span>
              <span>93%+ (100%)</span>
            </div>
          </div>

          {/* Mathematical Breakdown */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5 font-mono">
            <div className="flex justify-between text-slate-600 font-sans">
              <span>Semester Tuition:</span>
              <span>₹{semTuition.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-blue-700 font-sans font-semibold">
              <span>Scholarship ({waiverPercent}%):</span>
              <span>-₹{scholarshipAmt.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-700 font-sans">
              <span>Exam Fee + Security:</span>
              <span>+₹{(currentProgramme.examFeePerSem + currentProgramme.refundableSecurity).toLocaleString('en-IN')}</span>
            </div>
            <div className="border-t border-slate-200 pt-1 flex justify-between text-sm font-bold text-slate-900 font-sans">
              <span>Net First Sem Payable:</span>
              <span className="text-emerald-700">₹{netFirstSemPayable.toLocaleString('en-IN')}</span>
            </div>
            <span className="text-[10px] text-slate-400 block font-sans italic pt-0.5">
              Calculated using the approved dataset.
            </span>
          </div>
        </div>

        {/* Laboratory & STEM Highlights */}
        {currentProgramme.labHighlights && currentProgramme.labHighlights.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key STEM Laboratories
            </span>
            <div className="space-y-1">
              {currentProgramme.labHighlights.map((lab, i) => (
                <div key={i} className="flex items-center space-x-2 text-xs text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>{lab}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Eligibility Criteria */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Eligibility Criteria
          </span>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            {currentProgramme.eligibility}
          </p>
        </div>

        {/* Ask Finance Buddy Button */}
        <button
          onClick={() =>
            onAskAboutProgramme(
              `I want ${currentProgramme.name} and my CGCUET score is ${cgcuetScore.toFixed(0)}. What is my fee and scholarship?`
            )
          }
          className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-xs transition-all"
        >
          <span>Ask Finance Buddy in Chat</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
