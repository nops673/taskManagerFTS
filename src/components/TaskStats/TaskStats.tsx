import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';
import { useTaskStore } from '../../stores/taskStore';
import { TaskPriorityChart } from '../TaskPriorityChart/TaskPriorityChart';
import { TaskStatusChart } from '../TaskStatusChart/TaskStatusChart';

const TaskStats: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <Accordion 
      defaultExpanded 
      sx={{ 
        mb: 2, 
        backgroundColor: 'background.default',
        boxShadow: 'none',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ 
          padding: '0 24px',
          '& .MuiAccordionSummary-content': {
            margin: '12px 0',
          },
        }}
      >
        <Typography variant="h6">estatísticas</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ padding: '0 24px 24px' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'background.paper', 
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}>
                <Typography variant="subtitle1" sx={{ mb: 2, alignSelf: 'flex-start' }}>status das tarefas</Typography>
                <Box sx={{ width: '100%', maxWidth: 300 }}>
                  <TaskStatusChart tasks={tasks} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'background.paper', 
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              }}>
                <Typography variant="subtitle1" sx={{ mb: 2, alignSelf: 'flex-start' }}>prioridade das tarefas</Typography>
                <Box sx={{ width: '100%', maxWidth: 300 }}>
                  <TaskPriorityChart tasks={tasks} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TaskStats; 