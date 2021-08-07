import { ClockSlider } from '../../../inputs/ClockSlider/ClockSlider'
import { RecipePreferences } from '../../../types/RecipePreferences'
import { useContext } from 'react'
import { AppConfigContext } from '../../../index'
import {
    convertStringToCookingTime,
    convertCookingTimeValueToString
} from '../../../util/cookingTime'

export type CookingTimeInputProps = {
    value: RecipePreferences['cookingTime']
    onChange: (cookingTime: RecipePreferences['cookingTime']) => void
}

export function CookingTimeInput(props: CookingTimeInputProps) {
    const appConfig = useContext(AppConfigContext)

    const options: ReadonlyArray<string> = appConfig.availableCookingTimes.map(
        convertCookingTimeValueToString
    )

    const onChange = (option: string) => {
        const asValue = convertStringToCookingTime(option)
        props.onChange(asValue)
    }

    if (props.value !== null) {
        const valueIndex = options.findIndex(option => {
            const asValue = convertStringToCookingTime(option)
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
            const initialOption = convertCookingTimeValueToString(
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
