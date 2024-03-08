import classNames from 'classnames'
import React from 'react'

function ChatBubble(props) {
    var classnames = classNames("flex items-start mb-2")
    var bubble_cn  = classNames("flex flex-col w-full max-w-[320px] leading-1 py-2 px-6 border-gray-200")
    if (props.sender == "user"){
        classnames += " justify-self-end"
        bubble_cn += " bg-green-100 rounded-s-xl rounded-ee-xl"
    }

    if (props.sender == "bot"){
        classnames += " justify-self-start"
        bubble_cn += " bg-blue-100 rounded-e-xl rounded-es-xl"
    }

    return (
        <div className={classnames}>
            <div className={bubble_cn}>
                <div className="flex justify-end rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-black "> {props.sender}</span>
                </div>
                <p className="text-sm font-normal py-2.5 text-black ">{props.msg}</p>
            </div>
        </div>
    )
}

export default ChatBubble