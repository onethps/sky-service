import { ChangeEvent, FC } from 'react';
import { TechCardType } from 'features/ProductsPage/ui/TechCard/types';
import { CustomSelect } from 'shared/components/CustomSelect/CustomSelect';
import { calcNetValuePerHungeredGram, calcNetValuePerPortion } from 'utlis/helpers';

import {
  Box,
  Button,
  Divider,
  IconButton,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { ModTable } from './Table/ModTable';

const greyBg = grey[200];

export const optionsPriceFor = [
  { id: '1', value: 'Порцію' },
  { id: '2', value: 'за 100гр.' },
  { id: '3', value: 'за 100мл.' },
];

type TechCardTypes = {
  currentTechCard: TechCardType;
  techIndex: number;
  removeTechCard: (id: string) => void;
  initTechCardList: TechCardType[];
  setInitTechCardList: (techCards: TechCardType[]) => void;
};

export const TechCard: FC<TechCardTypes> = ({
  currentTechCard,
  techIndex,
  removeTechCard,
  initTechCardList,
  setInitTechCardList,
}) => {
  const handleChangeInputs = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const values: any = [...initTechCardList];
    values[techIndex][event.target.name] = event.target.value;
    setInitTechCardList(values);
  };

  const handleSelectPerPriceCategory = (event: SelectChangeEvent<unknown>) => {
    const values: any = [...initTechCardList];
    values[techIndex][event.target.name] = event.target.value;

    if (event.target.value === optionsPriceFor[0].value) {
      values[techIndex].netPriceMod = calcNetValuePerPortion(values[techIndex].tablesMod);
    }
    if (
      event.target.value === optionsPriceFor[1].value ||
      event.target.value === optionsPriceFor[2].value
    ) {
      values[techIndex].netPriceMod = calcNetValuePerHungeredGram(
        values[techIndex].tablesMod,
      );
    }

    setInitTechCardList(values);
  };

  return (
    <Box sx={{ bgcolor: greyBg, padding: 4 }}>
      <TextField
        label={'Название'}
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
        initTechCardList={initTechCardList}
        setInitTechCardList={setInitTechCardList}
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
        <CustomSelect
          type={'Number'}
          label={'Цена за'}
          name={'categoryPerPriceMod'}
          value={currentTechCard.categoryPerPriceMod}
          onChange={handleSelectPerPriceCategory}
          menuItems={optionsPriceFor}
        />

        <TextField
          label="Себестоимость"
          disabled
          value={`${currentTechCard.netPriceMod} ₴ / ${currentTechCard.categoryPerPriceMod}`}
        />
      </Box>
      <Box
        component="form"
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
        <TextField
          label="Цена"
          value={currentTechCard.priceMod}
          name="price"
          onChange={handleChangeInputs}
          InputProps={{
            endAdornment: '₴',
          }}
        />
        <TextField
          label="Наценка"
          value={currentTechCard.marginPricePercentMod}
          name={'marginPricePercent'}
          onChange={handleChangeInputs}
          InputProps={{
            endAdornment: '%',
          }}
        />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <IconButton>
          <Button
            onClick={() => removeTechCard(currentTechCard.id)}
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
