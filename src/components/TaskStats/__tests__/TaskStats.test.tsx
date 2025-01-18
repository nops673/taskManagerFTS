import { render, screen } from '@testing-library/react'
import { Mock } from 'jest-mock'
import { TaskStore, useTaskStore } from '../../../stores/taskStore'
import { mockTasksDefault, mockTaskStoreDefault } from '../../../test-utils'
import TaskStats from '../TaskStats'

jest.mock('../../../stores/taskStore', () => ({
  useTaskStore: jest.fn()
}))

const mockUseTaskStore = useTaskStore as unknown as Mock<(selector: (state: TaskStore) => unknown) => unknown>

describe('TaskStats', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTaskStore.mockImplementation((selector) => selector(
        {...mockTaskStoreDefault,
            tasks: mockTasksDefault,
        }
    ))
  })

  it('deve renderizar as estatísticas corretamente', () => {
      
      render(<TaskStats />)
      
      expect(screen.getByText('status das tarefas')).toBeInTheDocument()
      expect(screen.getByText('prioridade das tarefas')).toBeInTheDocument()
  })

  it('não deve renderizar o componente quando não houver tarefas', () => {
    mockUseTaskStore.mockImplementation((selector) => selector({...mockTaskStoreDefault}))
    
    render(<TaskStats />)
    
    expect(screen.queryByTestId('task-stats')).not.toBeInTheDocument()
  })
}) 