import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Textbox = (props)=> {
  return (
    <Grid container rowSpacing={5} columnSpacing={{ xs: 3, sm: 3, md: 3 }} >
        <Grid item xs={1} >
            <Paper sx={{ width: '100%', height:'60px', overflow: 'hidden', display: 'flex', justifyContent: "center" , alignItems: "center"}}>
                <IconButton aria-label="delete" onClick={()=>{props.func(false)}}>
                    <ArrowBackIcon />
                </IconButton>
            </Paper>
        </Grid>
        
        {/*時間 推文數 ID */}
        <Grid item xs={4} >
            <Paper sx={{ width: '100%', height:'60px', overflow: 'hidden', display: 'flex', justifyContent: "center" , alignItems: "center"}}>
                <Title>時間:{props.content["time"]}</Title> 
            </Paper>
        </Grid>
        <Grid item xs={3}>
            <Paper sx={{ width: '100%', height:'60px', overflow: 'hidden', display: 'flex', justifyContent: "center" , alignItems: "center"}}>
                <Title>分類:{props.content["classification"]}</Title>
            </Paper>
        </Grid>
        <Grid item xs={3} >
            <Paper sx={{ width: '100%', height:'60px', overflow: 'hidden', display: 'flex', justifyContent: "center" , alignItems: "center"}}>
                <Title>ID:{props.content["author"]}</Title>
            </Paper>
        </Grid>
        
        <Grid item xs={12} >
            <Paper sx={{ width: '100%', height:'40rem', overflow: 'auto' }}> {/*overflow可以自動產生scroll bar */}
                <Typography component="p" variant="h4">
                    {props.content['title']}
                </Typography>
                <br/>
                <Typography style={{whiteSpace: 'pre-wrap'}}component="p" variant="h6">
                    {props.content['content']}
                </Typography>
            
            </Paper>
        </Grid>
    </Grid>
  );
}

export default Textbox;