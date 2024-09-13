import React from 'react'
import { FileUploaderMinimal } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'

interface UploadCareButtonProps {
    onUpload?: any
}



const UploadCareButton = ({ onUpload }: UploadCareButtonProps) => {
  return (
    <div>
      <FileUploaderMinimal
        classNameUploader='uc-dark'
        pubkey="231f299ac3401646a3f7"
      />
    </div>
  )
}

export default UploadCareButton