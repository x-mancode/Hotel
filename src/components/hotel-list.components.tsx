import React from 'react';
import IHotelsData, { Hotel, HotelRoom, Room } from "../types/hotel.type";
import './hotel.component.css';
import { Rating } from 'react-simple-star-rating';
import HotelImage from './hotel-image.component'

export interface IProps {
    hotelsData: IHotelsData;
}

const Hotellist = (prop: IProps) => {
    const { hotelsData } = prop;
    const {hotels,rooms}=hotelsData;
   
    return (
        <>
            {hotels.map((hotel: Hotel) => (
                <div className="container">
                    <div className="card">
                        <div className="hotel">
                            <div className="box box1">
                            <HotelImage slides={hotel.images} />
                                {/* <img src={hotel.images[0].url} min-width="240px" height="140px" width="240px" alt="HotelImage"></img> */}
                            </div>
                            <div className="box2 box">
                                <div className="box21">
                                    <div className="caption">{hotel.name}</div>
                                    <div className="text">{hotel.address1}</div>
                                    <div className="text">{hotel.address2}</div>
                                </div>
                                <div className="box22">  <Rating  initialValue={hotel.starRating} size={23} /></div>
                            </div>
                        </div>
                        
                        {rooms.find( room=>room.id===hotel.id)?.rooms.map((room: Room) => (
                            <div className="rooms">
                                <div className="box1 box">
                                    <div className="box21">
                                        <div className="caption">{room.name}</div>
                                        <div className="text">Adults:{room.occupancy.maxAdults}</div>
                                        <div className="text">Children:{room.occupancy.maxChildren}</div>
                                    </div>
                                </div>
                                <div className="box2 box text">{room.longDescription}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </>
    )
};

export default Hotellist;