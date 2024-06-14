import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { animateScroll } from 'react-scroll';
import {
  getActiveChannelMessageCount,
  getActiveChannelMessages,
  getActiveChannelName,
} from '../../store/ui-setting/ui-setting.selector.js';
import { MessageInput } from '../message-input/message-input.jsx';
import { Message } from '../message/message.jsx';

// eslint-disable-next-line import/prefer-default-export
export const MessageList = () => {
  const activeChannelName = useSelector(getActiveChannelName);
  const activeChannelMessages = useSelector(getActiveChannelMessages);
  const activeChannelMessageCount = useSelector(getActiveChannelMessageCount);

  const messageElements = activeChannelMessages.map((message) => (
    <Message
      key={message.id}
      message={message}
    />
  ));

  useEffect(() => {
    animateScroll.scrollToBottom({ containerId: 'messages-box', delay: 0, duration: 0 });
  }, [activeChannelMessages.length]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${activeChannelName}`}</b></p>
          <span className="text-muted">
            {`${activeChannelMessageCount} сообщений`}
          </span>
        </div>
        <div
          id="messages-box"
          className="chat-messages px-5"
          style={{
            flex: '1 1 auto',
            overflowY: 'auto',
            height: '0px',
          }}
        >
          {messageElements}
        </div>
        <MessageInput />
      </div>
    </div>
  );
};
