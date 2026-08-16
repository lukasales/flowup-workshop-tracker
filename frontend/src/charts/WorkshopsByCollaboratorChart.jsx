import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const formatTickName = (value) => value.split(' ')[0];

export default function WorkshopsByCollaboratorChart({ data }) {
  return (
    <div className="chart-card" aria-label="Gráfico de workshops por colaborador">
      <div className="chart-card__header">
        <div>
          <p className="chart-card__eyebrow">Participação</p>
          <h3>Workshops por colaborador</h3>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 20, left: -10, bottom: 60 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#dfe6ef" />
            <XAxis
              dataKey="nome"
              tick={{ fontSize: 11, fill: '#475569' }}
              tickFormatter={formatTickName}
              angle={-18}
              textAnchor="end"
              interval={0}
              height={70}
              stroke="#64748b"
            />
            <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#475569' }} stroke="#64748b" />
            <Tooltip
              cursor={{ fill: 'rgba(79, 70, 229, 0.08)' }}
              formatter={(value) => [`${value} workshops`, 'Participações']}
              labelFormatter={(label) => `Colaborador: ${label}`}
              labelStyle={{ color: '#0f172a' }}
              contentStyle={{ borderRadius: '12px', borderColor: '#dfe7f3' }}
            />
            <Bar dataKey="quantidade" fill="#4f46e5" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
