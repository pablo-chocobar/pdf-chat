import React from 'react'
import classNames from 'classnames'

function ChatInput(props) {
  var btn_cn =  classNames("font-medium font-serif rounded-r-lg text-sm px-2 text-center text-content bg-primary border-y border-r border-content")
  var inp_cn = classNames("block w-full p-2 text-sm text-content border border-content rounded-l-lg cursor-pointer bg-secondary focus:outline-none")

  return (
    <form className="flex flex-row" onSubmit={props.onsubmit}>
        <input ref = {props.inputref} onChange={props.onchange} type="text" placeholder='Send Message' className={inp_cn} />
        <button type="submit" className= {btn_cn}>Send</button>
    </form>
  )
}

export default ChatInput