import React           from 'react';
import PropTypes       from 'prop-types';
import Amount          from './components/amount.jsx';
import Barrier         from './components/barrier.jsx';
import ContractType    from './components/contract_type.jsx';
import Duration        from './components/duration.jsx';
import MobileWidget    from './components/elements/mobile_widget.jsx';
import LastDigit       from './components/last_digit.jsx';
import Purchase        from './components/purchase.jsx';
import StartDate       from './components/start_date.jsx';
import Test            from './components/test.jsx';
import SmartCharts     from '../../components/charts/smartcharts.jsx';
import PortfolioDrawer from '../../components/elements/portfolio_drawer.jsx';
import { connect }     from '../../store/connect';

import { NavLink } from 'react-router-dom';

const form_components = [
    { name: 'start_date', Component: StartDate },
    { name: 'duration',   Component: Duration },
    { name: 'barrier',    Component: Barrier },
    { name: 'last_digit', Component: LastDigit },
    { name: 'amount',     Component: Amount },
];

class TradeApp extends React.PureComponent {
    isVisible(component_name) {
        return this.props.form_components.includes(component_name);
    }

    renderFormComponents() {
        return form_components
            .filter(({ name }) => this.isVisible(name))
            .map(({ name, Component }) => <Component key={name} />);
    }

    render() {
        return (
            <div id='trade_container' className={this.props.is_portfolio_drawer_on ? 'show' : undefined}>
                <div className='chart-container notice-msg'>
                    <SmartCharts />
                    <Test />
                </div>
                <div className='sidebar-container desktop-only' style={this.props.is_trade_enabled ? {} : { backgroundColor: '#e9e9e9' }}>{/* TODO: update the disabled style */}
                    <fieldset className='trade-types'>
                        <ContractType className='desktop-only' />
                    </fieldset>
                    {this.renderFormComponents()}
                    <Purchase />
                </div>
                <ContractType className='mobile-only' is_mobile_widget />
                <div className='mobile-only'>
                    <MobileWidget>
                        {this.renderFormComponents()}
                    </MobileWidget>
                </div>
                <div className='offset-container'>
                    <PortfolioDrawer
                        onClick={this.props.togglePortfolioDrawer}
                        portfolios={this.props.portfolios}
                        server_time={this.props.server_time}
                    />
                </div>
            </div>
        );
    }
}

TradeApp.propTypes = {
    form_components       : PropTypes.array,
    is_portfolio_drawer_on: PropTypes.bool,
    is_purchase_enabled   : PropTypes.bool,
    is_trade_enabled      : PropTypes.bool,
    portfolios            : PropTypes.array,
    server_time           : PropTypes.object,
    togglePortfolioDrawer : PropTypes.func,
};

export default connect(
    ({ common, trade, ui }) => ({
        server_time           : common.server_time,
        is_purchase_enabled   : trade.is_purchase_enabled,
        is_trade_enabled      : trade.is_trade_enabled,
        form_components       : trade.form_components,
        portfolios            : trade.portfolios,
        is_portfolio_drawer_on: ui.is_portfolio_drawer_on,
        togglePortfolioDrawer : ui.togglePortfolioDrawer,
    })
)(TradeApp);
