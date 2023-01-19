[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Windows](https://img.shields.io/badge/platform-windows-lightgrey)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/en/download/)

# computer-key-to-midi
This project is a software that converts computer key inputs into MIDI inputs.  
The software runs on node.js.

## Installation
To use this project, you will need to have Node.js and npm installed on your machine.  
Once you have those installed, you can clone the repository and install the dependencies by running:
```
git clone https://github.com/David-Vandensteen/computer-key-to-midi.git
cd computer-key-to-midi
npm install
```

## Usage
The software can run in two modes, master and slave.  
The master mode is used to send MIDI data to a device, while the slave mode is used to receive MIDI data.

### Master mode
To run the software in master mode, you will need to specify the host and port of the slave device, as well as the name of the MIDI output device you want to use.  
You can use the command 
```npm
npm run master -- -i <input interface> -o <output interface> -h <host> -p <port>
```

### Slave mode
To run the software in slave mode, you will need to specify the host and port of the master device.  
You can use the command 
```
npm run slave -- -h <host> -p <port>
```
You can also specify a configuration file with --config <config_file>

### List MIDI devices
You can list all available MIDI inputs and outputs with the command 
```
npm run start -- --list
```

### Configuration
The software can be configured through a YAML file.  
The default configuration file is located in src/model/mcc-1/config/default-fr.yaml but you can specify your own with the --config option.  

## License
This project is licensed under the MIT License.
