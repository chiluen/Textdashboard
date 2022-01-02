import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Usercard from '../components/Page1/User';
import Piegraph from '../components/Page1/Piegraph';
import Bargraph from '../components/Page1/Bargraph';
import WordList from '../components/Page1/WordFrequency';

const Page1 = ()=>{
    return(
        <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container rowSpacing={5} columnSpacing={{ xs: 30, sm: 30, md: 53}} > 
            {/* Usercard */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                  width: 300
                }}
              >
                <Usercard /> 
              </Paper>
            </Grid>
            {/* 圓餅圖，統計Database種類個數 */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                  width:400
                }}
              >
                <Piegraph />
              </Paper>
            </Grid>

            {/* WordFrequent */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 400,
                  width: 300
                }}
              >
                <WordList />
              </Paper>
            </Grid>
            {/* Bar graph */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height:300}}>
                <Bargraph />
              </Paper>
            </Grid>
          </Grid>
          
        </Container>
      </Box>
    )
}

export default Page1;