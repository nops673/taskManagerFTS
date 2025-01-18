import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTaskForm } from '../../hooks/useTaskForm';
import { useTaskStore } from '../../stores/taskStore';
import { Task } from '../../types/Task';
import { TaskFormFields } from './TaskFormFields';

interface AddTaskFormProps {
  onClose?: () => void;
}


const AddTaskForm: React.FC<AddTaskFormProps> = ({ onClose }) => {

  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const editingTask = useTaskStore((state) => state.editingTask);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateTaskData = (taskData: Task) => {
    const validationErrors: Record<string, string> = {};
    
    if (!taskData.title) {
      validationErrors.title = 'Título é obrigatório';
    }
    if (!taskData.description) {
      validationErrors.description = 'Descrição é obrigatória';
    }
    if (!taskData.dueDate) {
      validationErrors.dueDate = 'Data de vencimento é obrigatória';
    }
    if (!taskData.priority) {
      validationErrors.priority = 'Prioridade é obrigatória';
    }
    if (!taskData.status) {
      validationErrors.status = 'Status é obrigatório';
    }

    return validationErrors;
  }

  const handleSubmit = async (taskData: Task) => {

    const validationErrors = validateTaskData(taskData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // INFO: Delay de 1 segundo para simular uma requisição a uma API;
      
      if (editingTask?.id) {
        updateTask(editingTask.id, taskData);
      } else {
        addTask(taskData);
      }
      handleClose();
    } finally {
      setLoading(false);
    }
  };

  const { formData, handlers } = useTaskForm({
    onSubmit: handleSubmit,
    initialTask: editingTask
  });

  const handleClose = () => {
    setEditingTask(null);
    onClose?.();
  };

  return (
    <Box component="form" onSubmit={handlers.handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {editingTask?.id ? 'editar tarefa' : 'adicionar tarefa'}
      </Typography>

      <TaskFormFields formData={formData} handlers={handlers} errors={errors} />

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={handleClose}
        >
          cancelar
        </Button>
        <Button 
          type="submit"
          variant="contained" 
          fullWidth
          disabled={loading}
        >
          {loading ? 'salvando...' : 'salvar'}
        </Button>
      </Box>
    </Box>
  );
};

export default AddTaskForm; 