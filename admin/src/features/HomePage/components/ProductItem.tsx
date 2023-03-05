import { FC } from 'react';
import { IProduct } from 'interfaces/product.interfaces';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { useAppSelector } from 'shared/hooks/redux-hooks';

import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 15px',
  color: theme.palette.primary.main,
  fontWeight: '700',
  cursor: 'pointer',
}));

const GroupItems = styled('ul')({
  padding: 0,
});

interface ProductItemProps {
  control: any;
  index: number;
  updateInputs: any;
}

export const ProductItem: FC<ProductItemProps> = ({ control, index, updateInputs }) => {
  const products = useAppSelector((state) => state.products.products);

  const handleAutoComplete = (data: any, onChange: (...event: any[]) => void) => {
    const product = products.find((product) => product.name === data);
    onChange(data);
    if (!product) return;
    updateInputs(index, {
      quantity: product.quantity,
      name: product.name,
      price: product.price,
      unit: product.unit,
    });
  };

  return (
    <Stack flexDirection="row" width="100%" gap="5px">
      <Controller
        name={`products.${index}.name`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            sx={{
              flexGrow: 1,
              minWidth: 200,
            }}
            renderInput={(params) => <TextField {...params} label={'Наименование'} />}
            groupBy={(o) => ''}
            options={
              products.length ? [...products.map((el: IProduct) => el.name), ''] : [' ']
            }
            onChange={(_, data) => handleAutoComplete(data, onChange)}
            value={value}
            renderGroup={(params) => (
              <Box key={params.children?.toString()}>
                <GroupHeader>Добавить товар</GroupHeader>
                <GroupItems>{params.children}</GroupItems>
              </Box>
            )}
          />
        )}
      />
      <Controller
        name={`products.${index}.quantity`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              flex: 0.3,
              minWidth: 100,
            }}
            onChange={onChange}
            value={value}
            label={'К-лво'}
            InputProps={{
              endAdornment: (
                <Controller
                  name={`products.${index}.unit`}
                  control={control}
                  render={({ field: { value } }) => (
                    <InputAdornment position="end">{value}</InputAdornment>
                  )}
                />
              ),
            }}
          />
        )}
      />
      <Controller
        name={`products.${index}.price`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              minWidth: 100,
            }}
            onChange={onChange}
            value={value}
            label={'Цена'}
          />
        )}
      />
      <Controller
        name={`products.${index}.sum`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              minWidth: 100,
            }}
            onChange={onChange}
            value={value}
            label={'Сума'}
          />
        )}
      />
      <Controller
        name={`products.${index}.netPrice`}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextField
            sx={{
              minWidth: 100,
            }}
            onChange={onChange}
            value={value}
            label={'Цена розн.'}
          />
        )}
      />
    </Stack>
  );
};
