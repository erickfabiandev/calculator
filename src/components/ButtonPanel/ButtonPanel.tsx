import React from 'react';
import Button from '../Button/Button';
import './ButtonPanel.scss'

interface propButtonPanel {
  onClick: (value: string) => void;
}

interface valueButton {
  id: number,
  group: string[]
}

const ButtonPanel: React.FC<propButtonPanel> = ({ onClick }) => {

  const panelData: valueButton[] = [
    { id: 1, group: ['7', '8', '9', 'DEL'] },
    { id: 2, group: ['4', '5', '6', '+'] },
    { id: 3, group: ['1', '2', '3', '-'] },
    { id: 4, group: ['.', '0', '/', 'x'] },
  ]

  return (
    <table className='button-panel'>
      <tbody>
        {
          panelData.map((item) => {
            return (
              <tr key={item.id}>
                {
                  item.group.map((value, index) => {
                    return (
                      <td key={index}>
                        <Button onClick={() => onClick(value)}>{value}</Button>
                      </td>)
                  })
                }
              </tr>
            )
          })
        }
        <tr>
          <td colSpan={2}>
            <Button onClick={() => onClick('C')}>C</Button>
          </td>
          <td colSpan={2} className='equals-sign'>
            <Button onClick={() => onClick('=')}>=</Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ButtonPanel;