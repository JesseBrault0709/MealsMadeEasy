import BulletFilled from './assets/BulletFilled.png'
import BulletEmpty from './assets/BulletEmpty.png'
import ArrowLeft from './assets/ArrowLeft.png'
import ArrowRight from './assets/ArrowRight.png'

import './OrderedScreenCollection.css'

import { useState } from 'react'
import { Sequence } from '../Sequence/Sequence'

type OrderedScreenProps = {
    onPrevious?: () => void,
    onNext?: () => void,

    index: number,
    outOf: number,

    children: React.ReactNode
}

function OrderedScreen(props: OrderedScreenProps) {
    return <div className="ordered-screen">
        <div className="ordered-screen-children">
            {props.children}
        </div>
        <div className="ordered-screen-buttons">
            {props.onPrevious !== undefined ? <img src={ArrowLeft} onClick={props.onPrevious} alt="previous" /> : ''}
            <Sequence 
                value={props.index + 1} 
                outOf={props.outOf} 
                getCompleted={() => <img src={BulletFilled} style={{ marginLeft: "10px" , marginRight: "10px" }} alt=""/>}
                getIncomplete={() => <img src={BulletEmpty} style={{ marginLeft: "10px" , marginRight: "10px" }} alt=""/>} 
            />
            {props.onNext !== undefined ? <img src={ArrowRight} onClick={props.onNext} alt="next" /> : ''}
        </div>
    </div>
}


export type OrderedScreenCollectionProps = {
    children: React.ReactNodeArray,
    onLastNext?: () => void
}

export function OrderedScreenCollection(props: OrderedScreenCollectionProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const onPrevious = () => {
        setCurrentIndex(currentIndex - 1 < 0 ? 0 : currentIndex - 1)
    }

    const onNext = () => {
        const target = currentIndex + 1
        if (target < props.children.length) {
            setCurrentIndex(target)
        } else if (props.onLastNext !== undefined) {
            props.onLastNext()
        }
    }

    return <OrderedScreen
        index={currentIndex}
        outOf={props.children.length}
        onPrevious={currentIndex !== 0 ? onPrevious : undefined}
        onNext={onNext}
    >
        {props.children[currentIndex]}
    </OrderedScreen>

}