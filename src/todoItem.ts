/**     Class TodoItem contenete dati relativi alla Todo List */
export class    TodoItem {
    constructor(public id: number,
                public task: string,
                public complete: boolean = false){}


    /** metodo che stampa a log di console un sommario degli elementi della TodoList*/
    public printDetails() : void{
               console.log(this.complete?(this.id+'\t'+this.task+"\t(completata)"):this.id+'\t'+this.task+'');
    }
    }