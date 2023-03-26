import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import CustomHeaderCheckList from 'src/components/CustomHeader/CustomHeaderCheckList';

const ChecklistScreen = ({navigation}) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('tasks').then(value => {
      if (value !== null) {
        setTasks(JSON.parse(value));
      }
    });
  }, []);

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {id: Date.now(), text: newTask.trim(), completed: false},
      ]);
      setNewTask('');
    }
  };

  const handleToggleTask = id => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {...task, completed: !task.completed};
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleSaveTasks = () => {
    if (tasks.length === 0) {
      return;
    }

    // Save tasks to local storage
    AsyncStorage.setItem('tasks', JSON.stringify(tasks))
      .then(() => {
        setTasks([]);
        AsyncStorage.removeItem('tasks');
        navigation.goBack();
        Alert.alert('Tasks saved successfully!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleToggleTask(item.id)}>
      <View style={styles.task}>
        <Text
          style={[styles.taskText, item.completed && styles.completedTaskText]}>
          {item.text}
        </Text>
        {item.completed && <Text style={styles.completedTaskIcon}>✓</Text>}
        {!item.completed && <Text style={styles.taskIcon}>○</Text>}
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <Text style={styles.deleteTaskIcon}>🗑</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeaderCheckList
        navigation={navigation}
        onSave={handleSaveTasks}
        tasks={tasks}
        title="Checklist"
      />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks yet</Text>}
      />
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setNewTask}
          value={newTask}
          multiline={true}
          placeholder="Add task"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  emptyText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  listContainer: {
    flexGrow: 1,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  completedTaskText: {
    color: 'green',
    textDecorationLine: 'line-through',
  },
  completedTaskIcon: {
    color: 'green',
    fontSize: 18,
  },
  taskIcon: {
    color: '#ccc',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4285F4',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChecklistScreen;
