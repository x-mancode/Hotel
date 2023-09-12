import axios from "axios";
import IHotelsData from "../types/hotel.type"

const baseUrl: string = process.env.REACT_APP_URL ?? "";
const collectionid = process.env.REACT_APP_COLLECTION_ID ?? "";

export const getAPIData = async (): Promise<IHotelsData> => {
  try {
    //Get Hotel and Rooms data and cre
    const hotelURL: string = `${baseUrl}/hotels`
    const hotels = await axios.get(hotelURL, {
      params: { 'collection-id': collectionid }
    })
      .then(res => ({ data: res.data, error: null, }))
      .catch(res => ({ data: [], error: 'error', }));

    if (hotels.data.length === 0) {
      throw new Error('No data found!')
    }

    const urls = hotels.data.map((hotel: any) => {
      if (hotel.hotelId != null || hotel.id !== "") {
        return { id: hotel.id, url: `${baseUrl}/roomRates/${collectionid}/${hotel.id}` };
      }
    })

    const requests = urls.map((url: any) => axios.get(url.url));
    const response = await axios.all(requests).then((responses: any) => responses);

    const rooms = urls.map((url: any, index: number) => { return { id: url.id, rooms: response[index].status === 200 ? response[index].data.rooms : [] } });

    return new Promise((resolve, reject) => {
      hotels.data.length > 0 ? resolve({ hotels: hotels.data, rooms: rooms }) : resolve({ hotels: [], rooms: [] });
    });

  } catch (error) {
    return new Promise((resolve, reject) => {
      resolve({ hotels: [], rooms: [] })
    });
  }

}

