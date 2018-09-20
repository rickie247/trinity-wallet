import { Navigation } from 'react-native-navigation';
import Home from 'ui/views/wallet/Home';
import Loading from 'ui/views/wallet/Loading';
import Login from 'ui/views/wallet/Login';
import WalletResetConfirmation from 'ui/views/wallet/WalletResetConfirmation';
import WalletResetRequirePassword from 'ui/views/wallet/WalletResetRequirePassword';
import TwoFactorSetupAddKeyComponent from 'ui/views/wallet/TwoFactorSetupAddKey';
import TwoFactorSetupEnterToken from 'ui/views/wallet/TwoFactorSetupEnterToken';
import Disable2FA from 'ui/views/wallet/Disable2FA';
import FingerprintSetup from 'ui/views/wallet/FingerprintSetup';
import { getGenerator } from 'ui/routes/navigation';

export function registerWalletScreens(store, Provider) {
  Navigation.registerComponent('home', () => getGenerator(Home), store, Provider);
  Navigation.registerComponent('loading', () => getGenerator(Loading), store, Provider);
  Navigation.registerComponent('login', () => getGenerator(Login), store, Provider);
  Navigation.registerComponent('walletResetConfirm', () => getGenerator(WalletResetConfirmation), store, Provider);
  Navigation.registerComponent(
      'walletResetRequirePassword',
      () => getGenerator(WalletResetRequirePassword),
      store,
      Provider,
  );
  Navigation.registerComponent(
      'twoFactorSetupAddKey',
      () => getGenerator(TwoFactorSetupAddKeyComponent),
      store,
      Provider,
  );
  Navigation.registerComponent(
      'twoFactorSetupEnterToken',
      () => getGenerator(TwoFactorSetupEnterToken),
      store,
      Provider,
  );
  Navigation.registerComponent('disable2FA', () => getGenerator(Disable2FA), store, Provider);
  Navigation.registerComponent('fingerprintSetup', () => getGenerator(FingerprintSetup), store, Provider);
}
