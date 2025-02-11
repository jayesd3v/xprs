import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const envFolderPath = path.join(__dirname, '../../env'); // Path to the env folder
const rootEnvFilePath = path.join(__dirname, '../../.env'); // Path to the root .env file

// Function to list all files in the env folder
function getEnvFiles() {
    return fs
        .readdirSync(envFolderPath)
        .filter((file) => file.endsWith('.properties'));
}

// Function to write the selected file content to the root .env file
function writeToEnvFile(selectedFile) {
    const selectedFilePath = path.join(envFolderPath, selectedFile);
    const fileContent = fs.readFileSync(selectedFilePath, 'utf8');
    fs.writeFileSync(rootEnvFilePath, fileContent);
    console.log(`✅ Successfully switched to ${selectedFile}`);
}

// Main function to run the CLI
async function switchEnv() {
    const envFiles = getEnvFiles();

    if (envFiles.length === 0) {
        console.log('No .env files found in the env folder.');
        return;
    }

    const { selectedFile } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selectedFile',
            message: 'Select an environment file to switch to:',
            choices: envFiles,
        },
    ]);

    writeToEnvFile(selectedFile);
}

// Run the script
switchEnv().catch((err) => {
    console.error('❌ Error:', err);
});
