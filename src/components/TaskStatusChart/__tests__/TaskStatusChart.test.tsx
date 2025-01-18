import { render } from '@testing-library/react'
import { Mock } from 'jest-mock'
import type { TaskStore } from '../../../stores/taskStore'
import { useTaskStore } from '../../../stores/taskStore'
import { mockTasksDefault, mockTaskStoreDefault } from '../../../test-utils'
import { ETaskPriority, ETaskStatus } from '../../../types/Task'
import { TaskStatusChart } from '../TaskStatusChart'

jest.mock('../../../stores/taskStore', () => ({
  useTaskStore: jest.fn()
}))

const mockUseTaskStore = useTaskStore as unknown as Mock<(selector: (state: TaskStore) => unknown) => unknown>

describe('TaskStatusChart', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTaskStore.mockImplementation((selector) => selector({
      ...mockTaskStoreDefault,
      tasks: mockTasksDefault,
    }))
  })

  const mockTasks = [
    { id: 1, status: ETaskStatus.PENDING, title: 'Tarefa 1', description: 'Descrição 1', priority: ETaskPriority.HIGH, createdAt: new Date(), dueDate: new Date(), assignedTo: { id: '1', name: 'Usuário 1' } },
    { id: 2, status: ETaskStatus.COMPLETED, title: 'Tarefa 2', description: 'Descrição 2', priority: ETaskPriority.LOW, createdAt: new Date(), dueDate: new Date(), assignedTo: { id: '2', name: 'Usuário 2' } },
    { id: 3, status: ETaskStatus.IN_PROGRESS, title: 'Tarefa 3', description: 'Descrição 3', priority: ETaskPriority.MEDIUM, createdAt: new Date(), dueDate: new Date(), assignedTo: { id: '3', name: 'Usuário 3' } }
  ]

  it('deve renderizar o gráfico com dados corretos', async () => {
    const { getByTestId } = render(<TaskStatusChart tasks={mockTasks} />)
    
    expect(getByTestId('task-status-chart')).toBeInTheDocument()
  })

  it('deve renderizar o gráfico vazio quando não houver tarefas', async () => {
    mockUseTaskStore.mockImplementation((selector) => selector(mockTaskStoreDefault))
    
    const { getByTestId } = render(<TaskStatusChart tasks={[]} />)
    
    expect(getByTestId('task-status-chart')).toBeInTheDocument()
  })

  it('deve renderizar o gráfico com valor zero quando não houver tarefas de um status', () => {
    const tasksOnlyCompleted = mockTasks.filter(task => task.status === ETaskStatus.COMPLETED)
    const { getByTestId } = render(<TaskStatusChart tasks={tasksOnlyCompleted} />)
    expect(getByTestId('task-status-chart')).toBeInTheDocument()
  })
}) 