import { Navigation } from 'react-native-navigation';
import NewSeedSetup from 'ui/views/onboarding/NewSeedSetup';
import WalletSetup from 'ui/views/onboarding/WalletSetup';
import LanguageSetup from 'ui/views/onboarding/LanguageSetup';
import EnterSeed from 'ui/views/onboarding/EnterSeed';
import SaveYourSeed from 'ui/views/onboarding/SaveYourSeed';
import SetPassword from 'ui/views/onboarding/SetPassword';
import WriteSeedDown from 'ui/views/onboarding/WriteSeedDown';
import SaveSeedConfirmation from 'ui/views/onboarding/SaveSeedConfirmation';
import OnboardingComplete from 'ui/views/onboarding/OnboardingComplete';
import SetAccountNameComponent from 'ui/views/onboarding/SetAccountName';
import SeedReentry from 'ui/views/onboarding/SeedReentry';
import TermsAndConditions from 'ui/views/onboarding/TermsAndConditions';
import PrivacyPolicy from 'ui/views/onboarding/PrivacyPolicy';
import ForceChangePassword from 'ui/views/wallet/ForceChangePassword';
import SeedVaultBackupComponent from 'ui/views/onboarding/SeedVaultBackup';
import { getGenerator } from 'ui/routes/navigation';

export function registerOnboardingScreens(store, Provider) {
  Navigation.registerComponent('newSeedSetup', () => getGenerator(NewSeedSetup), store, Provider);
  Navigation.registerComponent('walletSetup', () => getGenerator(WalletSetup), store, Provider);
  Navigation.registerComponent('enterSeed', () => getGenerator(EnterSeed), store, Provider);
  Navigation.registerComponent('saveYourSeed', () => getGenerator(SaveYourSeed), store, Provider);
  Navigation.registerComponent('setPassword', () => getGenerator(SetPassword), store, Provider);
  Navigation.registerComponent('writeSeedDown', () => getGenerator(WriteSeedDown), store, Provider);
  Navigation.registerComponent('languageSetup', () => getGenerator(LanguageSetup), store, Provider);
  Navigation.registerComponent('onboardingComplete', () => getGenerator(OnboardingComplete), store, Provider);
  Navigation.registerComponent('setAccountName', () => getGenerator(SetAccountNameComponent), store, Provider);
  Navigation.registerComponent('seedReentry', () => getGenerator(SeedReentry), store, Provider);
  Navigation.registerComponent('saveSeedConfirmation', () => getGenerator(SaveSeedConfirmation), store, Provider);
  Navigation.registerComponent('termsAndConditions', () => getGenerator(TermsAndConditions), store, Provider);
  Navigation.registerComponent('privacyPolicy', () => getGenerator(PrivacyPolicy), store, Provider);
  Navigation.registerComponent('forceChangePassword', () => getGenerator(ForceChangePassword), store, Provider);
  Navigation.registerComponent('seedVaultBackup', () => getGenerator(SeedVaultBackupComponent), store, Provider);
}
