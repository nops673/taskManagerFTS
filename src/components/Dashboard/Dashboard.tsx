import { Box, Button, CircularProgress, Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { Suspense, useCallback, useMemo } from 'react';
import { useRandomTasks } from '../../hooks/useRandomTasks';
import { useTaskStore } from '../../stores/taskStore';
import { Task } from '../../types/Task';
import { Header } from '../Header/Header';
import TaskFilters from '../TaskFilters/TaskFilters';
import TaskList from '../TaskList/TaskList';
import TaskStats from '../TaskStats/TaskStats';

const AddTaskModal = React.lazy(() => import('../AddTaskForm/AddTaskModal'));

const TaskContent = React.memo(({ loading, error, tasks, handleOpenModal }: {
  loading: boolean;
  error: string | null;
  tasks: Task[];
  handleOpenModal: () => void;
}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return <Box sx={{ color: 'error.main' }}>{error}</Box>;
  }
  
  return (
    <Grid container spacing={3} direction="column">
      <Grid data-testid="header">
        <Header />
      </Grid>
      <Grid>
        {tasks.length > 0 && <TaskStats data-testid="task-stats" />}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleOpenModal}
            data-testid="add-task-button"
          >
            adicionar tarefa
          </Button>
        </Box>
      </Grid>
      <Grid>
        <TaskFilters data-testid="task-filters" />
        <TaskList data-testid="task-list" />
      </Grid>
    </Grid>
  );
});

const Dashboard: React.FC = () => {
  const { isModalOpen, setIsModalOpen, tasks, loading, error } = useTaskStore();
  const { loading: loadingRandomTasks } = useRandomTasks();

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const isLoading = useMemo(() => 
    loading ?? loadingRandomTasks, 
    [loading, loadingRandomTasks]
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <TaskContent 
          loading={isLoading} 
          error={error} 
          tasks={tasks} 
          handleOpenModal={handleOpenModal} 
        />

        <Suspense fallback={<CircularProgress />}>
          <AddTaskModal 
            isModalOpen={isModalOpen} 
            handleCloseModal={handleCloseModal} 
          />
        </Suspense>
      </Box>
    </Container>
  );
};

export default React.memo(Dashboard); 