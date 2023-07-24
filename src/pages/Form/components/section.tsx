import { ISectionProps } from "./types";

export default function SectionContainer({
  children,
  ...rest
}: ISectionProps) {
  return <section className="mb-32" {...rest}>{children}</section>;
}
