import { useState } from "react";
import FileUpload from "./FileUpload";
import SubmitButton from './SubmitButton'

function FileFormContainer() {

    const [fileUrl, setFileUrl] = useState(null);
    const [PDFile, setPDFile] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [hideInput, setHideInput] = useState(false);


    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log("upload to client")
            const i = event.target.files[0];
            setPDFile(i);
            setCreateObjectURL(URL.createObjectURL(i));
        };
    }

    async function handleSubmit(e) {

        e.preventDefault();
        const file = PDFile;

        console.log(file)
        if (!file) {
            return;
        }

        const formData = new FormData()

        formData.append('file', file)
        const endpoint = "http://localhost:5000/api/upload"
        const data = await fetch(endpoint, {
            method: 'POST',
            body: formData,
        }).then(
            res => res.json()
                ).then(response =>
                    {(
                        console.log(response))
                        if (response["upload_status"] == "success"){
                            setHideInput(true)
                        }
                    }
        )
        //todo handle submit
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className='flex flex-row justify-center'>
                    <FileUpload hide={setHideInput} onchange={uploadToClient} />
                    <SubmitButton></SubmitButton>
                </div>
            </form>
        </>
    )


}

export default FileFormContainer;