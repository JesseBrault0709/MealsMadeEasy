import { RecipeRow } from "./RecipeRow";

export default {
    title: 'Home/RecipeRow',
    component: RecipeRow
}

const Template = args => <RecipeRow {...args} />

export const Primary = Template.bind({})
Primary.args = {
    rowTitle: 'Breakfast',
    recipes: [
        {
            title: 'Pancakes'
        },
        {
            title: 'Bacon'
        },
        {
            title: 'Eggs'
        },
        {
            title: 'Sausage'
        }
    ]
}