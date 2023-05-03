import { useEffect, useState } from "react";
import useDebounce from "../../utils/useDebounce";
import CustomizeFigureScene from "./CustomizeFigureScene";
import MainScene from "./MainScene";

const SceneWrapper = () => {
  const [sceneName, setSceneName] = useState('welcome');
  const listenSceneChange = useDebounce(() => {
    document.addEventListener('msg-system', e => {
      switch(e.detail.case) {
        case 'logout': setSceneName('welcome'); break;
        case 'customize-figure': setSceneName('figure'); break;
        case 'enter-main-scene': setSceneName('main'); break;
      }
    });
  }, 50);
  useEffect(listenSceneChange, []);

  let scene = <></>;
  switch(sceneName) {
    case 'welcome': scene = <></>; break;
    case 'figure': scene = <CustomizeFigureScene />; break;
    case 'main': scene = <MainScene />; break;
  }

  return (
    <>{scene}</>
  )
}

export default SceneWrapper;