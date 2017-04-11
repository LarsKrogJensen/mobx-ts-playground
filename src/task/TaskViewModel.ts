import {action, computed, observable} from "mobx";
import {TaskModel} from "./TaskModel";
export class TaskViewModel {
    @observable
    tasks: Array<TaskModel> = []

    constructor() {
        this.load()
        this.remove = this.remove.bind(this)
    }

    @action
    load() {
        // if the browser has support for localStorage, try to retrieve the saved todos
        if (window.localStorage) {
            const json = JSON.parse(window.localStorage.getItem("tasks") || "[]")
            this.tasks = json.map(task => TaskModel.fromJson(task))
        }
    }

    @action
    save() {
        // are there invalid tasks?
        if (this.tasks.filter(tasks => tasks.isValid === false).length > 0) {
            alert("Unable to save: There are invalid Todos.")
        }

        if (window.localStorage) {
            window.localStorage.setItem(
                "tasks",
                JSON.stringify(
                    this.tasks.map(task => task.toJson())
                )
            )
        }
    }

    @action
    add(): TaskModel {
        let model = new TaskModel()
        this.tasks.push(model)
        return model
    }

    @action
    remove(task: TaskModel) {
        let indexOf = this.tasks.indexOf(task);
        if (indexOf > -1)
            this.tasks.splice(indexOf, 1)
    }

    @computed get activeTodoCount() :number {
        return this.tasks.reduce(
            (sum, todo) => sum + (todo.done ? 0 : 1),
            0
        )
    }

    @computed get completedCount() : number {
        return this.tasks.length - this.activeTodoCount;
    }
}