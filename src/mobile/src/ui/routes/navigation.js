//import { Navigation } from 'react-native-navigation';
import { registerOnboardingScreens } from 'ui/routes/navigation-onboarding';
import { registerWalletScreens } from 'ui/routes/navigation-wallet';
import withSafeAreaView from 'ui/components/SafeAreaView';
/*
import Home from 'ui/views/wallet/Home';
import Loading from 'ui/views/wallet/Loading';
import NewSeedSetup from 'ui/views/onboarding/NewSeedSetup';
import WalletSetup from 'ui/views/onboarding/WalletSetup';
import LanguageSetup from 'ui/views/onboarding/LanguageSetup';
import EnterSeed from 'ui/views/onboarding/EnterSeed';
import SaveYourSeed from 'ui/views/onboarding/SaveYourSeed';
import SetPassword from 'ui/views/onboarding/SetPassword';
import WriteSeedDown from 'ui/views/onboarding/WriteSeedDown';
import SaveSeedConfirmation from 'ui/views/onboarding/SaveSeedConfirmation';
import Login from 'ui/views/wallet/Login';
import WalletResetConfirmation from 'ui/views/wallet/WalletResetConfirmation';
import WalletResetRequirePassword from 'ui/views/wallet/WalletResetRequirePassword';
import OnboardingComplete from 'ui/views/onboarding/OnboardingComplete';
import SetAccountNameComponent from 'ui/views/onboarding/SetAccountName';
import SeedReentry from 'ui/views/onboarding/SeedReentry';
import TwoFactorSetupAddKeyComponent from 'ui/views/wallet/TwoFactorSetupAddKey';
import TwoFactorSetupEnterToken from 'ui/views/wallet/TwoFactorSetupEnterToken';
import Disable2FA from 'ui/views/wallet/Disable2FA';
import FingerprintSetup from 'ui/views/wallet/FingerprintSetup';
import TermsAndConditions from 'ui/views/onboarding/TermsAndConditions';
import PrivacyPolicy from 'ui/views/onboarding/PrivacyPolicy';
import ForceChangePassword from 'ui/views/wallet/ForceChangePassword';
import SeedVaultBackupComponent from 'ui/views/onboarding/SeedVaultBackup';
*/
import { isIPhoneX } from 'libs/device';

export function getGenerator(screen) {
    if (isIPhoneX) {
        return withSafeAreaView(screen);
    }

    return screen;
}

export default function registerScreens(group, store, Provider) {
  if (group === 'onboarding') {
    return registerOnboardingScreens(store, Provider);
  }
  if (group === 'wallet') {
    return registerWalletScreens(store, Provider);
  }

  throw new Error('Invalid group: ' + group);
}
