import { Home } from "./Home"

export default {
    title: "Home/Home",
    component: Home
}

const Template = args => <Home {...args} />

export const Primary = Template.bind({})
Primary.args = {
    categories: [
        {
            categoryTitle: "Breakfast",
            recipes: [
                { title: "Sausage" },
                { title: "Eggs" },
                { title: "Bacon" },
                { title: "Pancakes" }
            ]
        },
        {
            categoryTitle: "Lunch",
            recipes: [
                { title: "Soup" },
                { title: "Salad" },
                { title: "Grilled Cheese" },
                { title: "Tuna Melt" }
            ]
        }
    ]
}
