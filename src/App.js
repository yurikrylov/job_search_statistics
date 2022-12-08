import "./App.css";
import React  from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import values from './data.json';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const valuesObj = {};
values.data.forEach((v => {
    if (valuesObj.hasOwnProperty(v.stat)) {
        valuesObj[v.stat] = valuesObj[v.stat] + 1;
    } else {
        valuesObj[v.stat] = 1;
    }
}))

const data = []
Object.keys(valuesObj).forEach((v) => {
    data.push({ name: v, value: valuesObj[v] })
})
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function App() {
  return (
    <PieChart width={400} height={400}>
      <Legend />
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

