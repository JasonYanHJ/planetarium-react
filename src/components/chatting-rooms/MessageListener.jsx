import { Button, Input, Space, Typography } from "antd";
import { useState } from "react";
import { updatePersonInfo } from "../../utils/personInfo";
import { request } from "../../utils/request";
import { scrollToBottom } from "./utils";

const WelcomeMessage = () => {
  const [closed, setClosed] = useState(false);
  return (
    <>
      <p>欢迎来到数字天文馆！</p>
      <p>在这里，您可以探索我们广阔无垠的宇宙，了解星系、行星、星云、黑洞等神奇的天体，以及它们的形成和演化。我们的虚拟展览将带您穿越时间和空间，体验宇宙的壮丽和神秘。</p>
      <p>让我们一起启程，开始这场壮观的探索之旅吧！</p>
      <div style={{textAlign: 'center', marginTop: 8}}>
        <Space size="large">
          <Button disabled={closed} onClick={() => {setClosed(true);document.dispatchEvent(new CustomEvent('msg-system', {detail: {case: 'login'}}));}}>登录</Button>
          <Button disabled={closed} onClick={() => {setClosed(true);document.dispatchEvent(new CustomEvent('msg-system', {detail: {case: 'register'}}));}}>注册</Button>
        </Space>
      </div>
    </>
  );
}

const LoginMessage = () => {
  const [closed, setClosed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <p>请输入用户名和密码：</p>
      <div style={{marginTop: 8}}>
        <Space direction="vertical">
          <Input disabled={closed} value={username} onChange={(e) => setUsername(e.target.value)} placeholder='用户名' />
          <Input.Password disabled={closed} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='密码' />
        </Space>
      </div>
      <div style={{textAlign: 'center', marginTop: 8}}>
        <Button
          type='primary'
          disabled={closed}
          onClick={() => {
            request('user/login', { username, password })
              .then((info) => {
                setClosed(true);
                updatePersonInfo(info);
                document.dispatchEvent(new CustomEvent('msg-system', { detail: {case: 'login-greet', name: info.username} }));
              })
          }}
        >
          登录
        </Button>
      </div>
    </>
  );
}

const RegisterMessage = () => {
  const [closed, setClosed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <p>请设置用户名和密码：</p>
      <div style={{marginTop: 8}}>
        <Space direction="vertical">
          <Input disabled={closed} value={username} onChange={(e) => setUsername(e.target.value)} placeholder='用户名' />
          <Input.Password disabled={closed} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='密码' />
        </Space>
      </div>
      <div style={{textAlign: 'center', marginTop: 8}}>
        <Button
          type='primary'
          disabled={closed}
          onClick={() => {
            request('user/register', { username, password })
              .then((info) => {
                setClosed(true);
                updatePersonInfo(info);
                document.dispatchEvent(new CustomEvent('msg-system', { detail: {case: 'register-greet', name: info.username} }));
              })
          }}
        >
          注册
        </Button>
      </div>
    </>
  );
}

const CustomizeFigureMessage = () => {
  const [closed, setClosed] = useState(false);

  return (
    <>
      <p>点击切换不同部位的形状或颜色吧！</p>
      <p style={{fontSize: 'small'}}>(ps. 鼠标拖动或滚动以查看不同视角)</p>
      <div style={{marginTop: 8}}>
        <Space>
          头部：
          <Button disabled={closed} onClick={() => document.dispatchEvent(new CustomEvent('msg-system', {detail: {case: 'change-figure', target: 'headGNo'}}))}>切换形状</Button>
          <Button disabled={closed} onClick={() => document.dispatchEvent(new CustomEvent('msg-system', {detail: {case: 'change-figure', target: 'headCNo'}}))}>切换颜色</Button>
        </Space>
      </div>
      <div style={{marginTop: 8}}>
        <Space>
          身体：
          <Button disabled={closed} onClick={() => document.dispatchEvent(new CustomEvent('msg-system', {detail: {case: 'change-figure', target: 'bodyGNo'}}))}>切换形状</Button>
          <Button disabled={closed} onClick={() => document.dispatchEvent(new CustomEvent('msg-system', {detail: {case: 'change-figure', target: 'bodyCNo'}}))}>切换颜色</Button>
        </Space>
      </div>
      <div style={{textAlign: 'center', marginTop: 8}}>
        <Button
          type='primary'
          disabled={closed}
          onClick={() => {
            document.dispatchEvent(new CustomEvent('msg-system', { detail: {case: 'save-figure'} }));
            document.dispatchEvent(new CustomEvent('msg-system', { detail: {case: 'enter-main-scene'} }));
            setClosed(true);
          }}
        >
          保存
        </Button>
      </div>
    </>
  );
}

