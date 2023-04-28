import React from "react";

import TaskList from "./TaskList";
import * as TaskStories from "./Task.stories";

export default {
    component: TaskList,
    title: "TaskList",
    decorators: [story => <div style={{ padding: "3rem" }}>{story()}</div>],
};
// Decorators are a way to provide arbitrary wrappers to stories. In this case we’re using a decorator key on the default export to add some padding around the rendered component. They can also be used to wrap stories in “providers”-–i.e., library components that set React context. 

const Template = args => <TaskList {...args} />;

export const Default = Template.bind({});
Default.args = {
    // shaping the stories through composition
    // the data was inherited from the Default story in Task.stories.js
    tasks: [
        { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
        { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
        { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
        { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
        { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
        { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
    ],
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
    // shape the stories through args composition
    //inherited data coming from the Default story
    tasks: [
        ...Default.args.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" },
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    tasks: [],
    loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
    // shaping the stories through arg composition
    // inherited data coming from the Loading story
    ...Loading.args,
    loading: false,
};
