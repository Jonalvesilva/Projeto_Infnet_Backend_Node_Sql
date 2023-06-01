export type TextFieldProps = {
  className?: string;
  onKeyDown?: (event: Event) => void;
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  name?: string;
};

export function TextField({
  className,
  value,
  placeholder,
  name,
  onChange,
}: TextFieldProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      className={className}
      name={name}
      type="text"
    />
  );
}
