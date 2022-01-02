import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PageviewIcon from '@mui/icons-material/Pageview';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const MainListItems = (props) =>{
  return(
    <div>
      <ListItem button onClick={()=>{props.func(0)}}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="主介面" />
      </ListItem>
      <ListItem button onClick={()=>{props.func(1)}}>
        <ListItemIcon>
          <CloudDownloadIcon />
        </ListItemIcon>
        <ListItemText primary="爬蟲" />
      </ListItem>
      <ListItem button onClick={()=>{props.func(2)}}>
        <ListItemIcon>
          <PageviewIcon/>
        </ListItemIcon>
        <ListItemText primary="文章概覽" />
      </ListItem>
    </div>
  )
}
export default MainListItems

