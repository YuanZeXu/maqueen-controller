let RM = 0
let LM = 0
let SPEED = 0
let Y = 0
let X = 0
basic.showIcon(IconNames.Yes)
basic.pause(500)
radio.setGroup(87)
pins.setPull(DigitalPin.P13, PinPullMode.PullNone)
pins.setPull(DigitalPin.P14, PinPullMode.PullNone)
pins.setPull(DigitalPin.P15, PinPullMode.PullNone)
pins.setPull(DigitalPin.P16, PinPullMode.PullNone)
pins.setPull(DigitalPin.P8, PinPullMode.PullNone)
basic.forever(function () {
    basic.clearScreen()
    X = pins.analogReadPin(AnalogPin.P1)
    Y = pins.analogReadPin(AnalogPin.P2)
    led.plot(Math.round(Math.map(X, 0, 1023, 0, 4)), Math.round(Math.map(Y, 1023, 0, 0, 4)))
    SPEED = Math.map(Y, 0, 1023, -1, 1)
    LM = Math.round(512 + 512 * (SPEED * Math.map(Math.constrain(X, 0, 511), 0, 511, 0, 1)))
    RM = Math.round(512 + 512 * (SPEED * Math.map(Math.constrain(X, 512, 1023), 512, 1023, 1, 0)))
    if (LM > 15) {
        radio.sendValue("LM", LM)
    } else {
        radio.sendValue("LM", 0)
    }
    serial.writeValue("LM", LM)
    if (RM > 15) {
        radio.sendValue("RM", RM)
    } else {
        radio.sendValue("RM", 0)
    }
    serial.writeValue("RM", RM)
    if (pins.digitalReadPin(DigitalPin.P15) == 0) {
        radio.sendValue("R", 1)
        led.plotBrightness(2, 0, 63)
    } else {
        radio.sendValue("R", 0)
    }
    serial.writeValue("button_R", 1 - pins.digitalReadPin(DigitalPin.P15))
    if (pins.digitalReadPin(DigitalPin.P16) == 0) {
        radio.sendValue("B", 1)
        led.plotBrightness(0, 2, 63)
    } else {
        radio.sendValue("B", 0)
    }
    serial.writeValue("button_B", 1 - pins.digitalReadPin(DigitalPin.P16))
    if (pins.digitalReadPin(DigitalPin.P14) == 0) {
        radio.sendValue("Y", 1)
        led.plotBrightness(4, 2, 63)
    } else {
        radio.sendValue("Y", 0)
    }
    serial.writeValue("button_Y", 1 - pins.digitalReadPin(DigitalPin.P14))
    if (pins.digitalReadPin(DigitalPin.P13) == 0) {
        radio.sendValue("G", 1)
        led.plotBrightness(2, 4, 63)
    } else {
        radio.sendValue("G", 0)
    }
    serial.writeValue("button_G", 1 - pins.digitalReadPin(DigitalPin.P13))
    if (pins.digitalReadPin(DigitalPin.P8) == 0) {
        radio.sendValue("Z", 1)
        led.plotBrightness(1, 1, 63)
        led.plotBrightness(1, 2, 63)
        led.plotBrightness(1, 3, 63)
        led.plotBrightness(2, 1, 63)
        led.plotBrightness(2, 2, 63)
        led.plotBrightness(2, 3, 63)
        led.plotBrightness(3, 1, 63)
        led.plotBrightness(3, 2, 63)
        led.plotBrightness(3, 3, 63)
    } else {
        radio.sendValue("Z", 0)
    }
    serial.writeValue("button_Z", 1 - pins.digitalReadPin(DigitalPin.P8))
    if (input.buttonIsPressed(Button.A)) {
        led.plotBrightness(0, 0, 63)
        radio.sendValue("LA", 1)
        serial.writeValue("button_LA", 1)
    } else {
        radio.sendValue("LA", 0)
        serial.writeValue("button_LA", 0)
    }
    if (input.buttonIsPressed(Button.B)) {
        led.plotBrightness(4, 0, 63)
        radio.sendValue("RB", 1)
        serial.writeValue("button_RB", 1)
    } else {
        radio.sendValue("RB", 0)
        serial.writeValue("button_RB", 0)
    }
})
