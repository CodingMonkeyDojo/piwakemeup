import data from '../../data/wiring.json'

let all = (req, res) => {
    let gpios = data.connectedGpios

    res.status(200).json({gpios})

}

export default all