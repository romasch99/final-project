import styled from "styled-components"

export const Card = styled.div`
overflow: hidden;
padding: 0 0 32px;
margin: 48px auto 0;
width: ${props => props.width || `300px`};
font-family: Quicksand, arial, sans-serif;
box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
border-radius: 7px;
`;

export const CardItem = styled.div`
  margin-bottom: 1rem;
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
`;
export const CardItemSmall = styled.div`
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const CardHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const CardContent = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`;

export const CardNote = styled.div`
  // padding-top: 8px;
  // display: block;
  // width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  font-size: 0.7rem;
  text-align: center;
  // text-transform: uppercase;
`;

export const CardButtons = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
`;

export const CardButton = styled.button`
  margin-top: 1rem;
  width:  ${props => props.inputWidht || `30%`};
  height:  ${props => props.inputHeight || `35px`};
  margin:   ${props => props.inputMarginTop || `0`} 0.5rem ;
  padding: 0.35rem 0 0.35rem 0;
  font-family: inherit;
  font-size: ${props => props.inputFontSize || `14px`};
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: #fff;
  background-color: ${props => props.inputColor || `#e5195f`};
  border: 0;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;
