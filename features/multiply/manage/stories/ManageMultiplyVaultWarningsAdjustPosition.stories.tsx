import { BigNumber } from 'bignumber.js'
import { COLLATERALIZATION_DANGER_OFFSET, COLLATERALIZATION_WARNING_OFFSET } from 'blockchain/ilks'
import { DEFAULT_PROXY_ADDRESS } from 'helpers/mocks/vaults.mock'
import { manageMultiplyVaultStory } from 'helpers/stories/ManageMultiplyVaultStory'

const proxyAddress = DEFAULT_PROXY_ADDRESS

const vaultERC20 = {
  ilk: 'WBTC-A',
  collateral: new BigNumber('20'),
  debt: new BigNumber('3000'),
}

export const NoProxyAddress = manageMultiplyVaultStory({
  title:
    'Warning is shown that the connected account has no proxy address and prior to executing the proposed transaction will have to set their proxy and make applicable allowances given the context of their action',
  vault: vaultERC20,
})({
  requiredCollRatio: new BigNumber(2.8),
})

// export const PotentialGenerateAmountLessThanDebtFloor = manageMultiplyVaultStory({
//   title:
//     'Warning is shown when the amount of collateral in the vault plus the amount a user is depositing does not satisfy the amount of debt necessary to exceed the debt floor',
//   vault: {
//     ilk: 'WBTC-A',
//     collateral: one,
//     debt: zero,
//   },
//   proxyAddress,
// })({
//   stage: 'otherActions',
//   otherAction: 'depositCollateral',
//   depositAmount: new BigNumber('4'),
// })

export const DebtIsLessThanDebtFloor = manageMultiplyVaultStory({
  title:
    'Warning is shown when the debt in the vault is non-zero and is less than the debt floor. This occurs when a the debt floor increases, leaving some vaults in a limited status in which the user can either close out their position or continue their position by depositing more collateral and generating more debt until it exceeds the new debt floor',
  vault: {
    ilk: 'WBTC-A',
    collateral: new BigNumber('100'),
    debt: new BigNumber('3000'),
  },
  ilkData: {
    debtFloor: new BigNumber('10000'),
  },
  proxyAddress,
})()

// export const ConnectedAccountIsNotVaultController = manageMultiplyVaultStory({
//   title: 'We disable the form when the connected account does not match the owner of the vault',
//   vault: {
//     ilk: 'WBTC-A',
//     collateral: new BigNumber('100'),
//     debt: new BigNumber('4000'),
//   },
//   account: '0xNotVaultController',
//   proxyAddress,
// })({
//   paybackAmount: new BigNumber('100'),
//   stage: 'daiEditing',
// })

export const VaultWillBeAtRiskLevelDanger = manageMultiplyVaultStory({
  title: `Warning is shown to indicate to the user that this vault will be near liquidation given the action they are taking and is shown when the vaults new collateralization ratio is within ${COLLATERALIZATION_DANGER_OFFSET.times(
    100,
  )}% of the liquidation ratio. So if liquidation ratio is 150%, this would be 150% >= x <= ${new BigNumber(
    1.5,
  )
    .times(COLLATERALIZATION_DANGER_OFFSET.plus(1))
    .times(100)}%`,
  vault: {
    ilk: 'WBTC-A',
    collateral: new BigNumber('10'),
    debt: new BigNumber('2000'),
  },
  priceInfo: {
    collateralChangePercentage: new BigNumber('0.01'),
  },
  proxyAddress,
})({
  requiredCollRatio: new BigNumber(2.2),
})

export const VaultWillBeAtRiskLevelDangerAtNextPrice = manageMultiplyVaultStory({
  title: `Warning is shown to indicate to the user that this vault will be near liquidation at next price update given the action they are taking and is shown when the vaults future collateralization ratio is within ${COLLATERALIZATION_DANGER_OFFSET.times(
    100,
  )}% of the liquidation ratio. So if liquidation ratio is 150%, this would be 150% >= x <= ${new BigNumber(
    1.5,
  )
    .times(COLLATERALIZATION_DANGER_OFFSET.plus(1))
    .times(100)}%`,
  vault: {
    ilk: 'WBTC-A',
    collateral: new BigNumber('20'),
    debt: new BigNumber('2000'),
  },
  priceInfo: {
    collateralChangePercentage: new BigNumber('-0.4'),
  },
  proxyAddress,
})({
  requiredCollRatio: new BigNumber(3.6),
})

