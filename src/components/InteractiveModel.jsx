import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

// Import component-specific styles
import '../styles/InteractiveModel.css';

/**
 * Model component responsible for loading and rendering the GLB model. It provides
 * hover highlighting and click isolation functionality. The highlight colour can
 * be customised via the `highlightColor` prop (expects a THREE.Color or hex string).
 */
function Model({ url, highlightColor }) {
  // Load the GLB model once. useGLTF caches the result internally.
  const gltf = useGLTF(url);

  // A ref to the group containing the whole model.
  const modelRef = useRef();

  // Track which mesh is currently hovered and which is selected (isolated).
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const [clone, setClone] = useState(null);

  // Traverse the scene to attach pointer handlers and update materials when hovered/selected.
  useEffect(() => {
    const root = gltf.scene;
    // Define handlers
    const handlePointerOver = (e) => {
      e.stopPropagation();
      setHovered(e.object);
    };
    const handlePointerOut = (e) => {
      e.stopPropagation();
      setHovered(null);
    };
    const handleClick = (e) => {
      e.stopPropagation();
      const mesh = e.object;
      if (selected) {
        // If something is selected, clicking again deselects and restores
        setSelected(null);
        setClone(null);
      } else {
        setSelected(mesh);
        // Clone the mesh for isolation; we clone geometry and material
        const cloned = mesh.clone();
        cloned.material = mesh.material.clone();
        setClone(cloned);
      }
    };
    // Attach handlers to each mesh in the model
    root.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.onPointerOver = handlePointerOver;
        child.onPointerOut = handlePointerOut;
        child.onClick = handleClick;
      }
    });
    return () => {
      // Clean up handlers when component unmounts
      root.traverse((child) => {
        if (child.isMesh) {
          child.onPointerOver = null;
          child.onPointerOut = null;
          child.onClick = null;
        }
      });
    };
  }, [gltf, selected]);

  // On each frame, update the materials of hovered/selected meshes
  useFrame(() => {
    if (!modelRef.current) return;
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        if (selected) {
          // When a part is selected, hide the original model
          child.visible = false;
        } else {
          // Otherwise the model should be visible
          child.visible = true;
          // Highlight hovered mesh
          if (hovered && child === hovered) {
            // Clone material so we don't mutate shared materials
            if (!child.userData.originalMaterial) {
              child.userData.originalMaterial = child.material;
            }
            child.material = child.material.clone();
            child.material.color.set(highlightColor);
            if (child.material.emissive) {
              child.material.emissive.set(highlightColor);
              child.material.emissiveIntensity = 0.3;
            }
          } else {
            // Restore original material if we previously changed it
            if (child.userData.originalMaterial) {
              child.material = child.userData.originalMaterial;
              child.userData.originalMaterial = null;
            }
          }
        }
      }
    });
  });

  return (
    <>
      {/* Show the whole model if nothing selected */}
      <group ref={modelRef} visible={!selected}>
        <primitive object={gltf.scene} />
      </group>
      {/* Show isolated clone if selected */}
      {selected && clone && (
        <group position={[0, 0, 2]}>
          <primitive object={clone} />
        </group>
      )}
    </>
  );
}

/**
 * InteractiveModel wraps the Model component in a Canvas with orbit controls and handles highlight
 * colour configuration. It also displays a simple loading state using Suspense.
 */
export default function InteractiveModel() {
  // Read the CSS variable for highlight colour. Falls back to default if not found.
  const highlightColour = getComputedStyle(document.documentElement).getPropertyValue('--highlight-color') || '#ff3366';
  return (
    <div className="interactive-model">
      <Canvas shadows camera={{ position: [0, 1.5, 5], fov: 45 }} style={{ height: '400px', borderRadius: '18px' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
        <Suspense fallback={null}>
          <Model url="/models/free_merc_hovercar.glb" highlightColor={highlightColour} />
        </Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
}