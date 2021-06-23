import { ScreenTitle } from "./ScreenTitle";

export default {
    title: 'Common/ScreenTitle',
    component: ScreenTitle
}

const Template = args => <ScreenTitle {...args} />

export const NoBackButton = Template.bind({})
NoBackButton.args = {
    title: "Hello World!"
}

export const WithBackButton = Template.bind({})
WithBackButton.args = {
    title: "Hello world!",
    onBackButtonClick: () => {
        console.log("Hello world!")
    }
}