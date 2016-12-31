import Server from './Server'
import GpioLed from './raspberrypi/MockGpioLed'

new Server(GpioLed).run()
