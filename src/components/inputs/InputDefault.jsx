import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';

export const InputDefault = ({
  id = `input-${uuidv4()}`,
  name, 
  control, 
  label,
  options,
  placeholder = "",
  type = "text", 
  required = false, 
  disabled = false,
  variant = "outlined",
  size = "small",
  fullWidth = true,
  readOnly = false,
  shrink = true,
  multiline = false,
  rows = 1,
  rowsMax = 1,
  focused = false,
  hasMask = false,
  select = false,
}) => {
  const generateOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={`option-${uuidv4()}`} value={option.id}>
          {option.nome}
        </MenuItem>
      );
    });
  };

  return (
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
        <TextField
          id={id}
          label={label}
          InputLabelProps={{
            shrink,
          }}
          placeholder={placeholder}
          variant={variant}
          type={type}
          onChange={(value) => {
            if (!!hasMask) {
              value.target.value = hasMask(value.target.value);
            }
            onChange(value);
          }}
          value={value}
          required={required}
          disabled={disabled}
          error={!!error}
          helperText={error ? error.message : ""}
          size={size}
          fullWidth={fullWidth}
          multiline={multiline}
          rows={rows}
          maxrows={rowsMax}
          select={select}
          InputProps={{
            readOnly,
          }}
          focused={focused}
        >
          {select && <MenuItem key={`option-${uuidv4()}`} value="" disabled >
              <em>Selecione uma opção&nbsp;</em>
            </MenuItem>
            }
          {options && generateOptions()}
        </TextField>
      )}
    />
  );
};

InputDefault.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired, 
  control: PropTypes.any.isRequired, 
  label: PropTypes.string.isRequired, 
  options: PropTypes.array, 
  placeholder: PropTypes.string,
  type: PropTypes.string, 
  required: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  disabled: PropTypes.bool,
  variant: PropTypes.string, 
  size: PropTypes.string, 
  fullWidth: PropTypes.bool,
  readOnly: PropTypes.bool,
  shrink: PropTypes.bool,
  multiline: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  focused: PropTypes.bool,
  hasMask: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  select: PropTypes.bool,
};