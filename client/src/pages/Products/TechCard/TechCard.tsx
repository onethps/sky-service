import {
  Box,
  Button,
  Divider,
  IconButton,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { ChangeEvent, FC, useState } from 'react';
import Controls from '../../../components/Controls';
import { ModTable } from './Table/ModTable';
import { TechCardType } from 'pages/Products/TechCard/types';

const greyBg = grey[200];

const optionsPriceFor = [
  { id: 1, title: 'Порцию' },
  { id: 2, title: 'за 100гр.' },
  { id: 3, title: 'за 100мл.' },
];

type TechCardTypes = {
  currentTechCard: TechCardType;
  techIndex: number;
  removeTechCard: (id: string) => void;
  techCardsList: TechCardType[];
  setTechCardsList: (techCards: TechCardType[]) => void;
};

export const TechCard: FC<TechCardTypes> = ({
  currentTechCard,
  techIndex,
  removeTechCard,
  techCardsList,
  setTechCardsList,
}) => {
  const [priceForOptionSelect, setPriceForOptionSelect] = useState(
    optionsPriceFor[0].title,
  );

  const handleChangePriceForOption = (event: SelectChangeEvent<any>) => {
    setPriceForOptionSelect(event.target.value);
  };

  const handleChangeInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const values: any = [...techCardsList];
    values[techIndex][event.target.name] = event.target.value;
    setTechCardsList(values);
  };

  return (
    <Box sx={{ bgcolor: greyBg, padding: 4 }}>
      <Controls.Input
        name={'modName'}
        value={currentTechCard.modName}
        onChange={handleChangeInputs}
      />
      <Typography variant={'h5'} sx={{ fontWeight: '700', padding: '15px 0' }}>
        Состав
      </Typography>
      <Divider sx={{ m: '20px 0' }} />

      <ModTable
        currentTechCard={currentTechCard}
        techCardIndex={techIndex}
        techCardsList={techCardsList}
        setTechCardsList={setTechCardsList}
      />

      <Box
        sx={{
          margin: '30px 0',
          alignItems: 'center',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
        }}
      >
        <Controls.Select
          minWidth={'45%'}
          type={'Number'}
          label={'Цена за'}
          value={priceForOptionSelect}
          onChange={handleChangePriceForOption}
          options={optionsPriceFor}
        />
        <Controls.Input
          minWidth={'45%'}
          disabled
          label={'Себестоимость'}
          value={`${currentTechCard.priceForPortion} / порцию`}
        />
      </Box>
      <Box
        component={'form'}
        autoComplete="off"
        name={'calculateMarginPrice'}
        sx={{
          maxWidth: '100%',
          bgcolor: '#e3f2fd',
          padding: '10px',
          gap: '10px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Controls.Input
          label={'Цена'}
          minWidth={'45%'}
          endAdornment={'₴'}
          value={currentTechCard.price}
          name={'price'}
          onChange={handleChangeInputs}
        />
        <Controls.Input
          label={'Наценка'}
          minWidth={'45%'}
          endAdornment={'%'}
          value={currentTechCard.marginPricePercent}
          name={'marginPricePercent'}
          onChange={handleChangeInputs}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton>
          <Button
            onClick={() => removeTechCard(currentTechCard._id)}
            variant={'contained'}
            color={'error'}
          >
            Удалить
          </Button>
        </IconButton>
        <IconButton sx={{ display: 'block' }}>
          <Button variant={'outlined'} color={'info'}>
            Копировать
          </Button>
        </IconButton>
      </Box>
    </Box>
  );
};
