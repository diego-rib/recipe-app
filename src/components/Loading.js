import React from 'react';
import '../styles/Loading.css';

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
