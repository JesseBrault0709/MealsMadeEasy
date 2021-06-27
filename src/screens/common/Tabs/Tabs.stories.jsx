import { Tab, Tabs } from "./Tabs";

export default {
    title: "RecipeInfo/Tabs",
    component: Tabs
}

const Template = args => <Tabs {...args} />

export const Primary = Template.bind({})
Primary.args = {
    children: <>
        <Tab onClick={() => console.log("Ingredients")}>Ingredients</Tab>
        <Tab onClick={() => console.log("Instructions")}>Instructions</Tab>
    </>
}