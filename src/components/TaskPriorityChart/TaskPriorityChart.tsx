import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ETaskPriority, Task } from '../../types/Task';

interface TaskPriorityChartProps {
  readonly tasks: Task[];
}

const COLORS = ['#2E7D32', '#ED6C02', '#D32F2F'];
export const TaskPriorityChart: React.FC<TaskPriorityChartProps> = ({ tasks }) => {

    const data = [
        {
          name: 'baixa',
          value: tasks.filter(task => task.priority === ETaskPriority.LOW).length
        },
        {
          name: 'média',
          value: tasks.filter(task => task.priority === ETaskPriority.MEDIUM).length
        },
        {
          name: 'alta',
          value: tasks.filter(task => task.priority === ETaskPriority.HIGH).length
        }
      ];
  return (
    <div style={{ width: '100%', height: 300 }} data-testid="task-priority-chart">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ value }) => value}
            labelLine={false}
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[data.indexOf(entry)]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
} 