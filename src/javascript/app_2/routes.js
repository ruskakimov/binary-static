import React               from 'react';
import { Route, NavLink }  from 'react-router-dom';
import PropTypes           from 'prop-types';

import Client              from '../_common/base/client_base';
import { redirectToLogin } from '../_common/base/login';
import { localize }        from '../_common/localize';

import Settings            from './pages/settings/settings.jsx';
import Statement           from './pages/statement/statement.jsx';
import TradeApp            from './pages/trading/trade_app.jsx';

const routes = [
    { path: '/',          component: TradeApp,  exact: true },
    { path: '/statement', component: Statement, is_authenticated: true },
    { path: '/settings',  component: Settings },
];

const RouteWithSubRoutes = route => (
    <Route
        exact={route.exact}
        path={route.path}
        render={props => (
            (route.is_authenticated && !Client.isLoggedIn()) ? // TODO: update styling of the message below
                <a href='javascript:;' onClick={redirectToLogin}>{localize('Please login to view this page.')}</a> :
                <route.component {...props} routes={route.routes} />
        )}
    />
);

export const BinaryRoutes = () => routes.map((route, idx) => (
    <RouteWithSubRoutes key={idx} {...route} />
));

const normalizePath = (path) => /^\//.test(path) ? path : `/${path || ''}`; // Default to '/'

const getRouteInfo = (path) => routes.find(r => r.path === normalizePath(path));

export const isRouteVisible = (path, route = getRouteInfo(path)) =>
    !(route && route.is_authenticated && !Client.isLoggedIn());

export const BinaryLink = ({ to, children, ...props }) => {
    const path  = normalizePath(to);
    // Commenting out: BinaryLink checks for "exact" route only.
    // So we're encountering errors from sub routes.

    // const route = getRouteInfo(path);
    // if (!route) {
    //     throw new Error(`Route not found: ${to}`);
    // }
    // <NavLink to={path} activeClassName='active' exact={route.exact} {...props}>
    return (
        to ?
            <NavLink to={path} activeClassName='active' {...props}>
                {children}
            </NavLink>
        :
            <a href='javascript:;' {...props}>
                {children}
            </a>
    );
};

BinaryLink.propTypes = {
    children: PropTypes.object,
    to      : PropTypes.string,
};
