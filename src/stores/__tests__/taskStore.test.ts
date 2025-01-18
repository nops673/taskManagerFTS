import { act, renderHook } from '@testing-library/react'
import { ETaskPriority, ETaskStatus } from '../../types/Task'
import { useTaskStore } from '../taskStore'

describe('taskStore', () => {
  beforeEach(() => {
    act(() => {
      useTaskStore.setState({
        tasks: [],
        filter: {
          status: null,
          priority: null,
          search: ''
        },
        isModalOpen: false,
        editingTask: null
      })
    })
  })

  it('deve adicionar uma nova tarefa', () => {
    const { result } = renderHook(() => useTaskStore())
    
    act(() => {
      result.current.addTask({
        title: 'Nova Tarefa',
        description: 'Descrição',
        priority: ETaskPriority.HIGH,
        status: ETaskStatus.PENDING,
        id: 1,
        createdAt: new Date(),
        dueDate: new Date(),
        assignedTo: { id: '1', name: 'Usuário 1' }
      })
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Nova Tarefa')
  })

  it('deve atualizar uma tarefa existente', () => {
    const { result } = renderHook(() => useTaskStore())
    
    act(() => {
      result.current.addTask({
        title: 'Tarefa Original',
        description: 'Descrição',
        priority: ETaskPriority.HIGH,
        status: ETaskStatus.PENDING,
        id: 1,
        createdAt: new Date(),
        dueDate: new Date(),
        assignedTo: { id: '1', name: 'Usuário 1' }
      })
    })

    const taskId = result.current.tasks[0].id as number

    act(() => {
      result.current.updateTask(taskId, {
        title: 'Tarefa Atualizada'
      })
    })

    expect(result.current.tasks[0].title).toBe('Tarefa Atualizada')
  })

  it('deve remover uma tarefa', () => {
    const { result } = renderHook(() => useTaskStore())
    
    act(() => {
      result.current.addTask({
        title: 'Tarefa para Remover',
        description: 'Descrição',
        priority: ETaskPriority.HIGH,
        status: ETaskStatus.PENDING,
        id: 1,
        createdAt: new Date(),
        dueDate: new Date(),
        assignedTo: { id: '1', name: 'Usuário 1' }
      })
    })

    const taskId = result.current.tasks[0].id as number

    act(() => {
      result.current.deleteTask(taskId)
    })

    expect(result.current.tasks).toHaveLength(0)
  })

  it('deve filtrar tarefas corretamente', () => {
    const { result } = renderHook(() => useTaskStore())
    
    act(() => {
      result.current.addTask({
        title: 'Tarefa Alta',
        description: 'Descrição',
        priority: ETaskPriority.HIGH,
        status: ETaskStatus.PENDING,
        id: 1,
        createdAt: new Date(),
        dueDate: new Date(),
        assignedTo: { id: '1', name: 'Usuário 1' }
      })
      result.current.addTask({
        title: 'Tarefa Baixa',
        description: 'Descrição',
        priority: ETaskPriority.LOW,
        status: ETaskStatus.COMPLETED,
        id: 2,
        createdAt: new Date(),
        dueDate: new Date(),
        assignedTo: { id: '2', name: 'Usuário 2' }
      })
    })

    act(() => {
      result.current.setFilter({
        priority: ETaskPriority.HIGH,
        status: null,
        search: ''
      })
    })

    expect(result.current.getTasks()).toHaveLength(1)
    expect(result.current.getTasks()[0].priority).toBe(ETaskPriority.HIGH)
  })

  it('deve filtrar tarefas por status corretamente', () => {
    const { result } = renderHook(() => useTaskStore())
    
    act(() => {
      result.current.addTask({
        title: 'Tarefa Pendente',
        description: 'Descrição',
        priority: ETaskPriority.HIGH,
        status: ETaskStatus.PENDING,
        id: 1,
        createdAt: new Date(),
        dueDate: new Date(),
        assignedTo: { id: '1', name: 'Usuário 1' }
      })
      result.current.addTask({
        title: 'Tarefa Completa',
        description: 'Descrição',
        priority: ETaskPriority.LOW,
        status: ETaskStatus.COMPLETED,
        id: 2,
        createdAt: new Date(),
        dueDate: new Date(),
        assignedTo: { id: '2', name: 'Usuário 2' }
      })
    })

    act(() => {
      result.current.setFilter({
        priority: null,
        status: ETaskStatus.COMPLETED,
        search: ''
      })
    })

    expect(result.current.getTasks()).toHaveLength(1)
    expect(result.current.getTasks()[0].status).toBe(ETaskStatus.COMPLETED)
  })

  it('deve filtrar tarefas por texto de busca', () => {
    const { result } = renderHook(() => useTaskStore())
    
    act(() => {
      result.current.addTask({
        title: 'Reunião de Projeto',
        description: 'Descrição',
        priority: ETaskPriority.HIGH,
        status: ETaskStatus.PENDING,
        id: 1,
        createdAt: new Date(),
        dueDate: new Date(),
        assignedTo: { id: '1', name: 'Usuário 1' }
      })
      result.current.addTask({
        title: 'Revisão de Código',
        description: 'Descrição',
        priority: ETaskPriority.LOW,
        status: ETaskStatus.PENDING,
        id: 2,
        createdAt: new Date(),
        dueDate: new Date(),
        assignedTo: { id: '2', name: 'Usuário 2' }
      })
    })

    act(() => {
      result.current.setFilter({
        priority: null,
        status: null,
        search: 'Reunião'
      })
    })

    expect(result.current.getTasks()).toHaveLength(1)
    expect(result.current.getTasks()[0].title).toContain('Reunião')
  })

  it('deve gerenciar o estado do modal corretamente', () => {
    const { result } = renderHook(() => useTaskStore())
    
    expect(result.current.isModalOpen).toBe(false)

    act(() => {
      result.current.setIsModalOpen(true)
    })

    expect(result.current.isModalOpen).toBe(true)
  })

  it('deve gerenciar a tarefa em edição corretamente', () => {
    const { result } = renderHook(() => useTaskStore())
    const task = {
      title: 'Tarefa Test',
      description: 'Descrição',
      priority: ETaskPriority.HIGH,
      status: ETaskStatus.PENDING,
      id: 1,
      createdAt: new Date(),
      dueDate: new Date(),
      assignedTo: { id: '1', name: 'Usuário 1' }
    }
    
    expect(result.current.editingTask).toBeNull()

    act(() => {
      result.current.setEditingTask(task)
    })

    expect(result.current.editingTask).toEqual(task)
  })
}) 