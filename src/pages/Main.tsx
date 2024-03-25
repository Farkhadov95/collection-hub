import { useEffect } from "react";
import MainContent from "../components/main/MainContent";

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <MainContent />;
};

export default Main;
