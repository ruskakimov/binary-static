import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import MenuItem from './menu_item.jsx';

export default class MenuList extends Component {
    render() {
        const { sections, match } = this.props;
        return (
            <div>
                {
                    sections.map((section, i) => (
                        <MenuItem key={i} src={section.src}>
                            <NavLink
                                to={match.url + section.path}
                            >
                                {section.title}
                            </NavLink>
                        </MenuItem>
                    ))
                }
            </div>

        );
    }
}

MenuList.propTypes = {
    match   : PropTypes.object,
    sections: PropTypes.array,
};
