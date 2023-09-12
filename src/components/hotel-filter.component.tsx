
import { Rating } from 'react-simple-star-rating';
import './hotel-filter.component.css';
import Counter from './hotel-counter.component';
const HotelFilter = ({adultCount,childrenCount,getRating}: any) => {
    return (
        <div className="filtercantainer">
            <div className="rating">
                <Rating size={23} onClick={getRating} onPointerEnter={(e)=>{e.preventDefault()}}
        onPointerLeave={(e)=>{e.preventDefault()}}
        /></div>
            <div className="adult"><Counter defaultValue={2} label={"Adult"} min={0} max={9} getcount={adultCount}></Counter></div>
            <div className="children"><Counter defaultValue={2} label={"Children"} min={0} max={9} getcount={childrenCount}></Counter></div>
        </div>
    )
}

export default HotelFilter;