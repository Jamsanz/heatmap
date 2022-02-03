import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import IData from './interfaces/IData';
import 'react-calendar-heatmap/dist/styles.css';
import IResult from './interfaces/IResult';

const App = ():JSX.Element => {
  const [data, setData] = useState<IData[]>();
  const [dateData, setDateData] = useState<any>();


 const group = (array: Array<any>) => {
    return array.reduce((acc, obj) => {
      const property = obj["date"];
      acc[property] = acc[property] || [];
      acc[property].push(obj);
      return acc;
    }, {});
  };
  const creditTotal = (data: Array<IData>): number => {
    let total = 0;
    data.map((d) => {
      if (d.transactionType === 'credit') {
        return total += d.amount;
      }
    })
    return total;
  }
  const debitTotal = (data: Array<IData>): number => {
    let total = 0;
    data.map((d, i) => {
      if (d.transactionType === 'debit') {
        return total += d.amount;
      }
    })
    return total;
  }
  const total = (data: Array<IData>): number =>{
    return data.reduce((a: any, b: any) =>{
      return a + b.amount;
    },0)
  }
  const sort = (data: Array<any>): Array<any> => {
    return data.sort((a, b) => +new Date(a.date) - +new Date(b.date))
  }

  const numberWithCommas = (x:number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  

  const title = (value: IResult): string => {
    if (value?.total === undefined) return `No transaction`
    return `
    ${value?.date} 
    Credit: ${numberWithCommas(Math.floor(value?.creditTotal))}, 
    Debit: ${numberWithCommas(Math.floor(value?.debitTotal))}, 
    Total: ${numberWithCommas(Math.floor(value?.total))}`
  }

  useEffect(()=>{
    fetch('http://localhost:5000/transactions')
      .then(res => res.json())
      .then(res => setData(res))
      .catch(e => console.error(e));
    }, []);
    
    useEffect(()=>{
      
      if (data) {
        let sampleDate = group(data!);
        const date = Object.keys(sampleDate).map((date, index) =>{
          return sampleDate[date].map((d: IData) => {
            return {date: d.date, amount: d.amount, transactionType: d.transactionType}
          })
        });

        const value = date.map((data, index)=>{
          return {date: Object.keys(sampleDate)[index], total: total(data), creditTotal: creditTotal(data), debitTotal: debitTotal(data)};
        });
        setDateData(value);

      }

      
    }, [data]);


  return (
    <div className="grid place-items-center w-full h-[100vh]">
      <div className="w-full px-12 md:px-0 md:w-[60vw]">
        {dateData && 
          <CalendarHeatmap
            startDate={new Date('2019-01-01')}
            endDate={new Date('2019-12-31')}
            values={sort(dateData)}
            titleForValue={title}
            showWeekdayLabels
            classForValue={(value)=>{
              if (!value) return 'color-empty';
              if(value.creditTotal > value.debitTotal) return 'positive-2';
              return 'negative'
            }}
          />
        }
      </div>
    </div>
  );
}

export default App;
