import React, { useState } from 'react';
import { walletOptions, WalletOptionsType } from 'features/HomePage/constants/constants';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';

import { SelectChangeEvent } from '@mui/material';

import { ChooseWalletModal } from './ChooseWalletModal';
import { BalanceType } from './IncomeProduct';

interface WalletOptionsProps {
  state: BalanceType;
}

export const WalletOptions: React.FC<WalletOptionsProps> = ({ state }) => {
  const [selectWalletOptions, setSelectWalletOptions] =
    useState<WalletOptionsType[]>(walletOptions);

  const [selectWalletValue, setSelectWalletValue] = React.useState<string>(
    selectWalletOptions[0].value,
  );

  const handleSelectWallet = (event: SelectChangeEvent<unknown>) => {
    setSelectWalletValue(event.target.value as string);

    // TODO: FIX THIS BUG
    setSelectWalletOptions(() => {
      // rewrite third element with new balance value (no needed list of balances)
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
