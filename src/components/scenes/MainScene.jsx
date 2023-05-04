import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import distance from '../../utils/distance';
import { getPersonInfo } from '../../utils/personInfo';
import { earthModel, plutoModel } from './exhibit_models';
import { createPerson } from './person_models';

function updatePosition(target, camera, keyboard, planets) {
  const back = new THREE.Vector3();
  const left = new THREE.Vector3();
  // 获取相机的方向向量、右向量和左向量
  camera.getWorldDirection(back);
  back.set(back.x, 0, back.z);
  left.crossVectors(camera.up, camera.getWorldDirection(left));

  const oldPosition = {...target.position};
  if (keyboard['A'])
    target.position.addScaledVector(left, 3);
  if (keyboard['D'])
    target.position.addScaledVector(left, -3);
  if (keyboard['W'])
    target.position.addScaledVector(back, 3);
  if (keyboard['S'])
    target.position.addScaledVector(back, -3);
  
  // 计算是否要触发介绍
  if (!(keyboard['A'] || keyboard['D'] || keyboard['W'] || keyboard['S']))
    return;
  planets.forEach(p => {
    if (
      distance(oldPosition, p.position) >= p.introduceRadius &&
      distance(target.position, p.position) < p.introduceRadius
    )
      document.dispatchEvent(new CustomEvent('msg-system', {detail: {case: 'introduce', name: p.name}}));
  });
}

const MainScene = () => {
  useEffect(() => {
    const container = document.getElementById('container');
    // 防止重复渲染
    if (!container || container.children.length > 0)
      return;
    
    // 定义一个键盘状态对象，用于跟踪按下的键
    const keyboard = {};
    // 添加键盘事件监听器
    container.addEventListener('click', () => {
      container.focus();
    });
    container.addEventListener('keydown', event => {
      keyboard[event.key.toUpperCase()] = true;
    });
    container.addEventListener('keyup', event => {
      keyboard[event.key.toUpperCase()] = false;
    });
    
    // 创建场景与相机
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.x = 40;
    camera.position.y = 150;
    camera.position.z = 200;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // 创建OrbitControls控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 120;
    controls.maxDistance = 300;
    controls.distance = 200;
    controls.maxPolarAngle = Math.PI / 2;

    // 创建环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);  
    // 创建太阳光
    var sunLight = new THREE.DirectionalLight(0xffffff, 0.6);
    sunLight.position.set(0, 1, 1);
    scene.add(sunLight);

    // 创建平台
    const platformSize = 800;
    const platformGeometry = new THREE.BoxGeometry(platformSize, 1, platformSize);
    const platformMaterial = new THREE.MeshBasicMaterial({ color: 0xa0a0a0 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    // 将平台放置在场景中
    platform.position.y = -1;
    scene.add(platform);

    // 获取小人形象信息
    const figure = getPersonInfo().figure;
    const person = createPerson(figure);
    // 将小人放置在场景中
    scene.add(person);

    // 将行星模型放置在场景中
    const planets = [earthModel, plutoModel];
    planets.forEach(p => {
      p.mesh.position.set(...p.position);
      scene.add(p.mesh);
    });

    // 渲染场景和相机
    function animate() {
      updatePosition(person, camera, keyboard, planets);
      planets.forEach(p => p.animation());

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    }

    animate();
  }, [])
  
  return (
    <div id='container' tabIndex={1} />
  )
}

export default MainScene;