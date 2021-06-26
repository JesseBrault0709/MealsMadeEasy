import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'

import { RecipesGrid } from './RecipesGrid'

export default { 
    title: 'RecipeBook/RecipesGrid',
    component: RecipesGrid
}

const Template = args => <RecipesGrid {...args} />

export const Primary = Template.bind({})
Primary.args = {
    recipes: [
        {
            id: 0,
            title: 'Eggs',
            image: DevRecipePicture,
            imageType: 'png'
        },
        {
            id: 1,
            title: 'Sausage',
            image: DevRecipePicture,
            imageType: 'png'
        },
        {
            id: 2,
            title: 'Bacon',
            image: DevRecipePicture,
            imageType: 'png'
        }
    ]
}