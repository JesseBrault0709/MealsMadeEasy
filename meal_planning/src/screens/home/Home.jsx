import { ScreenWithTitleAndNav } from "../common/ScreenWithTitleAndNav/ScreenWithTitleAndNav"
import { SearchBar } from "../../inputs/SearchBar/SearchBar"
import { TimeDietAllergies } from './TimeDietAllergies/TimeDietAllergies'

export function Home(props) {
    return <ScreenWithTitleAndNav title="Recipes" activeNavButton="RECIPES">
        <SearchBar />
        <TimeDietAllergies />
    </ScreenWithTitleAndNav>
}