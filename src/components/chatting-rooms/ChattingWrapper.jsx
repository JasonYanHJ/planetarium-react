import { Button, Dropdown, Radio } from "antd";
import { useEffect, useState } from "react";
import { clearPersonInfo, getPersonInfo } from "../../utils/personInfo";
import useDebounce from "../../utils/useDebounce";
import './common.css'
import MessageListener from "./MessageListener";
import { scrollToBottom } from "./utils";

const ChattingWrapper = () => {
  const [selected, setSelected] = useState('System');
  const [systemContext, setSystemContext] = useState([]);
  const [playersContext, setPlayersContext] = useState([]);
  const [login, setLogin] = useState(!!getPersonInfo());
  const context = selected === 'System' ? systemContext : playersContext;
  const messageListener = new MessageListener(setSystemContext, setPlayersContext);

  const init = useDebounce(() => {
    messageListener.listen();
    document.addEventListener('msg-system', e => {
      if (e.detail.case === 'login-greet' || e.detail.case === 'register-greet')
        setLogin(true);
      else if (e.detail.case === 'logout')
        setLogin(false);
    });
    const info = getPersonInfo();
    if (info)
      document.dispatchEvent(new CustomEvent('msg-system', {detail: {case: 'login-greet', name: info.username}}));
    else
      document.dispatchEvent(new CustomEvent('msg-system', {detail: {case: 'welcome'}}));
  }, 50);

  useEffect(init, []);

  return (
    <div className="chatting-wrapper">
      <div className="chatting-header">
        <Radio.Group
          optionType="button"
          buttonStyle="solid"
          value={selected}
          options={[
            { label: 'System', value: 'System' },
            { label: 'Players', value: 'Players' },
          ]}
          onChange={({target: {value}}) => {setSelected(value); scrollToBottom('auto');} }
        />
      </div>
      <div className="chatting-context" id="chatting-context">
        {context.map((msg, index) => 
          <div key={index} className={msg.mine ? "message mine" : "message"}>
            <div className="message-info">
              <span className="sender">{msg.sender}</span>
              <span className="send-time">{msg.sendTime}</span>
            </div>
            <div className="content-outer">
              <div className="content-inner">{msg.content}</div>
            </div>
          </div>
        )}
      </div>
      <div className="chatting-send-message">
        <Dropdown.Button
          disabled={!login}
          menu={{
            items: [
              { key: 'customize-figure', label: '变更形象' },
              { key: 'logout', label: '退出登录' },
            ],
            onClick: (e) => {
              switch(e.key) {
                case 'customize-figure':
                  setTimeout(() => document.dispatchEvent(new CustomEvent('msg-system', { detail: {case: 'customize-figure'} })), 0);
                  break;
                case 'logout':
                  setTimeout(() => {
                    clearPersonInfo();
                    document.dispatchEvent(new CustomEvent('msg-system', { detail: {case: 'logout'} }));
                    document.dispatchEvent(new CustomEvent('msg-system', { detail: {case: 'welcome'} }));
                  }, 0);
                  break;
                default: return;
              }
              setSystemContext(v => [
                ...v,
                {
                  mine: true,
                  sender: getPersonInfo().username,
                  sendTime: new Date().toLocaleString(),
                  content: e.key === 'logout' ? '退出登录' : '变更形象',
                }
              ]);
            }
          }}
        >
          发送消息
        </Dropdown.Button>
      </div>
    </div>
  )
}

export default ChattingWrapper;