class WaterLevelController:
    
    def __init__(self):
        self.pump_1 = False # Represents pump 1 (data type 0.4)
        self.pump_2 = False # Represents pump 2 (data type 0.5)
        self.valve = False # Represents  the outlet valve (data type 0.6)
        self.low_level_sensor = False  # Represents the low-level sensor switch (data type 0.1)
        self.high_level_sensor = False # Represents the high-level sensor switch (data type 0.2)
        self.display_screen = "Idle"   # Represents the display screen text
        self.stop_button = False       # Represents the stop button
        
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
        """Update the system state based on the sensor inputs."""
        if self.stop_button:
            self.shutdown_system()
            return
        
        if self.low_level_sensor and not self.high_level_sensor:
            # Low-level sensor is energized, and high-level is not; fill the tank
            self.pump_1 = True
            self.pump_2 = True
            self.valve = False  # Ensure the valve is closed
            self.display_screen = "Low Level - Filling"
        elif self.high_level_sensor:
            # High-level sensor is energized; stop pumps and open the valve after a delay
            self.pump_1 = False
            self.pump_2 = False
            self.display_screen = "Tank Full"
            self.delayed_valve_open()

    def delayed_valve_open(self):
        """Open the valve after a 9-second delay to discharge water."""
        import time
        time.sleep(9)  # Simulate the 9-second delay
        self.valve = True
        self.display_screen = "Running - Discharging"
        
        # Reset sensors to simulate the next cycle
        self.low_level_sensor = False
        self.high_level_sensor = False
        self.update_system()

    def shutdown_system(self):
        """Shutdown the system when the stop button is pressed."""
        self.pump_1 = False
        self.pump_2 = False
        self.valve = False
        self.display_screen = "System Stopped"

    def __str__(self):
        """Display the current state of the system."""
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
    