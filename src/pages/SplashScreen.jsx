import { useEffect } from "react";
import { useLocation } from "wouter";
import { HashLoader } from "react-spinners";
import "../styles/splashStyle.css";

const SplashScreen = () => {
    const [, setLocation] = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLocation("/login");
        }, 3000);

        return () => clearTimeout(timer);
    }, [setLocation]);

    return (
        <div className="splashContainer">
            <div className="centeredContent">
                <HashLoader size={90} color="#78CFFD" loading />
            </div>
        </div>
    )
}

export default SplashScreen;