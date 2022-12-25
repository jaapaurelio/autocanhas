interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Content = ({ children, className }: Props) => {
  return (
    <div className={`max-w-6xl mx-auto grow px-10 ${className}`}>
      {children}
    </div>
  );
};
