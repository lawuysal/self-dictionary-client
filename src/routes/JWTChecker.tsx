import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/slices/auth/authSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function JWTChecker() {
  const { token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp! < currentTime) {
        dispatch(logoutAction());
        toast({
          title: "Session expired",
          description: "Please log in again",
          variant: "destructive",
        });
      }
    }
  }, [token, dispatch, location.pathname, toast]);

  return null;
}
