// Copyright 2017-2020 @polkadot/app-staking authors & contributors
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable */

import { SlashingSpans } from '@polkadot/types/interfaces';
import React from 'react';
import { AddressMini, Expander, Spinner } from '@polkadot/react-components';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../../translate';

interface Props {
  nominators?: [string, number][];
  slashingSpans?: SlashingSpans | null;
}

function NominatedBy ({ nominators }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  return (
    <td className='start all'>
      {nominators
        ? (nominators.length !== 0 && (
          <Expander summary={t<string>('Guarantors ({{count}})', { replace: { count: formatNumber(nominators.length) } })}>
            {nominators.map(([who, index]): React.ReactNode =>
              <AddressMini
                key={who}
                // summary={t<string>('priority {{index}}', { replace: { index } })}
                value={who}
              />
            )}
          </Expander>
        ))
        : <Spinner variant='mini' />
      }
    </td>
  );
}

export default React.memo(NominatedBy);
