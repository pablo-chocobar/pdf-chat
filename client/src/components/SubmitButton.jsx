import React from 'react'
import classNames from 'classnames'

function SubmitButton(props) {
  const disabled = props.disabled;
  var classnames =  classNames("font-medium rounded-r-lg text-sm px-2 text-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br")

  if (disabled) {
    classnames += " cursor-not-allowed opacity-25"
    return (
      <button type="submit" 
      className= {classnames}
       disabled>Submit</button>  )
  }

  else{
    return (
      <button type="submit" 
      className= {classnames}
      >Submit</button>  )
  }
}

export default SubmitButton