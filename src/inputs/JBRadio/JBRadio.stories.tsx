import { Story } from '@storybook/react'
import { useState } from 'react'
import { JBRadio } from './JBRadio'

export default {
    title: 'inputs/JBRadio',
    component: JBRadio
}

export const Primary: Story<{ options: ReadonlyArray<string> }> = args => {
    const [selected, setSelected] = useState<string | null>(null)

    return (
        <div>
            {args.options.map(option => (
                <JBRadio
                    label={option}
                    selected={option === selected}
                    onClick={() => setSelected(option)}
                    key={option}
                />
            ))}
        </div>
    )
}
Primary.args = {
    options: ['Hello', 'Jesse', 'Brault']
}
