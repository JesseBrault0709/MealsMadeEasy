import { dietAllergySearch } from './dietAllergySearch'
import { getRecipeById } from './getRecipeById'

// searchByOnboardingPreferences({
//     cookingTime: '15 mins',
//     diet: 'Vegetarian',
//     restrictions: []
// }, 'breakfast')
// .then(data => {
//     data.results.forEach(recipe => {
//         console.log(recipe.title)
//     })
// })

// dietAllergySearch(null, null, null).then(recipes => {

//     console.log('null null null search:')
//     recipes.forEach(recipe => {
//         console.log(recipe.title)
//     })

// })

// dietAllergySearch("Gluten Free", ["Dairy"], "breakfast").then(recipes => {
//     console.log("Gluten Free, Dairy Free breakfast:")
//     recipes.forEach(recipe => {
//         console.log(recipe.title)
//     })
// })

dietAllergySearch(null, null, null).then(recipes => {
    recipes.forEach(recipe => {
        getRecipeById(recipe.id).then(recipe => {
            console.log(recipe)
        })
    })
})