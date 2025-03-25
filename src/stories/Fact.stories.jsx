import Fact from "../scenes/fact"
import "../scenes/fact/Fact.css"

export default {
  title: "Components/Fact",
  component: Fact,
  argTypes: {
    orientation: {
      options: ["landscape", "portrait"],
    },
    url: {
      control: "object",
    },
  },
}

export const Landscape = (args) => <Fact {...args} />
Landscape.args = {
  orientation: "landscape",
  url: {
    landscape: "media/eab32587-9669-4fc7-8939-e59d52490a41.jpg",
  },
}

export const Portrait = (args) => <Fact {...args} />
Portrait.args = {
  orientation: "portrait",
  url: {
    portrait: "media/e82845f8-bf81-42a2-bfce-03f48ff1f780.jpg",
  },
}

console.log("Storybook args:", Landscape.args)
