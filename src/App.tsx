import { CreateImage } from './components/create-image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EditExtendImage } from './components/edit-extend-image'
import { CreateImageVariation } from './components/create-image-variation'

function App() {
  return (
    <div className="flex justify-center items-center content-center mt-14">
      <Tabs defaultValue="create" className="content-center flex flex-col">
        <TabsList>
          <TabsTrigger value="create" className="w-full">
            Create image
          </TabsTrigger>
          <TabsTrigger value="edit-expand" className="w-full">
            Edit or expand image
          </TabsTrigger>
          <TabsTrigger value="variation" className="w-full">
            Create image variation
          </TabsTrigger>
        </TabsList>
        <TabsContent value="create">
          <CreateImage />
        </TabsContent>
        <TabsContent value="edit-expand">
          <EditExtendImage />
        </TabsContent>
        <TabsContent value="variation">
          <CreateImageVariation />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App
