# Newspaper Question Answering (NQA) Frontend

## Description

Frontend for NQA

## Prerequisites

Before you begin, ensure you have met the following requirements:

- node v20.10.0
- npm v10.2.3 installed on your machine.
- yarn v1.22.22 installed to manage dependencies.

## Installation

### Step 1: Install Node.js and npm

1. **Download Node.js and npm**: Visit the official [Node.js website](https://nodejs.org/) and download the below versions

   - **node v20.10.0**
   - **npm v10.2.3**
   - also specified in the `package.json` file suitable for your operating system.

2. **Install node.js and npm**: Run the installer and follow the on-screen instructions.

3. **Verify Installation**: Open a terminal or command prompt and run the following commands to verify the installation:

   ```sh
   node --version
   #output v20.10.0
   npm --version
   #output 10.2.3
   ```

   You should see outputs indicating the versions of Node.js and npm installed, matching the versions specified in the `package.json` file.

### Step 2: Install yarn v1.22.22 using npm

1. **Open a terminal or command prompt**.

2. **Run the following command** to install Yarn globally using npm:

   ```sh
   npm install -g yarn@1.22.22
   ```

   This command will install Yarn globally on your system.

3. **Verify Installation**: Run the following command to verify that Yarn is installed:

   ```sh
   yarn --version
   #output 1.22.22
   ```

   You should see an output indicating the version of Yarn installed.

### Step 3: Install Project Dependencies

1. **Clone the repository**: If you haven't already, clone the repository to your local machine:

   ```sh
   git clone "this repository link"
   ```

2. **Navigate to the project directory**:

   ```sh
   cd src_nqa_frontend
   ```

3. **Install project dependencies** using yarn:

   ```sh
   yarn install
   ```

### Step 4: Install react-app-rewired

1. **Install react-app-rewired**:

   ```sh
   yarn add react-app-rewired
   ```

### Step 5: Start the frontend server

1. **Run this command to start the frontend**
   ```sh
   yarn start
   ```
