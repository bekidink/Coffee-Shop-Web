import React from 'react'
import WeeklySalesChart from './WeeklySalesChart'
import BestSellingProductChart from './BestSellingProductChart'

const DashboardCharts = ({sales}) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <WeeklySalesChart/>
      <BestSellingProductChart/>
    </div>
  )
}

export default DashboardCharts
