import useBearStore from "store/useBearStore";
import useTokenStore from "store/useTokenStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useAccount, useConnect, useEnsName, useClient } from "wagmi";
import { useState, useEffect } from "react";
import { login } from "../api/login";
import useHydration from "../hooks/store/useHydration";
export default function Home() {
  const bears = useBearStore((state) => state.bears);
  const token = useTokenStore((state) => state.token);
  const hasHydrated = useHydration();
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const setToken = useTokenStore((state) => state.setToken);
  const { t } = useTranslation(); //多个json时  需要声明

  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect, connectors, connectAsync, isLoading, pendingConnector } =
    useConnect();

  const client = useClient();

  const [isAutoConnecting, setIsAutoConnecting] = useState(false);

  //自动链接
  useEffect(() => {
    if (isAutoConnecting) return;
    if (isConnected) return;

    setIsAutoConnecting(true);

    const autoConnect = async () => {
      const lastUsedConnector = client.storage?.getItem("wallet");

      const sorted = lastUsedConnector
        ? [...connectors].sort((x) => (x.id === lastUsedConnector ? -1 : 1))
        : connectors;

      for (const connector of sorted) {
        if (!connector.ready || !connector.isAuthorized) continue;
        const isAuthorized = await connector.isAuthorized();
        if (!isAuthorized) continue;

        await connectAsync({ connector });
        break;
      }
    };
    autoConnect();
  }, []);
  return (
    <div>
      {hasHydrated && (
        <div onClick={() => setToken("123213123")}>token{token}</div>
      )}
      <div>{address}</div>
      <div>
        {t("count")}:{bears}
      </div>
    </div>
  );
}
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
