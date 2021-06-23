import Faders from './assets/Faders.png'
import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'

import { SearchBar } from '../../../inputs/SearchBar/SearchBar'
import { ScreenWithTitleAndNav } from "../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { Container, Row, Col } from "react-bootstrap"
import { RecipeCard } from '../RecipeCard/RecipeCard'
import { Recipe } from '../../../recipes/Recipe'

export type CategoryProps = {
    title: string
    recipes: readonly Recipe[]
    onBackButtonClick?: () => void
}

export function Category(props: CategoryProps) {
    return <ScreenWithTitleAndNav title="Categories" activeNavButton="RECIPES" onBackButtonClick={props.onBackButtonClick}>
        <SearchBar />
        <h2>{props.title}</h2>
        <img src={Faders} />
        <Container>
            {
                props.recipes?.map((recipe1, index) => {
                    if (index % 2 === 0) {
                        const recipe2 = props.recipes[index + 1]
                        return <Row>
                            <RecipeCard title={recipe1.title} rating={recipe1.rating} imgSrc={DevRecipePicture} />
                            <RecipeCard title={recipe2.title} rating={recipe2.rating} imgSrc={DevRecipePicture} />
                        </Row>
                    } else {
                        return ''
                    }
                })
            }
        </Container>
    </ScreenWithTitleAndNav>
}