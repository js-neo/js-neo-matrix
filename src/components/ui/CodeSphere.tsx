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

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        const geometry = new THREE.SphereGeometry(12, 64, 64);

        const text = [
            "THREE", "REACT", "NEXT", "NODE", "TYPESCRIPT", "JAVASCRIPT",
            "HTML", "CSS", "TAILWIND", "WEBGL", "GSAP", "EXPRESS",
            "REDUX", "GRAPHQL", "MONGODB", "POSTGRES", "JEST", "VITE",
            "SASS", "BOOTSTRAP", "LODASH", "NEST", "WEBPACK", "DOCKER"
        ];
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const textureSize = 4096; // Увеличили для лучшего качества

        if (!context) return;

        canvas.width = textureSize;
        canvas.height = textureSize;
        context.clearRect(0, 0, canvas.width, canvas.height);

        const fontSize = Math.min(140, 1000 / Math.sqrt(text.length));
        context.font = `bold ${fontSize}px "Fira Code", monospace`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        const numPoints = text.length;
        const goldenRatio = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < numPoints; i++) {
            const y = 1 - (i / (numPoints - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);

            const theta = goldenRatio * i;
            const x = Math.cos(theta) * radius;
            // const z = Math.sin(theta) * radius;

            const u = (x + 1) * textureSize / 2.4;
            const v = (1 - (y + 1) / 2) * textureSize / 1.2;

            const hue = (i * 360 / numPoints) % 120 + 120; // Зеленый диапазон
            const color = `hsl(${hue}, 100%, ${i % 2 ? '70%' : '60%'})`;

            context.fillStyle = color;
            context.shadowColor = color;
            context.shadowBlur = 15;
            context.fillText(text[i], u, v);
            context.shadowBlur = 0;
        }

        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: 0.92,
            side: THREE.DoubleSide
        });

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 3000;
        const posArray = new Float32Array(particleCount * 3);
        const colorArray = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            const radius = 15 + Math.random() * 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
            posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
            posArray[i+2] = radius * Math.cos(phi);

            colorArray[i] = 0.6 + Math.random() * 0.4;
            colorArray[i+1] = 1.0;
            colorArray[i+2] = 0.7 + Math.random() * 0.3;
        }

        particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        const animate = () => {
            requestAnimationFrame(animate);

            sphere.rotation.x += 0.001;
            sphere.rotation.y += 0.002;
            particles.rotation.x += 0.0003;
            particles.rotation.y += 0.0007;

            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!mountRef.current) return;

            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="w-full h-[500px] md:h-[700px] relative bg-transparent"
            style={{ background: 'transparent' }}
        />
    );
};

export default CodeSphere;