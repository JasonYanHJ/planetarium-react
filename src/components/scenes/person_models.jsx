import * as THREE from 'three';

const heads = [
  new THREE.SphereGeometry(11, 32, 32),
  new THREE.BoxGeometry(16, 16, 16),
];

const bodies = [
  new THREE.BoxGeometry(24, 36, 24),
  new THREE.CylinderGeometry(16, 16 , 36),
  new THREE.CylinderGeometry(12, 18 , 36),
  new THREE.CylinderGeometry(18, 12 , 36),
];

const basicMaterials = [
  new THREE.MeshPhongMaterial({ color: 0xB7CBBF }),
  new THREE.MeshPhongMaterial({ color: 0xDF5C7E }),
  new THREE.MeshPhongMaterial({ color: 0xF9A799 }),
  new THREE.MeshPhongMaterial({ color: 0xF4BFAD }),
  new THREE.MeshPhongMaterial({ color: 0xF5DABD }),
  new THREE.MeshPhongMaterial({ color: 0xE0DFB1 }),
  new THREE.MeshPhongMaterial({ color: 0xE1B7ED }),
  new THREE.MeshPhongMaterial({ color: 0xB9DE51 }),
  new THREE.MeshPhongMaterial({ color: 0xAAE6D9 }),
  new THREE.MeshPhongMaterial({ color: 0xF6A570 }),
  new THREE.MeshPhongMaterial({ color: 0x84967E }),
  new THREE.MeshPhongMaterial({ color: 0xFC370C }),
];

export {heads, bodies, basicMaterials}