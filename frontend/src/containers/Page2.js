import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Startbutton from '../components/Page2/Startbutton';
import Wordcloud from '../components/Page2/Wordcloud';

const Page2 = ()=>{
    const [start, setStart] = React.useState(false);
    
    const changeview = ()=>{ 
      setStart(!start)
    }
    
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
          <Grid container spacing={3} alignItems="center" justifyContent="center">
            <Startbutton func={changeview}/>
            {start?<Wordcloud/>:<></>}
          </Grid>
          
        </Container>
      </Box>
    )
}

export default Page2;