import { RecipeCard } from "./RecipeCard";
import DevRecipePicture from './assets/DevRecipePicture.png'

export default {
    title: 'Home/RecipeCard',
    component: RecipeCard
}

const Template = args => <RecipeCard {...args} />

export const Primary = Template.bind({})
Primary.args = {
    title: 'Chicken',
    rating: 0,
    imgSrc: DevRecipePicture
}