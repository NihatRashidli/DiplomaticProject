import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        alert("No verification token found.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/auth/verify?token=${token}`
        );

        if (response.status === 200) {
          alert("Email verified successfully!");
          navigate("/login"); // Login səhifəsinə yönləndir
        }
      } catch (error) {
        console.error("Verification failed:", error);
        alert("Verification failed or token expired.");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div>
      <h2>Verifying your email...</h2>
    </div>
  );
};

export default Verify;
