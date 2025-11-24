import {useMediaQuery} from "react-responsive";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const Showcase = () => {
    const isTablet = useMediaQuery({query: '(max-width: 1024px)'});

        useGSAP(() => {
            if(!isTablet) {
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: '#showcase',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true,
                        pin: true,
                    }
                });
                timeline.to('.mask img', {
                    transform: 'scale(1.1)'
                }).to('.content', { opacity: 1, y: 0, ease: 'power1.in'})
            }
        }, [isTablet])


    return (
        <section id="showcase">
            <div className="media">
                <video src="/videos/game.mp4" loop muted autoPlay playsInline/>
                <div className="mask">
                    <img src="/mask-logo.svg" alt="chip name" />
                </div>
            </div>

            <div className="content py-20">
                <div className="wrapper max-w-7xl mx-auto px-6
                  grid grid-cols-1 lg:grid-cols-2
                  gap-20 items-center">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-5xl font-semibold">Rocket Chip</h2>

                        <div className="space-y-5 mt-7 max-w-lg">
                            <p>
                                Introducing{" "}
                                <span className="text-white font-semibold">
            M4, the next generation of Apple silicon.
          </span>{" "}
                                M4 powers
                            </p>

                            <p>
                                It drives Apple Intelligence on iPad Pro, so you can write, create,
                                and accomplish more with ease. All in a design that's unbelievably
                                thin, light, and powerful.
                            </p>

                            <p>
                                A brand-new display engine delivers breathtaking precision, color
                                accuracy, and brightness. And a next-gen GPU with hardware-accelerated
                                ray tracing brings console-level graphics to your fingertips.
                            </p>

                            <p className="text-primary font-medium">
                                Learn more about Apple intelligence...
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col justify-center space-y-14 text-left lg:text-right">

                        {/* Block 1 */}
                        <div className="space-y-2">
                            <p className="text-gray-300">Up to</p>
                            <h3 className="text-4xl font-semibold">4x faster</h3>
                            <p className="text-gray-300">pro rendering performance than M2</p>
                        </div>

                        {/* Block 2 */}
                        <div className="space-y-2">
                            <p className="text-gray-300">Up to</p>
                            <h3 className="text-4xl font-semibold">1.5x faster</h3>
                            <p className="text-gray-300">CPU performance than M2</p>
                        </div>

                    </div>

                </div>
            </div>


        </section>
    )
}

export default Showcase;