import classNames     from 'classnames';
import PropTypes      from 'prop-types';
import React          from 'react';
import { connect }    from '../../../Stores/connect';

const App = ({
    children,
    is_portfolio_drawer_on,
}) => (
    <div
        id='app_contents'
        className={classNames('app-contents', {
            'show-portfolio': is_portfolio_drawer_on,
        })}
    >
        {children}
    </div>
);


App.propTypes = {
    children              : PropTypes.node,
    is_portfolio_drawer_on: PropTypes.bool,
};

export default connect(
    ({ ui }) => ({
        is_portfolio_drawer_on: ui.is_portfolio_drawer_on,
    })
)(App);
