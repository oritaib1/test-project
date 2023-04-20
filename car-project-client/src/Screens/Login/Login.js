import "./Login.css";
import { Link } from "react-router-dom";
import InputWithValidation from "../../components/UI/Input/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../Redux/Action";

function Login() {
  const dispatch = useDispatch();

  const [loginError, setLoginError] = useState(false);
  let navigate = useNavigate();
  const rules = {
    required: "זהו שדה חובה",
  };
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    Login(data);
  };

  const checkIsLogin = async () => {
    debugger;
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData != null) {
      await axios
        .get(`https://tabletest-production.up.railway.app/user/checkToken`, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((response) => {
          if (response.data == "valid") {
            dispatch(
              setData({
                firstName: userData.firstName,
                lastName: userData.lastName,
                phoneNumber: userData.phoneNumber,
                email: userData.email,
                id: userData.id,
                token: userData.token,
              })
            );
            navigate("/Info/AllProject");
          }
          console.log(response.data);
        });
    }
  };

  useEffect(() => {
    checkIsLogin();
  });

  const Login = async (data) => {
    const response = await axios.post(`https://tabletest-production.up.railway.app/user/login`, data);
    if (response.data.message === "success") {
      dispatch(
        setData({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          phoneNumber: response.data.user.phoneNumber,
          email: response.data.user.email,
          id: response.data.user.id,
          token: response.data.token,
        })
      );
      localStorage.setItem(
        "userData",
        JSON.stringify({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          phoneNumber: response.data.user.phoneNumber,
          email: response.data.user.email,
          id: response.data.user.id,
          token: response.data.token,
        })
      );
      navigate("/Info/AllProject");
    } else if (response.data === "Invalid email or password.") {
      setLoginError(true);
    }
    console.log(response.data);
  };
  const focusError = () => {
    setLoginError(false);
  };
  return (
    <div className="register-container">
      <div className="register-card">
        <InputWithValidation
          title={"אימייל"}
          type="text"
          name="email"
          rules={{
            required: "זהו שדה חובה",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "כתובת לא חוקית",
            },
          }}
          control={control}
          focus={focusError}
          isFocusFunction={true}
        />
        <InputWithValidation
          title={"סיסמא"}
          type="password"
          name="password"
          rules={{
            required: "זהו שדה חובה",
            pattern: {
              value: /^(0|[0-9]\d*)(\.\d+)?$/,
              message: "שדה זה מכיל מספרים בלבד",
            },
            minLength: { value: 6, message: "שדה זה צריך להכיל 6 מספרים" },
            maxLength: { value: 6, message: "שדה זה צריך להכיל 6 מספרים" },
          }}
          control={control}
          focus={focusError}
          isFocusFunction={true}
        />
        {loginError && <div>האימייל או הסיסמא שהזנת שגויים</div>}
        <Button onClick={handleSubmit(onSubmit)} innerText={"התחבר"} />
        <Link to="/register">עוד אין לך חשבון? לחץ כאן</Link>
      </div>
    </div>
  );
}

export default Login;