export const VaultWillBeAtRiskLevelWarning = manageMultiplyVaultStory({
  title: `Warning is shown to indicate to the user that this vault is will be near liquidation at next price update given the action they are taking and is shown when the vaults new collateralization ratio is within ${COLLATERALIZATION_WARNING_OFFSET.times(
    100,
  )}% of the liquidation ratio but greater than ${COLLATERALIZATION_DANGER_OFFSET.times(
    100,
  )}% of the liquidation ratio as that would mean it is at risk level danger. So if liquidation ratio is 150%, this would be ${new BigNumber(
    1.5,
  )
    .times(COLLATERALIZATION_DANGER_OFFSET.plus(1))
    .times(100)}%
> x <= ${new BigNumber(1.5).times(COLLATERALIZATION_WARNING_OFFSET.plus(1)).times(100)}%.`,
  vault: {
    ilk: 'WBTC-A',
    collateral: new BigNumber('10'),
    debt: new BigNumber('2000'),
  },
  priceInfo: {
    collateralChangePercentage: new BigNumber('0.2'),
  },
  proxyAddress,
})({
  requiredCollRatio: new BigNumber(1.8),
})

export const VaultWillBeAtRiskLevelWarningAtNextPrice = manageMultiplyVaultStory({
  title: `Warning is shown to indicate to the user that this vault is will be near liquidation at next price update given the action they are taking and is shown when the vaults future collateralization ratio is within ${COLLATERALIZATION_WARNING_OFFSET.times(
    100,
  )}% of the liquidation ratio but greater than ${COLLATERALIZATION_DANGER_OFFSET.times(
    100,
  )}% of the liquidation ratio as that would mean it is at risk level danger. So if liquidation ratio is 150%, this would be ${new BigNumber(
    1.5,
  )
    .times(COLLATERALIZATION_DANGER_OFFSET.plus(1))
    .times(100)}%
> x <= ${new BigNumber(1.5).times(COLLATERALIZATION_WARNING_OFFSET.plus(1)).times(100)}%.`,
  vault: {
    ilk: 'WBTC-A',
    collateral: new BigNumber('20'),
    debt: new BigNumber('2000'),
  },
  priceInfo: {
    collateralChangePercentage: new BigNumber('-0.4'),
  },
  proxyAddress,
})({
  requiredCollRatio: new BigNumber(2.8),
})

// export const GeneratingAllDaiFromIlkDebtAvailable = manageMultiplyVaultStory({
//   title:
//     'Warning is shown when a user is generating all dai remaining for a given ilk which results in that ilks debt ceiling being reached',
//   vault: {
//     ilk: 'WBTC-A',
//     collateral: new BigNumber('200'),
//     debt: new BigNumber('2000'),
//   },
//   ilkData: {
//     debtCeiling: new BigNumber('10000'),
//     ilkDebt: new BigNumber('5000'),
//   },
//   proxyAddress,
// })({
//   generateAmount: new BigNumber('5000'),
// })

// export const GeneratingAllDaiFromTotalCollateral = manageMultiplyVaultStory({
//   title:
//     'Warning is shown when a user is generating the maximum amount of dai for the amount of collateral in the vault and being deposited',
//   vault: {
//     ilk: 'WBTC-A',
//     collateral: new BigNumber('200'),
//     debt: new BigNumber('2000'),
//   },
//   proxyAddress,
// })({
//   requiredCollRatio: new BigNumber(1.5),
// })

// export const GeneratingAllDaiFromTotalCollateralAtNextPrice = manageMultiplyVaultStory({
//   title:
//     'Warning is shown when a user is generating the maximum amount of dai for the amount of collateral in the vault and being deposited',
//   vault: {
//     ilk: 'WBTC-A',
//     collateral: new BigNumber('200'),
//     debt: new BigNumber('2000'),
//   },
//   priceInfo: {
//     collateralChangePercentage: new BigNumber('-0.1'),
//   },
//   proxyAddress,
// })({
// })

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ManageMultiplyVault/Non-Blocking-Adjust-Position',
}
