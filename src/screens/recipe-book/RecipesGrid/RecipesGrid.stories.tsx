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
            title: 'Eggs',
            rating: 1
        },
        {
            title: 'Sausage',
            rating: 5
        },
        {
            title: 'Bacon',
            rating: 5
        }
    ]
}