const earthIntro = <>
  <h2>地球</h2>
  <p>地球是我们所在的行星，是太阳系中距离太阳第三近的行星。它的直径约为12,742公里，是太阳系中最大的岩石行星。地球的自转周期为23小时56分4秒，公转周期为365.24天，这就是我们熟知的一年。</p>
  <p>地球是一个适宜生命存在的行星，它的大气层包括78%的氮气、21%的氧气和1%的其他气体，这种气体组成为地球提供了适宜的气候和温度，让我们能够在这里生存。地球上有大量的水资源，包括海洋、湖泊和河流，这些水资源也是生命得以存在的关键。</p>
  <p>当然，地球也面临着各种挑战和问题，如全球气候变化、环境污染和生物多样性丧失等。这些问题需要我们认真思考和采取行动，以保护地球的生态系统和资源，确保地球能够继续为我们提供居住的环境。</p>
  <p>作为地球的居民，我们每个人都有责任保护地球和生态系统，减少我们对环境的影响。通过采取措施减少温室气体排放、节约能源、减少废物等，我们可以为地球的可持续发展做出贡献，确保这个美丽而特殊的行星能够为我们和未来的世代继续提供支持和生存条件。</p>
  <Typography.Link target="_blank" href="https://zh.wikipedia.org/wiki/%E5%9C%B0%E7%90%83">了解更多</Typography.Link>
</>;

const plutoIntro = <>
  <h2>冥王星</h2>
  <p>冥王星是太阳系中的一颗矮行星，距离太阳约59个天文单位，是太阳系中最遥远的行星之一。它的直径约为2,377公里，比地球的月球还要小。</p>
  <p>冥王星最早被认为是太阳系中九大行星之一，但在2006年被国际天文学联合会降级为矮行星。冥王星的表面温度非常低，约为零下230摄氏度，因为它离太阳非常遥远。</p>
  <p>冥王星的表面由冰和岩石组成，有许多的山脉、峡谷和平原。它的大气层非常薄，主要由氮气、甲烷和一些碳氢化合物组成。冥王星的磁场非常微弱，几乎没有保护它免受来自太阳的带电粒子和辐射的危害。</p>
  <p>冥王星是太阳系中一个神秘而特殊的行星，它的遥远位置和冰冷的表面使我们对它充满了好奇和探索的欲望。随着探测技术的不断发展，我们相信未来还将有更多的探测任务前往冥王星，带给我们更多的惊喜和发现。</p>
  <Typography.Link target="_blank" href="https://zh.wikipedia.org/wiki/%E5%86%A5%E7%8E%8B%E6%98%9F">了解更多</Typography.Link>
</>

class MessageListener {
  constructor(setSystemContext, setPlayersContext) {
    this.setSystemContext = setSystemContext;
    this.setPlayersContext = setPlayersContext;
  }

  listen() {
    document.addEventListener("msg-system", (e) => {
      this.setSystemContext(ctx => {
        let content;
        switch (e.detail.case) {
          case 'welcome': content = <WelcomeMessage />; break;
          case 'login': content = <LoginMessage />; break;
          case 'login-greet':
            content = `登录成功! 欢迎你 ${e.detail.name} !`;
            setTimeout(() => 
              document.dispatchEvent(new CustomEvent('msg-system', { detail: {case: 'enter-main-scene'} }))
            , 0);
            break;
          case 'register': content = <RegisterMessage />; break;
          case 'register-greet': 
            content = <><p>注册成功! 欢迎你 {e.detail.name} !</p><p>初次登录，快来选择一下自己在虚拟世界中的形象！</p></>;
            setTimeout(() => 
              document.dispatchEvent(new CustomEvent('msg-system', { detail: {case: 'customize-figure'} }))
            , 0);
            break;
          case 'customize-figure': content = <CustomizeFigureMessage />; break;
          case 'enter-main-scene': content = <><p>欢迎回到数字天文馆！</p><p>操作方式：<br /> - 鼠标左键拖动以旋转视角<br /> - 鼠标右键拖动以平移视角<br /> - 滚动滚轮以缩放视角<br /> - 聚焦(点击)右侧画面，键盘按下"AWSD"来移动</p><p>引导：<br /> - 尝试靠近星球看看吧！<br /> - 可以发送消息以变更形象或退出登录</p></>; break;
          case 'introduce':
            // 不重复发送同一个星球的介绍
            const lastDetail = ctx[ctx.length - 1]?.event?.detail;
            if (lastDetail?.case === 'introduce' && lastDetail?.name === e.detail.name)
              return ctx;
            
            switch (e.detail.name) {
              case 'earth': content = earthIntro; break;
              case 'pluto': content = plutoIntro; break;
            }
            break;
          default: return ctx;
        }

        return [
          ...ctx,
          {
            event: e,
            sender: 'System',
            sendTime: new Date().toLocaleString(),
            content: content,
          }
        ];
      })

      // 回到底部展示新消息
      scrollToBottom();
    });
  }
}

export default MessageListener