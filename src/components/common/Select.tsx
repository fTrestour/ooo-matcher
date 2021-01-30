import { SelectHTMLAttributes } from "react";

export const Select: React.FC<
  {
    options: readonly (
      | undefined
      | string
      | { label: string; value: string | number | undefined }
    )[];
  } & SelectHTMLAttributes<HTMLSelectElement>
> = ({ options, ...props }) => (
  <select {...props}>
    {options.map((option) => (
      <option
        value={option && typeof option !== "string" ? option.value : option}
        key={option && typeof option !== "string" ? option.label : option}
      >
        {option && typeof option !== "string" ? option.label : option}
      </option>
    ))}
  </select>
);
