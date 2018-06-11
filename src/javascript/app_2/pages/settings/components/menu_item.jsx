import React       from 'react';
import PropTypes   from 'prop-types';
import { NavLink } from 'react-router-dom';
import Url         from '../../../../_common/url';

const MenuItem = ({ title, content, img_src, path }) => {
    // function renderMenuItemHeader()  {
    //     if (index===0) {
    //         return (
    //             <div>
    //                 <div className='menuitem_header__container1'><span>Personal</span></div>
    //                 <hr className='menuitem_header__hr'/>
    //             </div>
    //         );
    //     } else if (index===2) {
    //         return (
    //             <div>
    //                 <div className='menuitem_header__container2'><span>Security &amp; Limits</span></div>
    //                 <hr className='menuitem_header__hr'/>
    //             </div>
    //         );
    //     }
    //     return null;
    // }

    return (
        <div>
            <NavLink className='menuitem' to={path} activeClassName='menuitem__active'>
                <div className='menuitem__img_container'>
                    <img className='logo-img' src={Url.urlForStatic(img_src)} />
                </div>
                <div className='menuitem__content_container'>
                    <div className='menuitem__menu_name'>
                        <span>{title}</span>
                    </div>
                    <div className='menuitem__menu_content'><span>{content}</span></div>
                </div>
            </NavLink>
        </div>
    );
};

MenuItem.propTypes = {
};

export default MenuItem;
