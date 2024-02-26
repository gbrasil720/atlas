import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { Dropzone } from './dropzone'
import { useState } from 'react'
import { PathLike } from 'node:fs'

export function CreateImageVariation() {
  const [file, setFile] = useState<PathLike | any>()

  return (
    <Card className="w-full max-w-2xl items-center flex flex-col text-center">
      <CardHeader>
        <CardTitle>Image Editor/Expander</CardTitle>
        <CardDescription>
          Edit or expand images using the openai api
        </CardDescription>
      </CardHeader>
      <CardContent className="items-center flex flex-col gap-5">
        <Dropzone file={file} setFile={setFile} />
      </CardContent>
      <CardFooter className="gap-10">
        <Button>Edit</Button>
      </CardFooter>
    </Card>
  )
}
