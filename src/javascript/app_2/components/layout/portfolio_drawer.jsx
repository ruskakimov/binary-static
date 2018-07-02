import moment       from 'moment';
import React        from 'react';
import PropTypes    from 'prop-types';
import { localize } from '../../../_common/localize';
import { connect }  from '../../store/connect';
import Url          from '../../../_common/url';

class PortfolioDrawer extends React.PureComponent {
    state = { is_open: true, width: window.innerWidth };

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleVisibility = () => {
        this.setState({ is_open: !this.state.is_open });
    };

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

    // TODO: calculate remaining time and render
    getRemainingTime = (epoch) => {
        const time_left = parseInt(moment.unix(epoch) - this.props.server_time.unix());
        return time_left;
    };

    render() {
        const { width, is_open } = this.state;
        const is_mobile = width <= 1024;
        const header = (
            is_mobile ?
                <div
                    className='portfolio-drawer-header'
                    onClick={this.handleVisibility}
                >
                    <span className='ic-portfolio' />
                    <p>{localize('Portfolio')}</p>
                    <span className={`ic-close ${is_open ? 'open': '' }`} />
                </div>
                :
                <div className='portfolio-drawer-header'>
                    <span className='ic-portfolio' />
                    <p>{localize('Portfolio Quick Menu')}</p>
                    <a
                        href='javascript:;'
                        className='ic-close'
                        onClick={this.props.toggleDrawer}
                    />
                </div>
        );

        return (
            <div className='portfolio-drawer'>
                { header }
                <div className={`portfolio-list ${is_open ? 'show': '' }`}>
                    {
                        this.props.portfolios.map((portfolio, idx) => (
                            <div key={idx} className='portfolio'>
                                <div
                                    className='trade-type-wrapper'
                                >
                                    <img
                                        className='type'
                                        src={Url.urlForStatic(`images/trading_app/purchase/trade_types/ic_${portfolio.contract_type.toLowerCase().replace(/\s/g, '_')}_light.svg`) || undefined}
                                    />
                                    <h4>{portfolio.contract_type.toLowerCase()}</h4>
                                </div>
                                <div className='asset'>
                                    <span className='symbol'>{portfolio.symbol}</span>
                                    <span className={`indicative-${portfolio.buy_price > 0 ? 'positive' : 'negative'}`}>
                                        {Math.abs(portfolio.buy_price)}
                                    </span>
                                    <span className='remaining-time'>{moment(this.getRemainingTime(portfolio.expiry_time)).format(is_mobile ? 'HH:mm' : 'HH:mm:ss')}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

PortfolioDrawer.propTypes = {
    alignment   : PropTypes.string,
    portfolios  : PropTypes.array,
    server_time : PropTypes.object,
    is_drawer_on: PropTypes.bool,
    toggleDrawer: PropTypes.func,
};

export default connect(
    ({ common, trade, ui }) => ({
        server_time : common.server_time,
        portfolios  : trade.portfolios,
        is_drawer_on: ui.is_portfolio_drawer_on,
        toggleDrawer: ui.togglePortfolioDrawer,
    })
)(PortfolioDrawer);
