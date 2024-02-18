# Atlas

This is an app that uses the OpenIA API to generate images based on a specific text prompt

Currently, a couple of features are available:

- [x] Generate images using the OpenIA API
- [x] Copy generated image link to the clipboard

## Project images

<img src='https://media.discordapp.net/attachments/889243010360041576/1208843850031038495/image.png?ex=65e4c291&is=65d24d91&hm=d55f441ce8ea739990dc877385fcfbba324e0eb77bbdc71b731d78f7c14b73c4&=&format=webp&quality=lossless&width=909&height=468' alt='initial state' class='img'/>
<img src='https://media.discordapp.net/attachments/889243010360041576/1208844030708809818/image.png?ex=65e4c2bc&is=65d24dbc&hm=b86a1fdb506e304b3bf1accc6b3bfbcdc4298a66005d877690ab3624b77ed68c&=&format=webp&quality=lossless&width=909&height=468'  alt='creating image' class='img'/>
<img src='https://media.discordapp.net/attachments/889243010360041576/1208844175232213032/image.png?ex=65e4c2de&is=65d24dde&hm=0a00e4bf146626e3c386e180c50a96d55a43f96f251036c6e48b7170d700e2cf&=&format=webp&quality=lossless&width=944&height=468' alt='image created' class='img'/>
<img src='https://media.discordapp.net/attachments/889243010360041576/1208844296753774592/image.png?ex=65e4c2fb&is=65d24dfb&hm=fa5909503d81eb949dde236f572f7282cb8d9750240ee00d304d039813cd3d1c&=&format=webp&quality=lossless&width=909&height=468' alt='image and link reveal' class='img'/>

## How to run Atlas

So, for you to run this project on your computer, you need to:

- Clone this repo:
  - `git clone https://github.com/gbrasil720/atlas.git`
- Install the dependencies
  - `yarn or npm install`
- Have your own [OpenAI API KEY](https://platform.openai.com/api-keys)
  - Insert your api key at a `.env.local` file named as `OPENAI_API_KEY`
- Run the project
  - `yarn run dev or npm run dev`
