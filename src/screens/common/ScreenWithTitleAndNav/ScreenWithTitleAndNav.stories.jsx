import { ScreenWithTitleAndNav } from './ScreenWithTitleAndNav'

export default {
    title: 'Common/ScreenWithTitleAndNav',
    component: ScreenWithTitleAndNav
}

const Template = args => <ScreenWithTitleAndNav {...args} />

export const Primary = Template.bind({})
Primary.args = {
    title: 'Hello world!',
    activeNavButton: 'RECIPES',
    children: ['Hello world!']
}
