import { AddToMealPlan } from './AddToMealPlan'

export default {
    title: 'AddToMealPlan/AddToMealPlan',
    component: AddToMealPlan
}

const Template = args => <AddToMealPlan {...args} />

export const Primary = Template.bind({})
Primary.args = {}
