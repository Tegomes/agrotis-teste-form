import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { StyledPaper, StyledTypography } from "./StyledForm";
import { InputDefault } from "../../components/inputs/InputDefault";
import { InputDateTimePicker } from "../../components/inputs/InputDateTimePicker";
import { CNPJMask } from "../../utils/masks";
import { DEFAULT_VALUES_FORM, OPTIONS_INFOS_PROPRIEDADE, OPTIONS_LABORATORIO } from "../../utils/constants";

export const AgrotisForm = () => {
  const methods = useForm({ defaultValues: DEFAULT_VALUES_FORM });
  const { handleSubmit, reset, control, watch, getValues, setValue } = methods;

  const [minDateTime, setMinDateTime] = useState(getValues('dataInicial'));

  useEffect(() => {
    const dataInicial = getValues('dataInicial');
    (dataInicial != minDateTime) ? setMinDateTime(dataInicial) : null;
    if ( dataInicial > getValues('dataFinal')) {
      setValue("dataFinal", dataInicial);
    }
  }, [watch("dataInicial")]);

  const onSubmit = (data) => {
    data.dataInicial = new Date(data.dataInicial).toISOString();
    data.dataFinal = new Date(data.dataFinal).toISOString();
    data.infosPropriedade = OPTIONS_INFOS_PROPRIEDADE.find(option => option.id == data.infosPropriedade);
    data.laboratorio = OPTIONS_LABORATORIO.find(option => option.id == data.laboratorio);
    console.log(data);

    reset();
  };

  return (
    <StyledPaper>
      <StyledTypography variant="h6">Agrotis Formulário</StyledTypography>

      <InputDefault name="nome" control={control} label="Nome" required />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} >
        <InputDateTimePicker name="dataInicial" control={control} label="Data Inicial" />
        <InputDateTimePicker name="dataFinal" control={control} label="Data Final" minDateTime={minDateTime} />
      </Stack>
      <InputDefault name="infosPropriedade" control={control} label="Infos Propriedade" select options={OPTIONS_INFOS_PROPRIEDADE} required/>
      <InputDefault name="cnpj" control={control} label="CNPJ" hasMask={CNPJMask} required />
      <InputDefault name="laboratorio" control={control} label="Laboratorio" select options={OPTIONS_LABORATORIO} required/>
      <InputDefault name="observacoes" control={control} label="Observações" multiline rows={3} />
      
      <Button onClick={handleSubmit(onSubmit)} variant={"contained"}>
        Salvar
      </Button>
    </StyledPaper>
  );
};
