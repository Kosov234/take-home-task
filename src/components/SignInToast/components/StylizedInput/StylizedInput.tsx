import { HTMLInputTypeAttribute, useState } from "react";
import classNames from "classnames";

import "./StylizedInput.css";

type StylizedInputProps = {
  value: string;
  setValue: (value: string) => void;
  validationRegex: RegExp;
  errorText: string;
  type: HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
};

export const StylizedInput = ({
  value,
  setValue,
  validationRegex,
  errorText,
  type,
  name,
  placeholder,
}: StylizedInputProps) => {
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!validationRegex.test(e.target.value)) {
      setError(errorText);
    } else {
      setError("");
    }

    setValue(e.target.value);
  };

  return (
    <div className="StylizedInput-Wrapper">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={classNames("StylizedInput", {
          "has-error": error,
        })}
        value={value}
        onChange={handleChange}
      />
      <span className="StylizedInput-Error">{error}</span>
    </div>
  );
};
