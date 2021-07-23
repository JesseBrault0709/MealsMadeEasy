import { getByComplexSearch } from './complexSearch'

getByComplexSearch({
    addRecipeInformation: true
}).then(recipes => {
    recipes.forEach(recipe => {
        console.log(recipe)
    })
})
