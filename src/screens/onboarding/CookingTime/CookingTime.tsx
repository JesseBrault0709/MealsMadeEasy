import { ClockSlider } from '../../../inputs/ClockSlider/ClockSlider'
import { RecipePreferences } from '../../../types/RecipePreferences'
import { useContext } from 'react'
import { AppConfigContext } from '../../../index'

export type CookingTimeInputProps = {
    value: RecipePreferences['cookingTime']
    onChange: (cookingTime: RecipePreferences['cookingTime']) => void
}

const convertValueToOption = (
    value: RecipePreferences['cookingTime']
): string => {
    if (value === 'No Limit') {
        return value
    } else if (value !== null) {
        return `${value.toString()} mins`
    } else {
        throw new Error(
            'cannot convert an undefined value to an option for ClockSlider'
        )
    }
}

const convertOptionToValue = (
    option: string
): RecipePreferences['cookingTime'] => {
    if (option === 'No Limit') {
        return option
    } else {
        const asNumber = parseInt(option.slice(0, -5))
        if (asNumber === undefined) {
            throw new Error(`cannot convert option '${option}' to a value`)
        }
        return asNumber
    }
}

export function CookingTimeInput(props: CookingTimeInputProps) {
    const appConfig = useContext(AppConfigContext)

    const options: ReadonlyArray<string> = appConfig.availableCookingTimes.map(
        convertValueToOption
    )

    const onChange = (option: string) => {
        const asValue = convertOptionToValue(option)
        props.onChange(asValue)
    }

    if (props.value !== null) {
        const valueIndex = options.findIndex(option => {
            const asValue = convertOptionToValue(option)
            return asValue === props.value
        })

        return (
            <div className="cooking-time-container">
                <ClockSlider
                    options={options}
                    onChange={onChange}
                    valueIndex={valueIndex}
                />
            </div>
        )
    } else {
        const valueIndex = options.findIndex(option => {
            const initialOption = convertValueToOption(
                appConfig.initialCookingTime
            )
            return initialOption === option
        })

        return (
            <div className="cooking-time-container">
                <ClockSlider
                    options={options}
                    onChange={onChange}
                    valueIndex={valueIndex}
                />
            </div>
        )
    }
}
