import styled from 'styled-components'

export const Card = styled('div').attrs({ className: 'card bg-transparent mb-3' })`
    border-color: rgb(139, 134, 134);
  `;

export const CardHeader = styled('div').attrs({ className: 'card-header bg-transparent' })`
    border-color: rgb(139, 134, 134);
  `;

export const CardBody = styled('div').attrs({ className: 'card-body text-light' })`
  color: #ffffff;
`;

export const CardBodyJbAc = styled('div').attrs({ className: 'card-body text-light' })`
    display: flex;
    justify-content: space-between;
    align-items: center;    
    border-color: rgb(139, 134, 134);
    color: #ffffff;
  `;

export const DIV_JBAC = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;  
`;

export const DIV_JCAC = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;  
`;

export const ConfirmButton = styled('button').attrs({ className: 'btn-confirm btn' })`
`;

export const DisableConfirmButton = styled('button').attrs({ className: 'btn-confirm' })`
    cursor: not-allowed !important;
    &:hover {
      transform: translateY(0) !important;
    }
`;

export const InputGroupDiv = styled('div').attrs({ className: 'input-group' })`
    border-color:#4F5293;
    width: calc(50%);
  `;

export const H2CardTitle = styled('h2').attrs({ className: 'card-title' })`
    margin: 0px;
  `;

export const H5Margin0 = styled.h5`
    margin: 0px;
`;

export const USDCSPAN = styled('div').attrs({ className: 'input-group-text bg-transparent' })`
    border-color: rgb(139, 134, 134);
    color: #ffffff;
  `;

export const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;
