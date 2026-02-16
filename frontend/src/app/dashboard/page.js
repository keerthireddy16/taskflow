'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaCheck, FaTimes } from 'react-icons/fa';

export default function Dashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, completed, pending
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            fetchTasks();
        }
    }, [user, loading, router]);

    const fetchTasks = async () => {
        try {
            const { data } = await api.get('/tasks');
            setTasks(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch tasks');
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        try {
            const { data } = await api.post('/tasks', { text: newTask });
            setTasks([...tasks, data]);
            setNewTask('');
            toast.success('Task added');
        } catch (error) {
            toast.error('Failed to add task');
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter((task) => task._id !== id));
            toast.success('Task deleted');
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    const handleUpdateTask = async (id, updatedData) => {
        try {
            const { data } = await api.put(`/tasks/${id}`, updatedData);
            setTasks(tasks.map((task) => (task._id === id ? data : task)));
            toast.success('Task updated');
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    const startEditing = (task) => {
        setEditingTaskId(task._id);
        setEditingText(task.text);
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setEditingText('');
    };

    const saveEditing = async (id) => {
        await handleUpdateTask(id, { text: editingText });
        setEditingTaskId(null);
    };

    const toggleComplete = (task) => {
        handleUpdateTask(task._id, { completed: !task.completed });
    };

    const filteredTasks = tasks
        .filter((task) => {
            if (filter === 'completed') return task.completed;
            if (filter === 'pending') return !task.completed;
            return true;
        })
        .filter((task) =>
            task.text.toLowerCase().includes(searchTerm.toLowerCase())
        );

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="mb-8 flex gap-2">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <FaPlus /> Add
                </button>
            </form>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                <div className="relative flex-1">
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search tasks..."
                        className="w-full border p-2 pl-10 rounded"
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                    <p className="text-center text-gray-500">No tasks found.</p>
                ) : (
                    filteredTasks.map((task) => (
                        <div key={task._id} className={`bg-white p-4 rounded shadow flex items-center justify-between ${task.completed ? 'opacity-75' : ''}`}>
                            <div className="flex items-center gap-4 flex-1">
                                <button onClick={() => toggleComplete(task)} className={`text-xl ${task.completed ? 'text-green-500' : 'text-gray-300'}`}>
                                    <FaCheck />
                                </button>

                                {editingTaskId === task._id ? (
                                    <div className="flex-1 flex gap-2">
                                        <input
                                            type="text"
                                            value={editingText}
                                            onChange={(e) => setEditingText(e.target.value)}
                                            className="border p-1 rounded flex-1"
                                        />
                                        <button onClick={() => saveEditing(task._id)} className="text-green-600"><FaCheck /></button>
                                        <button onClick={cancelEditing} className="text-red-500"><FaTimes /></button>
                                    </div>
                                ) : (
                                    <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                        {task.text}
                                    </span>
                                )}
                            </div>

                            <div className="flex gap-2 ml-4">
                                <button onClick={() => startEditing(task)} className="text-blue-500 hover:text-blue-700 p-2">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDeleteTask(task._id)} className="text-red-500 hover:text-red-700 p-2">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
