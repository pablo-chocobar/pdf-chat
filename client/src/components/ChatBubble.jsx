import classNames from 'classnames'
import React from 'react'

function ChatBubble(props) {
    var classnames = classNames("flex items-start mb-2")
    var align_cn = classNames("flex rtl:space-x-reverse")
    var bubble_cn  = classNames("text-content flex flex-col w-full max-w-[320px] leading-1 py-2 px-6 border border-solid border-content")
    if (props.sender == "user"){
        classnames += " justify-self-end"
        bubble_cn += " bg-[#b8bb26] rounded-s-xl rounded-ee-xl text-right"
        align_cn += " justify-end"
    }

    if (props.sender == "bot"){
        classnames += " justify-self-start"
        bubble_cn += " bg-[#DC8850] rounded-e-xl rounded-es-xl text-left"
        align_cn += " justify-start"

    }

    return (
        <div className={classnames}>
            <div className={bubble_cn}>
                <div className= {align_cn}>
                    <span className="text-sm font-semibold text-content"> {props.sender}</span>
                </div>
                <p className="text-sm font-normal py-2.5 text-content ">{props.msg}</p>
            </div>
        </div>
    )
}

export default ChatBubble