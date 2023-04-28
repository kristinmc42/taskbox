import React from "react";
import PropTypes from "prop-types";

import Task from "./Task";

import { useDispatch, useSelector } from "react-redux";
import { updateTaskState } from "../lib/store";

export default function TaskList() {
  const tasks = useSelector((state) => {
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === "TASK_PINNED"),
      ...state.taskbox.tasks.filter((t) => t.state !== "TASK_PINNED"),
    ];
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === "TASK_INBOX" || t.state === "TASK_PINNED"
    );
    return filteredTasks;
  });
  const { status } = useSelector((state) => state.taskbox);

  const dispatch = useDispatch();

  const pinTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_PINNED" }));
  };
  const archiveTask = (value) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: "TASK_ARCHIVED" }));
  };
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (status === "loading") {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onPinTask={(task) => pinTask(task)}
          onArchiveTask={(task) => archiveTask(task)}
        />
      ))}
    </div>
  );
}

// export default function TaskList({ loading, tasks, onPinTask, onArchiveTask }) {
//     const events = {
//         onPinTask,
//         onArchiveTask,
//     };

//     const LoadingRow = (
//         <div className="loading-item">
//             <span className="glow-checkbox" />
//             <span className="glow-text">
//                 <span>Loading</span> <span>cool</span> <span>state</span>
//             </span>
//         </div>
//     )

//     if (loading) {
//         return <div className="list-items" data-testid="loading" key={"loading"}>
//             {LoadingRow}
//             {LoadingRow}
//             {LoadingRow}
//             {LoadingRow}
//             {LoadingRow}
//             {LoadingRow}
//         </div>
//     };

//     if (tasks.length === 0) {
//         return (
//             <div className="list-items" key={"empty"} data-testid="empty">
//                 <div className="wrapper-message">
//                     <span className="icon-check" />
//                     <p className="title-message">You have no tasks</p>
//                     <p className="subtitle-message">Sit back and relax</p>
//                 </div>
//             </div>
//         );
//     };

//     const tasksInOrder = [
//         ...tasks.filter((t) => t.state === "TASK_PINNED"),
//         ...tasks.filter((t) => t.state !== "TASK_PINNED"),
//     ];

//     return (
//         <div className="list-items">
//             {tasksInOrder.map(task => (
//                 <Task key={task.id} task={task} {...events} />
//             ))}
//         </div>
//     );
// }

// TaskList.propTypes = {
//     // checks if it is in a loading state
//     loading: PropTypes.bool,
//     // list of tasks
//     tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
//     // event to change task to pinned
//     onPinTask: PropTypes.func,
//     // event to change task to archived
//     onArchiveTask: PropTypes.func,
// };
// TaskList.defaultProps = {
//     loading: false,
// };
