import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'
import { RecipeInfo } from './RecipeInfo'

export default {
    title: 'RecipeInfo/RecipeInfo',
    component: RecipeInfo
}

const Template = args => <RecipeInfo {...args} />

export const Primary = Template.bind({})
Primary.args = {
    recipe: {
        id: 0,
        title: 'Sausage and Gravy',
        image: DevRecipePicture,
        imageType: 'png',

        readyInMinutes: 25,
        spoonacularScore: 77.7,
        servings: 2,

        instructions: `
            Put the food in the oven.

            Then bake it for 42 minutes.
        `,

        extendedIngredients: [
            // FROM https://spoonacular.com/food-api/docs#Get-Recipe-Information
            {
                "aisle": "Milk, Eggs, Other Dairy",
                "amount": 1.0,
                "consitency": "solid",
                "id": 1001,
                "image": "butter-sliced.jpg",
                "measures": {
                    "metric": {
                        "amount": 1.0,
                        "unitLong": "Tbsp",
                        "unitShort": "Tbsp"
                    },
                    "us": {
                        "amount": 1.0,
                        "unitLong": "Tbsp",
                        "unitShort": "Tbsp"
                    }
                },
                "meta": [],
                "name": "butter",
                "original": "1 tbsp butter",
                "originalName": "butter",
                "unit": "tbsp"
            },
            {
                "aisle": "Produce",
                "amount": 2.0,
                "consitency": "solid",
                "id": 10011135,
                "image": "cauliflower.jpg",
                "measures": {
                    "metric": {
                        "amount": 473.176,
                        "unitLong": "milliliters",
                        "unitShort": "ml"
                    },
                    "us": {
                        "amount": 2.0,
                        "unitLong": "cups",
                        "unitShort": "cups"
                    }
                },
                "meta": [
                    "frozen",
                    "thawed",
                    "cut into bite-sized pieces"
                ],
                "name": "cauliflower florets",
                "original": "about 2 cups frozen cauliflower florets, thawed, cut into bite-sized pieces",
                "originalName": "about frozen cauliflower florets, thawed, cut into bite-sized pieces",
                "unit": "cups"
            },
            {
                "aisle": "Cheese",
                "amount": 2.0,
                "consitency": "solid",
                "id": 1041009,
                "image": "cheddar-cheese.png",
                "measures": {
                    "metric": {
                        "amount": 2.0,
                        "unitLong": "Tbsps",
                        "unitShort": "Tbsps"
                    },
                    "us": {
                        "amount": 2.0,
                        "unitLong": "Tbsps",
                        "unitShort": "Tbsps"
                    }
                },
                "meta": [
                    "grated",
                    "(I used romano)"
                ],
                "name": "cheese",
                "original": "2 tbsp grated cheese (I used romano)",
                "originalName": "grated cheese (I used romano)",
                "unit": "tbsp"
            },
            {
                "aisle": "Oil, Vinegar, Salad Dressing",
                "amount": 1.0,
                "consitency": "liquid",
                "id": 1034053,
                "image": "olive-oil.jpg",
                "measures": {
                    "metric": {
                        "amount": 1.0,
                        "unitLong": "Tbsp",
                        "unitShort": "Tbsp"
                    },
                    "us": {
                        "amount": 1.0,
                        "unitLong": "Tbsp",
                        "unitShort": "Tbsp"
                    }
                },
                "meta": [],
                "name": "extra virgin olive oil",
                "original": "1-2 tbsp extra virgin olive oil",
                "originalName": "extra virgin olive oil",
                "unit": "tbsp"
            },
            {
                "aisle": "Produce",
                "amount": 5.0,
                "consitency": "solid",
                "id": 11215,
                "image": "garlic.jpg",
                "measures": {
                    "metric": {
                        "amount": 5.0,
                        "unitLong": "cloves",
                        "unitShort": "cloves"
                    },
                    "us": {
                        "amount": 5.0,
                        "unitLong": "cloves",
                        "unitShort": "cloves"
                    }
                },
                "meta": [],
                "name": "garlic",
                "original": "5-6 cloves garlic",
                "originalName": "garlic",
                "unit": "cloves"
            },
            {
                "aisle": "Pasta and Rice",
                "amount": 6.0,
                "consitency": "solid",
                "id": 20420,
                "image": "fusilli.jpg",
                "measures": {
                    "metric": {
                        "amount": 170.097,
                        "unitLong": "grams",
                        "unitShort": "g"
                    },
                    "us": {
                        "amount": 6.0,
                        "unitLong": "ounces",
                        "unitShort": "oz"
                    }
                },
                "meta": [
                    "(I used linguine)"
                ],
                "name": "pasta",
                "original": "6-8 ounces pasta (I used linguine)",
                "originalName": "pasta (I used linguine)",
                "unit": "ounces"
            },
        ]
    }
}