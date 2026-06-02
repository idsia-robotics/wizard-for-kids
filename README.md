# A Wizard for Kids: A Platform for Improvised Child-Robot Interactions

A comprehensive Wizard-of-Oz (WoZ) platform designed for operating social robots in highly unpredictable environments like classrooms, supporting the creation and evaluation of innovative child-robot interactions. This system addresses challenges related to safety, robustness, and managing multiple, often noisy, interactions while providing an intuitive interface for non-expert users like teachers.

## Demo Video

[![Watch the video](https://img.youtube.com/vi/SiZG_uMKaVg/maxresdefault.jpg)](https://youtu.be/SiZG_uMKaVg)

Watch our demonstration of the Wizard-of-Oz platform in action, showcasing the dashboard interface with the TIAGo robot and demonstrating how to configure a new robot.

## Overview

This platform enables rich user data elicitation and contextual inquiry, both essential for understanding user needs and deriving meaningful requirements in Human-Robot Interaction (HRI) research. By prioritizing usability, modularity, and robustness, our approach facilitates iterative design, accelerates the transition from Wizard-of-Oz prototyping to autonomous behaviors, and contributes to making child-robot interaction technologies more accessible and practical for diverse application domains.

## Features

- **Improvisation Support**: Handles highly unpredictable behaviors, especially from children engaged in collaborative tasks
- **Modular Interface**: Adapts to different contexts, user profiles, and robotic platforms
- **Real-time Control**: Web-based dashboard with live camera feeds and responsive control panels
- **Easy Customization**: Configuration wizard for rapid setup without code modifications
- **Multi-Robot Support**: Tested with RoboMaster S1 and PAL Robotics TIAGo robots
- **Experiment Logging**: Comprehensive data recording with structured JSONL format

## Architecture

The system consists of several key components:

```
Web Dashboard ↔ ROS Bridge ↔ Robot Adapters ↔ Robot Hardware
```

### Core Components

- **Next.js Web Dashboard**: Intuitive GUI with dynamic adaptation based on robot capabilities
- **ROS Bridge Server**: WebSocket-based communication between web interface and ROS ecosystem available at [rosbridge_suite](https://github.com/RobotWebTools/rosbridge_suite)
- **Robot Adapters**: Platform-specific translation layers for different robot types
- **Dashboard Bridge**: Administrative functions for experiment management and configuration
- **Semantic Topic Interface**: Standardized command topics for cross-platform compatibility

## Quick Start

### Prerequisites

- **Web Interface**: Node.js 18+, npm
- **Robot Communication**: ROS 2 (Humble or later)
- **Robot Hardware**: Supported robot (RoboMaster S1, TIAGo, or custom with adapter)

### Installation

1. **Clone the repository**:
```bash
git clone <repository-url>
cd wizard-for-kids
```

2. **Install web dependencies**:
First source your ROS 2 workspace for compatibility with your custom robot packages.

Then run:
```bash
npm install
```

3. **Build and run the web interface**:
```bash
npm run build
npm start
```

### Basic Setup

1. **Start ROS Bridge Server**:
```bash
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```

2. **Start the Node.js ROS Bridge**:
```bash
node dashboard_bridge/index.js
```

3. **Start the web interface**:
First build the project if not done already:
```bash
npm run build
```
Then start the server:
```bash
npm start
```

3. **Launch Robot-Specific Nodes**:
Last step is to launch the robot-specific nodes. Examples with RoboMaster EP:

**For RoboMaster S1:**
```bash
# Start robot connection
ros2 launch robomaster_ros ep.launch name:=robomaster conn_type:=ap

# Start safety system
ros2 run safety panic_handler_node

# Start navigation server (if using)
ros2 run navigation_world_ref_action_server navigation_world_ref_action_server_node
```

3. **Access the Dashboard**:
   - Open your web browser and navigate to `http://localhost:3000`
   - Use the configuration wizard to set up your robot interface
   - Start controlling your robot through the web interface

## Already Supported Robots

### RoboMaster S1 (DJI Technology)
- **Capabilities**: Omnidirectional movement, LED control, sound effects, arm with gripper

### PAL Robotics TIAGo
- **Capabilities**: Mobile manipulation, head tracking, object offering behaviors

## Semantic Command Interface

The platform uses standardized topics for cross-robot compatibility:

| Topic | Purpose | Example Commands |
|-------|---------|------------------|
| `/dashboard/movement` | Navigation control | `{"motion_name": "approach_user", "approach_speed": 0.5}` |
| `/dashboard/arm` | Arm manipulation | `{"action": "wave", "params": {"intensity": 0.8}}` |
| `/dashboard/gripper` | Gripper control | `{"action": "open", "force": 0.5}` |
| `/dashboard/sound` | Audio feedback | `{"action": "encouraging_beep", "volume": 0.7}` |
| `/dashboard/leds` | Visual feedback | `{"action": "rainbow_pulse", "intensity": 1.0}` |
| `/experiment/event` | Logging | Structured experiment data in JSONL format |

## Configuration and Customization

### Robot Configuration Wizard

The web interface includes a built-in configuration wizard that allows users to:

- **Add Control Buttons**: Each button represents a semantic action (e.g., "wave", "offer_object")
- **Configure Parameters**: Set robot-specific parameters like speed, force, intensity
- **Map Topics**: Define topic mappings for different robot capabilities
- **Save Configurations**: Store and load robot configurations for different experiments

### Adding New Robot Support

1. **Create Robot Adapter**: Implement a ROS 2 node that subscribes to semantic topics. The example node for TIAGo robot is available here [TIAGo Adapter Example](https://github.com/idsia-robotics/wizard-for-kids-tiago).
2. **Define Robot Configuration**: Use the configuration wizard to create a configuration file specifying capabilities of the new robot.

## Experiment Management

### Data Recording

The platform provides comprehensive experiment logging:

```bash
# Structured experiment events
/experiment/event → JSONL format with timestamps and context

# ROS bag recording for sensor data  
ros2 bag record -a -o experiment_data
```

Which is available via the dashboard interface for easy access and download.


## Research Applications

This platform has been successfully deployed in:

- **Classroom Studies**: Children's collaborative learning with robot peers/regulators
- **Social Interaction Research**: Human-robot approach and offering behaviors  
- **Iterative Design Processes**: Rapid prototyping of interaction paradigms
- **Cross-Platform Validation**: Testing behaviors across different robot morphologies

## Contributing

This project supports the democratization of WoZ systems in HRI research. Contributions are welcome for:

- New robot adapter implementations
- Enhanced web interface features  
- Additional semantic command types
- Safety and accessibility improvements

## Citation

If you use this work in your research, please cite:

```bibtex
@inproceedings{10.1145/3757279.3788810,
author = {Frova, Davide and Landoni, Monica and Arreghini, Simone and Paolillo, Antonio},
title = {A Wizard for Kids: A Platform for Improvised Child–Robot Interactions},
year = {2026},
isbn = {9798400721281},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
url = {https://doi.org/10.1145/3757279.3788810},
doi = {10.1145/3757279.3788810},
abstract = {We present an interface designed to operate social robots in a highly unpredictable context: a classroom, supporting user-centered design of innovative child–robot interactions.  Having a functional prototype enables rich user data elicitation and analysis, essential for understanding user needs and deriving meaningful requirements.   Deploying robots outside controlled laboratory conditions into a classroom, however, introduces challenges related to safety, robustness, and managing multiple, often noisy, interactions.   Our system addresses these challenges by providing a safe, flexible and resilient interface that ensures safe operation while allowing improvisation and adaptability to unpredictable children's behaviors.   The interface aims to be intuitive for non-expert users and support everyday teaching and learning activities in the classrooms.   By prioritizing usability, modularity, and robustness, our approach facilitates iterative design, accelerates the transition from Wizard-of-Oz prototyping to autonomous behaviors, and contributes to making child–robot interaction technologies more accessible and practical for diverse application domains.},
booktitle = {Proceedings of the 21st ACM/IEEE International Conference on Human-Robot Interaction},
pages = {1308–1312},
numpages = {5},
keywords = {Human–Robot Interaction, Social Robots, User Interface Design, Wizard-of-Oz},
location = {Edinburgh, Scotland, UK},
series = {HRI '26}
}
```

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

# Running the dashboard with Pixi

## Terminal 1: ROS Bridge for dashboard
First we run the rosbridge server if using the branched repo:

```bash
cd /Users/davide/USI/research/wizard-for-kids
pixi shell
source rosbridge_ws/install/setup.zsh
ros2 launch rosbridge_server rosbridge_websocket_launch.xml
```

## Terminal 2 Dashboard bridge:

```bash
pixi shell
node dashboard_bridge/index.js
```

### Command if dashboard/bridge/index.js fails to start when using Pixi

```bash
install_name_tool -add_rpath /Users/davide/USI/research/wizard-for-kids/.pixi/envs/default/lib node_modules/rclnodejs/build/Release/rclnodejs.node
```

## Terminal 3: Dashboard web app

```bash
npm run dev
```

## Terminal 4: CoppeliaSim RoboMaster EP ToF scene

```bash
pixi run coppelia
```

In CoppeliaSim, open:

```text
/Users/davide/USI/research/wizard-for-kids/robomaster_sim/scenes/playground_tof_ep.ttt
```

Then press play.

## Terminal 5: RoboMaster EP ToF ROS driver

### Simulated connection with RoboMaster EP ToF:

```bash
pixi run robomaster-ep-tof-sim
```

Equivalent manual command:

```bash
cd /Users/davide/USI/research/wizard-for-kids/rosbridge_ws
pixi shell
source install/setup.zsh
ros2 launch robomaster_ros ep_tof.launch name:=robomaster conn_type:=sta
```

### Real connection with RoboMaster EP ToF:

```bash
pixi run robomaster-ep-tof-physical
```

Equivalent manual command:

```bash
cd /Users/davide/USI/research/wizard-for-kids/rosbridge_ws
pixi shell
source install/setup.zsh
ros2 launch robomaster_ros ep_tof.launch name:=robomaster conn_type:=ap
```
