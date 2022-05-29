import React, { createRef, useEffect } from 'react';

export interface CelestialBodyType {
    insideColor: string;
    outsideColor: string;
    size: number;
    position: {x: number, y: number};
    zIndex: number;
}

interface Props {
    insideColor: string;
    outsideColor: string;
    size: number;
    position: {x: number; y: number}
    zIndex: number;
}
const CelestialBody: React.FC <Props> = (props) => {
    const {insideColor, outsideColor, size, position, zIndex} = props;

    const bodyRef = createRef<SVGSVGElement>();

    const parallax = (e: MouseEvent) => {
        const x = (e.pageX * zIndex) / -5000;
        const y = (e.pageY * zIndex) / -5000;
        
        if (bodyRef.current) bodyRef.current.style.transform = `translate(${x}em, ${y}em)`;
    }

    useEffect(() => {
        if (bodyRef.current) {
            bodyRef.current.style.left = `${position.x}em`
            bodyRef.current.style.top = `${position.y}em`
        }
    
        document.addEventListener('mousemove', parallax);

        return () => {
            document.removeEventListener('mousemove', parallax);
        }
    },)
    
    return (
        <>
            <svg className="celestial-body" viewBox="0 0 250 250" ref={bodyRef}>
                <circle cx="125" cy="125" r="125" fill={`url(#paint0_radial_266_${size})`}/>
                <defs>
                    <radialGradient id={`paint0_radial_266_${size}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(125 125) rotate(90) scale(125)">
                        <stop stopColor={insideColor}/>
                        <stop offset="1" stopColor={outsideColor}/>
                    </radialGradient>
                </defs>
            </svg>

            <style jsx>
                {`
                    .celestial-body {
                        position: absolute;
                        width: ${size}em;
                        height: ${size}em;
                        transition: translate .5s ease-in-out;
                        z-index: ${zIndex};
                    }
                `}
            </style>
        </>
    )
}
export default CelestialBody