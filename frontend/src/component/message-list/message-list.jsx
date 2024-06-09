import {useSelector} from "react-redux";
import {
  getActiveChannelMessageCount,
  getActiveChannelMessages,
  getActiveChannelName
} from "../../store/ui-setting/ui-setting.selector.js";
import {MessageInput} from "../message-input/message-input.jsx";
import {Message} from "../message/message.jsx";

export function MessageList() {
  const activeChannelName = useSelector(getActiveChannelName);
  const activeChannelMessages = useSelector(getActiveChannelMessages);
  const activeChannelMessageCount = useSelector(getActiveChannelMessageCount);

  const messageElements = activeChannelMessages.map((message) => (
    <Message
      key={message.id}
      message={message}
    />
  ));

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small"><p className="m-0"><b>{`# ${activeChannelName}`}</b></p>
          <span
            className="text-muted">{`${activeChannelMessageCount} сообщений`}</span></div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messageElements}
        </div>
        <MessageInput/>
      </div>
    </div>
  );
}
