import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { performanceImages } from "../constants/index.js";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Text animation - runs on all devices
            gsap.from('.content p', {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.content',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });

            // Desktop image timeline - only on screens ≥1024px
            const isDesktop = window.innerWidth >= 1024;

            if (isDesktop) {
                // Get p5 position as center reference
                const p5Element = section.querySelector('.p5');
                if (!p5Element) return;

                const p5Rect = p5Element.getBoundingClientRect();
                const sectionRect = section.getBoundingClientRect();

                // Calculate p5's center position relative to section
                const centerLeft = ((p5Rect.left - sectionRect.left) / sectionRect.width) * 100;
                const centerBottom = ((sectionRect.bottom - p5Rect.bottom) / sectionRect.height) * 100;

                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1
                    }
                });

                // Define starting positions - all clustered near p5's center
                const startPositions = {
                    '.p1': { left: `${centerLeft - 2}%`, bottom: `${centerBottom - 2}%`, opacity: 0, scale: 0.8 },
                    '.p2': { left: `${centerLeft + 2}%`, bottom: `${centerBottom - 2}%`, opacity: 0, scale: 0.8 },
                    '.p3': { left: `${centerLeft - 3}%`, bottom: `${centerBottom + 1}%`, opacity: 0, scale: 0.8 },
                    '.p4': { left: `${centerLeft + 3}%`, bottom: `${centerBottom + 1}%`, opacity: 0, scale: 0.8 },
                    // .p5 is skipped entirely
                    '.p6': { left: `${centerLeft - 1}%`, bottom: `${centerBottom - 3}%`, opacity: 0, scale: 0.8 },
                    '.p7': { left: `${centerLeft + 1}%`, bottom: `${centerBottom - 3}%`, opacity: 0, scale: 0.8 }
                };

                // Define final positions from constants
                const endPositions = {
                    '.p1': { left: '5%', bottom: '10%', opacity: 1, scale: 1 },
                    '.p2': { right: '5%', left: 'auto', bottom: '10%', opacity: 1, scale: 1 },
                    '.p3': { left: '20%', bottom: '15%', opacity: 1, scale: 1, transform: 'translateX(-50%)' },
                    '.p4': { right: '20%', left: 'auto', bottom: '15%', opacity: 1, scale: 1, transform: 'translateX(50%)' },
                    '.p6': { left: '12%', bottom: '20%', opacity: 1, scale: 1 },
                    '.p7': { right: '12%', left: 'auto', bottom: '20%', opacity: 1, scale: 1 }
                };

                // Set initial positions (clustered in center)
                Object.entries(startPositions).forEach(([selector, props]) => {
                    gsap.set(selector, props);
                });

                // Add all animations to timeline at time 0 (simultaneous scroll-controlled animation)
                Object.entries(endPositions).forEach(([selector, props]) => {
                    timeline.to(selector, {
                        ...props,
                        duration: 1,
                        ease: 'power2.inOut'
                    }, 0);
                });
            }
        }, section);

        // Handle resize and refresh ScrollTrigger
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ctx.revert();
        };
    }, []);

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. GAME ON!</h2>

            <div className="wrapper">
                {performanceImages.map(({id, src}) => (
                    <img
                        key={id}
                        src={src}
                        alt={id}
                        className={id}
                    />
                ))}
            </div>

            <div className="content">
                <p>Run graphics-intensive workflows with a responsiveness that keeps up with your imagination.
                    The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing
                    engine that renders images faster, so
                    {' '}<span className="text-white">
                        gaming feels more emmersive and realistic that ever
                    </span>{' '}
                    . And
                    Dynamic Caching optimizes fast on-chip memory to dramatically increase increase average GPU
                    utilization - driving a huge performance boost for the most demanding pro apps and game
                </p>
            </div>
        </section>
    )
}

export default Performance;