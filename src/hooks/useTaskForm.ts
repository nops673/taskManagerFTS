import React, { useCallback, useMemo, useState } from 'react';
import { ETaskPriority, ETaskStatus, Task } from '../types/Task';
import { User } from '../types/User';

interface UseTaskFormProps {
  onSubmit: (task: Task) => Promise<void>;
  initialTask?: Task | null;
}

export const useTaskForm = (props: UseTaskFormProps) => {
  const { onSubmit, initialTask } = props;
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [dueDate, setDueDate] = useState<Date | null>(initialTask?.dueDate ? new Date(initialTask.dueDate) : null);
  const [priority, setPriority] = useState<ETaskPriority>(initialTask?.priority ?? ETaskPriority.LOW);
  const [status, setStatus] = useState<ETaskStatus>(initialTask?.status ?? ETaskStatus.PENDING);
  const [assignedTo, setAssignedTo] = useState<User | null>(initialTask?.assignedTo ?? null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSubmit({
        id: initialTask?.id ?? null,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : null,
        priority,
        status,
        assignedTo,
        createdAt: initialTask?.createdAt ? new Date(initialTask.createdAt) : new Date()
      });
    } finally {
      setLoading(false);
    }
  }, [title, description, dueDate, priority, status, assignedTo, initialTask, onSubmit]);

  const handlers = useMemo(() => ({
    setTitle,
    setDescription,
    setDueDate,
    setPriority,
    setStatus,
    setAssignedTo,
    handleSubmit
  }), [setTitle, setDescription, setDueDate, setPriority, setStatus, setAssignedTo, handleSubmit]);

  const formData = useMemo(() => ({
    title,
    description,
    dueDate,
    priority,
    status,
    assignedTo,
    loading
  }), [title, description, dueDate, priority, status, assignedTo, loading]);

  return { formData, handlers };
}; 