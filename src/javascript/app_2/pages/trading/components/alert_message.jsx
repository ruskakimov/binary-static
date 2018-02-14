import React from 'react';

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
                <svg className='alert-close-icon' viewBox='0 0 10 10' width="10" height="10" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M-1-1h12v12H-1z"/><path d="M5.663 5l3.68 3.68a.469.469 0 0 1-.664.662L5 5.662l-3.68 3.68a.469.469 0 0 1-.662-.663L4.338 5 .657 1.32A.469.469 0 0 1 1.32.659L5 4.338 8.68.657a.469.469 0 0 1 .662.663L5.662 5z" fill="#6E7287"/></g></svg>
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