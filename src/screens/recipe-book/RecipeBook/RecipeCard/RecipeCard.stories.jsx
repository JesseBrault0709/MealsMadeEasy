import { RecipeCard } from "./RecipeCard";
import DevRecipePicture from './assets/DevRecipePicture.png'

export default {
    title: 'Home/RecipeCard',
    component: RecipeCard
}

const Template = args => <RecipeCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
    recipe: {
        id: 0,
        title: 'Hello recipe!',
        image: DevRecipePicture,
        imageType: 'png'
    }
}