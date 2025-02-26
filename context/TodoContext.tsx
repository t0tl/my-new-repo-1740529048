import React, { createContext, useContext, useReducer } from 'react';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  dueDate: string;
  completed: boolean;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface TodoState {
  tasks: Task[];
  categories: Category[];
}

type TodoAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string };

const initialCategories: Category[] = [
  { id: '1', name: 'Personal', color: '#3498DB' },
  { id: '2', name: 'Work', color: '#E74C3C' },
  { id: '3', name: 'Shopping', color: '#2ECC71' },
];

const initialState: TodoState = {
  tasks: [],
  categories: initialCategories,
};

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
}>({ state: initialState, dispatch: () => null });

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);