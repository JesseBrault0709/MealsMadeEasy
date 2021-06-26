import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'

import { Story } from '@storybook/react'
import { RecipesGrid, RecipesGridProps } from './RecipesGrid'

export default { 
    title: 'RecipeBook/RecipesGrid',
    component: RecipesGrid
}

const Template: Story<RecipesGridProps> = args => <RecipesGrid {...args} />

export const Primary: Story<RecipesGridProps> = Template.bind({})
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