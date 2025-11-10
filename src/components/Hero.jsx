import {useEffect, useRef} from "react";

const Hero = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if(videoRef.current) videoRef.current.playbackRate = 2;
    }, [])

    return (
        <section id="hero">
            <div>
                <img src="/title.png" alt="Mac Book Pro" />
            </div>

            <video ref= {videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />

            <button>Buy</button>
            <p>From $20 or $ 99/mo for 12 months</p>
        </section>
    )
}

export default Hero;