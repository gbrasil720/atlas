/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react'
import fs, { PathLike } from 'fs'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Textarea } from './ui/textarea'
import { useToast } from './ui/use-toast'
import { Button } from './ui/button'

import { Dropzone } from './dropzone'
// import { openai } from '@/lib/openai'
import { api } from '@/lib/api'

export function EditExtendImage() {
  const [file, setFile] = useState<PathLike | any>()
  const [loading, setLoading] = useState<boolean>()
  const [prompt, setPrompt] = useState<string>()
  const [image, setImage] = useState<string>()

  const { toast } = useToast()

  async function handleSubmit() {
    setLoading(true)

    if (!prompt) {
      setLoading(false)

      return toast({
        variant: 'destructive',
        title: 'Uh oh! Somethin went wrong.',
        description: 'The inserted prompt is invalid or null',
      })
    }

    try {
      // await api
      //   .post('/images/edit', { data: { prompt, image: file } })
      //   .then((img) => {
      //     setImage(img.data[0].url)

      //     console.log(img)

      //     setLoading(false)

      //     return toast({
      //       variant: 'default',
      //       title: 'Success!',
      //       description: 'Your image was successfully generated',
      //     })
      //   })

      await api
        .post('/images/edit', {
          prompt,
          image: file,
        })
        .then((img) => {
          // setImage(img.data[0].url)

          console.log(img)

          setLoading(false)
        })

      return toast({
        variant: 'default',
        title: 'Success!',
        description: 'Your image was successfully generated',
      })
    } catch (err) {
      console.log(err)
    }
  }

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
        <Textarea
          maxLength={300}
          className="w-96 resize-none h-40"
          placeholder="Insert here the prompt for the image creation"
          onChange={(e) => setPrompt(e.target.value)}
        />
      </CardContent>
      <CardFooter className="gap-10">
        <Button onClick={handleSubmit}>Edit</Button>
      </CardFooter>
    </Card>
  )
}
