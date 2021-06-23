import { Category, CategoryProps } from "./Category";
import type { Meta, Story } from '@storybook/react'

export default {
    title: "Category/Category",
    component: Category
} as Meta

const Template: Story<CategoryProps> = (args: CategoryProps) => <Category {...args} />

export const Primary = Template.bind({});

Primary.args = {
    title: 'Breakfast',
    recipes: [
        {
            title: 'Sausage',
            rating: 4
        },
        {
            title: 'Eggs',
            rating: 2
        }
    ],
    onBackButtonClick: () => {
        console.log("Hello World!")
    }
}