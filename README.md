# WATER LEVEL CONTROL SYSTEM
This is a backend stack that monitors the water level in a tank, controls the off and on capabilities of a valve with the help of sensors that relay signals.

# Explanation of the Code:
Initialization (__init__ Method):

Initializes the pumps, valve, sensors, display screen, and stop button to their default states.

##  Energize Methods:

`energize_low_level()` and `energize_high_level()` simulate the closing of contacts for the low and high-level sensors, respectively.
When a sensor is energized, the `update_system()` method is called to adjust the system’s state.

### Update System (update_system Method):

Controls the pumps and valve based on the sensor inputs.
If the low-level sensor is active, the pumps turn on, and the valve remains closed.
If the high-level sensor is active, the pumps turn off, and the valve opens after a 9-second delay.

### Delayed Valve Open (delayed_valve_open Method):

Introduces a 9-second delay before opening the valve and starting the water discharge process.
After opening the valve, the system resets the sensor states for the next cycle.

### Shutdown System (shutdown_system Method):

Shuts down the system when the stop button is pressed, turning off the pumps and closing the valve.

### String Representation (__str__ Method):

Provides a text representation of the current state of the system, which is useful for debugging or displaying the status.
```
Example of Usage:
=================
The example at the bottom shows how the system operates by simulating the energizing of sensors and pressing the stop button.
Execution:
Run the script to simulate the water level controller operation.
The console output will show the state of the system at different points, reflecting the actions taken when the sensors are energized or the stop button is pressed.
```

## Authors
Lawrence Denhere - [Github](https://github.com/Law93D) / [Twitter](https://x.com/LawDen93)
Ogofoluwa Ibitola - [Github](https://github.com/folujam) / [Twitter](https://x.com/ogofoluwa)
