import styles from './App.module.css';
import { Buffer } from 'buffer';
import { Toaster } from 'react-hot-toast';
import { MainBlock } from 'components/MainBlocks/MainBlock/MainBlock';
import { useEffect, useState } from 'react';
import { useAuthStore } from 'stores/auth.store';
import { ProfileBlock } from 'components/ProfileBlocks/ProfileBlock/ProfileBlock';
import { ServiceMessage } from 'interfaces/service.interface';
import { ConfirmBlock } from 'components/ConfirmBlocks/ConfirmBlock/ConfirmBlock';


window.Buffer = Buffer;

const App: React.FC = () => {
  const { isAuthorized, checkAuth } = useAuthStore();

  const [serviceMessage, setServiceMessage] = useState<ServiceMessage | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const domain = urlParams.get('domain');

    if (message && domain) {
      setServiceMessage({
        message: decodeURIComponent(message),
        domain: decodeURIComponent(domain)
      });
    }
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 2000,
        }}
      />
      <div className={styles.wrapper}>
        {
          serviceMessage ?
            <ConfirmBlock isAuthorized={isAuthorized} serviceMessage={serviceMessage} />
          : !isAuthorized ?
            <MainBlock />
          : <ProfileBlock />
        }
      </div>
    </>
  );
};

export default App;
