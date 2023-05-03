import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getPersonInfo, updatePersonInfo } from '../../utils/personInfo';
import { randomInt } from '../../utils/random';
import { request } from '../../utils/request';
import { basicMaterials, bodies, heads } from './person_models';

const CustomizeFigureScene = () => {
  useEffect(() => {
    const container = document.getElementById('container');
    // 防止重复渲染
    if (!container || container.children.length > 0)
      return;
    
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
    controls.minDistance = 80;
    controls.maxDistance = 200;
    controls.maxPolarAngle = Math.PI / 2;

    // 创建环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);  
    // 创建太阳光
    var sunLight = new THREE.DirectionalLight(0xffffff, 0.6);
    sunLight.position.set(0, 1, 1);
    scene.add(sunLight);

    // 创建平台
    const platformGeometry = new THREE.BoxGeometry(200, 1, 200);
    const platformMaterial = new THREE.MeshBasicMaterial({ color: 0xa0a0a0 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    // 将平台放置在场景中
    platform.position.y = -1;
    scene.add(platform);

    // 初始化小人形象
    const personInfo = getPersonInfo();
    let [headGNo, headCNo, bodyGNo, bodyCNo] = personInfo?.figure
      ? [personInfo.figure.headGNo, personInfo.figure.headCNo, personInfo.figure.bodyGNo, personInfo.figure.bodyCNo]
      : [randomInt(0, heads.length), randomInt(0, basicMaterials.length), randomInt(0, bodies.length), randomInt(0, basicMaterials.length)];

    // 创建小人的头部
    const head = new THREE.Mesh(
      heads[headGNo],
      basicMaterials[headCNo]
    );
    // 将头部放置在场景中
    head.position.y = 50;

    // 创建小人的身体
    const body = new THREE.Mesh(
      bodies[bodyGNo],
      basicMaterials[bodyCNo]
    );
    // 将身体放置在场景中
    body.position.y = 18;


    // 创建小人
    const person = new THREE.Group();
    person.add(head);
    person.add(body);

    // 将小人放置在场景中
    scene.add(person);

    // 添加切换形象事件的监听
    document.addEventListener('msg-system', e => {
      switch(e.detail.case) {
        case 'change-figure':
          console.log(e);
          if (e.detail.target === 'headGNo') {
            headGNo = (++headGNo) % heads.length;
            head.geometry = heads[headGNo];
          } else if (e.detail.target === 'headCNo') {
            headCNo = (++headCNo) % basicMaterials.length;
            head.material = basicMaterials[headCNo];
          } else if (e.detail.target === 'bodyGNo') {
            bodyGNo = (++bodyGNo) % bodies.length;
            body.geometry = bodies[bodyGNo];
          } else if (e.detail.target === 'bodyCNo') {
            bodyCNo = (++bodyCNo) % basicMaterials.length;
            body.material = basicMaterials[bodyCNo];
          }
          break;
        case 'save-figure':
          updatePersonInfo({ figure: { headGNo, headCNo, bodyGNo, bodyCNo } });
          console.log(getPersonInfo())
          request('user/update', getPersonInfo());
          break;
        default: return;
      }
    });

    // 渲染场景和相机
    function animate() {
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

export default CustomizeFigureScene;