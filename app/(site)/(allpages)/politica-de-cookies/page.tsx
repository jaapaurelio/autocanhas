import Content from "components/Content";
import H1 from "components/H1";
import H2 from "components/H2";

export default async function Page() {
  return (
    <Content>
      <H1 gutterTop gutterBottom>
        Política de Cookies
      </H1>
      <H2 gutterTop>O que são cookies?</H2>
      <p>
        Os cookies são ficheiros que têm pequenos fragmentos de informação que é
        descarregada do seu dispositivo quando visita um website. Para que
        servem os cookies? Ajudam o Website a memorizar informações sobre a sua
        visita, como o seu idioma preferido e outras definições. Isto pode
        facilitar a sua próxima visita e tornar o Website mais útil para si. Os
        cookies desempenham um papel importante. Sem eles, utilizar a Web seria
        uma experiência muito mais frustrante. Os cookies aumentam a eficiência
        da navegação nos websites. Com certeza já adicionou um artigo num
        carrinho de compras de uma loja online e, passados alguns dias, ao
        voltar ao website, verificou que o artigo ainda se encontrava no seu
        carrinho? Este é um dos exemplos de utilização de cookies.
      </p>

      <H2 gutterTop>Porque utilizamos os cookies?</H2>
      <p>
        A utilização de Cookies na internet é usual e não prejudica os
        computadores dos utilizadores. Os Cookies executam diversas funções,
        nomeadamente auxiliar os responsáveis do website a perceber o modo como
        este é utilizado, facilitando a respetiva navegação, guardando as suas
        preferências e, de modo geral, melhorando a sua experiência de
        utilização, servindo ainda para garantir que o website lhe mostra
        conteúdo relevante.
      </p>

      <H2 gutterTop>Que tipo de cookies utilizamos?</H2>
      <p>
        Este website utiliza os seguintes tipos de cookies: Cookies permanentes
        - são cookies que ficam armazenados ao nível do browser nos seus
        equipamentos de acesso (pc, mobile e tablet) e que são utilizados sempre
        que faz uma nova visita a um dos nossos websites. Cookies de sessão -
        são cookies temporários que permanecem no arquivo de cookies do seu
        browser até sair do website. A informação obtida por estes cookies serve
        para analisar padrões de tráfego na web, permitindo-nos identificar
        problemas e fornecer uma melhor experiencia de navegação.
      </p>

      <H2 gutterTop>Como controlar os cookies?</H2>
      <p>
        Você detém o poder de desligar os seus cookies, nas opções do seu
        browser, ou efetuando alterações nas ferramentas de programas
        Anti-Virus, como o Norton Internet Security. No entanto, isso poderá
        alterar a forma como interage com o nosso website, ou outros websites.
        Isso poderá afetar ou não permitir que faça logins em programas, sites
        ou fóruns da nossa e de outras redes.
      </p>
    </Content>
  );
}
