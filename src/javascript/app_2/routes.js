import React               from 'react';
import { Route, NavLink }  from 'react-router-dom';
import PropTypes           from 'prop-types';

import Client              from '../_common/base/client_base';
import { redirectToLogin } from '../_common/base/login';
import { localize }        from '../_common/localize';

import Settings            from './pages/settings/settings.jsx';
import Statement           from './pages/statement/statement.jsx';
import TradeApp            from './pages/trading/trade_app.jsx';

// Settings Routes
import AccountPassword        from './pages/settings/sections/AccountPassword.jsx';
import ApiToken               from './pages/settings/sections/ApiToken.jsx';
import AuthorizedApplications from './pages/settings/sections/AuthorizedApplications.jsx';
import CashierPassword        from './pages/settings/sections/CashierPassword.jsx';
import FinancialAssessment    from './pages/settings/sections/FinancialAssessment.jsx';
import Limits                 from './pages/settings/sections/Limits.jsx';
import LoginHistory           from './pages/settings/sections/LoginHistory.jsx';
import PersonalDetails        from './pages/settings/sections/PersonalDetails.jsx';
import SelfExclusion          from './pages/settings/sections/SelfExclusion.jsx';

import { settings_menu }      from './pages/settings/settings_menu_data';

// To-do: Need to define all the routes in this path to get access from other
//        pages (i.e. it's not accessible to redirect to /settings/apps page.)

function returnComponent(index) {
    if (index === -1) {
        return <Settings data={settings_menu}/>;
    }
    return <AccountPassword data={settings_menu[index]}/>;
}

Settings.displayName = 'Settings';

const routes = [
    {
        path     : '/',
        component: TradeApp,
        exact    : true,
    }, {
        path            : '/statement',
        component       : Statement,
        is_authenticated: true,
    }, {
        path     : '/settings',
        component: Settings,
        routes   : [
            {
                render: () => returnComponent(0),
                path  : '/personal', // To-do: Redirect to personal Details as a default
            }, {
                render: () => returnComponent(1),
                path  : '/financial',
            }, {
                render: () => returnComponent(2),
                path  : '/account_password',
            }, {
                render: () => returnComponent(3),
                path  : '/cashier_password',
            }, {
                render: () => returnComponent(4),
                path  : '/exclusion',
            }, {
                render: () => returnComponent(5),
                path  : '/limits',
            }, {
                render: () => returnComponent(6),
                path  : '/history',
            }, {
                render: () => returnComponent(7),
                path  : '/token',
            }, {
                render: () => returnComponent(8),
                path  : '/apps',
            },
        ],
    },
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
