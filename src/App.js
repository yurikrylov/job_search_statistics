import "./App.css";
import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './Components/Header';
import values from './data.json';

const COLORS = ["#FF6464", "#2A0944", "#A10035", "#3FA796"];
const nameMap = {
  notViewed: 'Не просмотрено',
  viewed: 'Просмотрено',
  rejected: 'Отказ',
  interview: 'Приглашение'

}
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
  data.push({ name: nameMap[v], value: valuesObj[v] })
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
    <Container maxWidth="sm">
      <Header />
      <Typography>Всего отправлено: {values.data.length}</Typography>
      <Typography>Всего проигнорировано : {valuesObj.viewed+valuesObj.notViewed}</Typography>
      <Typography>Всего отказов : {valuesObj.rejected}</Typography>
      <Typography>Всего интервью : {valuesObj.interview}</Typography>
      <Typography>Получено фидбеков после интервью: 2</Typography>
      <PieChart width={400} height={400}>
        <Legend />
        <Pie
          data={data}
          cx={250}
          cy={150}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={140}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </Container>
  );
}

