import * as React from 'react';
import { Doughnut } from "react-chartjs-2";
import 'chart.js/auto' //這一定要加
import { getclassification } from '../../axios/Page_1_axios';

const labels = ["體育", "社會", "娛樂", "教育", "財經", "家居", "科技"]

const datasets_sample = [
    {
      data: [0,0,0,0,0,0,0],
      backgroundColor: ["#FEC5BB", "#FAE1DD", "#E8E8E4", "#ECE4DB", "#FFE5D9","#FFD7BA","#FEC89A"]
    }
]

const options = {
  plugins:{
    title: {
      display: true,
      text: '資料庫類別總覽',
      font: {
        size: 20
      },
    },
    legend:{
      display:true,
      position:'right'
    }
  },
}
const Piegraph = () => {
  const [datasets, setdataset] = React.useState(datasets_sample)

  React.useEffect( async()=>{
    //抓目前所有的資料
    let data = await getclassification("all")
    let new_data = [
      {
        data:[data["體育"], data["社會"], data["娛樂"], data["教育"], data["財經"], data["家居"], data["科技"]],
        backgroundColor: ["#FEC5BB", "#FAE1DD", "#E8E8E4", "#ECE4DB", "#FFE5D9","#FFD7BA","#FEC89A"]
      }
    ]
    setdataset(new_data)
  },[])

  return (
      <div>
        <Doughnut
        options={options}
        data={{
            labels: labels,
            datasets: datasets
        }}
        />
      </div>
  );
}

export default Piegraph;