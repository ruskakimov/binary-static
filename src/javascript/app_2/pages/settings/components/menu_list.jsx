import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './menu_item.jsx';

const MenuList = ({sections, match}) => (
    <div>
        {
            sections.map(({src, path, title, content}, i) => (
                <MenuItem key={i} src={src} path={path} title={title} content={content} match={match}/>
            ))
        }
    </div>
);

MenuList.propTypes = {
    match   : PropTypes.object,
    sections: PropTypes.array,
};
