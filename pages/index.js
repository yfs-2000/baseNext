import styles from "../styles/Home.module.css";
import useBearStore from "store/useBearStore";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Button } from "@chakra-ui/react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useEnsName, useClient } from "wagmi";
import { useState, useEffect } from "react";
export default function Home() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
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
    <div className={styles.container}>
      <div>
        {t("count")}:{bears}
      </div>
      <Button colorScheme="teal" onClick={increasePopulation}>
        {t("clickAdd")}
      </Button>
      {connectors.map((connector) => (
        <Button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {/*{!connector.ready && " (unsupported)"}*/}
          {/*{isLoading &&*/}
          {/*  connector.id === pendingConnector?.id &&*/}
          {/*  " (connecting)"}*/}
        </Button>
      ))}
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
