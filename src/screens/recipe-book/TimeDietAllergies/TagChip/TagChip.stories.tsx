import { Story } from '@storybook/react'
import { TagChip, TagChipProps } from './TagChip'

export default {
    title: "RecipeBook/TagChip",
    component: TagChip
}

const template: Story<TagChipProps> = args => <TagChip {...args} />

export const TimeChip: Story<TagChipProps> = template.bind({})
TimeChip.args = {
    name: 'Time',
    values: ['15 mins']
}

export const DietChip: Story<TagChipProps> = template.bind({})
DietChip.args = {
    name: 'Diet',
    values: ['Vegan', 'Vegetarian', 'Pescatarian']
}

export const AllergyChip: Story<TagChipProps> = template.bind({})
AllergyChip.args = {
    name: 'Allergies',
    values: []
}