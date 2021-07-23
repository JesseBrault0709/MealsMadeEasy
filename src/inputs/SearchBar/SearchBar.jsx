/**
 * TODO as of 6/28/21:
 *  * This control may or may not end up being used so
 *      let's leave it alone for now.
 */

import MagnifyingGlass from './assets/MagnifyingGlass.png'

import { InputGroup, FormControl } from 'react-bootstrap'

export function SearchBar() {
    return (
        <InputGroup>
            <InputGroup.Prepend>
                <InputGroup.Text>
                    <img src={MagnifyingGlass} alt="Magnifying Glass" />
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
                id="searchBar"
                placeholder="Cuisine, dish, ingredient, keyword..."
            />
        </InputGroup>
    )
}
