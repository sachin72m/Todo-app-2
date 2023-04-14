// importing React from react
import React from "react";

// importing css files
import Class from "./ShowTask.module.css";

// creating a component for creating all the task
const ShowTask = (props) => {
  return (
    <div className={Class.taskBox}>
      {/* mapping over all the post and rendering all the data */}
      {props.todo.map((post) => {
        return (
          <div key={post.id} className={Class.task}>
            <h2>{post.title}</h2>
            <div className={Class.icons}>
              <ion-icon
                onClick={() => {
                  props.updateHandler(post, true);
                }}
                name="create-outline"
              ></ion-icon>
              <ion-icon
                onClick={() => {
                  props.delete(post.id);
                }}
                name="trash-outline"
              ></ion-icon>
              <ion-icon
                onClick={() => {
                  props.completed(post);
                }}
                name={
                  post.completed
                    ? "checkmark-done-circle"
                    : "checkmark-done-circle-outline"
                }
              ></ion-icon>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// exporting the ShowTask component by default
export default ShowTask;
