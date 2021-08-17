import {
    SearchFilterListContainer,
    SearchFilterListContainerProps
} from '../SearchFilterListContainer/SearchFilterListContainer'
import { SearchFilterListElement } from '../SearchFilterListElement/SearchFilterListElement'

export type LinksSearchFilterListProps = {
    title: string
    links: ReadonlyArray<[link: string, onSelect: () => void]>
    renderTitleButton: SearchFilterListContainerProps['renderTitleButton']
}

export function LinksSearchFilterList(props: LinksSearchFilterListProps) {
    return (
        <SearchFilterListContainer
            title={props.title}
            renderTitleButton={props.renderTitleButton}
        >
            {props.links.map(([link, onSelect]) => (
                <SearchFilterListElement
                    key={link}
                    title={link}
                    onClick={onSelect}
                />
            ))}
        </SearchFilterListContainer>
    )
}
