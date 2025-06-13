import React, { useEffect } from "react";
import * as motion from "motion/react-client";
import { animate, useMotionValue, useTransform } from "motion/react";
import { FaUserFriends, FaHandshake, FaUtensils } from "react-icons/fa";

const stats = [
    {
        icon: <FaUserFriends size={60} className="text-white" />,
        value: 250000,
        label: "FOOD INSECURE SERVED ANNUALLY",
    },
    {
        icon: <FaHandshake size={60} className="text-white" />,
        value: 174,
        label: "AGENCY PARTNERS & PANTRIES",
    },
    {
        icon: <FaUtensils size={60} className="text-white" />,
        value: 30,
        label: "MEALS PROVIDED WITH $10",
    },
];

const Info = () => {
    return (
        <section className="w-full bg-base-200 py-12 my-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-4">
                <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                        We are a member of the <span className="font-bold">Feeding World</span> network, the nation’s largest hunger-relief organization.
                    </h2>
                </div>
                <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-10">
                    {stats.map((stat, idx) => (
                        <StatCircle key={idx} icon={stat.icon} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>
        </section>
    );
};

function StatCircle({ icon, value, label }) {
    // Animated count up
    const count = useMotionValue(0);
    const rounded = useTransform(() => Math.round(count.get()));

    useEffect(() => {
        const controls = animate(count, value, { duration: 2.5 });
        return () => controls.stop();
    }, [count,value]);

    return (
        <div className="flex flex-col items-center">
            <motion.div
                style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    background: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01],
                }}
            >
                {icon}
            </motion.div>
            <motion.pre
                style={{
                    fontSize: 40,
                    color: "#ff8904",
                    fontWeight: 700,
                    margin: 0,
                    textAlign: "center",
                }}
            >
                {rounded}
            </motion.pre>
            <div className="uppercase text-primary text-xs font-semibold text-center mt-1 tracking-wide">
                {label}
            </div>
        </div>
    );
}

export default Info;