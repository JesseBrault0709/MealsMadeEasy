import { RecipeOverview } from '../client/RecipeOverview'
import {
    addToMeal,
    getBlankDayMealPlan,
    getWeekOfBlankDayMealPlans
} from './DayMealPlan'
import { MealName } from './MealName'

it('gets a blank plan and tests that it has correct props', () => {
    const date = new Date()
    const meals: ReadonlyArray<MealName> = ['Breakfast', 'Lunch', 'Dinner']
    const t = getBlankDayMealPlan(date, meals)

    expect(t.date).toEqual(date)

    meals.forEach(meal => {
        expect(t.meals.has(meal)).toBeTruthy()
    })
})

it('adds a meal to a plan and expects it to be there in result', () => {
    const plan = getBlankDayMealPlan(new Date(), [
        'Breakfast',
        'Lunch',
        'Dinner'
    ])
    const recipe: RecipeOverview = {
        id: 0,
        image: '',
        imageType: '',
        title: 'test recipe'
    }
    const result = addToMeal(plan, 'Breakfast', recipe)

    expect(result.meals.has('Breakfast')).toBeTruthy()
    expect(result.meals.get('Breakfast')!.includes(recipe)).toBeTruthy()
})
