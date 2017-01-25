import data from '../../data/wiring.json'

let all = (req, res) => {
    let connections = data.connections

    res.status(200).json({connections})

}

export default all