import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import ptBRLocale from 'date-fns/locale/pt-BR';
import { v4 as uuidv4 } from "uuid";
import { DATE_FORMAT } from "../../utils/constants";

export const InputDateTimePicker = ({ 
  id = `input-${uuidv4()}`,
  name, 
  control, 
  label, 
  minDateTime, 
  maxDateTime,
  required = false, 
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBRLocale}
    >
        <Controller
            name={name}
            control={control}
            rules={{ 
              required: required ? `O campo ${label} é obrigatório.` : false, 
            }}
            render={({
                field: { onChange, value },
                fieldState: { error },
            }) => (
                <MobileDateTimePicker
                    id={id}
                    label={label}
                    fullWidth
                    value={value ?? new Date( minDateTime ?? "")}
                    onChange={onChange}
                    helperText={error ? error.message : null}
                    error={!!error}                    
                    minDateTime={new Date(minDateTime ?? "1900-01-01T00:00:00.000Z")}
                    maxDateTime={maxDateTime ? new Date(maxDateTime) : new Date().setFullYear(new Date(minDateTime ?? "").getFullYear() + 100)}
                    ampm={false}
                    inputFormat={DATE_FORMAT}
                    showToolbar={false}
                    hideTabs={true}
                    required={required}
                    renderInput={(params) => <TextField {...params} />}
                />
            )}
        />  
    </LocalizationProvider>
  );
};

InputDateTimePicker.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired, 
  control: PropTypes.any.isRequired, 
  label: PropTypes.string.isRequired,  
  minDateTime: PropTypes.any, 
  maxDateTime: PropTypes.any,
  required: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};
