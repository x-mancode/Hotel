
import "./hotel-counter.component.css";
import React, { useState } from "react";

const Counter = ({defaultValue,label,min,max,getcount}: any) => {
    let [count, setCount] = useState(0);

    const incrementCount = () => {
        count = count!==max?count + 1:count;
        getcount(count);
        setCount(count);
    }

    const decrementCount = () => {
        count = count!==min?count - 1:count;
        getcount(count);
        setCount(count);
    }

    return (
        <div className="counter">
            <div>{label}</div>
            <button onClick={incrementCount}>+</button>
            <div>{count}</div>
            <button onClick={decrementCount}>-</button>
        </div>
    );
}

export default Counter;