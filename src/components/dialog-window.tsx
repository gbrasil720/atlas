import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Copy } from 'lucide-react'
import { useToast } from './ui/use-toast'
import { useCopyToClipboard } from 'usehooks-ts'

interface DialogWindowProps {
  prompt: string | undefined
  image: string
  onClose: () => void
}

export function DialogWindow({ prompt, image, onClose }: DialogWindowProps) {
  const { toast } = useToast()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, copy] = useCopyToClipboard()

  function copyToClipboard(text: string) {
    copy(text)
      .then(() => {
        return toast({
          variant: 'default',
          title: 'Success!',
          description: 'You image link was successfully copied to clipboard',
        })
      })
      .catch(() => {
        return toast({
          variant: 'destructive',
          title: 'Uh oh! Somethin went wrong.',
          description: 'The inserted input is invalid or null',
        })
      })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Check my image</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="justify-center flex flex-col items-center">
          <DialogTitle>
            Your fantastic image was successfully generated!
          </DialogTitle>
          <DialogDescription>
            The image with the prompt: {prompt} is here!
          </DialogDescription>
        </DialogHeader>
        <div className="justify-center flex">
          <img src={image} alt={prompt} className="h-44 w-44 rounded-md" />
        </div>

        <Separator />
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={image} readOnly />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={() => copyToClipboard(image)}
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose>
            <Button type="button" variant="destructive" onClick={onClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
