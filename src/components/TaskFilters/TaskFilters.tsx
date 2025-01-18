import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useTaskStore } from '../../stores/taskStore';
import { ETaskPriority, ETaskStatus } from '../../types/Task';

type SortOption = 'createdAsc' | 'createdDesc' | 'dueAsc' | 'dueDesc';

const TaskFilters: React.FC = () => {
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  return (
    <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <TextField
        data-testid="search-input"
        label="Buscar"
        value={filter.search}
        onChange={(e) => setFilter({ search: e.target.value })}
      />
      
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>status</InputLabel>
        <Select
          data-testid="status-select"
          value={filter.status ?? ''}
          onChange={(e) => setFilter({ status: e.target.value as ETaskStatus })}
          label="status"
        >
          <MenuItem value="">todos</MenuItem>
          <MenuItem value={ETaskStatus.PENDING}>pendente</MenuItem>
          <MenuItem value={ETaskStatus.IN_PROGRESS}>em progresso</MenuItem>
          <MenuItem value={ETaskStatus.COMPLETED}>concluída</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>prioridade</InputLabel>
        <Select
          data-testid="priority-select"
          value={filter.priority ?? ''}
          onChange={(e) => setFilter({ priority: (e.target.value as ETaskPriority) || null })}
          label="prioridade"
        >
          <MenuItem value="">todas</MenuItem>
          <MenuItem value={ETaskPriority.LOW}>baixa</MenuItem>
          <MenuItem value={ETaskPriority.MEDIUM}>média</MenuItem>
          <MenuItem value={ETaskPriority.HIGH}>alta</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>ordenar por</InputLabel>
        <Select
          data-testid="sort-select"
          value={filter.sortBy ?? ''}
          label="ordenar por"
          onChange={(e) => setFilter({ sortBy: e.target.value as SortOption })}
        >
          <MenuItem value="">nenhum</MenuItem>
          <MenuItem value="createdAsc">data de criação (antiga → nova)</MenuItem>
          <MenuItem value="createdDesc">data de criação (nova → antiga)</MenuItem>
          <MenuItem value="dueAsc">data de vencimento (próxima → distante)</MenuItem>
          <MenuItem value="dueDesc">data de vencimento (distante → próxima)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TaskFilters; 