// requiring all librarires
import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";

// importing all files
import {
  addTaskHandler,
  deleteTask,
  fetchTodo,
  updateTask,
} from "../../api/index.js";
import AddTask from "../addTask/AddTask";
import Spinner from "../spinner/Spinner";
import ShowTask from "../showTask/ShowTask";
import Classes from "./TodoContainer.module.css";
import "react-notifications-component/dist/theme.css";

// creating a functional Component as a Todo container
const TodoContainer = () => {
  // setting up loading state
  const [isLoading, setisLoading] = useState(true);
  // setting up todo state
  const [Todo, setTodo] = useState([]);
  // setting up editing state
  const [isEdit, setisEdit] = useState({
    edit: false,
    task: {},
  });
  // setting up the userId
  const userId = 1;
  // making a notification variable for react notifications
  const notifications = {
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  };
  // adding a functionality of competing a task
  async function completed(task) {
    const index = Todo.findIndex((elm) => {
      return elm.id === task.id;
    });
    setTodo((prev) => {
      prev[index].completed = true;
      return [...prev];
    });
    // setting up notification
    Store.addNotification({
      title: "Congratulations",
      message: "Task Completed Succesfully",
      type: "success",
      ...notifications,
    });
  }
  // setting up function for updating the task
  async function updateHandler(task, requested) {
    if (requested) {
      setisEdit({
        edit: true,
        task,
      });
      return;
    }
    Store.addNotification({
      title: "In Progress",
      message: "updating data",
      type: "info",
      ...notifications,
    });
    const data = await updateTask(task);
    if (data.success) {
      Store.addNotification({
        title: "Hurry",
        message: "Task updated succesfully",
        type: "success",
        ...notifications,
      });
    } else {
      Store.addNotification({
        title: "Oh God!",
        message: data.message,
        type: "error",
        ...notifications,
      });
    }
    setisEdit({
      edit: false,
      task: {},
    });
  }
  // setting up functions for deleting a particular task
  async function deleteHandler(id) {
    Store.addNotification({
      title: "In Progress",
      message: "Deleting Data",
      type: "info",
      ...notifications,
    });
    const result = await deleteTask(id);
    if (result.success) {
      const todo = Todo.filter((data) => {
        return data.id !== id;
      });
      setTodo(todo);
      Store.addNotification({
        title: "Hurry",
        message: "Task deleted succesfully",
        type: "success",
        ...notifications,
      });
    } else {
      Store.addNotification({
        title: "Sorry",
        message: result.message,
        type: "error",
        ...notifications,
      });
    }
  }
  //adding functionalty for adding a new todo task
  async function addData(title) {
    Store.addNotification({
      title: "In Progress",
      message: "Adding Data",
      type: "info",
      ...notifications,
    });
    const data = await addTaskHandler(title, userId);
    if (data.success) {
      Store.addNotification({
        title: "Hurry",
        message: "Task added succesfully",
        type: "success",
        ...notifications,
      });
      setTodo([data.data, ...Todo]);
    } else {
      Store.addNotification({
        title: "Sorry",
        message: data.message,
        type: "error",
        ...notifications,
      });
    }
  }
  // using a useEffect hook for fecthing and getting all the todo after the component renders
  useEffect(() => {
    async function post() {
      Store.addNotification({
        title: "In Progress",
        message: "fetching Data",
        type: "info",
        ...notifications,
      });
      const data = await fetchTodo();
      if (data.success) {
        setisLoading(false);
        setTodo(data.data);
      } else {
        setisLoading(false);
        Store.addNotification({
          title: "Sorry",
          message: data.message,
          type: "error",
          ...notifications,
        });
      }
    }
    post();
  }, []);

  return (
    // container for todo app
    <div className={Classes.container}>
      {/* heading */}
      <h1>TODO APP</h1>
      {/* component for adding a task */}
      <AddTask
        addtask={addData}
        isEdit={isEdit}
        updateHandler={updateHandler}
      />
      {/* component for rendering the tasks */}
      {isLoading ? (
        <Spinner />
      ) : (
        <ShowTask
          todo={Todo}
          delete={deleteHandler}
          completed={completed}
          updateHandler={updateHandler}
        />
      )}
    </div>
  );
};

// exporting the component by default
export default TodoContainer;
