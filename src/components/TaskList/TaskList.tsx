import { Box } from '@mui/material';
import { useTaskStore } from '../../stores/taskStore';
import { TaskItem } from '../TaskItem/TaskItem';

const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const filter = useTaskStore((state) => state.filter);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const setIsModalOpen = useTaskStore((state) => state.setIsModalOpen);

  const filteredTasks = tasks.filter(task => {
    if (filter.status && task.status !== filter.status) return false;
    if (filter.priority && task.priority !== filter.priority) return false;
    if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (filter.sortBy) {    
      case 'createdAsc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'createdDesc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'dueAsc':
        return (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0);
      case 'dueDesc':
        return (b.dueDate?.getTime() ?? 0) - (a.dueDate?.getTime() ?? 0);
      default:
        return 0;
    }
  });

  return (
    <Box>
      {sortedTasks.length > 0 ? (
        sortedTasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onEdit={() => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
            onDelete={() => deleteTask(task.id!)}
          />
        ))
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          Ainda não existem tarefas cadastradas
        </Box>
      )}
    </Box>
  );
};

export default TaskList; 