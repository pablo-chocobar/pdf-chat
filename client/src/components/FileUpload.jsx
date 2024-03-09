import SubmitButton from "./SubmitButton";

function FileUpload(props) {
  return (
    <div className="flex flex-row justify-center" style={{visibility: props.hide? 'visible': 'hidden' }}>
      <input className="block w-full text-sm border rounded-l-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400\
      file:bg-gray-600 file:text-white file:border-0 file:p-2.5" type="file" accept=".pdf" onChange={props.onchange}/>
      <SubmitButton></SubmitButton>
    </div>
    )
}

export default FileUpload;
