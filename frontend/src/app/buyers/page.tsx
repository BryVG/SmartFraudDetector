import styles from './page.module.css';
import React from 'react';

export default function BuyersPage() {
  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <h1>Students</h1>
        <button>⋮</button>
      </div>

      <div className={styles.chartContainer}>
        <div className={styles.chartCircle}>
          <div className={styles.centerCircle}>
            👦👧
          </div>
        </div>
      </div>

      <div className={styles.bottom}>

        <div className={styles.info}>
          <div className={`${styles.legend} ${styles.blue}`}></div>
          <h2>150</h2>
          <p>Boys (60%)</p>
        </div>

        <div className={styles.info}>
          <div className={`${styles.legend} ${styles.yellow}`}></div>
          <h2>100</h2>
          <p>Girls (40%)</p>
        </div>

      </div>

    </div>
  );
}