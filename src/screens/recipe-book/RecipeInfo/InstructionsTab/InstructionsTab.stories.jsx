import { InstructionsTab } from './InstructionsTab'

export default {
    title: 'RecipeInfo/InstructionsTab',
    component: InstructionsTab
}

const Template = args => <InstructionsTab {...args} />

export const Primary = Template.bind({})
Primary.args = {
    instructions: 'Melt the butter, then drink it.'
}