import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';
import Controls from '../../../components/Controls';
import { ModTable } from './Table/ModTable';
import { modTable, TechCardType } from 'store/reducers/techcards';

const greyBg = grey[200];

const optionsPriceFor = [
  { id: 1, title: 'Порцию' },
  { id: 2, title: 'за 100гр.' },
  { id: 3, title: 'за 100мл.' },
];

type TechCardTypes = {
  techCard: TechCardType;
  setTechCardsList: (tech: TechCardType[]) => void;
  techCardsList: TechCardType[];
  removeTechCard: () => void;
  techIndex: number;
};

export const TechCard: FC<TechCardTypes> = ({
  techCard,
  setTechCardsList,
  techCardsList,
  removeTechCard,
  techIndex,
}) => {
  const [priceForOptionSelect, setPriceForOptionSelect] = useState(
    optionsPriceFor[0].title,
  );

  const [tableState, setTableState] = useState([{ ...initTableState }]);

  const handleChangePriceForOption = (e) => {
    setPriceForOptionSelect(e.currentTarget.value);
  };

  // const addNewRowHandleButton = () => {
  //   setState([...state, { ...initState, id: uuidv4() }]);
  // };

  const handleChangeInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const values = [...techCardsList];
    let currentValue: string | null = values[techIndex][event.target.name];
    currentValue = event.target.value;
    setTechCardsList(values);
  };

  return (
    <Box sx={{ bgcolor: greyBg, padding: 4 }}>
      <Controls.Input
        name={'name'}
        value={techCard.modName}
        onChange={handleChangeInputs}
      />
      <Typography variant={'h5'} sx={{ fontWeight: '700', padding: '15px 0' }}>
        Состав
      </Typography>
      <Divider sx={{ m: '20px 0' }} />

      <ModTable state={techCard.modTables} />

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
          value={`${techCard.priceForPortion} / порцию`}
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
          value={techCard.price}
          name={'price'}
          onChange={handleChangeInputs}
        />
        <Controls.Input
          label={'Наценка'}
          minWidth={'45%'}
          endAdornment={'%'}
          value={techCard.marginPricePercent}
          name={'marginPricePercent'}
          onChange={handleChangeInputs}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton>
          <Button onClick={removeTechCard} variant={'contained'} color={'error'}>
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
