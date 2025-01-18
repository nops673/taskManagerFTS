/* istanbul ignore file */
import { useEffect } from 'react';
import { useTaskStore } from '../stores/taskStore';
import { ETaskPriority, ETaskStatus, Task } from '../types/Task';
import { PESSOAS_DISPONIVEIS } from '../types/User';

const statusOptions = [ETaskStatus.PENDING, ETaskStatus.IN_PROGRESS, ETaskStatus.COMPLETED] as const;
const priorityOptions = [ETaskPriority.LOW, ETaskPriority.MEDIUM, ETaskPriority.HIGH] as const;
const taskTitles = [
  'desenvolver nova feature',
  'corrigir bug no sistema',
  'revisar código',
  'atualizar documentação',
  'realizar testes',
  'reunião com cliente',
  'deploy da aplicação',
  'otimizar performance',
  'implementar segurança',
  'criar backup'
];

export const useRandomTasks = () => {

  const { addTask, tasks } = useTaskStore();
  const { loading, setLoading } = useTaskStore();
  const { error, setError } = useTaskStore();

  const generateRandomTask = (): Task => {
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 30));

    return {
      id: Math.floor(Math.random() * 1000000),
      title: taskTitles[Math.floor(Math.random() * taskTitles.length)],
      description: `descrição da tarefa ${Math.random().toString(36).substring(2, 7)}`,
      status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
      priority: priorityOptions[Math.floor(Math.random() * priorityOptions.length)],
      dueDate: randomDate,
      createdAt: new Date(),
      assignedTo: PESSOAS_DISPONIVEIS[Math.floor(Math.random() * PESSOAS_DISPONIVEIS.length)]
    };
  };

  useEffect(() => {

    let isMounted = true;
    const hasExistingTasks = tasks.length > 0;

    if (hasExistingTasks) {
      return;
    }
    const fetchTasks = async () => {
      if (!isMounted) return;
      
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
          if(isMounted){
            const randomTasks = Array.from({ length: 30 }, generateRandomTask);
            randomTasks.forEach(task => addTask(task));
          }
        
      } catch (error) {
        if(isMounted){
          const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar as tarefas';
          console.error(errorMessage, error);
          setError(errorMessage);
        }
        
      } finally {
        if(isMounted){
          setLoading(false);
        }
      }
    };

    fetchTasks();

    return () => {
      isMounted = false;
    };

  }, []);

  return {
    tasks,
    loading,
    error,
    generateRandomTask
  };
}; 