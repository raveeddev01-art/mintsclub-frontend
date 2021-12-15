import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import { connect } from "react-redux";
import { useSelector } from "react-redux";



const useGaTracker = () => {
    const step=useSelector((state)=>state.dashboard.currentStep)
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (window.location.href.includes("localhost")) {
        ReactGA.initialize("UA-215431628-1");
        }
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized) {
        
            if(location.pathname === '/')
            {

                ReactGA.pageview(location.pathname + location.search );
            }
            else {
                ReactGA.pageview(location.pathname + location.search + `/step${step}`);
            }
        }
    }, [initialized, location, step]);
};

export default useGaTracker;