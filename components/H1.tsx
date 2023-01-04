import classnames from "classnames";

interface Props {
  children: React.ReactNode;
  big?: boolean;
  gutterBottom?: boolean;
  gutterTop?: boolean;
  "data-pw"?: string;
}

export default function H1({
  children,
  big,
  gutterBottom,
  gutterTop,
  "data-pw": dataPw = "",
}: Props) {
  return (
    <h1
      data-pw={dataPw}
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
