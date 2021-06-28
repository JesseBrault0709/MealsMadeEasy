import DevRecipePicture from '../../recipe-book/RecipeList/RecipeCard/assets/DevRecipePicture.png'

import { RowsOfPairs } from './RowsOfPairs'
import { RecipeCard } from '../../recipe-book/RecipeList/RecipeCard/RecipeCard'

export default { 
    title: 'RecipeBook/RecipesGrid',
    component: RowsOfPairs
}

const Template = args => <RowsOfPairs {...args} />

const recipes = [
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

export const Primary = Template.bind({})
Primary.args = {
    children: [
        <RecipeCard recipe={recipes[0]} />,
        <RecipeCard recipe={recipes[1]} />,
        <RecipeCard recipe={recipes[2]} />
    ]
}