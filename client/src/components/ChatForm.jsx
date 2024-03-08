import React, { useEffect, useRef, useState } from 'react'
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import ChatContainer from './ChatContainer';


function ChatForm() {

    const [messages, setMessages] = useState([{"sender": "bot", "message": "hi!" }]);
    const [latestMessage, setLatestMessage] = useState("");
    const inputRef = useRef(null);


    function handleInputChange(e) {
        e.preventDefault();
        setLatestMessage(e.target.value);
    }

    function handleInputSubmit(e) {
        e.preventDefault();
        var newMessages = [...messages];

        if (e.code === "Enter" || e.code === "NumpadEnter")  {
            newMessages.push({"sender": "user", "message": latestMessage });
        }
        else {
            newMessages.push({"sender": "user", "message": latestMessage });
        }
        inputRef.current.value = "";

        ask_bot(latestMessage , newMessages);

    }

    async function ask_bot(question , newMessages){
        const formData = new FormData()

        formData.append('question', question)
        // console.log(formData)
        const endpoint = "http://localhost:5000/bot/ask"
        const data = await fetch(endpoint, {
            method: 'POST',
            body: formData,
        }).then(
            res => res.json()
                ).then(response =>
                    {
                        // console.log(response)
                        if (response["reply_status"] == "success"){
                            newMessages.push({"sender": "bot", "message": response["answer"]});
                            console.log(newMessages)
                        }
                        setMessages(newMessages);
                    }
        )
    }

    return (
        <div>
            <ChatContainer messages = {messages}></ChatContainer>
            <ChatInput inputref = {inputRef} onchange={handleInputChange} onsubmit={handleInputSubmit} ></ChatInput>
        </div>
    )
}

export default ChatForm