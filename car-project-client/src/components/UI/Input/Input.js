import { useState } from "react";
import "./Input.css";
import { Controller } from "react-hook-form";

function InputWithValidation({
  title,
  name,
  type,
  rules = {},
  isFocusFunction,
  focus,
  control,
  defaultValue,
  secureTextEntry = false,
}) {
  const [isFocus, setIsFocus] = useState(false);

  const focusInput = () => {
    setIsFocus(true);
  };
  const blurInput = (event) => {
    if (event.target.value == "") {
      setIsFocus(false);
    }
    console.log(event.target.value == "");
  };
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value, onBlur },
        fieldState: { error },
      }) => (
        <div className="register-control">
          <span className={isFocus ? "title-focus" : "title"}>{title}</span>
          <input
            className={error && "inputError"}
            type={type}
            onBlur={(event) => {
              onBlur();
              blurInput(event);
            }}
            onChange={onChange}
            onFocus={(event) => {
              focusInput(event);
              if (isFocusFunction) {
                focus();
              }
            }}
            value={value}
            secureTextEntry={secureTextEntry}
          />
          {error && (
            <div className="error">
              <span>{error.message}</span>
            </div>
          )}
        </div>
      )}
    />
  );
}

export default InputWithValidation;
