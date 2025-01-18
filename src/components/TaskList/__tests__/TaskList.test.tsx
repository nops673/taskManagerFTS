import { render, screen } from '@testing-library/react';
import { useTaskStore } from '../../../stores/taskStore';
import { ETaskPriority, ETaskStatus } from '../../../types/Task';
import TaskList from '../TaskList';

const mockUseTaskStore = useTaskStore as unknown as jest.Mock;

jest.mock('../../../stores/taskStore', () => ({
  useTaskStore: jest.fn((selector) => selector({
    tasks: [{
      id: 1,
      title: 'Tarefa 1',
      completed: false,
      createdAt: new Date(),
      priority: ETaskPriority.LOW,
      status: ETaskStatus.PENDING,
      description: '',
      dueDate: null,
      assignedTo: null
    }],
    filter: {
      status: null,
      priority: null,
      search: '',
      sortBy: 'createdDesc'
    },
    deleteTask: jest.fn(),
    setEditingTask: jest.fn(),
    setIsModalOpen: jest.fn()
  }))
}));

describe('TaskList', () => {
  it('deve renderizar a lista de tarefas corretamente', () => {
    render(<TaskList />)
    expect(screen.getByText('Tarefa 1')).toBeInTheDocument()
  })

  it('deve renderizar mensagem quando não houver tarefas', () => {
    mockUseTaskStore.mockImplementation((selector) => selector({
      tasks: [],
      filter: {
        status: null,
        priority: null,
        search: '',
        sortBy: 'createdDesc'
      },
      deleteTask: jest.fn(),
      setEditingTask: jest.fn(),
      setIsModalOpen: jest.fn()
    }))

    render(<TaskList />)
    expect(screen.getByText('Ainda não existem tarefas cadastradas')).toBeInTheDocument()
  })
}) 