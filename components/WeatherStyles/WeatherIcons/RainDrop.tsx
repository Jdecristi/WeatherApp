import React, { createRef, useEffect, useState } from 'react';
import { randomBetween } from '../../../helpers/HelperFunctions';

export interface RainDropType {
    position: {x: number, y: number};
}

interface Props {
    position: {x: number; y: number};
}
const RainDrop: React.FC <Props> = (props) => {
    const {position} = props;

    const [reload, updateReload] = useState<number>(0)
    const rainRef = createRef<SVGSVGElement>();

    let speed = 5;

    const dropRain = () => {
        setInterval(() => {
            if (rainRef.current) rainRef.current.style.transform = `translateY(${speed}em)`
            speed += 1.5;
        }, 25)
    }

    useEffect(() => {
        setTimeout(() => {
            if (rainRef.current) {
                rainRef.current.style.left = `${position.x}em`
                rainRef.current.style.top = `${position.y}em`
            }
            dropRain();
            setTimeout(() => updateReload(reload + 1), 2000);
        }, 
        randomBetween(0, 3000))
    }, [reload])
    
    return (
        <>
            <svg className="rain" viewBox="0 0 173 409" ref={rainRef}>
                <path 
                    d="M172.5 283.051C172.5 352.087 137.364 408.051 86.0019 408.051C34.6395 408.051 0.00249495 352.087 1.21163e-07 283.051C-0.00339873 189 71.5019 35.5 86.0019 0C101.502 34 172.5 184.5 172.5 283.051Z" 
                    fill="url(#paint0_radial_266_12)"
                />
                <defs>
                    <radialGradient 
                        id="paint0_radial_266_12" 
                        cx="0" 
                        cy="0" 
                        r="1" 
                        gradientUnits="userSpaceOnUse" 
                        gradientTransform="translate(86 266) rotate(-90) scale(310 145.292)"
                    >
                        <stop stop-color="white"/>
                        <stop offset="1" stop-color="#00F0FF"/>
                    </radialGradient>
                </defs>
            </svg>

            <style jsx>
                {`
                    .rain {
                        position: absolute;
                        width: .5em;
                        transition: translate .5s ease-in-out;
                        z-index: 1;
                    }
                `}
            </style>
        </>
    )
}
export default RainDrop