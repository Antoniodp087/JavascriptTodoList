import { TodoItem } from "./todoItem";

type ItemCounts={ 
    total: number;
    incomplete: number;
}

export class TodoCollection{
    private nextId: number = 1;
    protected itemMap = new Map<number, TodoItem>(); 

    constructor(public userName: string, public todoItems: TodoItem[] =[]){
        todoItems.forEach(item => this.itemMap.set(item.id,item));
    };

/**Aggiunge una task */
    addTodo(task: string): number{
        while(this.getTodoById(this.nextId)){this.nextId++;}
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;   
    }

/**Ritorna l'id della task */
    getTodoById(id: number) : TodoItem{
        return this.itemMap.get(id);
    }

/**Ritorna la task */
    getTodoItems(includeComplete: boolean): TodoItem[] {
        return[...this.itemMap.values()]
        .filter(item =>includeComplete ||  !item.complete);
    }

/**Segna una task come completata */
    markComplete(id: number, complete: boolean){
        const todoItem = this.getTodoById(id);
        if(todoItem){
            todoItem.complete = complete;
        }
    }

/**Rimuove le task completate dalla lista */
    removeComplete(){
        this.itemMap.forEach(item =>{
            if (item.complete)
            this.itemMap.delete(item.id);
        })
    }

/**Indica quante task sono da completare */
    getItemCounts(): ItemCounts{
        return{
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }
    
}
