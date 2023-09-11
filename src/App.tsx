import React, { useEffect, useState} from 'react';
import { getAPIData } from './services/hotel.service'
import IHotelsData from "./types/hotel.type" 
import  Hotellist  from "./components/hotel-list.components";
function App() {

  const [hoteslData, setState] = useState<IHotelsData>();
  useEffect(() => {
    getAPIData().then(res=>setState(res));
  }, []);

  return ( 
   <>
    {hoteslData && <Hotellist hotelsData={hoteslData}></Hotellist>}
   </>
  );
}

export default App;
