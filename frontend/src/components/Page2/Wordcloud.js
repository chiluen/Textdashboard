import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ReactWordcloud from 'react-wordcloud';
import { crawldata } from '../../axios/Page_2_axios';

const changeformat = async (data)=>{
  const words = []
  for (var key in data){
    words.push({text: key, value: data[key]})
  }
  return words
}

const Wordcloud = (props)=>{
    const [init, setInit] = React.useState(true)
    const [finish, setFinish] = React.useState(false)
    const [words, setwords] = React.useState("")

    React.useEffect(()=>{
      if(init === true){
        getdata()
      }
    },[init])

    const getdata = async () => {
        setInit(false)
        let data = await crawldata() //take data from backend
        data = await changeformat(data.data)
        setwords(data)
        setTimeout(() => {setFinish(true)}, 100);
    }

    const options = {
      fontFamily: 'courier new',
      fontSizes: [40, 60],
    };

    return(
        <Grid item xs={8} >
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {finish?<ReactWordcloud options={options} words={words} size = {[700, 400]}/>
                    :<LinearProgress />} 
          </Paper>
        </Grid>
    )
}



export default Wordcloud;