import { Planner } from "./Planner";

export default {
    title: 'Planner/Planner',
    component: Planner
}

const Template = args => <Planner {...args} />

export const Primary = Template.bind({})
Primary.args = {
    days: [
        {
            date: new Date("June 29, 2021"),
            breakfast: [
                {
                    title: 'Eggs'
                },
                {
                    title: 'Bacon'
                }
            ],
            lunch: [
                {
                    title: 'Sushi'
                }
            ],
            dinner: [
                {
                    title: 'Onion soup'
                }
            ]
        },
        {
            date: new Date("June 30, 2021"),
            breakfast: [
                {
                    title: 'Sausage'
                },
                {
                    title: 'Gravy'
                }
            ],
            lunch: [
                {
                    title: 'Pizza'
                }
            ],
            dinner: [
                {
                    title: 'Chicken'
                }
            ]
        },
        {
            date: new Date("July 1, 2021"),
            breakfast: [
                {
                    title: 'Sausage'
                },
                {
                    title: 'Gravy'
                }
            ],
            lunch: [
                {
                    title: 'Pizza'
                }
            ],
            dinner: [
                {
                    title: 'Chicken'
                }
            ]
        }
    ]
}