import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ptBR from 'date-fns/locale/pt-BR';
import { useTaskStore } from '../../../stores/taskStore';
import { ETaskPriority, ETaskStatus } from '../../../types/Task';
import AddTaskForm from '../AddTaskForm';

const mockUseTaskStore = useTaskStore as unknown as jest.Mock;

jest.mock('../../../stores/taskStore', () => ({
  useTaskStore: jest.fn((selector) => selector({
    isModalOpen: true,
    editingTask: null,
    setIsModalOpen: jest.fn(),
    addTask: jest.fn(),
    updateTask: jest.fn()
  }))
}))

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      {ui}
    </LocalizationProvider>
  );
};

describe('AddTaskForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar o formulário corretamente', () => {
    renderWithProviders(<AddTaskForm />)
    
    expect(screen.getByRole('textbox', { name: /título/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /descrição/i })).toBeInTheDocument()
    const comboboxes = screen.getAllByRole('combobox')
    expect(comboboxes).toHaveLength(3)
    expect(screen.getByRole('textbox', { name: /data de vencimento/i })).toBeInTheDocument()
  })

  it('deve adicionar uma nova tarefa quando o formulário for submetido', async () => {
    const addTask = jest.fn()
    mockUseTaskStore.mockImplementation((selector) => selector({
      isModalOpen: true,
      editingTask: null,
      setIsModalOpen: jest.fn(),
      addTask,
      updateTask: jest.fn(),
      setEditingTask: jest.fn()
    }))

    const { container } = renderWithProviders(<AddTaskForm />)

      await userEvent.type(screen.getByRole('textbox', { name: /título/i }), 'Nova Tarefa')
      await userEvent.type(screen.getByRole('textbox', { name: /descrição/i }), 'Descrição da tarefa')
      
      const [prioritySelect, statusSelect] = screen.getAllByRole('combobox')
      await userEvent.click(prioritySelect)
      await userEvent.click(screen.getByTestId('priority-high'))
      await userEvent.click(statusSelect)
      await userEvent.click(screen.getByTestId('status-completed'))


      const dateInput = screen.getByRole('textbox', { name: /data de vencimento/i })
      await userEvent.type(dateInput, '31/12/2024')

      const form = container.querySelector('form')
      if (!form) throw new Error('Form not found')
      await act(async () => {
        fireEvent.submit(form)
      })
      
      await waitFor(() => {
        expect(addTask).toHaveBeenCalled()
      })
  })

  it('deve editar uma tarefa existente', async () => {
    const updateTask = jest.fn()
    const setEditingTask = jest.fn()
    const editingTask = {
      id: 1,
      title: 'Tarefa Existente',
      description: 'Descrição existente',
      priority: ETaskPriority.LOW,
      status: ETaskStatus.PENDING,
      completed: false,
      createdAt: new Date(),
      dueDate: new Date('2024-12-31'),
      assignedTo: null
    }

    mockUseTaskStore.mockImplementation((selector) => selector({
      isModalOpen: true,
      editingTask,
      setIsModalOpen: jest.fn(),
      addTask: jest.fn(),
      updateTask,
      setEditingTask
    }))

    const { container } = renderWithProviders(<AddTaskForm />)

    const titleInput = screen.getByRole('textbox', { name: /título/i })
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Tarefa Atualizada')
    
    const [prioritySelect, statusSelect] = screen.getAllByRole('combobox')
    await userEvent.click(prioritySelect)
    await userEvent.click(screen.getByTestId('priority-high'))
    await userEvent.click(statusSelect)
    await userEvent.click(screen.getByTestId('status-completed'))

    const dateInput = screen.getByRole('textbox', { name: /data de vencimento/i })
    await userEvent.clear(dateInput)
    await userEvent.type(dateInput, '31/12/2024')

    const form = container.querySelector('form')
    if (!form) throw new Error('Form not found')
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
      await fireEvent.submit(form)
    })

    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledWith(1, expect.objectContaining({
        assignedTo: null,
        description: "Descrição existente",
        priority: "alta",
        status: "concluída",
        title: "Tarefa Atualizada"
      }));
    });
  })

  it('não deve submeter o formulário se os campos obrigatórios não forem preenchidos', async () => {
    mockUseTaskStore.mockImplementation((selector) => selector({
      isModalOpen: true,
      editingTask: null,
      setIsModalOpen: jest.fn(),
      addTask: jest.fn(),
      updateTask: jest.fn()
    }))

    const { container } = renderWithProviders(<AddTaskForm />)
    
    const form = container.querySelector('form')
    if (!form) throw new Error('Form not found')
    
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0))
      await fireEvent.submit(form)
    })

    expect(screen.getByText('Título é obrigatório')).toBeInTheDocument()
  })

  it('deve fechar o modal ao clicar em cancelar', async () => {
    const setIsModalOpen = jest.fn()
    const onClose = jest.fn()
    mockUseTaskStore.mockImplementation((selector) => selector({
      isModalOpen: true,
      editingTask: null,
      setIsModalOpen,
      addTask: jest.fn(),
      updateTask: jest.fn(),
      setEditingTask: jest.fn()
    }))

    renderWithProviders(<AddTaskForm onClose={onClose} />)
    await userEvent.click(screen.getByText('cancelar'))
    expect(onClose).toHaveBeenCalled()
  })

  it('deve limpar o formulário ao fechar o modal', async () => {
    const setIsModalOpen = jest.fn()
    const setEditingTask = jest.fn()
    const onClose = jest.fn()
    
    mockUseTaskStore.mockImplementation((selector) => selector({
      isModalOpen: true,
      editingTask: null,
      setIsModalOpen,
      setEditingTask,
      addTask: jest.fn(),
      updateTask: jest.fn()
    }))

    renderWithProviders(<AddTaskForm onClose={onClose} />)
    
    await userEvent.type(screen.getByRole('textbox', { name: /título/i }), 'Nova Tarefa')
    await act(async () => {
      await userEvent.click(screen.getByText(/cancelar/i))
    })
    
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled()
      expect(setEditingTask).toHaveBeenCalledWith(null)
    })
  })

  it('deve manter valores ao mudar prioridade e status', async () => {
    const addTask = jest.fn()
    mockUseTaskStore.mockImplementation((selector) => selector({
      isModalOpen: true,
      editingTask: null,
      setIsModalOpen: jest.fn(),
      addTask,
      updateTask: jest.fn()
    }))

    renderWithProviders(<AddTaskForm />)

    await userEvent.type(screen.getByRole('textbox', { name: /título/i }), 'Nova Tarefa')
    await userEvent.type(screen.getByRole('textbox', { name: /descrição/i }), 'Descrição')
    
    const [prioritySelect, statusSelect] = screen.getAllByRole('combobox')
    await userEvent.click(prioritySelect)
    await userEvent.click(screen.getByTestId('priority-high'))
    await userEvent.click(statusSelect)
    await userEvent.click(screen.getByTestId('status-in-progress'))

    expect(screen.getByRole('textbox', { name: /título/i })).toHaveValue('Nova Tarefa')
    expect(screen.getByRole('textbox', { name: /descrição/i })).toHaveValue('Descrição')
  })
}) 