import React from 'react';
import Url from '../../../../_common/url';

const types = ['danger', 'neutral', 'success', 'warning'];

class AlertMessage extends React.PureComponent {
    constructor(props) {
        super(props);

        if (types.indexOf(props.type) === -1) {
            throw new Error('Wrong type passed to AlertMessage component!');
        }
    }

    render() {
        const { type, message } = this.props;

        const closeButton = (
            <a className='alert-close'>
                <img className='alert-close-icon' src={Url.urlForStatic('images/trading_app/close.svg')} alt='Close' />
            </a>
        );

        return (
            <div className={`alert alert-${type}`}>
                <span className='alert-icon'></span>
                <span className='alert-message'>{message}</span>
                {closeButton}
            </div>
        );
    }
}

export default AlertMessage;