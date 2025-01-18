/* istanbul ignore file */
import { ThemeProvider } from '@mui/material/styles'
import { render, RenderOptions } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { theme } from './theme'
import { ETaskPriority, ETaskStatus } from './types/Task'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }


export const mockTaskStoreDefault = { 
    tasks: [],
    filter: { status: null, priority: null, search: '' },
    editingTask: null,
    isModalOpen: false,
    addTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    setFilter: jest.fn(),
    setEditingTask: jest.fn(),
    setIsModalOpen: jest.fn(),
    getTasks: jest.fn(),
    loading: false,
    error: null,
    setLoading: jest.fn(),
    setError: jest.fn()
  }

export const mockTasksDefault = [
    { id: 1, priority: ETaskPriority.HIGH, title: 'Tarefa 1', description: 'Descrição 1', status: ETaskStatus.PENDING, createdAt: new Date(), dueDate: new Date(), assignedTo: { id: '1', name: 'Usuário 1' } },
    { id: 2, priority: ETaskPriority.LOW, title: 'Tarefa 2', description: 'Descrição 2', status: ETaskStatus.COMPLETED, createdAt: new Date(), dueDate: new Date(), assignedTo: { id: '2', name: 'Usuário 2' } },
    { id: 3, priority: ETaskPriority.MEDIUM, title: 'Tarefa 3', description: 'Descrição 3', status: ETaskStatus.IN_PROGRESS, createdAt: new Date(), dueDate: new Date(), assignedTo: { id: '3', name: 'Usuário 3' } }
]