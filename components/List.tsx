import React from 'react';

type ListProps = {
    items: { id: number; name: string }[];
    onItemClick: (id: number) => void;
    selectedItemId: number | null;
  };
  
  const List: React.FC<ListProps> = ({ items, onItemClick, selectedItemId }) => {
    return (
      <ul>
        {items.map((item) => (
          <li 
          key={item.id} 
          onClick={() => onItemClick(item.id)}
          className={`${item.id === selectedItemId ? 'selected-item-style' : ''} hover-item-style`}
        >
          {item.name}
        </li>
        ))}
      </ul>
    );
  };
  
export default List;
