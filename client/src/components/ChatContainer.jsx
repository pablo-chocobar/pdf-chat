import React from 'react'
import ChatBubble from './ChatBubble'

function ChatContainer(props) {
    return (
        <div className='h-[90%] overflow-auto no-scrollbar'>
            {props.messages.map(function (message, index) {
                return (
                    <div key={index} className='grid grid-rows-1'>
                        <ChatBubble msg={message["message"]} sender = {message["sender"]} />
                    </div>
                )
            })}
            <div ref = {props.msgendref} />
        </div>
    )
}

export default ChatContainer