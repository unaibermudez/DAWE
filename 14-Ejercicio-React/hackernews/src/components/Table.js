import React from 'react';
import Button from './Button';
import Moment from 'react-moment';

const Table = ({ list, onDismiss }) => (
  <div className="table">
    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>{item.author}</span>
        <span style={{ width: '20%' }}>
          <Moment fromNow>{item.created_at}</Moment>
        </span>
        <span style={{ width: '10%' }}>{item.num_comments} comentarios</span>
        <span style={{ width: '10%' }}>{item.points} puntos</span>
        <span style={{ width: '10%' }}>
          <Button onClick={() => onDismiss(item.objectID)}>Descartar</Button>
        </span>
      </div>
    ))}
  </div>
);

export default Table;
