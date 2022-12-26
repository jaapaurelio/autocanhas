import { Header } from "components/Header";

// Layout is a Server Component by default
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Header hero></Header>
      <main>{children}</main>
    </>
  );
}
