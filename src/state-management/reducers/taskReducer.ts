export interface Task {
  id: number;
  title: string;
}

interface AddTask {
  type: 'ADD_TASK';
  task: Task;
}

interface RemoveTask {
  type: 'REMOVE_TASK';
  taskId: number;
}

export type TaskAction = AddTask | RemoveTask;

const taskReducer = (state: Task[], action: TaskAction): Task[] => {
  switch (action.type) {
    case 'ADD_TASK':
      return [action.task, ...state];
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.taskId);
    default:
      return state;
  }
}

export default taskReducer;