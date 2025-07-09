// src/lib/three-utils.ts

import * as THREE from 'three';

export const createMatrixBackground = (scene: THREE.Scene) => {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x00ff41,
        transparent: true,
        opacity: 0.5
    });

    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    return particles;
};

export const animateMatrixParticles = (particles: THREE.Points) => {
    particles.rotation.x += 0.0005;
    particles.rotation.y += 0.001;
};