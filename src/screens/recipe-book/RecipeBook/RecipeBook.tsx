import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'

import { ScreenWithTitleAndNav } from "../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { TimeDietAllergies } from "../TimeDietAllergies/TimeDietAllergies"
import { Tag } from "../TimeDietAllergies/Tag"
import { MealTabBar, MealTabBarProps } from "../MealTabBar/MealTabBar"
import { Recipe } from "../../../recipes/Recipe"
import { Container, Row } from "react-bootstrap"
import { RecipeCard } from "../RecipeCard/RecipeCard"

export type RecipeBookProps = {
    tags: ReadonlyArray<Tag>,
    tabs: MealTabBarProps['tabs']
    recipes: ReadonlyArray<Recipe>
}

export function RecipeBook(props: RecipeBookProps) {
    return <ScreenWithTitleAndNav title="Recipe Book" activeNavButton="RECIPES" >
        <TimeDietAllergies tags={props.tags}/>
        <MealTabBar tabs={props.tabs} />
        <Container>
            {
                props.recipes?.map((recipe1, index) => {
                    if (index % 2 === 0) {
                        const recipe2 = props.recipes[index + 1]
                        return <Row>
                            <RecipeCard title={recipe1.title} rating={recipe1.rating} imgSrc={DevRecipePicture} />
                            <RecipeCard title={recipe2?.title} rating={recipe2?.rating} imgSrc={DevRecipePicture} />
                        </Row>
                    } else {
                        return ''
                    }
                })
            }
        </Container>
    </ScreenWithTitleAndNav>
}