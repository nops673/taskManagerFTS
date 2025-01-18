import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import { ETaskPriority, ETaskStatus, Task } from '../../types/Task';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const priorityColors = {
  [ETaskPriority.LOW]: 'success',
  [ETaskPriority.MEDIUM]: 'warning',
  [ETaskPriority.HIGH]: 'error'
} as const;

const statusColors = {
  [ETaskStatus.PENDING]: 'warning',
  [ETaskStatus.IN_PROGRESS]: 'info',
  [ETaskStatus.COMPLETED]: 'success'
} as const;

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    if(task.id) {
      onDelete(task.id);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" >
          <Stack direction="row" spacing={1} sx={{ mb: 2 }} alignItems="center">
            <Typography variant="h6">{task.title}</Typography>
            <Chip 
              label={task.status}
              color={statusColors[task.status]} 
              size="small" 
            />
            <Chip 
              label={task.priority} 
              color={priorityColors[task.priority]} 
              size="small" 
            />
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton 
              size="small" 
              onClick={handleEdit} 
              title="editar tarefa"
              sx={{ 
                borderRadius: '50%',
                padding: '8px'
              }}
            >
              <Edit />
            </IconButton>
            <IconButton 
              size="small" 
              onClick={handleDelete} 
              title="excluir tarefa"
              sx={{ 
                borderRadius: '50%',
                padding: '8px'
              }}
            >
              <Delete />
            </IconButton>
          </Stack>
        </Box>
        
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {task.description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          responsável: {task.assignedTo?.name ?? 'não atribuído'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          criado em: {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
        {task.dueDate && (
          <Typography variant="body2" color="text.secondary">
            vencimento: {new Date(task.dueDate).toLocaleDateString()}
          </Typography>
        )}
        
      </CardContent>
    </Card>
  );
}; 