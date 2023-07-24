import { IButtonProps } from "./types";

export default function Button({ children, ...props }: IButtonProps) {
  const {variant,className, ...rest} = props;
  return (
    <button  className={`h-12 btn-${variant} ${className} `} {...rest}>
      {children}
    </button>
  );
}
 