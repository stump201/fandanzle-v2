import React, { FC } from 'react';

import * as styles from './loadingSpinner.css';

export const Experiance: FC = ({}) => (
  <div className={styles['Spinner']}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Experiance;
