import SubmitButton from "./SubmitButton";

function FileUpload(props) {
  return (
    <div className="flex flex-row justify-center" style={{visibility: props.hide? 'visible': 'hidden' }}>
      <input className="block w-full text-sm border rounded-l-lg cursor-pointer text-content focus:outline-none bg-primary border-content placeholder-gray-400\
      file:bg-secondary file:text-content file:border-0 file:border-r file:border-content file:p-2.5" type="file" accept=".pdf" onChange={props.onchange}/>
      <SubmitButton></SubmitButton>
    </div>
    )
}

export default FileUpload;
