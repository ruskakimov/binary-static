import React       from 'react';
import PropTypes   from 'prop-types';
import { NavLink } from 'react-router-dom';
import Url         from '../../../../_common/url';

const MenuItem = ({
    src,
    match,
    path,
    title,
    content,
}) => (
    <NavLink className='menuitem' to={match.url + path}>
        <div className='menuitem__img_container'>
            <img className='logo-img' src={Url.urlForStatic(src)} alt='Binary.com' />
        </div>
        <div className='menuitem__content_container'>
            <div className='menuitem__menu_name'>
                {title}
            </div>
            <div className='menuitem__menu_content'>{content}</div>
        </div>
    </NavLink>
);

MenuItem.propTypes = {
    src    : PropTypes.string,
    match  : PropTypes.object,
    path   : PropTypes.string,
    title  : PropTypes.string,
    content: PropTypes.string,
};

export default MenuItem;
