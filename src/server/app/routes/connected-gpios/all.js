import data from '../../data/wiring.json'

import GpioService from '../../services/GpioService'
import Controller from '../../controllers/ConnectedGpiosController'

let all = (req, res) => {
    let controller = new Controller(new GpioService(), data);
    controller.all(res)
}

export default all