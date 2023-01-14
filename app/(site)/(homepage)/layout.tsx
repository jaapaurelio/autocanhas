import Header from "components/Header";
import WhatsAppFloat from "components/WhatsAppFloat";

// Layout is a Server Component by default
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Header hero />
      <main>{children}</main>
      <WhatsAppFloat fixed />
    </>
  );
}
