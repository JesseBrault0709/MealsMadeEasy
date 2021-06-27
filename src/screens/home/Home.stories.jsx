import { Home } from './Home'

export default {
    title: 'Home',
    component: Home
}

const Template = args => <Home {...args} />

export const Primary = Template.bind({})
Primary.args = {
    showLoadingScreen: true,
    initialCookingTime: '42 mins',
    initialDiet: 'Vegetarian',
    initialIntolerances: []
}