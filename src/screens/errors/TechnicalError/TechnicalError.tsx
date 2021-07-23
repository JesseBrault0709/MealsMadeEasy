import ServerErrorImg from './assets/TechnicalError.png'

// import './TechnicalError.css'

import ReactDOM from "react-dom";
import { BottomModal } from "../../common/BottomModal/BottomModal";
import { JBButton } from '../../../inputs/Button/JBButton';
import { getModalEffect } from '../../../util';
import { useEffect } from 'react';

export type TechnicalErrorProps = {
    message?: string,
    onTryAgain?: () => void
}

export function TechnicalError(props: TechnicalErrorProps) {

    const modalEffect = getModalEffect()

    useEffect(() => modalEffect())

    return ReactDOM.createPortal(
        <BottomModal>
            <div className="server-error-modal">
                <img src={ServerErrorImg} alt=""/>
                <p>{props.message ?? 'Oops! Something went wrong.'}</p>
                <JBButton
                    variant="primary"
                    onClick={props.onTryAgain}
                >Try Again</JBButton>
            </div>
        </BottomModal>,
        document.getElementById('modal-root') as Element
    )
}