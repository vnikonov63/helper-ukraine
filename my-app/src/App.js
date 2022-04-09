import {useState, useEffect} from "react";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css'

function App() {
  const [drivers, setDrivers] = useState([])

useEffect(() => {
  fetch("/getDrivers", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => setDrivers(data))
 }, [])

  return (
    <div>
      <h1>🇺🇦 Drivers of San Diego 🇺🇦</h1>
      <h2>Availible ✅ Доступний Доступный</h2>
      <Table data={drivers.filter(driver => driver.status == "waiting")}>
        <Column width={100} resizable>
          <HeaderCell>Имя</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Фамилия</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Телефон</HeaderCell>
          <Cell dataKey="phone" />
        </Column>
      </Table>
      <h2>On a Mission 🚗 На місію На задании</h2>
      <Table data={drivers.filter(driver => driver.status == "driving")}>
        <Column width={100} resizable>
          <HeaderCell>Имя</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Фамилия</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Телефон</HeaderCell>
          <Cell dataKey="phone" />
        </Column>
      </Table>
      <h2>Resting 🛌🏾 Відпочиває Отдыхает</h2>
      <Table data={drivers.filter(driver => driver.status == "resting")}>
        <Column width={100} resizable>
          <HeaderCell>Имя</HeaderCell>
          <Cell dataKey="firstName" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Фамилия</HeaderCell>
          <Cell dataKey="lastName" />
        </Column>

        <Column width={100} resizable>
          <HeaderCell>Телефон</HeaderCell>
          <Cell dataKey="phone" />
        </Column>
      </Table>
    <p>if you have any questions about this website please call +1-858-905-1941. My name is Vasya (Copper Cheddar, Limbo)</p>
    </div>
    
  );
}

export default App;
