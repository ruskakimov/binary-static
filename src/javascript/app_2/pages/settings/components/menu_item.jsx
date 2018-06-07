import React from 'react';
import PropTypes from 'prop-types';
import { urlForStatic }   from '../../../../_common/url';

// Url.urlForStatic('images/trading_app/header/icons/ic_notification_light.svg'

const MenuItem = ({children, src}) => (
    <div className='menuitem'>
        <img className='logo-img' src={urlForStatic(src)} alt='Binary.com' />

        {children}
    </div>
);

MenuItem.propTypes = {
    children: PropTypes.object,
    src     : PropTypes.string,
};

export default MenuItem;
