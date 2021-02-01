// interface for board
// Board represents board of tasks in front-end app
export interface Board {
  // question mark means optional property
  id?: string;
  title?: string;
  // priority is a sort number
  priority?: number;
  // tasks has own separate interface
  tasks?: Task[];
}

export interface Task {
  description?: string;
  // label declare a color of task bg
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}