import { useEffect, useState } from "react";

const useValidatePassword = (password: string) => {
  const [isValidLength, setIsValidLength] = useState(false);
  const [includedAlphanumeric, setIncludedAlphanumeric] = useState(false);

  useEffect(() => {
    const timer: NodeJS.Timer = setTimeout(() => {
      setIsValidLength(password.length >= 6);
      setIncludedAlphanumeric(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(
          password
        )
      );
      console.log(password?.length);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [password]);

  return { isValidLength, includedAlphanumeric };
};

export default useValidatePassword;
