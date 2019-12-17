import React, {useState, useEffect} from 'react';
import {AddList, Tasks, List} from './components';
import {BrowserRouter, Route, useHistory} from "react-router-dom";
import {appAPI, listsAPI, tasksAPI} from "./api";

import listIcon from "./assets/img/list.svg";

const App = () => {
    const [lists, setLists] = useState(null);
    const [colors, setColors] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    let history = useHistory();

    useEffect(() => {
        listsAPI.getLists().then((data) => {
            setLists(data)
        });

        appAPI.getColors().then((data) => {
            setColors(data);
        });
    }, []);

    useEffect(()=> {
        const listId = +history.location.pathname.split('lists/')[1];
        if(lists){
            const list = lists.find(list => list.id === listId);
            setActiveItem(list)
        }
    }, [lists, history.location.pathname]);

    const removeItem = (itemId) => {
        const newList = lists.filter(i => i.id !== itemId);

        setLists(newList);
        listsAPI.deleteList(itemId);
    };

    const addListItem = (newItem) => {
        setLists([...lists, {...newItem, tasks:[]}]);
    };

    const onEditListTitle = (list) => {

        const newTitle = window.prompt('Название списка ', list.name);
        if (newTitle) {

            const newLists = lists.map(l=>{
                if(l.id === list.id){
                    l.name = newTitle;
                }
                return l;
            });

            setLists(newLists);

            listsAPI.updateList(list.id, {name: newTitle});
        }

    };

    const onRemoveTask = task => {

        if (window.confirm("Вы действительно хотите удалить задачу?")) {

            const newList = lists.map(i => {
                if(i.id === task.listId){
                    i.tasks = i.tasks.filter(t => t.id !== task.id);
                }

                return i;
            } );

            setLists(newList);

            tasksAPI.deleteTask(task.id);
        }
    };

    const onAddTaskToList = (task) =>{

        const newLists = lists.map(item => {

            if(item.id === task.listId){
                item.tasks = [...item.tasks, task];
            }

            return item
        });
       setLists(newLists);
    };

    const onEditTask = (task) =>{
        const newText = window.prompt('Изменить название задачи: ', task.text);
        if (newText && newText !== task.text) {
            const newLists = lists.map(l=>{
                if(l.id === task.listId){
                    l.tasks = l.tasks.map(t => {
                        if(t.id === task.id){
                            t.text = newText;
                        }

                        return t;
                    })
                }
                return l;
            });

            setLists(newLists);

            tasksAPI.updateTask(task.id, {text: newText});
        }
    };

    const onCompletedTask = task => {

        const newCompletedValue = !task.completed;

        const newLists = lists.map(l => {
            if (l.id === task.listId) {
                l.tasks = l.tasks.map(t => {
                    if (t.id === task.id) {
                        t.completed = newCompletedValue
                    }
                    return t;
                })
            }
            return l;
        });

        setLists(newLists);

        tasksAPI.updateTask(task.id, {completed: newCompletedValue});
    };

    return (
        <div className="todo">
            <div className="todo__sidebar">
                <List items={[{ active: history.location.pathname === '/', icon: listIcon,name: "Все задачи"}]}
                      onClickItem={() => {history.push(`/`)}} />

                {lists ?
                    <List onClickItem={(item) => {history.push(`/lists/${item.id}`);}}
                          activeItem={activeItem}
                          removeItem={removeItem}
                          items={lists}
                          isRemovable/>
                      : 'Waiting...'}

                <AddList addListItem={addListItem} colors={colors}/>
            </div>
            <div className="todo__tasks">

                <Route exact path={"/"}>
                    {
                        lists && lists.map(list => (
                            <Tasks key={list.id}
                                   onCompletedTask={onCompletedTask}
                                   removeTask={onRemoveTask}
                                   onEditTask={onEditTask}
                                   onEditTitle={onEditListTitle}
                                   addTask={onAddTaskToList}
                                   activeList={list}
                                   withoutEmpty={true}/>
                        ))
                    }
                </Route>
                <Route path={"/lists/:id"}>
                    { activeItem && <Tasks onCompletedTask={onCompletedTask}
                                           removeTask={onRemoveTask}
                                           onEditTask={onEditTask}
                                           onEditTitle={onEditListTitle}
                                           addTask={onAddTaskToList}
                                           activeList={activeItem}/> }
                </Route>
            </div>
        </div>
    );
};

const AppWithRouter = () => (<BrowserRouter><App/></BrowserRouter>);

export default AppWithRouter;
