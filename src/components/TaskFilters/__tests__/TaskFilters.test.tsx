import { act, fireEvent, render, screen } from '@testing-library/react'
import { Mock } from 'jest-mock'
import type { TaskStore } from '../../../stores/taskStore'
import { useTaskStore } from '../../../stores/taskStore'
import { mockTaskStoreDefault } from '../../../test-utils'
import { ETaskPriority, ETaskStatus } from '../../../types/Task'
import TaskFilters from '../TaskFilters'

jest.mock('../../../stores/taskStore', () => ({
  useTaskStore: jest.fn()
}))

const mockUseTaskStore = useTaskStore as unknown as Mock<(selector: (state: TaskStore) => unknown) => unknown>

describe('TaskFilters', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTaskStore.mockImplementation((selector) => selector(mockTaskStoreDefault))
  })

  it('deve renderizar todos os filtros', () => {
    render(<TaskFilters />)
    
    expect(screen.getByLabelText(/buscar/i)).toBeInTheDocument()
    const comboboxes = screen.getAllByRole('combobox')
    expect(comboboxes).toHaveLength(3)
  })

  it('deve atualizar o filtro de pesquisa', async () => {
    const setFilter = jest.fn()
    mockUseTaskStore.mockImplementation((selector) => selector({
      ...mockTaskStoreDefault,
      setFilter
    }))

    render(<TaskFilters />)
    
    const searchInput = screen.getByLabelText(/buscar/i)
    fireEvent.change(searchInput, { target: { value: 'teste' } })
    
    expect(setFilter).toHaveBeenCalledWith(expect.objectContaining({
      search: 'teste'
    }))
  })

  it('deve atualizar o filtro de status', async () => {
    const setFilter = jest.fn()
    mockUseTaskStore.mockImplementation((selector) => {
      if (typeof selector === 'function') {
        return selector({
          ...mockTaskStoreDefault,
          filter: { status: null, priority: null, search: '' },
          setFilter
        })
      }
      return { ...mockTaskStoreDefault, setFilter }
    })

    render(<TaskFilters />)
    
    const statusSelect = screen.getByTestId('status-select')
    const nativeInput = statusSelect.querySelector('input.MuiSelect-nativeInput')!
    
    await act(async () => {
      fireEvent.change(nativeInput, { 
        target: { value: ETaskStatus.COMPLETED }
      })
    })
    
    expect(setFilter).toHaveBeenCalledWith({ 
      status: ETaskStatus.COMPLETED,
    })
  })

  it('deve atualizar o filtro de prioridade', async () => {
    const setFilter = jest.fn()
    mockUseTaskStore.mockImplementation((selector) => {
        if (typeof selector === 'function') {
          return selector({
            ...mockTaskStoreDefault,
            filter: { status: null, priority: null, search: '' },
            setFilter
          })
        }
        return { ...mockTaskStoreDefault, setFilter }
      })

    render(<TaskFilters />)
    
    const prioritySelect = screen.getByTestId('priority-select')
    const nativeInput = prioritySelect.querySelector('input.MuiSelect-nativeInput')!
    
    await act(async () => {
      fireEvent.change(nativeInput, { 
        target: { value: ETaskPriority.HIGH }
      })
    })
    
    expect(setFilter).toHaveBeenCalledWith({ 
      priority: ETaskPriority.HIGH,
    })
  })
}) 