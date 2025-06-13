import React, { useEffect, useRef } from "react";
import { animate, hover } from "motion";
import { splitText } from "motion-plus";
import { useMotionValue } from "motion/react";

const RemoveHunger = () => {
    const containerRef = useRef(null);
    const velocityX = useMotionValue(0);
    const velocityY = useMotionValue(0);
    const prevEvent = useRef(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const { chars } = splitText(containerRef.current.querySelector(".hunger-h1"));

        const handlePointerMove = (event) => {
            const now = performance.now();
            const timeSinceLastEvent = (now - prevEvent.current) / 1000; // seconds
            prevEvent.current = now;
            velocityX.set(event.movementX / timeSinceLastEvent);
            velocityY.set(event.movementY / timeSinceLastEvent);
        };

        document.addEventListener("pointermove", handlePointerMove);

        hover(chars, (element) => {
            const speed = Math.sqrt(
                velocityX.get() * velocityX.get() +
                velocityY.get() * velocityY.get()
            );
            const angle = Math.atan2(velocityY.get(), velocityX.get());
            const distance = speed * 0.1;

            animate(
                element,
                {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                },
                { type: "spring", stiffness: 100, damping: 50 }
            );
        });

        return () => {
            document.removeEventListener("pointermove", handlePointerMove);
        };
    }, []);

    return (
        <section className="px-5 my-12 flex flex-col items-center">
            <h2 className="text-3xl md:text-3xl font-bold mb-2">Remove Hunger</h2>
            <p className="text-neutral/40 mb-6 text-center">Hover on the hunger text below to see magic</p>
            <div className="rounded-2xl border border-base-300 bg-base-100 p-6 w-full max-w-6xl mx-auto" ref={containerRef}>
                <h1 className="hunger-h1 text-2xl md:text-3xl font-bold text-center select-none">
                    Hunger. Hunger. Hunger. Hunger. Hunger. Hunger. Hunger. Hunger. Hunger.
                </h1>
                <style>{`
                    .split-char {
                        will-change: transform, opacity;
                        display: inline-block;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default RemoveHunger;