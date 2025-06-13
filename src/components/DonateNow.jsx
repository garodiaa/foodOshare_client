import React, { useEffect, useRef } from "react";
import { animate, stagger } from "motion";
import { splitText } from "motion-plus";
import { useNavigate } from "react-router";

const DonateNow = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.fonts.ready.then(() => {
            if (!containerRef.current) return;

            const { chars } = splitText(
                containerRef.current.querySelector(".wavy")
            );
            containerRef.current.style.visibility = "visible";

            const staggerDelay = 0.15;

            animate(
                chars,
                { y: [-20, 20] },
                {
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    duration: 2,
                    delay: stagger(
                        staggerDelay,
                        { startDelay: -staggerDelay * chars.length }
                    ),
                }
            );
        });
    }, []);

    return (
        <section className="px-5 my-16 flex flex-col items-center">
            <div className="donate-wavy-container" ref={containerRef}>
                <h2 className="text-3xl md:text-3xl font-bold text-center mb-4">
                    What are you waiting for?{" "}
                    <span className="wavy text-primary">Donate Now</span>
                </h2>
            </div>
            <button
                className="btn btn-primary btn-outline mt-6 px-8 py-3 text-lg"
                onClick={() => navigate('/add-food')}
            >
                Donate Now
            </button>
            <style>{`
                .donate-wavy-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    visibility: hidden;
                }
                .split-char {
                    will-change: transform, opacity;
                    display: inline-block;
                }
            `}</style>
        </section>
    );
};

export default DonateNow;