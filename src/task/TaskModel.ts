import {action, computed, observable} from "mobx";
export class TaskModel {
    id = TaskModel.nextId();
    @observable text: string = "";
    @observable done: boolean = false;


    @computed get isValid(): boolean {
        // a text is required
        return this.text !== ''
    }

    @action
    setDone(done: boolean) {
        this.done = done;
    }

    @action
    setText(text: string) {
        this.text = text;
    }

    // this two methods will toJson and fromJson the todo
    // to keep the example clean I have done them, but you should consider using
    // https://github.com/mobxjs/serializr
    toJson() : object {
        return {
            id: this.id,
            text: this.text,
            done: this.done
        }
    }

    static fromJson(json: Object) {
        const todo = new TaskModel();
        todo.id = json['id'] || TaskModel.nextId();
        todo.text = json['text'] || '';
        todo.done = json['done'] || false;
        return todo
    }

    static _nextId =0;
    private static nextId(): number {
        TaskModel._nextId++;
        return TaskModel._nextId
    }
}
