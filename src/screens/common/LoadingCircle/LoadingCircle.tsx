import './LoadingCircle.css'
import Circle from './assets/LoadingCircle.png'

export function LoadingCircle() {
    return <div className="loading-circle">
        <img src={Circle} alt=""/>
    </div>
}