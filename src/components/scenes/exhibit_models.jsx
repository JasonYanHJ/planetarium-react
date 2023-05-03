import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

// earth
const earthGeometry = new THREE.SphereGeometry(96, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load('earth_map.jpg'),
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
// earth cloud
const geometry   = new THREE.SphereGeometry(98, 32, 32)
const material  = new THREE.MeshPhongMaterial({
  map: textureLoader.load('earth_cloud_map.png'),
  side: THREE.DoubleSide,
  opacity: 0.8,
  transparent: true,
  depthWrite: false,
});
const cloudMesh = new THREE.Mesh(geometry, material)
earthMesh.add(cloudMesh)
// earth animate
function earthAnimate(speed = 0.02) {
  cloudMesh.rotation.y += 1 / 24 * speed;
  earthMesh.rotation.y += 1 / 25 * speed;
}

// pluto
const plutoGeometry = new THREE.SphereGeometry(0.19 * 96, 32, 32);  // 半径0.19地球
const plutoMaterial = new THREE.MeshPhongMaterial({
  map: textureLoader.load('pluto_map.jpg'),
});
const plutoMesh = new THREE.Mesh(plutoGeometry, plutoMaterial);
// pluto animate
function plutoAnimate(speed = 0.02) {
  plutoMesh.rotation.y += 1 / 25 * speed / 6.4;  // 自转6.387日
}

const earthModel = {
  name: 'earth',
  mesh: earthMesh,
  animation: earthAnimate,
  introduceRadius: 120,
  position: [-200, 160, -200],
}
const plutoModel = {
  name: 'pluto',
  mesh: plutoMesh,
  animation: plutoAnimate,
  introduceRadius: 50,
  position: [150, 80, -150],
}

export { earthModel, plutoModel }