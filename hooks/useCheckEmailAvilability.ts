import { useState } from "react";
import axios from "axios";

type EmailAvailabilityStatus =
  | "idle"
  | "checking"
  | "available"
  | "notAvailable"
  | "failed";


  const useCheckEmailAvailability = () => {
    const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
      useState<EmailAvailabilityStatus>("idle");
    const [enteredEmail, setEnteredEmail] = useState<string | null>(null);

    const checkEmailAvailability = async (email: string) => {
      setEmailAvailabilityStatus("checking");
      setEnteredEmail(email);

      try {
        const response = await axios.get<{ exists: boolean }>(
          "http://localhost:3000/api/auth/check-email", // 
          { params: { email } }
        );
        setEmailAvailabilityStatus(
          response.data.exists ? "notAvailable" : "available"
        );
      } catch (error) {
        setEmailAvailabilityStatus("failed");
        console.log("Error checking email availability:", error);
      }
    };

    const resetCheckEmailAvailability = () => {
      setEmailAvailabilityStatus("idle");
      setEnteredEmail(null);
    };

    return {
      emailAvailabilityStatus,
      enteredEmail,
      checkEmailAvailability,
      resetCheckEmailAvailability,
    };
  };

  export default useCheckEmailAvailability;
  