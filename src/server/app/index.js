import Server from './Server'
import GpioLed from './raspberrypi/GpioLed'

new Server(GpioLed).run()
