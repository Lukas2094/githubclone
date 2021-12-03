import React from 'react';
import Heatmap from 'react-calendar-heatmap';
import { subYears , isBefore , isSameDay , addDays } from 'date-fns';

import { Container } from './styles';

type HeatmapValue = { date: Date; count: number};

const RandomCalendar: React.FC = () => {
  const startDate = subYears(new Date(), 1);
  const endDate = new Date();

  return (
    <Container>
       <div className="wrapper">
           <Heatmap 
            startDate={startDate}
            endDate={endDate}
            values={generateHeatmapValues(startDate,endDate)}
            gutterSize={3.5}
            classForValue={(item:HeatmapValue) => {
              let clampedCount = 0;

              if(item != null) {
                clampedCount = Math.max(item.count, 0); // 0
                clampedCount = Math.min(item.count, 4); // 4
              }

              return `scale-${clampedCount}`;
            }}
            showWeekdayLabels
            />
       </div>
       
       <span>Random calendar (do not represent actual data) </span>
    </Container>

    
  );
};

const generateHeatmapValues = (startDate:Date, endDate:Date ) => {
      const values: HeatmapValue[] = [];

      let currentdate = startDate;

      while(isBefore(currentdate,endDate) || isSameDay(currentdate,endDate) ) {
          const count = Math.random() * 4;
       
      // Decimais 
      
          values.push({date: currentdate,count:Math.round(count) });

          currentdate = addDays(currentdate,1);
      }

      return values;
}

export default RandomCalendar;