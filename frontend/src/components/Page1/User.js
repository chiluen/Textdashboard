import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Userimage from '../img/User.png';
import { getuserprofile } from '../../axios/Page_1_axios';
import { NameContext } from '../../App';

const Usercard = ()=>{
    const [dataNum, setdataNum] = React.useState(0)
    const [latest, setlatest] = React.useState("0")

    const timeformat = (latest)=>{
        const ll = new Date(latest)
        const new_time = ll.getFullYear() + "/" + (ll.getMonth()+1) + "/" + ll.getDate() + " " + ll.toISOString().slice(11,16)
        return new_time
    }

    React.useEffect( async() => {
        const {dataNum, latest} = await getuserprofile()
        const new_time = timeformat(latest)
        setdataNum(dataNum)
        setlatest(new_time)
    },[]);
    return(
        <Card sx={{ maxWidth: 400 , maxHeight: 400}}>
            <CardMedia
            component="img"
            height="200"
            src={Userimage}
            alt="User Picture"
            />
            <CardContent >
                <Typography color="text.secondary" sx={{ flex: 1 }} >
                    使用者名稱: {React.useContext(NameContext)}
                    
                </Typography>
                <Typography variant='h6'>
                    總共筆數: {dataNum}
                </Typography>
                <Typography variant='h6'>
                    最後更新時間:
                </Typography>
                <Typography variant='h6'>
                    {latest}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Usercard;



