import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
//import del package inquirer
import * as inquirer from 'inquirer';
//import persistent collection
import { JsonTodoCollection } from "./jsonTodoCollection";

let todos: TodoItem[];
let showCompleted = true;

let collection: TodoCollection = new JsonTodoCollection("Antonio", todos);


function displayTodoList(): void {
    console.log(collection.userName + "'s Todo List " + collection.getItemCounts().incomplete + " task da completare");
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());

}

//lista dei comandi
enum Commands { 
    Add = "Aggiungi una nuova Task",
    Complete = "Segna Task come completata",
    Toggle = "Mostra/Nascondi Task completate", 
    Purge = "Rimuovi Task completate",
    Quit = "Quit"
 }

function promptAdd(): void{
    console.clear();
    inquirer.prompt({
        type: "input",
        name: "add",
        message: "Aggiungi task \n"
    }).then(answers => {
        if (answers["add"] != "")collection.addTodo(answers["add"]);
        promptUser();
    })
}

function promptComplete(): void{
    console.clear();
    inquirer.prompt({
        type: "checkbox",
        name: "complete",
        message: "Marca task come completata",
        choices: collection.getTodoItems(showCompleted).map(item =>({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    }).then(answers =>{
        let completedTasks = answers["complete"] as number[];
        collection.getTodoItems(true).forEach( item => 
            collection.markComplete(item.id,completedTasks.find(id => id === item.id) != undefined));
            promptUser();
    })
}

//funzione per il cursore
function promptUser(): void {
    console.clear();
    displayTodoList();
    inquirer.prompt({
        type: "list",
        name: "command",
        message: "Seleziona un opzione",
        choices: Object.values(Commands),
        //badPropety: true
    }).then(answers => {
         switch (answers["command"]){
            case Commands.Toggle:
                showCompleted = !showCompleted;
            promptUser(); 
            break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                if(collection.getItemCounts().incomplete > 0)
                promptComplete();
                else
                promptUser();
                break;
                case Commands.Purge:
                    collection.removeComplete();
                    promptUser();
                    break;
         } 
        })
}

console.clear();
console.log("Todo List\n");
promptUser();

