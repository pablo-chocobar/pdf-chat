import { useState } from "react";
import FileUpload from "./FileUpload";
import UploadStatus from "./UploadStatus";

function FileFormContainer(props) {

    const [fileName, setFileName] = useState(null);
    const [PDFile, setPDFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [hideUpload , setHideUpload] = useState(false)

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            console.log("upload to client")
            const i = event.target.files[0];
            setFileName(event.target.files[0].name)
            setPDFile(i);
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
        // props.setHideInput(true);
        setHideUpload(true);

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
                props.setHideInput(true);
                setHideUpload(true);
                setUploadStatus('success');
            } else {
                setUploadStatus(null);
            }
        } catch (error) {
            console.error('Error:', error);
            setUploadStatus(null);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                <div className="flex flex-row justify-center">
                    {!hideUpload && <FileUpload onchange={uploadToClient} hide={!props.hideInput} />}
                    {hideUpload && <UploadStatus status={uploadStatus} filename = {fileName} />}
                </div>
            </form>
        </>
    )
}

export default FileFormContainer;