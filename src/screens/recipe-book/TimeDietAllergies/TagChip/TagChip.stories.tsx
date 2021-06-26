import { Story } from '@storybook/react'
import { TagChip, TagChipProps } from './TagChip'

export default {
    title: "RecipeBook/TagChip",
    component: TagChip
}

const template: Story<TagChipProps> = args => <TagChip {...args} />

export const TimeChip: Story<TagChipProps> = template.bind({})
TimeChip.args = {
    tag: {
        name: 'Time',
        values: ['15 mins']
    }
}

export const DietChip: Story<TagChipProps> = template.bind({})
DietChip.args = {
    tag: {
        name: 'Diet',
        values: ['Vegan', 'Vegetarian', 'Pescatarian']
    }
}

export const AllergyChip: Story<TagChipProps> = template.bind({})
AllergyChip.args = {
    tag: {
        name: 'Allergies',
        values: []
    }
}