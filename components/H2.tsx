import classnames from "classnames";

interface Props {
  children: React.ReactNode;
  gutterTop?: boolean;
}

export default function H2({ children, gutterTop }: Props) {
  return (
    <h2
      className={classnames("text-lg font-bold mb-5", {
        "mt-10": gutterTop,
      })}
    >
      {children}
    </h2>
  );
}
