import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTaskForm } from "../../hooks/useTaskForm";
import { ETaskPriority, ETaskStatus } from "../../types/Task";
import { PESSOAS_DISPONIVEIS } from "../../types/User";

interface TaskFormFieldsProps {
  formData: ReturnType<typeof useTaskForm>['formData'];
  handlers: ReturnType<typeof useTaskForm>['handlers'];
  errors: Record<string, string>;
}

export const TaskFormFields = ({ formData, handlers, errors }: TaskFormFieldsProps) => {
  const { title, description, dueDate, priority, status, assignedTo, loading } = formData;
  const { setTitle, setDescription, setDueDate, setPriority, setStatus, setAssignedTo } = handlers;


  const handleAssignedToChange = (e: SelectChangeEvent<string>) => {
    const pessoaFiltrada = PESSOAS_DISPONIVEIS.find(pessoa => pessoa.id === e.target.value);
    if (pessoaFiltrada) {
      setAssignedTo(pessoaFiltrada);
    }
  };
  return (
    <>
      <TextField
        fullWidth
        label="título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
        disabled={loading}
        error={!!errors.title}
        helperText={errors.title}
      />
      
      <TextField
        fullWidth
        label="descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={3}
        required
        disabled={loading}
        error={!!errors.description}
        helperText={errors.description}
        />

      <DatePicker
        label="data de vencimento"
        value={dueDate}
        onChange={(newValue) => setDueDate(newValue)}
        slotProps={{ 
          textField: { 
            fullWidth: true, 
            margin: 'normal', 
            required: true,
            disabled: loading,
            error: !!errors.dueDate,
            helperText: errors.dueDate
          } 
        }}
        disabled={loading}
      />

      <FormControl fullWidth margin="normal" required disabled={loading}>
        <InputLabel>prioridade</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value as ETaskPriority)}
          label="prioridade"
          error={!!errors.priority}
        >
          <MenuItem value={ETaskPriority.LOW} data-testid="priority-low">{ETaskPriority.LOW}</MenuItem>
          <MenuItem value={ETaskPriority.MEDIUM} data-testid="priority-medium">{ETaskPriority.MEDIUM}</MenuItem>
          <MenuItem value={ETaskPriority.HIGH} data-testid="priority-high">{ETaskPriority.HIGH}</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" required disabled={loading}>
        <InputLabel>status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as ETaskStatus)}
          label="status"
          error={!!errors.status}
        >
          <MenuItem value={ETaskStatus.PENDING} data-testid="status-pending">{ETaskStatus.PENDING}</MenuItem>
          <MenuItem value={ETaskStatus.IN_PROGRESS} data-testid="status-in-progress">{ETaskStatus.IN_PROGRESS}</MenuItem>
          <MenuItem value={ETaskStatus.COMPLETED} data-testid="status-completed">{ETaskStatus.COMPLETED}</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" required disabled={loading}>
        <InputLabel>responsável</InputLabel>
        <Select
          value={assignedTo?.id ?? ''}
          onChange={handleAssignedToChange}
          label="responsável"
          error={!!errors.assignedTo}
        >
          <MenuItem value="">Nenhum</MenuItem>
          {PESSOAS_DISPONIVEIS.map((pessoa) => (
            <MenuItem key={pessoa.id} value={pessoa.id}>
              {pessoa.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>    

    </>
  );
}; 