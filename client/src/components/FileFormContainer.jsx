import { useState } from "react";
import FileUpload from "./FileUpload";
import SubmitButton from './SubmitButton'
import UploadStatus from "./UploadStatus";

function FileFormContainer() {

    const [fileName, setFileName] = useState(null);
    const [PDFile, setPDFile] = useState(null);
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [hideInput, setHideInput] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null);



    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log("upload to client")
            const i = event.target.files[0];
            setFileName(event.target.files[0].name)
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

        setUploadStatus('uploading');
        setHideInput(true);

        const formData = new FormData()

        formData.append('file', file)
        const endpoint = "http://localhost:5000/api/upload"

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data);

            if (data['upload_status'] === 'success') {
                setHideInput(true);
                setUploadStatus('success');
            } else {
                setUploadStatus(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setUploadStatus(null);
        }

        //todo handle submit
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="flex flex-row justify-center">

                    {!hideInput && <FileUpload onchange={uploadToClient} hide={!hideInput} />}
                    {hideInput && <UploadStatus status={uploadStatus} filename = {fileName} />}

                </div>
            </form>
        </>
    )


}

export default FileFormContainer;