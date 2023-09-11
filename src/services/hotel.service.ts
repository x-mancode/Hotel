import axios from "axios";
import IHotelsData from "../types/hotel.type" 
const baseUrl: string = process.env.REACT_APP_URL ?? "";
const collectionid = process.env.REACT_APP_COLLECTION_ID ?? "";

export const getHotelData= async()=>{

}


export const getAPIData = async ():Promise<IHotelsData>  => {

    const hotelURL: string = `${baseUrl}/hotels`
    const hotels = await axios.get(hotelURL, {
      params: { 'collection-id': collectionid }
    })
      .then(res => ({ data: res.data, error: null, }))
      .catch(res => ({ data: [], error: 'error', }));
  
    //const hotelIds = hotels.data.map((hotel: any) => hotel.id);
  
    const urls = hotels.data.map((hotel: any) => {
      if (hotel.hotelId != null || hotel.id !== "") {
        return { id: hotel.id, url: `${baseUrl}/roomRates/${collectionid}/${hotel.id}` };
      }
    })
  
    const requests = urls.map((url: any) => axios.get(url.url));
    const response = await axios.all(requests).then((responses: any) => responses);
  
    const rooms = urls.map((url: any, index: number) => { return { id: url.id, rooms: response[index].status === 200 ? response[index].data.rooms : [] } });
    return new Promise((resolve, reject) => {
      hotels.data.length>0?resolve({hotels:hotels.data,rooms:rooms}):reject({error:true}); 
    });
  }
  
  