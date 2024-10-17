import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setPath } from "@/redux/slices/navigation/navigationSlice";

const RouteListener = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPath(location.pathname));
  }, [location.pathname, dispatch]);

  return null;
};

export default RouteListener;
