import { METAMASK_UPDATE } from '../actions/actionTypes';

export const initialState = {
  isEnabled: null,
  isUnlocked: null,
  networkVersion: null,
  onboardingcomplete: null,
  selectedAddress: null,
  isTargetNetwork: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case METAMASK_UPDATE: {
      const {
        isEnabled,
        isUnlocked,
        networkVersion,
        onboardingcomplete,
        selectedAddress,
        isTargetNetwork,
      } = action.payload
      return {
        isEnabled,
        isUnlocked,
        networkVersion,
        onboardingcomplete,
        selectedAddress,
        isTargetNetwork,
      }
    }
    default:
      return state;
  }
};
