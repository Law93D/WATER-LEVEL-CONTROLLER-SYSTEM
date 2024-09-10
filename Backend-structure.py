class WaterLevelController:
    """water level control class, inits the states of each element,
    defines energize_low_level, energize_high_level, stop_system,
    update_system, delayed_valve_open, shutdown_system,
    _str_ (): Displays the current state of the system.
    """
    def __init__(self):
        """
        Initializes the WaterLevelController object with default states:
        - Pumps are off, the valve is closed, sensors are de-energized, and
        the display shows "Idle."
        """
        self.pump_1 = False  # Represents pump 1 (data type 0.4)
        self.pump_2 = False  # Represents pump 2 (data type 0.5)
        self.valve = False  # Represents  the outlet valve (data type 0.6)
        self.low_level_sensor = False   # low-lvl sensor switch (data type 0.1)
        self.high_level_sensor = False  # hgh-lvl sensor switch (data type 0.2)
        self.display_screen = "Idle"  # Represents the display screen text
        self.stop_button = False  # Represents the stop button

    def energize_low_level(self):
        """simulate low level sensor being energized (contact closes)."""
        self.low_level_sensor = True
        self.update_system()

    def energize_high_level(self):
        """Simulate high level sensor being energized (contact closes)."""
        self.high_level_sensor = True
        self.update_system()

    def stop_system(self):
        """Simulate the stop button being pressed."""
        self.stop_button = True
        self.shutdown_system()

    def update_system(self):
        """
        Updates the system's state based on sensor inputs and conditions.
        - If the stop button is pressed, the system shuts down.
        - If the low-level sensor is energized and the high-level sensor isn't,
          the pumps are activated to fill the tank.
        - If the high-level sensor is energized, the pumps stop and the valve
          opens after a delay.
        """
        if self.stop_button:
            self.shutdown_system()
            return

        if self.low_level_sensor and not self.high_level_sensor:
            # Low-level sensor is on, high-level sensor is off; start filling
            self.pump_1 = True
            self.pump_2 = True
            self.valve = False  # Ensure the valve is closed
            self.display_screen = "Low Level - Filling"
        elif self.high_level_sensor:
            # High-level sensor is on;
            # stop pumps and open the valve after a delay
            self.pump_1 = False
            self.pump_2 = False
            self.display_screen = "Tank Full"
            self.delayed_valve_open()

    def delayed_valve_open(self):
        """
        Opens the valve after a 9-second delay to simulate water discharge.
        - After discharging, the system resets for the next cycle.
        """
        import time
        time.sleep(9)  # Simulate the 9-second delay
        self.valve = True
        self.display_screen = "Running - Discharging"

        # Reset sensors to simulate the next cycle
        self.low_level_sensor = False
        self.high_level_sensor = False
        self.update_system()

    def shutdown_system(self):
        """
        Shuts down the system when the stop button is pressed.
        - All pumps and valves are turned off.
        - The display shows "System Stopped."
        """
        self.pump_1 = False
        self.pump_2 = False
        self.valve = False
        self.display_screen = "System Stopped"

    def __str__(self):
        """
        Returns a string representation of the current system state.
        - Shows the display text, pump, and valve states.
        """
        return (f"Display: {self.display_screen}\n"
                f"Pump 1: {'ON' if self.pump_1 else 'OFF'}\n"
                f"Pump 2: {'ON' if self.pump_2 else 'OFF'}\n"
                f"Valve: {'OPEN' if self.valve else 'CLOSED'}\n")


# Example usage:
if __name__ == "__main__":
    controller = WaterLevelController()

    # Simulate the system operation
    print(controller)

    controller.energize_low_level()
    print(controller)

    controller.energize_high_level()
    print(controller)

    controller.stop_system()
    print(controller)
