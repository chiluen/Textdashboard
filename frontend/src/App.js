import * as React from 'react';
import Dashboard from './containers/Dashboard';
import SignIn from './containers/SignIn';

const NameContext = React.createContext()
const LOCALSTORAGE_KEY = "save-user"

const App =() =>{
  const saveduser = localStorage.getItem(LOCALSTORAGE_KEY)
  const [user,setuser] = React.useState(saveduser || "")
  const [start,setstart] = React.useState(false)

  const username = (name)=>{
    localStorage.setItem(LOCALSTORAGE_KEY, name);
    setuser(name)
    setstart(true)
  }
  
  return (
    <NameContext.Provider value = {user}>
      {start?<Dashboard/>:<SignIn func={username} name={user}/>}
    </NameContext.Provider>
  );
}
export {NameContext};
export default App;
