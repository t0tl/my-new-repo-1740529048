import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useTodo } from '../context/TodoContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const COLORS = [
  '#3498DB',
  '#E74C3C',
  '#2ECC71',
  '#F1C40F',
  '#9B59B6',
  '#1ABC9C',
  '#E67E22',
  '#34495E',
];

const CategoryScreen = () => {
  const { state, dispatch } = useTodo();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    dispatch({
      type: 'ADD_CATEGORY',
      payload: {
        id: Date.now().toString(),
        name: newCategoryName.trim(),
        color: selectedColor,
      },
    });
    setNewCategoryName('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          value={newCategoryName}
          onChangeText={setNewCategoryName}
          placeholder="New category name"
        />
        <View style={styles.colorPicker}>
          {COLORS.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                {
                  backgroundColor: color,
                  borderWidth: selectedColor === color ? 2 : 0,
                },
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedColor(color);
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[
            styles.addButton,
            !newCategoryName.trim() && styles.addButtonDisabled,
          ]}
          onPress={handleAddCategory}
          disabled={!newCategoryName.trim()}
        >
          <Text style={styles.addButtonText}>Add Category</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={state.categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <View style={[styles.categoryColor, { backgroundColor: item.color }]} />
            <Text style={styles.categoryName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                dispatch({ type: 'DELETE_CATEGORY', payload: item.id });
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  addContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdde1',
  },
  input: {
    backgroundColor: '#f5f6fa',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
    borderColor: 'white',
  },
  addButton: {
    backgroundColor: '#3498DB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdde1',
  },
  categoryColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  deleteButton: {
    padding: 8,
  },
});

export default CategoryScreen;