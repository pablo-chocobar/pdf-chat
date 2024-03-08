import React from 'react'
import ChatBubble from './ChatBubble'

function ChatContainer(props) {
    return (
        <div>
            {props.messages.map(function (message, index) {
                return (
                    <div key={index} className='grid grid-rows-1'>
                        <ChatBubble msg={message["message"]} sender = {message["sender"]} />
                    </div>
                )
            })}
        </div>
    )
}

export default ChatContainer