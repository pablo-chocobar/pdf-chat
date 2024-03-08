function FileUpload(props) {
  return (
    <div style={{visibility: props.hide? 'visible': 'hidden' }}>
      {/* <label className="block mb-2 text-sm font-medium text-gray-900">Upload file</label> */}
      <input className="block w-full text-sm border rounded-l-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400\
      file:bg-gray-600 file:text-white file:border-0 file:p-2.5" type="file" accept=".pdf" onChange={props.onchange}/>
    </div>
    )
}

export default FileUpload;