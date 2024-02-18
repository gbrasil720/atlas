import { useState } from "react"

import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "./components/ui/card"
import { 
  Dialog, 
  DialogClose, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogContent, 
  DialogTrigger 
} from "./components/ui/dialog"
import { Separator } from "./components/ui/separator"
import { Label } from "./components/ui/label"
import { Input } from "./components/ui/input"
import { Copy } from "lucide-react"
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { useToast } from "./components/ui/use-toast"

import { Spinner } from "@material-tailwind/react"

import { useCopyToClipboard } from 'usehooks-ts'

import { openai } from "./lib/openai"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<string>()
  const [prompt, setPrompt] = useState<string>()

  const { toast } = useToast()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard()

  async function handleSubmit() {
    setIsLoading(true)

    if(!prompt) {
      setIsLoading(false)

      return toast({
        variant: 'destructive',
        title: 'Uh oh! Somethin went wrong.',
        description: "The inserted input is invalid or null"
      })
    }

    await openai.images.generate({
      model: 'dall-e-3',
      prompt,
    }).then(img => {
      setImage(img.data[0].url)

      console.log(image)

      setIsLoading(false)

      return toast({
        variant: 'default',
        title: 'Success!',
        description: 'Your image was successfully generated'
      })
    })
  }

  function handleCloseDialog() {
    setPrompt('')
    setImage('')
  }

  function copyToClipboard(text: string) {
    copy(text).then(() => {
      return toast({
        variant: 'default',
        title: 'Success!',
        description: 'You image link was successfully copied to clipboard'
      })
    }).catch(() => {
      return toast({
        variant: 'destructive',
        title: 'Uh oh! Somethin went wrong.',
        description: "The inserted input is invalid or null"
      })
    })
  }

  return (
    <div className="flex justify-center items-center content-center h-screen">
      <Card className="w-full max-w-2xl items-center flex flex-col text-center">
        <CardHeader>
          <CardTitle>Image Generator</CardTitle>
          <CardDescription>Generate images using the openai api</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea maxLength={300} className="w-96 resize-none h-40" placeholder="Insert here the prompt for the image creation" onChange={(e) => setPrompt(e.target.value)}/>
        </CardContent>
        <CardFooter className="gap-10">
          <Button onClick={handleSubmit}>
            {isLoading ? <Spinner className="h-6 w-6"/> : 'Generate'}
          </Button>
          {image ? (
            <Dialog>
              <DialogTrigger>
                <Button>Check my image</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="justify-center flex flex-col items-center">
                  <DialogTitle>Your fantastic image was successfully generated!</DialogTitle>
                  <DialogDescription>The image with the prompt: {prompt} is here!</DialogDescription>
                </DialogHeader>
                <div className="justify-center flex">
                  <img src={image} alt={prompt} className="h-44 w-44 rounded-md"/>
                </div>

                <Separator />
                <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={image}
                    readOnly
                  />
                </div>
                <Button type="submit" size="sm" className="px-3" onClick={() => copyToClipboard(image)}>
                  <span className="sr-only">Copy</span>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose>
                  <Button type="button" variant="destructive" onClick={handleCloseDialog}>
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : <></>}
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
