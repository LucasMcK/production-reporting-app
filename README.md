# Production Reporting Web Application

## Description
A centralized production reporting platform for Avalon Oil & Gas Ltd. This application empowers both field workers and executives to securely upload and download production spreadsheets—even in offline environments. It also generates concise summaries of each report to support informed decision-making.
## Features
Currently, this application allows users to:

* Securely view all production spreadsheet files stored in the database.
* Download any stored file easily for offline access.
* Upload new production reports from the field or office.
## Demo / Screenshots

## Installation

### Prerequisites
Before using this project, you’ll need a code editor. I recommend Visual Studio Code (VSCode) because it’s beginner-friendly, free, works across all major operating systems, and includes a built-in terminal. This tutorial assumes you’re using VSCode. To install VSCode:

1. Go to the [Visual Studio Code website](https://code.visualstudio.com/).
2. Download the installer for your operating system.
3. Run the installer and follow the on-screen instructions.

   > **Note:** You can choose where to install VSCode or any other application downloaded in this tutorial, but the default locations work just fine.

4. Once installed, open VSCode — you'll use it to view and edit this project’s files.

In addition to VSCode, this project requires Node.js and npm (Node Package Manager). These tools allow you to run and manage the application. To download and install Node.JS and npm:

1. Go to their [official website](https://nodejs.org).
2. Download the packages for your operating system.
3. Run the installer and follow the on-screen instructions.
4. Finish the setup by clicking **install**.
5. If you already have VSCode open, close and reopen it so it can recognize the new commands.

This tutorial uses GitHub Desktop to clone the project repository. I recommend it because the command line can be intimidating for beginners — it has no visual interface, requires precise syntax, and assumes prior knowledge of Git commands. To download Github Desktop:

1. Go to the [GitHub Desktop website](https://github.com/apps/desktop).
2. Download the installer for your operating system.
3. Run the installer and follow the on-screen instructions.
4. After installation, open GitHub Desktop.
5. Sign in to your GitHub account when prompted. If you don’t have an account yet, you can create one [here](https://github.com/signup).

### Steps
Once you’ve installed all of the prerequisites, follow these steps to get the project running on your computer.

1. Clone the repository  
   I. Go to the [repository page](https://github.com/LucasMcK/production-reporting-app).  
   II. Click the green **Code** button.  
   III. Under the local tab, select **Open with Github Desktop**.  
   IV. Choose the folder where you want the project saved on your computer, then click **Clone**. Cloning the repository to the default location works just fine.

2. Open the repository in VSCode  
   I. After the repository is cloned, click “Open in Visual Studio Code” from GitHub Desktop.  
   II. When prompted, click “Yes, I trust the authors” to allow VSCode to run the project.

3. Run the backend  
   I. In the VSCode terminal, navigate to the backend folder using `cd backend`.  
   II. Verify that Node.js is installed by entering `node -v`. If installed properly, this command will return a version number like `v21.6.2`.  
   III. Start the backend server using `node index.js`.  
   IV. After running this command, you should see `Backend running on http://localhost:5001` in the terminal.

4. Run the frontend  
   I. While the backend is still running, split the terminal so you can run the frontend in parallel. There are three ways to do this:  
      - Option 1: Click 'Terminal' in the top menu, and select 'Split terminal'.  
      - Option 2: Use the keyboard shortcut `Ctrl + Shift + 5` while in the terminal.  
      - Option 3: Click the 'split terminal' icon in the top right corner of the terminal panel *(left of the trash can icon — it looks like two squares side-by-side)*.  
   II. In the new terminal pane, navigate to the frontend folder:  
      - Option 1: If you're still in the backend folder *(which you most likely are)*, first return to the root folder using `cd ..`, then navigate into the frontend folder using `cd frontend`.  
      - Option 2: If you are already in the root folder *(unlikely)*, navigate to frontend folder using `cd frontend`.  
   III. Install the frontend dependencies using `npm install`. This command will take some time to execute.  
   IV. Once all necessary dependencies have been installed, start the frontend using `npm start`.  
   V. After a few moments, you should see the message `Starting the development server...`, followed by the app opening automatically in your web browser at `https://localhost:3000`.  

   > **Note:** The launch may take a minute or two, especially if it's your first time running the project.

## Usage

## Configuration

## API Endpoints

## Technologies Used

## Project Structure

## Contributing

## Testing

## Known Issues / Limitations

## Future Improvements

## License
This project is licensed under the [MIT License](./LICENSE).
## Contact / Author