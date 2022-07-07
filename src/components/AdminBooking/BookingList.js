import React from 'react'
import { GridComponent } from '@syncfusion/ej2-react-grids';
import data from '../datasource.json'
import "./BookingList.css"

export default function BookingList() {
  return (
    <GridComponent dataSource={data}>

    </GridComponent>
  )
}
