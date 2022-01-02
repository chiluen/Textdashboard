import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Table from '../components/Page3/Table';
import Textbox from '../components/Page3/Textbox';

const Page3 = ()=>{
    const [Tablepage, setTablepage] = React.useState(0) //用來控制目前在Table的第幾頁
    const [Paragraph, setParagraph] = React.useState(false) //控制現在是不是進到文章頁面
    const [data, setData] = React.useState({})

    const changeparagraph = (pagenumber, row)=>{ 
        setParagraph(true)
        setTablepage(pagenumber) //保存之前瀏覽到哪個page
        setData(row)
    }   
    const constructparagraph = ()=>{
        return<Textbox func={setParagraph} content={data}/>
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
            {Paragraph?constructparagraph():<Table nowpage={Tablepage} func={changeparagraph}/>}
        </Container>
      </Box>
    )
}

export default Page3;