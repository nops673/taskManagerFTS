import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ETaskStatus, Task } from '../../types/Task';

interface TaskStatusChartProps {
  readonly tasks: Task[];
}

const COLORS = ['#ED6C02', '#0288D1', '#2E7D32'];

export function TaskStatusChart({ tasks }: TaskStatusChartProps) {
  const data = [
    {
      name: 'pendente',
      value: tasks.filter(task => task.status === ETaskStatus.PENDING).length
    },
    {
      name: 'em progresso',
      value: tasks.filter(task => task.status === ETaskStatus.IN_PROGRESS).length
    },
    {
      name: 'concluída',
      value: tasks.filter(task => task.status === ETaskStatus.COMPLETED).length
    }
  ];

  return (
    <div style={{ width: '100%', height: 300 }} data-testid="task-status-chart">
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