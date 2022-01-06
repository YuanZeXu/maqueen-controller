RM = 0
LM = 0
SPEED = 0
Y = 0
X = 0
basic.show_icon(IconNames.YES)
basic.pause(500)
radio.set_group(1)
pins.set_pull(DigitalPin.P13, PinPullMode.PULL_NONE)
pins.set_pull(DigitalPin.P14, PinPullMode.PULL_NONE)
pins.set_pull(DigitalPin.P15, PinPullMode.PULL_NONE)
pins.set_pull(DigitalPin.P16, PinPullMode.PULL_NONE)

def on_forever():
    global X, Y, SPEED, LM, RM
    basic.clear_screen()
    X = pins.analog_read_pin(AnalogPin.P1)
    Y = pins.analog_read_pin(AnalogPin.P2)
    led.plot(Math.round(Math.map(X, 0, 1023, 0, 4)),
        Math.round(Math.map(Y, 1023, 0, 0, 4)))
    SPEED = Y
    LM = Math.constrain(Math.round(SPEED * Math.map(Math.constrain(X, 0, 511), 0, 511, 0, 1)),
        0,
        1023)
    RM = Math.constrain(Math.round(SPEED * Math.map(Math.constrain(X, 512, 1023), 512, 1023, 1, 0)),
        0,
        1023)
    if LM > 15:
        radio.send_value("LM", LM)
    else:
        radio.send_value("LM", 0)
    if RM > 15:
        radio.send_value("RM", RM)
    else:
        radio.send_value("RM", 0)
    if pins.digital_read_pin(DigitalPin.P15) == 0:
        basic.show_icon(IconNames.HOUSE)
        radio.send_value("R", 1)
        led.plot_brightness(2, 0, 63)
    if pins.digital_read_pin(DigitalPin.P16) == 0:
        radio.send_value("B", 1)
        led.plot_brightness(0, 2, 63)
    if pins.digital_read_pin(DigitalPin.P14) == 0:
        radio.send_value("Y", 1)
        led.plot_brightness(4, 2, 63)
    if pins.digital_read_pin(DigitalPin.P13) == 0:
        radio.send_value("G", 1)
        led.plot_brightness(2, 4, 63)
basic.forever(on_forever)
