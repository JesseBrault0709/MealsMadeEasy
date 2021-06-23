import Faders from './assets/Faders.png'
import DevRecipePicture from '../RecipeCard/assets/DevRecipePicture.png'

import { SearchBar } from '../../../inputs/SearchBar/SearchBar'
import { ScreenWithTitleAndNav } from "../../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { Container, Row, Col } from "react-bootstrap"
import { RecipeCard } from '../RecipeCard/RecipeCard'

/**
 * @param {{
 *  categoryTitle?: string,
 *  recipes?: {
 *      title?: string,
 *      rating?: 0 | 1 | 2 | 3 | 4 | 5,
 *      imgSrc?: any
 *  }[]
 * }} props 
 */
export function Category(props) {
    return <ScreenWithTitleAndNav title="Categories" activeNavButton="RECIPES">
        <SearchBar />
        <h2>{props.categoryTitle}</h2>
        <img src={Faders} />
        <Container>
            {
                props.recipes?.map((recipe1, index) => {
                    if (index % 2 === 0) {
                        const recipe2 = props.recipes !== null && props.recipes !== undefined ? props.recipes[index + 1] : null
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