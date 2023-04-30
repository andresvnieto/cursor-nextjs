import React, { useEffect, useRef, useState } from 'react'
import styles from '@/styles/cursor.module.css'
import gsap from 'gsap';

function Cursor() {
    const [cursorPos, setCursorPos] = useState({
        x: { previous: 0, current: 0, amt: 0.2 },
        y: { previous: 0, current: 0, amt: 0.2 }
    });
    const cursor = useRef(null);
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    useEffect(() => {
        const handleMouseMove = e => {
            //Set Cursor Values
            setCursorPos({
                x: {
                    previous: e.clientX,
                    current: e.clientX,
                    amt: 0.8
                },
                y: {
                    previous: e.clientY,
                    current: e.clientY,
                    amt: 0.8
                }
            })
            //Create animation GSAP
            gsap.to(cursor.current, {
                ease: "Power1.easeOut",
                opacity: 1,
                duration: 1
            })

            function render() {
                setCursorPos({
                    x: {
                        current: e.clientX,
                        previous: lerp(cursorPos.x.previous, cursorPos.x.current, cursorPos.x.amt)
                    },
                    y: {
                        current: e.clientY,
                        previous: lerp(cursorPos.x.previous, cursorPos.x.current, cursorPos.x.amt)
                    }
                })
            }

            requestAnimationFrame(() => render())

        }

        //Cleanup function
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove,
            );
        }
    }, [])

    return (
        <div className={styles.cursor} ref={cursor} style={{
            transform: `translateX(${cursorPos.x.previous}px) translateY(${cursorPos.y.previous}px)`
        }}>
            Cursor: X {cursorPos.x.current} / Y {cursorPos.y.current}
        </div>
    )
}

export default Cursor