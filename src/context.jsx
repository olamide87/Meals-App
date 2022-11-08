import React, {useContext,useEffect} from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  useEffect(()=>{
    console.log('fetch data here')
  },[]) 
  return <AppContext.Provider value={{name:'john', role:'student'}}>
    {children}
  </AppContext.Provider>
}

export const useGlobalContext = () =>{
  return useContext(AppContext)
}



export { AppContext, AppProvider }
