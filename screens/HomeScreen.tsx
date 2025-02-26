import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTodo } from '../context/TodoContext';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const HomeScreen = ({ navigation }: any) => {
  const { state, dispatch } = useTodo();

  const renderRightActions = (taskId: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          dispatch({ type: 'DELETE_TASK', payload: taskId });
        }}
      >
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    const category = state.categories.find((cat) => cat.id === item.category);

    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <TouchableOpacity
          style={[styles.taskItem, { borderLeftColor: category?.color }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            dispatch({ type: 'TOGGLE_TASK', payload: item.id });
          }}
        >
          <View style={styles.taskContent}>
            <View style={styles.taskMain}>
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.taskCompleted,
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.taskCategory}>{category?.name}</Text>
            </View>
            <Text style={styles.taskDate}>
              {format(new Date(item.dueDate), 'MMM d, yyyy')}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={state.tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.fab, styles.categoryFab]}
          onPress={() => navigation.navigate('Categories')}
        >
          <Ionicons name="list" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  list: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskMain: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2C3E50',
    marginBottom: 4,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  taskCategory: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  taskDate: {
    fontSize: 14,
    color: '#7f8c8d',
    marginLeft: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'row',
  },
  fab: {
    backgroundColor: '#3498DB',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryFab: {
    backgroundColor: '#2C3E50',
    marginRight: 16,
  },
  deleteAction: {
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    marginVertical: 8,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});

export default HomeScreen;