import { useDispatch, useSelector } from "react-redux";
import { getAccessToken, getUserType } from "../redux/user/selectors";
import { useEffect } from "react";
import { instance } from "../http/instance";
import { getUserInfoThunk } from "../redux/user/operations";
import {
  getCoursesInstuctionsThunk,
  getGeneralInstuctionsThunk,
} from "../redux/instruction/operations";
import { getCategoriesThunk } from "../redux/category/operations";
import { getCoursesThunk } from "../redux/course/operations";

export const useInitialData = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(getAccessToken);
  const userType = useSelector(getUserType);

  useEffect(() => {
    if (accessToken) {
      instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      dispatch(getUserInfoThunk());
    }
    dispatch(getCategoriesThunk());
    dispatch(getCoursesThunk());
    // eslint-disable-next-line
  }, [accessToken]);

  useEffect(() => {
    if (accessToken && userType === "student") {
      dispatch(getCoursesInstuctionsThunk());
    }
    // eslint-disable-next-line
  }, [accessToken, userType]);

  useEffect(() => {
    dispatch(getGeneralInstuctionsThunk());
    // eslint-disable-next-line
  }, []);
};
