import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const useFloatingHeader = () => {
    const { ref, inView } = useInView({ initialInView: true })
    const [observerElm, setObserverElm] = useState<HTMLElement | null>(null);
    useEffect(() => {
        if (!observerElm || !observerElm.parentElement) {
            return
        }
        if (inView) {
            observerElm.style.width = '100%'
            return
        } else {
            observerElm.style.width = `${observerElm.parentElement.clientWidth}px`
        }
        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                observerElm.style.width = `${entry.target.clientWidth}px`
            });
        });

        observer.observe(observerElm.parentElement);
        return () => observer.disconnect();
    }, [observerElm, inView])

    return {
        ref,
        setObserverElm,
        inView
    }
}

export default useFloatingHeader