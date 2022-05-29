import React, { createRef, useEffect } from 'react';


const LighningBolt: React.FC = () => {
    const lightningRef = createRef<SVGSVGElement>();

    const parallax = (e: MouseEvent) => {
        const x = (e.pageX * 2) / -500;
        const y = (e.pageY * 2) / -500;
        
        if (lightningRef.current) lightningRef.current.style.transform = `translate(${x}em, ${y}em)`;
    }

    useEffect(() => {
    
        document.addEventListener('mousemove', parallax);

        return () => {
            document.removeEventListener('mousemove', parallax);
        }
    },)
    
    return (
        <>
            <svg className="lightning-bolt" viewBox="0 0 99 245" ref={lightningRef}>
                <path 
                    d="
                        M30.0119 242.722C28.6148 245.766 24.0364 244.579 24.2942 241.24L32.7505 131.731C32.8851 129.988 31.5073
                        128.5 29.7594 128.5L3.58942 128.5C1.71945 128.5 0.305164 126.808 0.637042 124.968L22.555 3.43121C22.8126
                        2.00278 24.0559 0.963654 25.5074 0.963654H95.4324C97.4943 0.963654 98.9416 2.99573 98.2676 4.94437L69.877
                        87.0193C69.2029 88.9679 70.6502 91 72.7121 91H94.9668C97.1534 91 98.6054 93.2641 97.6934 95.2514L30.0119
                        242.722Z
                    " 
                    fill="#FFD600"
                />
            </svg>

            <style jsx>
                {`
                    .lightning-bolt {
                        position: absolute;
                        top: 16.5em;
                        left: 15em;
                        width: 3em;
                        transition: translate .5s ease-in-out;
                        z-index: 15;
                    }
                `}
            </style>
        </>
    )
}
export default LighningBolt