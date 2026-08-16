import {
  Cell,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const palette = ['#4f46e5', '#14b8a6', '#f59e0b', '#8b5cf6', '#ef4444', '#0ea5e9', '#84cc16', '#f97316'];

export default function ParticipantsByWorkshopChart({ data }) {
  const totalParticipantes = data.reduce((total, item) => total + item.quantidade, 0);

  return (
    <div className="chart-card" aria-label="Gráfico de participantes por workshop">
      <div className="chart-card__header">
        <div>
          <p className="chart-card__eyebrow">Cobertura</p>
          <h3>Participantes por workshop</h3>
        </div>
      </div>

      <div className="chart-wrapper chart-wrapper--donut">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="quantidade"
              nameKey="nome"
              innerRadius={52}
              outerRadius={88}
              paddingAngle={3}
              stroke="#f8fafc"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`${entry.id ?? entry.nome}-${index}`} fill={palette[index % palette.length]} />
              ))}

              <Label
                position="center"
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} dy="-0.2em" style={{ fontSize: '12px', fill: '#475569', fontWeight: 600 }}>
                          Total
                        </tspan>
                        <tspan x={viewBox.cx} dy="1.6em" style={{ fontSize: '24px', fill: '#0f172a', fontWeight: 700 }}>
                          {totalParticipantes}
                        </tspan>
                      </text>
                    );
                  }

                  return null;
                }}
              />
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} participantes`, 'Participantes']}
              labelFormatter={(label) => `Workshop: ${label}`}
              labelStyle={{ color: '#0f172a' }}
              contentStyle={{ borderRadius: '12px', borderColor: '#dfe7f3' }}
            />
            <Legend
              verticalAlign="bottom"
              height={80}
              wrapperStyle={{ fontSize: '12px', lineHeight: '18px', paddingTop: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
