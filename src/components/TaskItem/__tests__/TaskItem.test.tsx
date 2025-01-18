import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ETaskPriority, ETaskStatus, Task } from '../../../types/Task'
import { TaskItem } from '../TaskItem'

describe('TaskItem', () => {
  const mockTask: Task = {
    id: 1,
    title: 'Tarefa teste',
    createdAt: new Date(),
    priority: ETaskPriority.LOW,
    status: ETaskStatus.PENDING,
    description: '',
    dueDate: null,
    assignedTo: null
  }
  
  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('deve renderizar corretamente com os dados da tarefa', () => {
    render(
      <TaskItem 
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Tarefa teste')).toBeInTheDocument()
  })

  it('deve chamar onEdit quando o botão de editar é clicado', async () => {
    render(
      <TaskItem 
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    await userEvent.click(screen.getByTitle('editar tarefa'))
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask)
  })

  it('deve chamar onDelete quando o botão de excluir é clicado', async () => {
    render(
      <TaskItem 
        task={mockTask}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    await userEvent.click(screen.getByTitle('excluir tarefa'))
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id)
  })
}) 