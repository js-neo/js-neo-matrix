// src/components/ui/CodeSphere.tsx
'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const CodeSphere = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        scene.background = null;

        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        const aspectRatio = width / height;

        const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        const textGroup = new THREE.Group();
        textGroup.scale.set(0.001, 0.001, 0.001);
        scene.add(textGroup);

        const particlesGroup = new THREE.Group();
        particlesGroup.scale.set(0.001, 0.001, 0.001);
        scene.add(particlesGroup);


        const animation = {
            duration: 10,
            startTime: 0,
            isAnimating: false
        };

        const techTerms = [
            "THREE", "REACT", "NEXT", "NODE", "TS", "JS",
            "HTML", "CSS", "TAILWIND", "WEBGL", "GSAP", "EXPRESS",
            "REDUX", "GRAPHQL", "MONGO", "POSTGRES", "JEST", "VITE",
            "SASS", "BOOTSTRAP", "LODASH", "NEST", "WEBPACK", "DOCKER"
        ];

        const radius = 12;
        const numTerms = techTerms.length;
        const textScale = 16;

        const textSprites: THREE.Sprite[] = [];
        techTerms.forEach((term, i) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = 512;
            canvas.height = 256;

            ctx.font = 'bold 42px "Courier New", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const brightness = 70 + Math.random() * 20;
            ctx.fillStyle = `hsl(120, 100%, ${brightness}%)`;
            ctx.shadowColor = `hsl(120, 100%, ${brightness}%)`;
            ctx.shadowBlur = 15;
            ctx.fillText(term, canvas.width/2, canvas.height/2);
            ctx.shadowBlur = 0;

            const texture = new THREE.CanvasTexture(canvas);
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

            const material = new THREE.SpriteMaterial({
                map: texture,
                color: 0x00ff00,
                transparent: true,
                opacity: 0,
                blending: THREE.AdditiveBlending
            });

            const sprite = new THREE.Sprite(material);
            sprite.scale.set(textScale, textScale/2, 1);

            const phi = Math.acos(-1 + (2 * i) / numTerms);
            const theta = Math.sqrt(numTerms * Math.PI) * phi;

            sprite.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            textGroup.add(sprite);
            textSprites.push(sprite);
        });

        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 3000;
        const posArray = new Float32Array(particleCount * 3);
        const colorArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            const r = 12 + Math.random() * 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            posArray[i] = r * Math.sin(phi) * Math.cos(theta);
            posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);
            posArray[i+2] = r * Math.cos(phi);

            colorArray[i] = 0.6 + Math.random() * 0.4;
            colorArray[i+1] = 1.0;
            colorArray[i+2] = 0.7 + Math.random() * 0.3;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0,
            vertexColors: true,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: true
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particlesGroup.add(particles);

        const startPoint = new THREE.Mesh(
            new THREE.SphereGeometry(0.2, 16, 16),
            new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                transparent: true,
                opacity: 1
            })
        );
        scene.add(startPoint);

        const startAnimation = () => {
            animation.isAnimating = true;
            animation.startTime = Date.now();
        };

        function smoothStep(t: number) {
            return t * t * (3 - 2 * t);
        }

        const animate = () => {
            requestAnimationFrame(animate);

            const currentTime = Date.now();

            if (animation.isAnimating) {
                const elapsed = (currentTime - animation.startTime) / 1000;
                const progress = Math.min(elapsed / animation.duration, 1);
                const smoothProgress = smoothStep(progress);

                const scale = smoothProgress;
                textGroup.scale.set(scale, scale, scale);
                particlesGroup.scale.set(scale, scale, scale);

                const opacity = smoothProgress;
                textSprites.forEach(sprite => {
                    const material = sprite.material as THREE.SpriteMaterial;
                    material.opacity = opacity * 0.9;
                });

                particleMaterial.size = 0.12 * opacity;
                particleMaterial.opacity = 0.8 * opacity;

                startPoint.scale.set(1 - smoothProgress, 1 - smoothProgress, 1 - smoothProgress);
                (startPoint.material as THREE.MeshBasicMaterial).opacity = 1 - smoothProgress;

                if (progress >= 1) {
                    animation.isAnimating = false;
                    scene.remove(startPoint);
                }
            }

            if (!animation.isAnimating) {
                textSprites.forEach(sprite => {
                    if (Math.random() > 0.95) {
                        const material = sprite.material as THREE.SpriteMaterial;
                        material.opacity = 0.7 + Math.random() * 0.3;
                    }
                });
            }

            textGroup.rotation.y += 0.002;
            particlesGroup.rotation.x += 0.0003;
            particlesGroup.rotation.y += 0.0005;

            controls.update();
            renderer.render(scene, camera);
        };

        setTimeout(startAnimation, 3000);
        animate();

        const handleResize = () => {
            if (!mountRef.current) return;

            const newWidth = mountRef.current.clientWidth;
            const newHeight = mountRef.current.clientHeight;
            const newAspect = newWidth / newHeight;

            camera.aspect = newAspect;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current?.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="w-full h-[500px] md:h-[700px] relative bg-transparent"
        />
    );
};

export default CodeSphere;