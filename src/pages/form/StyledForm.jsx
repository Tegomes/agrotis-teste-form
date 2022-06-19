import styled from 'styled-components';
import { Paper, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)`
    display: grid;
    grid-row-gap: 20px;
    padding: 20px;
    margin: 10px auto;
    max-width: 500px;
`;

export const StyledTypography = styled(Typography)`
    text-align: center;
    font-weight: bold !important;
`;