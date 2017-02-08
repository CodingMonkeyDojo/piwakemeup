export default class ConnectedGpiosController {
    constructor(gpioService, wiringData) {
        this.gpioService = gpioService
        this.wiringData = wiringData
    }

    all(res) {
        let gpios = this.wiringData.connectedGpios
        let result = gpios.map((gpio) => {
            let status = this.gpioService.getStatus(gpio.gpioPin)
            return Object.assign(gpio, status)
        })
        res.status(200).json({"gpios": result})
    }
}