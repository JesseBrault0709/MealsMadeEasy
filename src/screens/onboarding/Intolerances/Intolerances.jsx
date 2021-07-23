import { render } from '@testing-library/react'
import { Restrictions } from './Intolerances'

it('renders without throwing', () => {
    render(<Restrictions restrictions={['gluten free', 'dairy free']} />)
})
