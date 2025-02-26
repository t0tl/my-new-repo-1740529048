import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import TodoItem from './TodoItem';
import { Todo } from '../contexts/TodoContext';

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos }: TodoListProps) {
  return (
    <View style={styles.container}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
});