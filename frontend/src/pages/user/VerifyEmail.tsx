import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../../reducers/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../network/hooks";

const VerifyEmail = () => {
  const dispatch = useAppDispatch();
  const { isLoading, message } = useAppSelector((state) => state.auth);

  const params = useParams();

  useEffect(() => {
    if (params.token) {
      dispatch(verifyEmail({ id: params.id, verifyToken: params.token }));
    }
  }, [dispatch, params.id, params.token]);

  return (
    <>
      <div className="flex items-center justify-center mt-[240px]">
        {isLoading ? (
          <div>Loading....</div>
        ) : (
          <div>
            <span>{message as string}</span>
            {message === "Email Verified Successfully" && (
              <div className="text-center pt-4">
                <Link to="/auth/login">
                  <span className="text-[#fff]">Login</span>
                </Link>
              </div>
            )}
             <div className="text-center pt-4">
                <Link to="/auth/login">
                  <span className="text-[#fff]">Login</span>
                </Link>
              </div>
          </div>
          
        )}
      </div>
    </>
  );
};

export default VerifyEmail;
