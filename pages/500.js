import Error from "next/error";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [])),
      // Will be passed to the page component as props
    },
  };
}

export default function Page() {
  return <Error statusCode={500} />;
}
