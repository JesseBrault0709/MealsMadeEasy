import { render } from '@testing-library/react'
import { Home } from './Home'

it('renders without throwing when given correct props', () => {
    render(<Home showLoadingScreen={false} />)
})
