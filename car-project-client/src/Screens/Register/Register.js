import { useEffect, useState } from "react";
import "./Register.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import InputWithValidation from "../../components/UI/Input/Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Home from "../Home/Home";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../../Redux/Action";

function Register() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [emailError, setEmailError] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    checkEmail(data);
  };

  const checkEmail = async (data) => {
    const emailData = {
      email: data.email,
    };
    const response = await axios.post(
      "https://tabletest-production.up.railway.app/user/checkEmail",
      emailData
    );
    if (response.data == "new") {
      register(data);
    } else if (response.data == "exists") {
      setEmailError(true);
    }
  };

  const checkIsLogin = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData != null) {
      await axios
        .get("https://tabletest-production.up.railway.app/user/checkToken", {
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

  const focusEmail = () => {
    setEmailError(false);
  };

  const register = async (data) => {
    try {
      const response = await axios.post(
        "https://tabletest-production.up.railway.app/user/create-user",
        data
      );
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <InputWithValidation
          title={"שם פרטי"}
          type="text"
          name="firstName"
          rules={{
            required: "זהו שדה חובה",
            minLength: { value: 2, message: "בין 2 ל10 ספרות" },
            maxLength: { value: 14, message: "בין 2 ל14 ספרות" },
          }}
          control={control}
        />
        <InputWithValidation
          title={"שם משפחה"}
          type="text"
          name="lastName"
          rules={{
            required: "זהו שדה חובה",
            minLength: { value: 2, message: "בין 2 ל10 ספרות" },
            maxLength: { value: 14, message: "בין 2 ל14 ספרות" },
          }}
          control={control}
        />
        <div className="inputC-control">
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
            focus={focusEmail}
            isFocusFunction={true}
          />
          {emailError && (
            <div className="errorEmail">האימייל שהזנת כבר קיים במערכת</div>
          )}
        </div>
        <InputWithValidation
          title={"מספר פלאפון"}
          type="text"
          name="phoneNumber"
          rules={{
            required: "זהו שדה חובה",
            
            pattern: {
              value: /^(0|[0-9]\d*)(\.\d+)?$/,
              message: "שדה זה מכיל מספרים בלבד",
            },
            minLength: { value: 10, message: "בדיוק 10 ספרות" },
            maxLength: { value: 10, message: "בדיוק 10 ספרות" },
          }}
          control={control}
        />
        <InputWithValidation
          title={"סיסמא"}
          type="text"
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
        />
        <Button onClick={handleSubmit(onSubmit)} innerText={"הרשם"} />
        <Link to="/">יש לך כבר חשבון? לחץ כאן</Link>
      </div>
    </div>
  );
}

export default Register;
