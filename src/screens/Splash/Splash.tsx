import ForkAndKnife from './assets/ForkAndKnife.png'
import Planner from './assets/Planner.png'

import './Splash.css'

export function Splash() {
    return <div className="splash">
        <div className="splash-logo">
            <img className="fork-and-knife-logo" src={ForkAndKnife} alt="" />
            <img className="planner-logo" src={Planner} alt="" />
        </div>
        <h1>Meals Made Easy</h1>
    </div>
}