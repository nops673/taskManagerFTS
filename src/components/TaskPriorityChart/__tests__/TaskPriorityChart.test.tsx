import { render } from '@testing-library/react'
import { Mock } from 'jest-mock'
import type { TaskStore } from '../../../stores/taskStore'
import { useTaskStore } from '../../../stores/taskStore'
import { mockTasksDefault, mockTaskStoreDefault } from '../../../test-utils'
import { ETaskPriority } from '../../../types/Task'
import { TaskPriorityChart } from '../TaskPriorityChart'

jest.mock('../../../stores/taskStore', () => ({
  useTaskStore: jest.fn()
}))

const mockUseTaskStore = useTaskStore as unknown as Mock<(selector: (state: TaskStore) => unknown) => unknown>

describe('TaskPriorityChart', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTaskStore.mockImplementation((selector) => selector({
        ...mockTaskStoreDefault,
      tasks: mockTasksDefault,
    }))
  })



  it('deve renderizar o gráfico com dados corretos', () => {
    const { getByTestId } = render(<TaskPriorityChart tasks={mockTasksDefault} />)
    
    expect(getByTestId('task-priority-chart')).toBeInTheDocument()
  })

  it('deve renderizar o gráfico vazio quando não houver tarefas', () => {
    const { getByTestId } = render(<TaskPriorityChart tasks={[]} />)
    
    expect(getByTestId('task-priority-chart')).toBeInTheDocument()
  })

  it('deve renderizar o gráfico com valor zero quando não houver tarefas de uma prioridade', () => {
    const tasksOnlyHigh = mockTasksDefault.filter(task => task.priority === ETaskPriority.HIGH)
    const { getByTestId } = render(<TaskPriorityChart tasks={tasksOnlyHigh} />)
    expect(getByTestId('task-priority-chart')).toBeInTheDocument()
  })
}) 