import { IngredientsTab } from './IngredientsTab'

export default {
    title: 'RecipeInfo/IngredientsTab',
    component: IngredientsTab
}

const Template = args => <IngredientsTab {...args} />

export const Primary = Template.bind({})
Primary.args = {
    ingredients: [
        {
            amount: 2.0,
            name: 'butter',
            original: '2 cups butter',
            originalName: 'butter',
            unit: 'cups'
        },
        {
            amount: 2.0,
            name: 'butter',
            original: '2 cups butter',
            originalName: 'butter',
            unit: 'cups'
        },
        {
            amount: 2.0,
            name: 'butter',
            original: '2 cups butter',
            originalName: 'butter',
            unit: 'cups'
        }
    ]
}
