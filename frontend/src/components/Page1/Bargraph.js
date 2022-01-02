import * as React from 'react';
import { Bar } from "react-chartjs-2";
import 'chart.js/auto' //這一定要加
import { getclassification } from '../../axios/Page_1_axios';

const state_sample = {
    labels: ["體育", "社會", "娛樂", "教育", "財經", "家居", "科技"],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: ["#FEC5BB", "#FAE1DD", "#E8E8E4", "#ECE4DB", "#FFE5D9","#FFD7BA","#FEC89A"], 
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [0,0,0,0,0,0,0]
      }
    ]
}
const options = {
  plugins:{
    title: {
      display: true,
      text: '最近30筆資料',
      font: {
        size: 20
      },

    },
  },
  maintainAspectRatio: false, //要加上這個，然後用div就可以調整資料了
  indexAxis: 'y',
}

const Bargraph = () => {
  const [state, setstate] = React.useState(state_sample)

  React.useEffect(async(
  )=>{
    const data = await getclassification("partial_forbar")
    
    const state_new = {

      labels: ["體育", "社會", "娛樂", "教育", "財經", "家居", "科技"],
      
      datasets: [
        {
          label: "Number of Post",
          backgroundColor: ["#FEC5BB", "#FAE1DD", "#E8E8E4", "#ECE4DB", "#FFE5D9","#FFD7BA","#FEC89A"], 
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [data["體育"], data["社會"], data["娛樂"], data["教育"], data["財經"], data["家居"], data["科技"]],
        }
      ]
    }
    setstate(state_new)
  },[])

  return (
      <div style={{height:"300px"}}>
        <Bar 
        options={options}
        data={state}
        />
      </div>
  );
}

export default Bargraph;





