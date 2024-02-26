/* eslint-disable @typescript-eslint/no-explicit-any */
import { File } from 'buffer'
import { Dispatch, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface DropzoneProps {
  file: any
  setFile?: Dispatch<File> | undefined | any
}

export function Dropzone({ file, setFile }: DropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFile(acceptedFiles[0].path)

      console.log(acceptedFiles)
    },
    [setFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
    },
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={
        isDragActive || file
          ? 'bg-blue-400 p-10 rounded-lg w-96 border-dashed border bg-opacity-5'
          : 'border-dashed border p-10 rounded-lg w-96'
      }
    >
      <input {...getInputProps()} />
      {isDragActive || !file ? <p>Drop the image here...</p> : <p>{file}</p>}
    </div>
  )
}
