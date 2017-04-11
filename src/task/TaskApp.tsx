import * as React from "react";
import * as ReactDOM from 'react-dom';
import {inject, observer} from "mobx-react";
import {STORE_TASK} from "../app/constants/stores";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Paper} from "material-ui";
import {TaskViewModel} from "./TaskViewModel";
import {TaskModel} from "./TaskModel";


const buttonStyle = {
    margin: 12,
};

export interface TaskAppProps {

    /** MobX Stores will be injected via @inject() **/
    // [STORE_TASK]: TaskViewModel;

}
export interface TaskAppState {

}


@inject(STORE_TASK)
@observer
export class TaskApp extends React.Component<TaskAppProps, TaskAppState> {
    
    constructor(props: TaskAppProps, context: any) {
        super(props, context);
    }

    render() {
        const viewModel : TaskViewModel = this.props[STORE_TASK]

        // just some HTML markup based of the ViewModel data.
        return <MuiThemeProvider>
            <div>
                <h1>React MobX Todo List!</h1>
                <div>
                    <RaisedButton onClick={() => viewModel.add()} primary={true} style={buttonStyle} label="New"/>
                    <RaisedButton onClick={() => viewModel.load()} secondary={true} style={buttonStyle} label="Load"/>
                    <RaisedButton onClick={() => viewModel.save()} style={buttonStyle} label="Save"/>
                </div>

                <Table>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Done?</TableHeaderColumn>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {viewModel.tasks.map((todo, i) => <TaskItem key={todo.id.toString()} model={todo} deleteAction={viewModel.remove}/>)}
                    </TableBody>
                </Table>
                <TaskFooter viewModel={viewModel}/>
            </div>
        </MuiThemeProvider>
    }
}


export interface TaskItemProps {
    model : TaskModel;
    deleteAction : (TaskModel) => void
}

@observer
export class TaskItem extends React.Component<TaskItemProps, {}> {

    render() {
        const model:TaskModel = this.props.model;
        const deleteAction = this.props.deleteAction;

        return <TableRow striped={model.done} displayBorder={false}>
            <TableRowColumn>
                <Checkbox checked={model.done} onCheck={e => {
                    model.setDone(e.target.checked)
                }}/>
            </TableRowColumn>
            <TableRowColumn>
                #{model.id}
            </TableRowColumn>
            <TableRowColumn>
                <TextField name="text" type="text" value={model.text} onChange={e => {
                    model.setText(e.target.value);
                }} fullWidth={true}/>
            </TableRowColumn>
            <TableRowColumn>
                <RaisedButton onClick={() => deleteAction(model)} label="DeleteX"/>
            </TableRowColumn>
        </TableRow>
    }
}

export interface TaskFooterProps {
    viewModel: TaskViewModel
}

@observer
export class TaskFooter extends React.Component<TaskFooterProps, {}> {
    render() {
        const viewModel = this.props.viewModel;
        return (
            <Paper zDepth={1}>
                <footer style={{padding:8}}> Completed {viewModel.completedCount} Active {viewModel.activeTodoCount}</footer>
            </Paper>

        )
    }
}