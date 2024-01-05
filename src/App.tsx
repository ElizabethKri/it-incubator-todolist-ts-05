import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type todolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    // let[todolist, setTodolist] = useState<Array<todolistType>>([
    //     {id: v1(), title: 'What to learn', filter: 'all'},
    //     {id: v1(), title: 'What to buy', filter:  'all'}
    // ])

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistType>>([
        {id: todolistID1, title: 'What to learn', filter: "all"},
        {id: todolistID2, title: 'JS', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
            [todolistID1]:
            [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
        [todolistID2]:
            [
                {id: v1(), title: "HTML&CSS2", isDone: true},
                {id: v1(), title: "JS2", isDone: true},
                {id: v1(), title: "ReactJS2", isDone: false},
                {id: v1(), title: "Rest API2", isDone: false},
                {id: v1(), title: "GraphQL2", isDone: false},
            ],

    });
    //let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(todolistId: string,taskId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistId: string,title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistId: string,taskId: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);

        setTasks({...tasks, [todolistId] : tasks[todolistId].map(el => el.id === taskId ? {...el, isDone} : el)})
    }



    function changeFilter(todolistId: string, value: FilterValuesType) {
        // setFilter(value);
        // const currentTodolist = todolist.find(el => el.id === todolistId)
        // if(currentTodolist){
        //     currentTodolist.filter = value
        //     setTodolist([...todolist])
        // }
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(el=> el.id !== todolistId))
        //удаляет то ду листы
        delete tasks[todolistId]
        //удаляет таски
    }

    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];
                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (<Todolist
                    key = {el.id}
                    todolistID={el.id}
                    title={el.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={el.filter}
                    removeTodolist = {removeTodolist }
                />)
            })}
        </div>
    );
}

export default App;
