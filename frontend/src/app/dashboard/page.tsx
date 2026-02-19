'use client';

import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '../../services/api';
import { toast } from 'react-toastify';
import {
    Plus,
    Search,
    CheckCircle2,
    Trash2,
    Edit3,
    Filter,
    Inbox,
    Loader2,
    MoreVertical,
    Check,
    X,
    TrendingUp,
    LayoutGrid,
    Target,
    CheckSquare // Import CheckSquare
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Task {
    _id: string;
    text: string;
    completed: boolean;
    createdAt: string;
}

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

export default function Dashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const taskInputRef = useRef<HTMLInputElement>(null);

    // State
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    // ... existing state

    // ... existing useEffects

    // Add effect to handle view=tasks param
    useEffect(() => {
        if (searchParams.get('view') === 'tasks') {
            setTimeout(() => {
                taskInputRef.current?.focus();
                taskInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100); // Small delay to ensure render
        }
    }, [searchParams]);

    // ... existing fetchTasks and handlers



    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [isFetchLoading, setIsFetchLoading] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'board'>('list');

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user) {
            fetchTasks();
        }
    }, [user, authLoading, router]);

    const fetchTasks = async () => {
        setIsFetchLoading(true);
        try {
            const { data } = await api.get('/tasks');
            setTasks(data.data || []);
        } catch (error: any) {
            console.error('Fetch error:', error);
            toast.error('Failed to load tasks');
        } finally {
            setIsFetchLoading(false);
        }
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        setActionLoading(true);

        try {
            const { data } = await api.post('/tasks', { text: newTask.trim() });
            setTasks((prev) => [data.data, ...prev]);
            setNewTask('');
            toast.success('Task added to your list');
        } catch (error: any) {
            console.error('Task Submission Error:', error);
            const message = error.response?.data?.message || error.message || 'Failed to add task';
            toast.error(`Error: ${message}`);
        } finally {
            setActionLoading(false);
        }
    };

    const toggleComplete = async (task: Task) => {
        // Optimistic update
        const updatedTask = { ...task, completed: !task.completed };
        setTasks((prev) => prev.map((t) => (t._id === task._id ? updatedTask : t)));

        try {
            await api.put(`/tasks/${task._id}`, { completed: !task.completed });
        } catch (error) {
            // Revert on failure
            setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t)));
            toast.error('Failed to update task');
        }
    };

    const deleteTask = async (id: string) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks((prev) => prev.filter((t) => t._id !== id));
            toast.success('Task permanently removed');
            setConfirmDeleteId(null);
        } catch (error) {
            toast.error('Failed to delete task');
        }
    };

    const handleUpdateTask = async () => {
        if (!editingTask || !editingTask.text.trim()) return;
        try {
            const { data } = await api.put(`/tasks/${editingTask._id}`, { text: editingTask.text });
            setTasks((prev) => prev.map((t) => (t._id === editingTask._id ? data.data : t)));
            setEditingTask(null);
            toast.success('Changes saved');
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const onDragEnd = async (result: DropResult) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        // If dropped in the same column, do nothing (sorting not implemented yet)
        if (source.droppableId === destination.droppableId) return;

        // Find the task
        const task = tasks.find((t) => t._id === draggableId);
        if (!task) return;

        // Determine new status based on destination column ID
        const newCompleted = destination.droppableId === 'completed';

        // Optimistic update
        const updatedTask = { ...task, completed: newCompleted };
        setTasks((prev) => prev.map((t) => (t._id === draggableId ? updatedTask : t)));

        // API Call
        try {
            await api.put(`/tasks/${draggableId}`, { completed: newCompleted });
            toast.success(newCompleted ? 'Task completed!' : 'Task reactivated');
        } catch (error) {
            // Revert
            setTasks((prev) => prev.map((t) => (t._id === draggableId ? task : t)));
            toast.error('Failed to move task');
        }
    };

    // Analytics
    const stats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

        return { total, completed, pending, rate };
    }, [tasks]);

    const filteredTasks = tasks
        .filter((t) => {
            if (filter === 'completed') return t.completed;
            if (filter === 'pending') return !t.completed;
            return true;
        })
        .filter((t) => t.text.toLowerCase().includes(searchTerm.toLowerCase()));

    if (authLoading || (!user && !authLoading)) {
        return (
            <div className="h-[80vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-zinc-400" />
            </div>
        );
    }

    return (
        <div key={searchParams.toString() || 'dashboard'} className="max-w-6xl mx-auto py-8 px-4 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-display font-bold text-zinc-900 dark:text-white tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-zinc-500 font-medium">
                        Welcome back, <span className="text-zinc-900 dark:text-zinc-200 font-bold">{user?.name}</span>. Plan your day effectively.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant={viewMode === 'board' ? 'primary' : 'secondary'}
                        icon={viewMode === 'board' ? <LayoutGrid size={18} /> : <Filter size={18} />}
                        className="rounded-2xl"
                        onClick={() => setViewMode(viewMode === 'list' ? 'board' : 'list')}
                    >
                        {viewMode === 'list' ? 'Board View' : 'List View'}
                    </Button>
                    <Button
                        variant="primary"
                        icon={<Plus size={18} />}
                        className="rounded-2xl"
                        onClick={() => {
                            taskInputRef.current?.focus();
                            taskInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                    >
                        Add task
                    </Button>
                </div>
            </header>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    label="Total Tasks"
                    value={stats.total}
                    icon={<Target className="text-blue-500" size={24} />}
                    color="blue"
                    progress={100}
                    trend="+5%"
                />
                <StatCard
                    label="Completed"
                    value={stats.completed}
                    icon={<CheckCircle2 className="text-emerald-500" size={24} />}
                    color="emerald"
                    progress={stats.rate}
                    trend="+12%"
                />
                <StatCard
                    label="Productivity"
                    value={`${stats.rate}%`}
                    icon={<TrendingUp className="text-indigo-500" size={24} />}
                    color="indigo"
                    progress={stats.rate}
                    trend="Optimal"
                />
            </section>

            {/* Main Content */}
            <section className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <h2 className="text-xl font-display font-bold flex items-center gap-2">
                        Active Tasks
                        <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">{filteredTasks.length}</span>
                    </h2>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Input
                            placeholder="Search tasks..."
                            icon={<Search size={16} />}
                            className="bg-zinc-100/50 dark:bg-zinc-800/30 border-none rounded-2xl h-10 w-full md:w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="flex bg-zinc-100/50 dark:bg-zinc-800/30 p-1 rounded-2xl gap-1">
                            {(['all', 'pending', 'completed'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={cn(
                                        'px-4 py-1.5 text-xs font-bold rounded-xl transition-all capitalize',
                                        filter === f
                                            ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm'
                                            : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'
                                    )}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Add Form */}
                <form onSubmit={handleAddTask} className="relative group">
                    <Input
                        ref={taskInputRef}
                        placeholder="What needs to be done? Press Enter to add."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        disabled={actionLoading}
                        className="h-14 px-6 rounded-3xl text-base font-medium pr-32"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-1 text-[10px] font-bold text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
                            <span className="text-xs">↵</span> Enter
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            loading={actionLoading}
                            disabled={!newTask.trim()}
                            className="rounded-2xl"
                        >
                            Add Task
                        </Button>
                    </div>
                </form>

                {/* Task List */}
                <div className="min-h-[400px]">
                    {isFetchLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
                            <p className="text-sm font-medium text-zinc-400">Loading tasks...</p>
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-24 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-[40px] flex flex-col items-center gap-4"
                        >
                            <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center">
                                <Inbox className="text-zinc-200" size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-200">No tasks found</h3>
                                <p className="text-sm text-zinc-500 font-medium">Try adjusting your filters or search query.</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => { setFilter('all'); setSearchTerm(''); }} className="mt-2">Clear all filters</Button>
                        </motion.div>
                    ) : viewMode === 'list' ? (
                        <div className="grid grid-cols-1 gap-4">
                            <AnimatePresence mode="popLayout">
                                {filteredTasks.map((task) => (
                                    <TaskItem
                                        key={task._id}
                                        task={task}
                                        onToggle={() => toggleComplete(task)}
                                        onDelete={() => setConfirmDeleteId(task._id)}
                                        onEdit={() => setEditingTask(task)}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                                <BoardColumn
                                    title="Pending"
                                    id="pending"
                                    tasks={filteredTasks.filter(t => !t.completed)}
                                    onToggle={toggleComplete}
                                    onDelete={setConfirmDeleteId}
                                    onEdit={setEditingTask}
                                />
                                <BoardColumn
                                    title="Completed"
                                    id="completed"
                                    tasks={filteredTasks.filter(t => t.completed)}
                                    onToggle={toggleComplete}
                                    onDelete={setConfirmDeleteId}
                                    onEdit={setEditingTask}
                                    isCompleted
                                />
                            </div>
                        </DragDropContext>
                    )}
                </div>
            </section>

            {/* Models */}
            <Modal
                isOpen={!!editingTask}
                onClose={() => setEditingTask(null)}
                title="Edit Task"
                footer={(
                    <>
                        <Button variant="ghost" onClick={() => setEditingTask(null)}>Cancel</Button>
                        <Button onClick={handleUpdateTask}>Save Changes</Button>
                    </>
                )}
            >
                <div className="space-y-4">
                    <Input
                        label="Task Description"
                        value={editingTask?.text || ''}
                        onChange={(e) => setEditingTask(prev => prev ? { ...prev, text: e.target.value } : null)}
                        autoFocus
                    />
                </div>
            </Modal>

            <Modal
                isOpen={!!confirmDeleteId}
                onClose={() => setConfirmDeleteId(null)}
                title="Delete Task"
                size="sm"
                footer={(
                    <>
                        <Button variant="ghost" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
                        <Button variant="danger" onClick={() => confirmDeleteId && deleteTask(confirmDeleteId)}>Delete Permanent</Button>
                    </>
                )}
            >
                <p className="font-medium text-zinc-600 dark:text-zinc-400">Are you sure you want to remove this task? This action cannot be undone.</p>
            </Modal>
        </div>
    );
}

function StatCard({ label, value, icon, progress, trend, color }: any) {
    const colors = {
        blue: 'bg-blue-500',
        emerald: 'bg-emerald-500',
        indigo: 'bg-indigo-500',
    };

    return (
        <Card className="p-6 relative overflow-hidden group border-none ring-1 ring-zinc-200 dark:ring-zinc-800 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-zinc-950/50">
            <div className="relative z-10 flex items-start justify-between">
                <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                        {icon}
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">{label}</p>
                        <h4 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mt-1">{value}</h4>
                    </div>
                </div>
                <div className="text-[10px] font-bold text-zinc-400 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800 flex items-center gap-1">
                    {trend.includes('+') ? <TrendingUp size={10} className="text-emerald-500" /> : null}
                    {trend}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn('h-full rounded-full', colors[color as keyof typeof colors])}
                />
            </div>
        </Card>
    );
}

function TaskItem({ task, onToggle, onDelete, onEdit }: any) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
        >
            <Card className={cn(
                'group p-5 flex items-center justify-between gap-4 border-none ring-1 ring-zinc-100 dark:ring-zinc-800 hover:ring-zinc-300 dark:hover:ring-zinc-700 transition-all duration-300',
                task.completed && 'bg-zinc-50/50 dark:bg-zinc-900/20'
            )}>
                <div className="flex items-center gap-4 flex-1">
                    <button
                        onClick={onToggle}
                        className={cn(
                            'w-7 h-7 rounded-xl border flex-shrink-0 flex items-center justify-center transition-all duration-300',
                            task.completed
                                ? 'bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-zinc-900'
                                : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-100'
                        )}
                    >
                        {task.completed && <Check size={14} strokeWidth={3} />}
                    </button>

                    <div className="flex flex-col min-w-0">
                        <span className={cn(
                            'font-bold tracking-tight transition-all duration-300 truncate',
                            task.completed ? 'text-zinc-400 line-through decoration-2' : 'text-zinc-900 dark:text-zinc-100'
                        )}>
                            {task.text}
                        </span>
                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-0.5">
                            Created {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    <button
                        onClick={onEdit}
                        className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                    >
                        <Edit3 size={16} />
                    </button>
                    <button
                        onClick={onDelete}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                    <button className="p-2 text-zinc-300 dark:text-zinc-700 cursor-grab active:cursor-grabbing">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </Card>
        </motion.div>
    );
}

function BoardColumn({ title, id, tasks, onToggle, onDelete, onEdit, isCompleted }: any) {
    return (
        <Droppable droppableId={id}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4"
                >
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            {title}
                            <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">{tasks.length}</span>
                        </h3>
                    </div>
                    <div className="space-y-4 min-h-[200px] p-2 rounded-3xl bg-zinc-100/30 dark:bg-zinc-900/10 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors">
                        {tasks.map((task: any, index: number) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{ ...provided.draggableProps.style }}
                                        className={snapshot.isDragging ? "opacity-90 scale-105 z-50" : ""}
                                    >
                                        <Card className={cn(
                                            "p-4 space-y-3 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all border-none ring-1 ring-zinc-200 dark:ring-zinc-800",
                                            isCompleted && "bg-zinc-50/50 dark:bg-zinc-950/20"
                                        )}>
                                            <p className={cn(
                                                "text-sm font-bold leading-relaxed",
                                                isCompleted && "text-zinc-400 line-through decoration-zinc-300"
                                            )}>
                                                {task.text}
                                            </p>
                                            <div className="flex items-center justify-between pt-2">
                                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                                                    {new Date(task.createdAt).toLocaleDateString()}
                                                </span>
                                                <div className="flex items-center gap-0.5">
                                                    <button onClick={() => onToggle(task)} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                                        {isCompleted ? <X size={14} /> : <Check size={14} />}
                                                    </button>
                                                    <button onClick={() => onEdit(task)} className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                                        <Edit3 size={14} />
                                                    </button>
                                                    <button onClick={() => onDelete(task._id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-zinc-400 hover:text-red-500 transition-colors">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        {tasks.length === 0 && (
                            <div className="h-32 border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center justify-center">
                                <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Empty</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Droppable>
    );
}

