import React, { useState, useEffect } from 'react';
import IHotelsData, { Hotel, Room } from "../types/hotel.type";
import './hotel.component.css';
import { Rating } from 'react-simple-star-rating';
import HotelFilter from './hotel-filter.component';
import HotelImage from './hotel-image.component'

export interface IProps {
    hotelsData: IHotelsData;
}

const Hotellist = (prop: IProps) => {

    const { hotelsData } = prop;
    const { hotels, rooms } = hotelsData;
    const [rating, setRating] = useState(0);
    const [adultcount, setAdultCount] = useState(0);
    const [childrencount, setChildrenCount] = useState(0);
    const [filteredHotels, setFilteredHotels] = useState(hotels);
    const [filteredRooms, setFilteredRooms] = useState(rooms);

    useEffect(() => {
        FilterData();
    }, [rating, adultcount, childrencount, hotels, rooms]);

    const FilterData = () => {
        const tempRooms = rooms.map(
            rooms => (
                {
                    ...rooms, rooms: rooms.rooms
                        .filter((room: Room) => room.occupancy.maxAdults >= adultcount
                            && room.occupancy.maxChildren >= childrencount)
                }))
            .filter(rooms => (rooms.rooms.length > 0));
        setFilteredRooms(tempRooms);
        setFilteredHotels(hotels.filter(hotel => hotel.starRating >= rating)
            .filter(hotel => tempRooms.some(rooms => rooms.id === hotel.id)));
    }

    return (
        <>
            <div>
                <div className='header'>
                    {<HotelFilter adultCount={setAdultCount} childrenCount={setChildrenCount} getRating={setRating}></HotelFilter>}
                </div>
                <div className='main'>
                    {filteredHotels.map((hotel: Hotel) => (
                        <div className="container">
                            <div className="card">
                                <div className="hotel">
                                    <div className="box box1">
                                        <HotelImage slides={hotel.images} />
                                    </div>
                                    <div className="box2 box">
                                        <div className="box21">
                                            <div className="caption">{hotel.name}</div>
                                            <div className="text">{hotel.address1}</div>
                                            <div className="text">{hotel.address2}</div>
                                        </div>
                                        <div className="box22">  <Rating initialValue={hotel.starRating} size={23} readonly /></div>
                                    </div>
                                </div>

                                {filteredRooms
                                    .find(room => room.id === hotel.id)
                                    ?.rooms
                                    .map((room: Room) => (
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
                </div>
            </div>
        </>
    )
};

export default Hotellist;