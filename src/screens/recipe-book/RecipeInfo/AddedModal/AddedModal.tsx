import Check from './assets/Check.png'

import ReactDOM from 'react-dom'
import { BottomModal } from '../../../common/BottomModal/BottomModal'
import { getModalEffect } from '../../../../util/util'
import { useEffect } from 'react'

export function AddedModal() {
    const modalEffect = getModalEffect()

    useEffect(() => modalEffect(), [modalEffect])

    return ReactDOM.createPortal(
        <BottomModal>
            <div className="added-modal">
                <img src={Check} alt="" />
                <span>Added to planner</span>
            </div>
        </BottomModal>,
        document.getElementById('modal-root') as Element
    )
}
