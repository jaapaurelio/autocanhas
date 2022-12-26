import classnames from "classnames";

interface Props {
  children: React.ReactNode;
  big?: boolean;
  gutterBottom?: boolean;
  gutterTop?: boolean;
}

export default function H1({ children, big, gutterBottom, gutterTop }: Props) {
  return (
    <h1
      className={classnames({
        "text-2xl": !big,
        "text-5xl font-bold": big,
        "mb-8": gutterBottom,
        "mt-14": gutterTop,
      })}
    >
      {children}
    </h1>
  );
}
