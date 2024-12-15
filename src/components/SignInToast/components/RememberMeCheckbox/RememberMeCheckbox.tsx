import "./RememberMeCheckbox.css";

type RememberMeCheckboxProps = {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
};

export const RememberMeCheckbox = ({
  isChecked,
  setIsChecked,
}: RememberMeCheckboxProps) => {
  return (
    <div className="SignInToast-CheckboxWrapper">
      <input
        type="checkbox"
        id="rememberMe"
        name="rememberMe"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label htmlFor="rememberMe">Remember me</label>
    </div>
  );
};
