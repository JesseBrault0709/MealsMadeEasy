import {
    DayMealPlan,
    extractDateFromDayMealPlan,
    RecipeSelection
} from '../../types/DayMealPlan'
import { ScreenWithTitleAndNav } from '../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav'
import { MealName } from '../../types/MealName'
import { EmptyMealCard, MealCard } from './MealCard/MealCard'
import { MealCardMenuProps } from './MealCard/MealCardMenu/MealCardMenu'
import { useAppDispatch, useAppSelector } from '../../index'
import { setRecipeBookScreen, setRecipeInfoId } from '../../slices/recipeBook'
import { setHomeScreen } from '../../slices/homeScreens'
import { removeSelectionFromMealPlan } from '../../slices/dayMealPlans'
import { useContext, useState } from 'react'
import { AppConfigContext } from '../../index'
import { setToReplaceMode } from '../../slices/selectionMode'

function getDayAbbrev(day: number) {
    switch (day) {
        case 0:
            return 'SUN'
        case 1:
            return 'MON'
        case 2:
            return 'TUE'
        case 3:
            return 'WED'
        case 4:
            return 'THU'
        case 5:
            return 'FRI'
        case 6:
            return 'SAT'
        default:
            return ''
    }
}

function formatDate(date: Date) {
    return `${date.getMonth() + 1}/${date.getDate()}`
}

function MealCol(props: {
    selections?: ReadonlyArray<RecipeSelection>
    accented?: boolean

    mealCardMenuPlacement: MealCardMenuProps['variant']
    onRemoveRecipe?: (selection: RecipeSelection) => void
    onReplaceRecipe?: (selection: RecipeSelection) => void

    menuOwner: RecipeSelection['selectionId'] | undefined
    setMenuOwner: (owner: RecipeSelection['selectionId'] | undefined) => void
}) {
    const dispatch = useAppDispatch()

    if (props.selections !== undefined && props.selections.length !== 0) {
        return (
            <div className="meal-col">
                {props.selections.map(selection => (
                    <MealCard
                        key={selection.selectionId}
                        onClick={() => {
                            if (props.menuOwner === selection.selectionId) {
                                props.setMenuOwner(undefined)
                            } else {
                                props.setMenuOwner(selection.selectionId)
                            }
                        }}
                        showMenu={props.menuOwner === selection.selectionId}
                        variant={props.accented ? 'accented' : 'normal'}
                        menuPlacement={props.mealCardMenuPlacement}
                        recipeId={selection.recipeId}
                        onViewRecipe={() => {
                            dispatch(
                                setRecipeInfoId({ id: selection.recipeId })
                            )
                            dispatch(
                                setRecipeBookScreen({ screen: 'Recipe Info' })
                            )
                            dispatch(setHomeScreen({ screen: 'Recipe Book' }))
                        }}
                        onReplaceRecipe={() => {
                            if (props.onReplaceRecipe !== undefined) {
                                props.onReplaceRecipe(selection)
                            }
                        }}
                        onRemoveRecipe={() => {
                            if (props.onRemoveRecipe !== undefined) {
                                props.onRemoveRecipe(selection)
                            }
                        }}
                    />
                ))}
            </div>
        )
    } else {
        return (
            <div className="meal-col">
                <EmptyMealCard />
            </div>
        )
    }
}

function DayRow(props: {
    dayMealPlan: DayMealPlan
    meals: ReadonlyArray<MealName>
    variant: 'light' | 'dark'

    menuOwner: RecipeSelection['selectionId'] | undefined
    setMenuOwner: (owner: RecipeSelection['selectionId'] | undefined) => void

    menuPosition: 'upper' | 'lower'
}) {
    const dispatch = useAppDispatch()

    const today = new Date()
    const planDate = extractDateFromDayMealPlan(props.dayMealPlan)
    const accented =
        today.getFullYear() === planDate.getFullYear() &&
        today.getMonth() === planDate.getMonth() &&
        today.getDate() === planDate.getDate()

    return (
        <div className={['day-row', `day-row-${props.variant}`].join(' ')}>
            <div className="day-row-date-and-day">
                <span className="day-row-date">{formatDate(planDate)}</span>
                <span className="day-row-day">
                    {getDayAbbrev(planDate.getDay())}
                </span>
            </div>

            {props.meals.map((meal, index) => (
                <MealCol
                    key={meal}
                    menuOwner={props.menuOwner}
                    setMenuOwner={props.setMenuOwner}
                    selections={
                        props.dayMealPlan.meals.find(
                            mealPlan => mealPlan.name === meal
                        )?.recipeSelections
                    }
                    accented={accented}
                    mealCardMenuPlacement={
                        index === props.meals.length - 1
                            ? `${props.menuPosition}-left`
                            : `${props.menuPosition}-right`
                    }
                    onRemoveRecipe={(selection: RecipeSelection) => {
                        dispatch(
                            removeSelectionFromMealPlan({
                                date: props.dayMealPlan.date,
                                mealName: meal,
                                selection
                            })
                        )
                    }}
                    onReplaceRecipe={selection => {
                        dispatch(
                            setToReplaceMode({
                                mode: 'replace',
                                targetDate: planDate,
                                targetMeal: meal,
                                targetSelection: selection
                            })
                        )
                        dispatch(
                            setRecipeBookScreen({
                                screen: 'Recipe List'
                            })
                        )
                        dispatch(
                            setHomeScreen({
                                screen: 'Recipe Book'
                            })
                        )
                    }}
                />
            ))}
        </div>
    )
}

export function Planner() {
    const appConfig = useContext(AppConfigContext)

    const dayMealPlans = useAppSelector(state => state.dayMealPlans.plans)

    const sorted = [...dayMealPlans]
    sorted.sort((a, b) => a.date.valueOf() - b.date.valueOf())

    const [menuOwner, setMenuOwner] = useState<RecipeSelection['selectionId']>()

    return (
        <ScreenWithTitleAndNav
            title="Planner"
            subtitle="(Click on the card to view options)"
        >
            <div className="planner">
                <div className="planner-heading">
                    <span className="heading-date">Date</span>
                    {appConfig.meals.map(meal => (
                        <span key={meal} className="heading-meal">
                            {meal}
                        </span>
                    ))}
                </div>

                {sorted.map((dayMealPlan, index) => (
                    <DayRow
                        key={formatDate(
                            extractDateFromDayMealPlan(dayMealPlan)
                        )}
                        dayMealPlan={dayMealPlan}
                        meals={appConfig.meals}
                        variant={index % 2 === 0 ? 'dark' : 'light'}
                        menuOwner={menuOwner}
                        setMenuOwner={setMenuOwner}
                        menuPosition={
                            index >= sorted.length - 3 ? 'upper' : 'lower'
                        } // last two rows have upper
                    />
                ))}
            </div>
        </ScreenWithTitleAndNav>
    )
}
