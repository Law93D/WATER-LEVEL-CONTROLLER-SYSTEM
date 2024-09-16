# WATER-LEVEL-CONTROLLER-SYSTEM

This is a simple backend stack that monitors the water level in a tank, controls the on and off capabilities of a valve with the help of sensors that relay signals.

Initialization (__init__ Method):
Initializes the pumps, valve, sensors, display screen, and stop button to their default states.

[Backend-structure.py](./Backend-structure.py)
* `energize_low_level()` and `energize_high_level()` simulate the closing of contacts for the low and high-level sensors, respectively.
* When a sensor is energized, the `update_system()` method is called to adjust the system’s state.
* `stop_system(self)` - stop system
* `delayed_valve_open(self)` - delays valve opening for 9-seconds
* `shutdown_system(self)` - shutsdown system when /stop pressed
* `String Representation (__str__ Method)` -  text representation of the current state of the system


[middleware/authMiddleware](./middleware/authMiddleware.js)
 - Ensures that only authenticated users can access these routes.

[models/SystemState](./models/SystemState.js)
 - builds/represents the schema of the current state of the system (stored in MongoDB).

[models/User](./models/User.js)
 - builds User schema, hashes password, compares given password if it exist in db.

[routes/waterController](./routes/waterController.js)
- Real-Time Updates: After each state change, the new state is emitted to connected clients using req.io.emit('update', systemState).
- Routes:
* `GET /api/water/status`: Returns the current system state.
* `POST /api/water/start`: Starts the pumps and updates the system state to "running".
* `POST /api/water/stop`: Stops the pumps and closes the valve.
* `POST /api/water/high_level_sensor`: Simulates the high-level sensor triggering the valve to discharge water.

## Auth & Auth with Hashed Passwords
[routes/auth](./routes/auth.js)
* `/register` - register a new user, returns error if user exist
* `/login` - signs is user with JWT token

## Dynamic Aspects of the Project

- 1.Real-Time System Updates:
The system involves real-time updates, where the state of pumps, valves, and tank levels changes based on sensor inputs and user interactions.
The backend handles real-time communication using technologies like WebSockets (with Socket.io) to update the frontend dynamically.
- 2.Real-Time Communication:
The use of Node.js with Express and Socket.io allows for real-time communication between the server and clients.
This means that changes in the system’s state (e.g., pump status, valve position) are communicated in real time to the frontend, updating the display immediately.
- 3.Interactive Frontend:
The frontend uses HTML, CSS, and JavaScript to interact with the backend, displaying dynamic content based on the system’s state.
User interactions with the web interface can trigger updates and reflect changes in the system's status.
- 4.Backend Logic:
The backend, written in Python, dynamically processes input from sensors and manages the state of the system.
It updates the system’s state based on sensor inputs and communicates these updates to the frontend in real time.

## Dependencies
* install winston for logger `cd ~/MyApp` `npm install winston`
* install dotenv `npm install dotenv`
* install express and Mongodb/Mongosh if not yet installed

## Example of Usage

The example at the bottom shows how the system operates by simulating the energizing of sensors and pressing the stop button.

Execution:

## run Backend-structure for simulation

 python3 Backend-structure.py

<h4>Run the script to simulate the water level controller operation</h4>
PS C:\Users\Lenovo\OneDrive\Desktop\ALX Projects Backend\Water-Level-Controller-System>python3 Backend-structure.py
Display: Idle
Pump 1: OFF
Pump 2: OFF
Valve: CLOSED

<h3>Display: Low Level – Filling</h3>
Pump 1: ON
Pump 2: ON
Valve: CLOSED

<h3>Display: Running – Discharging</h3>
Pump 1: OFF
Pump 2: OFF
Valve: OPEN

<h3>Display: System Stopped</h3>
Pump 1: OFF
Pump 2: OFF
Valve: CLOSED
PS C:\Users\Lenovo\OneDrive\Desktop\ALX Projects Backend\Water-Level-Controller-System>

### Server.js ?? Run

node server.js/ npm start

 command to connect on port${5000}

PS C:\Users\Lenovo\OneDrive\Desktop\ALX Projects Backend\Water-Level-Controller-System> node server.js
Server is running on port 5000
MongoDB connected

The console output will show the state of the system at different points, reflecting the actions taken when the sensors are energized or the stop button is pressed.

### Running Curl Commands in the terminal for Testing the system API

1.User Register (post): This endpoint creates a new user in your system.
```
curl -X POST curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"<your_username>","password":"<123******>"}'
```
2.User Login (post): This will authenticate a user and return a JWT token.
```
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"username": "<your_username>", "password": "*****6789"}'
```
The response will include a token. Use this token for subsequent authenticated requests.

3.Start the Water Control System (POST): To start the system (e.g., turn on the pumps), use the JWT token from the login response.
```
curl -X POST http://localhost:5000/api/water/start -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>"
{"_id":"66e20e9e1af0d06317495bd5","display":"Low Level - Filling","pump1":true,"pump2":true,"valve":false,"running":true,"__v":0}
```
replace <your_jwt_token> with the actual JWT you received from the login endpoint.

4.Stop the Water Control System (POST): This command stops the system (turns off pumps).
```
curl -X POST http://localhost:5000/api/water/stop -H "Content-Type: application/json" -H "Authorization: Bearer <your_jwt_token>"
{"_id":"66e20e9e1af0d06317495bd5","display":"System Stopped","pump1":false,"pump2":false,"valve":false,"running":false,"__v":0}
```
5.Get Current System Status (GET): This command retrieves the current status of the system (e.g., pump and valve states).
```
curl -X GET http://localhost:5000/api/water/status -H "Authorization: Bearer <your_jwt_token>"
{"_id":"66e20e9e1af0d06317495bd5","display":"System Stopped","pump1":false,"pump2":false,"valve":false,"running":false,"__v":0}
```
6.Simulate High-Level Sensor (POST): This simulates the water reaching the high level and triggers actions like opening the valve.
```
curl -X POST http://localhost:5000/api/water/high_level_sensor -H "Authorization: Bearer <your_jwt_token>"
{"message":"Valve is open - Discharging"}
```
## Authors

- Lawrence Denhere - [Github](https://github.com/Law93D) / [Twitter](https://x.com/LawDen93)
- Ogofoluwa Ibitola - [Github](https://github.com/folujam) / [Twitter](https://x.com/ogofoluwa)
