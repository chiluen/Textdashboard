import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { gethottitle } from '../../axios/Page_1_axios';

const WordList = () => {
    const [datas, setdatas] = React.useState(["","","","",""]);
    const [secondary, setSecondary] = React.useState();

    React.useEffect( async()=>{
        const data = await gethottitle()
        setdatas([data["0"], data["1"], data["2"], data["3"]])
    },[])

    return (
        <>
            <Typography style={{ fontSize:20}} sx={{ mt: 4, mb: 2 }} variant="h5" component="div" align="center">
                熱門文章前四名(前30筆)
            </Typography>
            <List>
            {datas.map((data)=>{
                return(
                    <ListItem>
                        <ListItemIcon>
                            <CheckCircleOutlineIcon style={{fill: "#FEC89A"}}/>
                        </ListItemIcon>
                        <ListItemText
                            align="left"
                            
                            primary={<Typography style={{ color: '#ff6f00',fontSize:15}}>{data}</Typography>}
                            secondary={secondary ? 'Secondary text' : null}
                        />
                    </ListItem>
                )
            })}
            </List>
        </>
    );
}
export default WordList;