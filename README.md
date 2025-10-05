# 🦈 SharkTracker: Sharks Tracking and Prediction System

This project implements a comprehensive system to track the real-time location of sharks and predict their future movements using an Artificial Intelligence (AI) model. The solution is divided into *frontend* (user interface) and *backend* (system logic and AI) components that communicate with each other.

## 🚀 Key Features

* **Real-Time Tracking:** Interactive map visualization (React/Leaflet) of the sharks' current location.
* **AI Prediction:** Utilizes a *Machine Learning* model to estimate the future trajectory of the sharks.
* **Distributed Architecture:** The project is split into multiple repositories for modular management of the client, system logic, and the AI model.

## 🏗️ Project Architecture

The system consists of three main repositories:

| Component | Description | Repository |
| :--- | :--- | :--- |
| **Frontend (Client)** | User interface built with **React** and **Leaflet** to display the map and the tracking/prediction visualizations. | `https://github.com/RaulBecerraB/sharks-challenge-client` |
| **Main Backend** | Server that manages the communication between the client, the database, and the AI model. | `https://github.com/RaulBecerraB/sharks_AI` |
| **AI Model** | Contains the code, data, and logic for training and executing the movement prediction model. (Based on the original work from the NASA-Space challenge). | `https://github.com/DanielEspinosaChim/NASA-Space` |

## 🛠️ Installation and Execution

To run the complete system, you need to clone and configure all three repositories. Follow the specific `Installation` and `Execution` instructions in each project's README.

**Note:** It is crucial that the **Main Backend** (`sharks_AI`) is configured to interact correctly with both the **Frontend** (`sharks-challenge-client`) and to consume or communicate with the **AI Model** (`NASA-Space`).