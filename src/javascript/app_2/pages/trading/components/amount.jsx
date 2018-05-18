import React        from 'react';
import Dropdown     from '../../../components/form/dropdown.jsx';
import Fieldset     from '../../../components/form/fieldset.jsx';
import InputField   from '../../../components/form/input_field.jsx';
import { connect }  from '../../../store/connect';
import Client       from '../../../../_common/base/client_base';
import { localize } from '../../../../_common/localize';

const basis_list = [
    { text: localize('Payout'), value: 'payout' },
    { text: localize('Stake'),  value: 'stake' },
];

const Amount = ({
    basis,
    currency,
    currencies_list,
    amount,
    onChange,
}) => (
    <Fieldset
        header={localize('Invest Amount')}
        icon='invest-amount'
        tooltip={localize('Text for Invest Amount goes here.')}
    >
        <div className='amount-container'>
            <Dropdown
                list={basis_list}
                value={basis}
                name='basis'
                onChange={onChange}
            />
            <InputField
                type='number'
                name='amount'
                value={amount}
                onChange={onChange}
                is_currency
                prefix={currency}
            />
        </div>

        {!Client.get('currency') &&
            <Dropdown
                list={currencies_list}
                value={currency}
                name='currency'
                onChange={onChange}
            />
        }
    </Fieldset>
);

export default connect(
    ({trade}) => ({
        basis          : trade.basis,
        currency       : trade.currency,
        currencies_list: trade.currencies_list,
        amount         : trade.amount,
        onChange       : trade.handleChange,
    })
)(Amount);
