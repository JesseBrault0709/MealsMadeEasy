import Star from './assets/Star.png'
import DarkStar from './assets/DarkStar.png'
import BulletFilled from './assets/BulletFilled.png'
import BulletEmpty from './assets/BulletEmpty.png'

import { Story } from '@storybook/react'
import { Sequence, SequenceProps } from './Sequence'

export default {
    title: 'Common/Sequence',
    component: Sequence
}

const Template: Story<SequenceProps> = args => <Sequence {...args} />

export const Stars: Story<SequenceProps> = Template.bind({})
Stars.args = {
    value: 0,
    outOf: 5,
    getCompleted: () => <img src={Star} />,
    getIncomplete: () => <img src={DarkStar} />
}

export const Bullets: Story<SequenceProps> = Template.bind({})
Bullets.args = {
    value: 0,
    outOf: 3,
    getCompleted: () => (
        <img
            src={BulletFilled}
            style={{ marginLeft: '10px', marginRight: '10px' }}
        />
    ),
    getIncomplete: () => (
        <img
            src={BulletEmpty}
            style={{ marginLeft: '10px', marginRight: '10px' }}
        />
    )
}
