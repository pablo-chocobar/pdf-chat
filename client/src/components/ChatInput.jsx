import React from 'react'
import classNames from 'classnames'

function ChatInput(props) {
  var btn_cn =  classNames("font-medium rounded-r-lg text-sm px-2 text-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br")
  var inp_cn = classNames("block w-full p-2 text-sm text-gray-50 border border-gray-600 rounded-l-lg cursor-pointer bg-gray-700 focus:outline-none")

  return (
    <form className="flex flex-row" onSubmit={props.onsubmit}>
        <input ref = {props.inputref} onChange={props.onchange} type="text" placeholder='Send Message' className={inp_cn} />
        <button type="submit" className= {btn_cn}>Send</button>
    </form>
  )
}

export default ChatInput