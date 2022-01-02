import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import * as React from 'react';

const Startbutton = (props)=>{
    const [finish, setFinish] = React.useState(false)

    return(
        <Grid item xs={8} >
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {finish?<LoadingButton loading loadingIndicator="Get Data" size="large" variant="outlined"></LoadingButton>
                       :<Button style={{backgroundColor: "#21b6ae"}} variant="contained" size="large" onClick={()=>{setFinish(!finish); props.func()}}>抓取最新30筆資料</Button>}
            </Paper>
        </Grid>
    )
}

export default Startbutton;