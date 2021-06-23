import MagnifyingGlass from './assets/MagnifyingGlass.png'
import './SearchBar.css'

import { InputGroup, FormControl } from "react-bootstrap";

export function SearchBar() {
    return <InputGroup>
        <InputGroup.Prepend>
            <InputGroup.Text>
                <img src={MagnifyingGlass} alt="Magnifying Glass" />
            </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl id="searchBar" placeholder="Cuisine, dish, ingredient, keyword..." />
    </InputGroup>
}