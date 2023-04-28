import React from "react";
import PropTypes from "prop-types";

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
    return (
        <div className={`list-item ${state}`}>
            <label
                htmlFor="checked"
                aria-label={`archiveTask-${id}`}
                className="checkbox"
            >
                <input
                    type="checkbox"
                    disabled={true}
                    name="checked"
                    id={`archiveTask-${id}`}
                    checked={state === "TASK_ARCHIVED"}
                />
                <span
                    className="checkbox-custom"
                    onClick={() => onArchiveTask(id)}
                />
            </label>

            <label htmlFor="title" aria-label={title} className="title">
                <input
                    type="text"
                    value={title}
                    readOnly={true}
                    name="title"
                    placeholder="Input title"
                />
            </label>

            {state !== "TASK_ARCHIVED" && (
                <button
                    className="pin-button"
                    onClick={() => onPinTask(id)}
                    id={`pinTask-${id}`}
                    aria-label={`pinTask-${id}`}
                    key={`pinTask-${id}`}
                >
                    <span className={`icon-star`} />
                </button>
            )}
        </div>
    );
};

Task.propTypes = {
    // composition of the task
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
    }),
    // event to change the task to Archived
    onArchiveTask: PropTypes.func,
    // eent to change the task to pinned
    onPinTask: PropTypes.func,
};
// a warning will appear in the console in development if the Task component is misused
// alternatively, use Typescript to create a type for component properties


