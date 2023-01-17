import React from 'react';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';

import { SelectChangeEvent } from '@mui/material';

import { ChooseWalletModal } from '../ChooseWalletModal/ChooseWalletModal';
import { InitIncomeBalanceType } from '../IncomeProductModal';
import { walletOptions, WalletOptionsType } from '../NewProductModal/constants';

interface WalletOptionsProps {
  state: InitIncomeBalanceType;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({ state }) => {
  const [selectWalletOptions, setSelectWalletOptions] =
    React.useState<WalletOptionsType[]>(walletOptions);

  const [selectWalletValue, setSelectWalletValue] = React.useState<string>(
    selectWalletOptions[0].value,
  );

  const handleSelectWallet = (event: SelectChangeEvent<unknown>) => {
    setSelectWalletValue(event.target.value as string);

    // TODO: FIX THIS BUG
    setSelectWalletOptions(() => {
      // rewrite third element with new balance value (no needed list of balance)
      const copy = [...walletOptions];
      const newValue = {
        id: (copy.length + 1).toString(),
        value: event.target.value as string,
      };
      copy[1] = newValue;
      return copy;
    });
  };

  return (
    <>
      <ChooseWalletModal
        selectWalletValue={selectWalletValue}
        chooseWalletValue={selectWalletOptions[1].value}
        setSelectWalletValue={setSelectWalletValue}
        selectWalletOptions={selectWalletOptions}
        setSelectWalletOptions={setSelectWalletOptions}
      />
      {state.debitMoney === 'yes' ? (
        <CustomSelect
          name={'debitMoney'}
          menuItems={selectWalletOptions}
          value={selectWalletValue}
          onChange={handleSelectWallet}
        />
      ) : null}
    </>
  );
};
