import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';

import { SelectChangeEvent } from '@mui/material';

import { ChooseWalletModal } from './ChooseWalletModal';

interface WalletOptionsProps {
  wallet: any;
  setWallet: (v: any) => void;
  isShowedWalletInput: boolean;
}

export const optionsInitWalletSelect = [
  { id: '1', value: 'Нет' },
  { id: '2', value: 'Выбрать счет' },
];

export const WalletOptions: React.FC<WalletOptionsProps> = ({
  wallet,
  setWallet,
  isShowedWalletInput,
}) => {
  const [options, setOptions] = useState(optionsInitWalletSelect);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectWallet = (newValue: string) => {
    if (newValue === 'Выбрать счет') {
      setIsOpen(true);
      return;
    }

    setWallet(newValue);

    const tempOptions = [...options];
    tempOptions[2] = { id: (tempOptions.length + 1).toString(), value: newValue };
    setOptions(tempOptions);
  };

  return (
    <>
      <ChooseWalletModal
        isOpenModal={isOpen}
        setIsOpenModal={setIsOpen}
        handleInputValue={handleSelectWallet}
      />
      {isShowedWalletInput && (
        <CustomSelect
          sx={{
            maxWidth: 245,
          }}
          menuItems={options}
          value={wallet}
          onChange={(event) => handleSelectWallet(event.target.value as string)}
        />
      )}
    </>
  );
};
