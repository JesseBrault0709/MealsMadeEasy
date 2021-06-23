import { Category } from "./Category";

export default {
    title: "Category/Category",
    component: Category
}

const Template = args => <Category {...args} />

export const Primary = Template.bind({})
Primary.args = {
    categoryTitle: 'Breakfast',
    recipes: [
        {
            title: 'Sausage',
            rating: 4
        },
        {
            title: 'Eggs',
            rating: 2
        }
    ]
}