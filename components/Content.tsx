interface Props {
  children: React.ReactNode;
  className?: string;
  "data-pw"?: string;
}

export default function Content({
  children,
  className = "",
  "data-pw": dataPw,
}: Props) {
  return (
    <div
      data-pw={dataPw}
      className={`max-w-6xl mx-auto grow px-4 md:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
