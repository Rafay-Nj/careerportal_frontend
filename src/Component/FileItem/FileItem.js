import React from 'react'
import './FileItem.css'
import { AiFillFileText } from 'react-icons/ai';
import { ImSpinner } from 'react-icons/im';
import { VscTrash } from 'react-icons/vsc';

const FileItem = ({ file, deleteFile }) => {

    React.useEffect(() => {
      {isUploading()}
    }, [file, deleteFile])
    

    const isUploading = () => {
        if(file.isUploading) {
            return(
                <div onClick={() => deleteFile(file.name)}><ImSpinner /></div>
            )
        } else {
            return(
                <div onClick={() => deleteFile(file.name)}><VscTrash /></div>
            )
        }
    }
    return (
        <>
            <li
                className="file-item"
                key={file.name}>
                <AiFillFileText color="#00838d"/>
                <p>{file.name}</p>
                <div className="actions">
                    {isUploading()}                    
                </div>
            </li>
        </>
    )
}

export default FileItem