import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'react-native';
import * as Keychain from 'react-native-keychain';

const useBiometry = () => {
  const [biometricsType, setBiometricsType] = useState('None');
  const [canUseBiometrics, setCanUseBiometrics] = useState(false);

  const readPassword = async () => {
    // Try to get saved credentials using biometry
    const credentials = await Keychain.getGenericPassword({
      service: 'user-service',
      securityLevel: 'SECURE_HARDWARE',
      accessControl: 'BiometryCurrentSet',
      authenticationPrompt: {
        title: 'Log in using biometry',
      },
    });

    return credentials ? credentials.password : '';
  };

  const getBiometryType = async () => {
    // Get supported biometry type using keychain lib
    const biometryType = await Keychain.getSupportedBiometryType();

    // Check biometry type to be only None || FaceID || TouchID
    if (biometryType === null) {
      return 'None';
    }
    if (
      biometryType === 'FaceID' ||
      biometryType === 'Face' ||
      biometryType === 'Iris'
    ) {
      return 'FaceID';
    }
    return 'TouchID';
  };

  const { biometryActive } = useSelector((state) => state.user);

  useEffect(() => {
    // Set canUseBiometrics and biometricsType if available
    const checkBiometrics = async () => {
      const biometryType = await getBiometryType();
      if (biometryType !== 'None' && biometryActive) {
        setCanUseBiometrics(true);
      }
      setBiometricsType(biometryType);
    };

    checkBiometrics().then();

    // Repeat checkBiometrics on AppState change
    const subscription = AppState.addEventListener(
      'change',
      async (newState) => {
        if (newState === 'active') {
          await checkBiometrics();
        }
      }
    );
    return () => subscription.remove();
  });

  // Show biometric prompt and, if biometry matches, return password.
  const authenticate = useCallback(async () => {
    const password = await readPassword();
    if (!password) {
      throw new Error('useBiometry: Missing password');
    }
    return password;
  }, []);

  return {
    type: biometricsType,
    available: canUseBiometrics,
    authenticate,
  };
};

export default useBiometry;
