//creazione del file package.json che tiene traccia dei package necessari per il progetto
npm init --yes

//installazione dei package aggiuntivi necessari
npm install inquirer@6.3.1

npm install lowdb@1.0.0

//compilazione dei file .ts
tsc

clear

//avvio della todolist
node dist/index.js