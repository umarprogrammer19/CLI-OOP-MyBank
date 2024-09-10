#! /usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
let balance = 0;
let transactionHistory = [];
let name = "";
let age = 0;
let gender = "";
function deposit(amount) {
    if (amount > 0) {
        balance += amount;
        transactionHistory.push(chalk.bold.yellow(`Deposited ${amount}`));
        console.log(chalk.bold.italic.green(`Deposited ${amount} successfully.`));
    }
    else {
        console.log(chalk.bold.italic.red('Invalid amount. Please enter a positive number.'));
    }
}
function withdraw(amount) {
    if (amount > 0 && amount <= balance) {
        balance -= amount;
        transactionHistory.push(chalk.bold.yellow(`Withdrawn ${amount}`));
        console.log(chalk.bold.italic.green(`Withdrawn ${amount} successfully.`));
    }
    else {
        console.log(chalk.bold.italic.red('Insufficient funds or invalid amount.'));
    }
}
function updateAccountInfo(newName, newAge, newGender) {
    name = newName;
    age = newAge;
    gender = newGender;
    console.log(chalk.bold.italic.green('Account information updated successfully.'));
}
function viewAccountInfo() {
    console.log(chalk.bold.italic.cyan(`Name: ${name}`));
    console.log(chalk.bold.italic.cyan(`Age: ${age}`));
    console.log(chalk.bold.italic.cyan(`Gender: ${gender}`));
    console.log(chalk.bold.italic.cyan(`Balance: ${balance}`));
}
function checkBalance() {
    console.log(chalk.bold.italic.green(`Your balance is: ${balance}`));
}
function getTransactionHistory() {
    console.log(chalk.bold.italic.green("Transaction History:"));
    transactionHistory.forEach(transaction => console.log(transaction));
}
async function startBankManagement() {
    console.log(chalk.bold.yellow.underline("\n\t\t\tWelcome to the Bank Management System!\n"));
    const { nameInput, ageInput, genderInput } = await inquirer.prompt([
        {
            type: 'input',
            name: 'nameInput',
            message: chalk.italic.bold.magenta('Enter your name:')
        },
        {
            type: 'number',
            name: 'ageInput',
            message: chalk.italic.bold.magenta('Enter your age:')
        },
        {
            type: 'list',
            name: 'genderInput',
            message: chalk.italic.bold.magenta('Select your gender:'),
            choices: ['Male', 'Female', 'Other']
        }
    ]);
    name = nameInput;
    age = ageInput;
    gender = genderInput;
    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: chalk.italic.bold.magenta('What would you like to do?'),
            choices: ['Deposit', 'Withdraw', 'Update Account Information', 'View Account Information', 'Check Balance', 'View Transaction History', 'Exit']
        });
        if (action === 'Deposit') {
            const { depositAmount } = await inquirer.prompt({
                type: 'number',
                name: 'depositAmount',
                message: chalk.italic.bold.magenta('Enter the amount to deposit:')
            });
            deposit(depositAmount);
        }
        else if (action === 'Withdraw') {
            const { withdrawAmount } = await inquirer.prompt({
                type: 'number',
                name: 'withdrawAmount',
                message: chalk.italic.bold.magenta('Enter the amount to withdraw:')
            });
            withdraw(withdrawAmount);
        }
        else if (action === 'Update Account Information') {
            const { newName, newAge, newGender } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'newName',
                    message: chalk.italic.bold.magenta('Enter your new name:')
                },
                {
                    type: 'number',
                    name: 'newAge',
                    message: chalk.italic.bold.magenta('Enter your new age:')
                },
                {
                    type: 'list',
                    name: 'newGender',
                    message: chalk.italic.bold.magenta('Select your new gender:'),
                    choices: ['Male', 'Female', 'Other']
                }
            ]);
            updateAccountInfo(newName, newAge, newGender);
        }
        else if (action === 'View Account Information') {
            viewAccountInfo();
        }
        else if (action === 'Check Balance') {
            checkBalance();
        }
        else if (action === 'View Transaction History') {
            getTransactionHistory();
        }
        else if (action === 'Exit') {
            console.log(chalk.bold.red.underline('\t\t\t\tGoodbye!'));
            return;
        }
    }
}
startBankManagement();
