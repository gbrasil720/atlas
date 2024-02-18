import { useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { useToast } from './components/ui/use-toast'

import { Spinner } from '@material-tailwind/react'

import { openai } from './lib/openai'
import { DialogWindow } from './components/dialog-window'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<string>()
  const [prompt, setPrompt] = useState<string>()

  const { toast } = useToast()

  async function handleSubmit() {
    setIsLoading(true)

    if (!prompt) {
      setIsLoading(false)

      return toast({
        variant: 'destructive',
        title: 'Uh oh! Somethin went wrong.',
        description: 'The inserted input is invalid or null',
      })
    }

    await openai.images
      .generate({
        model: 'dall-e-3',
        prompt,
      })
      .then((img) => {
        setImage(img.data[0].url)

        console.log(image)

        setIsLoading(false)

        return toast({
          variant: 'default',
          title: 'Success!',
          description: 'Your image was successfully generated',
        })
      })
  }

  function handleCloseDialog() {
    setPrompt('')
    setImage('')
  }

  return (
    <div className="flex justify-center items-center content-center h-screen">
      <Card className="w-full max-w-2xl items-center flex flex-col text-center">
        <CardHeader>
          <CardTitle>Image Generator</CardTitle>
          <CardDescription>
            Generate images using the openai api
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            maxLength={300}
            className="w-96 resize-none h-40"
            placeholder="Insert here the prompt for the image creation"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </CardContent>
        <CardFooter className="gap-10">
          <Button onClick={handleSubmit}>
            {isLoading ? <Spinner className="h-6 w-6" /> : 'Generate'}
          </Button>
          {image ? (
            <DialogWindow
              image={image}
              prompt={prompt}
              onClose={handleCloseDialog}
            />
          ) : (
            <></>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
