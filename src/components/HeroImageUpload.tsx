import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  Sparkles,
  Layers,
  Box,
  Compass,
  Play,
  Pause,
  Upload,
  Camera,
  SlidersHorizontal,
} from 'lucide-react';

interface HeroImageUploadProps {
  className?: string;
}

type RenderMode = 'shaded' | 'wireframe' | 'particles';

export const HeroImageUpload: React.FC<HeroImageUploadProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // 3D Model group reference
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const particlesMeshRef = useRef<THREE.Points | null>(null);
  const ring1Ref = useRef<THREE.Mesh | null>(null);
  const ring2Ref = useRef<THREE.Mesh | null>(null);

  // Textures
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);
  const generativeTextureRef = useRef<THREE.Texture | null>(null);
  const originalTextureRef = useRef<THREE.Texture | null>(null);

  // Interactive 3D States
  const [isGenerative, setIsGenerative] = useState<boolean>(true);
  const [renderMode, setRenderMode] = useState<RenderMode>('shaded');
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Drag interaction physics
  const isPointerDownRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const mouseScreenRef = useRef({ x: 0, y: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.4);
    cameraRef.current = camera;

    // 3. Renderer with Alpha
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const emeraldLight = new THREE.PointLight(0x00e676, 3.5, 12);
    emeraldLight.position.set(-3, 2, 3);
    scene.add(emeraldLight);

    const magentaLight = new THREE.PointLight(0xb600a8, 3.0, 12);
    magentaLight.position.set(3, -2, 2.5);
    scene.add(magentaLight);

    const topWhiteLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topWhiteLight.position.set(0, 4, 3);
    scene.add(topWhiteLight);

    // 5. Load Avatar Textures
    const textureLoader = new THREE.TextureLoader();
    textureLoaderRef.current = textureLoader;

    const generativeTexture = textureLoader.load('/girish-generative.jpg');
    generativeTexture.colorSpace = THREE.SRGBColorSpace;
    generativeTexture.generateMipmaps = true;
    generativeTexture.minFilter = THREE.LinearMipmapLinearFilter;
    generativeTextureRef.current = generativeTexture;

    const originalTexture = textureLoader.load('/girish-portrait.jpg');
    originalTexture.colorSpace = THREE.SRGBColorSpace;
    originalTexture.generateMipmaps = true;
    originalTexture.minFilter = THREE.LinearMipmapLinearFilter;
    originalTextureRef.current = originalTexture;

    // 6. Build 3D Model Group
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // --- Part A: 3D Medallion / Cylinder Geometry with Beveled Edge ---
    // Radius 1.35, height 0.14, 64 segments
    const cylinderGeo = new THREE.CylinderGeometry(1.35, 1.35, 0.14, 64);
    cylinderGeo.rotateX(Math.PI / 2); // face forward to camera

    // Materials for the cylinder (side rim, front face, back face)
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0x111116,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x00e676,
      emissiveIntensity: 0.15,
    });

    const frontFaceMaterial = new THREE.MeshStandardMaterial({
      map: generativeTexture,
      metalness: 0.25,
      roughness: 0.35,
      bumpScale: 0.05,
    });

    // Back face with cyber monogram canvas
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 512;
    backCanvas.height = 512;
    const bCtx = backCanvas.getContext('2d');
    if (bCtx) {
      bCtx.fillStyle = '#08080c';
      bCtx.fillRect(0, 0, 512, 512);

      // Cyber grid lines
      bCtx.strokeStyle = 'rgba(0, 230, 118, 0.25)';
      bCtx.lineWidth = 2;
      for (let i = 40; i < 512; i += 40) {
        bCtx.beginPath();
        bCtx.moveTo(i, 0);
        bCtx.lineTo(i, 512);
        bCtx.stroke();
        bCtx.beginPath();
        bCtx.moveTo(0, i);
        bCtx.lineTo(512, i);
        bCtx.stroke();
      }

      // Outer rings
      bCtx.beginPath();
      bCtx.arc(256, 256, 210, 0, Math.PI * 2);
      bCtx.strokeStyle = '#00E676';
      bCtx.lineWidth = 6;
      bCtx.stroke();

      bCtx.beginPath();
      bCtx.arc(256, 256, 180, 0, Math.PI * 2);
      bCtx.strokeStyle = '#B600A8';
      bCtx.lineWidth = 3;
      bCtx.stroke();

      // Text
      bCtx.fillStyle = '#FFFFFF';
      bCtx.font = 'bold 64px sans-serif';
      bCtx.textAlign = 'center';
      bCtx.fillText('GIRISH', 256, 230);

      bCtx.fillStyle = '#00E676';
      bCtx.font = 'bold 36px sans-serif';
      bCtx.fillText('3D CREATOR', 256, 280);

      bCtx.fillStyle = '#D7E2EA';
      bCtx.font = '22px monospace';
      bCtx.fillText('DATA ANALYST // LPU', 256, 330);
    }
    const backTexture = new THREE.CanvasTexture(backCanvas);
    backTexture.colorSpace = THREE.SRGBColorSpace;

    const backFaceMaterial = new THREE.MeshStandardMaterial({
      map: backTexture,
      metalness: 0.8,
      roughness: 0.3,
    });

    // In Three.js CylinderGeometry materials: [side, top (front in rotated), bottom (back in rotated)]
    const coreMesh = new THREE.Mesh(cylinderGeo, [rimMaterial, frontFaceMaterial, backFaceMaterial]);
    coreMeshRef.current = coreMesh;
    modelGroup.add(coreMesh);

    // --- Part B: Holographic Orbital Gimbal Rings ---
    // Ring 1 (Emerald)
    const ring1Geo = new THREE.TorusGeometry(1.65, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00e676,
      emissive: 0x00e676,
      emissiveIntensity: 0.8,
      metalness: 0.5,
      roughness: 0.1,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Ref.current = ring1;
    modelGroup.add(ring1);

    // Ring 2 (Magenta)
    const ring2Geo = new THREE.TorusGeometry(1.85, 0.016, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xb600a8,
      emissive: 0xb600a8,
      emissiveIntensity: 0.7,
      metalness: 0.5,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Ref.current = ring2;
    modelGroup.add(ring2);

    // --- Part C: 3D Particle Cloud ---
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const pColors = new Float32Array(particleCount * 3);
    const c1 = new THREE.Color(0x00e676);
    const c2 = new THREE.Color(0xb600a8);
    const c3 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.4 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);

      const chosenColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      pColors[i * 3] = chosenColor.r;
      pColors[i * 3 + 1] = chosenColor.g;
      pColors[i * 3 + 2] = chosenColor.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particlesMesh = new THREE.Points(particleGeo, particleMat);
    particlesMeshRef.current = particlesMesh;
    modelGroup.add(particlesMesh);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Orbital gimbal rotations
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x = time * 0.6;
        ring1Ref.current.rotation.y = time * 0.4;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.x = -time * 0.45;
        ring2Ref.current.rotation.z = time * 0.5;
      }
      if (particlesMeshRef.current) {
        particlesMeshRef.current.rotation.y = -time * 0.15;
      }

      // 3D Model physics
      if (modelGroupRef.current) {
        if (isPointerDownRef.current) {
          // Dragging directly controls rotation
          modelGroupRef.current.rotation.y += velocityRef.current.x;
          modelGroupRef.current.rotation.x += velocityRef.current.y;
        } else {
          // Inertia damping
          velocityRef.current.x *= 0.92;
          velocityRef.current.y *= 0.92;
          modelGroupRef.current.rotation.y += velocityRef.current.x;
          modelGroupRef.current.rotation.x += velocityRef.current.y;

          // Auto-spin if enabled
          if (isAutoSpinning) {
            modelGroupRef.current.rotation.y += 0.008;
          }

          // Subtle floating bob
          modelGroupRef.current.position.y = Math.sin(time * 1.5) * 0.06;

          // Cursor tracking parallax
          const targetParallaxX = mouseScreenRef.current.y * 0.25;
          const targetParallaxY = mouseScreenRef.current.x * 0.35;
          modelGroupRef.current.rotation.x += (targetParallaxX - modelGroupRef.current.rotation.x * 0.05) * 0.05;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      cylinderGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      particleGeo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update textures when toggling Generative / Original
  useEffect(() => {
    if (!coreMeshRef.current) return;
    const activeTexture = isGenerative
      ? generativeTextureRef.current
      : originalTextureRef.current;

    const materials = coreMeshRef.current.material as THREE.Material[];
    if (Array.isArray(materials) && materials[1] instanceof THREE.MeshStandardMaterial) {
      materials[1].map = activeTexture;
      materials[1].needsUpdate = true;
    }
  }, [isGenerative]);

  // Update material modes (Shaded, Wireframe, Particles)
  useEffect(() => {
    if (!coreMeshRef.current || !particlesMeshRef.current) return;
    const materials = coreMeshRef.current.material as THREE.Material[];

    if (Array.isArray(materials)) {
      materials.forEach((mat) => {
        if ('wireframe' in mat) {
          (mat as THREE.MeshStandardMaterial).wireframe = renderMode === 'wireframe';
          mat.needsUpdate = true;
        }
      });
    }

    if (renderMode === 'particles') {
      coreMeshRef.current.visible = false;
      particlesMeshRef.current.visible = true;
    } else {
      coreMeshRef.current.visible = true;
      particlesMeshRef.current.visible = true;
    }
  }, [renderMode]);

  // Drag to rotate handlers
  const onPointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    setIsDragging(true);
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    // Track screen position for parallax
    if (mountRef.current) {
      const rect = mountRef.current.getBoundingClientRect();
      mouseScreenRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    }

    if (!isPointerDownRef.current) return;

    const dx = e.clientX - prevPointerRef.current.x;
    const dy = e.clientY - prevPointerRef.current.y;

    velocityRef.current = {
      x: dx * 0.009,
      y: dy * 0.009,
    };

    prevPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isPointerDownRef.current = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Reset 3D Model rotation to forward face
  const handleResetOrientation = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (modelGroupRef.current) {
      modelGroupRef.current.rotation.set(0, 0, 0);
      velocityRef.current = { x: 0, y: 0 };
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-end select-none ${className}`}
      id="hero-3d-model-wrapper"
    >
      {/* 3D WEBGL CANVAS VIEWPORT */}
      <div
        ref={mountRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative group w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[300px] md:h-[300px] lg:w-[320px] lg:h-[320px] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none z-10"
        id="hero-3d-model-viewport"
        title="Drag to rotate 3D model freely"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00E676]/10 via-transparent to-[#B600A8]/10 blur-xl pointer-events-none" />

        {/* Floating 3D Interaction Hint Badge */}
        <div
          className={`absolute top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/75 border border-white/15 backdrop-blur-md text-[10px] font-mono tracking-wider text-[#00E676] pointer-events-none transition-opacity duration-300 flex items-center gap-1.5 shadow-lg ${
            isDragging ? 'opacity-0' : 'opacity-85'
          }`}
        >
          <Compass className="w-3 h-3 text-[#00E676] animate-spin" style={{ animationDuration: '8s' }} />
          <span>DRAG TO ROTATE 3D</span>
        </div>
      </div>

      {/* 3D INTERACTIVE CONTROL DOCK */}
      <div className="z-20 mt-2 flex flex-wrap items-center justify-center gap-2">
        {/* Mode Switcher: Generative 3D vs Original */}
        <button
          type="button"
          onClick={() => setIsGenerative((prev) => !prev)}
          className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-mono font-semibold tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg backdrop-blur-md ${
            isGenerative
              ? 'border-[#00E676]/60 bg-[#00E676]/15 text-[#00E676] shadow-[0_0_15px_rgba(0,230,118,0.25)]'
              : 'border-white/15 bg-white/5 text-[#D7E2EA] hover:border-white/30'
          }`}
          title="Toggle Generative 3D avatar / Original photo on the 3D model"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{isGenerative ? 'GENERATIVE 3D' : 'ORIGINAL PHOTO'}</span>
        </button>

        {/* 3D Render Style: Solid / Wireframe / Particles */}
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/60 px-1.5 py-1 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setRenderMode('shaded')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
              renderMode === 'shaded'
                ? 'bg-[#00E676] text-black font-bold shadow'
                : 'text-[#D7E2EA]/70 hover:text-white'
            }`}
            title="3D Shaded Solid"
          >
            SOLID
          </button>
          <button
            type="button"
            onClick={() => setRenderMode('wireframe')}
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all cursor-pointer ${
              renderMode === 'wireframe'
                ? 'bg-[#B600A8] text-white font-bold shadow'
                : 'text-[#D7E2EA]/70 hover:text-white'
            }`}
            title="3D Cyber Wireframe"
          >
            WIREFRAME
          </button>
        </div>

        {/* Auto-Spin Toggle */}
        <button
          type="button"
          onClick={() => setIsAutoSpinning((prev) => !prev)}
          className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/60 text-[#D7E2EA]/80 transition-all hover:text-white hover:border-[#00E676]/60 cursor-pointer ${
            isAutoSpinning ? 'text-[#00E676]' : ''
          }`}
          title={isAutoSpinning ? 'Pause auto-rotation' : 'Resume auto-rotation'}
        >
          {isAutoSpinning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>

        {/* Reset Orientation */}
        <button
          type="button"
          onClick={handleResetOrientation}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/60 text-[#D7E2EA]/80 transition-all hover:text-white hover:border-[#00E676]/60 cursor-pointer active:scale-90"
          title="Reset 3D orientation to front"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
