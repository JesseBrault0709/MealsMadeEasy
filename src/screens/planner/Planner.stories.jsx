import { Planner } from "./Planner";

export default {
    title: 'Planner/Planner',
    component: Planner
}

const Template = args => <Planner {...args} />

export const Primary = Template.bind({})
Primary.args = {
    dayMealPlans: [
        {
            date: new Date("June 29, 2021"),
            meals: [
                {
                    title: 'Breakfast',
                    recipes: [
                        {
                            title: 'Sausage'
                        }
                    ]
                },
                {
                    title: 'Lunch',
                    recipes: [
                        {
                            title: 'Grilled Cheese'
                        }
                    ]
                },
                {
                    title: 'Dinner',
                    recipes: [
                        {
                            title: 'Soup'
                        }
                    ]
                }
            ]
        }
    ]
}