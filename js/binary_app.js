webpackJsonp([3],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(149);

/**
 * Write loading image to a container for ajax request
 *
 * @param container: a DOM element
 * @param theme: dark or white
 */
var showLoadingImage = function showLoadingImage(container) {
    var theme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dark';

    var loading_div = createElement('div', { class: 'barspinner ' + theme, html: Array.from(new Array(5)).map(function (x, i) {
            return '<div class="rect' + (i + 1) + '"></div>';
        }).join('') });
    container.html(loading_div);
};

/**
 * Returns the highest z-index in the page.
 * Accepts a jquery style selector to only check those elements,
 * uses all container tags by default
 * If no element found, returns null.
 *
 * @param selector: a jquery style selector for target elements
 * @return int|null
 */
var getHighestZIndex = function getHighestZIndex() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div,p,area,nav,section,header,canvas,aside,span';

    var elements = selector.split(',');
    var all = [];

    for (var i = 0; i < elements.length; i++) {
        var els = document.getElementsByTagName(elements);
        for (var j = 0; j < els.length; j++) {
            if (els[i].offsetParent) {
                var z = els[i].style['z-index'];
                if (!isNaN(z)) {
                    all.push(z);
                }
            }
        }
    }

    return all.length ? Math.max.apply(Math, all) : null;
};

var downloadCSV = function downloadCSV(csv_contents) {
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'data.csv';

    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(new Blob([csv_contents], { type: 'text/csv;charset=utf-8;' }), filename);
    } else {
        // Other browsers
        var csv = 'data:text/csv;charset=utf-8,' + csv_contents;
        var download_link = createElement('a', { href: encodeURI(csv), download: filename });

        if (document.body) {
            document.body.appendChild(download_link);
            download_link.click();
            document.body.removeChild(download_link);
        }
    }
};

var template = function template(string, content) {
    return string.replace(/\[_(\d+)]/g, function (s, index) {
        return content[+index - 1];
    });
};

var isEmptyObject = function isEmptyObject(obj) {
    var is_empty = true;
    if (obj && obj instanceof Object) {
        Object.keys(obj).forEach(function (key) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) is_empty = false;
        });
    }
    return is_empty;
};

var cloneObject = function cloneObject(obj) {
    return !isEmptyObject(obj) ? $.extend(true, Array.isArray(obj) ? [] : {}, obj) : obj;
};

var getPropertyValue = function getPropertyValue(obj, k) {
    var keys = k;
    if (!Array.isArray(keys)) keys = [keys];
    if (!isEmptyObject(obj) && keys[0] in obj && keys && keys.length > 1) {
        return getPropertyValue(obj[keys[0]], keys.slice(1));
    }
    // else return clone of object to avoid overwriting data
    return obj ? cloneObject(obj[keys[0]]) : undefined;
};

var handleHash = function handleHash() {
    var hash = window.location.hash;
    if (hash) {
        document.querySelector('a[href="' + hash + '"]').click();
    }
};

var clearable = function clearable(element) {
    element.addClass('clear');
    document.addEventListener('mousemove', function (e) {
        if (/clear/.test(e.target.classList)) {
            e.stopPropagation();
            e.target.toggleClass('onClear', e.target.offsetWidth - 18 < e.clientX - e.target.getBoundingClientRect().left);
        }
    });
    document.addEventListener('mousedown', function (e) {
        if (/onClear/.test(e.target.classList)) {
            e.stopPropagation();
            e.target.setAttribute('data-value', '');
            e.target.classList.remove('clear', 'onClear');
            e.target.value = '';
            e.target.dispatchEvent(new Event('change'));
        }
    });
};

/**
 * Creates a DOM element and adds any attributes to it.
 *
 * @param {String} tag_name: the tag to create, e.g. 'div', 'a', etc
 * @param {Object} attributes: all the attributes to assign, e.g. { id: '...', class: '...', html: '...', ... }
 * @return the created DOM element
 */
var createElement = function createElement(tag_name) {
    var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var el = document.createElement(tag_name);
    Object.keys(attributes).forEach(function (attr) {
        var value = attributes[attr];
        if (attr === 'text') {
            el.textContent = value;
        } else if (attr === 'html') {
            el.html(value);
        } else {
            el.setAttribute(attr, value);
        }
    });
    return el;
};

/**
 * Apply function to all elements based on selector passed
 *
 * @param {String|Element} selector: selector of the elements to apply the function to, e.g. '.class', '#id', 'tag', etc
 * can also be a DOM element
 * @param {Function} funcToRun: function to apply
 * @param {String} func_selector: method of finding the selector, optional
 * @param {Element} el_parent: parent of the selector, document by default
 */
var applyToAllElements = function applyToAllElements(selector, funcToRun, func_selector, el_parent) {
    if (!selector || !funcToRun) {
        return;
    }

    var function_selector = func_selector;
    var element_to_select = selector;
    if (!func_selector && !element_to_select.nodeName) {
        if (/[\s#]/.test(element_to_select) || element_to_select.lastIndexOf('.') !== 0) {
            function_selector = 'querySelectorAll';
        } else if (element_to_select.lastIndexOf('.') === 0) {
            function_selector = 'getElementsByClassName';
            element_to_select = element_to_select.substring(1);
        } else if (/^[a-zA-Z]+$/.test(element_to_select)) {
            function_selector = 'getElementsByTagName';
        }
    }
    var parent_element = el_parent || document;
    var el = element_to_select.nodeName || (typeof element_to_select === 'undefined' ? 'undefined' : _typeof(element_to_select)) === 'object' ? element_to_select : parent_element[function_selector](element_to_select);
    for (var i = 0; i < el.length; i++) {
        funcToRun(el[i]);
    }
};

/**
 * Returns the first parent element that matches the selector (including el itself)
 *
 * @param {Element} el      : element to start looking for parent
 * @param {String}  selector: selector to find the element that matches to, e.g. '.class', '#id', 'tag', or a combination of them
 */
var findParent = function findParent(el, selector) {
    if (el && el.nodeName !== 'BODY' && typeof el.matches === 'function') {
        return el.matches(selector) ? el : findParent(el.parentNode, selector);
    }
    return null;
};

module.exports = {
    showLoadingImage: showLoadingImage,
    getHighestZIndex: getHighestZIndex,
    downloadCSV: downloadCSV,
    template: template,
    isEmptyObject: isEmptyObject,
    cloneObject: cloneObject,
    getPropertyValue: getPropertyValue,
    handleHash: handleHash,
    clearable: clearable,
    createElement: createElement,
    applyToAllElements: applyToAllElements,
    findParent: findParent
};

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var template = __webpack_require__(0).template;

var Localize = function () {
    var localized_texts = void 0;

    var localizeForLang = function localizeForLang(lang) {
        localized_texts = texts_json[lang.toUpperCase()];
        moment.locale(lang.toLowerCase());
    };

    var doLocalize = function doLocalize(txt, params) {
        var text = txt;

        var index = text.replace(/[\s|.]/g, '_');

        text = localized_texts && localized_texts[index] || text;

        // only use template when explicitly required
        return params ? template(text, params) : text;
    };

    var localize = function localize(text, params) {
        return Array.isArray(text) ? text.map(function (t) {
            return doLocalize(t, params);
        }) : doLocalize(text, params);
    };

    return {
        localize: localize,
        forLang: localizeForLang
    };
}();

module.exports = Localize;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createElement = __webpack_require__(0).createElement;

// show hedging value if trading purpose is set to hedging else hide it
var detectHedging = function detectHedging($purpose, $hedging) {
    $purpose.change(function () {
        $hedging.setVisibility($purpose.val() === 'Hedging');
    });
};

var jqueryuiTabsToDropdown = function jqueryuiTabsToDropdown($container) {
    var $ddl = $('<select/>');
    $container.find('li a').each(function () {
        $ddl.append($('<option/>', { text: $(this).text(), value: $(this).attr('href') }));
    });
    $ddl.change(function () {
        $container.find('li a[href="' + $(this).val() + '"]').click();
    });
    return $ddl;
};

var makeOption = function makeOption(options) {
    // setting null value helps with detecting required error
    // on 'Please select' options
    // that have no value of their own
    var option_el = createElement('option', { text: options.text, value: options.value || '' });

    if (options.is_disabled && options.is_disabled.toLowerCase() === 'disabled') {
        option_el.setAttribute('disabled', 'disabled');
    }
    if (options.class) {
        option_el.className = options.class;
    }
    if (options.is_selected) {
        option_el.setAttribute('selected', 'selected');
    }
    return option_el;
};

/*
 * function to check if element is visible or not
 *
 * alternative to jquery $('#id').is(':visible')
 */
var isVisible = function isVisible(elem) {
    return !(!elem || elem.offsetWidth === 0 && elem.offsetHeight === 0);
};

/*
 * function to check if browser supports the type date/time
 * send a wrong val in case browser 'pretends' to support
 */
var checkInput = function checkInput(type, wrong_val) {
    var input = createElement('input', { type: type, value: wrong_val });
    return input.value !== wrong_val;
};

/*
 * function to check if new date is selected using native picker
 * if yes, update the data-value. if no, return false.
 */
var dateValueChanged = function dateValueChanged(element, type) {
    var value = void 0;
    if (element.selectedOptions) {
        value = element.selectedOptions[0].getAttribute('data-value');
    } else {
        value = element.value;
    }
    if (element.getAttribute('data-value') === value) {
        return false;
    }
    if (element.getAttribute('type') === type) {
        element.setAttribute('data-value', value);
    }
    return true;
};

var selectorExists = function selectorExists(element) {
    return typeof element !== 'undefined' && element !== null;
};

var getSetElementValue = function getSetElementValue(element, text, type) {
    // eslint-disable-line consistent-return
    if (selectorExists(element)) {
        if (typeof text === 'undefined') return element[type];
        // else
        element[type] = text;
    }
};

var requireHighstock = function requireHighstock(callback) {
    return __webpack_require__.e/* require.ensure */(0).then((function (require) {
        var Highstock = __webpack_require__(202);
        return callback(Highstock);
    }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};

/*
 * @param  {String}  id_selector   the selector for the element
 * @param  {Element} parent        optional selector to use for parent, defaults to document
 * @return {Element}               return element if it exists, if it doesn't return a dummy element
 */
var getElementById = function getElementById(id_selector) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return parent.getElementById(id_selector) || createElement('div');
};

/*
 * @param  {String}  class_name    the selector class for the element
 * @param  {Element} parent        optional selector to use for parent, defaults to document
 * @return {Element}               return element if it is visible
 */
var getVisibleElement = function getVisibleElement(class_name) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return Array.from(parent.getElementsByClassName(class_name)).find(function (el) {
        return isVisible(el);
    });
};

module.exports = {
    detectHedging: detectHedging,
    jqueryuiTabsToDropdown: jqueryuiTabsToDropdown,
    makeOption: makeOption,
    isVisible: isVisible,
    checkInput: checkInput,
    dateValueChanged: dateValueChanged,
    selectorExists: selectorExists,
    requireHighstock: requireHighstock,
    getElementById: getElementById,
    getVisibleElement: getVisibleElement,
    elementTextContent: function elementTextContent(element, text) {
        return getSetElementValue(element, text, 'textContent');
    },
    elementInnerHtml: function elementInnerHtml(element, text) {
        return getSetElementValue(element, text, 'innerHTML');
    }
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cookies = __webpack_require__(33);
var moment = __webpack_require__(9);
var BinarySocket = __webpack_require__(5);
var SocketCache = __webpack_require__(55);
var jpClient = __webpack_require__(10).jpClient;
var isCryptocurrency = __webpack_require__(7).isCryptocurrency;
var RealityCheckData = __webpack_require__(108);
var getElementById = __webpack_require__(3).getElementById;
var LocalStore = __webpack_require__(6).LocalStore;
var State = __webpack_require__(6).State;
var urlFor = __webpack_require__(8).urlFor;
var applyToAllElements = __webpack_require__(0).applyToAllElements;
var getPropertyValue = __webpack_require__(0).getPropertyValue;
var isEmptyObject = __webpack_require__(0).isEmptyObject;

var Client = function () {
    var storage_key = 'client.accounts';
    var client_object = {};
    var current_loginid = void 0;

    var init = function init() {
        current_loginid = LocalStore.get('active_loginid');
        client_object = getAllAccountsObject();
    };

    var isLoggedIn = function isLoggedIn() {
        return !isEmptyObject(getAllAccountsObject()) && get('loginid') && get('token');
    };

    var isValidLoginid = function isValidLoginid() {
        if (!isLoggedIn()) return true;
        var valid_login_ids = new RegExp('^(MX|MF|VRTC|MLT|CR|FOG|VRTJ|JP)[0-9]+$', 'i');
        return getAllLoginids().every(function (loginid) {
            return valid_login_ids.test(loginid);
        });
    };

    /**
     * Stores the client information in local variable and localStorage
     *
     * @param {String} key                 The property name to set
     * @param {String|Number|Object} value The regarding value
     * @param {String|null} loginid        The account to set the value for
     */
    var set = function set(key, value) {
        var loginid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : current_loginid;

        if (key === 'loginid' && value !== current_loginid) {
            LocalStore.set('active_loginid', value);
            current_loginid = value;
        } else {
            if (!(loginid in client_object)) {
                client_object[loginid] = {};
            }
            client_object[loginid][key] = value;
            LocalStore.setObject(storage_key, client_object);
        }
    };

    /**
     * Returns the client information
     *
     * @param {String|null} key     The property name to return the value from, if missing returns the account object
     * @param {String|null} loginid The account to return the value from
     */
    var get = function get(key) {
        var loginid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : current_loginid;

        var value = void 0;
        if (key === 'loginid') {
            value = loginid || LocalStore.get('active_loginid');
        } else {
            var current_client = client_object[loginid] || getAllAccountsObject()[loginid] || {};

            value = key ? current_client[key] : current_client;
        }
        if (!Array.isArray(value) && (+value === 1 || +value === 0 || value === 'true' || value === 'false')) {
            value = JSON.parse(value || false);
        }
        return value;
    };

    var getAllAccountsObject = function getAllAccountsObject() {
        return LocalStore.getObject(storage_key);
    };

    var getAllLoginids = function getAllLoginids() {
        return Object.keys(getAllAccountsObject());
    };

    var getAccountType = function getAccountType() {
        var loginid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : current_loginid;

        var account_type = void 0;
        if (/^VR/.test(loginid)) account_type = 'virtual';else if (/^MF/.test(loginid)) account_type = 'financial';else if (/^MLT/.test(loginid)) account_type = 'gaming';
        return account_type;
    };

    var isAccountOfType = function isAccountOfType(type) {
        var loginid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : current_loginid;
        var only_enabled = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var this_type = getAccountType(loginid);
        return (type === 'virtual' && this_type === 'virtual' || type === 'real' && this_type !== 'virtual' || type === this_type) && (only_enabled ? !get('is_disabled', loginid) : true);
    };

    var getAccountOfType = function getAccountOfType(type, only_enabled) {
        var id = getAllLoginids().find(function (loginid) {
            return isAccountOfType(type, loginid, only_enabled);
        });
        return id ? $.extend({ loginid: id }, get(null, id)) : {};
    };

    var hasAccountType = function hasAccountType(type, only_enabled) {
        return !isEmptyObject(getAccountOfType(type, only_enabled));
    };

    // only considers currency of real money accounts
    // @param {String} type = crypto|fiat
    var hasCurrencyType = function hasCurrencyType(type) {
        var loginids = getAllLoginids();
        if (type === 'crypto') {
            // find if has crypto currency account
            return loginids.find(function (loginid) {
                return !get('is_virtual', loginid) && isCryptocurrency(get('currency', loginid));
            });
        }
        // else find if have fiat currency account
        return loginids.find(function (loginid) {
            return !get('is_virtual', loginid) && !isCryptocurrency(get('currency', loginid));
        });
    };

    var types_map = {
        virtual: 'Virtual',
        gaming: 'Gaming',
        financial: 'Investment'
    };

    var getAccountTitle = function getAccountTitle(loginid) {
        return types_map[getAccountType(loginid)] || 'Real';
    };

    var responseAuthorize = function responseAuthorize(response) {
        var authorize = response.authorize;
        set('email', authorize.email);
        set('currency', authorize.currency);
        set('is_virtual', +authorize.is_virtual);
        set('session_start', parseInt(moment().valueOf() / 1000));
        set('landing_company_shortcode', authorize.landing_company_name);
        updateAccountList(authorize.account_list);
    };

    var updateAccountList = function updateAccountList(account_list) {
        account_list.forEach(function (account) {
            set('excluded_until', account.excluded_until || '', account.loginid);
            Object.keys(account).forEach(function (param) {
                var param_to_set = param === 'country' ? 'residence' : param;
                var value_to_set = typeof account[param] === 'undefined' ? '' : account[param];
                if (param_to_set !== 'loginid') {
                    set(param_to_set, value_to_set, account.loginid);
                }
            });
        });
    };

    var shouldAcceptTnc = function shouldAcceptTnc() {
        if (get('is_virtual')) return false;
        var website_tnc_version = State.getResponse('website_status.terms_conditions_version');
        var client_tnc_status = State.getResponse('get_settings.client_tnc_status');
        return typeof client_tnc_status !== 'undefined' && client_tnc_status !== website_tnc_version;
    };

    var clearAllAccounts = function clearAllAccounts() {
        current_loginid = undefined;
        client_object = {};
        LocalStore.setObject(storage_key, client_object);

        var hash = window.location.hash;
        if (/no-reality-check/.test(hash)) {
            window.location.hash = hash.replace('no-reality-check', '');
        }
    };

    var processNewAccount = function processNewAccount(options) {
        if (!options.email || !options.loginid || !options.token) {
            return;
        }

        SocketCache.clear();
        localStorage.setItem('GTM_new_account', '1');

        set('token', options.token, options.loginid);
        set('email', options.email, options.loginid);
        set('is_virtual', +options.is_virtual, options.loginid);
        set('loginid', options.loginid);

        // need to redirect not using pjax
        window.location.href = options.redirect_url || defaultRedirectUrl();
    };

    var shouldShowJP = function shouldShowJP(el, is_jp) {
        return is_jp ? !/ja-hide/.test(el.classList) || /ja-show/.test(el.classList) : !/ja-show/.test(el.classList);
    };

    var activateByClientType = function activateByClientType(section_id) {
        var topbar_class = getElementById('topbar').classList;
        var el_section = section_id ? getElementById(section_id) : document.body;

        var primary_bg_color_dark = 'primary-bg-color-dark';
        var secondary_bg_color = 'secondary-bg-color';

        if (isLoggedIn()) {
            BinarySocket.wait('authorize', 'website_status', 'get_account_status').then(function () {
                var client_logged_in = getElementById('client-logged-in');
                client_logged_in.classList.add('gr-centered');

                // we need to call jpClient after authorize response so we know client's residence
                var is_jp = jpClient();

                applyToAllElements('.client_logged_in', function (el) {
                    if (shouldShowJP(el, is_jp)) {
                        el.setVisibility(1);
                    }
                });

                if (get('is_virtual')) {
                    applyToAllElements('.client_virtual', function (el) {
                        el.setVisibility(1);
                    }, '', el_section);
                    topbar_class.add(secondary_bg_color);
                    topbar_class.remove(primary_bg_color_dark);
                } else {
                    applyToAllElements('.client_real', function (el) {
                        if (shouldShowJP(el, is_jp)) {
                            el.setVisibility(1);
                        }
                    }, '', el_section);
                    topbar_class.add(primary_bg_color_dark);
                    topbar_class.remove(secondary_bg_color);
                }
            });
        } else {
            var is_jp = jpClient();
            applyToAllElements('.client_logged_out', function (el) {
                if (shouldShowJP(el, is_jp)) {
                    el.setVisibility(1);
                }
            }, '', el_section);
            topbar_class.add(primary_bg_color_dark);
            topbar_class.remove(secondary_bg_color);
        }
    };

    var sendLogoutRequest = function sendLogoutRequest(show_login_page) {
        if (show_login_page) {
            sessionStorage.setItem('showLoginPage', 1);
        }
        BinarySocket.send({ logout: '1' });
    };

    var doLogout = function doLogout(response) {
        if (response.logout !== 1) return;
        cleanupCookies('login', 'loginid', 'loginid_list', 'email', 'residence', 'settings'); // backward compatibility
        cleanupCookies('reality_check', 'affiliate_token', 'affiliate_tracking');
        clearAllAccounts();
        set('loginid', '');
        SocketCache.clear();
        RealityCheckData.clear();
        var redirect_to = getPropertyValue(response, ['echo_req', 'passthrough', 'redirect_to']);
        if (redirect_to) {
            window.location.href = redirect_to;
        } else {
            window.location.reload();
        }
    };

    var cleanupCookies = function cleanupCookies() {
        for (var _len = arguments.length, cookie_names = Array(_len), _key = 0; _key < _len; _key++) {
            cookie_names[_key] = arguments[_key];
        }

        var domains = ['.' + document.domain.split('.').slice(-2).join('.'), '.' + document.domain];

        var parent_path = window.location.pathname.split('/', 2)[1];
        if (parent_path !== '') {
            parent_path = '/' + parent_path;
        }

        cookie_names.forEach(function (c) {
            Cookies.remove(c, { path: '/', domain: domains[0] });
            Cookies.remove(c, { path: '/', domain: domains[1] });
            Cookies.remove(c);
            if (new RegExp(c).test(document.cookie) && parent_path) {
                Cookies.remove(c, { path: parent_path, domain: domains[0] });
                Cookies.remove(c, { path: parent_path, domain: domains[1] });
                Cookies.remove(c, { path: parent_path });
            }
        });
    };

    var currentLandingCompany = function currentLandingCompany() {
        var landing_company_response = State.getResponse('landing_company') || {};
        var this_shortcode = get('landing_company_shortcode');
        var landing_company_prop = Object.keys(landing_company_response).find(function (key) {
            return this_shortcode === landing_company_response[key].shortcode;
        });
        return landing_company_response[landing_company_prop] || {};
    };

    var shouldCompleteTax = function shouldCompleteTax() {
        return isAccountOfType('financial') && !/crs_tin_information/.test((State.getResponse('get_account_status') || {}).status);
    };

    var getMT5AccountType = function getMT5AccountType(group) {
        return group ? group.replace('\\', '_') : '';
    };

    var getUpgradeInfo = function getUpgradeInfo() {
        var upgradeable_landing_companies = State.getResponse('authorize.upgradeable_landing_companies');

        var can_upgrade = !!(upgradeable_landing_companies && upgradeable_landing_companies.length);
        var can_open_multi = false;
        var type = void 0,
            upgrade_link = void 0;
        if (can_upgrade) {
            var current_landing_company = get('landing_company_shortcode');

            can_open_multi = !!upgradeable_landing_companies.find(function (landing_company) {
                return landing_company === current_landing_company;
            });

            // only show upgrade message to landing companies other than current
            var canUpgrade = function canUpgrade(arr_landing_company) {
                return !!arr_landing_company.find(function (landing_company) {
                    return landing_company !== current_landing_company && upgradeable_landing_companies.indexOf(landing_company) !== -1;
                });
            };

            if (canUpgrade(['costarica', 'malta', 'iom'])) {
                type = 'real';
                upgrade_link = 'realws';
            } else if (canUpgrade(['maltainvest'])) {
                type = 'financial';
                upgrade_link = 'maltainvestws';
            } else if (canUpgrade(['japan'])) {
                type = 'real';
                upgrade_link = 'japanws';
            } else {
                can_upgrade = false;
            }
        }
        return {
            type: type,
            can_upgrade: can_upgrade,
            can_open_multi: can_open_multi,
            upgrade_link: upgrade_link ? 'new_account/' + upgrade_link : undefined,
            is_current_path: upgrade_link ? new RegExp(upgrade_link, 'i').test(window.location.pathname) : undefined
        };
    };

    var getLandingCompanyValue = function getLandingCompanyValue(loginid, landing_company, key) {
        var landing_company_object = void 0;
        if (loginid.financial || isAccountOfType('financial', loginid)) {
            landing_company_object = getPropertyValue(landing_company, 'financial_company');
        } else if (loginid.real || isAccountOfType('real', loginid)) {
            landing_company_object = getPropertyValue(landing_company, 'gaming_company');

            // handle accounts such as japan that don't have gaming company
            if (!landing_company_object) {
                landing_company_object = getPropertyValue(landing_company, 'financial_company');
            }
        } else {
            var financial_company = (getPropertyValue(landing_company, 'financial_company') || {})[key] || [];
            var gaming_company = (getPropertyValue(landing_company, 'gaming_company') || {})[key] || [];
            landing_company_object = financial_company.concat(gaming_company);
            return landing_company_object;
        }
        return (landing_company_object || {})[key];
    };

    // API_V3: send a list of accounts the client can transfer to
    var canTransferFunds = function canTransferFunds(account) {
        if (account) {
            // this specific account can be used to transfer funds to
            return canTransferFundsTo(account.loginid);
        }
        // at least one account can be used to transfer funds to
        return Object.keys(client_object).some(function (loginid) {
            return canTransferFundsTo(loginid);
        });
    };

    var canTransferFundsTo = function canTransferFundsTo(to_loginid) {
        if (to_loginid === current_loginid || get('is_virtual', to_loginid) || get('is_virtual') || get('is_disabled', to_loginid)) {
            return false;
        }
        var from_currency = get('currency');
        var to_currency = get('currency', to_loginid);
        if (!from_currency || !to_currency) {
            return false;
        }
        // only transfer to other accounts that have the same currency as current account if one is maltainvest and one is malta
        if (from_currency === to_currency) {
            // these landing companies are allowed to transfer funds to each other if they have the same currency
            var same_cur_allowed = {
                maltainvest: 'malta',
                malta: 'maltainvest'
            };
            var from_landing_company = get('landing_company_shortcode');
            var to_landing_company = get('landing_company_shortcode', to_loginid);
            // if same_cur_allowed[from_landing_company] is undefined and to_landing_company is also undefined, it will return true
            // so we should compare '' === undefined instead
            return (same_cur_allowed[from_landing_company] || '') === to_landing_company;
        }
        // or for other clients if current account is cryptocurrency it should only transfer to fiat currencies and vice versa
        var is_from_crypto = isCryptocurrency(from_currency);
        var is_to_crypto = isCryptocurrency(to_currency);
        return is_from_crypto ? !is_to_crypto : is_to_crypto;
    };

    var hasCostaricaAccount = function hasCostaricaAccount() {
        return !!getAllLoginids().find(function (loginid) {
            return (/^CR/.test(loginid)
            );
        });
    };

    var canRequestProfessional = function canRequestProfessional() {
        var residence = get('residence');
        /* Austria, Italy, Belgium, Latvia, Bulgaria,	Lithuania, Croatia, Luxembourg, Cyprus, Malta, Czech Republic,	Netherlands, Denmark, Poland, Estonia, Portugal, Finland, Romania, France, Slovakia, Germany, Slovenia, Greece, Spain, Hungary, Sweden, Ireland, United Kingdom, Australia, New Zealand, Singapore, Canada, Switzerland */
        var countries = ['at', 'it', 'be', 'lv', 'bg', 'lt', 'hr', 'lu', 'cy', 'mt', 'cf', 'nl', 'dk', 'pl', 'ee', 'pt', 'fi', 'ro', 'fr', 'sk', 'de', 'si', 'gr', 'es', 'hu', 'se', 'ie', 'gb', 'au', 'nz', 'sg', 'ca', 'ch'];
        return countries.indexOf(residence.toLowerCase()) !== -1;
    };

    var defaultRedirectUrl = function defaultRedirectUrl() {
        return urlFor(jpClient() ? 'multi_barriers_trading' : 'trading');
    };

    return {
        init: init,
        isValidLoginid: isValidLoginid,
        set: set,
        get: get,
        getAllLoginids: getAllLoginids,
        getAccountType: getAccountType,
        isAccountOfType: isAccountOfType,
        getAccountOfType: getAccountOfType,
        hasAccountType: hasAccountType,
        hasCurrencyType: hasCurrencyType,
        responseAuthorize: responseAuthorize,
        shouldAcceptTnc: shouldAcceptTnc,
        clearAllAccounts: clearAllAccounts,
        processNewAccount: processNewAccount,
        isLoggedIn: isLoggedIn,
        sendLogoutRequest: sendLogoutRequest,
        cleanupCookies: cleanupCookies,
        doLogout: doLogout,
        shouldCompleteTax: shouldCompleteTax,
        getMT5AccountType: getMT5AccountType,
        getUpgradeInfo: getUpgradeInfo,
        getAccountTitle: getAccountTitle,
        activateByClientType: activateByClientType,
        currentLandingCompany: currentLandingCompany,
        getLandingCompanyValue: getLandingCompanyValue,
        canTransferFunds: canTransferFunds,
        hasCostaricaAccount: hasCostaricaAccount,
        canRequestProfessional: canRequestProfessional,
        defaultRedirectUrl: defaultRedirectUrl
    };
}();

module.exports = Client;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SocketCache = __webpack_require__(55);
var getLanguage = __webpack_require__(13).get;
var localize = __webpack_require__(2).localize;
var State = __webpack_require__(6).State;
var getPropertyValue = __webpack_require__(0).getPropertyValue;
var isEmptyObject = __webpack_require__(0).isEmptyObject;
var getAppId = __webpack_require__(32).getAppId;
var getSocketURL = __webpack_require__(32).getSocketURL;

/*
 * An abstraction layer over native javascript WebSocket,
 * which provides additional functionality like
 * reopen the closed connection and process the buffered requests
 */
var BinarySocket = function () {
    var binary_socket = void 0;

    var config = {};
    var buffered_sends = [];
    var req_id = 0;
    var wrong_app_id = 0;
    var is_available = true;
    var is_disconnect_called = false;

    var socket_url = getSocketURL() + '?app_id=' + getAppId() + '&l=' + getLanguage();
    var timeouts = {};
    var promises = {};

    var no_duplicate_requests = ['authorize', 'get_settings', 'residence_list', 'landing_company', 'payout_currencies', 'asset_index'];

    var sent_requests = {
        items: [],
        clear: function clear() {
            sent_requests.items = [];
        },
        has: function has(msg_type) {
            return sent_requests.items.indexOf(msg_type) >= 0;
        },
        add: function add(msg_type) {
            if (!sent_requests.has(msg_type)) sent_requests.items.push(msg_type);
        },
        remove: function remove(msg_type) {
            if (sent_requests.has(msg_type)) sent_requests.items.splice(sent_requests.items.indexOf(msg_type, 1));
        }
    };

    var waiting_list = {
        items: {},
        add: function add(msg_type, promise_obj) {
            if (!waiting_list.items[msg_type]) {
                waiting_list.items[msg_type] = [];
            }
            waiting_list.items[msg_type].push(promise_obj);
        },
        resolve: function resolve(response) {
            var msg_type = response.msg_type;
            var this_promises = waiting_list.items[msg_type];
            if (this_promises && this_promises.length) {
                this_promises.forEach(function (pr) {
                    if (!waiting_list.another_exists(pr, msg_type)) {
                        pr.resolve(response);
                    }
                });
                waiting_list.items[msg_type] = [];
            }
        },
        another_exists: function another_exists(pr, msg_type) {
            return Object.keys(waiting_list.items).some(function (type) {
                return type !== msg_type && $.inArray(pr, waiting_list.items[type]) >= 0;
            });
        }
    };

    var clearTimeouts = function clearTimeouts() {
        Object.keys(timeouts).forEach(function (key) {
            clearTimeout(timeouts[key]);
            delete timeouts[key];
        });
    };

    var isReady = function isReady() {
        return hasReadyState(1);
    };

    var isClose = function isClose() {
        return !binary_socket || hasReadyState(2, 3);
    };

    var hasReadyState = function hasReadyState() {
        for (var _len = arguments.length, states = Array(_len), _key = 0; _key < _len; _key++) {
            states[_key] = arguments[_key];
        }

        return binary_socket && states.some(function (s) {
            return binary_socket.readyState === s;
        });
    };

    var sendBufferedRequests = function sendBufferedRequests() {
        while (buffered_sends.length > 0 && is_available) {
            var req_obj = buffered_sends.shift();
            send(req_obj.request, req_obj.options);
        }
    };

    var wait = function wait() {
        for (var _len2 = arguments.length, msg_types = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            msg_types[_key2] = arguments[_key2];
        }

        var promise_obj = new PromiseClass();
        var is_resolved = true;
        msg_types.forEach(function (msg_type) {
            var last_response = State.get(['response', msg_type]);
            if (!last_response) {
                if (msg_type !== 'authorize' || config.isLoggedIn()) {
                    waiting_list.add(msg_type, promise_obj);
                    is_resolved = false;
                }
            } else if (msg_types.length === 1) {
                promise_obj.resolve(last_response);
            }
        });
        if (is_resolved) {
            promise_obj.resolve();
        }
        return promise_obj.promise;
    };

    /**
     * @param {Object} data: request object
     * @param {Object} options:
     *      forced  : {boolean}  sends the request regardless the same msg_type has been sent before
     *      msg_type: {string}   specify the type of request call
     *      callback: {function} to call on response of streaming requests
     */
    var send = function send(data) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var promise_obj = options.promise || new PromiseClass();

        if (!data || isEmptyObject(data)) return promise_obj.promise;

        var msg_type = options.msg_type || no_duplicate_requests.find(function (c) {
            return c in data;
        });

        // Fetch from cache
        if (!options.forced) {
            var response = SocketCache.get(data, msg_type);
            if (response) {
                State.set(['response', msg_type], $.extend({}, response));
                if (isReady() && is_available) {
                    // make the request to keep the cache updated
                    binary_socket.send(JSON.stringify(data));
                }
                promise_obj.resolve(response);
                return promise_obj.promise;
            }
        }

        // Fetch from state
        if (!options.forced && msg_type && no_duplicate_requests.indexOf(msg_type) !== -1) {
            var last_response = State.get(['response', msg_type]);
            if (last_response) {
                promise_obj.resolve(last_response);
                return promise_obj.promise;
            } else if (sent_requests.has(msg_type)) {
                return wait(msg_type).then(function (response) {
                    promise_obj.resolve(response);
                    return promise_obj.promise;
                });
            }
        }

        if (!data.req_id) {
            data.req_id = ++req_id;
        }
        promises[data.req_id] = {
            callback: function callback(response) {
                if (typeof options.callback === 'function') {
                    options.callback(response);
                } else {
                    promise_obj.resolve(response);
                }
            },
            subscribe: !!data.subscribe
        };

        if (isReady() && is_available && config.isOnline()) {
            is_disconnect_called = false;
            if (!getPropertyValue(data, 'passthrough') && !getPropertyValue(data, 'verify_email')) {
                data.passthrough = {};
            }

            binary_socket.send(JSON.stringify(data));
            config.wsEvent('send');
            if (msg_type && !sent_requests.has(msg_type)) {
                sent_requests.add(msg_type);
            }
        } else if (+data.time !== 1) {
            // Do not buffer all time requests
            buffered_sends.push({ request: data, options: $.extend(options, { promise: promise_obj }) });
        }

        return promise_obj.promise;
    };

    var init = function init(options) {
        if (wrong_app_id === getAppId()) {
            return;
        }
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && config !== options) {
            config = options;
            buffered_sends = [];
        }
        clearTimeouts();
        config.wsEvent('init');

        if (isClose()) {
            binary_socket = new WebSocket(socket_url);
            State.set('response', {});
        }

        binary_socket.onopen = function () {
            config.wsEvent('open');
            if (config.isLoggedIn()) {
                send({ authorize: config.getClientValue('token') }, { forced: true });
            } else {
                sendBufferedRequests();
            }

            if (typeof config.onOpen === 'function') {
                config.onOpen(isReady());
            }
        };

        binary_socket.onmessage = function (msg) {
            config.wsEvent('message');
            var response = msg.data ? JSON.parse(msg.data) : undefined;
            if (response) {
                SocketCache.set(response);
                var msg_type = response.msg_type;

                // store in State
                if (!getPropertyValue(response, ['echo_req', 'subscribe']) || /balance|website_status/.test(msg_type)) {
                    State.set(['response', msg_type], $.extend({}, response));
                }
                // resolve the send promise
                var this_req_id = response.req_id;
                var pr = this_req_id ? promises[this_req_id] : null;
                if (pr && typeof pr.callback === 'function') {
                    pr.callback(response);
                    if (!pr.subscribe) {
                        delete promises[this_req_id];
                    }
                }
                // resolve the wait promise
                waiting_list.resolve(response);

                var error_code = getPropertyValue(response, ['error', 'code']);
                switch (error_code) {
                    case 'WrongResponse':
                    case 'InternalServerError':
                    case 'OutputValidationFailed':
                        {
                            if (msg_type !== 'mt5_login_list') {
                                showNoticeMessage(response.error.message);
                            }
                            break;
                        }
                    case 'RateLimit':
                        config.notify(localize('You have reached the rate limit of requests per second. Please try later.'), true, 'RATE_LIMIT');
                        break;
                    case 'InvalidAppID':
                        wrong_app_id = getAppId();
                        config.notify(response.error.message, true, 'INVALID_APP_ID');
                        break;
                    case 'DisabledClient':
                        showNoticeMessage(response.error.message);
                        break;
                    // no default
                }

                if (typeof config.onMessage === 'function') {
                    config.onMessage(response);
                }
            }
        };

        binary_socket.onclose = function () {
            sent_requests.clear();
            clearTimeouts();
            config.wsEvent('close');

            if (wrong_app_id !== getAppId() && typeof config.onDisconnect === 'function' && !is_disconnect_called) {
                config.onDisconnect();
                is_disconnect_called = true;
            }
        };
    };

    var showNoticeMessage = function showNoticeMessage(text) {
        $('#content').empty().html($('<div/>', { class: 'container' }).append($('<p/>', { class: 'notice-msg center-text', text: text })));
    };

    var clear = function clear(msg_type) {
        buffered_sends = [];
        if (msg_type) {
            State.set(['response', msg_type], undefined);
            sent_requests.remove(msg_type);
        }
    };

    var availability = function availability(status) {
        if (typeof status !== 'undefined') {
            is_available = !!status;
        }
        return is_available;
    };

    return {
        init: init,
        wait: wait,
        send: send,
        clear: clear,
        clearTimeouts: clearTimeouts,
        availability: availability,
        hasReadyState: hasReadyState,
        sendBuffered: sendBufferedRequests,
        get: function get() {
            return binary_socket;
        },
        setOnDisconnect: function setOnDisconnect(onDisconnect) {
            config.onDisconnect = onDisconnect;
        },
        removeOnDisconnect: function removeOnDisconnect() {
            delete config.onDisconnect;
        }
    };
}();

var PromiseClass = function PromiseClass() {
    var _this = this;

    _classCallCheck(this, PromiseClass);

    this.promise = new Promise(function (resolve, reject) {
        _this.reject = reject;
        _this.resolve = resolve;
    });
};

module.exports = BinarySocket;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cookies = __webpack_require__(33);
var getPropertyValue = __webpack_require__(0).getPropertyValue;
var isEmptyObject = __webpack_require__(0).isEmptyObject;

var getObject = function getObject(key) {
    return JSON.parse(this.getItem(key) || '{}');
};

var setObject = function setObject(key, value) {
    if (value && value instanceof Object) {
        this.setItem(key, JSON.stringify(value));
    }
};

if (typeof Storage !== 'undefined') {
    Storage.prototype.getObject = getObject;
    Storage.prototype.setObject = setObject;
}

var isStorageSupported = function isStorageSupported(storage) {
    if (typeof storage === 'undefined') {
        return false;
    }

    var test_key = 'test';
    try {
        storage.setItem(test_key, '1');
        storage.removeItem(test_key);
        return true;
    } catch (e) {
        return false;
    }
};

var Store = function Store(storage) {
    this.storage = storage;
    this.storage.getObject = getObject;
    this.storage.setObject = setObject;
};

Store.prototype = {
    get: function get(key) {
        return this.storage.getItem(key) || undefined;
    },
    set: function set(key, value) {
        if (typeof value !== 'undefined') {
            this.storage.setItem(key, value);
        }
    },
    getObject: function getObject(key) {
        return typeof this.storage.getObject === 'function' ? // Prevent runtime error in IE
        this.storage.getObject(key) : JSON.parse(this.storage.getItem(key) || '{}');
    },
    setObject: function setObject(key, value) {
        if (typeof this.storage.setObject === 'function') {
            // Prevent runtime error in IE
            this.storage.setObject(key, value);
        } else {
            this.storage.setItem(key, JSON.stringify(value));
        }
    },
    remove: function remove(key) {
        this.storage.removeItem(key);
    },
    clear: function clear() {
        this.storage.clear();
    }
};

var InScriptStore = function InScriptStore(object) {
    this.store = typeof object !== 'undefined' ? object : {};
};

InScriptStore.prototype = {
    get: function get(key) {
        return getPropertyValue(this.store, key);
    },
    set: function set(k, value) {
        var obj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.store;

        var key = k;
        if (!Array.isArray(key)) key = [key];
        if (key.length > 1) {
            if (!(key[0] in obj) || isEmptyObject(obj[key[0]])) obj[key[0]] = {};
            this.set(key.slice(1), value, obj[key[0]]);
        } else {
            obj[key[0]] = value;
        }
    },
    getObject: function getObject(key) {
        return JSON.parse(this.get(key) || '{}');
    },
    setObject: function setObject(key, value) {
        this.set(key, JSON.stringify(value));
    },
    remove: function remove() {
        var _this = this;

        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
            keys[_key] = arguments[_key];
        }

        keys.forEach(function (key) {
            delete _this.store[key];
        });
    },
    clear: function clear() {
        this.store = {};
    },
    has: function has(key) {
        return this.get(key) !== undefined;
    },
    keys: function keys() {
        return Object.keys(this.store);
    },
    call: function call(key) {
        if (typeof this.get(key) === 'function') this.get(key)();
    }
};

var State = new InScriptStore();
State.prototype = InScriptStore.prototype;
/**
 * Shorthand function to get values from response object of State
 *
 * @param {String} pathname
 *     e.g. getResponse('authorize.currency') == get(['response', 'authorize', 'authorize', 'currency'])
 */
State.prototype.getResponse = function (pathname) {
    var path = pathname;
    if (typeof path === 'string') {
        var _keys = path.split('.');
        path = ['response', _keys[0]].concat(_keys);
    }
    return this.get(path);
};
State.set('response', {});

var CookieStorage = function CookieStorage(cookie_name, cookie_domain) {
    var hostname = window.location.hostname;

    this.initialized = false;
    this.cookie_name = cookie_name;
    this.domain = cookie_domain || (/\.binary\.com/i.test(hostname) ? '.' + hostname.split('.').slice(-2).join('.') : hostname);
    this.path = '/';
    this.expires = new Date('Thu, 1 Jan 2037 12:00:00 GMT');
    this.value = {};
};

CookieStorage.prototype = {
    read: function read() {
        var cookie_value = Cookies.get(this.cookie_name);
        try {
            this.value = cookie_value ? JSON.parse(cookie_value) : {};
        } catch (e) {
            this.value = {};
        }
        this.initialized = true;
    },
    write: function write(val, expireDate, isSecure) {
        if (!this.initialized) this.read();
        this.value = val;
        if (expireDate) this.expires = expireDate;
        Cookies.set(this.cookie_name, this.value, {
            expires: this.expires,
            path: this.path,
            domain: this.domain,
            secure: !!isSecure
        });
    },
    get: function get(key) {
        if (!this.initialized) this.read();
        return this.value[key];
    },
    set: function set(key, val) {
        if (!this.initialized) this.read();
        this.value[key] = val;
        Cookies.set(this.cookie_name, this.value, {
            expires: new Date(this.expires),
            path: this.path,
            domain: this.domain
        });
    },
    remove: function remove() {
        Cookies.remove(this.cookie_name, {
            path: this.path,
            domain: this.domain
        });
    }
};

var SessionStore = void 0,
    LocalStore = void 0;

if (isStorageSupported(window.localStorage)) {
    LocalStore = new Store(window.localStorage);
}
if (isStorageSupported(window.sessionStorage)) {
    SessionStore = new Store(window.sessionStorage);
}

if (!LocalStore) {
    LocalStore = new InScriptStore();
}
if (!SessionStore) {
    SessionStore = new InScriptStore();
}

module.exports = {
    isStorageSupported: isStorageSupported,
    CookieStorage: CookieStorage,
    State: State,
    SessionStore: SessionStore,
    LocalStore: LocalStore
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var jpClient = __webpack_require__(10).jpClient;
var getLanguage = __webpack_require__(13).get;
var localize = __webpack_require__(2).localize;
var getPropertyValue = __webpack_require__(0).getPropertyValue;

var currencies_config = {};

var formatMoney = function formatMoney(currency_value, amount, exclude_currency) {
    var decimals = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var minimumFractionDigits = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

    var money = amount;
    if (money) money = String(money).replace(/,/g, '');
    var sign = money && Number(money) < 0 ? '-' : '';
    var decimal_places = decimals || getDecimalPlaces(currency_value);

    money = isNaN(money) ? 0 : Math.abs(money);
    if (typeof Intl !== 'undefined') {
        var options = {
            minimumFractionDigits: minimumFractionDigits || decimal_places,
            maximumFractionDigits: decimal_places
        };
        money = new Intl.NumberFormat(getLanguage().toLowerCase().replace('_', '-'), options).format(money);
    } else {
        money = addComma(money, decimal_places);
    }

    return sign + (exclude_currency ? '' : formatCurrency(currency_value)) + money;
};

var formatCurrency = function formatCurrency(currency) {
    return '<span class="symbols ' + (currency || '').toLowerCase() + '"></span>';
}; // defined in binary-style

var addComma = function addComma(num, decimal_points, is_crypto) {
    var number = String(num || 0).replace(/,/g, '');
    if (typeof decimal_points !== 'undefined') {
        number = (+number).toFixed(decimal_points);
    }
    if (is_crypto) {
        number = parseFloat(+number);
    }

    return number.toString().replace(/(^|[^\w.])(\d{4,})/g, function ($0, $1, $2) {
        return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, '$&,');
    });
};

var getFiatDecimalPlaces = function getFiatDecimalPlaces() {
    return jpClient() ? 0 : 2;
};

var calcDecimalPlaces = function calcDecimalPlaces(currency) {
    return isCryptocurrency(currency) ? 8 : getFiatDecimalPlaces();
};

var getDecimalPlaces = function getDecimalPlaces(currency) {
    return (
        // need to check currencies_config[currency] exists instead of || in case of 0 value
        currencies_config[currency] ? getPropertyValue(currencies_config, [currency, 'fractional_digits']) : calcDecimalPlaces(currency)
    );
};

var setCurrencies = function setCurrencies(website_status) {
    currencies_config = website_status.currencies_config;
};

var isCryptocurrency = function isCryptocurrency(currency) {
    return (/crypto/i.test(getPropertyValue(currencies_config, [currency, 'type']))
    );
};

var crypto_config = {
    BTC: { name: 'Bitcoin', min_withdrawal: 0.002 },
    BCH: { name: 'Bitcoin Cash', min_withdrawal: 0.002 },
    ETH: { name: 'Ether', min_withdrawal: 0.002 },
    ETC: { name: 'Ether Classic', min_withdrawal: 0.002 },
    LTC: { name: 'Litecoin', min_withdrawal: 0.002 }
};

var getMinWithdrawal = function getMinWithdrawal(currency) {
    return isCryptocurrency(currency) ? getPropertyValue(crypto_config, [currency, 'min_withdrawal']) || 0.002 : 1;
};

var getCurrencyName = function getCurrencyName(currency) {
    return localize(getPropertyValue(crypto_config, [currency, 'name']) || '');
};

var getFiatPayout = function getFiatPayout() {
    return jpClient() ? 1 : 10;
};

var getMinPayout = function getMinPayout(currency) {
    return isCryptocurrency(currency) ? getPropertyValue(currencies_config, [currency, 'stake_default']) : getFiatPayout();
};

var getCurrencyList = function getCurrencyList(currencies) {
    var $currencies = $('<select/>');
    var $fiat_currencies = $('<optgroup/>', { label: localize('Fiat Currency') });
    var $cryptocurrencies = $('<optgroup/>', { label: localize('Cryptocurrency') });

    currencies.forEach(function (currency) {
        (isCryptocurrency(currency) ? $cryptocurrencies : $fiat_currencies).append($('<option/>', { value: currency, text: currency }));
    });

    return $currencies.append($fiat_currencies.children().length ? $fiat_currencies : '').append($cryptocurrencies.children().length ? $cryptocurrencies : '');
};

module.exports = {
    formatMoney: formatMoney,
    formatCurrency: formatCurrency,
    addComma: addComma,
    getDecimalPlaces: getDecimalPlaces,
    setCurrencies: setCurrencies,
    isCryptocurrency: isCryptocurrency,
    getCurrencyName: getCurrencyName,
    getMinWithdrawal: getMinWithdrawal,
    getMinPayout: getMinPayout,
    getCurrencyList: getCurrencyList,
    getCurrencies: function getCurrencies() {
        return currencies_config;
    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urlForLanguage = __webpack_require__(13).urlFor;
var urlLang = __webpack_require__(13).urlLang;
var createElement = __webpack_require__(0).createElement;
var isEmptyObject = __webpack_require__(0).isEmptyObject;
__webpack_require__(276);

var Url = function () {
    var location_url = void 0,
        static_host = void 0;

    var init = function init(url) {
        location_url = url ? getLocation(url) : window.location;
    };

    var getLocation = function getLocation(url) {
        return createElement('a', { href: decodeURIComponent(url) });
    };

    var reset = function reset() {
        location_url = window ? window.location : location_url;
    };

    var params = function params(href) {
        var arr_params = [];
        var parsed = ((href ? new URL(href) : location_url).search || '').substr(1).split('&');
        var p_l = parsed.length;
        while (p_l--) {
            var param = parsed[p_l].split('=');
            arr_params.push(param);
        }
        return arr_params;
    };

    var paramsHash = function paramsHash(href) {
        var param_hash = {};
        var arr_params = params(href);
        var param = arr_params.length;
        while (param--) {
            if (arr_params[param][0]) {
                param_hash[arr_params[param][0]] = arr_params[param][1] || '';
            }
        }
        return param_hash;
    };

    var paramsHashToString = function paramsHashToString(pars) {
        return isEmptyObject(pars) ? '' : Object.keys(pars).map(function (key) {
            return key + '=' + (pars[key] || '');
        }).join('&');
    };

    var normalizePath = function normalizePath(path) {
        return path ? path.replace(/(^\/|\/$|[^a-zA-Z0-9-_/])/g, '') : '';
    };

    var urlFor = function urlFor(path, pars, language) {
        var lang = (language || urlLang()).toLowerCase();
        // url language might differ from passed language, so we will always replace using the url language
        var url_lang = language ? urlLang().toLowerCase() : lang;
        var url = window.location.href;
        var new_url = '' + url.substring(0, url.indexOf('/' + url_lang + '/') + url_lang.length + 2) + (normalizePath(path) || 'home' + (lang === 'ja' ? '-jp' : '')) + '.html' + (pars ? '?' + pars : '');
        // replace old lang with new lang
        return urlForLanguage(lang, new_url);
    };

    var urlForStatic = function urlForStatic() {
        var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (!static_host || static_host.length === 0) {
            static_host = document.querySelector('script[src*="vendor.min.js"]');
            if (static_host) {
                static_host = static_host.getAttribute('src');
            }

            if (static_host && static_host.length > 0) {
                static_host = static_host.substr(0, static_host.indexOf('/js/') + 1);
            } else {
                static_host = Url.websiteUrl();
            }
        }

        return static_host + path.replace(/(^\/)/g, '');
    };

    /**
     * @param {Object} new_params - Object with param-value pairs. To delete param, set value to null.
     * @param {boolean} should_preserve_old - Should existing query parameters be preserved.
     */
    var updateParamsWithoutReload = function updateParamsWithoutReload(new_params, should_preserve_old) {
        var updated_params = should_preserve_old ? $.extend(paramsHash(), new_params) : new_params;
        Object.keys(new_params).forEach(function (key) {
            if (new_params[key] === null) {
                delete updated_params[key];
            }
        });
        var url = new URL(window.location);
        url.search = paramsHashToString(updated_params);
        window.history.replaceState({ url: url.href }, '', url.href);
    };

    var getSection = function getSection() {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.href;
        return (url.match(new RegExp('/' + urlLang() + '/(.*)/', 'i')) || [])[1];
    };

    var getHashValue = function getHashValue(name) {
        var hash = (location_url || window.location).hash;
        var value = hash.split('=');
        return new RegExp(name).test(hash) && value.length > 1 ? value[1] : '';
    };

    return {
        init: init,
        reset: reset,
        paramsHash: paramsHash,
        getLocation: getLocation,
        paramsHashToString: paramsHashToString,
        urlFor: urlFor,
        urlForStatic: urlForStatic,
        getSection: getSection,
        getHashValue: getHashValue,
        updateParamsWithoutReload: updateParamsWithoutReload,

        param: function param(name) {
            return paramsHash()[name];
        },
        websiteUrl: function websiteUrl() {
            return 'https://www.binary.com/';
        }
    };
}();

module.exports = Url;

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createLanguageDropDown = __webpack_require__(154);
var BinarySocket = __webpack_require__(5);
var getElementById = __webpack_require__(3).getElementById;
var Crowdin = __webpack_require__(118);
var Language = __webpack_require__(13);
var LocalStore = __webpack_require__(6).LocalStore;
var State = __webpack_require__(6).State;
var applyToAllElements = __webpack_require__(0).applyToAllElements;

var checkClientsCountry = function checkClientsCountry() {
    if (Crowdin.isInContext()) return;
    BinarySocket.wait('website_status', 'authorize').then(function () {
        var website_status = State.getResponse('website_status');
        if (!website_status) return;
        var clients_country = website_status.clients_country;
        // only limitLanguage for japanese if ip address is from japan and client is logged out or logged in with jp residence
        if (clients_country === 'jp' && (!LocalStore.get('active_loginid') || jpResidence())) {
            limitLanguage('JA');
        } else if (clients_country === 'id') {
            limitLanguage('ID');
        } else {
            createLanguageDropDown(website_status);
        }
    });
};

var limitLanguage = function limitLanguage(lang) {
    if (Language.get() !== lang) {
        window.location.href = Language.urlFor(lang); // need to redirect not using pjax
    }
    if (getElementById('select_language')) {
        $('.languages').remove();
        $('#gmt-clock').addClass('gr-6 gr-11-m').removeClass('gr-5 gr-6-m');
        $('#contact-us').addClass('gr-5').removeClass('gr-2');
    }
};

var jpClient = function jpClient() {
    return Language.get() === 'JA' || jpResidence();
};

var jpResidence = function jpResidence() {
    return (LocalStore.getObject('client.accounts')[LocalStore.get('active_loginid')] || {}).residence === 'jp';
};

var checkLanguage = function checkLanguage() {
    if (Language.get() === 'ID') {
        var $academy_link = $('.academy a');
        var academy_href = $academy_link.attr('href');
        var regex = /id/;
        if (!regex.test(academy_href)) {
            $academy_link.attr('href', academy_href + regex);
        }
    }
    if (jpClient()) {
        $('.ja-hide').setVisibility(0);
        applyToAllElements('.ja-show', function (el) {
            if (!/client_logged_(in|out)/.test(el.classList)) {
                el.setVisibility(1);
            }
        });
        if (!jpResidence()) {
            $('#topMenuCashier').hide();
        }
    }
};

module.exports = {
    checkClientsCountry: checkClientsCountry,
    jpClient: jpClient,
    jpResidence: jpResidence,
    checkLanguage: checkLanguage
};

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cookies = __webpack_require__(33);
var elementTextContent = __webpack_require__(3).elementTextContent;
var getElementById = __webpack_require__(3).getElementById;
var CookieStorage = __webpack_require__(6).CookieStorage;
var LocalStore = __webpack_require__(6).LocalStore;
var applyToAllElements = __webpack_require__(0).applyToAllElements;

var Language = function () {
    var all_languages = {
        ACH: 'Translations',
        EN: 'English',
        DE: 'Deutsch',
        ES: 'Español',
        FR: 'Français',
        ID: 'Indonesia',
        IT: 'Italiano',
        JA: '日本語',
        PL: 'Polish',
        PT: 'Português',
        RU: 'Русский',
        TH: 'Thai',
        VI: 'Tiếng Việt',
        ZH_CN: '简体中文',
        ZH_TW: '繁體中文'
    };
    var default_language = 'EN';

    var setCookieLanguage = function setCookieLanguage(lang) {
        if (!Cookies.get('language') || lang) {
            var cookie = new CookieStorage('language');
            cookie.write((lang || getLanguage()).toUpperCase());
        }
    };

    var url_lang = null;

    var lang_regex = new RegExp('^(' + Object.keys(all_languages).join('|') + ')$', 'i');

    var languageFromUrl = function languageFromUrl(custom_url) {
        if (url_lang && !custom_url) return url_lang;
        var url_params = (custom_url || window.location.href).split('/').slice(3);
        var language = url_params.find(function (lang) {
            return lang_regex.test(lang);
        }) || '';
        if (!custom_url) {
            url_lang = language;
        }
        return language;
    };

    var current_lang = null;

    var getLanguage = function getLanguage() {
        if (/ach/i.test(current_lang) || /ach/i.test(languageFromUrl())) {
            var crowdin_lang = Cookies.get('jipt_language_code_binary-static'); // selected language for in-context translation
            if (crowdin_lang) {
                current_lang = crowdin_lang.toUpperCase().replace('-', '_').toUpperCase();
                if (document.body) {
                    document.body.classList.add(current_lang); // set the body class removed by crowdin code
                }
            }
        }
        current_lang = current_lang || (languageFromUrl() || Cookies.get('language') || default_language).toUpperCase();
        return current_lang;
    };

    var urlForLanguage = function urlForLanguage(lang) {
        var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
        return url.replace(new RegExp('/' + getLanguage() + '/', 'i'), '/' + (lang || default_language).trim().toLowerCase() + '/');
    };

    var onChangeLanguage = function onChangeLanguage() {
        applyToAllElements('li', function (el) {
            el.addEventListener('click', function (e) {
                if (e.target.nodeName !== 'LI') return;
                var lang = e.target.getAttribute('class');
                if (getLanguage() === lang) return;
                elementTextContent(getElementById('display_language').getElementsByClassName('language'), e.target.textContent);
                LocalStore.remove('ws_cache');
                setCookieLanguage(lang);
                document.location = urlForLanguage(lang);
            });
        }, '', getElementById('select_language'));
    };

    return {
        getAll: function getAll() {
            return all_languages;
        },
        setCookie: setCookieLanguage,
        get: getLanguage,
        onChange: onChangeLanguage,
        urlFor: urlForLanguage,
        urlLang: languageFromUrl,
        reset: function reset() {
            url_lang = null;current_lang = null;
        }
    };
}();

module.exports = Language;

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaultRedirectUrl = __webpack_require__(4).defaultRedirectUrl;
var getElementById = __webpack_require__(3).getElementById;
var getLanguage = __webpack_require__(13).get;
var State = __webpack_require__(6).State;
var Url = __webpack_require__(8);
var applyToAllElements = __webpack_require__(0).applyToAllElements;
var createElement = __webpack_require__(0).createElement;
var findParent = __webpack_require__(0).findParent;
__webpack_require__(258);

var BinaryPjax = function () {
    var previous_url = void 0;

    var params = {};
    var cache = {};

    var init = function init(container, content_selector) {
        if (!(window.history && window.history.pushState && window.history.replaceState &&
        // pushState isn't reliable on iOS until 5.
        !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/))) {
            return;
        }

        if (!container || !content_selector) {
            return;
        }

        params.container = container;
        params.content_selector = content_selector;

        var url = window.location.href;
        var title = document.title;
        var content = container.querySelector(content_selector);

        // put current content to cache, so we won't need to load it again
        if (content) {
            window.history.replaceState({ url: url }, title, url);
            setDataPage(content, url);
            params.container.dispatchEvent(new CustomEvent('binarypjax:after', { detail: content }));
        }

        applyToAllElements('a', function (el) {
            el.addEventListener('click', handleClick);
        }, '', getElementById('all-accounts'));
        document.addEventListener('click', handleClick);
        window.addEventListener('popstate', handlePopstate);
    };

    var setDataPage = function setDataPage(content, url) {
        content.setAttribute('data-page', url.match(/.+\/(.+)\.html.*/)[1]);
    };

    var handleClick = function handleClick(event) {
        var link = findParent(event.target, 'a');
        if (!link) {
            return;
        }

        var url = link.href;
        if (!url) {
            return;
        }

        // Exclude links having 'no-ajax' class or target="_blank" or not html
        if (link.classList.contains('no-ajax') || link.target === '_blank' || !/\.html/i.test(url)) {
            return;
        }

        // Middle click, cmd click, and ctrl click should open links in a new tab as normal
        if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        // Ignore cross origin links
        if (location.protocol !== link.protocol || location.hostname !== link.hostname) {
            return;
        }

        // Ignore event with default prevented
        if (event.defaultPrevented) {
            return;
        }

        // browse a page in another section // TODO: uncomment when split the release process
        // if (Url.getSection() !== Url.getSection(url)) {
        //     return;
        // }

        event.preventDefault();
        // check if url is not same as current
        if (location.href !== url) {
            processUrl(url);
        }
    };

    var processUrl = function processUrl(url, replace) {
        State.set('is_loaded_by_pjax', true);

        var complete_url = /^http/i.test(url) ? url : Url.urlFor(url);

        var cached_content = cacheGet(complete_url);
        if (cached_content) {
            replaceContent(complete_url, cached_content, replace);
        } else {
            load(complete_url, replace);
        }
    };

    /**
     * Load url from server
     */
    var load = function load(url, replace) {
        var lang = getLanguage();
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState !== 4 || this.status !== 200) {
                return;
            }
            var div = createElement('div', { html: this.responseText });
            var result = { content: div.querySelector(params.content_selector) };

            var title = div.getElementsByTagName('title')[0];
            if (title) {
                result.title = title.textContent.trim();
            }

            // If failed to find title or content, load the page in traditional way
            if (!result.title || !result.content) {
                locationReplace(url);
                return;
            }

            setDataPage(result.content, url);
            cachePut(url, result);
            replaceContent(url, result, replace);
        };

        xhttp.open('GET', url.replace(new RegExp('/' + lang + '/', 'i'), '/' + lang.toLowerCase() + '/pjax/'), true);
        xhttp.send();
    };

    var handlePopstate = function handlePopstate(e) {
        var url = e.state && e.state.url ? e.state.url // eslint-disable-line no-nested-ternary
        : !window.location.hash ? window.location.href : '';
        if (url) {
            processUrl(url, true);
        } else {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        return false;
    };

    var replaceContent = function replaceContent(url, content, replace) {
        previous_url = window.location.href;
        window.history[replace ? 'replaceState' : 'pushState']({ url: url }, content.title, url);

        params.container.dispatchEvent(new Event('binarypjax:before'));

        document.title = content.title;
        var content_selector = params.container.querySelector(params.content_selector);
        if (content_selector) {
            content_selector.remove();
        }
        $(params.container).append($(content.content).clone());

        params.container.dispatchEvent(new CustomEvent('binarypjax:after', { detail: content.content }));

        var query_params = Url.paramsHash();
        if (!query_params.anchor) {
            $.scrollTo('body', 500);
        }
    };

    var cachePut = function cachePut(url, content) {
        cache[cleanUrl(url)] = content;
    };

    var cacheGet = function cacheGet(url) {
        return cache[cleanUrl(url)];
    };

    var cleanUrl = function cleanUrl(url) {
        return url.replace(/(\?|#).*$/, '');
    };

    var locationReplace = function locationReplace(url) {
        window.history.replaceState(null, '', url);
        window.location.replace(url);
    };

    var loadPreviousUrl = function loadPreviousUrl() {
        if (window.location.href === previous_url) {
            previous_url = '';
        }
        processUrl(previous_url || defaultRedirectUrl());
    };

    return {
        init: init,
        loadPreviousUrl: loadPreviousUrl,

        load: processUrl,
        getPreviousUrl: function getPreviousUrl() {
            return previous_url;
        }
    };
}();

module.exports = BinaryPjax;

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var checkInput = __webpack_require__(3).checkInput;

var toTitleCase = function toTitleCase(str) {
    return (str || '').replace(/\w[^\s/\\]*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

var toISOFormat = function toISOFormat(date) {
    return date instanceof moment ? date.format('YYYY-MM-DD') : '';
};

var toReadableFormat = function toReadableFormat(date) {
    if (date instanceof moment) {
        if (window.innerWidth < 770 && checkInput('date', 'not-a-date')) {
            return toISOFormat(date);
        }
        return date.format('DD MMM, YYYY');
    }
    return '';
};

var padLeft = function padLeft(txt, len, char) {
    var text = String(txt || '');
    return text.length >= len ? text : '' + Array(len - text.length + 1).join(char) + text;
};

var compareBigUnsignedInt = function compareBigUnsignedInt(a, b) {
    var first_num = numberToString(a);
    var second_num = numberToString(b);
    if (!first_num || !second_num) {
        return '';
    }
    var max_length = Math.max(first_num.length, second_num.length);
    first_num = padLeft(first_num, max_length, '0');
    second_num = padLeft(second_num, max_length, '0');

    // lexicographical comparison
    var order = 0;
    if (first_num !== second_num) {
        order = first_num > second_num ? 1 : -1;
    }

    return order;
};

var numberToString = function numberToString(n) {
    return typeof n === 'number' ? String(n) : n;
};

module.exports = {
    toISOFormat: toISOFormat,
    toReadableFormat: toReadableFormat,
    toTitleCase: toTitleCase,
    padLeft: padLeft,
    numberToString: numberToString,

    compareBigUnsignedInt: compareBigUnsignedInt
};

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var BinarySocket = __webpack_require__(5);
var jpClient = __webpack_require__(10).jpClient;
var elementInnerHtml = __webpack_require__(3).elementInnerHtml;
var getElementById = __webpack_require__(3).getElementById;

var Clock = function () {
    var clock_started = false;
    var el_clock = void 0,
        client_time = void 0,
        get_time_interval = void 0,
        update_time_interval = void 0,
        view_popup_timer_func = void 0;

    var showLocalTimeOnHover = function showLocalTimeOnHover(selector) {
        if (jpClient()) return;
        document.querySelectorAll(selector || '.date').forEach(function (el) {
            var gmt_time_str = el.textContent.replace('\n', ' ');
            var local_time = moment.utc(gmt_time_str, 'YYYY-MM-DD HH:mm:ss').local();
            if (local_time.isValid()) {
                el.setAttribute('data-balloon', local_time.format('YYYY-MM-DD HH:mm:ss Z'));
            }
        });
    };

    var toJapanTimeIfNeeded = function toJapanTimeIfNeeded(gmt_time_str, show_time_zone, hide_seconds) {
        var time = void 0;

        if (typeof gmt_time_str === 'number') {
            time = moment.utc(gmt_time_str * 1000);
        } else if (gmt_time_str) {
            time = moment.utc(gmt_time_str, 'YYYY-MM-DD HH:mm:ss');
        }

        if (!time || !time.isValid()) {
            return null;
        }

        var offset = '+00:00';
        var time_zone = 'Z';
        if (jpClient()) {
            offset = '+09:00';
            time_zone = 'zZ';
        }

        return time.utcOffset(offset).format('YYYY-MM-DD HH:mm' + (hide_seconds ? '' : ':ss') + (show_time_zone ? ' ' + time_zone : ''));
    };

    var getTime = function getTime() {
        client_time = moment().valueOf();
        BinarySocket.send({ time: 1 }).then(function (response) {
            if (!response.error) {
                timeCounter(response);
            }
        });
    };

    var startClock = function startClock() {
        if (!clock_started) {
            getTime();
            clearInterval(get_time_interval);
            get_time_interval = setInterval(getTime, 30000);

            el_clock = getElementById('gmt-clock');
            clock_started = true;
        }
    };

    var timeCounter = function timeCounter(response) {
        if (!clock_started || !el_clock) {
            startClock();
            return;
        }

        clearInterval(update_time_interval);

        var start_timestamp = response.time;
        var client_time_at_response = moment().valueOf();
        var server_time_at_response = start_timestamp * 1000 + (client_time_at_response - client_time);

        var updateTime = function updateTime() {
            window.time = moment(server_time_at_response + moment().valueOf() - client_time_at_response).utc();
            var time_str = window.time.format('YYYY-MM-DD HH:mm:ss') + ' GMT';
            if (jpClient()) {
                elementInnerHtml(el_clock, toJapanTimeIfNeeded(time_str, 1, 1));
            } else {
                elementInnerHtml(el_clock, time_str);
                showLocalTimeOnHover('#gmt-clock');
            }

            if (typeof view_popup_timer_func === 'function') {
                view_popup_timer_func();
            }
        };
        updateTime();
        update_time_interval = setInterval(updateTime, 1000);
    };

    return {
        startClock: startClock,
        showLocalTimeOnHover: showLocalTimeOnHover,
        toJapanTimeIfNeeded: toJapanTimeIfNeeded,

        setViewPopupTimer: function setViewPopupTimer(func) {
            view_popup_timer_func = func;
        }
    };
}();

module.exports = Clock;

/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getElementById = __webpack_require__(3).getElementById;
var isVisible = __webpack_require__(3).isVisible;
var State = __webpack_require__(6).State;
var Url = __webpack_require__(8);
var isEmptyObject = __webpack_require__(0).isEmptyObject;

/*
 * Handles trading page default values
 *
 * Priorities:
 * 1. Client's input: on each change to form, it will reflect to both query string & session storage
 * 2. Query string parameters: will change session storage values
 * 3. Session storage values: if none of the above, it will be the source
 *
 */

var Defaults = function () {
    var params = {};
    var getDefault = function getDefault(key) {
        var p_value = params[key] || Url.param(key);
        var s_value = sessionStorage.getItem(key);
        if (p_value && (!s_value || p_value !== s_value)) {
            sessionStorage.setItem(key, p_value);
        }
        if (!p_value && s_value) {
            setDefault(key, s_value);
        }
        return p_value || s_value;
    };

    var setDefault = function setDefault(key) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        if (!key) return;
        if (isEmptyObject(params)) params = Url.paramsHash();
        if (params[key] !== value) {
            params[key] = value;
            // to increase speed, do not set values when form is still loading
            if (!isVisible(getElementById('trading_init_progress'))) {
                sessionStorage.setItem(key, value);
                updateURL();
            }
        }
    };

    var removeDefault = function removeDefault() {
        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
            keys[_key] = arguments[_key];
        }

        if (isEmptyObject(params)) params = Url.paramsHash();
        var is_updated = false;
        keys.forEach(function (key) {
            if (key in params) {
                sessionStorage.removeItem(key);
                delete params[key];
                is_updated = true;
            }
        });
        if (is_updated) {
            updateURL();
        }
    };

    var updateAll = function updateAll() {
        Object.keys(params).forEach(function (key) {
            sessionStorage.setItem(key, params[key]);
        });
        updateURL();
    };

    var updateURL = function updateURL() {
        if (!State.get('is_trading')) return;
        Url.updateParamsWithoutReload(params, false);
    };

    return {
        get: getDefault,
        set: setDefault,
        update: updateAll,
        remove: removeDefault,
        clear: function clear() {
            params = {};
        }
    };
}();

module.exports = Defaults;

/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BinaryPjax = __webpack_require__(15);
var Client = __webpack_require__(4);
var GTM = __webpack_require__(48);
var Login = __webpack_require__(41);
var BinarySocket = __webpack_require__(5);
var SocketCache = __webpack_require__(55);
var checkClientsCountry = __webpack_require__(10).checkClientsCountry;
var jpClient = __webpack_require__(10).jpClient;
var MetaTrader = __webpack_require__(107);
var elementInnerHtml = __webpack_require__(3).elementInnerHtml;
var elementTextContent = __webpack_require__(3).elementTextContent;
var getElementById = __webpack_require__(3).getElementById;
var localize = __webpack_require__(2).localize;
var State = __webpack_require__(6).State;
var toTitleCase = __webpack_require__(18).toTitleCase;
var Url = __webpack_require__(8);
var applyToAllElements = __webpack_require__(0).applyToAllElements;
var createElement = __webpack_require__(0).createElement;
var findParent = __webpack_require__(0).findParent;

var Header = function () {
    var onLoad = function onLoad() {
        populateAccountsList();
        bindClick();
        if (!Login.isLoginPages()) {
            checkClientsCountry();
        }
        if (Client.isLoggedIn()) {
            getElementById('menu-top').classList.add('smaller-font', 'top-nav-menu');
            displayAccountStatus();
            if (!Client.get('is_virtual')) {
                BinarySocket.wait('website_status', 'authorize', 'balance').then(function () {
                    if (Client.canTransferFunds()) {
                        getElementById('user_menu_account_transfer').setVisibility(1);
                    }
                });
            }
        }
    };

    var bindClick = function bindClick() {
        var logo = getElementById('logo');
        logo.removeEventListener('click', logoOnClick);
        logo.addEventListener('click', logoOnClick);

        var btn_login = getElementById('btn_login');
        btn_login.removeEventListener('click', loginOnClick);
        btn_login.addEventListener('click', loginOnClick);

        applyToAllElements('a.logout', function (el) {
            el.removeEventListener('click', logoutOnClick);
            el.addEventListener('click', logoutOnClick);
        });
    };

    var logoOnClick = function logoOnClick() {
        var url = Client.isLoggedIn() ? Client.defaultRedirectUrl() : Url.urlFor('');
        BinaryPjax.load(url);
    };

    var loginOnClick = function loginOnClick(e) {
        e.preventDefault();
        Login.redirectToLogin();
    };

    var logoutOnClick = function logoutOnClick() {
        Client.sendLogoutRequest();
    };

    var populateAccountsList = function populateAccountsList() {
        if (!Client.isLoggedIn()) return;
        BinarySocket.wait('authorize').then(function () {
            var loginid_select = document.createElement('div');
            Client.getAllLoginids().forEach(function (loginid) {
                if (!Client.get('is_disabled', loginid) && Client.get('token', loginid)) {
                    var account_title = Client.getAccountTitle(loginid);
                    var is_real = /real/i.test(account_title);
                    var currency = Client.get('currency', loginid);
                    var localized_type = localize('[_1] Account', [is_real && currency ? currency : account_title]);
                    if (loginid === Client.get('loginid')) {
                        // default account
                        applyToAllElements('.account-type', function (el) {
                            elementInnerHtml(el, localized_type);
                        });
                        applyToAllElements('.account-id', function (el) {
                            elementInnerHtml(el, loginid);
                        });
                    } else {
                        var link = createElement('a', { href: 'javascript:;', 'data-value': loginid });
                        var li_type = createElement('li', { text: localized_type });

                        li_type.appendChild(createElement('div', { text: loginid }));
                        link.appendChild(li_type);
                        loginid_select.appendChild(link).appendChild(createElement('div', { class: 'separator-line-thin-gray' }));
                    }
                }
                applyToAllElements('.login-id-list', function (el) {
                    el.html(loginid_select.innerHTML);
                    applyToAllElements('a', function (ele) {
                        ele.removeEventListener('click', loginIDOnClick);
                        ele.addEventListener('click', loginIDOnClick);
                    }, '', el);
                });
            });
        });
    };

    var loginIDOnClick = function loginIDOnClick(e) {
        e.preventDefault();
        var el_loginid = findParent(e.target, 'a');
        if (el_loginid) {
            el_loginid.setAttribute('disabled', 'disabled');
            switchLoginid(el_loginid.getAttribute('data-value'));
        }
    };

    var metatraderMenuItemVisibility = function metatraderMenuItemVisibility() {
        BinarySocket.wait('landing_company', 'get_account_status').then(function () {
            if (MetaTrader.isEligible() && !jpClient()) {
                // TODO: a workaround for new-app, can be reverted once dependencies are dropped
                var el_mt_menu_item = getElementById('user_menu_metatrader');
                if (el_mt_menu_item && typeof el_mt_menu_item.setVisibility === 'function') {
                    el_mt_menu_item.setVisibility(1);
                }
            }
        });
    };

    var switchLoginid = function switchLoginid(loginid) {
        if (!loginid || loginid.length === 0) return;
        var token = Client.get('token', loginid);
        if (!token || token.length === 0) {
            Client.sendLogoutRequest(true);
            return;
        }

        sessionStorage.setItem('active_tab', '1');
        // set local storage
        GTM.setLoginFlag();
        Client.set('cashier_confirmed', 0);
        Client.set('accepted_bch', 0);
        Client.set('loginid', loginid);
        SocketCache.clear();
        window.location.reload();
    };

    var upgradeMessageVisibility = function upgradeMessageVisibility() {
        BinarySocket.wait('authorize', 'landing_company', 'get_settings', 'get_account_status').then(function () {
            var upgrade_msg = document.getElementsByClassName('upgrademessage');

            if (!upgrade_msg) {
                return;
            }

            var showUpgrade = function showUpgrade(url, msg) {
                applyToAllElements(upgrade_msg, function (el) {
                    el.setVisibility(1);
                    applyToAllElements('a', function (ele) {
                        ele.html(createElement('span', { text: localize(msg) })).setVisibility(1).setAttribute('href', Url.urlFor(url));
                    }, '', el);
                });
            };

            var jp_account_status = State.getResponse('get_settings.jp_account_status.status');
            var upgrade_info = Client.getUpgradeInfo();
            var show_upgrade_msg = upgrade_info.can_upgrade;
            var virtual_text = getElementById('virtual-text');

            if (Client.get('is_virtual')) {
                applyToAllElements(upgrade_msg, function (el) {
                    el.setVisibility(1);
                    var span = el.getElementsByTagName('span')[0];
                    if (span) {
                        span.setVisibility(1);
                    }
                    applyToAllElements('a', function (ele) {
                        ele.setVisibility(0);
                    }, '', el);
                });

                if (jp_account_status) {
                    var has_disabled_jp = jpClient() && Client.getAccountOfType('real').is_disabled;
                    if (/jp_knowledge_test_(pending|fail)/.test(jp_account_status)) {
                        // do not show upgrade for user that filled up form
                        showUpgrade('/new_account/knowledge_testws', '{JAPAN ONLY}Take knowledge test');
                    } else if (show_upgrade_msg || has_disabled_jp && jp_account_status !== 'disabled') {
                        applyToAllElements(upgrade_msg, function (el) {
                            el.setVisibility(1);
                        });
                        if (jp_account_status === 'jp_activation_pending' && !document.getElementsByClassName('activation-message')) {
                            virtual_text.appendChild(createElement('div', { class: 'activation-message', text: ' ' + localize('Your Application is Being Processed.') }));
                        } else if (jp_account_status === 'activated' && !document.getElementsByClassName('activated-message')) {
                            virtual_text.appendChild(createElement('div', { class: 'activated-message', text: ' ' + localize('{JAPAN ONLY}Your Application has Been Processed. Please Re-Login to Access Your Real-Money Account.') }));
                        }
                    }
                } else if (show_upgrade_msg) {
                    showUpgrade(upgrade_info.upgrade_link, 'Open a ' + toTitleCase(upgrade_info.type) + ' Account');
                } else {
                    applyToAllElements(upgrade_msg, function (el) {
                        applyToAllElements('a', function (ele) {
                            ele.setVisibility(0).innerHTML = '';
                        }, '', el);
                    });
                }
            } else if (show_upgrade_msg) {
                getElementById('virtual-wrapper').setVisibility(0);
                showUpgrade(upgrade_info.upgrade_link, 'Open a ' + toTitleCase(upgrade_info.type) + ' Account');
            } else {
                applyToAllElements(upgrade_msg, function (el) {
                    el.setVisibility(0);
                });
            }
            showHideNewAccount(upgrade_info);
        });
    };

    var showHideNewAccount = function showHideNewAccount(upgrade_info) {
        if (upgrade_info.can_upgrade || upgrade_info.can_open_multi) {
            changeAccountsText(1, 'Create Account');
        } else {
            changeAccountsText(0, 'Accounts List');
        }
    };

    var changeAccountsText = function changeAccountsText(add_new_style, text) {
        var user_accounts = getElementById('user_accounts');
        user_accounts.classList[add_new_style ? 'add' : 'remove']('create_new_account');
        var localized_text = localize(text);
        applyToAllElements('li', function (el) {
            elementTextContent(el, localized_text);
        }, '', user_accounts);
    };

    var displayNotification = function displayNotification(message) {
        var is_error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var msg_code = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        var msg_notification = getElementById('msg_notification');
        if (msg_notification.getAttribute('data-code') === 'STORAGE_NOT_SUPPORTED') return;

        msg_notification.html(message);
        msg_notification.setAttribute('data-message', message);
        msg_notification.setAttribute('data-code', msg_code);

        if (msg_notification.offsetParent) {
            msg_notification.toggleClass('error', is_error);
        } else {
            $(msg_notification).slideDown(500, function () {
                if (is_error) msg_notification.classList.add('error');
            });
        }
    };

    var hideNotification = function hideNotification(msg_code) {
        var msg_notification = getElementById('msg_notification');
        if (msg_notification.getAttribute('data-code') === 'STORAGE_NOT_SUPPORTED' || msg_code && msg_notification.getAttribute('data-code') !== msg_code) {
            return;
        }

        if (msg_notification.offsetParent) {
            msg_notification.classList.remove('error');
            $(msg_notification).slideUp(500, function () {
                elementInnerHtml(msg_notification, '');
                msg_notification.removeAttribute('data-message data-code');
            });
        }
    };

    var displayAccountStatus = function displayAccountStatus() {
        BinarySocket.wait('authorize').then(function () {
            var get_account_status = void 0,
                status = void 0;

            var riskAssessment = function riskAssessment() {
                return (get_account_status.risk_classification === 'high' || Client.isAccountOfType('financial')) && /financial_assessment_not_complete/.test(status) && !jpClient();
            };

            var buildMessage = function buildMessage(string, path) {
                var hash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
                return localize(string, ['<a href="' + Url.urlFor(path) + hash + '">', '</a>']);
            };

            var messages = {
                authenticate: function authenticate() {
                    return buildMessage('[_1]Authenticate your account[_2] now to take full advantage of all payment methods available.', 'user/authenticate');
                },
                currency: function currency() {
                    return buildMessage('Please set the [_1]currency[_2] of your account.', 'user/set-currency');
                },
                document_needs_action: function document_needs_action() {
                    return buildMessage('[_1]Your Proof of Identity or Proof of Address[_2] did not meet our requirements. Please check your email for further instructions.', 'user/authenticate');
                },
                document_review: function document_review() {
                    return buildMessage('We are reviewing your documents. For more details [_1]contact us[_2].', 'contact');
                },
                excluded_until: function excluded_until() {
                    return buildMessage('Your account is restricted. Kindly [_1]contact customer support[_2] for assistance.', 'contact');
                },
                financial_limit: function financial_limit() {
                    return buildMessage('Please set your [_1]30-day turnover limit[_2] to remove deposit limits.', 'user/security/self_exclusionws');
                },
                residence: function residence() {
                    return buildMessage('Please set [_1]country of residence[_2] before upgrading to a real-money account.', 'user/settings/detailsws');
                },
                risk: function risk() {
                    return buildMessage('Please complete the [_1]financial assessment form[_2] to lift your withdrawal and trading limits.', 'user/settings/assessmentws');
                },
                tax: function tax() {
                    return buildMessage('Please [_1]complete your account profile[_2] to lift your withdrawal and trading limits.', 'user/settings/detailsws');
                },
                tnc: function tnc() {
                    return buildMessage('Please [_1]accept the updated Terms and Conditions[_2] to lift your withdrawal and trading limits.', 'user/tnc_approvalws');
                },
                unwelcome: function unwelcome() {
                    return buildMessage('Your account is restricted. Kindly [_1]contact customer support[_2] for assistance.', 'contact');
                }
            };

            var validations = {
                authenticate: function authenticate() {
                    return +get_account_status.prompt_client_to_authenticate;
                },
                currency: function currency() {
                    return !Client.get('currency');
                },
                document_needs_action: function document_needs_action() {
                    return (/document_needs_action/.test(status)
                    );
                },
                document_review: function document_review() {
                    return (/document_under_review/.test(status)
                    );
                },
                excluded_until: function excluded_until() {
                    return Client.get('excluded_until');
                },
                financial_limit: function financial_limit() {
                    return (/ukrts_max_turnover_limit_not_set/.test(status)
                    );
                },
                residence: function residence() {
                    return !Client.get('residence');
                },
                risk: function risk() {
                    return riskAssessment();
                },
                tax: function tax() {
                    return Client.shouldCompleteTax();
                },
                tnc: function tnc() {
                    return Client.shouldAcceptTnc();
                },
                unwelcome: function unwelcome() {
                    return (/unwelcome|(cashier|withdrawal)_locked/.test(status)
                    );
                }
            };

            // real account checks in order
            var check_statuses_real = ['excluded_until', 'tnc', 'financial_limit', 'risk', 'tax', 'currency', 'document_review', 'document_needs_action', 'authenticate', 'unwelcome'];

            // virtual checks
            var check_statuses_virtual = ['residence'];

            var checkStatus = function checkStatus(check_statuses) {
                var notified = check_statuses.some(function (check_type) {
                    if (validations[check_type]()) {
                        displayNotification(messages[check_type]());
                        return true;
                    }
                    return false;
                });
                if (!notified) hideNotification();
            };

            if (Client.get('is_virtual')) {
                checkStatus(check_statuses_virtual);
            } else {
                BinarySocket.wait('website_status', 'get_account_status', 'get_settings', 'balance').then(function () {
                    get_account_status = State.getResponse('get_account_status') || {};
                    status = get_account_status.status;
                    checkStatus(check_statuses_real);
                });
            }
        });
    };

    return {
        onLoad: onLoad,
        populateAccountsList: populateAccountsList,
        upgradeMessageVisibility: upgradeMessageVisibility,
        metatraderMenuItemVisibility: metatraderMenuItemVisibility,
        displayNotification: displayNotification,
        hideNotification: hideNotification,
        displayAccountStatus: displayAccountStatus
    };
}();

module.exports = Header;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isEmptyObject = __webpack_require__(0).isEmptyObject;

/*
 * Handles trading page default values
 *
 * Priorities:
 * 1. Client's input: on each change to form, it will reflect to both query string & session storage
 * 2. Local storage values: if none of the above, it will be the source
 *
 */

var MBDefaults = function () {
    var params = {};

    var getDefault = function getDefault(key) {
        loadParams();
        return params[key];
    };

    var loadParams = function loadParams() {
        if (isEmptyObject(params)) params = JSON.parse(localStorage.getItem('mb_trading')) || {};
    };

    var saveParams = function saveParams() {
        localStorage.setItem('mb_trading', JSON.stringify(params));
    };

    var setDefault = function setDefault(key) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        if (!key) return;
        loadParams();
        if (params[key] !== value) {
            params[key] = value;
            saveParams();
        }
    };

    var removeDefault = function removeDefault() {
        for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
            keys[_key] = arguments[_key];
        }

        loadParams();
        var is_updated = false;
        keys.forEach(function (key) {
            if (key in params) {
                delete params[key];
                is_updated = true;
            }
        });
        if (is_updated) {
            saveParams();
        }
    };

    return {
        get: getDefault,
        set: setDefault,
        remove: removeDefault,
        clear: function clear() {
            params = {};
        }
    };
}();

module.exports = MBDefaults;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Contract = __webpack_require__(50);
var Defaults = __webpack_require__(25);

/*
 * Handles lookback option form
**/

var Lookback = function () {
    var displayLookback = function displayLookback() {
        var multiplier_element = document.getElementById('multiplier_row');
        var multiplier_input = document.getElementById('multiplier');
        var payout_element = document.getElementById('payout_row');

        if (Contract.form() === 'lookback') {
            multiplier_element.show();
            payout_element.hide(); // Hide payout
            if (Defaults.get('multiplier')) {
                multiplier_input.value = Defaults.get('multiplier');
            } else {
                Defaults.set('multiplier', multiplier_input.value);
            }
        } else {
            multiplier_element.hide();
            payout_element.show(); // Show payout
        }
    };

    var getFormula = function getFormula() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var mul = arguments[1];

        var value_map = {
            Multiplier: mul
        };
        var regex = /Multiplier/g;
        var replacer = function replacer(str) {
            return value_map[str] || str;
        };
        var formulaMapping = {
            LBFLOATPUT: 'Multiplier x (High - Close)'.replace(regex, replacer),
            LBFLOATCALL: 'Multiplier x (Close - Low)'.replace(regex, replacer),
            LBHIGHLOW: 'Multiplier x (High - Low)'.replace(regex, replacer)
        };

        return formulaMapping[type.toUpperCase()];
    };

    var isLookback = function isLookback(type) {
        return (/^(LBFLOATCALL|LBFLOATPUT|LBHIGHLOW)$/.test(type)
        );
    };

    var getBarrierLabel = function getBarrierLabel(type) {
        var barrier_map = {
            LBFLOATCALL: ['Low'],
            LBFLOATPUT: ['High'],
            LBHIGHLOW: ['High', 'Low']
        };
        return barrier_map[type] || ['Barrier'];
    };

    return {
        display: displayLookback,
        getFormula: getFormula,
        isLookback: isLookback,
        getBarrierLabel: getBarrierLabel
    };
}();

module.exports = Lookback;

/***/ }),
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// const Cookies = require('js-cookie');

/*
 * Configuration values needed in js codes
 *
 * NOTE:
 * Please use the following command to avoid accidentally committing personal changes
 * git update-index --assume-unchanged src/javascript/config.js
 *
 */

var getAppId = function getAppId() {
    var app_id = null;
    var user_app_id = ''; // you can insert Application ID of your registered application here
    var config_app_id = window.localStorage.getItem('config.app_id');
    if (config_app_id) {
        app_id = config_app_id;
    } else if (/staging\.binary\.com/i.test(window.location.hostname)) {
        window.localStorage.removeItem('config.default_app_id');
        app_id = 1098;
    } else if (user_app_id.length) {
        window.localStorage.setItem('config.default_app_id', user_app_id); // it's being used in endpoint chrome extension - please do not remove
        app_id = user_app_id;
    } else if (/localhost/i.test(window.location.hostname)) {
        app_id = 1159;
    } else {
        window.localStorage.removeItem('config.default_app_id');
        app_id = 1;
    }
    return app_id;
};

var getSocketURL = function getSocketURL() {
    var server_url = window.localStorage.getItem('config.server_url');
    if (!server_url) {
        // const toGreenPercent = { real: 100, virtual: 0, logged_out: 0 }; // default percentage
        // const categoryMap    = ['real', 'virtual', 'logged_out'];
        // const percentValues  = Cookies.get('connection_setup'); // set by GTM
        //
        // // override defaults by cookie values
        // if (percentValues && percentValues.indexOf(',') > 0) {
        //     const cookie_percents = percentValues.split(',');
        //     categoryMap.map((cat, idx) => {
        //         if (cookie_percents[idx] && !isNaN(cookie_percents[idx])) {
        //             toGreenPercent[cat] = +cookie_percents[idx].trim();
        //         }
        //     });
        // }

        // let server = 'blue';
        // if (!/staging\.binary\.com/i.test(window.location.hostname)) {
        //     const loginid = window.localStorage.getItem('active_loginid');
        //     let client_type = categoryMap[2];
        //     if (loginid) {
        //         client_type = /^VRT/.test(loginid) ? categoryMap[1] : categoryMap[0];
        //     }

        // const randomPercent = Math.random() * 100;
        // if (randomPercent < toGreenPercent[client_type]) {
        //     server = 'green';
        // }
        // }

        // server_url = `${server}.binaryws.com`;
        server_url = 'frontend.binaryws.com';
    }
    return 'wss://' + server_url + '/websockets/v3';
};

module.exports = {
    getAppId: getAppId,
    getSocketURL: getSocketURL
};

/***/ }),
/* 33 */,
/* 34 */,
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var getElementById = __webpack_require__(3).getElementById;
var getPropertyValue = __webpack_require__(0).getPropertyValue;

/*
 * Display price/spot movement variation to depict price moved up or down
 */
var displayPriceMovement = function displayPriceMovement(element, old_value, current_value) {
    element.classList.remove('price_moved_down');
    element.classList.remove('price_moved_up');
    if (parseFloat(current_value) > parseFloat(old_value)) {
        element.classList.remove('price_moved_down');
        element.classList.add('price_moved_up');
    } else if (parseFloat(current_value) < parseFloat(old_value)) {
        element.classList.remove('price_moved_up');
        element.classList.add('price_moved_down');
    }
};

/*
 * count number of decimal places in spot so that we can make barrier to same decimal places
 */
var countDecimalPlaces = function countDecimalPlaces(num) {
    if (!isNaN(num)) {
        var str = num.toString();
        if (str.indexOf('.') !== -1) {
            return str.split('.')[1].length;
        }
    }
    return 0;
};

var trading_times = {};

var processTradingTimesAnswer = function processTradingTimesAnswer(response) {
    if (!getPropertyValue(trading_times, response.echo_req.trading_times) && getPropertyValue(response, ['trading_times', 'markets'])) {
        for (var i = 0; i < response.trading_times.markets.length; i++) {
            var submarkets = response.trading_times.markets[i].submarkets;
            if (submarkets) {
                for (var j = 0; j < submarkets.length; j++) {
                    var symbols = submarkets[j].symbols;
                    if (symbols) {
                        for (var k = 0; k < symbols.length; k++) {
                            var symbol = symbols[k];
                            if (!trading_times[response.echo_req.trading_times]) {
                                trading_times[response.echo_req.trading_times] = {};
                            }
                            trading_times[response.echo_req.trading_times][symbol.symbol] = symbol.times.close;
                        }
                    }
                }
            }
        }
    }
};

var getElement = function getElement() {
    return getElementById('date_start');
};

var checkValidTime = function checkValidTime() {
    var time_start_element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getElementById('time_start');
    var $date_start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $('#date_start');
    var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : time_start_element.value;

    var time_array = '';
    if (time) {
        time_array = time.split(':');
    }
    var now_time = moment.utc();
    var hour = time_array.length ? +time_array[0] : now_time.hour();
    var minute = time_array.length ? +time_array[1] : now_time.minute();
    var date_time = moment.utc(getElement().value * 1000).hour(hour).minute(minute);
    var min_max_time = getMinMaxTimeStart($date_start);
    var min_time = min_max_time.minTime.clone();
    if (!(min_max_time.minTime.format('HH:mm') === '23:55')) {
        min_time = min_time.add(5, 'minutes');
    }
    time_start_element.value = date_time.isBefore(min_time) || date_time.isAfter(min_max_time.maxTime) || !time ? min_time.format('HH:mm') : time_array.join(':');
    time_start_element.setAttribute('data-value', time_start_element.value);
};

var getMinMaxTimeStart = function getMinMaxTimeStart() {
    var $min_max_selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('#date_start');
    var moment_now = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (window.time || moment.utc()).clone();

    var $selected_option = getSelectedOption($min_max_selector);
    var start_date = moment.unix($min_max_selector.val()).utc();
    var end_date = moment.unix($selected_option.attr('data-end')).utc();
    return {
        minTime: start_date.isAfter(moment_now) ? start_date : moment_now.clone(),
        maxTime: end_date.isSame(start_date, 'day') ? end_date : start_date.clone().hour(23).minute(55).second(0)
    };
};

var getMinMaxTimeEnd = function getMinMaxTimeEnd() {
    var $date_start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('#date_start');
    var $time_start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $('#time_start');
    var moment_now = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (window.time || moment.utc()).clone();
    var $expiry_time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : $('#expiry_time');
    var $expiry_date = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : $('#expiry_date');

    var min_time = void 0,
        max_time = void 0;
    var date_start_val = $date_start.val();
    if (date_start_val === 'now') {
        var min_max_time = getMinMaxTimeStart();
        min_time = min_max_time.minTime;
        max_time = min_max_time.maxTime;
    } else {
        var expiry_time_val = $expiry_time.val().split(':');
        var end_time = moment.utc($expiry_date.attr('data-value'));
        if (expiry_time_val.length > 1) {
            end_time = end_time.hour(expiry_time_val[0]).minute(expiry_time_val[1]);
        }
        var moment_date_start = moment.unix(date_start_val).utc();
        var start_time_val = $time_start.val().split(':');
        var compare = isNaN(+date_start_val) ? moment_now.clone() : moment_date_start.hour(start_time_val[0]).minute(start_time_val[1]);
        // if expiry time is one day after start time, minTime can be 0
        // but maxTime should be 24 hours after start time, so exact value of start time
        if (end_time.isAfter(compare, 'day')) {
            min_time = 0;
            max_time = start_time_val.length > 1 ? end_time.clone().hour(start_time_val[0]).minute(start_time_val[1]) : end_time.clone();
        } else {
            // if expiry time is same as today, min time should be the selected start time plus five minutes
            min_time = moment_date_start.clone();
            min_time = min_time.hour(start_time_val[0]).minute(start_time_val[1]);
            if (!(+start_time_val[0] === 23 && +start_time_val[1] === 55)) {
                min_time = min_time.add(5, 'minutes');
            }
            max_time = getMinMaxTimeStart().maxTime;
        }
    }
    return {
        minTime: min_time,
        maxTime: max_time
    };
};

var getSelectedOption = function getSelectedOption($selector) {
    var $selected_option = $selector.find('option:selected');
    // if 'now' is selected, take first option's value
    if (isNaN(+$selector.val())) {
        $selected_option = $($selector.find('option')[1]);
    }
    return $selected_option;
};

var showAssetOpenHours = function showAssetOpenHours($selector) {
    var $selected_option = $selector ? getSelectedOption($selector) : '';
    var sessions = $selected_option ? $selected_option.attr('data-sessions') : '';
    $('#asset_open_hours').text(sessions || '').parent().setVisibility(!!sessions);
};

module.exports = {
    displayPriceMovement: displayPriceMovement,
    countDecimalPlaces: countDecimalPlaces,
    processTradingTimesAnswer: processTradingTimesAnswer,
    checkValidTime: checkValidTime,
    getSelectedOption: getSelectedOption,
    getMinMaxTimeStart: getMinMaxTimeStart,
    getMinMaxTimeEnd: getMinMaxTimeEnd,
    showAssetOpenHours: showAssetOpenHours,
    getStartDateNode: getElement,
    getTradingTimes: function getTradingTimes() {
        return trading_times;
    }
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var countDecimalPlaces = __webpack_require__(35).countDecimalPlaces;
var displayPriceMovement = __webpack_require__(35).displayPriceMovement;
var elementTextContent = __webpack_require__(3).elementTextContent;
var getElementById = __webpack_require__(3).getElementById;
var isVisible = __webpack_require__(3).isVisible;

/*
 * Tick object handles all the process/display related to tick streaming
 *
 * We request tick stream for particular underlying to update current spot
 *
 *
 * Usage:
 * use `Tick.detail` to populate this object
 *
 * then use
 *
 * `Tick.quote()` to get current spot quote
 * `Tick.id()` to get the unique for current stream
 * `Tick.epoch()` to get the tick epoch time
 * 'Tick.display()` to display current spot
 */
var Tick = function () {
    var _quote = '';
    var _id = '';
    var _epoch = '';
    var error_message = '';
    var _spots = {};

    var details = function details(data) {
        error_message = '';

        if (data) {
            if (data.error) {
                error_message = data.error.message;
            } else {
                var tick = data.tick;
                _quote = tick.quote;
                _id = tick.id;
                _epoch = tick.epoch;

                _spots[_epoch] = _quote;
                var epoches = Object.keys(_spots).sort(function (a, b) {
                    return a - b;
                });
                if (epoches.length > 20) {
                    delete _spots[epoches[0]];
                }
            }
        }
    };

    var display = function display() {
        $('#spot').fadeIn(200);
        var message = '';
        if (error_message) {
            message = error_message;
        } else {
            message = _quote;
        }

        var spot_element = getElementById('spot');
        if (parseFloat(message) !== +message) {
            spot_element.className = 'error';
        } else {
            spot_element.classList.remove('error');
            displayPriceMovement(spot_element, elementTextContent(spot_element), message);
            displayIndicativeBarrier();
        }

        elementTextContent(spot_element, message);
    };

    /*
     * display indicative barrier
     */
    var displayIndicativeBarrier = function displayIndicativeBarrier() {
        var current_tick = Tick.quote();

        var unit = getElementById('duration_units');
        var indicative_barrier_tooltip = getElementById('indicative_barrier_tooltip');
        var indicative_high_barrier_tooltip = getElementById('indicative_high_barrier_tooltip');
        var indicative_low_barrier_tooltip = getElementById('indicative_low_barrier_tooltip');
        var barrier_element = getElementById('barrier');
        var high_barrier_element = getElementById('barrier_high');
        var low_barrier_element = getElementById('barrier_low');
        var tooltip = getElementById('barrier_tooltip');
        var span = getElementById('barrier_span');
        var high_tooltip = getElementById('barrier_high_tooltip');
        var high_span = getElementById('barrier_high_span');
        var low_tooltip = getElementById('barrier_low_tooltip');
        var low_span = getElementById('barrier_low_span');

        var value = void 0;

        var end_time = getElementById('expiry_date');
        if (unit && (!isVisible(unit) || unit.value !== 'd') && current_tick && !isNaN(current_tick) && end_time && (!isVisible(end_time) || moment(end_time.getAttribute('data-value')).isBefore(moment().add(1, 'day'), 'day'))) {
            var decimal_places = countDecimalPlaces(current_tick);
            if (isVisible(indicative_barrier_tooltip) && String(barrier_element.value).match(/^[+-]/)) {
                var barrier_value = isNaN(parseFloat(barrier_element.value)) ? 0 : parseFloat(barrier_element.value);

                indicative_barrier_tooltip.textContent = (parseFloat(current_tick) + barrier_value).toFixed(decimal_places);
                tooltip.style.display = 'inherit';
                span.style.display = 'none';
            } else {
                elementTextContent(indicative_barrier_tooltip, '');
                tooltip.style.display = 'none';
                span.style.display = 'inherit';
            }

            if (isVisible(indicative_high_barrier_tooltip) && String(high_barrier_element.value).match(/^[+-]/)) {
                value = parseFloat(high_barrier_element.value);
                value = isNaN(value) ? 0 : value;
                indicative_high_barrier_tooltip.textContent = (parseFloat(current_tick) + value).toFixed(decimal_places);
                high_tooltip.style.display = 'inherit';
                high_span.style.display = 'none';
            } else {
                elementTextContent(indicative_high_barrier_tooltip, '');
                high_tooltip.style.display = 'none';
                high_span.style.display = 'inherit';
            }

            if (isVisible(indicative_low_barrier_tooltip) && String(low_barrier_element.value).match(/^[+-]/)) {
                value = parseFloat(low_barrier_element.value);
                value = isNaN(value) ? 0 : value;
                indicative_low_barrier_tooltip.textContent = (parseFloat(current_tick) + value).toFixed(decimal_places);
                low_tooltip.style.display = 'inherit';
                low_span.style.display = 'none';
            } else {
                elementTextContent(indicative_low_barrier_tooltip, '');
                low_tooltip.style.display = 'none';
                low_span.style.display = 'inherit';
            }
        } else {
            elementTextContent(indicative_barrier_tooltip, '');
            elementTextContent(indicative_high_barrier_tooltip, '');
            elementTextContent(indicative_low_barrier_tooltip, '');
        }
    };

    var clean = function clean() {
        _spots = {};
        _quote = '';
        $('#spot').fadeOut(200, function () {
            // resets spot movement coloring, will continue on the next tick responses
            $(this).removeClass('price_moved_down price_moved_up').text('');
        });
    };

    return {
        details: details,
        display: display,
        clean: clean,
        quote: function quote() {
            return _quote;
        },
        id: function id() {
            return _id;
        },
        epoch: function epoch() {
            return _epoch;
        },
        errorMessage: function errorMessage() {
            return error_message;
        },
        spots: function spots() {
            return _spots;
        },
        setQuote: function setQuote(q) {
            _quote = q;
        }
    };
}();

module.exports = Tick;

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Client = __webpack_require__(4);
var getLanguage = __webpack_require__(13).get;
var isStorageSupported = __webpack_require__(6).isStorageSupported;
var getAppId = __webpack_require__(32).getAppId;

var Login = function () {
    var redirectToLogin = function redirectToLogin() {
        if (!Client.isLoggedIn() && !isLoginPages() && isStorageSupported(sessionStorage)) {
            sessionStorage.setItem('redirect_url', window.location.href);
            window.location.href = loginUrl();
        }
    };

    var loginUrl = function loginUrl() {
        var server_url = localStorage.getItem('config.server_url');
        var language = getLanguage();
        return server_url && /qa/.test(server_url) ? 'https://www.' + server_url.split('.')[1] + '.com/oauth2/authorize?app_id=' + getAppId() + '&l=' + language : 'https://oauth.binary.com/oauth2/authorize?app_id=' + getAppId() + '&l=' + language;
    };

    var isLoginPages = function isLoginPages() {
        return (/logged_inws|redirect/i.test(window.location.pathname)
        );
    };

    var socialLoginUrl = function socialLoginUrl(brand) {
        return loginUrl() + '&social_signup=' + brand;
    };

    return {
        redirectToLogin: redirectToLogin,
        isLoginPages: isLoginPages,
        socialLoginUrl: socialLoginUrl
    };
}();

module.exports = Login;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Defaults = __webpack_require__(25);
var Notifications = __webpack_require__(104);
var Symbols = __webpack_require__(67);
var Tick = __webpack_require__(36);
var formatMoney = __webpack_require__(7).formatMoney;
var ActiveSymbols = __webpack_require__(88);
var elementInnerHtml = __webpack_require__(3).elementInnerHtml;
var elementTextContent = __webpack_require__(3).elementTextContent;
var getElementById = __webpack_require__(3).getElementById;
var localize = __webpack_require__(2).localize;
var urlFor = __webpack_require__(8).urlFor;
var createElement = __webpack_require__(0).createElement;
var getPropertyValue = __webpack_require__(0).getPropertyValue;
var isEmptyObject = __webpack_require__(0).isEmptyObject;

/*
 * This contains common functions we need for processing the response
 */

var commonTrading = function () {
    /*
     * display contract form as element of ul
     */
    var displayContractForms = function displayContractForms(id, elements, selected) {
        if (!id || !elements || !selected) return;
        var target = getElementById(id);
        var fragment = document.createDocumentFragment();

        elementInnerHtml(target, '');

        if (elements) {
            var tree = getContractCategoryTree(elements);
            for (var i = 0; i < tree.length; i++) {
                var el1 = tree[i];
                var li = createElement('li', { class: 'tm-li' });

                if (i === 0) {
                    li.classList.add('first');
                } else if (i === tree.length - 1) {
                    li.classList.add('last');
                }

                if ((typeof el1 === 'undefined' ? 'undefined' : _typeof(el1)) === 'object') {
                    var fragment2 = document.createDocumentFragment();
                    var flag = 0;
                    var first = '';
                    for (var j = 0; j < el1[1].length; j++) {
                        var el2 = el1[1][j];
                        var li2 = createElement('li', { class: 'tm-li-2' });
                        var a2 = createElement('a', { class: 'tm-a-2', menuitem: el2.toLowerCase(), id: el2.toLowerCase() });
                        var content2 = document.createTextNode(elements[el2]);

                        if (j === 0) {
                            first = el2.toLowerCase();
                            li2.classList.add('first');
                        } else if (j === el1[1].length - 1) {
                            li2.classList.add('last');
                        }

                        if (selected && selected === el2.toLowerCase()) {
                            li2.classList.add('active');
                            a2.classList.add('a-active');
                            flag = 1;
                        }

                        a2.appendChild(content2);
                        li2.appendChild(a2);
                        fragment2.appendChild(li2);
                    }
                    if (fragment2.hasChildNodes()) {
                        var ul = createElement('ul', { class: 'tm-ul-2', id: el1[0] + '-submenu' });
                        var a = createElement('a', { class: 'tm-a', menuitem: first, text: elements[el1[0]] });

                        ul.appendChild(fragment2);

                        if (flag) {
                            li.classList.add('active');
                        }

                        li.appendChild(a);
                        li.appendChild(ul);
                    }
                } else {
                    var content3 = document.createTextNode(elements[el1]);
                    var a3 = createElement('a', { class: 'tm-a', menuitem: el1, id: el1.toLowerCase() });

                    if (selected && selected === el1.toLowerCase()) {
                        a3.classList.add('a-active');
                        li.classList.add('active');
                    }
                    a3.appendChild(content3);
                    li.appendChild(a3);
                }
                fragment.appendChild(li);
            }
            if (target) {
                target.appendChild(fragment);
                var list = target.getElementsByClassName('tm-li');
                for (var k = 0; k < list.length; k++) {
                    var li4 = list[k];
                    li4.addEventListener('mouseover', function () {
                        this.classList.add('hover');
                    });
                    li4.addEventListener('mouseout', function () {
                        this.classList.remove('hover');
                    });
                }
            }
        }
    };

    var displayMarkets = function displayMarkets(id, elements, selected) {
        var target = document.getElementById(id);
        var fragment = document.createDocumentFragment();

        while (target && target.firstChild) {
            target.removeChild(target.firstChild);
        }

        var keys1 = Object.keys(elements).sort(submarketSort);
        for (var i = 0; i < keys1.length; i++) {
            var key = keys1[i];
            var option = createElement('option', { value: key, text: elements[key].name });
            if (selected && selected === key) {
                option.setAttribute('selected', 'selected');
            }
            fragment.appendChild(option);

            if (elements[key].submarkets && !isEmptyObject(elements[key].submarkets)) {
                var keys2 = Object.keys(elements[key].submarkets).sort(submarketSort);
                for (var j = 0; j < keys2.length; j++) {
                    var key2 = keys2[j];
                    option = createElement('option', { value: key2 });
                    if (selected && selected === key2) {
                        option.setAttribute('selected', 'selected');
                    }
                    elementTextContent(option, '\xA0\xA0\xA0\xA0' + elements[key].submarkets[key2].name);
                    fragment.appendChild(option);
                }
            }
        }
        if (target) {
            target.appendChild(fragment);

            if (target.selectedIndex < 0) {
                target.selectedIndex = 0;
            }
            var current = target.options[target.selectedIndex];
            if (selected !== current.value) {
                Defaults.set('market', current.value);
            }

            if (current.disabled) {
                // there is no open market
                Notifications.show({ text: localize('All markets are closed now. Please try again later.'), uid: 'MARKETS_CLOSED' });
                getElementById('trading_init_progress').style.display = 'none';
            }
        }
    };

    /*
     * display underlyings
     */
    var displayUnderlyings = function displayUnderlyings(id, elements, selected) {
        var target = document.getElementById(id);
        if (!target) return;

        while (target.firstChild) {
            target.removeChild(target.firstChild);
        }

        if (!isEmptyObject(elements)) {
            target.appendChild(generateUnderlyingOptions(elements, selected));
        }
    };

    var generateUnderlyingOptions = function generateUnderlyingOptions(elements, selected) {
        var fragment = document.createDocumentFragment();
        var keys = Object.keys(elements).sort(function (a, b) {
            return elements[a].display.localeCompare(elements[b].display, {}, { numeric: true });
        });
        var submarkets = {};
        for (var i = 0; i < keys.length; i++) {
            if (!getPropertyValue(submarkets, elements[keys[i]].submarket)) {
                submarkets[elements[keys[i]].submarket] = [];
            }
            submarkets[elements[keys[i]].submarket].push(keys[i]);
        }
        var keys2 = Object.keys(submarkets).sort(submarketSort);
        for (var j = 0; j < keys2.length; j++) {
            for (var k = 0; k < submarkets[keys2[j]].length; k++) {
                var key = submarkets[keys2[j]][k];
                var option = createElement('option', { value: key, text: localize(elements[key].display) });
                if (selected && selected === key) {
                    option.setAttribute('selected', 'selected');
                }
                fragment.appendChild(option);
            }
        }
        return fragment;
    };

    /*
     * This maps the form name and barrierCategory we display on
     * trading form to the actual we send it to backend
     * for e.g risefall is mapped to callput with barrierCategory euro_atm
     */
    var getFormNameBarrierCategory = function getFormNameBarrierCategory() {
        var form_name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        var name = form_name;
        var barrier = '';
        if (/higherlower/.test(form_name)) {
            name = 'callput';
            barrier = 'euro_non_atm';
        } else if (/risefall|callput/.test(form_name)) {
            name = 'callput';
            barrier = 'euro_atm';
        } else if (/overunder|evenodd|matchdiff/.test(form_name)) {
            name = 'digits';
        } else if (/lookback/.test(form_name)) {
            name = 'lookback';
        }
        return {
            form_name: name,
            barrier_category: barrier
        };
    };

    /*
     * This maps the contract type to where we display on trading form
     * and as there is no mapping on server side so need to create it
     * on front end
     *
     * for example we display CALL on top and PUT to bottom
     */
    var obj = {
        CALL: 'top',
        PUT: 'bottom',
        CALLE: 'top',
        PUTE: 'bottom',
        ASIANU: 'top',
        ASIAND: 'bottom',
        DIGITMATCH: 'top',
        DIGITDIFF: 'bottom',
        DIGITEVEN: 'top',
        DIGITODD: 'bottom',
        DIGITOVER: 'top',
        DIGITUNDER: 'bottom',
        EXPIRYRANGEE: 'top',
        EXPIRYMISSE: 'bottom',
        EXPIRYRANGE: 'top',
        EXPIRYMISS: 'bottom',
        RANGE: 'top',
        UPORDOWN: 'bottom',
        ONETOUCH: 'top',
        NOTOUCH: 'bottom',
        LBFLOATCALL: 'middle',
        LBFLOATPUT: 'middle',
        LBHIGHLOW: 'middle'
    };

    var contractTypeDisplayMapping = function contractTypeDisplayMapping(type) {
        return type ? obj[type] : 'top';
    };

    var showHideOverlay = function showHideOverlay(el, display) {
        getElementById(el).style.display = display;
    };

    /*
     * hide contract confirmation overlay container
     */
    var hideOverlayContainer = function hideOverlayContainer() {
        showHideOverlay('contract_confirmation_container', 'none');
        showHideOverlay('contracts_list', 'flex');
        $('.purchase_button').css('visibility', '');
    };

    var getContractCategoryTree = function getContractCategoryTree(elements) {
        var tree = [['updown', ['risefall', 'higherlower']], 'touchnotouch', ['inout', ['endsinout', 'staysinout']], 'asian', ['digits', ['matchdiff', 'evenodd', 'overunder']], ['lookback', ['lookbackhigh', 'lookbacklow', 'lookbackhighlow']]];

        if (elements) {
            tree = tree.map(function (e) {
                var value = e;
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
                    value[1] = value[1].filter(function (value1) {
                        return elements[value1];
                    });
                    if (!value[1].length) {
                        value = '';
                    }
                } else if (!elements[value]) {
                    value = '';
                }
                return value;
            });
            tree = tree.filter(function (v) {
                return v.length;
            });
        }
        return tree;
    };

    /*
     * resets price movement color changing, to prevent coloring on some changes
     * coloring will continue on the next proposal responses
     */
    var resetPriceMovement = function resetPriceMovement() {
        var btns = document.getElementsByClassName('purchase_button');
        for (var i = 0; i < btns.length; i++) {
            btns[i].setAttribute('data-display_value', '');
            btns[i].setAttribute('data-payout', '');
        }
    };

    var toggleActiveCatMenuElement = function toggleActiveCatMenuElement(nav, event_element_id) {
        var event_element = getElementById(event_element_id);
        var li_elements = nav.querySelectorAll('.active, .a-active');
        var classes = event_element.classList;
        var i = void 0,
            len = void 0;

        if (!classes.contains('active')) {
            for (i = 0, len = li_elements.length; i < len; i++) {
                li_elements[i].classList.remove('active');
                li_elements[i].classList.remove('a-active');
            }
            classes.add('a-active');

            i = 0;
            var parent = event_element.parentElement;
            while (parent && parent.id !== nav.id && i < 10) {
                if (parent.tagName === 'LI') {
                    parent.classList.add('active');
                }
                parent = parent.parentElement;
                i++;
            }
        }
    };

    /*
     * display the profit and return of bet under each trade container
     */
    var displayCommentPrice = function displayCommentPrice(node, currency, type, payout) {
        if (node && type && payout) {
            var profit = payout - type;
            var return_percent = profit / type * 100;
            var comment = localize('Net profit') + ': ' + formatMoney(currency, profit) + ' | ' + localize('Return') + ' ' + return_percent.toFixed(1) + '%';

            if (isNaN(profit) || isNaN(return_percent)) {
                node.hide();
            } else {
                node.show();
                elementInnerHtml(node, comment);
            }
        }
    };

    /*
     * This is used in case where we have input and we don't want to fire
     * event on every change while user is typing for example in case of amount if
     * we want to change 10 to 1000 i.e. two zeros so two input events will be fired
     * normally, this will delay the event based on delay specified in milliseconds
     *
     * Reference
     * http://davidwalsh.name/javascript-debounce-function
     */
    var debounce = function debounce(func, wait, immediate) {
        var timeout = void 0;
        var delay = wait || 500;
        return function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var context = this;
            var later = function later() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var call_now = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, delay);
            if (call_now) func.apply(context, args);
        };
    };

    /*
     * check if selected market is allowed for current user
     */
    var getDefaultMarket = function getDefaultMarket() {
        var mkt = Defaults.get('market');
        var markets = Symbols.markets(1);
        if (!mkt || !markets[mkt]) {
            var sorted_markets = Object.keys(Symbols.markets()).filter(function (v) {
                return markets[v].is_active;
            }).sort(function (a, b) {
                return getMarketsOrder(a) - getMarketsOrder(b);
            });
            mkt = sorted_markets[0];
        }
        return mkt;
    };

    // Order
    var market_order = {
        forex: 1,
        volidx: 2,
        indices: 3,
        stocks: 4,
        commodities: 5
    };

    var getMarketsOrder = function getMarketsOrder(market) {
        return market_order[market] || 100;
    };

    /*
     * this is invoked when submit button is clicked and prevents reloading of page
     */
    var addEventListenerForm = function addEventListenerForm() {
        getElementById('websocket_form').addEventListener('submit', function (evt) {
            evt.currentTarget.classList.add('submitted');
            evt.preventDefault();
            return false;
        }, false);
    };

    /*
     * this creates a button, clicks it, and destroys it to invoke the listener
     */
    var submitForm = function submitForm(form) {
        var button = form.ownerDocument.createElement('input');
        button.style.display = 'none';
        button.type = 'submit';
        form.appendChild(button).click();
        form.removeChild(button);
    };

    /*
     * sort the duration in ascending order
     */
    var duration_order = {
        t: 1,
        s: 2,
        m: 3,
        h: 4,
        d: 5
    };

    var submarket_order = {
        forex: 0,
        major_pairs: 1,
        minor_pairs: 2,
        smart_fx: 3,
        indices: 4,
        asia_oceania: 5,
        europe_africa: 6,
        americas: 7,
        otc_index: 8,
        stocks: 9,
        au_otc_stock: 10,
        ge_otc_stock: 11,
        india_otc_stock: 12,
        uk_otc_stock: 13,
        us_otc_stock: 14,
        commodities: 15,
        metals: 16,
        energy: 17,
        volidx: 18,
        random_index: 19,
        random_daily: 20,
        random_nightly: 21
    };

    var submarketOrder = function submarketOrder(market) {
        return submarket_order[market];
    };

    var submarketSort = function submarketSort(a, b) {
        if (submarketOrder(a) > submarketOrder(b)) {
            return 1;
        } else if (submarketOrder(a) < submarketOrder(b)) {
            return -1;
        }

        return 0;
    };

    var displayTooltip = function displayTooltip() {
        var tip = getElementById('symbol_tip');
        if (tip) {
            var market = ActiveSymbols.getSymbols()[Defaults.get('underlying')].market;
            var map_to_section_id = {
                forex: 'forex',
                indices: 'otc-stocks-and-indices',
                stocks: 'otc-stocks-and-indices',
                commodities: 'commodities',
                volidx: 'volatility-indices'
            };
            tip.setAttribute('href', urlFor('/get-started/binary-options', 'anchor=' + map_to_section_id[market] + '#range-of-markets'));
        }
    };

    var selectOption = function selectOption(option, select) {
        if (!select) return false;

        var options = select.getElementsByTagName('option');
        var contains = 0;
        for (var i = 0; i < options.length; i++) {
            if (options[i].value === option && !options[i].hasAttribute('disabled')) {
                contains = 1;
                break;
            }
        }
        if (contains) {
            select.value = option;
            return true;
        }

        return false;
    };

    var chart_config = {
        type: 'line',
        lineColor: '#606060',
        fillColor: false,
        spotColor: '#00f000',
        minSpotColor: '#f00000',
        maxSpotColor: '#0000f0',
        highlightSpotColor: '#ffff00',
        highlightLineColor: '#000000',
        spotRadius: 1.25
    };

    var $chart = void 0;

    var updateWarmChart = function updateWarmChart() {
        $chart = $chart || $('#trading_worm_chart');
        var spots = Object.keys(Tick.spots()).sort(function (a, b) {
            return a - b;
        }).map(function (v) {
            return Tick.spots()[v];
        });
        if ($chart && typeof $chart.sparkline === 'function') {
            $chart.sparkline(spots, chart_config);
            if (spots.length) {
                $chart.show();
            } else {
                $chart.hide();
            }
        }
    };

    var reloadPage = function reloadPage() {
        Defaults.remove('market', 'underlying', 'formname', 'date_start', 'time_start', 'expiry_type', 'expiry_date', 'expirt_time', 'duration_units', 'diration_value', 'amount', 'amount_type', 'currency', 'prediction');
        location.reload();
    };

    var timeIsValid = function timeIsValid($element) {
        var end_time_value = getElementById('expiry_time').value;
        var $invalid_time = $('#invalid-time');

        if ($element.attr('id') === 'expiry_time' && end_time_value && !/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(end_time_value)) {
            $element.addClass('error-field');
            if ($invalid_time.length === 0) {
                $('#expiry_type_endtime').parent().append($('<p>', { class: 'error-msg', id: 'invalid-time', text: localize('Time is in the wrong format.') }));
            }
            return false;
        }

        $element.removeClass('error-field');
        $invalid_time.remove();

        $element.removeClass('error-field');
        $('#end_time_validation').remove();
        return true;
    };

    return {
        displayUnderlyings: displayUnderlyings,
        getFormNameBarrierCategory: getFormNameBarrierCategory,
        contractTypeDisplayMapping: contractTypeDisplayMapping,
        hideOverlayContainer: hideOverlayContainer,
        getContractCategoryTree: getContractCategoryTree,
        resetPriceMovement: resetPriceMovement,
        toggleActiveCatMenuElement: toggleActiveCatMenuElement,
        displayCommentPrice: displayCommentPrice,
        debounce: debounce,
        getDefaultMarket: getDefaultMarket,
        addEventListenerForm: addEventListenerForm,
        submitForm: submitForm,
        displayTooltip: displayTooltip,
        selectOption: selectOption,
        updateWarmChart: updateWarmChart,
        reloadPage: reloadPage,
        displayContractForms: displayContractForms,
        displayMarkets: displayMarkets,
        timeIsValid: timeIsValid,
        showPriceOverlay: function showPriceOverlay() {
            showHideOverlay('loading_container2', 'block');
        },
        hidePriceOverlay: function hidePriceOverlay() {
            showHideOverlay('loading_container2', 'none');
        },
        hideFormOverlay: function hideFormOverlay() {
            showHideOverlay('loading_container3', 'none');
        },
        showFormOverlay: function showFormOverlay() {
            showHideOverlay('loading_container3', 'block');
        },
        durationOrder: function durationOrder(duration) {
            return duration_order[duration];
        },
        clean: function clean() {
            $chart = null;
        }
    };
}();

module.exports = commonTrading;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.connect = exports.MobxProvider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _mobxReact = __webpack_require__(618);

var _mobx = __webpack_require__(98);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SPECIAL_REACT_KEYS = { children: true, key: true, ref: true };

var MobxProvider = exports.MobxProvider = function (_Provider) {
    _inherits(MobxProvider, _Provider);

    function MobxProvider() {
        _classCallCheck(this, MobxProvider);

        return _possibleConstructorReturn(this, (MobxProvider.__proto__ || Object.getPrototypeOf(MobxProvider)).apply(this, arguments));
    }

    _createClass(MobxProvider, [{
        key: 'getChildContext',
        value: function getChildContext() {
            var stores = {};

            // inherit stores
            var baseStores = this.context.mobxStores;
            if (baseStores) {
                for (var key in baseStores) {
                    // eslint-disable-line
                    stores[key] = baseStores[key];
                }
            }

            // add own stores
            for (var _key in this.props.store) {
                // eslint-disable-line
                if (!SPECIAL_REACT_KEYS[_key]) {
                    stores[_key] = this.props.store[_key];
                }
            }

            return {
                mobxStores: stores
            };
        }
    }]);

    return MobxProvider;
}(_mobxReact.Provider);

var isFunction = function isFunction(fn) {
    return typeof fn === 'function';
};
var isShallowEqual = function isShallowEqual(a, b) {
    return Object.keys(a).every(function (key) {
        return isFunction(a[key]) && isFunction(b[key]) || a[key] === b[key];
    });
};

var unboxProps = function unboxProps(props) {
    var unboxedProps = {};
    Object.keys(props).forEach(function (key) {
        var value = props[key];
        var result = void 0;

        if ((0, _mobx.isObservableArray)(value)) {
            result = value.peek();
        } else if ((0, _mobx.isObservableMap)(value)) {
            result = value.toJS();
        } else if ((0, _mobx.isBoxedObservable)(value)) {
            result = value.get();
        } else if ((0, _mobx.isObservable)(value)) {
            result = (0, _mobx.toJS)(value);
        } else {
            result = value;
        }

        unboxedProps[key] = result;
    });

    return unboxedProps;
};

var connect = exports.connect = function connect(mapStoresToProps) {
    return function (WrappedComponent) {
        var UnboxedComponent = function (_Component) {
            _inherits(UnboxedComponent, _Component);

            function UnboxedComponent() {
                _classCallCheck(this, UnboxedComponent);

                return _possibleConstructorReturn(this, (UnboxedComponent.__proto__ || Object.getPrototypeOf(UnboxedComponent)).apply(this, arguments));
            }

            _createClass(UnboxedComponent, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(WrappedComponent, this.props);
                }
            }, {
                key: 'shouldComponentUpdate',
                value: function shouldComponentUpdate(nextProps) {
                    return !isShallowEqual(nextProps, this.props);
                }
            }]);

            return UnboxedComponent;
        }(_react.Component);

        // wrap the mapping function usually passed to mobx-react's inject method
        // so that it additionally unboxes any observables


        var unboxedMapStoresToProps = function unboxedMapStoresToProps(stores, props, context) {
            var injectedProps = mapStoresToProps(stores, props, context);
            Object.assign(injectedProps, props);
            return unboxProps(injectedProps);
        };

        // apply the mobx store injection with our wrapped function
        var InjectedComponent = (0, _mobxReact.inject)(unboxedMapStoresToProps)(UnboxedComponent);

        // make some nice names that will show up in the React Devtools
        var wrappedDisplayName = WrappedComponent.displayName || WrappedComponent.name || WrappedComponent.constructor && WrappedComponent.constructor.name || 'Unknown';
        InjectedComponent.displayName = 'inject-' + wrappedDisplayName;
        UnboxedComponent.displayName = 'unbox-' + wrappedDisplayName;

        return InjectedComponent;
    };
};

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Cookies = __webpack_require__(33);
var moment = __webpack_require__(9);
var Client = __webpack_require__(4);
var Login = __webpack_require__(41);
var BinarySocket = __webpack_require__(5);
var getElementById = __webpack_require__(3).getElementById;
var isVisible = __webpack_require__(3).isVisible;
var getLanguage = __webpack_require__(13).get;
var State = __webpack_require__(6).State;
var getAppId = __webpack_require__(32).getAppId;

var GTM = function () {
    var isGtmApplicable = function isGtmApplicable() {
        return (/^(1|1098)$/.test(getAppId())
        );
    };

    var gtmDataLayerInfo = function gtmDataLayerInfo(data) {
        var data_layer_info = {
            language: getLanguage(),
            pageTitle: pageTitle(),
            pjax: State.get('is_loaded_by_pjax'),
            url: document.URL,
            event: 'page_load'
        };
        if (Client.isLoggedIn()) {
            data_layer_info.visitorId = Client.get('loginid');
        }

        $.extend(true, data_layer_info, data);

        var event = data_layer_info.event;
        delete data_layer_info.event;

        return {
            event: event,
            data: data_layer_info
        };
    };

    var pushDataLayer = function pushDataLayer(data) {
        if (isGtmApplicable() && !Login.isLoginPages()) {
            var info = gtmDataLayerInfo(data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' ? data : null);
            dataLayer[0] = info.data;
            dataLayer.push(info.data);
            dataLayer.push({ event: info.event });
        }
    };

    var pageTitle = function pageTitle() {
        var t = /^.+[:-]\s*(.+)$/.exec(document.title);
        return t && t[1] ? t[1] : document.title;
    };

    var eventHandler = function eventHandler(get_settings) {
        if (!isGtmApplicable()) return;
        var is_login = localStorage.getItem('GTM_login') === '1';
        var is_new_account = localStorage.getItem('GTM_new_account') === '1';
        if (!is_login && !is_new_account) return;

        localStorage.removeItem('GTM_login');
        localStorage.removeItem('GTM_new_account');

        var affiliate_token = Cookies.getJSON('affiliate_tracking');
        if (affiliate_token) {
            pushDataLayer({ bom_affiliate_token: affiliate_token.t });
        }

        var data = {
            visitorId: Client.get('loginid'),
            bom_currency: Client.get('currency'),
            bom_country: get_settings.country,
            bom_country_abbrev: get_settings.country_code,
            bom_email: get_settings.email,
            url: window.location.href,
            bom_today: Math.floor(Date.now() / 1000),
            event: is_new_account ? 'new_account' : 'log_in'
        };
        if (is_new_account) {
            data.bom_date_joined = data.bom_today;
        }
        if (!Client.get('is_virtual')) {
            data.bom_age = parseInt((moment().unix() - get_settings.date_of_birth) / 31557600);
            data.bom_firstname = get_settings.first_name;
            data.bom_lastname = get_settings.last_name;
            data.bom_phone = get_settings.phone;
        }

        if (is_login) {
            BinarySocket.wait('mt5_login_list').then(function (response) {
                (response.mt5_login_list || []).forEach(function (obj) {
                    var acc_type = (Client.getMT5AccountType(obj.group) || '').replace('real_vanuatu', 'financial').replace('vanuatu_', '').replace('costarica', 'gaming'); // i.e. financial_cent, demo_cent, demo_gaming, real_gaming
                    if (acc_type) {
                        data['mt5_' + acc_type + '_id'] = obj.login;
                    }
                });
                pushDataLayer(data);
            });
        } else {
            pushDataLayer(data);
        }
    };

    var pushPurchaseData = function pushPurchaseData(response) {
        if (!isGtmApplicable() || Client.get('is_virtual')) return;
        var buy = response.buy;
        if (!buy) return;
        var req = response.echo_req.passthrough;
        var data = {
            event: 'buy_contract',
            visitorId: Client.get('loginid'),
            bom_symbol: req.symbol,
            bom_market: getElementById('contract_markets').value,
            bom_currency: req.currency,
            bom_contract_type: req.contract_type,
            bom_contract_id: buy.contract_id,
            bom_transaction_id: buy.transaction_id,
            bom_buy_price: buy.buy_price,
            bom_payout: buy.payout
        };
        $.extend(data, {
            bom_amount: req.amount,
            bom_basis: req.basis,
            bom_expiry_type: getElementById('expiry_type').value
        });
        if (data.bom_expiry_type === 'duration') {
            $.extend(data, {
                bom_duration: req.duration,
                bom_duration_unit: req.duration_unit
            });
        }
        if (isVisible(getElementById('barrier'))) {
            data.bom_barrier = req.barrier;
        } else if (isVisible(getElementById('barrier_high'))) {
            data.bom_barrier_high = req.barrier;
            data.bom_barrier_low = req.barrier2;
        }
        if (isVisible(getElementById('prediction'))) {
            data.bom_prediction = req.barrier;
        }

        pushDataLayer(data);
    };

    var mt5NewAccount = function mt5NewAccount(response) {
        var acc_type = response.mt5_new_account.mt5_account_type ? response.mt5_new_account.account_type + '_' + response.mt5_new_account.mt5_account_type : // financial_cent, demo_cent, ...
        (response.mt5_new_account.account_type === 'demo' ? 'demo' : 'real') + '_gaming'; // demo_gaming, real_gaming

        var gtm_data = {
            event: 'mt5_new_account',
            bom_email: Client.get('email'),
            bom_country: State.getResponse('get_settings.country'),
            mt5_last_signup: acc_type
        };

        gtm_data['mt5_' + acc_type + '_id'] = response.mt5_new_account.login;

        if (/demo/.test(acc_type) && !Client.get('is_virtual')) {
            gtm_data.visitorId = Client.getAccountOfType('virtual').loginid;
        }

        pushDataLayer(gtm_data);
    };

    return {
        pushDataLayer: pushDataLayer,
        eventHandler: eventHandler,
        pushPurchaseData: pushPurchaseData,
        mt5NewAccount: mt5NewAccount,
        setLoginFlag: function setLoginFlag() {
            if (isGtmApplicable()) localStorage.setItem('GTM_login', '1');
        }
    };
}();

module.exports = GTM;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var addComma = __webpack_require__(7).addComma;
var getDecimalPlaces = __webpack_require__(7).getDecimalPlaces;
var Client = __webpack_require__(4);
var Password = __webpack_require__(146);
var localize = __webpack_require__(2).localize;
var compareBigUnsignedInt = __webpack_require__(18).compareBigUnsignedInt;
var getHashValue = __webpack_require__(8).getHashValue;
var isEmptyObject = __webpack_require__(0).isEmptyObject;

var Validation = function () {
    var forms = {};
    var error_class = 'error-msg';
    var hidden_class = 'invisible';

    var events_map = {
        input: 'input.validation change.validation',
        select: 'change.validation',
        checkbox: 'change.validation'
    };

    var getFieldType = function getFieldType($field) {
        var type = null;
        if ($field.length) {
            type = $field.attr('type') === 'checkbox' ? 'checkbox' : $field.get(0).localName;
        }
        return type;
    };

    var isChecked = function isChecked(field) {
        return field.$.is(':checked') ? '1' : '';
    };

    var getFieldValue = function getFieldValue(field, options) {
        var value = void 0;
        if (typeof options.value === 'function') {
            value = options.value();
        } else {
            value = field.type === 'checkbox' ? isChecked(field) : field.$.val();
        }
        return value || '';
    };

    var initForm = function initForm(form_selector, fields, needs_token) {
        var $form = $(form_selector + ':visible');

        if (needs_token) {
            var token = getHashValue('token');
            if (!validEmailToken(token)) {
                $form.replaceWith($('<div/>', { class: error_class, text: localize('Verification code is wrong. Please use the link sent to your email.') }));
                return;
            }
        }

        if ($form.length) {
            forms[form_selector] = { $form: $form };
            if (Array.isArray(fields) && fields.length) {
                forms[form_selector].fields = fields;
                fields.forEach(function (field) {
                    field.$ = $form.find(field.selector);
                    if (!field.$.length || !field.validations) return;

                    field.type = getFieldType($(field.$[0])); // also handles multiple results
                    field.form = form_selector;
                    if (field.msg_element) {
                        field.$error = $form.find(field.msg_element);
                    } else {
                        var $parent = field.$.parent();
                        // Add indicator to required fields
                        if (field.validations.find(function (v) {
                            return (/^req$/.test(v) && (isEmptyObject(v[1]) || !v[1].hide_asterisk)
                            );
                        })) {
                            var $label = $parent.parent().find('label');
                            if (!$label.length) $label = $parent.find('label');
                            if ($label.length && $label.find('span.required_field_asterisk').length === 0) {
                                $($label[0]).append($('<span/>', { class: 'required_field_asterisk', text: '*' }));
                            }
                        }
                        if ($parent.find('p.' + error_class).length === 0) {
                            $parent.append($('<p/>', { class: error_class + ' ' + hidden_class + ' no-margin' }));
                        }
                        field.$error = $parent.find('.' + error_class);
                    }

                    var event = events_map[field.type];

                    if (event) {
                        field.$.unbind(event).on(event, function () {
                            checkField(field);
                            if (field.re_check_field) {
                                checkField(forms[form_selector].fields.find(function (fld) {
                                    return fld.selector === field.re_check_field;
                                }));
                            }
                        });
                    }
                });
            }
        }
    };

    // ------------------------------
    // ----- Validation Methods -----
    // ------------------------------
    var validRequired = function validRequired(value, options, field) {
        if (value.length) return true;
        // else
        validators_map.req.message = field.type === 'checkbox' ? 'Please select the checkbox.' : 'This field is required.';
        return false;
    };
    var validEmail = function validEmail(value) {
        return (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/.test(value)
        );
    };
    var validPassword = function validPassword(value, options, field) {
        if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+/.test(value)) {
            Password.checkPassword(field.selector);
            return true;
        }
        // else
        return false;
    };
    var validLetterSymbol = function validLetterSymbol(value) {
        return !/[`~!@#$%^&*)(_=+[}{\]\\/";:?><,|\d]+/.test(value);
    };
    var validGeneral = function validGeneral(value) {
        return !/[`~!@#$%^&*)(_=+[}{\]\\/";:?><|]+/.test(value);
    };
    var validAddress = function validAddress(value) {
        return !/[`~!$%^&*_=+[}{\]\\"?><|]+/.test(value);
    };
    var validPostCode = function validPostCode(value) {
        return (/^[a-zA-Z\d-\s]*$/.test(value)
        );
    };
    var validPhone = function validPhone(value) {
        return (/^\+?[0-9\s]*$/.test(value)
        );
    };
    var validRegular = function validRegular(value, options) {
        return options.regex.test(value);
    };
    var validEmailToken = function validEmailToken(value) {
        return value.trim().length === 8;
    };
    var validTaxID = function validTaxID(value) {
        return (/^[a-zA-Z0-9]*[\w-]*$/.test(value)
        );
    };

    var validCompare = function validCompare(value, options) {
        return value === $(options.to).val();
    };
    var validNotEqual = function validNotEqual(value, options) {
        return value !== $(options.to).val();
    };
    var validMin = function validMin(value, options) {
        return options.min ? value.length >= options.min : true;
    };
    var validLength = function validLength(value, options) {
        return (options.min ? value.length >= options.min : true) && (options.max ? value.length <= options.max : true);
    };

    var validNumber = function validNumber(value, options) {
        if (options.allow_empty && value.length === 0) {
            return true;
        }

        var is_ok = true;
        var message = '';

        if (!(options.type === 'float' ? /^\d+(\.\d+)?$/ : /^\d+$/).test(value) || !$.isNumeric(value)) {
            is_ok = false;
            message = localize('Should be a valid number.');
        } else if (options.type === 'float' && options.decimals && !new RegExp('^\\d+(\\.\\d{0,' + options.decimals + '})?$').test(value)) {
            is_ok = false;
            message = localize('Up to [_1] decimal places are allowed.', [options.decimals]);
        } else if ('min' in options && 'max' in options && +options.min === +options.max && +value !== +options.min) {
            is_ok = false;
            message = localize('Should be [_1]', [addComma(options.min, options.format_money ? getDecimalPlaces(Client.get('currency')) : undefined)]);
        } else if ('min' in options && 'max' in options && (+value < +options.min || isMoreThanMax(value, options))) {
            is_ok = false;
            message = localize('Should be between [_1] and [_2]', [addComma(options.min, options.format_money ? getDecimalPlaces(Client.get('currency')) : undefined), addComma(options.max, options.format_money ? getDecimalPlaces(Client.get('currency')) : undefined)]);
        } else if ('min' in options && +value < +options.min) {
            is_ok = false;
            message = localize('Should be more than [_1]', [addComma(options.min, options.format_money ? getDecimalPlaces(Client.get('currency')) : undefined)]);
        } else if ('max' in options && isMoreThanMax(value, options)) {
            is_ok = false;
            message = localize('Should be less than [_1]', [addComma(options.max, options.format_money ? getDecimalPlaces(Client.get('currency')) : undefined)]);
        }

        validators_map.number.message = message;
        return is_ok;
    };

    var isMoreThanMax = function isMoreThanMax(value, options) {
        return options.type === 'float' ? +value > +options.max : compareBigUnsignedInt(value, options.max) === 1;
    };

    var validators_map = {
        req: { func: validRequired, message: '' },
        email: { func: validEmail, message: 'Invalid email address.' },
        password: { func: validPassword, message: 'Password should have lower and uppercase letters with numbers.' },
        general: { func: validGeneral, message: 'Only letters, numbers, space, hyphen, period, and apostrophe are allowed.' },
        address: { func: validAddress, message: 'Only letters, numbers, space, and these special characters are allowed: - . \' # ; : ( ) , @ /' },
        letter_symbol: { func: validLetterSymbol, message: 'Only letters, space, hyphen, period, and apostrophe are allowed.' },
        postcode: { func: validPostCode, message: 'Only letters, numbers, space, and hyphen are allowed.' },
        phone: { func: validPhone, message: 'Only numbers and spaces are allowed.' },
        compare: { func: validCompare, message: 'The two passwords that you entered do not match.' },
        not_equal: { func: validNotEqual, message: '[_1] and [_2] cannot be the same.' },
        min: { func: validMin, message: 'Minimum of [_1] characters required.' },
        length: { func: validLength, message: 'You should enter [_1] characters.' },
        number: { func: validNumber, message: '' },
        regular: { func: validRegular, message: '' },
        tax_id: { func: validTaxID, message: 'Should start with letter or number, and may contain hyphen and underscore.' }
    };

    var pass_length = function pass_length(type) {
        return { min: /^mt$/.test(type) ? 8 : 6, max: 25 };
    };

    // --------------------
    // ----- Validate -----
    // --------------------
    var checkField = function checkField(field) {
        if (!field.$.is(':visible') || !field.validations) return true;
        var all_is_ok = true;
        var message = '';
        var field_type = field.$.attr('type');

        field.validations.some(function (valid) {
            if (!valid) return false; // check next validation
            var type = void 0;
            var options = {};

            if (typeof valid === 'string') {
                type = valid;
            } else {
                type = valid[0];
                options = valid[1];
            }

            if (type === 'password' && !validLength(getFieldValue(field, options), pass_length(options))) {
                field.is_ok = false;
                type = 'length';
                options = pass_length(options);
            } else {
                var validator = type === 'custom' ? options.func : validators_map[type].func;

                var value = getFieldValue(field, options);
                if (field_type !== 'password' && typeof value === 'string') {
                    value = value.trim();
                }

                field.is_ok = validator(value, options, field);
            }

            if (!field.is_ok) {
                message = options.message || validators_map[type].message;
                if (type === 'length') {
                    message = localize(message, [options.min === options.max ? options.min : options.min + '-' + options.max]);
                } else if (type === 'min') {
                    message = localize(message, [options.min]);
                } else if (type === 'not_equal') {
                    message = localize(message, [localize(options.name1), localize(options.name2)]);
                }
                all_is_ok = false;
                return true; // break on the first error found
            }
            return false; // check next validation
        });

        if (!all_is_ok) {
            showError(field, message);
        } else {
            clearError(field);
        }

        return all_is_ok;
    };

    var clearError = function clearError(field) {
        if (field.$error && field.$error.length) {
            field.$error.setVisibility(0);
        }
    };

    var showError = function showError(field, message) {
        clearError(field);
        Password.removeCheck(field.selector);
        field.$error.html(localize(message)).setVisibility(1);
    };

    var validate = function validate(form_selector) {
        var form = forms[form_selector];
        if (!form.fields) return true;
        form.is_ok = true;
        form.fields.forEach(function (field) {
            if (!checkField(field)) {
                if (form.is_ok && !field.no_scroll) {
                    // first error
                    $.scrollTo(field.$, 500, { offset: -10 });
                }
                form.is_ok = false;
            }
        });
        return form.is_ok;
    };

    return {
        validate: validate,
        validEmailToken: validEmailToken,

        init: initForm
    };
}();

module.exports = Validation;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getFormNameBarrierCategory = __webpack_require__(42).getFormNameBarrierCategory;
var getLanguage = __webpack_require__(13).get;
var localize = __webpack_require__(2).localize;
var getPropertyValue = __webpack_require__(0).getPropertyValue;
var isEmptyObject = __webpack_require__(0).isEmptyObject;

/*
 * Contract object mocks the trading form we have on our website
 * It parses the contracts json we get from socket.send({contracts_for: 'R_50'})
 * and gives back barriers, startDate, durations etc
 *
 *
 * Usage:
 *
 * use `Contract.details` to populate this object
 *
 * then use
 *
 * `Contract.durations()` to get durations like seconds, hours etc
 * `Contract.open()` `Contract.close()`
 * `Contract.barriers` if applicable for current underlying
 */
var Contract = function () {
    var contract_type = {};

    var contract_details = {};
    var _barriers = {};
    var _durations = {};
    var start_dates = {};

    var _open = void 0,
        _close = void 0,
        _form = void 0,
        _barrier = void 0;

    var populateDurations = function populateDurations(current_contract) {
        var current_category = current_contract.contract_category;
        var expiry_type = current_contract.expiry_type;
        var barrier_category = current_contract.barrier_category;
        var start_type = current_contract.start_type;
        var max_duration = current_contract.max_contract_duration;
        var min_duration = current_contract.min_contract_duration;

        if (!_durations[expiry_type]) {
            _durations[expiry_type] = {};
        }

        if (!_durations[expiry_type][current_category]) {
            _durations[expiry_type][current_category] = {};
        }

        if (!_durations[expiry_type][current_category][barrier_category]) {
            _durations[expiry_type][current_category][barrier_category] = {};
        }

        if (!_durations[expiry_type][current_category][barrier_category][start_type]) {
            _durations[expiry_type][current_category][barrier_category][start_type] = {};
        }

        _durations[expiry_type][current_category][barrier_category][start_type].max_contract_duration = max_duration;

        _durations[expiry_type][current_category][barrier_category][start_type].min_contract_duration = min_duration;
    };

    var details = function details(form_name) {
        var contracts = Contract.contracts().contracts_for;
        var barrier_category = void 0;

        if (!contracts) return;

        start_dates = { has_spot: 0, list: [] };
        _durations = {};
        _open = contracts.open;
        _close = contracts.close;

        var form_barrier = getFormNameBarrierCategory(form_name);
        _form = form_barrier.form_name;
        _barrier = barrier_category = form_barrier.barrier_category;

        contracts.available.forEach(function (current_obj) {
            var contract_category = current_obj.contract_category;

            if (_form && _form === contract_category) {
                if (barrier_category) {
                    if (barrier_category === current_obj.barrier_category) {
                        populateDurations(current_obj);
                    }
                } else {
                    populateDurations(current_obj);
                }

                if (current_obj.forward_starting_options && current_obj.start_type === 'forward' && sessionStorage.formname !== 'higherlower') {
                    start_dates.list = current_obj.forward_starting_options;
                } else if (current_obj.start_type === 'spot') {
                    start_dates.has_spot = 1;
                }

                var symbol = current_obj.underlying_symbol;
                if (current_obj.barrier_category && current_obj.barrier_category !== 'non_financial') {
                    if (!getPropertyValue(_barriers, symbol)) {
                        _barriers[symbol] = {};
                    }
                    if (current_obj.barriers === 1) {
                        _barriers[symbol][contract_category] = {
                            count: 1,
                            barrier: current_obj.barrier,
                            barrier_category: current_obj.barrier_category
                        };
                    } else if (current_obj.barriers === 2) {
                        _barriers[symbol][contract_category] = {
                            count: 2,
                            barrier: current_obj.high_barrier,
                            barrier1: current_obj.low_barrier,
                            barrier_category: current_obj.barrier_category
                        };
                    }
                }

                if (!contract_type[contract_category]) {
                    contract_type[contract_category] = {};
                }

                var type = current_obj.contract_type;
                if (!getPropertyValue(contract_type[contract_category], type)) {
                    contract_type[contract_category][type] = localize(current_obj.contract_display);
                }
            }
        });

        if (_form && barrier_category) {
            if (_barriers && _barriers[_form] && _barriers[_form].barrier_category !== barrier_category) {
                _barriers = {};
            }
        }
    };

    var getContractForms = function getContractForms() {
        var contracts = Contract.contracts().contracts_for;
        var trade_contract_forms = {};

        if (!contracts) return null;

        contracts.available.forEach(function (current_obj) {
            var contract_category = current_obj.contract_category;
            if (contract_category && !getPropertyValue(trade_contract_forms, contract_category)) {
                if (contract_category === 'callput') {
                    if (current_obj.barrier_category === 'euro_atm') {
                        trade_contract_forms.risefall = localize('Rise/Fall');
                    } else {
                        trade_contract_forms.higherlower = localize('Higher/Lower');
                    }
                } else {
                    trade_contract_forms[contract_category] = localize(current_obj.contract_category_display);
                    if (contract_category === 'digits') {
                        trade_contract_forms.matchdiff = localize('Matches/Differs');
                        if (getLanguage() !== 'ID') {
                            trade_contract_forms.evenodd = localize('Even/Odd');
                            trade_contract_forms.overunder = localize('Over/Under');
                        }
                    } else if (contract_category === 'lookback') {
                        trade_contract_forms.lookbackhigh = localize('High-Close');
                        trade_contract_forms.lookbacklow = localize('Close-Low');
                        trade_contract_forms.lookbackhighlow = localize('High-Low');
                    }
                }
            }
        });

        if (isEmptyObject(trade_contract_forms)) return null;

        if (trade_contract_forms.risefall || trade_contract_forms.higherlower) {
            trade_contract_forms.updown = localize('Up/Down');
        }

        if (trade_contract_forms.endsinout || trade_contract_forms.staysinout) {
            trade_contract_forms.inout = localize('In/Out');
        }

        return trade_contract_forms;
    };

    return {
        details: details,
        contractForms: getContractForms,
        open: function open() {
            return _open;
        },
        close: function close() {
            return _close;
        },
        contracts: function contracts() {
            return contract_details;
        },
        durations: function durations() {
            return _durations;
        },
        startDates: function startDates() {
            return start_dates;
        },
        barriers: function barriers() {
            return _barriers;
        },
        contractType: function contractType() {
            return contract_type;
        },
        form: function form() {
            return _form;
        },
        barrier: function barrier() {
            return _barrier;
        },
        setContracts: function setContracts(data) {
            contract_details = data;
        }
    };
}();

module.exports = Contract;

/***/ }),
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var getStaticHash = __webpack_require__(87).getStaticHash;
var LocalStore = __webpack_require__(6).LocalStore;
var getPropertyValue = __webpack_require__(0).getPropertyValue;
var isEmptyObject = __webpack_require__(0).isEmptyObject;

/*
 * Caches WS responses to reduce delay time and number of requests
 * Stores data in LocalStore which is the first one available in: localStorage, sessionStorage, InScriptStore
 *
 * 1. It caches only the response of those calls which determined in `config`
 * 2. It doesn't cache responses which returned error
 * 3. The value is requested by BinarySocket,
 *    if this returns a value according to the logic here, socket code take it as response
 *    but also triggers an async `send` request, to keep the cache updated for next time
 * 4. Uses client's time to set and check for expiry, as the expire durations are not so long to need a more precise one
 *    (And doesn't worth to wait for the response of time call)
 * 5. Some responses should be cached by a particular value from request (e.g. contracts_for_frxAUDJPY)
 *    so there can be more than one value for a particular call
 * 6. Clears the whole cache regardless their expire time on the following events:
 *    6.1. Client changes: login / logout / switch loginid
 *    6.2. Detect a new release (static hash changed)
 */
var SocketCache = function () {
    // keys are msg_type
    // expire: how long to keep the value (in minutes)
    // map_to: if presents, stores the response based on the value of the provided key in the echo_req
    var config = {
        payout_currencies: { expire: 10 },
        active_symbols: { expire: 10, map_to: ['product_type', 'landing_company'] },
        contracts_for: { expire: 10, map_to: ['contracts_for', 'product_type', 'currency'] }
    };

    var storage_key = 'ws_cache';

    var data_obj = {};

    var set = function set(response) {
        var msg_type = response.msg_type;

        if (!config[msg_type]) return;

        // prevent unwanted page behaviour
        // if a cached version already exists but it gives an error after being called for updating the cache
        if ((response.error || !response[msg_type]) && get(response.echo_req)) {
            clear();
            window.location.reload();
            return;
        }

        var key = makeKey(response.echo_req, msg_type);
        var expires = moment().add(config[msg_type].expire, 'm').valueOf();

        if (!data_obj.static_hash) {
            data_obj.static_hash = getStaticHash();
        }

        data_obj[key] = { value: response, expires: expires };
        LocalStore.setObject(storage_key, data_obj);
    };

    var get = function get(request, msg_type) {
        var response = void 0;

        if (isEmptyObject(data_obj)) {
            data_obj = LocalStore.getObject(storage_key);
            if (isEmptyObject(data_obj)) return undefined;
        }

        if (data_obj.static_hash !== getStaticHash()) {
            // new release
            clear();
        }

        var key = makeKey(request, msg_type);
        var response_obj = getPropertyValue(data_obj, key) || {};

        if (moment().isBefore(response_obj.expires)) {
            response = response_obj.value;
        } else {
            // remove if expired
            remove(key);
        }

        return response;
    };

    var makeKey = function makeKey(source_obj, msg_type) {
        var key = msg_type || Object.keys(source_obj).find(function (type) {
            return config[type];
        });

        if (key && !isEmptyObject(source_obj)) {
            ((config[key] || {}).map_to || []).forEach(function (map_key) {
                key += map_key ? '_' + (source_obj[map_key] || '') : '';
            });
        }

        return key;
    };

    var remove = function remove(key, should_match_all) {
        if (should_match_all) {
            Object.keys(data_obj).forEach(function (data_key) {
                if (data_key.indexOf(key) !== -1) {
                    delete data_obj[data_key];
                }
            });
        } else if (key in data_obj) {
            delete data_obj[key];
        }
        LocalStore.setObject(storage_key, data_obj);
    };

    var clear = function clear() {
        LocalStore.remove(storage_key);
        data_obj = {};
    };

    return {
        set: set,
        get: get,
        remove: remove,
        clear: clear
    };
}();

module.exports = SocketCache;

/***/ }),
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var localize = __webpack_require__(2).localize;
var getAppId = __webpack_require__(32).getAppId;

var buildOauthApps = function buildOauthApps(response) {
    if (!response || !response.oauth_apps) return {};
    var obj_oauth_apps = { 2: 'Binary.com Autoexpiry' };
    response.oauth_apps.forEach(function (app) {
        obj_oauth_apps[app.app_id] = app.name;
    });
    return obj_oauth_apps;
};

var addTooltip = function addTooltip(oauth_apps) {
    Object.keys(oauth_apps).forEach(function (key) {
        var tooltip_text = addAppIdName(key, oauth_apps[key]);
        if (tooltip_text) {
            $('.' + key).attr('data-balloon', tooltip_text);
        }
    });
};

var addAppIdName = function addAppIdName(app_id, app_name) {
    return +app_id === +getAppId() ? '' : localize('Transaction performed by [_1] (App ID: [_2])', [app_name || '', app_id]);
};

var showTooltip = function showTooltip(app_id, oauth_app_id) {
    var tooltip_text = addAppIdName(app_id, oauth_app_id);
    var tooltip_attr = tooltip_text ? 'data-balloon="' + tooltip_text + '"' : '';
    return app_id ? ' class="' + app_id + '" ' + tooltip_attr : '';
};

module.exports = {
    buildOauthApps: buildOauthApps,
    addTooltip: addTooltip,
    addAppIdName: addAppIdName,
    showTooltip: showTooltip
};

/***/ }),
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var moment = __webpack_require__(9);
var MBDefaults = __webpack_require__(28);
var Client = __webpack_require__(4);
var SocketCache = __webpack_require__(55);
var jpClient = __webpack_require__(10).jpClient;
var getLanguage = __webpack_require__(13).get;
var localize = __webpack_require__(2).localize;
var padLeft = __webpack_require__(18).padLeft;
var toTitleCase = __webpack_require__(18).toTitleCase;
var isEmptyObject = __webpack_require__(0).isEmptyObject;

/*
 * Contract object mocks the trading form we have on our website
 * It parses the contracts json we get from socket.send({contracts_for: 'R_50'})
 */
var MBContract = function () {
    var contracts_for_response = void 0,
        remaining_timeout = void 0,
        current_time_left = void 0,
        $period = void 0,
        $durations = void 0,
        $duration = void 0,
        $count_down_timer = void 0;

    var hidden_class = 'invisible';

    var duration_map = {
        m: 'minute',
        h: 'h',
        d: 'day',
        W: 'week',
        M: 'month',
        Y: 'year'
    };

    var durationText = function durationText(duration, is_jp_client) {
        var dur = duration;
        if (dur && is_jp_client) {
            dur = dur.replace(/([a-z])/, '$1<br>');
            Object.keys(duration_map).forEach(function (key) {
                dur = dur.replace(key, localize(duration_map[key] + (+dur[0] === 1 || /h/.test(key) ? '' : 's')));
            });
        }
        return dur.toUpperCase();
    };

    var periodText = function periodText(trading_period, is_jp_client) {
        var date_start = void 0,
            date_expiry = void 0,
            duration = void 0;
        if ((typeof trading_period === 'undefined' ? 'undefined' : _typeof(trading_period)) === 'object') {
            date_start = trading_period.date_start.epoch;
            date_expiry = trading_period.date_expiry.epoch;
            duration = trading_period.duration;
        } else {
            date_start = trading_period.split('_')[0];
            date_expiry = trading_period.split('_')[1];
            duration = trading_period.split('_')[2];
        }
        duration = duration ? duration.replace('0d', '1d') : '';

        var toDate = function toDate(date) {
            var text_value = moment.utc(date * 1000).utcOffset(jpClient() ? '+09:00' : '+00:00').locale(getLanguage().toLowerCase()).format('MMM Do, HH:mm');
            if (jpClient()) {
                text_value = text_value.replace(/08:59/, '09:00«');
            }
            return text_value;
        };
        return {
            start: toDate(date_start),
            end: toDate(date_expiry),
            duration: durationText(duration, is_jp_client)
        };
    };

    var populatePeriods = function populatePeriods(should_rebuild) {
        if (!contracts_for_response || isEmptyObject(contracts_for_response)) return;
        var trading_period = void 0,
            start_end = void 0;
        var trading_period_array = [];
        var available_contracts = contracts_for_response.contracts_for.available;
        var selected_option = MBDefaults.get('category');
        $period = $('#period');
        if (!selected_option || !available_contracts) return;
        for (var i = 0; i < available_contracts.length; i++) {
            if (available_contracts[i].contract_category === selected_option) {
                trading_period = available_contracts[i].trading_period;
                if (!trading_period) return;
                start_end = [trading_period.date_start.epoch, trading_period.date_expiry.epoch, trading_period.duration].join('_');
                if (trading_period_array.indexOf(start_end) < 0) {
                    trading_period_array.push(start_end);
                }
            }
        }
        trading_period_array.sort(sortByExpiryTime);
        var $list = $period.find('.list');
        if (should_rebuild) {
            $list.empty();
        }
        var is_jp_client = jpClient();

        var duration_class = 'gr-3 gr-no-gutter';
        var end_time_class = is_jp_client ? 'gr-6 gr-5-m' : 'gr-6';
        var remain_time_class = is_jp_client ? 'gr-3 gr-4-m gr-no-gutter' : 'gr-6';
        var makeItem = function makeItem(period) {
            var text = periodText(period, is_jp_client);

            var $div_period = $('<div/>', { value: period, class: 'gr-row' });

            var $div_end_time = $('<div/>', { class: 'end ' + end_time_class, text: text.end });
            var $div_remain_time = $('<div/>', { class: 'remaining-time ' + remain_time_class });

            if (is_jp_client) {
                var $div_duration = $('<div/>', { class: 'duration ' + duration_class, html: text.duration });
                $div_period.append($div_duration);
            }

            $div_period.append($div_end_time).append($div_remain_time);

            return $div_period;
        };
        if ($list.children().length === 0) {
            // populate for the first time
            var default_value = MBDefaults.get('period');
            if (trading_period_array.indexOf(default_value) === -1) default_value = '';
            trading_period_array.forEach(function (period, idx) {
                var is_current = !default_value && idx === 0 || period === default_value;
                var $current = makeItem(period);
                $list.append($current);
                if (is_current) {
                    if (!is_jp_client) {
                        var $head_end_time = $('<div/>', { class: 'head ' + end_time_class, text: localize('End Time') });
                        var $head_remain_time = $('<div/>', { class: 'head ' + remain_time_class, text: localize('Remaining Time') });

                        $current.prepend($('<div/>').append($head_end_time).append($head_remain_time).html());
                    }

                    setCurrentItem($period, period);
                }
            });
            MBDefaults.set('period', $period.attr('value'));
            displayRemainingTime(true, is_jp_client);
        } else {
            // update options
            var existing_array = [];
            var missing_array = [];
            $list.find('> div').each(function () {
                existing_array.push($(this).val());
            });

            // add new periods to dropdown
            trading_period_array.forEach(function (period) {
                if (existing_array.indexOf(period) < 0) {
                    missing_array.push(period);
                }
            });
            if (missing_array.length > 0) {
                var $new_item = void 0;
                existing_array = existing_array.concat(missing_array).sort(sortByExpiryTime);
                existing_array.forEach(function (existing, idx) {
                    if ($list.find('[value="' + existing + '"]').length < 1) {
                        $new_item = makeItem(existing);
                        if (idx < 1) {
                            $($new_item).insertBefore($list.children().eq(idx));
                        } else {
                            $($new_item).insertAfter($list.children().eq(idx - 1));
                        }
                    }
                });
            }

            // remove periods that no longer exist
            existing_array.forEach(function (period) {
                if (trading_period_array.indexOf(period) < 0) {
                    $list.find('[value="' + period + '"]').remove();
                }
            });
        }
    };

    var displayRemainingTime = function displayRemainingTime(recalculate, is_jp_client) {
        if (typeof $durations === 'undefined' || recalculate) {
            // period_value = MBDefaults.get('period');
            $period = $('#period');
            $durations = $period.find('.list > div, .current > div');
        }
        if (!$durations) return;
        $durations.each(function (idx) {
            $duration = $($durations[idx]);
            $count_down_timer = $duration.find('.remaining-time');

            var time_left = parseInt($duration.attr('value').split('_')[1]) - window.time.unix();
            if (time_left <= 0) {
                // clear the expired contracts_for response
                SocketCache.remove('contracts_for', 1);
                location.reload();
            } else if (time_left < 120) {
                $count_down_timer.addClass('alert');
            }
            var remaining_month_day_string = [];
            var remaining_time_string = [];

            var duration = moment.duration(time_left * 1000);

            var all_durations = {
                month: duration.months(),
                day: duration.days(),
                hour: duration.hours(),
                minute: duration.minutes(),
                second: duration.seconds()
            };

            var duration_unit_to_show = void 0;
            Object.keys(all_durations).forEach(function (key) {
                if (/month|day/.test(key)) {
                    if (all_durations[key]) {
                        if (is_jp_client) {
                            duration_unit_to_show = key[0];
                            remaining_month_day_string.push(all_durations[key] + localize(toTitleCase(duration_unit_to_show)));
                        } else {
                            duration_unit_to_show = all_durations[key] === 1 ? key : key + 's';
                            remaining_month_day_string.push(all_durations[key] + ' ' + localize(toTitleCase(duration_unit_to_show)));
                        }
                    }
                } else {
                    remaining_time_string.push(padLeft(all_durations[key] || 0, 2, '0'));
                }
            });

            $count_down_timer.text(remaining_month_day_string.join(is_jp_client ? '' : ' ') + ' ' + remaining_time_string.join(':'));
        });
        current_time_left = parseInt($period.attr('value').split('_')[1]) - window.time.unix();
        if (current_time_left < 120) {
            // make all price buttons inactive if less than 2 minutes remaining
            $('.price-button').addClass('inactive');
        }
        if (remaining_timeout) clearRemainingTimeout();
        remaining_timeout = setTimeout(function () {
            displayRemainingTime(false, is_jp_client);
        }, 500);
    };

    var clearRemainingTimeout = function clearRemainingTimeout() {
        clearTimeout(remaining_timeout);
    };

    var sortByExpiryTime = function sortByExpiryTime(first, second) {
        var a = first.split('_');
        var b = second.split('_');

        var duration1 = a[1] - a[0];
        var duration2 = b[1] - b[0];

        return a[1] === b[1] ? duration1 - duration2 : a[1] - b[1];
    };

    var categories = [{ value: 'callput', type1: 'PUT', type2: 'CALLE' }, { value: 'touchnotouch', type1: 'ONETOUCH', type2: 'NOTOUCH' }, { value: 'endsinout', type1: 'EXPIRYRANGEE', type2: 'EXPIRYMISS' }, { value: 'staysinout', type1: 'RANGE', type2: 'UPORDOWN' }];

    var populateOptions = function populateOptions(should_rebuild) {
        if (!contracts_for_response || isEmptyObject(contracts_for_response)) return;
        var available_contracts = contracts_for_response.contracts_for.available;

        var $category = $('#category');
        var $list = $category.find('.list');
        if (should_rebuild) {
            $list.empty();
        }
        if ($list.children().length === 0) {
            var default_value = MBDefaults.get('category');
            categories.forEach(function (category, idx) {
                if (available_contracts.find(function (contract) {
                    return contract.contract_category === category.value;
                })) {
                    var is_current = !default_value && idx === 0 || category.value === default_value;
                    var el_contract_type = void 0;
                    if (jpClient()) {
                        el_contract_type = '<span class="contract-type gr-6 ' + category.type1 + '"><span>' + localize(getTemplate(category.type1).name) + '</span></span>\n                             <span class="contract-type gr-6 ' + category.type2 + ' negative-color"><span>' + localize(getTemplate(category.type2).name) + '</span></span>';
                    } else {
                        el_contract_type = '<div class="category-wrapper"><div class="contract-type ' + category.type1 + '" /><div>' + localize(getTemplate(category.type1).name) + '</div></div>\n                             <div class="category-wrapper"><div class="contract-type ' + category.type2 + ' negative-color" /><div>' + localize(getTemplate(category.type2).name) + '</div></div>';
                    }
                    var $current = $('<div/>', {
                        value: category.value,
                        html: el_contract_type,
                        class: 'gr-row'
                    });
                    $list.append($current);
                    if (is_current) {
                        setCurrentItem($category, category.value);
                    }
                }
            });
            MBDefaults.set('category', $category.attr('value'));
        }
        populatePeriods(should_rebuild);
    };

    var getCurrentContracts = function getCurrentContracts() {
        if (!contracts_for_response || isEmptyObject(contracts_for_response)) return [];
        var contracts = [];
        var category = MBDefaults.get('category');
        var periods = MBDefaults.get('period').split('_');
        contracts_for_response.contracts_for.available.forEach(function (c) {
            if (c.contract_category === category && c.trading_period && +c.trading_period.date_start.epoch === +periods[0] && +c.trading_period.date_expiry.epoch === +periods[1]) {
                contracts.push(c);
            }
        });
        return contracts;
    };

    var getTemplate = function getTemplate(contract_type) {
        var templates = {
            PUT: {
                opposite: 'CALLE',
                order: 0,
                name: 'Lower',
                description: '[_1] [_2] payout if [_3] is strictly lower than Barrier at close on [_4].'
            },
            CALLE: {
                opposite: 'PUT',
                order: 1,
                name: 'Higher',
                description: '[_1] [_2] payout if [_3] is strictly higher than or equal to Barrier at close on [_4].'
            },
            ONETOUCH: {
                opposite: 'NOTOUCH',
                order: 0,
                name: 'Touches',
                description: '[_1] [_2] payout if [_3] touches Barrier through close on [_4].'
            },
            NOTOUCH: {
                opposite: 'ONETOUCH',
                order: 1,
                name: 'Does Not Touch',
                description: '[_1] [_2] payout if [_3] does not touch Barrier through close on [_4].'
            },
            EXPIRYRANGEE: {
                opposite: 'EXPIRYMISS',
                order: 0,
                name: 'Ends Between',
                description: '[_1] [_2] payout if [_3] ends on or between low and high values of Barrier at close on [_4].'
            },
            EXPIRYMISS: {
                opposite: 'EXPIRYRANGEE',
                order: 1,
                name: 'Ends Outside',
                description: '[_1] [_2] payout if [_3] ends outside low and high values of Barrier at close on [_4].'
            },
            RANGE: {
                opposite: 'UPORDOWN',
                order: 0,
                name: 'Stays Between',
                description: '[_1] [_2] payout if [_3] stays between low and high values of Barrier through close on [_4].'
            },
            UPORDOWN: {
                opposite: 'RANGE',
                order: 1,
                name: 'Goes Outside',
                description: '[_1] [_2] payout if [_3] goes outside of low and high values of Barrier through close on [_4].'
            }
        };
        return contract_type ? templates[contract_type] : templates;
    };

    var getCurrency = function getCurrency() {
        return Client.get('currency') || $('#currency').attr('value') || 'JPY';
    };

    var setCurrentItem = function setCurrentItem($container, value, is_underlying) {
        var $selected = $container.find('.list [value="' + value + '"]');
        if ($selected.length) {
            if (is_underlying) {
                $container.attr('value', value).find('> .current').find('img').attr('src', $selected.find('img').attr('src')).end().find('.name').text($selected.text());
            } else {
                $container.attr('value', value).find('> .current').html($selected.clone());
            }

            $container.find('.list .' + hidden_class).removeClass(hidden_class);
            $selected.addClass(hidden_class);
        }
    };

    return {
        populatePeriods: populatePeriods,
        populateOptions: populateOptions,
        displayRemainingTime: displayRemainingTime,
        getCurrentContracts: getCurrentContracts,
        getTemplate: getTemplate,
        getCurrency: getCurrency,
        setCurrentItem: setCurrentItem,
        getRemainingTime: function getRemainingTime() {
            return current_time_left;
        },
        getContractsResponse: function getContractsResponse() {
            return contracts_for_response;
        },
        setContractsResponse: function setContractsResponse(contracts_for) {
            contracts_for_response = contracts_for;
        },
        onUnload: function onUnload() {
            clearRemainingTimeout();contracts_for_response = {};$durations = undefined;
        }
    };
}();

module.exports = MBContract;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ActiveSymbols = __webpack_require__(88);

/*
 * Symbols object parses the active_symbols json that we get from socket.send({active_symbols: 'brief'}
 * and outputs in usable form, it gives markets, underlyings
 *
 *
 * Usage:
 *
 * use `Symbols.details` to populate this object first
 *
 * then use
 *
 * `Symbols.markets` to get markets like Forex, Random etc
 * `Symbols.underlyings` to get underlyings
 *
 */

var Symbols = function () {
    var trade_markets = {};
    var trade_markets_list = {};
    var trade_underlyings = {};
    var names = {};

    var details = function details(data) {
        var all_symbols = data.active_symbols;
        trade_markets = ActiveSymbols.getMarkets(all_symbols);
        trade_markets_list = ActiveSymbols.getMarketsList(all_symbols);
        trade_underlyings = ActiveSymbols.getTradeUnderlyings(all_symbols);
        names = ActiveSymbols.getSymbolNames(all_symbols);
    };

    return {
        details: details,
        markets: function markets(list) {
            return list ? trade_markets_list : trade_markets;
        },
        getName: function getName(symbol) {
            return names[symbol];
        },
        underlyings: function underlyings() {
            return trade_underlyings;
        },
        getAllSymbols: function getAllSymbols() {
            return names;
        }
    };
}();

module.exports = Symbols;

/***/ }),
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var Tick = __webpack_require__(36);
var updatePurchaseStatus = __webpack_require__(73).updatePurchaseStatus;
var ViewPopupUI = __webpack_require__(75);
var BinarySocket = __webpack_require__(5);
var CommonFunctions = __webpack_require__(3);
var localize = __webpack_require__(2).localize;

var TickDisplay = function () {
    var number_of_ticks = void 0,
        display_symbol = void 0,
        contract_start_ms = void 0,
        contract_category = void 0,
        set_barrier = void 0,
        barrier = void 0,
        abs_barrier = void 0,
        display_decimals = void 0,
        show_contract_result = void 0,
        contract_sentiment = void 0,
        price = void 0,
        payout = void 0,
        ticks_needed = void 0,
        x_indicators = void 0,
        chart = void 0,
        Highcharts = void 0,
        applicable_ticks = void 0,
        contract_barrier = void 0,
        contract_start_moment = void 0,
        counter = void 0,
        spots_list = void 0,
        tick_underlying = void 0,
        tick_count = void 0,
        tick_longcode = void 0,
        tick_display_name = void 0,
        tick_date_start = void 0,
        absolute_barrier = void 0,
        tick_shortcode = void 0,
        tick_init = void 0,
        subscribe = void 0,
        responseID = void 0;

    var initialize = function initialize(data, options) {
        // setting up globals
        number_of_ticks = parseInt(data.number_of_ticks);
        display_symbol = data.display_symbol;
        contract_start_ms = parseInt(data.contract_start) * 1000;
        contract_category = data.contract_category;
        set_barrier = !contract_category.match('digits');
        barrier = data.barrier;
        abs_barrier = data.abs_barrier;
        display_decimals = data.display_decimals || 2;
        show_contract_result = data.show_contract_result;

        if (data.show_contract_result) {
            contract_sentiment = data.contract_sentiment;
            price = parseFloat(data.price);
            payout = parseFloat(data.payout);
        }

        var minimize = data.show_contract_result;
        var end_time = parseInt(data.contract_start) + parseInt((number_of_ticks + 2) * 5);

        setXIndicators();
        CommonFunctions.requireHighstock(function (Highstock) {
            Highcharts = Highstock;
            initializeChart({
                minimize: minimize,
                plot_from: data.previous_tick_epoch * 1000,
                plot_to: new Date(end_time * 1000).getTime(),
                width: data.width ? data.width : undefined
            }, options);
        });
    };

    var setXIndicators = function setXIndicators() {
        var exit_tick_index = number_of_ticks - 1;
        if (contract_category.match('asian')) {
            ticks_needed = number_of_ticks;
            x_indicators = {
                _0: { label: 'Entry Spot', id: 'start_tick' }
            };
            x_indicators['_' + exit_tick_index] = {
                label: 'Exit Spot',
                id: 'exit_tick'
            };
        } else if (contract_category.match('callput')) {
            ticks_needed = number_of_ticks + 1;
            x_indicators = {
                _0: { label: 'Entry Spot', id: 'entry_tick' }
            };
            x_indicators['_' + number_of_ticks] = {
                label: 'Exit Spot',
                id: 'exit_tick'
            };
        } else if (contract_category.match('digits')) {
            ticks_needed = number_of_ticks;
            x_indicators = {
                _0: { label: 'Tick 1', id: 'start_tick' }
            };
            x_indicators['_' + exit_tick_index] = {
                label: 'Tick ' + number_of_ticks,
                id: 'last_tick'
            };
        } else {
            x_indicators = {};
        }
    };

    var initializeChart = function initializeChart(config, data) {
        chart = new Highcharts.Chart({
            chart: {
                type: 'line',
                renderTo: 'tick_chart',
                width: config.width || (config.minimize ? 394 : null),
                height: config.minimize ? 143 : null,
                backgroundColor: null,
                events: { load: plot(config.plot_from, config.plot_to) },
                marginLeft: 50
            },
            credits: { enabled: false },
            tooltip: {
                formatter: function formatter() {
                    var new_y = this.y.toFixed(display_decimals);
                    var mom = moment.utc(applicable_ticks[this.x].epoch * 1000).format('dddd, MMM D, HH:mm:ss');
                    return mom + '<br/>' + display_symbol + ' ' + new_y;
                }
            },
            xAxis: {
                type: 'linear',
                min: 0,
                max: number_of_ticks + 1,
                labels: { enabled: false }
            },
            yAxis: {
                opposite: false,
                labels: {
                    align: 'left',
                    x: 0
                },
                title: ''
            },
            series: [{
                data: []
            }],
            title: '',
            exporting: { enabled: false, enableImages: false },
            legend: { enabled: false }
        });
        Highcharts.setOptions({
            lang: { thousandsSep: ',' }
        });
        if (data) {
            dispatch(data);
        }
    };

    var applyChartBackgroundColor = function applyChartBackgroundColor(tick) {
        if (!show_contract_result) {
            return;
        }
        var chart_container = $('#tick_chart');
        if (contract_sentiment === 'up') {
            if (tick.quote > contract_barrier) {
                chart_container.css('background-color', 'rgba(46,136,54,0.198039)');
            } else {
                chart_container.css('background-color', 'rgba(204,0,0,0.098039)');
            }
        } else if (contract_sentiment === 'down') {
            if (tick.quote < contract_barrier) {
                chart_container.css('background-color', 'rgba(46,136,54,0.198039)');
            } else {
                chart_container.css('background-color', 'rgba(204,0,0,0.098039)');
            }
        }
    };

    var addBarrier = function addBarrier() {
        if (!set_barrier) {
            return;
        }

        var barrier_type = contract_category.match('asian') ? 'asian' : 'static';

        if (barrier_type === 'static') {
            var barrier_tick = applicable_ticks[0];

            if (barrier) {
                var final_barrier = barrier_tick.quote + parseFloat(barrier);
                // sometimes due to rounding issues, result is 1.009999 while it should
                // be 1.01
                final_barrier = Number(Math.round(final_barrier + 'e' + display_decimals) + 'e-' + display_decimals);

                barrier_tick.quote = final_barrier;
            } else if (abs_barrier) {
                barrier_tick.quote = parseFloat(abs_barrier);
            }

            chart.yAxis[0].addPlotLine({
                id: 'tick-barrier',
                value: barrier_tick.quote,
                label: { text: 'Barrier (' + barrier_tick.quote + ')', align: 'center' },
                color: 'green',
                width: 2,
                zIndex: 2
            });
            contract_barrier = barrier_tick.quote;
            set_barrier = false;
        }

        if (barrier_type === 'asian') {
            var total = 0;
            for (var i = 0; i < applicable_ticks.length; i++) {
                total += parseFloat(applicable_ticks[i].quote);
            }
            // round calculated barrier
            var calc_barrier = (total / applicable_ticks.length).toFixed(parseInt(display_decimals) + 1);

            chart.yAxis[0].removePlotLine('tick-barrier');
            chart.yAxis[0].addPlotLine({
                id: 'tick-barrier',
                value: calc_barrier,
                color: 'green',
                label: {
                    text: 'Average (' + calc_barrier + ')',
                    align: 'center'
                },
                width: 2,
                zIndex: 2
            });
            contract_barrier = calc_barrier;
        }
        if (contract_barrier) {
            CommonFunctions.elementInnerHtml(CommonFunctions.getElementById('contract_purchase_barrier'), localize('Barrier') + ': ' + contract_barrier);
        }
    };

    var add = function add(indicator) {
        chart.xAxis[0].addPlotLine({
            value: indicator.index,
            id: indicator.id,
            label: { text: indicator.label, x: /start_tick|entry_tick/.test(indicator.id) ? -15 : 5 },
            color: '#e98024',
            width: 2,
            zIndex: 2
        });
    };

    var evaluateContractOutcome = function evaluateContractOutcome() {
        if (!contract_barrier) {
            return; // can't do anything without barrier
        }

        var exit_tick_index = applicable_ticks.length - 1;
        var exit_spot = applicable_ticks[exit_tick_index].quote;

        if (contract_sentiment === 'up') {
            if (exit_spot > contract_barrier) {
                win();
            } else {
                lose();
            }
        } else if (contract_sentiment === 'down') {
            if (exit_spot < contract_barrier) {
                win();
            } else {
                lose();
            }
        }
    };

    var win = function win() {
        updatePurchaseStatus(payout, price, localize('This contract won'));
    };

    var lose = function lose() {
        updatePurchaseStatus(0, -price, localize('This contract lost'));
    };

    var plot = function plot() {
        contract_start_moment = moment(contract_start_ms).utc();
        counter = 0;
        applicable_ticks = [];
    };

    var dispatch = function dispatch(data) {
        var tick_chart = CommonFunctions.getElementById('tick_chart');

        if (!CommonFunctions.isVisible(tick_chart) || !data || !data.tick && !data.history) {
            return;
        }

        if (subscribe && data.tick && document.getElementById('sell_content_wrapper')) {
            responseID = data.tick.id;
            ViewPopupUI.storeSubscriptionID(responseID);
        }

        var epoches = void 0,
            spots2 = void 0,
            chart_display_decimals = void 0;
        if (document.getElementById('sell_content_wrapper')) {
            if (data.tick) {
                Tick.details(data);
                if (!chart_display_decimals) {
                    chart_display_decimals = data.tick.quote.split('.')[1].length || 2;
                }
            } else if (data.history) {
                if (!chart_display_decimals) {
                    chart_display_decimals = data.history.prices[0].split('.')[1].length || 2;
                }
            }
            if (!tick_init) {
                var category = 'callput';
                if (/asian/i.test(tick_shortcode)) {
                    category = 'asian';
                } else if (/digit/i.test(tick_shortcode)) {
                    category = 'digits';
                }
                initialize({
                    symbol: tick_underlying,
                    number_of_ticks: tick_count,
                    contract_category: category,
                    longcode: tick_longcode,
                    display_symbol: tick_display_name,
                    contract_start: tick_date_start,
                    abs_barrier: absolute_barrier,
                    display_decimals: chart_display_decimals,
                    show_contract_result: 0
                }, data);
                spots_list = {};
                tick_init = 'initialized';
                return;
            }
        }
        if (data.tick) {
            spots2 = Tick.spots();
            epoches = Object.keys(spots2).sort(function (a, b) {
                return a - b;
            });
        } else if (data.history) {
            epoches = data.history.times;
        }

        if (applicable_ticks && ticks_needed && applicable_ticks.length >= ticks_needed) {
            evaluateContractOutcome();
            if (responseID) {
                BinarySocket.send({ forget: responseID });
            }
        } else {
            for (var d = 0; d < epoches.length; d++) {
                var tick = void 0;
                if (data.tick) {
                    tick = {
                        epoch: parseInt(epoches[d]),
                        quote: parseFloat(spots2[epoches[d]])
                    };
                } else if (data.history) {
                    tick = {
                        epoch: parseInt(data.history.times[d]),
                        quote: parseFloat(data.history.prices[d])
                    };
                }

                if (contract_start_moment && tick.epoch > contract_start_moment.unix() && !spots_list[tick.epoch]) {
                    if (!chart || !chart.series) return;
                    chart.series[0].addPoint([counter, tick.quote], true, false);
                    applicable_ticks.push(tick);
                    spots_list[tick.epoch] = tick.quote;
                    var indicator_key = '_' + counter;
                    if (typeof x_indicators[indicator_key] !== 'undefined') {
                        x_indicators[indicator_key].index = counter;
                        add(x_indicators[indicator_key]);
                    }

                    addBarrier();
                    applyChartBackgroundColor(tick);
                    counter++;
                }
            }
        }
    };

    var updateChart = function updateChart(data, contract) {
        subscribe = 'false';
        if (contract) {
            tick_underlying = contract.underlying;
            tick_count = contract.tick_count;
            tick_longcode = contract.longcode;
            tick_display_name = contract.display_name;
            tick_date_start = contract.date_start;
            absolute_barrier = contract.barrier;
            tick_shortcode = contract.shortcode;
            tick_init = '';
            var request = {
                ticks_history: contract.underlying,
                start: contract.date_start,
                end: 'latest'
            };
            if (contract.current_spot_time < contract.date_expiry) {
                request.subscribe = 1;
                subscribe = 'true';
            } else {
                request.end = contract.date_expiry;
            }
            BinarySocket.send(request, { callback: dispatch });
        } else {
            dispatch(data);
        }
    };

    return {
        updateChart: updateChart,
        init: initialize,
        resetSpots: function resetSpots() {
            spots_list = {};
        }
    };
}();

module.exports = TickDisplay;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Client = __webpack_require__(4);
var formatMoney = __webpack_require__(7).formatMoney;
var localize = __webpack_require__(2).localize;

var updatePurchaseStatus = function updatePurchaseStatus(final_price, pnl, contract_status) {
    $('#contract_purchase_heading').text(localize(contract_status));
    var $payout = $('#contract_purchase_payout');
    var $cost = $('#contract_purchase_cost');
    var $profit = $('#contract_purchase_profit');
    var currency = Client.get('currency');

    $payout.html($('<div/>', { text: localize('Buy price') }).append($('<p/>', { html: formatMoney(currency, Math.abs(pnl)) })));
    $cost.html($('<div/>', { text: localize('Final price') }).append($('<p/>', { html: formatMoney(currency, final_price) })));
    if (!final_price) {
        $profit.html($('<div/>', { text: localize('Loss') }).append($('<p/>', { html: formatMoney(currency, pnl) })));
    } else {
        $profit.html($('<div/>', { text: localize('Profit') }).append($('<p/>', { html: formatMoney(currency, final_price - pnl) })));
        updateContractBalance(Client.get('balance'));
    }
};

var updateContractBalance = function updateContractBalance(balance) {
    $('#contract_purchase_balance').html(localize('Account balance:') + ' ' + formatMoney(Client.get('currency'), balance));
};

module.exports = {
    updatePurchaseStatus: updatePurchaseStatus,
    updateContractBalance: updateContractBalance
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var moment = __webpack_require__(9);
var ViewPopupUI = __webpack_require__(75);
var Highchart = __webpack_require__(158);
var getLookbackFormula = __webpack_require__(29).getFormula;
var getLBBarrierLabel = __webpack_require__(29).getBarrierLabel;
var isLookback = __webpack_require__(29).isLookback;
var TickDisplay = __webpack_require__(72);
var setViewPopupTimer = __webpack_require__(20).setViewPopupTimer;
var showLocalTimeOnHover = __webpack_require__(20).showLocalTimeOnHover;
var toJapanTimeIfNeeded = __webpack_require__(20).toJapanTimeIfNeeded;
var BinarySocket = __webpack_require__(5);
var jpClient = __webpack_require__(10).jpClient;
var getElementById = __webpack_require__(3).getElementById;
var localize = __webpack_require__(2).localize;
var State = __webpack_require__(6).State;
var urlFor = __webpack_require__(8).urlFor;
var createElement = __webpack_require__(0).createElement;
var getPropertyValue = __webpack_require__(0).getPropertyValue;
var isEmptyObject = __webpack_require__(0).isEmptyObject;

var ViewPopup = function () {
    var contract_id = void 0,
        contract = void 0,
        is_sold = void 0,
        is_sell_clicked = void 0,
        chart_started = void 0,
        chart_init = void 0,
        chart_updated = void 0,
        sell_text_updated = void 0,
        btn_view = void 0,
        multiplier = void 0,
        $container = void 0,
        $loading = void 0;

    var popupbox_id = 'inpage_popup_content_box';
    var wrapper_id = 'sell_content_wrapper';
    var hidden_class = 'invisible';

    var init = function init(button) {
        btn_view = button;
        contract_id = $(btn_view).attr('contract_id');
        contract = {};
        is_sold = false;
        is_sell_clicked = false;
        chart_started = false;
        chart_init = false;
        chart_updated = false;
        sell_text_updated = false;
        $container = '';

        if (btn_view) {
            ViewPopupUI.disableButton($(btn_view));
            ViewPopupUI.cleanup();
        }

        getContract();

        setLoadingState(true);
    };

    var responseContract = function responseContract(response) {
        if (!response.proposal_open_contract || isEmptyObject(response.proposal_open_contract)) {
            showErrorPopup(response);
            return;
        }
        // In case of error such as legacy shortcode, this call is returning the error message
        // but no error field. To specify those cases, we check for other fields existence
        if (!getPropertyValue(response, ['proposal_open_contract', 'shortcode'])) {
            showErrorPopup(response, response.proposal_open_contract.validation_error);
            return;
        }

        $.extend(contract, response.proposal_open_contract);
        // Lookback multiplier value
        multiplier = contract.multiplier;

        if (contract && document.getElementById(wrapper_id)) {
            update();
            return;
        }

        showContract();
    };

    var showContract = function showContract() {
        setLoadingState(false);

        if (!$container) {
            $container = makeTemplate();
        }

        var contract_type_display = {
            ASIANU: 'Asian Up',
            ASIAND: 'Asian Down',
            CALL: 'Higher',
            CALLE: 'Higher or equal',
            PUT: 'Lower',
            DIGITMATCH: 'Digit Matches',
            DIGITDIFF: 'Digit Differs',
            DIGITODD: 'Digit Odd',
            DIGITEVEN: 'Digit Even',
            DIGITOVER: 'Digit Over',
            DIGITUNDER: 'Digit Under',
            EXPIRYMISS: 'Ends Outside',
            EXPIRYRANGE: 'Ends Between',
            EXPIRYRANGEE: 'Ends Between',
            LBFLOATCALL: 'Close-Low',
            LBFLOATPUT: 'High-Close',
            LBHIGHLOW: 'High-Low',
            RANGE: 'Stays Between',
            UPORDOWN: 'Goes Outside',
            ONETOUCH: 'Touches',
            NOTOUCH: 'Does Not Touch'
        };

        containerSetText('trade_details_contract_type', localize(contract_type_display[contract.contract_type]));
        containerSetText('trade_details_contract_id', contract.contract_id);
        containerSetText('trade_details_start_date', epochToDateTime(contract.date_start));
        containerSetText('trade_details_end_date', epochToDateTime(contract.date_expiry));
        containerSetText('trade_details_payout', formatMoney(contract.currency, contract.payout));
        containerSetText('trade_details_purchase_price', formatMoney(contract.currency, contract.buy_price));
        containerSetText('trade_details_multiplier', formatMoney(contract.currency, multiplier, false, 3, 2));
        if (isLookback(contract.contract_type)) {
            containerSetText('trade_details_payout', getLookbackFormula(contract.contract_type, formatMoney(contract.currency, multiplier, false, 3, 2)));
        } else {
            containerSetText('trade_details_payout', formatMoney(contract.currency, contract.payout));
        }
        setViewPopupTimer(updateTimers);
        update();
        ViewPopupUI.repositionConfirmation();

        if (State.get('is_mb_trading')) {
            State.call('ViewPopup.onDisplayed');
        }
    };

    var update = function update() {
        var final_price = contract.sell_price || contract.bid_price;
        var is_started = !contract.is_forward_starting || contract.current_spot_time > contract.date_start;
        var user_sold = contract.sell_time && contract.sell_time < contract.date_expiry;
        var is_ended = contract.is_settleable || contract.is_sold || user_sold;
        var indicative_price = final_price && is_ended ? final_price : contract.bid_price || null;
        var sold_before_start = contract.sell_time && contract.sell_time < contract.date_start;

        if (contract.barrier_count > 1) {
            containerSetText('trade_details_barrier', sold_before_start ? '-' : addComma(contract.high_barrier), '', true);
            containerSetText('trade_details_barrier_low', sold_before_start ? '-' : addComma(contract.low_barrier), '', true);
        } else if (contract.barrier) {
            var formatted_barrier = addComma(contract.barrier);
            var mapping = {
                DIGITMATCH: 'Equals',
                DIGITDIFF: 'Not'
            };
            var contract_text = mapping[contract.contract_type];
            var barrier_prefix = contract_text ? localize(contract_text) + ' ' : '';
            // only show entry spot if available and contract was not sold before start time
            containerSetText('trade_details_barrier', contract.entry_tick_time && sold_before_start ? '-' : barrier_prefix + formatted_barrier, '', true);
        }

        var current_spot = contract.current_spot;
        var current_spot_time = contract.current_spot_time;
        if (is_ended) {
            current_spot = user_sold ? '' : contract.exit_tick;
            current_spot_time = user_sold ? '' : contract.exit_tick_time;
        }

        if (current_spot) {
            containerSetText('trade_details_current_spot > span', addComma(current_spot));
        } else {
            $('#trade_details_current_spot').parent().setVisibility(0);
        }

        if (current_spot_time) {
            if (window.time && current_spot_time > window.time.unix()) {
                window.time = moment(current_spot_time).utc();
                updateTimers();
            }
            containerSetText('trade_details_current_date', epochToDateTime(current_spot_time));
        } else {
            $('#trade_details_current_date').parent().setVisibility(0);
        }

        containerSetText('trade_details_ref_id', contract.transaction_ids.buy + ' (' + localize('Buy') + ') ' + (contract.transaction_ids.sell ? '<br>' + contract.transaction_ids.sell + ' (' + localize('Sell') + ')' : ''));
        containerSetText('trade_details_indicative_price', indicative_price ? formatMoney(contract.currency, indicative_price) : '-');

        var profit_loss = void 0,
            percentage = void 0;

        if (final_price) {
            profit_loss = final_price - contract.buy_price;
            percentage = addComma(profit_loss * 100 / contract.buy_price, 2);
            containerSetText('trade_details_profit_loss', formatMoney(contract.currency, profit_loss) + '<span class="percent">(' + (percentage > 0 ? '+' : '') + percentage + '%)</span>', { class: profit_loss >= 0 ? 'profit' : 'loss' });
        } else {
            containerSetText('trade_details_profit_loss', '-', { class: 'loss' });
        }

        if (!is_started) {
            containerSetText('trade_details_entry_spot > span', '-');
            containerSetText('trade_details_message', localize('Contract has not started yet'));
        } else {
            if (contract.entry_spot > 0) {
                // only show entry spot if available and contract was not sold before start time
                containerSetText('trade_details_entry_spot > span', sold_before_start ? '-' : addComma(contract.entry_spot));
            }
            containerSetText('trade_details_message', contract.validation_error ? contract.validation_error : '&nbsp;');
        }

        if (!chart_started && !contract.tick_count) {
            if (!chart_init) {
                chart_init = true;
                Highchart.showChart(contract);
            }
            Highchart.showChart(contract, 'update');
            if (contract.entry_tick_time) {
                chart_started = true;
            }
        } else if (contract.tick_count && !chart_updated) {
            TickDisplay.updateChart('', contract);
            chart_updated = true;
        }

        if (!is_sold && user_sold) {
            is_sold = true;
            if (!contract.tick_count) Highchart.showChart(contract, 'update');
        }
        if (is_ended) {
            contractEnded(parseFloat(profit_loss) >= 0);
            if (contract.is_valid_to_sell && contract.is_settleable && !contract.is_sold && !is_sell_clicked) {
                ViewPopupUI.forgetStreams();
                BinarySocket.send({ sell_expired: 1 }).then(function (response) {
                    getContract(response);
                });
            }
            if (!contract.tick_count) Highchart.showChart(contract, 'update');
        }

        if (!contract.is_valid_to_sell) {
            $container.find('#errMsg').setVisibility(0);
        }

        sellSetVisibility(!is_sell_clicked && !is_sold && !is_ended && +contract.is_valid_to_sell === 1);
        contract.chart_validation_error = contract.validation_error;
        contract.validation_error = '';
    };

    // This is called by clock.js in order to sync time updates on header as well as view popup
    var updateTimers = function updateTimers() {
        var now = Math.max(Math.floor((window.time || 0) / 1000), contract.current_spot_time || 0);
        containerSetText('trade_details_live_date', epochToDateTime(now));
        showLocalTimeOnHover('#trade_details_live_date');

        var is_started = !contract.is_forward_starting || contract.current_spot_time > contract.date_start;
        var is_ended = contract.is_settleable || contract.is_sold;
        if (!is_started || is_ended || now >= contract.date_expiry) {
            containerSetText('trade_details_live_remaining', '-');
        } else {
            var remained = contract.date_expiry - now;
            var days = 0;
            var day_seconds = 24 * 60 * 60;
            if (remained > day_seconds) {
                days = Math.floor(remained / day_seconds);
                remained %= day_seconds;
            }
            containerSetText('trade_details_live_remaining', (days > 0 ? days + ' ' + localize(days > 1 ? 'days' : 'day') + ', ' : '') + moment(remained * 1000).utc().format('HH:mm:ss'));
        }
    };

    var contractEnded = function contractEnded() {
        containerSetText('trade_details_current_title', localize(contract.sell_spot_time < contract.date_expiry ? 'Contract Sold' : 'Contract Expiry'));

        containerSetText('trade_details_indicative_label', localize('Price'));
        if (isLookback(contract.contract_type)) {
            containerSetText('trade_details_spot_label', localize('Close'));
            containerSetText('trade_details_spottime_label', localize('Close Time'));
        } else {
            containerSetText('trade_details_spot_label', localize('Exit Spot'));
            containerSetText('trade_details_spottime_label', localize('Exit Spot Time'));
        }
        // show validation error if contract is not settled yet
        if (!(contract.is_settleable && !contract.is_sold)) {
            containerSetText('trade_details_message', '&nbsp;');
        }
        $container.find('#errMsg').setVisibility(0);
        sellSetVisibility(false);
        // showWinLossStatus(is_win);
        // don't show for japanese clients or contracts that are manually sold before starting
        if (contract.audit_details && !jpClient() && (!contract.sell_spot_time || contract.sell_spot_time > contract.date_start)) {
            initAuditTable(0);
        }
    };

    var appendAuditLink = function appendAuditLink(element_id) {
        var link = createElement('a', { href: 'javascript:;', class: 'link-audit button-secondary' });
        var span = createElement('span', { text: localize('Audit') });
        link.appendChild(span);
        link.addEventListener('click', function () {
            initAuditTable(1);
        });
        getElementById(element_id).appendChild(link);
    };

    // by default shows audit table and hides chart
    var setAuditVisibility = function setAuditVisibility() {
        var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        setAuditButtonsVisibility(!show);
        getElementById('sell_details_chart_wrapper').setVisibility(!show);
        getElementById('sell_details_audit').setVisibility(show);
        ViewPopupUI.repositionConfirmation();
    };

    var setAuditButtonsVisibility = function setAuditButtonsVisibility() {
        var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var links = document.getElementsByClassName('link-audit');
        for (var i = 0; i < links.length; i++) {
            links[i].setVisibility(show);
        }
    };

    var initAuditTable = function initAuditTable(show) {
        if (document.getElementById('sell_details_audit')) {
            if (show) {
                setAuditVisibility(1);
            } else {
                setAuditButtonsVisibility(1);
            }
            return;
        }

        var div = createElement('div', { id: 'sell_details_audit', class: 'gr-8 gr-12-m gr-no-gutter invisible' });
        var table = createElement('table', { id: 'audit_header', class: 'gr-12' });
        var tr = createElement('tr', { class: 'gr-row' });
        var th_previous = createElement('th', { class: 'gr-2 gr-3-t gr-3-p gr-3-m' });
        var link = createElement('a', { class: 'previous-wrapper' });

        link.appendChild(createElement('span', { class: 'previous align-self-center' }));
        link.appendChild(createElement('span', { class: 'nowrap', text: localize('View Chart') }));
        link.addEventListener('click', function () {
            setAuditVisibility(0);
        });
        th_previous.appendChild(link);

        tr.appendChild(th_previous);
        tr.appendChild(createElement('th', { class: 'gr-8 gr-6-t gr-6-p gr-6-m', text: localize('Audit Page') }));
        tr.appendChild(createElement('th', { class: 'gr-2 gr-3-t gr-3-p gr-3-m' }));
        table.appendChild(tr);
        div.appendChild(table);
        div.insertAfter(getElementById('sell_details_chart_wrapper'));
        populateAuditTable(show);
        showExplanation(div);
    };

    var map_contract_type = {
        'expiry': 'endsinout',
        'asian': 'asian',
        'even|odd': 'evenodd',
        'over|under': 'overunder',
        'digit': 'digits',
        'upordown|range': 'staysinout',
        'touch': 'touchnotouch',
        'call|put': function callPut() {
            return +contract.entry_tick === +contract.barrier ? 'risefall' : 'higherlower';
        }
    };

    var showExplanation = function showExplanation(div) {
        var explanation_section = 'explain_';
        Object.keys(map_contract_type).some(function (type) {
            if (new RegExp(type, 'i').test(contract.contract_type)) {
                explanation_section += typeof map_contract_type[type] === 'function' ? map_contract_type[type]() : map_contract_type[type];
                return true;
            }
            return false;
        });
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState !== 4 || this.status !== 200) {
                return;
            }
            var div_response = createElement('div', { html: this.responseText });
            var div_to_show = div_response.querySelector('#' + explanation_section);
            if (div_to_show) {
                div_to_show.classList.add('align-start', 'gr-padding-20', 'explanation-section', 'gr-parent');
                div.appendChild(div_to_show);
                div_to_show.setVisibility(1);
            }
        };
        xhttp.open('GET', urlFor('explanation'), true);
        xhttp.send();
    };

    var parseAuditResponse = function parseAuditResponse(table, array_audit_data) {
        return new Promise(function (resolve) {
            var primary_classes = ['secondary-bg-color', 'content-inverse-color'];
            var secondary_classes = ['fill-bg-color', 'secondary-time'];
            array_audit_data.forEach(function (audit_data) {
                var color = void 0;
                if (audit_data.flag === 'highlight_tick') {
                    color = primary_classes;
                } else if (audit_data.flag === 'highlight_time') {
                    color = secondary_classes;
                }
                createAuditRow(table, audit_data.epoch, audit_data.tick, audit_data.name, color);
            });
            resolve();
        });
    };

    var createAuditTable = function createAuditTable(title) {
        var div = createElement('div', { class: 'audit-table' });
        var fieldset = createElement('fieldset', { class: 'align-start' });
        var table = createElement('table', { class: 'gr-10 gr-centered gr-12-p gr-12-m' });
        fieldset.appendChild(createElement('legend', { text: localize('Contract ' + title) }));
        fieldset.appendChild(table);
        div.appendChild(fieldset);
        var insert_after = getElementById('audit_header');
        var audit_table = document.getElementsByClassName('audit-table')[0];
        if (audit_table) {
            insert_after = audit_table;
        }
        div.insertAfter(insert_after);
        return {
            table: table,
            div: div
        };
    };

    var createAuditHeader = function createAuditHeader(table) {
        var tr = createElement('tr', { class: 'gr-row' });

        tr.appendChild(createElement('td', { class: 'gr-3' }));
        tr.appendChild(createElement('td', { class: 'gr-4 no-margin secondary-color', text: localize('Spot') }));
        tr.appendChild(createElement('td', { class: 'gr-5 no-margin secondary-color', text: localize('Spot Time (GMT)') }));

        table.insertBefore(tr, table.childNodes[0]);
    };

    var createAuditRow = function createAuditRow(table, date, tick, remark, td_class) {
        // if we have already added this timestamp in first table, skip adding it again to second table
        // unless it is a highlighted tick like entry or exit spot, or start or end time
        if (document.querySelector('.audit-dates[data-value=\'' + date + '\']') && !remark) {
            return;
        }

        var tr = createElement('tr', { class: 'gr-row' });
        var td_remark = createElement('td', { class: 'gr-3 remark', text: remark || '' });
        var td_tick = createElement('td', { class: 'gr-4', text: tick && !isNaN(tick) ? addComma(tick) : tick || '' });
        var td_date = createElement('td', { class: 'gr-5 audit-dates', 'data-value': date, 'data-balloon-pos': 'down', text: date && !isNaN(date) ? moment.unix(date).utc().format('YYYY-MM-DD HH:mm:ss') : date || '' });

        tr.appendChild(td_remark);
        tr.appendChild(td_tick);
        tr.appendChild(td_date);

        if (td_class && td_class.length) {
            td_class.forEach(function (c) {
                td_tick.classList.add(c);
                td_date.classList.add(c);
            });
        }

        table.appendChild(tr);
    };

    var populateAuditTable = function populateAuditTable(show_audit_table) {
        var contract_starts = createAuditTable('Starts');
        parseAuditResponse(contract_starts.table, contract.audit_details.contract_start).then(function () {
            if (contract.audit_details.contract_start
            // Hide audit table for Lookback.
            && !/^(LBHIGHLOW|LBFLOATPUT|LBFLOATCALL)/.test(contract.shortcode)) {
                createAuditHeader(contract_starts.table);
                appendAuditLink('trade_details_entry_spot');
            } else {
                contract_starts.div.remove();
            }
            // don't show exit tick information if missing or manual sold
            if (contract.exit_tick_time && !(contract.sell_time && contract.sell_time < contract.date_expiry)
            // Hide audit table for Lookback.
            && !/^(LBHIGHLOW|LBFLOATPUT|LBFLOATCALL)/.test(contract.shortcode)) {
                var contract_ends = createAuditTable('Ends');
                parseAuditResponse(contract_ends.table, contract.audit_details.contract_end).then(function () {
                    if (contract.audit_details.contract_end) {
                        createAuditHeader(contract_ends.table);
                        appendAuditLink('trade_details_current_spot');
                    } else {
                        contract_ends.div.remove();
                    }
                    onAuditTableComplete(show_audit_table);
                });
            } else {
                onAuditTableComplete(show_audit_table);
            }
        });
    };

    var onAuditTableComplete = function onAuditTableComplete(show_audit_table) {
        showLocalTimeOnHover('.audit-dates');
        setAuditVisibility(show_audit_table);
    };

    var makeTemplate = function makeTemplate() {
        $container = $('<div/>').append($('<div/>', { id: wrapper_id }));

        var longcode = contract.longcode;

        $container.prepend($('<div/>', { id: 'sell_bet_desc', class: 'popup_bet_desc drag-handle', text: longcode }));
        var $sections = $('<div/>').append($('<div class="gr-row container"><div id="sell_details_chart_wrapper" class="gr-8 gr-12-m"></div><div id="sell_details_table" class="gr-4 gr-12-m"></div></div>'));
        var barrier_text = 'Barrier',
            low_barrier_text = 'Low Barrier';

        if (isLookback(contract.contract_type)) {
            var _getLBBarrierLabel = getLBBarrierLabel(contract.contract_type, contract.barrier_count);

            var _getLBBarrierLabel2 = _slicedToArray(_getLBBarrierLabel, 2);

            barrier_text = _getLBBarrierLabel2[0];
            low_barrier_text = _getLBBarrierLabel2[1];
        } else if (contract.barrier_count > 1) {
            barrier_text = 'High Barrier';
        } else if (/^DIGIT(MATCH|DIFF)$/.test(contract.contract_type)) {
            barrier_text = 'Target';
        }

        $sections.find('#sell_details_table').append($('<table>\n            <tr id="contract_tabs"><th colspan="2" id="contract_information_tab">' + localize('Contract Information') + '</th></tr><tbody id="contract_information_content">\n            ' + createRow('Contract Type', '', 'trade_details_contract_type') + '\n            ' + createRow('Contract ID', '', 'trade_details_contract_id') + '\n            ' + createRow('Transaction ID', '', 'trade_details_ref_id') + '\n            ' + createRow('Start Time', '', 'trade_details_start_date') + '\n            ' + (!contract.tick_count ? createRow('End Time', '', 'trade_details_end_date') + createRow('Remaining Time', '', 'trade_details_live_remaining') : '') + '\n            ' + (!isLookback(contract.contract_type) ? createRow('Entry Spot', '', 'trade_details_entry_spot', 0, '<span></span>') : '') + '\n            ' + createRow(barrier_text, '', 'trade_details_barrier', true) + '\n            ' + (contract.barrier_count > 1 ? createRow(low_barrier_text, '', 'trade_details_barrier_low', true) : '') + '\n            ' + createRow('Potential Payout', '', 'trade_details_payout') + '\n            ' + (multiplier ? createRow('Multiplier', '', 'trade_details_multiplier') : '') + '\n            ' + createRow('Purchase Price', '', 'trade_details_purchase_price') + '\n            </tbody>\n            <th colspan="2" id="barrier_change" class="invisible">' + localize('Barrier Change') + '</th>\n            <tbody id="barrier_change_content" class="invisible"></tbody>\n            <tr><th colspan="2" id="trade_details_current_title">' + localize('Current') + '</th></tr>\n            ' + createRow('Spot', 'trade_details_spot_label', 'trade_details_current_spot', 0, '<span></span>') + '\n            ' + createRow('Spot Time', 'trade_details_spottime_label', 'trade_details_current_date') + '\n            ' + createRow('Current Time', '', 'trade_details_live_date') + '\n            ' + createRow('Indicative', 'trade_details_indicative_label', 'trade_details_indicative_price') + '\n            ' + createRow('Profit/Loss', '', 'trade_details_profit_loss') + '\n            <tr><td colspan="2" class="last_cell" id="trade_details_message">&nbsp;</td></tr>\n            </table>\n            <div id="errMsg" class="notice-msg ' + hidden_class + '"></div>\n            <div id="trade_details_bottom"><div id="contract_sell_wrapper" class="' + hidden_class + '"></div><div id="contract_sell_message"></div><div id="contract_win_status" class="' + hidden_class + '"></div></div>'));

        $sections.find('#sell_details_chart_wrapper').html($('<div/>', { id: contract.tick_count ? 'tick_chart' : 'analysis_live_chart', class: 'live_chart_wrapper' }));

        $container.find('#' + wrapper_id).append($sections.html()).append($('<div/>', { id: 'errMsg', class: 'notice-msg ' + hidden_class }));

        ViewPopupUI.showInpagePopup('<div class="' + popupbox_id + '">' + $container.html() + '</div>', '', '#sell_bet_desc');
        return $('#' + wrapper_id);
    };

    var createRow = function createRow(label, label_id, value_id, is_hidden, value) {
        return '<tr' + (is_hidden ? ' class="' + hidden_class + '"' : '') + '><td' + (label_id ? ' id="' + label_id + '"' : '') + '>' + localize(label) + '</td><td' + (value_id ? ' id="' + value_id + '"' : '') + '>' + (value || '') + '</td></tr>';
    };

    var epochToDateTime = function epochToDateTime(epoch) {
        var date_time = moment.utc(epoch * 1000).format('YYYY-MM-DD HH:mm:ss');
        return jpClient() ? toJapanTimeIfNeeded(date_time) : date_time + ' GMT';
    };

    // ===== Tools =====
    var containerSetText = function containerSetText(id, string, attributes, is_visible) {
        if (!$container || $container.length === 0) {
            $container = $('#' + wrapper_id);
        }

        var $target = $container.find('#' + id);
        if ($target && $target.length > 0) {
            $target.html(string);
            if (attributes) $target.attr(attributes);
            if (is_visible) $target.parent('tr').setVisibility(1);
        }
    };

    var setLoadingState = function setLoadingState(show_loading) {
        if (show_loading) {
            $loading = $('#trading_init_progress');
            if ($loading.length) {
                $loading.show();
            }
        } else {
            if ($loading.length) {
                $loading.hide();
            }
            if (btn_view) {
                ViewPopupUI.enableButton($(btn_view));
            }
        }
    };

    var showMessagePopup = function showMessagePopup(message, title, msg_class) {
        setLoadingState(false);
        var $con = $('<div/>');
        $con.prepend($('<div/>', { id: 'sell_bet_desc', class: 'popup_bet_desc drag-handle', text: localize(title) }));
        $con.append($('<div/>', { id: wrapper_id }).append($('<div/>', { class: msg_class, html: localize(message) })));
        ViewPopupUI.showInpagePopup('<div class="' + popupbox_id + '">' + $con.html() + '</div>', 'message_popup', '#sell_bet_desc');
    };

    var showErrorPopup = function showErrorPopup(response, message) {
        showMessagePopup(localize(message || 'Sorry, an error occurred while processing your request.'), 'There was an error', 'notice-msg');
        // eslint-disable-next-line no-console
        console.log(response);
    };

    var sellSetVisibility = function sellSetVisibility(show) {
        var sell_wrapper_id = 'sell_at_market_wrapper';
        var sell_button_id = 'sell_at_market';
        var is_exist = $container.find('#' + sell_wrapper_id).length > 0;
        if (show) {
            var is_started = !contract.is_forward_starting || contract.current_spot_time > contract.date_start;
            var $sell_wrapper = $container.find('#contract_sell_wrapper');
            if (is_exist) {
                if (!sell_text_updated && is_started) {
                    addSellNote($sell_wrapper);
                    $sell_wrapper.find('#' + sell_button_id).text(localize('Sell at market'));
                }
                return;
            }

            $sell_wrapper.setVisibility(1).append($('<div/>', { id: sell_wrapper_id }).append($('<button/>', { id: sell_button_id, class: 'button', text: localize(is_started ? 'Sell at market' : 'Sell') })));
            if (is_started) {
                addSellNote($sell_wrapper);
            }

            $container.find('#' + sell_button_id).unbind('click').click(function (e) {
                e.preventDefault();
                e.stopPropagation();
                is_sell_clicked = true;
                sellSetVisibility(false);
                BinarySocket.send({ sell: contract_id, price: contract.bid_price }).then(function (response) {
                    responseSell(response);
                });
            });
        } else {
            if (!is_exist) return;
            $container.find('#' + sell_button_id).unbind('click');
            $container.find('#' + sell_wrapper_id).remove();
        }
    };

    var addSellNote = function addSellNote($sell_wrapper) {
        sell_text_updated = true;
        $sell_wrapper.find('#sell_at_market_wrapper').append($('<div/>', { class: 'note' }).append($('<strong/>', { text: localize('Note') + ': ' })).append($('<span/>', { text: localize('Contract will be sold at the prevailing market price when the request is received by our servers. This price may differ from the indicated price.') })));
    };

    // ===== Requests & Responses =====
    // ----- Get Contract -----
    var getContract = function getContract(option) {
        if (contract_id) {
            ViewPopupUI.forgetStreams();
            var req = {
                contract_id: contract_id,
                proposal_open_contract: 1,
                subscribe: 1
            };
            if (option === 'no-subscribe') delete req.subscribe;
            BinarySocket.send(req, { callback: responseProposal });
        }
    };

    var responseSell = function responseSell(response) {
        if (getPropertyValue(response, 'error')) {
            if (response.error.code === 'NoOpenPosition') {
                getContract();
            } else {
                $container.find('#errMsg').text(response.error.message).setVisibility(1);
            }
            sellSetVisibility(true);
            is_sell_clicked = false;
            return;
        }
        ViewPopupUI.forgetStreams();
        $container.find('#errMsg').setVisibility(0);
        sellSetVisibility(false);
        if (is_sell_clicked) {
            containerSetText('contract_sell_message', localize('You have sold this contract at [_1] [_2]', [contract.currency, response.sell.sold_for]) + '\n                <br />\n                ' + localize('Your transaction reference number is [_1]', [response.sell.transaction_id]));
        }
        getContract('no-subscribe');
    };

    var responseProposal = function responseProposal(response) {
        if (response.error) {
            if (response.error.code !== 'AlreadySubscribed' && response.echo_req.contract_id === contract_id) {
                showErrorPopup(response, response.error.message);
            }
            return;
        }
        if (response.proposal_open_contract.contract_id === contract_id) {
            ViewPopupUI.storeSubscriptionID(response.proposal_open_contract.id);
            responseContract(response);
        } else {
            BinarySocket.send({ forget: response.proposal_open_contract.id });
        }
        var dates = ['#trade_details_start_date', '#trade_details_end_date', '#trade_details_current_date', '#trade_details_live_date'];
        for (var i = 0; i < dates.length; i++) {
            showLocalTimeOnHover(dates[i]);
            $(dates[i]).attr('data-balloon-pos', 'left');
        }
    };

    var viewButtonOnClick = function viewButtonOnClick(container_selector) {
        $(container_selector).on('click', '.open_contract_details', function (e) {
            e.preventDefault();
            init(this);
        });
    };

    return {
        init: init,
        viewButtonOnClick: viewButtonOnClick
    };
}();
var addComma = __webpack_require__(7).addComma;

var formatMoney = __webpack_require__(7).formatMoney;

module.exports = ViewPopup;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var setViewPopupTimer = __webpack_require__(20).setViewPopupTimer;
var BinarySocket = __webpack_require__(5);
var getHighestZIndex = __webpack_require__(0).getHighestZIndex;

var ViewPopupUI = function () {
    var $container = void 0,
        stream_ids = void 0,
        chart_stream_ids = void 0,
        getPageTickStream = void 0;

    var init = function init() {
        $container = null;
    };

    var container = function container(refresh) {
        if (refresh) {
            if ($container) {
                $container.remove();
            }
            $container = null;
        }
        if (!$container) {
            var $con = $('<div class="inpage_popup_container" id="sell_popup_container"><a class="close"></a><div class="inpage_popup_content"></div></div>');
            $con.hide();
            var onClose = function onClose() {
                cleanup();
                $(document).off('keydown');
                $(window).off('popstate', onClose);
            };
            $con.find('a.close').on('click', onClose);
            $(document).on('keydown', function (e) {
                if (e.which === 27) onClose();
            });
            $(window).on('popstate', onClose);
            $container = $con;
        }
        return $container;
    };

    var cleanup = function cleanup() {
        forgetStreams();
        forgetChartStreams();
        setViewPopupTimer(null);
        closeContainer();
        init();
        if (typeof getPageTickStream === 'function') getPageTickStream();
        $(window).off('resize', function () {
            repositionConfirmation();
        });
    };

    var forgetStreams = function forgetStreams() {
        while (stream_ids && stream_ids.length > 0) {
            var id = stream_ids.pop();
            if (id && id.length > 0) {
                BinarySocket.send({ forget: id });
            }
        }
    };

    var forgetChartStreams = function forgetChartStreams() {
        while (chart_stream_ids && chart_stream_ids.length > 0) {
            var id = chart_stream_ids.pop();
            if (id && id.length > 0) {
                BinarySocket.send({ forget: id });
            }
        }
    };

    var closeContainer = function closeContainer() {
        if ($container) {
            $container.hide().remove();
            $('.popup_page_overlay').hide().remove();
            $container = null;
        }
        $('html').removeClass('no-scroll');
    };

    var disableButton = function disableButton(button) {
        $('.open_contract_details[disabled]').each(function () {
            enableButton($(this));
        });
        button.attr('disabled', 'disabled');
        button.fadeTo(0, 0.5);
    };

    var enableButton = function enableButton(button) {
        button.removeAttr('disabled');
        button.fadeTo(0, 1);
    };

    var showInpagePopup = function showInpagePopup(data, containerClass, dragHandle) {
        var con = container(true);
        if (containerClass) {
            con.addClass(containerClass);
        }
        if (data) {
            $('.inpage_popup_content', con).html(data);
        }
        var body = $(document.body);
        con.css('position', 'fixed').css('z-index', getHighestZIndex() + 100);
        body.append(con);
        con.show();
        // $('html').addClass('no-scroll');
        $(document.body).append($('<div/>', { class: 'popup_page_overlay' }));
        $('.popup_page_overlay').click(function () {
            container().find('a.close').click();
        });
        con.draggable({
            stop: function stop() {
                repositionConfirmationOnDrag();
            },
            handle: dragHandle,
            scroll: false
        });
        repositionConfirmation();
        $(window).resize(function () {
            repositionConfirmation();
        });
        return con;
    };

    var repositionConfirmationOnDrag = function repositionConfirmationOnDrag() {
        var con = container();
        var offset = con.offset();
        var $window = $(window);
        // top
        if (offset.top < $window.scrollTop()) {
            con.offset({ top: $window.scrollTop() });
        }
        // left
        if (offset.left < 0) {
            con.offset({ left: 0 });
        }
        // right
        if (offset.left > $window.width() - con.width()) {
            con.offset({ left: $window.width() - con.width() });
        }
    };

    var repositionConfirmation = function repositionConfirmation(x, y) {
        var con = container();
        var $window = $(window);
        var x_min = 0;
        var y_min = 500;
        if ($window.width() < 767) {
            // To be responsive, on mobiles and phablets we show popup as full screen.
            x_min = 0;
            y_min = 0;
        }
        var new_x = void 0,
            new_y = void 0;
        if (x === undefined) {
            new_x = Math.max(Math.floor(($window.width() - $window.scrollLeft() - con.width()) / 2), x_min) + $window.scrollLeft();
        }
        if (y === undefined) {
            new_y = Math.min(Math.floor(($window.height() - con.height()) / 2), y_min) + $window.scrollTop();
            if (y < $window.scrollTop()) {
                new_y = $window.scrollTop();
            }
        }
        con.offset({ left: x || new_x, top: y || new_y });
        repositionConfirmationOnDrag();
    };

    // ===== Dispatch =====
    var storeSubscriptionID = function storeSubscriptionID(id, is_chart) {
        if (!stream_ids && !is_chart) {
            stream_ids = [];
        }
        if (!chart_stream_ids) {
            chart_stream_ids = [];
        }
        if (id && id.length > 0) {
            if (!is_chart && $.inArray(id, stream_ids) < 0) {
                stream_ids.push(id);
            } else if (is_chart && $.inArray(id, chart_stream_ids) < 0) {
                chart_stream_ids.push(id);
            }
        }
    };

    return {
        cleanup: cleanup,
        forgetStreams: forgetStreams,
        disableButton: disableButton,
        enableButton: enableButton,
        showInpagePopup: showInpagePopup,
        repositionConfirmation: repositionConfirmation,
        storeSubscriptionID: storeSubscriptionID,

        setStreamFunction: function setStreamFunction(streamFnc) {
            getPageTickStream = streamFnc;
        }
    };
}();

module.exports = ViewPopupUI;

/***/ }),
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var urlForStatic = __webpack_require__(8).urlForStatic;

// only reload if it's more than 10 minutes since the last reload
var shouldForceReload = function shouldForceReload(last_reload) {
    return !last_reload || +last_reload + 10 * 60 * 1000 < moment().valueOf();
};

var static_hash = void 0;
var getStaticHash = function getStaticHash() {
    static_hash = static_hash || ($('script[src*="vendor.min.js"]').attr('src') || '').split('?')[1];
    return static_hash;
};

// calling this method is handled by GTM tags
var checkNewRelease = function checkNewRelease() {
    var last_reload = localStorage.getItem('new_release_reload_time');
    if (!shouldForceReload(last_reload)) return false;
    localStorage.setItem('new_release_reload_time', moment().valueOf());

    var current_hash = getStaticHash();
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (+xhttp.readyState === 4 && +xhttp.status === 200) {
            var latest_hash = xhttp.responseText;
            if (latest_hash && current_hash && latest_hash !== current_hash) {
                window.location.reload(true);
            }
        }
    };
    xhttp.open('GET', urlForStatic('version?' + Math.random().toString(36).slice(2)), true);
    xhttp.send();

    return true;
};

module.exports = {
    shouldForceReload: shouldForceReload,
    getStaticHash: getStaticHash,
    checkNewRelease: checkNewRelease
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isEmptyObject = __webpack_require__(0).isEmptyObject;

var ActiveSymbols = function () {
    var groupBy = function groupBy(xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    var extend = function extend(a, b) {
        if (!a || !b) return null;
        Object.keys(b).forEach(function (key) {
            a[key] = b[key];
        });
        return a;
    };

    var clone = function clone(obj) {
        return extend({}, obj);
    };

    var markets = {};
    var submarkets = {};
    var symbols = {};

    var getMarkets = function getMarkets(all_symbols) {
        if (!isEmptyObject(markets)) {
            return clone(markets);
        }

        var all_markets = groupBy(all_symbols, 'market');
        Object.keys(all_markets).forEach(function (key) {
            var market_name = key;
            var market_symbols = all_markets[key];
            var symbol = market_symbols[0];
            markets[market_name] = {
                name: symbol.market_display_name,
                is_active: !symbol.is_trading_suspended && symbol.exchange_is_open
            };
            getSubmarketsForMarket(market_symbols, markets[market_name]);
        });
        return clone(markets);
    };

    var clearData = function clearData() {
        markets = {};
        symbols = {};
        submarkets = {};
    };

    var getSubmarketsForMarket = function getSubmarketsForMarket(all_symbols, market) {
        if (!isEmptyObject(market.submarkets)) {
            return clone(market.submarkets);
        }
        market.submarkets = {};

        var all_submarkets = groupBy(all_symbols, 'submarket');

        Object.keys(all_submarkets).forEach(function (key) {
            var submarket_name = key;
            var submarket_symbols = all_submarkets[key];
            var symbol = submarket_symbols[0];

            market.submarkets[submarket_name] = {
                name: symbol.submarket_display_name,
                is_active: !symbol.is_trading_suspended && symbol.exchange_is_open
            };

            getSymbolsForSubmarket(submarket_symbols, market.submarkets[submarket_name]);
        });
        return clone(market.submarkets);
    };

    var getSymbolsForSubmarket = function getSymbolsForSubmarket(all_symbols, submarket) {
        if (isEmptyObject(submarket.symbols)) {
            submarket.symbols = {};
            all_symbols.forEach(function (symbol) {
                submarket.symbols[symbol.symbol] = {
                    display: symbol.display_name,
                    symbol_type: symbol.symbol_type,
                    is_active: !symbol.is_trading_suspended && symbol.exchange_is_open,
                    pip: symbol.pip,
                    market: symbol.market,
                    submarket: symbol.submarket
                };
            });
        }
        return clone(submarket.symbols);
    };

    var getSubmarkets = function getSubmarkets(active_symbols) {
        if (isEmptyObject(submarkets)) {
            var all_markets = getMarkets(active_symbols);
            Object.keys(all_markets).forEach(function (key) {
                var market = all_markets[key];
                var all_submarkets = getSubmarketsForMarket(active_symbols, market);
                extend(submarkets, all_submarkets);
            });
        }
        return clone(submarkets);
    };

    var getSymbols = function getSymbols(active_symbols) {
        if (isEmptyObject(symbols)) {
            var all_submarkets = getSubmarkets(active_symbols);
            Object.keys(all_submarkets).forEach(function (key) {
                var submarket = all_submarkets[key];
                var all_symbols = getSymbolsForSubmarket(active_symbols, submarket);
                extend(symbols, all_symbols);
            });
        }
        return clone(symbols);
    };

    var getMarketsList = function getMarketsList(active_symbols) {
        var trade_markets_list = {};
        extend(trade_markets_list, getMarkets(active_symbols));
        extend(trade_markets_list, getSubmarkets(active_symbols));
        return trade_markets_list;
    };

    var getTradeUnderlyings = function getTradeUnderlyings(active_symbols) {
        var trade_underlyings = {};
        var all_symbols = getSymbols(active_symbols);
        Object.keys(all_symbols).forEach(function (key) {
            var symbol = all_symbols[key];
            if (!trade_underlyings[symbol.market]) {
                trade_underlyings[symbol.market] = {};
            }
            if (!trade_underlyings[symbol.submarket]) {
                trade_underlyings[symbol.submarket] = {};
            }
            trade_underlyings[symbol.market][key] = symbol;
            trade_underlyings[symbol.submarket][key] = symbol;
        });
        return trade_underlyings;
    };

    var getSymbolNames = function getSymbolNames(active_symbols) {
        var all_symbols = clone(getSymbols(active_symbols));
        Object.keys(all_symbols).forEach(function (key) {
            all_symbols[key] = all_symbols[key].display;
        });
        return all_symbols;
    };

    return {
        getMarkets: getMarkets,
        getSubmarkets: getSubmarkets,
        getMarketsList: getMarketsList,
        getTradeUnderlyings: getTradeUnderlyings,
        getSymbolNames: getSymbolNames,
        clearData: clearData,
        getSymbols: getSymbols
    };
}();

module.exports = ActiveSymbols;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var showPopup = __webpack_require__(90);
var elementTextContent = __webpack_require__(3).elementTextContent;
var urlFor = __webpack_require__(8).urlFor;

var Dialog = function () {
    var baseDialog = function baseDialog(options) {
        var is_alert = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return new Promise(function (resolve) {
            showPopup({
                url: urlFor('dialog'),
                popup_id: options.id,
                form_id: '#frm_confirm',
                content_id: '#dialog_content',
                additionalFunction: function additionalFunction(container) {
                    var el_dialog = container;
                    var el_btn_ok = container.querySelector('#btn_ok');
                    var el_btn_cancel = container.querySelector('#btn_cancel');

                    if (!el_dialog) return;

                    elementTextContent(container.querySelector('#dialog_message'), options.message);

                    if (is_alert) {
                        el_btn_cancel.classList.add('invisible');
                    } else {
                        el_btn_cancel.addEventListener('click', function () {
                            el_dialog.remove();
                            if (typeof options.onAbort === 'function') {
                                options.onAbort();
                            }
                            resolve(false);
                        });
                    }

                    el_btn_ok.addEventListener('click', function () {
                        el_dialog.remove();
                        if (typeof options.onConfirm === 'function') {
                            options.onConfirm();
                        }
                        resolve(true);
                    });
                }
            });
        });
    };

    return {
        alert: function alert(options) {
            return baseDialog(options, true);
        },
        confirm: function confirm(options) {
            return baseDialog(options);
        }
    };
}();

module.exports = Dialog;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Validation = __webpack_require__(49);
var getElementById = __webpack_require__(3).getElementById;
var createElement = __webpack_require__(0).createElement;

var cache = {};

var showPopup = function showPopup(options) {
    if (cache[options.url]) {
        callback(options);
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState !== 4 || this.status !== 200) {
                return;
            }
            cache[options.url] = this.responseText;
            callback(options);
        };
        xhttp.open('GET', options.url, true);
        xhttp.send();
    }
};

var callback = function callback(options) {
    var div = createElement('div', { html: cache[options.url] });
    var lightbox = createElement('div', { id: options.popup_id, class: 'lightbox' });
    lightbox.appendChild(div.querySelector(options.content_id));
    document.body.appendChild(lightbox);

    if (options.validations) {
        Validation.init(options.form_id, options.validations);
    }

    if (typeof options.additionalFunction === 'function') {
        options.additionalFunction(lightbox);
    }

    getElementById(options.form_id.slice(1)).addEventListener('submit', function (e) {
        e.preventDefault();
        if (options.validations) {
            if (Validation.validate(options.form_id)) {
                if (lightbox) {
                    lightbox.remove();
                }
                if (typeof options.onAccept === 'function') {
                    options.onAccept();
                }
            }
        } else if (lightbox) {
            lightbox.remove();
        }
    });
};

module.exports = showPopup;

/***/ }),
/* 91 */,
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var localize = __webpack_require__(2).localize;

/*
 * Notifications manages various notification messages
 *
 */

var MBNotifications = function () {
    /*
     * options: Object {
     *     text       : {string}  message text to display
     *     uid        : {string}  unique id to prevent duplicating the same message and also used to hide the message
     *     dismissible: {boolean} dismissible messages can be hidden by client
     * }
     */
    var showErrorMessage = function showErrorMessage(options) {
        var $note_wrapper = getContainer();
        var $this_uid = $note_wrapper.find('#' + options.uid);

        if (!options.uid || $this_uid.length === 0) {
            $note_wrapper.prepend(generateMessage(options));
        } else if ($this_uid.html() !== options.text) {
            $this_uid.replaceWith(generateMessage(options));
        }

        $.scrollTo($note_wrapper, 500, { offset: -5 });
        hideSpinnerShowTrading();
    };

    var generateMessage = function generateMessage(options) {
        var $message = $('<div class="notice-msg gr-12 center-text' + (options.dismissible ? ' dismissible' : '') + '"\n            ' + (options.uid ? ' id="' + options.uid + '"' : '') + '>' + localize(options.text) + '\n                ' + (options.dismissible ? '<div class="notification-dismiss">x</div>' : '') + '\n            </div>');

        if (options.dismissible) {
            $message.click(function () {
                dismissMessage(this);
            });
        }

        return $message;
    };

    var hideErrorMessage = function hideErrorMessage(uid) {
        if (uid) {
            getContainer().find('#' + uid).remove();
        }
    };

    var dismissMessage = function dismissMessage(obj) {
        $(obj).remove();
    };

    var getContainer = function getContainer() {
        return $('#notifications_wrapper');
    };

    var hideSpinnerShowTrading = function hideSpinnerShowTrading() {
        $('#main_loading').setVisibility(0);
        $('#mb-trading-wrapper').setVisibility(1);
    };

    return {
        hideSpinnerShowTrading: hideSpinnerShowTrading,

        show: showErrorMessage,
        hide: hideErrorMessage
    };
}();

module.exports = MBNotifications;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Barriers = __webpack_require__(103);
var updateWarmChart = __webpack_require__(42).updateWarmChart;
var DigitInfo = __webpack_require__(157);
var Defaults = __webpack_require__(25);
var getActiveTab = __webpack_require__(121).getActiveTab;
var Purchase = __webpack_require__(123);
var Tick = __webpack_require__(36);
var TickDisplay = __webpack_require__(72);
var MBDefaults = __webpack_require__(28);
var MBTick = __webpack_require__(101);
var BinarySocket = __webpack_require__(5);
var State = __webpack_require__(6).State;

var GetTicks = function () {
    var underlying = void 0;

    var request = function request(symbol, req, _callback) {
        underlying = State.get('is_mb_trading') ? MBDefaults.get('underlying') : Defaults.get('underlying');
        if (underlying && req && _callback && (underlying !== req.ticks_history || !req.subscribe)) {
            BinarySocket.send(req, { callback: _callback });
        } else {
            var sendRequest = function sendRequest() {
                BinarySocket.send(req || {
                    ticks_history: symbol || underlying,
                    style: 'ticks',
                    end: 'latest',
                    count: 20,
                    subscribe: 1
                }, {
                    callback: function callback(response) {
                        var type = response.msg_type;

                        if (typeof _callback === 'function') {
                            _callback(response);
                        }

                        if (State.get('is_mb_trading')) {
                            MBTick.processTickStream(response);
                            return;
                        }

                        if (type === 'tick') {
                            processTick(response);
                            if (getActiveTab() === 'tab_last_digit') {
                                DigitInfo.updateChart(response);
                            }
                        } else if (type === 'history') {
                            processHistory(response);
                            if (getActiveTab() === 'tab_last_digit') {
                                DigitInfo.showChart(response.echo_req.ticks_history, response.history.prices);
                            }
                        }
                    }
                });
            };

            if (!req || req.subscribe) {
                BinarySocket.send({ forget_all: ['ticks', 'candles'] }).then(function () {
                    sendRequest();
                });
            } else {
                sendRequest();
            }
        }
    };

    var processTick = function processTick(tick) {
        var symbol = underlying;
        if (tick.echo_req.ticks === symbol || tick.tick && tick.tick.symbol === symbol) {
            Tick.details(tick);
            Tick.display();
            TickDisplay.updateChart(tick);
            Purchase.updateSpotList();
            if (!Barriers.isBarrierUpdated()) {
                Barriers.display();
                Barriers.setBarrierUpdate(true);
            }
            updateWarmChart();
        }
    };

    var processHistory = function processHistory(res) {
        if (res.history && res.history.times && res.history.prices) {
            for (var i = 0; i < res.history.times.length; i++) {
                Tick.details({
                    tick: {
                        epoch: res.history.times[i],
                        quote: res.history.prices[i]
                    }
                });
            }
        }
    };

    return {
        request: request
    };
}();

module.exports = GetTicks;

/***/ }),
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MBDefaults = __webpack_require__(28);
var MBNotifications = __webpack_require__(92);
var BinarySocket = __webpack_require__(5);
var getElementById = __webpack_require__(3).getElementById;
var getPropertyValue = __webpack_require__(0).getPropertyValue;

/*
 * MBTick object handles all the process/display related to tick streaming
 *
 * We request tick stream for particular underlying to update current spot
 *
 *
 * Usage:
 * use `MBTick.detail` to populate this object
 *
 * then use
 *
 * `MBTick.quote()` to get current spot quote
 * 'MBTick.display()` to display current spot
 */

var MBTick = function () {
    var _quote = '';
    var error_message = '';

    var details = function details(data) {
        error_message = '';

        if (data) {
            if (data.error) {
                error_message = data.error.message;
            } else {
                _quote = data.tick.quote;
            }
        }
    };

    var display = function display() {
        $('#spot').fadeIn(200);
        var message = '';
        if (error_message) {
            message = error_message;
        } else {
            message = _quote;
        }

        var spot_element = getElementById('spot');
        if (parseFloat(message) !== +message) {
            spot_element.className = 'error';
        } else {
            spot_element.classList.remove('error');
            displayPriceMovement(parseFloat(spot_element.textContent), parseFloat(message));
        }

        spot_element.textContent = message;
    };

    /*
     * Display price/spot movement variation to depict price moved up or down
     */
    var displayPriceMovement = function displayPriceMovement(old_value, current_value) {
        var class_name = 'still';
        if (old_value !== current_value) {
            class_name = current_value > old_value ? 'up' : 'down';
        }
        var $spot = $('#spot');
        $spot.removeClass('up down still').addClass(class_name);
    };

    var request = function request(symbol) {
        BinarySocket.send({
            ticks: symbol,
            subscribe: 1
        }, { callback: processTickStream });
    };

    var processTickStream = function processTickStream(response) {
        if (response.msg_type === 'tick' && MBDefaults.get('underlying') === (response.echo_req.ticks || response.echo_req.ticks_history)) {
            if (getPropertyValue(response, 'error')) {
                MBNotifications.show({ text: response.error.message, uid: 'TICK_ERROR' });
                return;
            }

            details(response);
            display();
        }
    };

    return {
        details: details,
        display: display,
        request: request,
        displayPriceMovement: displayPriceMovement,
        processTickStream: processTickStream,
        quote: function quote() {
            return _quote;
        },
        errorMessage: function errorMessage() {
            return error_message;
        },
        setQuote: function setQuote(q) {
            _quote = q;
        },
        clean: function clean() {
            _quote = '';
            var $spot = $('#spot');
            $spot.fadeOut(200, function () {
                // resets spot movement coloring, will continue on the next tick responses
                $spot.removeClass('up down').text('');
            });
        }
    };
}();

module.exports = MBTick;

/***/ }),
/* 102 */,
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var countDecimalPlaces = __webpack_require__(35).countDecimalPlaces;
var Contract = __webpack_require__(50);
var Defaults = __webpack_require__(25);
var Tick = __webpack_require__(36);
var elementTextContent = __webpack_require__(3).elementTextContent;
var getElementById = __webpack_require__(3).getElementById;
var isVisible = __webpack_require__(3).isVisible;

/*
 * Handles barrier processing and display
 *
 * It process `Contract.barriers` and display them if its applicable
 * for current `Contract.form()
 */

var Barriers = function () {
    var is_barrier_updated = false;

    var display = function display() {
        var barriers = Contract.barriers()[Defaults.get('underlying')];
        var form_name = Contract.form();

        if (barriers && form_name && Defaults.get('formname') !== 'risefall') {
            var barrier = barriers[form_name];
            if (barrier) {
                var current_tick = Tick.quote();
                var decimal_places = countDecimalPlaces(current_tick);

                var unit = getElementById('duration_units');
                var end_time = getElementById('expiry_date');
                var indicative_barrier_tooltip = getElementById('indicative_barrier_tooltip');
                var indicative_high_barrier_tooltip = getElementById('indicative_high_barrier_tooltip');
                var indicative_low_barrier_tooltip = getElementById('indicative_low_barrier_tooltip');

                if (barrier.count === 1) {
                    getElementById('high_barrier_row').style.display = 'none';
                    getElementById('low_barrier_row').style.display = 'none';
                    getElementById('barrier_row').setAttribute('style', '');

                    var defaults_barrier = Defaults.get('barrier');
                    var elm = getElementById('barrier');
                    var tooltip = getElementById('barrier_tooltip');
                    var span = getElementById('barrier_span');
                    var barrier_def = defaults_barrier && !isNaN(defaults_barrier) ? defaults_barrier : barrier.barrier || 0;
                    var value = void 0;
                    if (unit && isVisible(unit) && unit.value === 'd' || end_time && isVisible(end_time) && moment(end_time.getAttribute('data-value')).isAfter(moment(), 'day') || !String(barrier.barrier).match(/^[+-]/)) {
                        if (current_tick && !isNaN(current_tick) && String(barrier_def).match(/^[+-]/)) {
                            value = (parseFloat(current_tick) + parseFloat(barrier_def)).toFixed(decimal_places);
                        } else {
                            value = parseFloat(barrier_def);
                        }
                        tooltip.style.display = 'none';
                        span.style.display = 'inherit';
                        // no need to display indicative barrier in case of absolute barrier
                        elementTextContent(indicative_barrier_tooltip, '');
                    } else {
                        if (!String(barrier_def).match(/^[+-]/)) barrier_def = barrier.barrier; // override Defaults value, because it's changing from absolute to relative barrier
                        value = barrier_def;
                        span.style.display = 'none';
                        tooltip.style.display = 'inherit';
                        if (current_tick && !isNaN(current_tick)) {
                            elementTextContent(indicative_barrier_tooltip, (parseFloat(current_tick) + parseFloat(barrier_def)).toFixed(decimal_places));
                        } else {
                            elementTextContent(indicative_barrier_tooltip, '');
                        }
                    }
                    elm.value = elm.textContent = value;
                    Defaults.set('barrier', elm.value);
                    Defaults.remove('barrier_high', 'barrier_low');
                    Barriers.validateBarrier();
                    return;
                } else if (barrier.count === 2) {
                    getElementById('barrier_row').style.display = 'none';
                    getElementById('high_barrier_row').setAttribute('style', '');
                    getElementById('low_barrier_row').setAttribute('style', '');

                    var high_elm = getElementById('barrier_high');
                    var low_elm = getElementById('barrier_low');
                    var high_tooltip = getElementById('barrier_high_tooltip');
                    var high_span = getElementById('barrier_high_span');
                    var low_tooltip = getElementById('barrier_low_tooltip');
                    var low_span = getElementById('barrier_low_span');

                    var defaults_high = Defaults.get('barrier_high');
                    var defaults_low = Defaults.get('barrier_low');

                    var barrier_high = defaults_high && !isNaN(defaults_high) ? defaults_high : barrier.barrier || 0;
                    var barrier_low = defaults_low && !isNaN(defaults_low) ? defaults_low : barrier.barrier1 || 0;
                    var value_high = void 0,
                        value_low = void 0;
                    if (unit && isVisible(unit) && unit.value === 'd' || end_time && isVisible(end_time) && moment(end_time.getAttribute('data-value')).isAfter(moment(), 'day') || !String(barrier.barrier).match(/^[+-]/)) {
                        if (current_tick && !isNaN(current_tick) && String(barrier_high).match(/^[+-]/)) {
                            value_high = (parseFloat(current_tick) + parseFloat(barrier_high)).toFixed(decimal_places);
                            value_low = (parseFloat(current_tick) + parseFloat(barrier_low)).toFixed(decimal_places);
                        } else {
                            value_high = parseFloat(barrier_high);
                            value_low = parseFloat(barrier_low);
                        }

                        high_span.style.display = 'inherit';
                        high_tooltip.style.display = 'none';
                        low_span.style.display = 'inherit';
                        low_tooltip.style.display = 'none';

                        elementTextContent(indicative_high_barrier_tooltip, '');
                        elementTextContent(indicative_low_barrier_tooltip, '');
                    } else {
                        // override Defaults value, if it's changing from absolute to relative barrier
                        if (!String(barrier_high).match(/^[+-]/) || !String(barrier_low).match(/^[+-]/)) {
                            barrier_high = barrier.barrier;
                            barrier_low = barrier.barrier1;
                        }
                        value_high = barrier_high;
                        value_low = barrier_low;

                        high_span.style.display = 'none';
                        high_tooltip.style.display = 'inherit';
                        low_span.style.display = 'none';
                        low_tooltip.style.display = 'inherit';

                        var barrierVal = function barrierVal(tick, barrier_value) {
                            return (tick + parseFloat(barrier_value)).toFixed(decimal_places);
                        };

                        if (current_tick && !isNaN(current_tick)) {
                            var tick = parseFloat(current_tick);
                            elementTextContent(indicative_high_barrier_tooltip, barrierVal(tick, barrier_high));
                            elementTextContent(indicative_low_barrier_tooltip, barrierVal(tick, barrier_low));
                        } else {
                            elementTextContent(indicative_high_barrier_tooltip, '');
                            elementTextContent(indicative_low_barrier_tooltip, '');
                        }
                    }
                    high_elm.value = high_elm.textContent = value_high;
                    low_elm.value = low_elm.textContent = value_low;

                    Defaults.set('barrier_high', high_elm.value);
                    Defaults.set('barrier_low', low_elm.value);
                    Defaults.remove('barrier');
                    return;
                }
            }
        }

        var elements = document.getElementsByClassName('barrier_class');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        Defaults.remove('barrier', 'barrier_high', 'barrier_low');
    };

    var validateBarrier = function validateBarrier() {
        var barrier_element = getElementById('barrier');
        var empty = isNaN(parseFloat(barrier_element.value)) || parseFloat(barrier_element.value) === 0;
        if (isVisible(barrier_element) && empty) {
            barrier_element.classList.add('error-field');
        } else {
            barrier_element.classList.remove('error-field');
        }
    };

    return {
        display: display,
        validateBarrier: validateBarrier,
        isBarrierUpdated: function isBarrierUpdated() {
            return is_barrier_updated;
        },
        setBarrierUpdate: function setBarrierUpdate(flag) {
            is_barrier_updated = flag;
        }
    };
}();

module.exports = Barriers;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Notifications manages various notification messages
 *
 */

var Notifications = function () {
    /*
     * options: Object {
     *     text       : {string}  message text to display
     *     uid        : {string}  unique id to prevent duplicating the same message and also used to hide the message
     *     dismissible: {boolean} dismissible messages can be hidden by client
     * }
     */
    var showErrorMessage = function showErrorMessage(options) {
        var $note_wrapper = getContainer();
        var $this_uid = $note_wrapper.find('#' + options.uid);

        if (!options.uid || $this_uid.length === 0) {
            $note_wrapper.prepend(generateMessage(options));
        } else if ($this_uid.html() !== options.text) {
            $this_uid.replaceWith(generateMessage(options));
        }

        $.scrollTo($note_wrapper, 500, { offset: -5 });
    };

    var generateMessage = function generateMessage(options) {
        var $message = $('<div class="notice-msg center-text' + (options.dismissible ? ' dismissible' : '') + '"\n            ' + (options.uid ? ' id="' + options.uid + '"' : '') + '>' + options.text + '\n                ' + (options.dismissible ? '<div class="notification-dismiss">x</div>' : '') + '\n            </div>');

        if (options.dismissible) {
            $message.click(function () {
                dismissMessage(this);
            });
        }

        return $message;
    };

    var hideErrorMessage = function hideErrorMessage(uid) {
        if (uid) {
            getContainer().find('#' + uid).remove();
        }
    };

    var dismissMessage = function dismissMessage(obj) {
        $(obj).remove();
    };

    var getContainer = function getContainer() {
        return $('#notifications_wrapper');
    };

    return {
        show: showErrorMessage,
        hide: hideErrorMessage
    };
}();

module.exports = Notifications;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Portfolio = __webpack_require__(161).Portfolio;
var ViewPopup = __webpack_require__(74);
var Client = __webpack_require__(4);
var toJapanTimeIfNeeded = __webpack_require__(20).toJapanTimeIfNeeded;
var BinarySocket = __webpack_require__(5);
var jpClient = __webpack_require__(10).jpClient;
var formatMoney = __webpack_require__(7).formatMoney;
var GetAppDetails = __webpack_require__(62);
var localize = __webpack_require__(2).localize;
var urlParam = __webpack_require__(8).param;
var getPropertyValue = __webpack_require__(0).getPropertyValue;
var showLoadingImage = __webpack_require__(0).showLoadingImage;

var PortfolioInit = function () {
    var values = void 0,
        currency = void 0,
        oauth_apps = void 0,
        is_initialized = void 0,
        is_first_response = void 0,
        $portfolio_loading = void 0,
        jp_client = void 0;

    var init = function init() {
        updateBalance();

        if (is_initialized) return;

        values = {};
        currency = '';
        oauth_apps = {};
        $portfolio_loading = $('#portfolio-loading');
        jp_client = jpClient();
        $portfolio_loading.show();
        showLoadingImage($portfolio_loading[0]);
        is_first_response = true;
        BinarySocket.send({ portfolio: 1 }).then(function (response) {
            updatePortfolio(response);
        });
        // Subscribe to transactions to auto update new purchases
        BinarySocket.send({ transaction: 1, subscribe: 1 }, { callback: transactionResponseHandler });
        BinarySocket.send({ oauth_apps: 1 }).then(function (response) {
            updateOAuthApps(response);
        });
        is_initialized = true;

        // Display ViewPopup according to contract_id in query string
        var contract_id = urlParam('contract_id');
        if (contract_id) {
            ViewPopup.init($('<div />', { contract_id: contract_id }).get(0));
        }
    };

    var createPortfolioRow = function createPortfolioRow(data, is_first) {
        var new_class = is_first ? '' : 'new';
        var $div = $('<div/>');
        $div.append($('<tr/>', { class: 'tr-first ' + new_class + ' ' + data.contract_id, id: data.contract_id }).append($('<td/>', { class: 'ref' }).append($('<span ' + GetAppDetails.showTooltip(data.app_id, oauth_apps[data.app_id]) + ' data-balloon-position="right">' + data.transaction_id + '</span>'))).append($('<td/>', { class: 'payout' }).append($('<strong/>', { html: +data.payout ? formatMoney(data.currency, data.payout) : '-' }))).append($('<td/>', { class: 'details', text: data.longcode })).append($('<td/>', { class: 'purchase' }).append($('<strong/>', { html: formatMoney(data.currency, data.buy_price) }))).append($('<td/>', { class: 'indicative' }).append($('<strong/>', { class: 'indicative_price', text: '--.--' }))).append($('<td/>', { class: 'button' }).append($('<button/>', { class: 'button open_contract_details nowrap', contract_id: data.contract_id, text: localize('View') })))).append($('<tr/>', { class: 'tr-desc ' + new_class + ' ' + data.contract_id }).append($('<td/>', { colspan: '6', text: data.longcode })));

        if (jp_client) {
            var $td = $('<td/>', { class: 'expires nowrap' }).append($('<strong/>', { text: toJapanTimeIfNeeded(data.expiry_time) }));
            $td.insertAfter($div.find('.payout'));
        }

        $('#portfolio-body').prepend($div.html());
    };

    var updateBalance = function updateBalance() {
        var $portfolio_balance = $('#portfolio-balance');
        if ($portfolio_balance.length === 0) return;
        $portfolio_balance.html(Portfolio.getBalance(Client.get('balance'), Client.get('currency')));
        var $if_balance_zero = $('#if-balance-zero');
        if (Client.get('balance') > 0 || Client.get('is_virtual')) {
            $if_balance_zero.setVisibility(0);
        } else {
            $if_balance_zero.setVisibility(1);
        }
    };

    var updatePortfolio = function updatePortfolio(data) {
        if (getPropertyValue(data, 'error')) {
            errorMessage(data.error.message);
            return;
        }

        var portfolio_data = void 0;
        if (data.portfolio.contracts.length !== 0) {
            /**
             * User has at least one contract
             **/
            $('#portfolio-no-contract').hide();
            $.each(data.portfolio.contracts, function (ci, c) {
                // TODO: remove ico exception when all ico contracts are removed
                if (!getPropertyValue(values, c.contract_id) && c.contract_type !== 'BINARYICO') {
                    values[c.contract_id] = {};
                    values[c.contract_id].buy_price = c.buy_price;
                    portfolio_data = Portfolio.getPortfolioData(c);
                    currency = portfolio_data.currency;
                    createPortfolioRow(portfolio_data, is_first_response);
                    setTimeout(function () {
                        $('tr.' + c.contract_id).removeClass('new');
                    }, 1000);
                }
            });
        }
        // no open contracts
        if (!portfolio_data) {
            $('#portfolio-no-contract').show();
            $('#portfolio-table').setVisibility(0);
        } else {
            $('#portfolio-table').setVisibility(1);
            // update footer area data
            updateFooter();

            // request "proposal_open_contract"
            BinarySocket.send({ proposal_open_contract: 1, subscribe: 1 }, { callback: updateIndicative });
        }
        // ready to show portfolio table
        $portfolio_loading.hide();
        $('#portfolio-content').setVisibility(1);
        is_first_response = false;
    };

    var transactionResponseHandler = function transactionResponseHandler(response) {
        if (getPropertyValue(response, 'error')) {
            errorMessage(response.error.message);
        } else if (response.transaction.action === 'buy') {
            BinarySocket.send({ portfolio: 1 }).then(function (res) {
                updatePortfolio(res);
            });
        } else if (response.transaction.action === 'sell') {
            removeContract(response.transaction.contract_id);
        }
    };

    var updateIndicative = function updateIndicative(data) {
        if (getPropertyValue(data, 'error') || !values) {
            return;
        }

        var proposal = Portfolio.getProposalOpenContract(data.proposal_open_contract);
        // avoid updating 'values' before the new contract row added to the table
        if (!getPropertyValue(values, proposal.contract_id)) {
            return;
        }

        // force to sell the expired contract, in order to remove from portfolio
        if (+proposal.is_settleable === 1 && !proposal.is_sold) {
            BinarySocket.send({ sell_expired: 1 });
        }
        var $td = $('#' + proposal.contract_id).find('td.indicative');

        var old_indicative = values[proposal.contract_id].indicative || 0.00;
        values[proposal.contract_id].indicative = proposal.bid_price;

        var status_class = '';
        var no_resale_html = '';
        if (+proposal.is_sold === 1) {
            removeContract(proposal.contract_id);
        } else {
            if (+proposal.is_valid_to_sell !== 1) {
                no_resale_html = $('<span/>', { class: 'message', text: localize('Resale not offered') });
                $td.addClass('no_resale');
            } else {
                if (values[proposal.contract_id].indicative !== old_indicative) {
                    status_class = values[proposal.contract_id].indicative > old_indicative ? 'price_moved_up' : 'price_moved_down';
                }
                $td.removeClass('no_resale');
            }
            $td.html($('<strong/>', { class: 'indicative_price ' + status_class, html: formatMoney(proposal.currency, values[proposal.contract_id].indicative) }).append(no_resale_html));
        }

        updateFooter();
    };

    var updateOAuthApps = function updateOAuthApps(response) {
        oauth_apps = GetAppDetails.buildOauthApps(response);
        GetAppDetails.addTooltip(oauth_apps);
    };

    var removeContract = function removeContract(contract_id) {
        delete values[contract_id];
        $('tr.' + contract_id).removeClass('new').css('opacity', '0.5').fadeOut(1000, function () {
            $(this).remove();
            if ($('#portfolio-body').find('tr').length === 0) {
                $('#portfolio-table').setVisibility(0);
                $('#cost-of-open-positions, #value-of-open-positions').text('');
                $('#portfolio-no-contract').show();
            }
        });
        updateFooter();
    };

    var updateFooter = function updateFooter() {
        $('#cost-of-open-positions').html(formatMoney(currency, Portfolio.getSumPurchase(values)));
        $('#value-of-open-positions').html(formatMoney(currency, Portfolio.getIndicativeSum(values)));
    };

    var errorMessage = function errorMessage(msg) {
        var $err = $('#portfolio').find('#error-msg');
        if (msg) {
            $err.setVisibility(1).text(msg);
            $portfolio_loading.hide();
        } else {
            $err.setVisibility(0).text('');
        }
    };

    var onLoad = function onLoad() {
        init();
        ViewPopup.viewButtonOnClick('#portfolio-table');
    };

    var onUnload = function onUnload() {
        BinarySocket.send({ forget_all: ['proposal_open_contract', 'transaction'] });
        $('#portfolio-body').empty();
        $('#portfolio-content').setVisibility(0);
        is_initialized = false;
    };

    return {
        updateBalance: updateBalance,
        onLoad: onLoad,
        onUnload: onUnload
    };
}();

module.exports = PortfolioInit;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Client = __webpack_require__(4);
var GTM = __webpack_require__(48);
var BinarySocket = __webpack_require__(5);
var Currency = __webpack_require__(7);
var localize = __webpack_require__(2).localize;
var State = __webpack_require__(6).State;
var urlFor = __webpack_require__(8).urlFor;

var MetaTraderConfig = function () {
    var mt_companies = {
        financial: {
            standard: { mt5_account_type: 'standard', max_leverage: 500, title: 'Standard' },
            advanced: { mt5_account_type: 'advanced', max_leverage: 100, title: 'Advanced' }
        },
        gaming: {
            volatility: { mt5_account_type: '', max_leverage: 500, title: 'Volatility Indices' }
        }
    };

    var accounts_info = {};

    var $messages = void 0;
    var needsRealMessage = function needsRealMessage() {
        return $messages.find('#msg_' + (Client.hasAccountType('real') ? 'switch' : 'upgrade')).html();
    };

    var actions_info = {
        new_account: {
            title: localize('Sign up'),
            login: function login(response) {
                return response.mt5_new_account.login;
            },
            prerequisites: function prerequisites(acc_type) {
                return new Promise(function (resolve) {
                    if (accounts_info[acc_type].is_demo) {
                        resolve();
                    } else if (Client.get('is_virtual')) {
                        resolve(needsRealMessage());
                    } else if (accounts_info[acc_type].account_type === 'financial') {
                        BinarySocket.wait('get_account_status').then(function (response_get_account_status) {
                            var $message = $messages.find('#msg_real_financial').clone();
                            var is_ok = true;
                            if (/financial_assessment_not_complete/.test(response_get_account_status.get_account_status.status)) {
                                $message.find('.assessment').setVisibility(1).find('a').attr('onclick', 'localStorage.setItem(\'financial_assessment_redirect\', \'' + urlFor('user/metatrader') + '\')');
                                is_ok = false;
                            }
                            if (response_get_account_status.get_account_status.prompt_client_to_authenticate) {
                                $message.find('.authenticate').setVisibility(1);
                                is_ok = false;
                            }
                            resolve(is_ok ? '' : $message.html());
                        });
                    } else {
                        resolve();
                    }
                });
            },
            onSuccess: function onSuccess(response) {
                GTM.mt5NewAccount(response);
            }
        },
        password_change: {
            title: localize('Change Password'),
            success_msg: function success_msg(response) {
                return localize('The main password of account number [_1] has been changed.', [response.echo_req.login]);
            },
            prerequisites: function prerequisites() {
                return new Promise(function (resolve) {
                    return resolve('');
                });
            }
        },
        deposit: {
            title: localize('Deposit'),
            success_msg: function success_msg(response) {
                return localize('[_1] deposit from [_2] to account number [_3] is done. Transaction ID: [_4]', [Currency.formatMoney(State.getResponse('authorize.currency'), response.echo_req.amount), response.echo_req.from_binary, response.echo_req.to_mt5, response.binary_transaction_id]);
            },
            prerequisites: function prerequisites() {
                return new Promise(function (resolve) {
                    if (Client.get('is_virtual')) {
                        resolve(needsRealMessage());
                    } else {
                        BinarySocket.send({ cashier_password: 1 }).then(function (response) {
                            if (!response.error && response.cashier_password === 1) {
                                resolve(localize('Your cashier is locked as per your request - to unlock it, please click <a href="[_1]">here</a>.', [urlFor('user/security/cashier_passwordws')]));
                            } else {
                                BinarySocket.send({ get_account_status: 1 }).then(function (response_status) {
                                    if (!response_status.error && /cashier_locked/.test(response_status.get_account_status.status)) {
                                        resolve(localize('Your cashier is locked.')); // Locked from BO
                                    } else {
                                        var limit = State.getResponse('get_limits.remainder');
                                        if (typeof limit !== 'undefined' && +limit < Currency.getMinWithdrawal(Client.get('currency'))) {
                                            resolve(localize('You have reached the limit.'));
                                        } else {
                                            resolve();
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        },
        withdrawal: {
            title: localize('Withdraw'),
            success_msg: function success_msg(response) {
                return localize('[_1] withdrawal from account number [_2] to [_3] is done. Transaction ID: [_4]', [Currency.formatMoney(State.getResponse('authorize.currency'), response.echo_req.amount), response.echo_req.from_mt5, response.echo_req.to_binary, response.binary_transaction_id]);
            },
            prerequisites: function prerequisites(acc_type) {
                return new Promise(function (resolve) {
                    if (Client.get('is_virtual')) {
                        resolve(needsRealMessage());
                    } else if (accounts_info[acc_type].account_type === 'financial') {
                        BinarySocket.send({ get_account_status: 1 }).then(function (response_status) {
                            resolve(!/authenticated/.test(response_status.get_account_status.status) ? $messages.find('#msg_authenticate').html() : '');
                        });
                    } else {
                        resolve();
                    }
                });
            },
            pre_submit: function pre_submit($form, acc_type, displayFormMessage) {
                return BinarySocket.send({
                    mt5_password_check: 1,
                    login: accounts_info[acc_type].info.login,
                    password: $form.find(fields.withdrawal.txt_main_pass.id).val()
                }).then(function (response) {
                    if (+response.mt5_password_check === 1) {
                        return true;
                    } else if (response.error) {
                        displayFormMessage(response.error.message, 'withdrawal');
                    }
                    return false;
                });
            }
        }
    };

    var fields = {
        new_account: {
            txt_name: { id: '#txt_name', request_field: 'name' },
            txt_main_pass: { id: '#txt_main_pass', request_field: 'mainPassword' },
            txt_re_main_pass: { id: '#txt_re_main_pass' },
            txt_investor_pass: { id: '#txt_investor_pass', request_field: 'investPassword' },
            chk_tnc: { id: '#chk_tnc' },
            additional_fields: function additional_fields(acc_type) {
                return $.extend({
                    account_type: accounts_info[acc_type].account_type,
                    email: Client.get('email'),
                    leverage: accounts_info[acc_type].max_leverage
                }, accounts_info[acc_type].mt5_account_type ? {
                    mt5_account_type: accounts_info[acc_type].mt5_account_type
                } : {});
            }
        },
        password_change: {
            txt_old_password: { id: '#txt_old_password', request_field: 'old_password' },
            txt_new_password: { id: '#txt_new_password', request_field: 'new_password' },
            txt_re_new_password: { id: '#txt_re_new_password' },
            additional_fields: function additional_fields(acc_type) {
                return {
                    login: accounts_info[acc_type].info.login
                };
            }
        },
        deposit: {
            txt_amount: { id: '#txt_amount_deposit', request_field: 'amount' },
            additional_fields: function additional_fields(acc_type) {
                return {
                    from_binary: Client.get('loginid'),
                    to_mt5: accounts_info[acc_type].info.login
                };
            }
        },
        withdrawal: {
            txt_amount: { id: '#txt_amount_withdrawal', request_field: 'amount' },
            txt_main_pass: { id: '#txt_main_pass_wd' },
            additional_fields: function additional_fields(acc_type) {
                return {
                    from_mt5: accounts_info[acc_type].info.login,
                    to_binary: Client.get('loginid')
                };
            }
        }
    };

    var validations = function validations() {
        return {
            new_account: [{ selector: fields.new_account.txt_name.id, validations: ['req', 'letter_symbol', ['length', { min: 2, max: 30 }]] }, { selector: fields.new_account.txt_main_pass.id, validations: ['req', ['password', 'mt']] }, { selector: fields.new_account.txt_re_main_pass.id, validations: ['req', ['compare', { to: fields.new_account.txt_main_pass.id }]] }, { selector: fields.new_account.txt_investor_pass.id, validations: ['req', ['password', 'mt'], ['not_equal', { to: fields.new_account.txt_main_pass.id, name1: 'Main password', name2: 'Investor password' }]] }],
            password_change: [{ selector: fields.password_change.txt_old_password.id, validations: ['req'] }, { selector: fields.password_change.txt_new_password.id, validations: ['req', ['password', 'mt'], ['not_equal', { to: fields.password_change.txt_old_password.id, name1: 'Current password', name2: 'New password' }]], re_check_field: fields.password_change.txt_re_new_password.id }, { selector: fields.password_change.txt_re_new_password.id, validations: ['req', ['compare', { to: fields.password_change.txt_new_password.id }]] }],
            deposit: [{ selector: fields.deposit.txt_amount.id, validations: [['req', { hide_asterisk: true }], ['number', { type: 'float', min: 1, max: Math.min(State.getResponse('get_limits.remainder') || 20000, 20000), decimals: 2 }], ['custom', { func: function func() {
                        return Client.get('balance') && +Client.get('balance') >= +$(fields.deposit.txt_amount.id).val();
                    }, message: localize('You have insufficient funds in your Binary account, please <a href="[_1]">add funds</a>.', [urlFor('cashier')]) }]] }],
            withdrawal: [{ selector: fields.withdrawal.txt_main_pass.id, validations: [['req', { hide_asterisk: true }]] }, { selector: fields.withdrawal.txt_amount.id, validations: [['req', { hide_asterisk: true }], ['number', { type: 'float', min: 1, max: 20000, decimals: 2 }]] }]
        };
    };

    return {
        mt_companies: mt_companies,
        accounts_info: accounts_info,
        actions_info: actions_info,
        fields: fields,
        validations: validations,
        needsRealMessage: needsRealMessage,
        setMessages: function setMessages($msg) {
            $messages = $msg;
        },
        getCurrency: function getCurrency(acc_type) {
            return accounts_info[acc_type].info.currency;
        }
    };
}();

module.exports = MetaTraderConfig;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MetaTraderConfig = __webpack_require__(106);
var MetaTraderUI = __webpack_require__(162);
var Client = __webpack_require__(4);
var BinarySocket = __webpack_require__(5);
var Validation = __webpack_require__(49);
var localize = __webpack_require__(2).localize;
var State = __webpack_require__(6).State;
var toTitleCase = __webpack_require__(18).toTitleCase;
var getPropertyValue = __webpack_require__(0).getPropertyValue;

var MetaTrader = function () {
    var mt_companies = MetaTraderConfig.mt_companies;
    var accounts_info = MetaTraderConfig.accounts_info;
    var actions_info = MetaTraderConfig.actions_info;
    var fields = MetaTraderConfig.fields;

    var mt_company = {};

    var onLoad = function onLoad() {
        BinarySocket.wait('landing_company', 'get_account_status').then(function () {
            if (isEligible()) {
                if (Client.get('is_virtual')) {
                    getAllAccountsInfo();
                } else {
                    BinarySocket.send({ get_limits: 1 }).then(getAllAccountsInfo);
                }
            } else if (State.getResponse('landing_company.gaming_company.shortcode') === 'malta') {
                // TODO: remove this elseif when we enable mt account opening for malta
                // show specific message to clients from malta landing company as long as there is no mt_company for them
                MetaTraderUI.displayPageError(localize('Our MT5 service is currently unavailable to EU residents due to pending regulatory approval.'));
            } else {
                MetaTraderUI.displayPageError(localize('Sorry, this feature is not available in your jurisdiction.'));
            }
        });
    };

    var isEligible = function isEligible() {
        var has_mt_company = false;
        Object.keys(mt_companies).forEach(function (company) {
            mt_company[company] = State.getResponse('landing_company.mt_' + company + '_company.shortcode');
            if (mt_company[company]) {
                has_mt_company = true;
                addAccount(company);
            }
        });
        return has_mt_company;
    };

    var addAccount = function addAccount(company) {
        ['demo', 'real'].forEach(function (type) {
            Object.keys(mt_companies[company]).forEach(function (acc_type) {
                var company_info = mt_companies[company][acc_type];
                var mt5_account_type = company_info.mt5_account_type;
                var title = localize(toTitleCase(type) + ' ' + company_info.title);
                var is_demo = type === 'demo';

                accounts_info[type + '_' + mt_company[company] + (mt5_account_type ? '_' + mt5_account_type : '')] = {
                    title: title,
                    is_demo: is_demo,
                    mt5_account_type: mt5_account_type,
                    account_type: is_demo ? 'demo' : company,
                    max_leverage: company_info.max_leverage,
                    short_title: company_info.title
                };
            });
        });
    };

    var getAllAccountsInfo = function getAllAccountsInfo() {
        MetaTraderUI.init(submit);
        BinarySocket.send({ mt5_login_list: 1 }).then(function (response) {
            if (response.error) {
                MetaTraderUI.displayPageError(response.error.message || localize('Sorry, an error occurred while processing your request.'));
                return;
            }
            // Ignore old accounts which are not linked to any group or has deprecated group
            var mt5_login_list = (response.mt5_login_list || []).filter(function (obj) {
                return obj.group && Client.getMT5AccountType(obj.group) in accounts_info;
            });

            // Update account info
            mt5_login_list.forEach(function (obj) {
                var acc_type = Client.getMT5AccountType(obj.group);
                accounts_info[acc_type].info = { login: obj.login };
                getAccountDetails(obj.login, acc_type);
            });

            Client.set('mt5_account', getDefaultAccount());

            // Update types with no account
            Object.keys(accounts_info).filter(function (acc_type) {
                return !hasAccount(acc_type);
            }).forEach(function (acc_type) {
                MetaTraderUI.updateAccount(acc_type);
            });
        });
    };

    var getDefaultAccount = function getDefaultAccount() {
        var default_account = '';
        if (hasAccount(location.hash.substring(1))) {
            default_account = location.hash.substring(1);
            MetaTraderUI.removeUrlHash();
        } else if (hasAccount(Client.get('mt5_account'))) {
            default_account = Client.get('mt5_account');
        } else {
            default_account = Object.keys(accounts_info).filter(function (acc_type) {
                return hasAccount(acc_type);
            }).sort(function (acc_type) {
                return accounts_info[acc_type].is_demo ? 1 : -1;
            })[0] || ''; // real first
        }
        return default_account;
    };

    var hasAccount = function hasAccount(acc_type) {
        return (accounts_info[acc_type] || {}).info;
    };

    var getAccountDetails = function getAccountDetails(login, acc_type) {
        BinarySocket.send({
            mt5_get_settings: 1,
            login: login
        }).then(function (response) {
            if (response.mt5_get_settings) {
                accounts_info[acc_type].info = response.mt5_get_settings;
                MetaTraderUI.updateAccount(acc_type);
            }
        });
    };

    var makeRequestObject = function makeRequestObject(acc_type, action) {
        var req = {};

        Object.keys(fields[action]).forEach(function (field) {
            var field_obj = fields[action][field];
            if (field_obj.request_field) {
                req[field_obj.request_field] = MetaTraderUI.$form().find(field_obj.id).val();
            }
        });

        // set main command
        req['mt5_' + action] = 1;

        // add additional fields
        $.extend(req, fields[action].additional_fields(acc_type));

        return req;
    };

    var submit = function submit(e) {
        e.preventDefault();
        var $btn_submit = $(e.target);
        var acc_type = $btn_submit.attr('acc_type');
        var action = $btn_submit.attr('action');
        MetaTraderUI.hideFormMessage(action);
        if (Validation.validate('#frm_' + action)) {
            MetaTraderUI.disableButton(action);
            // further validations before submit (password_check)
            MetaTraderUI.postValidate(acc_type, action).then(function (is_ok) {
                if (!is_ok) {
                    MetaTraderUI.enableButton(action);
                    return;
                }

                var req = makeRequestObject(acc_type, action);
                BinarySocket.send(req).then(function (response) {
                    if (response.error) {
                        MetaTraderUI.displayFormMessage(response.error.message, action);
                    } else {
                        var login = actions_info[action].login ? actions_info[action].login(response) : accounts_info[acc_type].info.login;
                        if (!accounts_info[acc_type].info) {
                            accounts_info[acc_type].info = { login: login, currency: getPropertyValue(response, ['mt5_new_account', 'currency']) };
                            MetaTraderUI.setAccountType(acc_type, true);
                            BinarySocket.send({ mt5_login_list: 1 });
                        }
                        MetaTraderUI.loadAction(null, acc_type);
                        getAccountDetails(login, acc_type);
                        if (typeof actions_info[action].success_msg === 'function') {
                            MetaTraderUI.displayMainMessage(actions_info[action].success_msg(response));
                        }
                        if (typeof actions_info[action].onSuccess === 'function') {
                            actions_info[action].onSuccess(response, acc_type);
                        }
                    }
                    MetaTraderUI.enableButton(action);
                });
            });
        }
    };

    return {
        onLoad: onLoad,
        isEligible: isEligible
    };
}();

module.exports = MetaTrader;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var formatMoney = __webpack_require__(7).formatMoney;
var localize = __webpack_require__(2).localize;
var LocalStore = __webpack_require__(6).LocalStore;

var RealityCheckData = function () {
    var reality_object = {};

    var resetInvalid = function resetInvalid() {
        var ack = get('ack');
        var interval = +get('interval');
        if (ack !== 0 && ack !== 1) {
            set('ack', 0);
        }
        if (!interval) {
            set('interval', 600000);
        }
    };

    var summaryData = function summaryData(data) {
        var start_time = moment.utc(new Date(data.start_time * 1000));
        var current_time = moment.utc();

        var session_duration = moment.duration(current_time.diff(start_time));
        var duration_string = localize('[_1] days [_2] hours [_3] minutes', [session_duration.get('days'), session_duration.get('hours'), session_duration.get('minutes')]);

        var turnover = +data.buy_amount + +data.sell_amount;
        var profit_loss = +data.sell_amount - +data.buy_amount;

        return {
            start_time_string: localize('Your trading statistics since [_1].', [start_time.format('YYYY-MM-DD HH:mm:ss') + ' GMT']),
            login_time: start_time.format('YYYY-MM-DD HH:mm:ss') + ' GMT',
            current_time: current_time.format('YYYY-MM-DD HH:mm:ss') + ' GMT',
            session_duration: duration_string,
            loginid: data.loginid,
            currency: data.currency,
            turnover: formatMoney(data.currency, +turnover, 1),
            profit_loss: formatMoney(data.currency, +profit_loss, 1),
            contracts_bought: data.buy_count,
            contracts_sold: data.sell_count,
            open_contracts: data.open_contract_count,
            potential_profit: formatMoney(data.currency, +data.potential_profit, 1)
        };
    };

    var set = function set(key, value) {
        reality_object[key] = value;
        return LocalStore.set('reality_check.' + key, value);
    };

    // use this function to get variables that have values
    var get = function get(key) {
        var value = reality_object[key] || LocalStore.get('reality_check.' + key) || '';
        if (+value === 1 || +value === 0 || value === 'true' || value === 'false') {
            value = JSON.parse(value || false);
        }
        return value;
    };

    var clear_storage_values = function clear_storage_values() {
        // clear all reality check values from local storage
        Object.keys(localStorage).forEach(function (c) {
            if (/^reality_check\./.test(c)) {
                LocalStore.set(c, '');
            }
        });
    };

    return {
        resetInvalid: resetInvalid,
        summaryData: summaryData,
        set: set,
        get: get,

        clear: clear_storage_values
    };
}();

module.exports = RealityCheckData;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(166);

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = __webpack_require__(9);

var _moment2 = _interopRequireDefault(_moment);

var _tooltip = __webpack_require__(362);

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fieldset = function (_React$PureComponent) {
    _inherits(Fieldset, _React$PureComponent);

    function Fieldset() {
        _classCallCheck(this, Fieldset);

        return _possibleConstructorReturn(this, (Fieldset.__proto__ || Object.getPrototypeOf(Fieldset)).apply(this, arguments));
    }

    _createClass(Fieldset, [{
        key: 'render',
        value: function render() {
            var field_left_class = (0, _classnames2.default)('field-info left', { icon: this.props.icon }, this.props.icon);
            var header_time = void 0;
            if (this.props.time) {
                header_time = (0, _moment2.default)(this.props.time || undefined).utc().format('YYYY-MM-DD HH:mm:ss [GMT]');
            }
            return _react2.default.createElement(
                'fieldset',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'fieldset-header' },
                    _react2.default.createElement(
                        'span',
                        { className: field_left_class },
                        this.props.header
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'field-info right' },
                        header_time,
                        _react2.default.createElement(_tooltip2.default, {
                            alignment: 'left',
                            is_icon: true,
                            message: this.props.tooltip || 'Message goes here.'
                        })
                    )
                ),
                this.props.children
            );
        }
    }]);

    return Fieldset;
}(_react2.default.PureComponent);

exports.default = Fieldset;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _moment = __webpack_require__(9);

var _moment2 = _interopRequireDefault(_moment);

var _dao = __webpack_require__(165);

var _dao2 = _interopRequireDefault(_dao);

var _utility = __webpack_require__(0);

var _localize = __webpack_require__(2);

var _language = __webpack_require__(13);

var _duration = __webpack_require__(371);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContractType = function () {
    var _contract_categories;

    /**
     * components can be undef or an array containing any of: 'start_date', 'barrier', 'last_digit'
     *     ['duration', 'amount'] are omitted, as they're available in all contract types
     */
    var contract_types = {
        rise_fall: { title: (0, _localize.localize)('Rise/Fall'), trade_types: ['CALL', 'PUT'], components: ['start_date'], barrier_count: 0 },
        high_low: { title: (0, _localize.localize)('Higher/Lower'), trade_types: ['CALL', 'PUT'], components: ['barrier'], barrier_count: 1 },
        touch: { title: (0, _localize.localize)('Touch/No Touch'), trade_types: ['ONETOUCH', 'NOTOUCH'], components: ['barrier'] },
        end: { title: (0, _localize.localize)('Ends Between/Ends Outside'), trade_types: ['EXPIRYMISS', 'EXPIRYRANGE'], components: ['barrier'] },
        stay: { title: (0, _localize.localize)('Stays Between/Goes Outside'), trade_types: ['RANGE', 'UPORDOWN'], components: ['barrier'] },
        asian: { title: (0, _localize.localize)('Asians'), trade_types: ['ASIANU', 'ASIAND'], components: [] },
        match_diff: { title: (0, _localize.localize)('Matches/Differs'), trade_types: ['DIGITMATCH', 'DIGITDIFF'], components: ['last_digit'] },
        even_odd: { title: (0, _localize.localize)('Even/Odd'), trade_types: ['DIGITODD', 'DIGITEVEN'], components: [] },
        over_under: { title: (0, _localize.localize)('Over/Under'), trade_types: ['DIGITOVER', 'DIGITUNDER'], components: ['last_digit'] },
        lb_call: { title: (0, _localize.localize)('High-Close'), trade_types: ['LBFLOATCALL'], components: [] },
        lb_put: { title: (0, _localize.localize)('Close-Low'), trade_types: ['LBFLOATPUT'], components: [] },
        lb_high_low: { title: (0, _localize.localize)('High-Low'), trade_types: ['LBHIGHLOW'], components: [] }
    };

    var contract_categories = (_contract_categories = {}, _defineProperty(_contract_categories, (0, _localize.localize)('Up/Down'), ['rise_fall', 'high_low']), _defineProperty(_contract_categories, (0, _localize.localize)('Touch/No Touch'), ['touch']), _defineProperty(_contract_categories, (0, _localize.localize)('In/Out'), ['end', 'stay']), _defineProperty(_contract_categories, (0, _localize.localize)('Asians'), ['asian']), _defineProperty(_contract_categories, (0, _localize.localize)('Digits'), ['match_diff', 'even_odd', 'over_under']), _defineProperty(_contract_categories, (0, _localize.localize)('Lookback'), ['lb_call', 'lb_put', 'lb_high_low']), _contract_categories);

    var available_contract_types = {};
    var available_categories = {};

    var buildContractTypesConfig = function buildContractTypesConfig(symbol) {
        return _dao2.default.getContractsFor(symbol).then(function (r) {
            available_contract_types = {};
            available_categories = (0, _utility.cloneObject)(contract_categories); // To preserve the order (will clean the extra items later in this function)
            r.contracts_for.available.forEach(function (contract) {
                var type = Object.keys(contract_types).find(function (key) {
                    return contract_types[key].trade_types.indexOf(contract.contract_type) !== -1 && (typeof contract_types[key].barrier_count === 'undefined' || +contract_types[key].barrier_count === contract.barriers) // To distinguish betweeen Rise/Fall & Higher/Lower
                    ;
                });

                if (!Exceptions.isExcluded(type)) {
                    if (!available_contract_types[type]) {
                        // extend contract_categories to include what is needed to create the contract list
                        var sub_cats = available_categories[Object.keys(available_categories).find(function (key) {
                            return available_categories[key].indexOf(type) !== -1;
                        })];
                        sub_cats[sub_cats.indexOf(type)] = { value: type, text: (0, _localize.localize)(contract_types[type].title) };

                        // populate available contract types
                        available_contract_types[type] = (0, _utility.cloneObject)(contract_types[type]);
                        available_contract_types[type].config = {};
                    }

                    /*
                    add to this config if a value you are looking for does not exist yet
                    accordingly create a function to retrieve the value
                    config: {
                        has_spot: 1,
                        durations: {
                            min_max: {
                                spot: {
                                    tick: {
                                        min: 5, // value in ticks, as cannot convert to seconds
                                        max: 10,
                                    },
                                    intraday: {
                                        min: 18000, // all values converted to seconds
                                        max: 86400,
                                    },
                                    daily: {
                                        min: 86400,
                                        max: 432000,
                                    },
                                },
                                forward: {
                                    intraday: {
                                        min: 18000,
                                        max: 86400,
                                    },
                                },
                            },
                            units_display: {
                                spot: [
                                    { text: 'ticks', value: 't' },
                                    { text: 'seconds', value: 's' },
                                    { text: 'minutes', value: 'm' },
                                    { text: 'hours', value: 'h' },
                                    { text: 'days', value: 'd' },
                                ],
                                forward: [
                                    { text: 'days', value: 'd' },
                                ],
                            },
                        },
                        forward_starting_dates: [
                            { text: 'Mon - 19 Mar, 2018', open: 1517356800, close: 1517443199 },
                            { text: 'Tue - 20 Mar, 2018', open: 1517443200, close: 1517529599 },
                            { text: 'Wed - 21 Mar, 2018', open: 1517529600, close: 1517615999 },
                        ],
                        trade_types: {
                            'CALL': 'Higher',
                            'PUT': 'Lower',
                        },
                        barriers: {
                            intraday: {
                                high_barrier: '+2.12',
                                low_barrier : '-1.12',
                            },
                            daily: {
                                high_barrier: 1111,
                                low_barrier : 1093,
                            }
                        }
                    }
                    */

                    if (contract.start_type === 'spot') {
                        available_contract_types[type].config.has_spot = 1;
                    }

                    if (contract.min_contract_duration && contract.max_contract_duration) {
                        available_contract_types[type].config.durations = (0, _duration.buildDurationConfig)(available_contract_types[type].config.durations, contract);
                    }

                    if (contract.forward_starting_options) {
                        var forward_starting_options = [];

                        // TODO: handle multiple sessions (right now will create duplicated items in the list)
                        contract.forward_starting_options.forEach(function (option) {
                            forward_starting_options.push({
                                text: _moment2.default.unix(option.open).format('ddd - DD MMM, YYYY'),
                                value: option.open,
                                end: option.close
                            });
                        });

                        available_contract_types[type].config.forward_starting_dates = forward_starting_options;
                    }

                    if (contract.contract_display && contract.contract_type) {
                        var trade_types = available_contract_types[type].config.trade_types || {};

                        trade_types[contract.contract_type] = contract.contract_display;

                        available_contract_types[type].config.trade_types = trade_types;
                    }

                    if (contract.barriers) {
                        if (!available_contract_types[type].config.barriers) {
                            available_contract_types[type].config.barriers = {};
                        }
                        if (!available_contract_types[type].config.barriers[contract.expiry_type]) {
                            available_contract_types[type].config.barriers[contract.expiry_type] = {};
                        }
                        var obj_barrier = {};
                        if (contract.barrier) {
                            obj_barrier.barrier = contract.barrier;
                        } else {
                            if (contract.low_barrier) {
                                obj_barrier.low_barrier = contract.low_barrier;
                            }
                            if (contract.high_barrier) {
                                obj_barrier.high_barrier = contract.high_barrier;
                            }
                        }
                        available_contract_types[type].config.barriers[contract.expiry_type] = obj_barrier;
                    }
                }
            });

            // cleanup categories
            Object.keys(available_categories).forEach(function (key) {
                available_categories[key] = available_categories[key].filter(function (item) {
                    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object';
                });
                if (available_categories[key].length === 0) {
                    delete available_categories[key];
                }
            });
        });
    };

    var getContractValues = function getContractValues(contract_type, contract_expiry_type, duration_unit) {
        var form_components = getComponents(contract_type);
        var obj_trade_types = getTradeTypes(contract_type);
        var obj_start_dates = getStartDates(contract_type);
        var obj_start_type = getStartType(obj_start_dates.start_date);
        var obj_barrier = getBarriers(contract_type, contract_expiry_type);
        var obj_duration_unit = getDurationUnit(duration_unit, contract_type, obj_start_type.contract_start_type);

        var obj_duration_units_list = getDurationUnitsList(contract_type, obj_start_type.contract_start_type);

        return _extends({}, form_components, obj_trade_types, obj_start_dates, obj_start_type, obj_barrier, obj_duration_units_list, obj_duration_unit);
    };

    var getContractType = function getContractType(list, contract_type) {
        var list_arr = Object.keys(list || {}).reduce(function (k, l) {
            return [].concat(_toConsumableArray(k), _toConsumableArray(list[l].map(function (ct) {
                return ct.value;
            })));
        }, []);
        return {
            contract_type: list_arr.indexOf(contract_type) === -1 || !contract_type ? list_arr[0] : contract_type
        };
    };

    var getComponents = function getComponents(c_type) {
        return { form_components: contract_types[c_type].components };
    };

    var getDurationUnitsList = function getDurationUnitsList(contract_type, contract_start_type) {
        var duration_units_list = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'durations', 'units_display', contract_start_type]) || [];

        return { duration_units_list: duration_units_list };
    };

    var getDurationUnit = function getDurationUnit(duration_unit, contract_type, contract_start_type) {
        var duration_units = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'durations', 'units_display', contract_start_type]) || [];
        var arr_units = [];
        duration_units.forEach(function (obj) {
            arr_units.push(obj.value);
        });

        return {
            duration_unit: !duration_unit || arr_units.indexOf(duration_unit) === -1 ? arr_units[0] : duration_unit
        };
    };

    // TODO: use this getter function to dynamically compare min/max versus duration amount
    var getDurationMinMax = function getDurationMinMax(contract_type, contract_start_type, contract_expiry_type) {
        var duration_min_max = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'durations', 'min_max', contract_start_type, contract_expiry_type]) || {};

        return { duration_min_max: duration_min_max };
    };

    var getStartType = function getStartType(start_date) {
        var contract_start_type = start_date === 'now' ? 'spot' : 'forward';

        return { contract_start_type: contract_start_type };
    };

    var getStartDates = function getStartDates(contract_type) {
        var config = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config']);
        var start_dates_list = [];

        if (config.has_spot) {
            start_dates_list.push({ text: (0, _localize.localize)('Now'), value: 'now' });
        }
        if (config.forward_starting_dates) {
            start_dates_list.push.apply(start_dates_list, _toConsumableArray(config.forward_starting_dates));
        }

        var start_date = start_dates_list[0].value;

        return { start_date: start_date, start_dates_list: start_dates_list };
    };

    var getTradeTypes = function getTradeTypes(contract_type) {
        return {
            trade_types: (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'trade_types'])
        };
    };

    var getBarriers = function getBarriers(contract_type, expiry_type) {
        var barriers = (0, _utility.getPropertyValue)(available_contract_types, [contract_type, 'config', 'barriers', expiry_type]) || {};
        var barrier_1 = barriers.barrier || barriers.high_barrier || '';
        var barrier_2 = barriers.low_barrier || '';
        return {
            barrier_1: barrier_1.toString(),
            barrier_2: barrier_2.toString()
        };
    };

    return {
        buildContractTypesConfig: buildContractTypesConfig,
        getContractValues: getContractValues,
        getContractType: getContractType,
        getDurationUnitsList: getDurationUnitsList,
        getDurationUnit: getDurationUnit,
        getDurationMinMax: getDurationMinMax,
        getStartType: getStartType,
        getBarriers: getBarriers,

        getContractCategories: function getContractCategories() {
            return available_categories;
        }
    };
}();

var Exceptions = function () {
    var isIDLanguage = function isIDLanguage() {
        return (0, _language.get)() === 'ID';
    };

    // if the exception value is true, then it is excluded
    var exceptions = {
        even_odd: isIDLanguage,
        over_under: isIDLanguage
    };

    return {
        isExcluded: function isExcluded(key) {
            return exceptions[key] ? exceptions[key]() : false;
        }
    };
}();

exports.default = ContractType;

/***/ }),
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urlLang = __webpack_require__(13).urlLang;
var createElement = __webpack_require__(0).createElement;

var Crowdin = function () {
    /**
     * in-context translation provided at: https://staging.binary.com/translations/
     * and uses 'ach' as pseudo language code
     */
    var isInContextEnvironment = function isInContextEnvironment() {
        return (/^https:\/\/staging\.binary\.com\/translations\//i.test(window.location.href) && /ach/i.test(urlLang())
        );
    };

    /**
     * initialize Crowdin in-context environment
     */
    var init = function init() {
        if (isInContextEnvironment()) {
            var lang = document.querySelector('#topbar ul[id$="_language"]');
            if (lang) lang.setVisibility(0);
            /* eslint-disable no-underscore-dangle */
            window._jipt = [];
            window._jipt.push(['project', 'binary-static']);
            /* eslint-enable no-underscore-dangle */
            if (document.body) {
                document.body.appendChild(createElement('script', { type: 'text/javascript', src: document.location.protocol + '//cdn.crowdin.com/jipt/jipt.js' }));
            }
        }
    };

    return {
        init: init,
        isInContext: isInContextEnvironment
    };
}();

module.exports = Crowdin;

/***/ }),
/* 119 */,
/* 120 */,
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Client = __webpack_require__(4);
var State = __webpack_require__(6).State;

/*
 * get the current active tab if its visible i.e allowed for current parameters
 */
var getActiveTab = function getActiveTab(item) {
    var tab = item || 'currentAnalysisTab';
    var is_chart_allowed = State.get('is_chart_allowed');
    var default_tab = getDefaultTab(is_chart_allowed);
    var selected_tab = sessionStorage.getItem(tab) || (State.get('is_mb_trading') ? 'tab_portfolio' : default_tab);
    var selected_element = document.getElementById(selected_tab);
    if (!selected_element) {
        selected_tab = 'tab_explanation';
        selected_element = document.getElementById(selected_tab);
    }

    if (selected_element && selected_element.classList.contains('invisible') && (item || !(selected_tab === 'tab_portfolio' && !!(Client.isLoggedIn() && State.get('is_mb_trading'))))) {
        selected_tab = default_tab;
        sessionStorage.setItem(tab, selected_tab);
    }

    return selected_tab;
};

var getDefaultTab = function getDefaultTab(is_chart_allowed) {
    return is_chart_allowed ? 'tab_graph' : 'tab_explanation';
};

module.exports = {
    getActiveTab: getActiveTab
};

/***/ }),
/* 122 */,
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Contract = __webpack_require__(50);
var getLookBackFormula = __webpack_require__(29).getFormula;
var isLookback = __webpack_require__(29).isLookback;
var Symbols = __webpack_require__(67);
var Tick = __webpack_require__(36);
var TickDisplay = __webpack_require__(72);
var updateValues = __webpack_require__(73);
var Client = __webpack_require__(4);
var formatMoney = __webpack_require__(7).formatMoney;
var CommonFunctions = __webpack_require__(3);
var localize = __webpack_require__(2).localize;
var padLeft = __webpack_require__(18).padLeft;
var urlFor = __webpack_require__(8).urlFor;
var createElement = __webpack_require__(0).createElement;

/*
 * Purchase object that handles all the functions related to
 * contract purchase response
 */

var Purchase = function () {
    var purchase_data = {};

    var payout_value = void 0,
        cost_value = void 0;

    var display = function display(details) {
        purchase_data = details;

        var receipt = details.buy;
        var passthrough = details.echo_req.passthrough;
        var container = CommonFunctions.getElementById('contract_confirmation_container');
        var message_container = CommonFunctions.getElementById('confirmation_message');
        var heading = CommonFunctions.getElementById('contract_purchase_heading');
        var descr = CommonFunctions.getElementById('contract_purchase_descr');
        var barrier_element = CommonFunctions.getElementById('contract_purchase_barrier');
        var reference = CommonFunctions.getElementById('contract_purchase_reference');
        var chart = CommonFunctions.getElementById('tick_chart');
        var payout = CommonFunctions.getElementById('contract_purchase_payout');
        var cost = CommonFunctions.getElementById('contract_purchase_cost');
        var profit = CommonFunctions.getElementById('contract_purchase_profit');
        var spots = CommonFunctions.getElementById('contract_purchase_spots');
        var confirmation_error = CommonFunctions.getElementById('confirmation_error');
        var contracts_list = CommonFunctions.getElementById('contracts_list');
        var button = CommonFunctions.getElementById('contract_purchase_button');

        var error = details.error;
        var show_chart = !error && passthrough.duration <= 10 && passthrough.duration_unit === 't' && (sessionStorage.formname === 'risefall' || sessionStorage.formname === 'higherlower' || sessionStorage.formname === 'asian');

        contracts_list.style.display = 'none';

        if (error) {
            container.style.display = 'block';
            message_container.hide();
            confirmation_error.show();
            var message = error.message;
            if (/RestrictedCountry/.test(error.code)) {
                var additional_message = '';
                if (/FinancialBinaries/.test(error.code)) {
                    additional_message = localize('Try our [_1]Volatility Indices[_2].', ['<a href="' + urlFor('get-started/volidx-markets') + '" >', '</a>']);
                } else if (/Random/.test(error.code)) {
                    additional_message = localize('Try our other markets.');
                }
                message = error.message + '. ' + additional_message;
            }
            CommonFunctions.elementInnerHtml(confirmation_error, message);
        } else {
            CommonFunctions.getElementById('guideBtn').style.display = 'none';
            container.style.display = 'table-row';
            message_container.show();
            confirmation_error.hide();

            CommonFunctions.elementTextContent(heading, localize('Contract Confirmation'));
            CommonFunctions.elementTextContent(descr, receipt.longcode);
            CommonFunctions.elementTextContent(barrier_element, '');
            CommonFunctions.elementTextContent(reference, localize('Your transaction reference is') + ' ' + receipt.transaction_id);

            var currency = Client.get('currency');
            var formula = void 0,
                multiplier = void 0;
            var contract_type = passthrough.contract_type;

            if (isLookback(contract_type)) {
                multiplier = formatMoney(currency, passthrough.amount, false, 3, 2);
                formula = getLookBackFormula(contract_type, multiplier);
            }

            payout_value = +receipt.payout;
            cost_value = receipt.buy_price;

            var profit_value = payout_value ? formatMoney(currency, payout_value - cost_value) : undefined;

            CommonFunctions.elementInnerHtml(cost, localize('Total Cost') + ' <p>' + formatMoney(currency, cost_value) + '</p>');
            if (isLookback(contract_type)) {
                CommonFunctions.elementInnerHtml(payout, localize('Potential Payout') + ' <p>' + formula + '</p>');
                profit.setVisibility(0);
            } else {
                profit.setVisibility(1);
                CommonFunctions.elementInnerHtml(payout, localize('Potential Payout') + ' <p>' + formatMoney(currency, payout_value) + '</p>');
                CommonFunctions.elementInnerHtml(profit, localize('Potential Profit') + ' <p>' + profit_value + '</p>');
            }

            updateValues.updateContractBalance(receipt.balance_after);

            if (show_chart) {
                chart.show();
            } else {
                chart.hide();
            }

            if (Contract.form() === 'digits') {
                CommonFunctions.elementTextContent(spots, '');
                spots.className = '';
                spots.show();
            } else {
                spots.hide();
            }

            if (Contract.form() !== 'digits' && !show_chart) {
                CommonFunctions.elementTextContent(button, localize('View'));
                button.setAttribute('contract_id', receipt.contract_id);
                button.show();
                $('.open_contract_details').attr('contract_id', receipt.contract_id).setVisibility(1);
            } else {
                button.hide();
                $('.open_contract_details').setVisibility(0);
            }
        }

        if (show_chart) {
            var contract_sentiment = void 0;
            if (passthrough.contract_type === 'CALL' || passthrough.contract_type === 'ASIANU') {
                contract_sentiment = 'up';
            } else {
                contract_sentiment = 'down';
            }

            // calculate number of decimals needed to display tick-chart according to the spot
            // value of the underlying
            var decimal_points = 2;
            var tick_spots = Tick.spots();
            var tick_spot_epochs = Object.keys(tick_spots);
            if (tick_spot_epochs.length > 0) {
                var last_quote = tick_spots[tick_spot_epochs[0]].toString();

                if (last_quote.indexOf('.') !== -1) {
                    decimal_points = last_quote.split('.')[1].length;
                }
            }

            TickDisplay.init({
                contract_sentiment: contract_sentiment,
                symbol: passthrough.symbol,
                barrier: sessionStorage.getItem('formname') === 'higherlower' ? passthrough.barrier : undefined,
                number_of_ticks: passthrough.duration,
                previous_tick_epoch: receipt.start_time,
                contract_category: sessionStorage.getItem('formname') === 'asian' ? 'asian' : 'callput',
                display_symbol: Symbols.getName(passthrough.symbol),
                contract_start: receipt.start_time,
                display_decimals: decimal_points,
                price: passthrough['ask-price'],
                payout: receipt.payout,
                show_contract_result: 1,
                width: $('#confirmation_message').width()
            });
            TickDisplay.resetSpots();
        }
    };

    var updateSpotList = function updateSpotList() {
        if ($('#contract_purchase_spots:hidden').length) {
            return;
        }

        var duration = purchase_data.echo_req && purchase_data.echo_req.passthrough ? purchase_data.echo_req.passthrough.duration : null;

        if (!duration) {
            return;
        }

        var spots = CommonFunctions.getElementById('contract_purchase_spots');
        var spots2 = Tick.spots();
        var epoches = Object.keys(spots2).sort(function (a, b) {
            return a - b;
        });
        CommonFunctions.elementTextContent(spots, '');

        var last_digit = void 0;
        var replace = function replace(d) {
            last_digit = d;return '<strong>' + d + '</strong>';
        };
        for (var s = 0; s < epoches.length; s++) {
            var tick_d = {
                epoch: epoches[s],
                quote: spots2[epoches[s]]
            };

            if (CommonFunctions.isVisible(spots) && tick_d.epoch && tick_d.epoch > purchase_data.buy.start_time) {
                var fragment = createElement('div', { class: 'row' });
                var el1 = createElement('div', { class: 'col', text: localize('Tick') + ' ' + (spots.getElementsByClassName('row').length + 1) });
                fragment.appendChild(el1);

                var el2 = createElement('div', { class: 'col' });
                var date = new Date(tick_d.epoch * 1000);
                var hours = padLeft(date.getUTCHours(), 2, '0');
                var minutes = padLeft(date.getUTCMinutes(), 2, '0');
                var seconds = padLeft(date.getUTCSeconds(), 2, '0');
                CommonFunctions.elementTextContent(el2, [hours, minutes, seconds].join(':'));
                fragment.appendChild(el2);

                var tick = tick_d.quote.replace(/\d$/, replace);
                var el3 = createElement('div', { class: 'col' });
                CommonFunctions.elementInnerHtml(el3, tick);
                fragment.appendChild(el3);

                spots.appendChild(fragment);
                spots.scrollTop = spots.scrollHeight;

                if (last_digit && duration === 1) {
                    var contract_status = void 0,
                        final_price = void 0,
                        pnl = void 0;
                    var pass_contract_type = purchase_data.echo_req.passthrough.contract_type;
                    var pass_barrier = purchase_data.echo_req.passthrough.barrier;

                    if (pass_contract_type === 'DIGITMATCH' && +last_digit === +pass_barrier || pass_contract_type === 'DIGITDIFF' && +last_digit !== +pass_barrier || pass_contract_type === 'DIGITEVEN' && +last_digit % 2 === 0 || pass_contract_type === 'DIGITODD' && +last_digit % 2 || pass_contract_type === 'DIGITOVER' && +last_digit > pass_barrier || pass_contract_type === 'DIGITUNDER' && +last_digit < pass_barrier) {
                        spots.className = 'won';
                        final_price = payout_value;
                        pnl = cost_value;
                        contract_status = localize('This contract won');
                    } else {
                        spots.className = 'lost';
                        final_price = 0;
                        pnl = -cost_value;
                        contract_status = localize('This contract lost');
                    }

                    updateValues.updatePurchaseStatus(final_price, pnl, contract_status);
                }

                duration--;
                if (!duration) {
                    purchase_data.echo_req.passthrough.duration = 0;
                }
            }
        }
    };

    return {
        display: display,
        updateSpotList: updateSpotList
    };
}();

module.exports = Purchase;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = function (_React$PureComponent) {
    _inherits(Dropdown, _React$PureComponent);

    function Dropdown(props) {
        _classCallCheck(this, Dropdown);

        var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, props));

        _this.handleVisibility = _this.handleVisibility.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.setWrapperRef = _this.setWrapperRef.bind(_this);
        _this.handleClickOutside = _this.handleClickOutside.bind(_this);
        _this.state = {
            is_list_visible: false
        };
        return _this;
    }

    _createClass(Dropdown, [{
        key: 'isOneLevel',
        value: function isOneLevel() {
            return Array.isArray(this.props.list);
        }
    }, {
        key: 'getDisplayText',
        value: function getDisplayText(list, value) {
            var findInArray = function findInArray(arr_list) {
                return (arr_list.find(function (item) {
                    return item.value === value;
                }) || {}).text;
            };
            var text = '';
            if (this.isOneLevel(list)) {
                text = findInArray(list);
            } else {
                Object.keys(list).some(function (key) {
                    text = findInArray(list[key]);
                    return text;
                });
            }
            return text;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(item) {
            if (item.value !== this.props.value) {
                this.props.onChange({ target: { name: this.props.name, value: item.value } });
            }
            this.handleVisibility();
        }
    }, {
        key: 'setWrapperRef',
        value: function setWrapperRef(node) {
            this.wrapper_ref = node;
        }
    }, {
        key: 'scrollToggle',
        value: function scrollToggle(state) {
            this.is_open = state;
            // Used to disable y-scroll on body - disabled in this component for now
            // document.body.classList.toggle('no-scroll', this.is_open);
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside(event) {
            if (this.wrapper_ref && !this.wrapper_ref.contains(event.target) && this.state.is_list_visible) {
                this.setState({ is_list_visible: false });
                this.scrollToggle(this.state.is_list_visible);
            }
        }
    }, {
        key: 'handleVisibility',
        value: function handleVisibility() {
            this.setState({ is_list_visible: !this.state.is_list_visible });
            this.scrollToggle(!this.state.is_list_visible);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            if (this.props.is_nativepicker) {
                return _react2.default.createElement(NativeSelect, {
                    name: this.props.name,
                    value: this.props.value,
                    list: this.props.list,
                    onChange: this.props.onChange
                });
            }
            return _react2.default.createElement(
                'div',
                {
                    ref: this.setWrapperRef,
                    className: 'dropdown-container ' + (this.props.className ? this.props.className : '') + ' ' + (this.state.is_list_visible ? 'show' : '')
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'dropdown-display ' + (this.state.is_list_visible ? 'clicked' : ''),
                        onClick: this.handleVisibility,
                        onBlur: this.handleVisibility
                    },
                    _react2.default.createElement(
                        'span',
                        { name: this.props.name, value: this.props.value },
                        this.getDisplayText(this.props.list, this.props.value)
                    )
                ),
                _react2.default.createElement('span', { className: 'select-arrow' }),
                _react2.default.createElement(
                    'div',
                    { className: 'dropdown-list' },
                    _react2.default.createElement(
                        'div',
                        { className: 'list-container' },
                        this.isOneLevel(this.props.list) ? _react2.default.createElement(Items, {
                            items: this.props.list,
                            name: this.props.name,
                            value: this.props.value,
                            handleSelect: this.handleSelect,
                            type: this.props.type || undefined
                        }) : Object.keys(this.props.list).map(function (key) {
                            return _react2.default.createElement(
                                _react2.default.Fragment,
                                { key: key },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'list-label' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        key
                                    )
                                ),
                                _react2.default.createElement(Items, {
                                    items: _this2.props.list[key],
                                    name: _this2.props.name,
                                    value: _this2.props.value,
                                    handleSelect: _this2.handleSelect
                                })
                            );
                        })
                    )
                )
            );
        }
    }]);

    return Dropdown;
}(_react2.default.PureComponent);

var Items = function Items(_ref) {
    var items = _ref.items,
        name = _ref.name,
        value = _ref.value,
        handleSelect = _ref.handleSelect,
        type = _ref.type;
    return items.map(function (item, idx) {
        return _react2.default.createElement(
            _react2.default.Fragment,
            { key: idx },
            _react2.default.createElement(
                'div',
                {
                    className: 'list-item ' + (value === item.value ? 'selected' : ''),
                    key: idx,
                    name: name,
                    value: item.value,
                    'data-end': type === 'date' && item.end ? item.end : undefined,
                    onClick: handleSelect.bind(null, item)
                },
                _react2.default.createElement(
                    'span',
                    null,
                    item.text
                )
            )
        );
    });
};

var NativeSelect = function NativeSelect(_ref2) {
    var name = _ref2.name,
        value = _ref2.value,
        list = _ref2.list,
        onChange = _ref2.onChange;
    return _react2.default.createElement(
        'div',
        { className: 'select-wrapper' },
        _react2.default.createElement(
            'select',
            { name: name, value: value, onChange: onChange },
            Array.isArray(list) ? list.map(function (item, idx) {
                return _react2.default.createElement(
                    'option',
                    { key: idx, value: item.value },
                    item.text
                );
            }) : Object.keys(list).map(function (key) {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    { key: key },
                    _react2.default.createElement(
                        'optgroup',
                        { label: key },
                        list[key].map(function (item, idx) {
                            return _react2.default.createElement(
                                'option',
                                { key: idx, value: item.value },
                                item.text
                            );
                        })
                    )
                );
            })
        )
    );
};

exports.default = Dropdown;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BinaryLink = exports.BinaryRoutes = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(272);

var _client = __webpack_require__(4);

var _client2 = _interopRequireDefault(_client);

var _login = __webpack_require__(41);

var _localize = __webpack_require__(2);

var _trade_app = __webpack_require__(386);

var _trade_app2 = _interopRequireDefault(_trade_app);

var _statement = __webpack_require__(367);

var _statement2 = _interopRequireDefault(_statement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var routes = [{ path: '/', component: _trade_app2.default, exact: true }, { path: '/statement', component: _statement2.default, is_authenticated: true }];

var RouteWithSubRoutes = function RouteWithSubRoutes(route) {
    return route.is_authenticated && !_client2.default.isLoggedIn() ? // TODO: update the message style
    _react2.default.createElement(
        'a',
        { href: 'javascript:;', onClick: _login.redirectToLogin },
        (0, _localize.localize)('Please login to view this page.')
    ) : _react2.default.createElement(_reactRouterDom.Route, {
        exact: route.exact,
        path: route.path,
        render: function render(props) {
            return _react2.default.createElement(route.component, _extends({}, props, { routes: route.routes }));
        }
    });
};

var BinaryRoutes = exports.BinaryRoutes = function BinaryRoutes() {
    return routes.map(function (route, idx) {
        return _react2.default.createElement(RouteWithSubRoutes, _extends({ key: idx }, route));
    });
};

var BinaryLink = function BinaryLink(_ref) {
    var to = _ref.to,
        children = _ref.children,
        props = _objectWithoutProperties(_ref, ['to', 'children']);

    var path = /^\//.test(to) ? to : '/' + (to || ''); // Default to '/'
    var route = routes.find(function (r) {
        return r.path === path;
    });
    if (to && route) {
        return _react2.default.createElement(
            _reactRouterDom.NavLink,
            _extends({ to: path, activeClassName: 'active', exact: route.exact }, props),
            children
        );
    } else if (!to) {
        return _react2.default.createElement(
            'a',
            _extends({ href: 'javascript:;' }, props),
            children
        );
    }
    // else
    throw new Error('Route not found: ' + to);
};
exports.BinaryLink = BinaryLink;

/***/ }),
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Header = __webpack_require__(27);
var BinarySocket = __webpack_require__(5);
var BinarySocketGeneral = __webpack_require__(151);
var getElementById = __webpack_require__(3).getElementById;
var localize = __webpack_require__(2).localize;

/*
 * Monitors the network status and initialises the WebSocket connection
 * 1. online : check the WS status (init/send: blink after timeout, open/message: online)
 * 2. offline: it is offline
 */
var NetworkMonitor = function () {
    var _pending_timeouts;

    var status_config = {
        online: { class: 'online', tooltip: 'Online' },
        offline: { class: 'offline', tooltip: 'Offline' },
        blinking: { class: 'blinker', tooltip: 'Connecting to server' }
    };
    var pendings = {};
    var pending_keys = {
        ws_init: 'ws_init',
        ws_request: 'ws_request'
    };
    var pending_timeouts = (_pending_timeouts = {}, _defineProperty(_pending_timeouts, pending_keys.ws_init, 5000), _defineProperty(_pending_timeouts, pending_keys.ws_request, 10000), _pending_timeouts);

    var ws_config = void 0,
        el_status = void 0,
        el_tooltip = void 0,
        network_status = void 0;

    var init = function init() {
        ws_config = $.extend({ wsEvent: wsEvent, isOnline: isOnline }, BinarySocketGeneral.initOptions());
        el_status = getElementById('network_status');
        el_tooltip = el_status.parentNode;

        if ('onLine' in navigator) {
            window.addEventListener('online', setStatus);
            window.addEventListener('offline', setStatus);
        } else {
            // if not supported, default to online and fallback to WS checks
            navigator.onLine = true;
        }

        if (isOnline()) {
            BinarySocket.init(ws_config);
        }

        setStatus(isOnline() ? 'online' : 'offline');
    };

    var isOnline = function isOnline() {
        return navigator.onLine;
    };

    var wsReconnect = function wsReconnect() {
        if (isOnline() && BinarySocket.hasReadyState(2, 3)) {
            // CLOSING or CLOSED
            BinarySocket.init(ws_config);
        } else {
            BinarySocket.send({ ping: 1 }); // trigger a request to get stable status sooner
        }
    };

    var setStatus = function setStatus(status) {
        if (!isOnline()) {
            network_status = 'offline';
        } else if (pending_keys[status] || network_status === 'offline') {
            network_status = 'blinking';
            wsReconnect();
        } else {
            network_status = 'online';
        }

        updateHeaderNotification();

        if (el_status && el_tooltip) {
            el_status.setAttribute('class', status_config[network_status].class);
            el_tooltip.setAttribute('data-balloon', localize('Network status') + ': ' + localize(status_config[network_status].tooltip));
        }
    };

    var updateHeaderNotification = function updateHeaderNotification() {
        var connection_error_code = 'CONNECTION_ERROR';
        if (isOnline()) {
            Header.hideNotification(connection_error_code);
        } else {
            Header.displayNotification(localize('Connection error: Please check your internet connection.'), true, connection_error_code);
        }
    };

    var ws_events_map = {
        init: function init() {
            return setPending(pending_keys.ws_init);
        },
        open: function open() {
            return clearPendings(pending_keys.ws_init);
        },
        send: function send() {
            return setPending(pending_keys.ws_request);
        },
        message: function message() {
            return clearPendings();
        },
        close: function close() {
            return setPending(pending_keys.ws_init);
        }
    };

    var wsEvent = function wsEvent(event) {
        if (typeof ws_events_map[event] === 'function') {
            ws_events_map[event]();
        }
    };

    var setPending = function setPending(key) {
        if (!pendings[key]) {
            pendings[key] = setTimeout(function () {
                pendings[key] = undefined;
                setStatus(key);
            }, pending_timeouts[key]);
        }
    };

    var clearPendings = function clearPendings(key) {
        var clear = function clear(k) {
            clearTimeout(pendings[k]);
            pendings[k] = undefined;
            if (k === pending_keys.ws_request) {
                setStatus('online');
            }
        };

        if (key) {
            clear(key);
        } else {
            Object.keys(pendings).forEach(clear);
        }
    };

    return {
        init: init,
        wsEvent: wsEvent
    };
}();

module.exports = NetworkMonitor;

/***/ }),
/* 144 */,
/* 145 */,
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mellt = __webpack_require__(147);
var localize = __webpack_require__(2).localize;

var checkPassword = function checkPassword(password_selector) {
    var el_password = document.querySelector(password_selector);
    if (!el_password) {
        return;
    }

    var div = el_password.parentNode.querySelector('.days_to_crack') || document.createElement('div');

    var daysToCrack = Mellt.checkPassword(el_password.value.trim());
    if (daysToCrack < 0) {
        div.textContent = localize('The password you entered is one of the world\'s most commonly used passwords. You should not be using this password.');
    } else {
        var years = void 0;
        if (daysToCrack > 365) {
            years = Math.round(daysToCrack / 365 * 10) / 10;
            if (years > 1000000) {
                years = Math.round(years / 1000000 * 10) / 10 + ' ' + localize('million');
            } else if (years > 1000) {
                years = Math.round(years / 1000) + ' ' + localize('thousand');
            }
        }
        div.textContent = localize('Hint: it would take approximately [_1][_2] to crack this password.', [daysToCrack === 1000000000 ? '>' : '', years ? years + ' ' + localize('years') : daysToCrack + ' ' + localize('days')]);
    }
    div.className = 'days_to_crack fill-bg-color hint ' + (daysToCrack < 30 ? 'red' : 'green');
    el_password.parentNode.appendChild(div);
};

var removeCheck = function removeCheck(password_selector) {
    var el_message = document.querySelector(password_selector).parentNode.querySelector('.days_to_crack');
    if (el_message) {
        el_message.remove();
    }
};

module.exports = {
    removeCheck: removeCheck,
    checkPassword: checkPassword
};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CommonPasswords = __webpack_require__(148);

/**
 * Mellt
 *
 * Tests the strength of a password by calculating how long it would take to
 * brute force it.
 *
 * @version 0.1.0
 * @link http://mel.lt/ The homepage for this script.
 * @link http://www.hammerofgod.com/passwordcheck.aspx Much of this is based
 * on the description of Thor's Godly Privacy password strength checker,
 * however the actual code below is all my own.
 * @link http://xato.net/passwords/more-top-worst-passwords/ The included
 * common passwords list is from Mark Burnett's password collection (which
 * is excellent). You can of course use your own password file instead.
 */
var Mellt = function () {

    // We're making some guesses here about human nature (again much of this is
    // based on the TGP password strength checker, and Timothy "Thor" Mullen
    // deserves the credit for the thinking behind this). Basically we're combining
    // what we know about users (SHIFT+numbers are more common than other
    // punctuation for example) combined with how an attacker will attack a
    // password (most common letters first, expanding outwards).
    //
    // If you want to support passwords that use non-english characters, and
    // your attacker knows this (for example, a Russian site would be expected
    // to contain passwords in Russian characters) add your characters to one of
    // the sets below, or create new sets and insert them in the right places.
    var character_sets = ["0123456789", "abcdefghijklmnopqrstuvwxyz", "abcdefghijklmnopqrstuvwxyz0123456789", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+", "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+[]\"{}|;':,./<>?`~"];

    /**
     * Tests password strength by simulating how long it would take a cracker to
     * brute force your password.
     *
     * Also optionally tests against a list of common passwords (contained in an
     * external file) to weed out things like "password", which from a pure brute
     * force perspective would be harder to break if it wasn't so common.
     *
     * The character sets being used in this checker assume English (ASCII)
     * characters (no umlauts for example). If you run a non-english site, and you
     * suspect the crackers will realize this, you may want to modify the
     * character set to include the characters in your language.
     *
     * @param password string, The password to test the strength of
     * @return number Returns a number specifying how many days it would take
     * to brute force the password (at 1 billion checks a second) or -1 to
     * indicate the password was found in the common passwords file. Obviously if
     * they don't have direct access to the hashed passwords this time would be
     * longer, and even then most computers (at the time of this writing) won't be
     * able to test 1 billion hashes a second, but this function measures worst
     * case scenario, so... I would recommend you require at least 30 days to brute
     * force a password, obviously more if you're a bank or other secure system.
     * @throws Exception If an error is encountered.
     */
    var checkPassword = function checkPassword(password) {

        // First check passwords in the common password file if available.
        // We do this because "password" takes 129 seconds, but is the first
        // thing an attacker will try.
        if (CommonPasswords.find(function (pass) {
            return pass === password.toLowerCase();
        })) {
            // If their password exists in the common file, then it's
            // zero time to crack this terrible password.
            return -1;
        }

        // Figure out which character set the password is using (based on the most "complex" character in it).
        var base = '';
        var base_key = null;
        var found_char = void 0;

        var _loop = function _loop(i) {
            found_char = false;
            character_sets.some(function (character_set, idx) {
                if (base_key <= idx && character_set.indexOf(password[i]) > -1) {
                    base_key = idx;
                    base = character_set;
                    found_char = true;
                    return true;
                }
                return false;
            });
            // If the character we were looking for wasn't anywhere in any of the
            // character sets, assign the largest (last) character set as default.
            if (!found_char) {
                base = character_sets[character_sets.length - 1];
                return "break";
            }
        };

        for (var i = 0; i < password.length; i++) {
            var _ret = _loop(i);

            if (_ret === "break") break;
        }

        // Starting at the first character, figure out it's position in the character set
        // and how many attempts will take to get there. For example, say your password
        // was an integer (a bank card PIN number for example):
        // 0 (or 0000 if you prefer) would be the very first password they attempted by the attacker.
        // 9999 would be the last password they attempted (assuming 4 characters).
        // Thus a password/PIN of 6529 would take 6529 attempts until the attacker found
        // the proper combination. The same logic words for alphanumeric passwords, just
        // with a larger number of possibilities for each position in the password. The
        // key thing to note is the attacker doesn't need to test the entire range (every
        // possible combination of all characters) they just need to get to the point in
        // the list of possibilities that is your password. They can (in this example)
        // ignore anything between 6530 and 9999. Using this logic, 'aaa' would be a worse
        // password than 'zzz', because the attacker would encounter 'aaa' first.
        var attempts = 0;
        for (var i = 0; i < password.length; i++) {
            // We power up to the reverse position in the string. For example, if we're trying
            // to hack the 4 character PING code in the example above:
            // First number * (number of characters possible in the charset ^ length of password)
            // ie: 6 * (10^4) = 6000
            // then add that same equation for the second number:
            // 5 * (10^3) = 500
            // then the third numbers
            // 2 * (10^2) = 20
            // and add on the last number
            // 9
            // Totals: 6000 + 500 + 20 + 9 = 6529 attempts before we encounter the correct password.
            var power_of = password.length - i - 1;
            // Character position within the base set. We add one on because strpos is base
            // 0, we want base 1.
            var char_at_position = base.indexOf(password[i]) + 1;
            // If we're at the last character, simply add it's position in the character set
            // this would be the "9" in the pin code example above.
            if (power_of === 0) {
                attempts += char_at_position;
            }
            // Otherwise we need to iterate through all the other characters positions to
            // get here. For example, to find the 5 in 25 we can't just guess 2 and then 5
            // (even though Hollywood seems to insist this is possible), we need to try 0,1,
            // 2,3...15,16,17...23,24,25 (got it).
            else {
                    // This means we have to try every combination of values up to this point for
                    // all previous characters. Which means we need to iterate through the entire
                    // character set, X times, where X is our position -1. Then we need to multiply
                    // that by this character's position.

                    // Multiplier is the (10^4) or (10^3), etc in the pin code example above.
                    // New attempts is the number of attempts we're adding for this position.
                    // Add that on to our existing number of attempts.
                    attempts += char_at_position * Math.pow(base.length, power_of);
                }
        }

        // We can (worst case) try a billion passwords a second. Calculate how many days it
        // will take us to get to the password.
        // This allows us to calculate a number of days to crack. We use days because anything
        // that can be cracked in less than a day is basically useless, so there's no point in
        // having a smaller granularity (hours for example).
        var days = attempts / (1000000000 * 60 * 60 * 24);

        // If it's going to take more than a billion days to crack, just return a billion. This
        // helps when code outside this function isn't using bcmath. Besides, if the password
        // can survive 2.7 million years it's probably ok.
        return days > 1000000000 ? 1000000000 : Math.round(days);
    };

    return {
        checkPassword: checkPassword
    };
}();

module.exports = Mellt;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CommonPasswords = ["password", "123456", "12345678", "1234", "qwerty", "12345", "dragon", "pussy", "baseball", "football", "letmein", "monkey", "696969", "abc123", "mustang", "michael", "shadow", "master", "jennifer", "111111", "2000", "jordan", "superman", "harley", "1234567", "fuckme", "hunter", "fuckyou", "trustno1", "ranger", "buster", "thomas", "tigger", "robert", "soccer", "fuck", "batman", "test", "pass", "killer", "hockey", "george", "charlie", "andrew", "michelle", "love", "sunshine", "jessica", "asshole", "6969", "pepper", "daniel", "access", "123456789", "654321", "joshua", "maggie", "starwars", "silver", "william", "dallas", "yankees", "123123", "ashley", "666666", "hello", "amanda", "orange", "biteme", "freedom", "computer", "sexy", "thunder", "nicole", "ginger", "heather", "hammer", "summer", "corvette", "taylor", "fucker", "austin", "1111", "merlin", "matthew", "121212", "golfer", "cheese", "princess", "martin", "chelsea", "patrick", "richard", "diamond", "yellow", "bigdog", "secret", "asdfgh", "sparky", "cowboy", "camaro", "anthony", "matrix", "falcon", "iloveyou", "bailey", "guitar", "jackson", "purple", "scooter", "phoenix", "aaaaaa", "morgan", "tigers", "porsche", "mickey", "maverick", "cookie", "nascar", "peanut", "justin", "131313", "money", "horny", "samantha", "panties", "steelers", "joseph", "snoopy", "boomer", "whatever", "iceman", "smokey", "gateway", "dakota", "cowboys", "eagles", "chicken", "dick", "black", "zxcvbn", "please", "andrea", "ferrari", "knight", "hardcore", "melissa", "compaq", "coffee", "booboo", "bitch", "johnny", "bulldog", "xxxxxx", "welcome", "james", "player", "ncc1701", "wizard", "scooby", "charles", "junior", "internet", "bigdick", "mike", "brandy", "tennis", "blowjob", "banana", "monster", "spider", "lakers", "miller", "rabbit", "enter", "mercedes", "brandon", "steven", "fender", "john", "yamaha", "diablo", "chris", "boston", "tiger", "marine", "chicago", "rangers", "gandalf", "winter", "bigtits", "barney", "edward", "raiders", "porn", "badboy", "blowme", "spanky", "bigdaddy", "johnson", "chester", "london", "midnight", "blue", "fishing", "000000", "hannah", "slayer", "11111111", "rachel", "sexsex", "redsox", "thx1138", "asdf", "marlboro", "panther", "zxcvbnm", "arsenal", "oliver", "qazwsx", "mother", "victoria", "7777777", "jasper", "angel", "david", "winner", "crystal", "golden", "butthead", "viking", "jack", "iwantu", "shannon", "murphy", "angels", "prince", "cameron", "girls", "madison", "wilson", "carlos", "hooters", "willie", "startrek", "captain", "maddog", "jasmine", "butter", "booger", "angela", "golf", "lauren", "rocket", "tiffany", "theman", "dennis", "liverpoo", "flower", "forever", "green", "jackie", "muffin", "turtle", "sophie", "danielle", "redskins", "toyota", "jason", "sierra", "winston", "debbie", "giants", "packers", "newyork", "jeremy", "casper", "bubba", "112233", "sandra", "lovers", "mountain", "united", "cooper", "driver", "tucker", "helpme", "fucking", "pookie", "lucky", "maxwell", "8675309", "bear", "suckit", "gators", "5150", "222222", "shithead", "fuckoff", "jaguar", "monica", "fred", "happy", "hotdog", "tits", "gemini", "lover", "xxxxxxxx", "777777", "canada", "nathan", "victor", "florida", "88888888", "nicholas", "rosebud", "metallic", "doctor", "trouble", "success", "stupid", "tomcat", "warrior", "peaches", "apples", "fish", "qwertyui", "magic", "buddy", "dolphins", "rainbow", "gunner", "987654", "freddy", "alexis", "braves", "cock", "2112", "1212", "cocacola", "xavier", "dolphin", "testing", "bond007", "member", "calvin", "voodoo", "7777", "samson", "alex", "apollo", "fire", "tester", "walter", "beavis", "voyager", "peter", "porno", "bonnie", "rush2112", "beer", "apple", "scorpio", "jonathan", "skippy", "sydney", "scott", "red123", "power", "gordon", "travis", "beaver", "star", "jackass", "flyers", "boobs", "232323", "zzzzzz", "steve", "rebecca", "scorpion", "doggie", "legend", "ou812", "yankee", "blazer", "bill", "runner", "birdie", "bitches", "555555", "parker", "topgun", "asdfasdf", "heaven", "viper", "animal", "2222", "bigboy", "4444", "arthur", "baby", "private", "godzilla", "donald", "williams", "lifehack", "phantom", "dave", "rock", "august", "sammy", "cool", "brian", "platinum", "jake", "bronco", "paul", "mark", "frank", "heka6w2", "copper", "billy", "cumshot", "garfield", "willow", "cunt", "little", "carter", "slut", "albert", "69696969", "kitten", "super", "jordan23", "eagle1", "shelby", "america", "11111", "jessie", "house", "free", "123321", "chevy", "bullshit", "white", "broncos", "horney", "surfer", "nissan", "999999", "saturn", "airborne", "elephant", "marvin", "shit", "action", "adidas", "qwert", "kevin", "1313", "explorer", "walker", "police", "christin", "december", "benjamin", "wolf", "sweet", "therock", "king", "online", "dickhead", "brooklyn", "teresa", "cricket", "sharon", "dexter", "racing", "penis", "gregory", "0000", "teens", "redwings", "dreams", "michigan", "hentai", "magnum", "87654321", "nothing", "donkey", "trinity", "digital", "333333", "stella", "cartman", "guinness", "123abc", "speedy", "buffalo", "kitty", "pimpin", "eagle", "einstein", "kelly", "nelson", "nirvana", "vampire", "xxxx", "playboy", "louise", "pumpkin", "snowball", "test123", "girl", "sucker", "mexico", "beatles", "fantasy", "ford", "gibson", "celtic", "marcus", "cherry", "cassie", "888888", "natasha", "sniper", "chance", "genesis", "hotrod", "reddog", "alexande", "college", "jester", "passw0rd", "bigcock", "smith", "lasvegas", "carmen", "slipknot", "3333", "death", "kimberly", "1q2w3e", "eclipse", "1q2w3e4r", "stanley", "samuel", "drummer", "homer", "montana", "music", "aaaa", "spencer", "jimmy", "carolina", "colorado", "creative", "hello1", "rocky", "goober", "friday", "bollocks", "scotty", "abcdef", "bubbles", "hawaii", "fluffy", "mine", "stephen", "horses", "thumper", "5555", "pussies", "darkness", "asdfghjk", "pamela", "boobies", "buddha", "vanessa", "sandman", "naughty", "douglas", "honda", "matt", "azerty", "6666", "shorty", "money1", "beach", "loveme", "4321", "simple", "poohbear", "444444", "badass", "destiny", "sarah", "denise", "vikings", "lizard", "melanie", "assman", "sabrina", "nintendo", "water", "good", "howard", "time", "123qwe", "november", "xxxxx", "october", "leather", "bastard", "young", "101010", "extreme", "hard", "password1", "vincent", "pussy1", "lacrosse", "hotmail", "spooky", "amateur", "alaska", "badger", "paradise", "maryjane", "poop", "crazy", "mozart", "video", "russell", "vagina", "spitfire", "anderson", "norman", "eric", "cherokee", "cougar", "barbara", "long", "420420", "family", "horse", "enigma", "allison", "raider", "brazil", "blonde", "jones", "55555", "dude", "drowssap", "jeff", "school", "marshall", "lovely", "1qaz2wsx", "jeffrey", "caroline", "franklin", "booty", "molly", "snickers", "leslie", "nipples", "courtney", "diesel", "rocks", "eminem", "westside", "suzuki", "daddy", "passion", "hummer", "ladies", "zachary", "frankie", "elvis", "reggie", "alpha", "suckme", "simpson", "patricia", "147147", "pirate", "tommy", "semperfi", "jupiter", "redrum", "freeuser", "wanker", "stinky", "ducati", "paris", "natalie", "babygirl", "bishop", "windows", "spirit", "pantera", "monday", "patches", "brutus", "houston", "smooth", "penguin", "marley", "forest", "cream", "212121", "flash", "maximus", "nipple", "bobby", "bradley", "vision", "pokemon", "champion", "fireman", "indian", "softball", "picard", "system", "clinton", "cobra", "enjoy", "lucky1", "claire", "claudia", "boogie", "timothy", "marines", "security", "dirty", "admin", "wildcats", "pimp", "dancer", "hardon", "veronica", "fucked", "abcd1234", "abcdefg", "ironman", "wolverin", "remember", "great", "freepass", "bigred", "squirt", "justice", "francis", "hobbes", "kermit", "pearljam", "mercury", "domino", "9999", "denver", "brooke", "rascal", "hitman", "mistress", "simon", "tony", "bbbbbb", "friend", "peekaboo", "naked", "budlight", "electric", "sluts", "stargate", "saints", "bondage", "brittany", "bigman", "zombie", "swimming", "duke", "qwerty1", "babes", "scotland", "disney", "rooster", "brenda", "mookie", "swordfis", "candy", "duncan", "olivia", "hunting", "blink182", "alicia", "8888", "samsung", "bubba1", "whore", "virginia", "general", "passport", "aaaaaaaa", "erotic", "liberty", "arizona", "jesus", "abcd", "newport", "skipper", "rolltide", "balls", "happy1", "galore", "christ", "weasel", "242424", "wombat", "digger", "classic", "bulldogs", "poopoo", "accord", "popcorn", "turkey", "jenny", "amber", "bunny", "mouse", "007007", "titanic", "liverpool", "dreamer", "everton", "friends", "chevelle", "carrie", "gabriel", "psycho", "nemesis", "burton", "pontiac", "connor", "eatme", "lickme", "roland", "cumming", "mitchell", "ireland", "lincoln", "arnold", "spiderma", "patriots", "goblue", "devils", "eugene", "empire", "asdfg", "cardinal", "brown", "shaggy", "froggy", "qwer", "kawasaki", "kodiak", "people", "phpbb", "light", "54321", "kramer", "chopper", "hooker", "honey", "whynot", "lesbian", "lisa", "baxter", "adam", "snake", "teen", "ncc1701d", "qqqqqq", "airplane", "britney", "avalon", "sandy", "sugar", "sublime", "stewart", "wildcat", "raven", "scarface", "elizabet", "123654", "trucks", "wolfpack", "pervert", "lawrence", "raymond", "redhead", "american", "alyssa", "bambam", "movie", "woody", "shaved", "snowman", "tiger1", "chicks", "raptor", "1969", "stingray", "shooter", "france", "stars", "madmax", "kristen", "sports", "jerry", "789456", "garcia", "simpsons", "lights", "ryan", "looking", "chronic", "alison", "hahaha", "packard", "hendrix", "perfect", "service", "spring", "srinivas", "spike", "katie", "252525", "oscar", "brother", "bigmac", "suck", "single", "cannon", "georgia", "popeye", "tattoo", "texas", "party", "bullet", "taurus", "sailor", "wolves", "panthers", "japan", "strike", "flowers", "pussycat", "chris1", "loverboy", "berlin", "sticky", "marina", "tarheels", "fisher", "russia", "connie", "wolfgang", "testtest", "mature", "bass", "catch22", "juice", "michael1", "nigger", "159753", "women", "alpha1", "trooper", "hawkeye", "head", "freaky", "dodgers", "pakistan", "machine", "pyramid", "vegeta", "katana", "moose", "tinker", "coyote", "infinity", "inside", "pepsi", "letmein1", "bang", "control", "hercules", "morris", "james1", "tickle", "outlaw", "browns", "billybob", "pickle", "test1", "michele", "antonio", "sucks", "pavilion", "changeme", "caesar", "prelude", "tanner", "adrian", "darkside", "bowling", "wutang", "sunset", "robbie", "alabama", "danger", "zeppelin", "juan", "rusty", "pppppp", "nick", "2001", "ping", "darkstar", "madonna", "qwe123", "bigone", "casino", "cheryl", "charlie1", "mmmmmm", "integra", "wrangler", "apache", "tweety", "qwerty12", "bobafett", "simone", "none", "business", "sterling", "trevor", "transam", "dustin", "harvey", "england", "2323", "seattle", "ssssss", "rose", "harry", "openup", "pandora", "pussys", "trucker", "wallace", "indigo", "storm", "malibu", "weed", "review", "babydoll", "doggy", "dilbert", "pegasus", "joker", "catfish", "flipper", "valerie", "herman", "fuckit", "detroit", "kenneth", "cheyenne", "bruins", "stacey", "smoke", "joey", "seven", "marino", "fetish", "xfiles", "wonder", "stinger", "pizza", "babe", "pretty", "stealth", "manutd", "gracie", "gundam", "cessna", "longhorn", "presario", "mnbvcxz", "wicked", "mustang1", "victory", "21122112", "shelly", "awesome", "athena", "q1w2e3r4", "help", "holiday", "knicks", "street", "redneck", "12341234", "casey", "gizmo", "scully", "dragon1", "devildog", "triumph", "eddie", "bluebird", "shotgun", "peewee", "ronnie", "angel1", "daisy", "special", "metallica", "madman", "country", "impala", "lennon", "roscoe", "omega", "access14", "enterpri", "miranda", "search", "smitty", "blizzard", "unicorn", "tight", "rick", "ronald", "asdf1234", "harrison", "trigger", "truck", "danny", "home", "winnie", "beauty", "thailand", "1234567890", "cadillac", "castle", "tyler", "bobcat", "buddy1", "sunny", "stones", "asian", "freddie", "chuck", "butt", "loveyou", "norton", "hellfire", "hotsex", "indiana", "short", "panzer", "lonewolf", "trumpet", "colors", "blaster", "12121212", "fireball", "logan", "precious", "aaron", "elaine", "jungle", "atlanta", "gold", "corona", "curtis", "nikki", "polaris", "timber", "theone", "baller", "chipper", "orlando", "island", "skyline", "dragons", "dogs", "benson", "licker", "goldie", "engineer", "kong", "pencil", "basketba", "open", "hornet", "world", "linda", "barbie", "chan", "farmer", "valentin", "wetpussy", "indians", "larry", "redman", "foobar", "travel", "morpheus", "bernie", "target", "141414", "hotstuff", "photos", "laura", "savage", "holly", "rocky1", "fuck_inside", "dollar", "turbo", "design", "newton", "hottie", "moon", "202020", "blondes", "4128", "lestat", "avatar", "future", "goforit", "random", "abgrtyu", "jjjjjj", "cancer", "q1w2e3", "smiley", "goldberg", "express", "virgin", "zipper", "wrinkle1", "stone", "andy", "babylon", "dong", "powers", "consumer", "dudley", "monkey1", "serenity", "samurai", "99999999", "bigboobs", "skeeter", "lindsay", "joejoe", "master1", "aaaaa", "chocolat", "christia", "birthday", "stephani", "tang", "1234qwer", "alfred", "ball", "98765432", "maria", "sexual", "maxima", "77777777", "sampson", "buckeye", "highland", "kristin", "seminole", "reaper", "bassman", "nugget", "lucifer", "airforce", "nasty", "watson", "warlock", "2121", "philip", "always", "dodge", "chrissy", "burger", "bird", "snatch", "missy", "pink", "gang", "maddie", "holmes", "huskers", "piglet", "photo", "joanne", "hamilton", "dodger", "paladin", "christy", "chubby", "buckeyes", "hamlet", "abcdefgh", "bigfoot", "sunday", "manson", "goldfish", "garden", "deftones", "icecream", "blondie", "spartan", "julie", "harold", "charger", "brandi", "stormy", "sherry", "pleasure", "juventus", "rodney", "galaxy", "holland", "escort", "zxcvb", "planet", "jerome", "wesley", "blues", "song", "peace", "david1", "ncc1701e", "1966", "51505150", "cavalier", "gambit", "karen", "sidney", "ripper", "oicu812", "jamie", "sister", "marie", "martha", "nylons", "aardvark", "nadine", "minnie", "whiskey", "bing", "plastic", "anal", "babylon5", "chang", "savannah", "loser", "racecar", "insane", "yankees1", "mememe", "hansolo", "chiefs", "fredfred", "freak", "frog", "salmon", "concrete", "yvonne", "zxcv", "shamrock", "atlantis", "warren", "wordpass", "julian", "mariah", "rommel", "1010", "harris", "predator", "sylvia", "massive", "cats", "sammy1", "mister", "stud", "marathon", "rubber", "ding", "trunks", "desire", "montreal", "justme", "faster", "kathleen", "irish", "1999", "bertha", "jessica1", "alpine", "sammie", "diamonds", "tristan", "00000", "swinger", "shan", "stallion", "pitbull", "letmein2", "roberto", "ready", "april", "palmer", "ming", "shadow1", "audrey", "chong", "clitoris", "wang", "shirley", "fuckers", "jackoff", "bluesky", "sundance", "renegade", "hollywoo", "151515", "bernard", "wolfman", "soldier", "picture", "pierre", "ling", "goddess", "manager", "nikita", "sweety", "titans", "hang", "fang", "ficken", "niners", "bottom", "bubble", "hello123", "ibanez", "webster", "sweetpea", "stocking", "323232", "tornado", "lindsey", "content", "bruce", "buck", "aragorn", "griffin", "chen", "campbell", "trojan", "christop", "newman", "wayne", "tina", "rockstar", "father", "geronimo", "pascal", "crimson", "brooks", "hector", "penny", "anna", "google", "camera", "chandler", "fatcat", "lovelove", "cody", "cunts", "waters", "stimpy", "finger", "cindy", "wheels", "viper1", "latin", "robin", "greenday", "987654321", "creampie", "brendan", "hiphop", "willy", "snapper", "funtime", "duck", "trombone", "adult", "cotton", "cookies", "kaiser", "mulder", "westham", "latino", "jeep", "ravens", "aurora", "drizzt", "madness", "energy", "kinky", "314159", "sophia", "stefan", "slick", "rocker", "55555555", "freeman", "french", "mongoose", "speed", "dddddd", "hong", "henry", "hungry", "yang", "catdog", "cheng", "ghost", "gogogo", "randy", "tottenha", "curious", "butterfl", "mission", "january", "singer", "sherman", "shark", "techno", "lancer", "lalala", "autumn", "chichi", "orion", "trixie", "clifford", "delta", "bobbob", "bomber", "holden", "kang", "kiss", "1968", "spunky", "liquid", "mary", "beagle", "granny", "network", "bond", "kkkkkk", "millie", "1973", "biggie", "beetle", "teacher", "susan", "toronto", "anakin", "genius", "dream", "cocks", "dang", "bush", "karate", "snakes", "bangkok", "callie", "fuckyou2", "pacific", "daytona", "kelsey", "infantry", "skywalke", "foster", "felix", "sailing", "raistlin", "vanhalen", "huang", "herbert", "jacob", "blackie", "tarzan", "strider", "sherlock", "lang", "gong", "sang", "dietcoke", "ultimate", "tree", "shai", "sprite", "ting", "artist", "chai", "chao", "devil", "python", "ninja", "misty", "ytrewq", "sweetie", "superfly", "456789", "tian", "jing", "jesus1", "freedom1", "dian", "drpepper", "potter", "chou", "darren", "hobbit", "violet", "yong", "shen", "phillip", "maurice", "gloria", "nolimit", "mylove", "biscuit", "yahoo", "shasta", "sex4me", "smoker", "smile", "pebbles", "pics", "philly", "tong", "tintin", "lesbians", "marlin", "cactus", "frank1", "tttttt", "chun", "danni", "emerald", "showme", "pirates", "lian", "dogg", "colleen", "xiao", "xian", "tazman", "tanker", "patton", "toshiba", "richie", "alberto", "gotcha", "graham", "dillon", "rang", "emily", "keng", "jazz", "bigguy", "yuan", "woman", "tomtom", "marion", "greg", "chaos", "fossil", "flight", "racerx", "tuan", "creamy", "boss", "bobo", "musicman", "warcraft", "window", "blade", "shuang", "sheila", "shun", "lick", "jian", "microsoft", "rong", "allen", "feng", "getsome", "sally", "quality", "kennedy", "morrison", "1977", "beng", "wwwwww", "yoyoyo", "zhang", "seng", "teddy", "joanna", "andreas", "harder", "luke", "qazxsw", "qian", "cong", "chuan", "deng", "nang", "boeing", "keeper", "western", "isabelle", "1963", "subaru", "sheng", "thuglife", "teng", "jiong", "miao", "martina", "mang", "maniac", "pussie", "tracey", "a1b2c3", "clayton", "zhou", "zhuang", "xing", "stonecol", "snow", "spyder", "liang", "jiang", "memphis", "regina", "ceng", "magic1", "logitech", "chuang", "dark", "million", "blow", "sesame", "shao", "poison", "titty", "terry", "kuan", "kuai", "kyle", "mian", "guan", "hamster", "guai", "ferret", "florence", "geng", "duan", "pang", "maiden", "quan", "velvet", "nong", "neng", "nookie", "buttons", "bian", "bingo", "biao", "zhong", "zeng", "xiong", "zhun", "ying", "zong", "xuan", "zang", "0.0.000", "suan", "shei", "shui", "sharks", "shang", "shua", "small", "peng", "pian", "piao", "liao", "meng", "miami", "reng", "guang", "cang", "change", "ruan", "diao", "luan", "lucas", "qing", "chui", "chuo", "cuan", "nuan", "ning", "heng", "huan", "kansas", "muscle", "monroe", "weng", "whitney", "1passwor", "bluemoon", "zhui", "zhua", "xiang", "zheng", "zhen", "zhei", "zhao", "zhan", "yomama", "zhai", "zhuo", "zuan", "tarheel", "shou", "shuo", "tiao", "lady", "leonard", "leng", "kuang", "jiao", "13579", "basket", "qiao", "qiong", "qiang", "chuai", "nian", "niao", "niang", "huai", "22222222", "bianca", "zhuan", "zhuai", "shuan", "shuai", "stardust", "jumper", "margaret", "archie", "66666666", "charlott", "forget", "qwertz", "bones", "history", "milton", "waterloo", "2002", "stuff", "11223344", "office", "oldman", "preston", "trains", "murray", "vertigo", "246810", "black1", "swallow", "smiles", "standard", "alexandr", "parrot", "luther", "user", "nicolas", "1976", "surfing", "pioneer", "pete", "masters", "apple1", "asdasd", "auburn", "hannibal", "frontier", "panama", "lucy", "buffy", "brianna", "welcome1", "vette", "blue22", "shemale", "111222", "baggins", "groovy", "global", "turner", "181818", "1979", "blades", "spanking", "life", "byteme", "lobster", "collins", "dawg", "hilton", "japanese", "1970", "1964", "2424", "polo", "markus", "coco", "deedee", "mikey", "1972", "171717", "1701", "strip", "jersey", "green1", "capital", "sasha", "sadie", "putter", "vader", "seven7", "lester", "marcel", "banshee", "grendel", "gilbert", "dicks", "dead", "hidden", "iloveu", "1980", "sound", "ledzep", "michel", "147258", "female", "bugger", "buffett", "bryan", "hell", "kristina", "molson", "2020", "wookie", "sprint", "thanks", "jericho", "102030", "grace", "fuckin", "mandy", "ranger1", "trebor", "deepthroat", "bonehead", "molly1", "mirage", "models", "1984", "2468", "stuart", "showtime", "squirrel", "pentium", "mario", "anime", "gator", "powder", "twister", "connect", "neptune", "bruno", "butts", "engine", "eatshit", "mustangs", "woody1", "shogun", "septembe", "pooh", "jimbo", "roger", "annie", "bacon", "center", "russian", "sabine", "damien", "mollie", "voyeur", "2525", "363636", "leonardo", "camel", "chair", "germany", "giant", "qqqq", "nudist", "bone", "sleepy", "tequila", "megan", "fighter", "garrett", "dominic", "obiwan", "makaveli", "vacation", "walnut", "1974", "ladybug", "cantona", "ccbill", "satan", "rusty1", "passwor1", "columbia", "napoleon", "dusty", "kissme", "motorola", "william1", "1967", "zzzz", "skater", "smut", "play", "matthew1", "robinson", "valley", "coolio", "dagger", "boner", "bull", "horndog", "jason1", "blake", "penguins", "rescue", "griffey", "8j4ye3uz", "californ", "champs", "qwertyuiop", "portland", "queen", "colt45", "boat", "xxxxxxx", "xanadu", "tacoma", "mason", "carpet", "gggggg", "safety", "palace", "italia", "stevie", "picturs", "picasso", "thongs", "tempest", "ricardo", "roberts", "asd123", "hairy", "foxtrot", "gary", "nimrod", "hotboy", "343434", "1111111", "asdfghjkl", "goose", "overlord", "blood", "wood", "stranger", "454545", "shaolin", "sooners", "socrates", "spiderman", "peanuts", "maxine", "rogers", "13131313", "andrew1", "filthy", "donnie", "ohyeah", "africa", "national", "kenny", "keith", "monique", "intrepid", "jasmin", "pickles", "assass", "fright", "potato", "darwin", "hhhhhh", "kingdom", "weezer", "424242", "pepsi1", "throat", "romeo", "gerard", "looker", "puppy", "butch", "monika", "suzanne", "sweets", "temple", "laurie", "josh", "megadeth", "analsex", "nymets", "ddddddd", "bigballs", "support", "stick", "today", "down", "oakland", "oooooo", "qweasd", "chucky", "bridge", "carrot", "chargers", "discover", "dookie", "condor", "night", "butler", "hoover", "horny1", "isabella", "sunrise", "sinner", "jojo", "megapass", "martini", "assfuck", "grateful", "ffffff", "abigail", "esther", "mushroom", "janice", "jamaica", "wright", "sims", "space", "there", "timmy", "7654321", "77777", "cccccc", "gizmodo", "roxanne", "ralph", "tractor", "cristina", "dance", "mypass", "hongkong", "helena", "1975", "blue123", "pissing", "thomas1", "redred", "rich", "basketball", "attack", "cash", "satan666", "drunk", "dixie", "dublin", "bollox", "kingkong", "katrina", "miles", "1971", "22222", "272727", "sexx", "penelope", "thompson", "anything", "bbbb", "battle", "grizzly", "passat", "porter", "tracy", "defiant", "bowler", "knickers", "monitor", "wisdom", "wild", "slappy", "thor", "letsgo", "robert1", "feet", "rush", "brownie", "hudson", "098765", "playing", "playtime", "lightnin", "melvin", "atomic", "bart", "hawk", "goku", "glory", "llllll", "qwaszx", "cosmos", "bosco", "knights", "bentley", "beast", "slapshot", "lewis", "assword", "frosty", "gillian", "sara", "dumbass", "mallard", "dddd", "deanna", "elwood", "wally", "159357", "titleist", "angelo", "aussie", "guest", "golfing", "doobie", "loveit", "chloe", "elliott", "werewolf", "vipers", "janine", "1965", "blabla", "surf", "sucking", "tardis", "serena", "shelley", "thegame", "legion", "rebels", "fernando", "fast", "gerald", "sarah1", "double", "onelove", "loulou", "toto", "crash", "blackcat", "0007", "tacobell", "soccer1", "jedi", "manuel", "method", "river", "chase", "ludwig", "poopie", "derrick", "boob", "breast", "kittycat", "isabel", "belly", "pikachu", "thunder1", "thankyou", "jose", "celeste", "celtics", "frances", "frogger", "scoobydo", "sabbath", "coltrane", "budman", "willis", "jackal", "bigger", "zzzzz", "silvia", "sooner", "licking", "gopher", "geheim", "lonestar", "primus", "pooper", "newpass", "brasil", "heather1", "husker", "element", "moomoo", "beefcake", "zzzzzzzz", "tammy", "shitty", "smokin", "personal", "jjjj", "anthony1", "anubis", "backup", "gorilla", "fuckface", "painter", "lowrider", "punkrock", "traffic", "claude", "daniela", "dale", "delta1", "nancy", "boys", "easy", "kissing", "kelley", "wendy", "theresa", "amazon", "alan", "fatass", "dodgeram", "dingdong", "malcolm", "qqqqqqqq", "breasts", "boots", "honda1", "spidey", "poker", "temp", "johnjohn", "miguel", "147852", "archer", "asshole1", "dogdog", "tricky", "crusader", "weather", "syracuse", "spankme", "speaker", "meridian", "amadeus", "back", "harley1", "falcons", "dorothy", "turkey50", "kenwood", "keyboard", "ilovesex", "1978", "blackman", "shazam", "shalom", "lickit", "jimbob", "richmond", "roller", "carson", "check", "fatman", "funny", "garbage", "sandiego", "loving", "magnus", "cooldude", "clover", "mobile", "bell", "payton", "plumber", "texas1", "tool", "topper", "jenna", "mariners", "rebel", "harmony", "caliente", "celica", "fletcher", "german", "diana", "oxford", "osiris", "orgasm", "punkin", "porsche9", "tuesday", "close", "breeze", "bossman", "kangaroo", "billie", "latinas", "judith", "astros", "scruffy", "donna", "qwertyu", "davis", "hearts", "kathy", "jammer", "java", "springer", "rhonda", "ricky", "1122", "goodtime", "chelsea1", "freckles", "flyboy", "doodle", "city", "nebraska", "bootie", "kicker", "webmaster", "vulcan", "iverson", "191919", "blueeyes", "stoner", "321321", "farside", "rugby", "director", "pussy69", "power1", "bobbie", "hershey", "hermes", "monopoly", "west", "birdman", "blessed", "blackjac", "southern", "peterpan", "thumbs", "lawyer", "melinda", "fingers", "fuckyou1", "rrrrrr", "a1b2c3d4", "coke", "nicola", "bohica", "heart", "elvis1", "kids", "blacky", "stories", "sentinel", "snake1", "phoebe", "jesse", "richard1", "1234abcd", "guardian", "candyman", "fisting", "scarlet", "dildo", "pancho", "mandingo", "lucky7", "condom", "munchkin", "billyboy", "summer1", "student", "sword", "skiing", "sergio", "site", "sony", "thong", "rootbeer", "assassin", "cassidy", "frederic", "fffff", "fitness", "giovanni", "scarlett", "durango", "postal", "achilles", "dawn", "dylan", "kisses", "warriors", "imagine", "plymouth", "topdog", "asterix", "hallo", "cameltoe", "fuckfuck", "bridget", "eeeeee", "mouth", "weird", "will", "sithlord", "sommer", "toby", "theking", "juliet", "avenger", "backdoor", "goodbye", "chevrole", "faith", "lorraine", "trance", "cosworth", "brad", "houses", "homers", "eternity", "kingpin", "verbatim", "incubus", "1961", "blond", "zaphod", "shiloh", "spurs", "station", "jennie", "maynard", "mighty", "aliens", "hank", "charly", "running", "dogman", "omega1", "printer", "aggies", "chocolate", "deadhead", "hope", "javier", "bitch1", "stone55", "pineappl", "thekid", "lizzie", "rockets", "ashton", "camels", "formula", "forrest", "rosemary", "oracle", "rain", "pussey", "porkchop", "abcde", "clancy", "nellie", "mystic", "inferno", "blackdog", "steve1", "pauline", "alexander", "alice", "alfa", "grumpy", "flames", "scream", "lonely", "puffy", "proxy", "valhalla", "unreal", "cynthia", "herbie", "engage", "yyyyyy", "010101", "solomon", "pistol", "melody", "celeb", "flying", "gggg", "santiago", "scottie", "oakley", "portugal", "a12345", "newbie", "mmmm", "venus", "1qazxsw2", "beverly", "zorro", "work", "writer", "stripper", "sebastia", "spread", "phil", "tobias", "links", "members", "metal", "1221", "andre", "565656", "funfun", "trojans", "again", "cyber", "hurrican", "moneys", "1x2zkg8w", "zeus", "thing", "tomato", "lion", "atlantic", "celine", "usa123", "trans", "account", "aaaaaaa", "homerun", "hyperion", "kevin1", "blacks", "44444444", "skittles", "sean", "hastings", "fart", "gangbang", "fubar", "sailboat", "older", "oilers", "craig", "conrad", "church", "damian", "dean", "broken", "buster1", "hithere", "immortal", "sticks", "pilot", "peters", "lexmark", "jerkoff", "maryland", "anders", "cheers", "possum", "columbus", "cutter", "muppet", "beautiful", "stolen", "swordfish", "sport", "sonic", "peter1", "jethro", "rockon", "asdfghj", "pass123", "paper", "pornos", "ncc1701a", "bootys", "buttman", "bonjour", "escape", "1960", "becky", "bears", "362436", "spartans", "tinman", "threesom", "lemons", "maxmax", "1414", "bbbbb", "camelot", "chad", "chewie", "gogo", "fusion", "saint", "dilligaf", "nopass", "myself", "hustler", "hunter1", "whitey", "beast1", "yesyes", "spank", "smudge", "pinkfloy", "patriot", "lespaul", "annette", "hammers", "catalina", "finish", "formula1", "sausage", "scooter1", "orioles", "oscar1", "over", "colombia", "cramps", "natural", "eating", "exotic", "iguana", "bella", "suckers", "strong", "sheena", "start", "slave", "pearl", "topcat", "lancelot", "angelica", "magelan", "racer", "ramona", "crunch", "british", "button", "eileen", "steph", "456123", "skinny", "seeking", "rockhard", "chief", "filter", "first", "freaks", "sakura", "pacman", "poontang", "dalton", "newlife", "homer1", "klingon", "watcher", "walleye", "tasha", "tasty", "sinatra", "starship", "steel", "starbuck", "poncho", "amber1", "gonzo", "grover", "catherin", "carol", "candle", "firefly", "goblin", "scotch", "diver", "usmc", "huskies", "eleven", "kentucky", "kitkat", "israel", "beckham", "bicycle", "yourmom", "studio", "tara", "33333333", "shane", "splash", "jimmy1", "reality", "12344321", "caitlin", "focus", "sapphire", "mailman", "raiders1", "clark", "ddddd", "hopper", "excalibu", "more", "wilbur", "illini", "imperial", "phillips", "lansing", "maxx", "gothic", "golfball", "carlton", "camille", "facial", "front242", "macdaddy", "qwer1234", "vectra", "cowboys1", "crazy1", "dannyboy", "jane", "betty", "benny", "bennett", "leader", "martinez", "aquarius", "barkley", "hayden", "caught", "franky", "ffff", "floyd", "sassy", "pppp", "pppppppp", "prodigy", "clarence", "noodle", "eatpussy", "vortex", "wanking", "beatrice", "billy1", "siemens", "pedro", "phillies", "research", "groups", "carolyn", "chevy1", "cccc", "fritz", "gggggggg", "doughboy", "dracula", "nurses", "loco", "madrid", "lollipop", "trout", "utopia", "chrono", "cooler", "conner", "nevada", "wibble", "werner", "summit", "marco", "marilyn", "1225", "babies", "capone", "fugazi", "panda", "mama", "qazwsxed", "puppies", "triton", "9876", "command", "nnnnnn", "ernest", "momoney", "iforgot", "wolfie", "studly", "shawn", "renee", "alien", "hamburg", "81fukkc", "741852", "catman", "china", "forgot", "gagging", "scott1", "drew", "oregon", "qweqwe", "train", "crazybab", "daniel1", "cutlass", "brothers", "holes", "heidi", "mothers", "music1", "what", "walrus", "1957", "bigtime", "bike", "xtreme", "simba", "ssss", "rookie", "angie", "bathing", "fresh", "sanchez", "rotten", "maestro", "luis", "look", "turbo1", "99999", "butthole", "hhhh", "elijah", "monty", "bender", "yoda", "shania", "shock", "phish", "thecat", "rightnow", "reagan", "baddog", "asia", "greatone", "gateway1", "randall", "abstr", "napster", "brian1", "bogart", "high", "hitler", "emma", "kill", "weaver", "wildfire", "jackson1", "isaiah", "1981", "belinda", "beaner", "yoyo", "0.0.0.000", "super1", "select", "snuggles", "slutty", "some", "phoenix1", "technics", "toon", "raven1", "rayray", "123789", "1066", "albion", "greens", "fashion", "gesperrt", "santana", "paint", "powell", "credit", "darling", "mystery", "bowser", "bottle", "brucelee", "hehehe", "kelly1", "mojo", "1998", "bikini", "woofwoof", "yyyy", "strap", "sites", "spears", "theodore", "julius", "richards", "amelia", "central", "f**k", "nyjets", "punisher", "username", "vanilla", "twisted", "bryant", "brent", "bunghole", "here", "elizabeth", "erica", "kimber", "viagra", "veritas", "pony", "pool", "titts", "labtec", "lifetime", "jenny1", "masterbate", "mayhem", "redbull", "govols", "gremlin", "505050", "gmoney", "rupert", "rovers", "diamond1", "lorenzo", "trident", "abnormal", "davidson", "deskjet", "cuddles", "nice", "bristol", "karina", "milano", "vh5150", "jarhead", "1982", "bigbird", "bizkit", "sixers", "slider", "star69", "starfish", "penetration", "tommy1", "john316", "meghan", "michaela", "market", "grant", "caligula", "carl", "flicks", "films", "madden", "railroad", "cosmo", "cthulhu", "bradford", "br0d3r", "military", "bearbear", "swedish", "spawn", "patrick1", "polly", "these", "todd", "reds", "anarchy", "groove", "franco", "fuckher", "oooo", "tyrone", "vegas", "airbus", "cobra1", "christine", "clips", "delete", "duster", "kitty1", "mouse1", "monkeys", "jazzman", "1919", "262626", "swinging", "stroke", "stocks", "sting", "pippen", "labrador", "jordan1", "justdoit", "meatball", "females", "saturday", "park", "vector", "cooter", "defender", "desert", "demon", "nike", "bubbas", "bonkers", "english", "kahuna", "wildman", "4121", "sirius", "static", "piercing", "terror", "teenage", "leelee", "marissa", "microsof", "mechanic", "robotech", "rated", "hailey", "chaser", "sanders", "salsero", "nuts", "macross", "quantum", "rachael", "tsunami", "universe", "daddy1", "cruise", "nguyen", "newpass6", "nudes", "hellyeah", "vernon", "1959", "zaq12wsx", "striker", "sixty", "steele", "spice", "spectrum", "smegma", "thumb", "jjjjjjjj", "mellow", "astrid", "cancun", "cartoon", "sabres", "samiam", "pants", "oranges", "oklahoma", "lust", "coleman", "denali", "nude", "noodles", "buzz", "brest", "hooter", "mmmmmmmm", "warthog", "bloody", "blueblue", "zappa", "wolverine", "sniffing", "lance", "jean", "jjjjj", "harper", "calico", "freee", "rover", "door", "pooter", "closeup", "bonsai", "evelyn", "emily1", "kathryn", "keystone", "iiii", "1955", "yzerman", "theboss", "tolkien", "jill", "megaman", "rasta", "bbbbbbbb", "bean", "handsome", "hal9000", "goofy", "gringo", "gofish", "gizmo1", "samsam", "scuba", "onlyme", "tttttttt", "corrado", "clown", "clapton", "deborah", "boris", "bulls", "vivian", "jayhawk", "bethany", "wwww", "sharky", "seeker", "ssssssss", "somethin", "pillow", "thesims", "lighter", "lkjhgf", "melissa1", "marcius2", "barry", "guiness", "gymnast", "casey1", "goalie", "godsmack", "doug", "lolo", "rangers1", "poppy", "abby", "clemson", "clipper", "deeznuts", "nobody", "holly1", "elliot", "eeee", "kingston", "miriam", "belle", "yosemite", "sucked", "sex123", "sexy69", "pic's", "tommyboy", "lamont", "meat", "masterbating", "marianne", "marc", "gretzky", "happyday", "frisco", "scratch", "orchid", "orange1", "manchest", "quincy", "unbelievable", "aberdeen", "dawson", "nathalie", "ne1469", "boxing", "hill", "korn", "intercourse", "161616", "1985", "ziggy", "supersta", "stoney", "senior", "amature", "barber", "babyboy", "bcfields", "goliath", "hack", "hardrock", "children", "frodo", "scout", "scrappy", "rosie", "qazqaz", "tracker", "active", "craving", "commando", "cohiba", "deep", "cyclone", "dana", "bubba69", "katie1", "mpegs", "vsegda", "jade", "irish1", "better", "sexy1", "sinclair", "smelly", "squerting", "lions", "jokers", "jeanette", "julia", "jojojo", "meathead", "ashley1", "groucho", "cheetah", "champ", "firefox", "gandalf1", "packer", "magnolia", "love69", "tyler1", "typhoon", "tundra", "bobby1", "kenworth", "village", "volley", "beth", "wolf359", "0420", "000007", "swimmer", "skydive", "smokes", "patty", "peugeot", "pompey", "legolas", "kristy", "redhot", "rodman", "redalert", "having", "grapes", "4runner", "carrera", "floppy", "dollars", "ou8122", "quattro", "adams", "cloud9", "davids", "nofear", "busty", "homemade", "mmmmm", "whisper", "vermont", "webmaste", "wives", "insertion", "jayjay", "philips", "phone", "topher", "tongue", "temptress", "midget", "ripken", "havefun", "gretchen", "canon", "celebrity", "five", "getting", "ghetto", "direct", "otto", "ragnarok", "trinidad", "usnavy", "conover", "cruiser", "dalshe", "nicole1", "buzzard", "hottest", "kingfish", "misfit", "moore", "milfnew", "warlord", "wassup", "bigsexy", "blackhaw", "zippy", "shearer", "tights", "thursday", "kungfu", "labia", "journey", "meatloaf", "marlene", "rider", "area51", "batman1", "bananas", "636363", "cancel", "ggggg", "paradox", "mack", "lynn", "queens", "adults", "aikido", "cigars", "nova", "hoosier", "eeyore", "moose1", "warez", "interacial", "streaming", "313131", "pertinant", "pool6123", "mayday", "rivers", "revenge", "animated", "banker", "baddest", "gordon24", "ccccc", "fortune", "fantasies", "touching", "aisan", "deadman", "homepage", "ejaculation", "whocares", "iscool", "jamesbon", "1956", "1pussy", "womam", "sweden", "skidoo", "spock", "sssss", "petra", "pepper1", "pinhead", "micron", "allsop", "amsterda", "army", "aside", "gunnar", "666999", "chip", "foot", "fowler", "february", "face", "fletch", "george1", "sapper", "science", "sasha1", "luckydog", "lover1", "magick", "popopo", "public", "ultima", "derek", "cypress", "booker", "businessbabe", "brandon1", "edwards", "experience", "vulva", "vvvv", "jabroni", "bigbear", "yummy", "010203", "searay", "secret1", "showing", "sinbad", "sexxxx", "soleil", "software", "piccolo", "thirteen", "leopard", "legacy", "jensen", "justine", "memorex", "marisa", "mathew", "redwing", "rasputin", "134679", "anfield", "greenbay", "gore", "catcat", "feather", "scanner", "pa55word", "contortionist", "danzig", "daisy1", "hores", "erik", "exodus", "vinnie", "iiiiii", "zero", "1001", "subway", "tank", "second", "snapple", "sneakers", "sonyfuck", "picks", "poodle", "test1234", "their", "llll", "junebug", "june", "marker", "mellon", "ronaldo", "roadkill", "amanda1", "asdfjkl", "beaches", "greene", "great1", "cheerleaers", "force", "doitnow", "ozzy", "madeline", "radio", "tyson", "christian", "daphne", "boxster", "brighton", "housewifes", "emmanuel", "emerson", "kkkk", "mnbvcx", "moocow", "vides", "wagner", "janet", "1717", "bigmoney", "blonds", "1000", "storys", "stereo", "4545", "420247", "seductive", "sexygirl", "lesbean", "live", "justin1", "124578", "animals", "balance", "hansen", "cabbage", "canadian", "gangbanged", "dodge1", "dimas", "lori", "loud", "malaka", "puss", "probes", "adriana", "coolman", "crawford", "dante", "nacked", "hotpussy", "erotica", "kool", "mirror", "wearing", "implants", "intruder", "bigass", "zenith", "woohoo", "womans", "tanya", "tango", "stacy", "pisces", "laguna", "krystal", "maxell", "andyod22", "barcelon", "chainsaw", "chickens", "flash1", "downtown", "orgasms", "magicman", "profit", "pusyy", "pothead", "coconut", "chuckie", "contact", "clevelan", "designer", "builder", "budweise", "hotshot", "horizon", "hole", "experienced", "mondeo", "wifes", "1962", "strange", "stumpy", "smiths", "sparks", "slacker", "piper", "pitchers", "passwords", "laptop", "jeremiah", "allmine", "alliance", "bbbbbbb", "asscock", "halflife", "grandma", "hayley", "88888", "cecilia", "chacha", "saratoga", "sandy1", "santos", "doogie", "number", "positive", "qwert40", "transexual", "crow", "close-up", "darrell", "bonita", "ib6ub9", "volvo", "jacob1", "iiiii", "beastie", "sunnyday", "stoned", "sonics", "starfire", "snapon", "pictuers", "pepe", "testing1", "tiberius", "lisalisa", "lesbain", "litle", "retard", "ripple", "austin1", "badgirl", "golfgolf", "flounder", "garage", "royals", "dragoon", "dickie", "passwor", "ocean", "majestic", "poppop", "trailers", "dammit", "nokia", "bobobo", "br549", "emmitt", "knock", "minime", "mikemike", "whitesox", "1954", "3232", "353535", "seamus", "solo", "sparkle", "sluttey", "pictere", "titten", "lback", "1024", "angelina", "goodluck", "charlton", "fingerig", "gallaries", "goat", "ruby", "passme", "oasis", "lockerroom", "logan1", "rainman", "twins", "treasure", "absolutely", "club", "custom", "cyclops", "nipper", "bucket", "homepage-", "hhhhh", "momsuck", "indain", "2345", "beerbeer", "bimmer", "susanne", "stunner", "stevens", "456456", "shell", "sheba", "tootsie", "tiny", "testerer", "reefer", "really", "1012", "harcore", "gollum", "545454", "chico", "caveman", "carole", "fordf150", "fishes", "gaymen", "saleen", "doodoo", "pa55w0rd", "looney", "presto", "qqqqq", "cigar", "bogey", "brewer", "helloo", "dutch", "kamikaze", "monte", "wasser", "vietnam", "visa", "japanees", "0123", "swords", "slapper", "peach", "jump", "marvel", "masterbaiting", "march", "redwood", "rolling", "1005", "ametuer", "chiks", "cathy", "callaway", "fucing", "sadie1", "panasoni", "mamas", "race", "rambo", "unknown", "absolut", "deacon", "dallas1", "housewife", "kristi", "keywest", "kirsten", "kipper", "morning", "wings", "idiot", "18436572", "1515", "beating", "zxczxc", "sullivan", "303030", "shaman", "sparrow", "terrapin", "jeffery", "masturbation", "mick", "redfish", "1492", "angus", "barrett", "goirish", "hardcock", "felicia", "forfun", "galary", "freeporn", "duchess", "olivier", "lotus", "pornographic", "ramses", "purdue", "traveler", "crave", "brando", "enter1", "killme", "moneyman", "welder", "windsor", "wifey", "indon", "yyyyy", "stretch", "taylor1", "4417", "shopping", "picher", "pickup", "thumbnils", "johnboy", "jets", "jess", "maureen", "anne", "ameteur", "amateurs", "apollo13", "hambone", "goldwing", "5050", "charley", "sally1", "doghouse", "padres", "pounding", "quest", "truelove", "underdog", "trader", "crack", "climber", "bolitas", "bravo", "hohoho", "model", "italian", "beanie", "beretta", "wrestlin", "stroker", "tabitha", "sherwood", "sexyman", "jewels", "johannes", "mets", "marcos", "rhino", "bdsm", "balloons", "goodman", "grils", "happy123", "flamingo", "games", "route66", "devo", "dino", "outkast", "paintbal", "magpie", "llllllll", "twilight", "critter", "christie", "cupcake", "nickel", "bullseye", "krista", "knickerless", "mimi", "murder", "videoes", "binladen", "xerxes", "slim", "slinky", "pinky", "peterson", "thanatos", "meister", "menace", "ripley", "retired", "albatros", "balloon", "bank", "goten", "5551212", "getsdown", "donuts", "divorce", "nwo4life", "lord", "lost", "underwear", "tttt", "comet", "deer", "damnit", "dddddddd", "deeznutz", "nasty1", "nonono", "nina", "enterprise", "eeeee", "misfit99", "milkman", "vvvvvv", "isaac", "1818", "blueboy", "beans", "bigbutt", "wyatt", "tech", "solution", "poetry", "toolman", "laurel", "juggalo", "jetski", "meredith", "barefoot", "50spanks", "gobears", "scandinavian", "original", "truman", "cubbies", "nitram", "briana", "ebony", "kings", "warner", "bilbo", "yumyum", "zzzzzzz", "stylus", "321654", "shannon1", "server", "secure", "silly", "squash", "starman", "steeler", "staples", "phrases", "techniques", "laser", "135790", "allan", "barker", "athens", "cbr600", "chemical", "fester", "gangsta", "fucku2", "freeze", "game", "salvador", "droopy", "objects", "passwd", "lllll", "loaded", "louis", "manchester", "losers", "vedder", "clit", "chunky", "darkman", "damage", "buckshot", "buddah", "boobed", "henti", "hillary", "webber", "winter1", "ingrid", "bigmike", "beta", "zidane", "talon", "slave1", "pissoff", "person", "thegreat", "living", "lexus", "matador", "readers", "riley", "roberta", "armani", "ashlee", "goldstar", "5656", "cards", "fmale", "ferris", "fuking", "gaston", "fucku", "ggggggg", "sauron", "diggler", "pacers", "looser", "pounded", "premier", "pulled", "town", "trisha", "triangle", "cornell", "collin", "cosmic", "deeper", "depeche", "norway", "bright", "helmet", "kristine", "kendall", "mustard", "misty1", "watch", "jagger", "bertie", "berger", "word", "3x7pxr", "silver1", "smoking", "snowboar", "sonny", "paula", "penetrating", "photoes", "lesbens", "lambert", "lindros", "lillian", "roadking", "rockford", "1357", "143143", "asasas", "goodboy", "898989", "chicago1", "card", "ferrari1", "galeries", "godfathe", "gawker", "gargoyle", "gangster", "rubble", "rrrr", "onetime", "pussyman", "pooppoop", "trapper", "twenty", "abraham", "cinder", "company", "newcastl", "boricua", "bunny1", "boxer", "hotred", "hockey1", "hooper", "edward1", "evan", "kris", "misery", "moscow", "milk", "mortgage", "bigtit", "show", "snoopdog", "three", "lionel", "leanne", "joshua1", "july", "1230", "assholes", "cedric", "fallen", "farley", "gene", "frisky", "sanity", "script", "divine", "dharma", "lucky13", "property", "tricia", "akira", "desiree", "broadway", "butterfly", "hunt", "hotbox", "hootie", "heat", "howdy", "earthlink", "karma", "kiteboy", "motley", "westwood", "1988", "bert", "blackbir", "biggles", "wrench", "working", "wrestle", "slippery", "pheonix", "penny1", "pianoman", "tomorrow", "thedude", "jenn", "jonjon", "jones1", "mattie", "memory", "micheal", "roadrunn", "arrow", "attitude", "azzer", "seahawks", "diehard", "dotcom", "lola", "tunafish", "chivas", "cinnamon", "clouds", "deluxe", "northern", "nuclear", "north", "boom", "boobie", "hurley", "krishna", "momomo", "modles", "volume", "23232323", "bluedog", "wwwwwww", "zerocool", "yousuck", "pluto", "limewire", "link", "joung", "marcia", "awnyce", "gonavy", "haha", "films+pic+galeries", "fabian", "francois", "girsl", "fuckthis", "girfriend", "rufus", "drive", "uncencored", "a123456", "airport", "clay", "chrisbln", "combat", "cygnus", "cupoi", "never", "netscape", "brett", "hhhhhhhh", "eagles1", "elite", "knockers", "kendra", "mommy", "1958", "tazmania", "shonuf", "piano", "pharmacy", "thedog", "lips", "jillian", "jenkins", "midway", "arsenal1", "anaconda", "australi", "gromit", "gotohell", "787878", "66666", "carmex2", "camber", "gator1", "ginger1", "fuzzy", "seadoo", "dorian", "lovesex", "rancid", "uuuuuu", "911911", "nature", "bulldog1", "helen", "health", "heater", "higgins", "kirk", "monalisa", "mmmmmmm", "whiteout", "virtual", "ventura", "jamie1", "japanes", "james007", "2727", "2469", "blam", "bitchass", "believe", "zephyr", "stiffy", "sweet1", "silent", "southpar", "spectre", "tigger1", "tekken", "lenny", "lakota", "lionking", "jjjjjjj", "medical", "megatron", "1369", "hawaiian", "gymnastic", "golfer1", "gunners", "7779311", "515151", "famous", "glass", "screen", "rudy", "royal", "sanfran", "drake", "optimus", "panther1", "love1", "mail", "maggie1", "pudding", "venice", "aaron1", "delphi", "niceass", "bounce", "busted", "house1", "killer1", "miracle", "momo", "musashi", "jammin", "2003", "234567", "wp2003wp", "submit", "silence", "sssssss", "state", "spikes", "sleeper", "passwort", "toledo", "kume", "media", "meme", "medusa", "mantis", "remote", "reading", "reebok", "1017", "artemis", "hampton", "harry1", "cafc91", "fettish", "friendly", "oceans", "oooooooo", "mango", "ppppp", "trainer", "troy", "uuuu", "909090", "cross", "death1", "news", "bullfrog", "hokies", "holyshit", "eeeeeee", "mitch", "jasmine1", "&amp", "&amp;", "sergeant", "spinner", "leon", "jockey", "records", "right", "babyblue", "hans", "gooner", "474747", "cheeks", "cars", "candice", "fight", "glow", "pass1234", "parola", "okokok", "pablo", "magical", "major", "ramsey", "poseidon", "989898", "confused", "circle", "crusher", "cubswin", "nnnn", "hollywood", "erin", "kotaku", "milo", "mittens", "whatsup", "vvvvv", "iomega", "insertions", "bengals", "bermuda", "biit", "yellow1", "012345", "spike1", "south", "sowhat", "pitures", "peacock", "pecker", "theend", "juliette", "jimmie", "romance", "augusta", "hayabusa", "hawkeyes", "castro", "florian", "geoffrey", "dolly", "lulu", "qaz123", "usarmy", "twinkle", "cloud", "chuckles", "cold", "hounddog", "hover", "hothot", "europa", "ernie", "kenshin", "kojak", "mikey1", "water1", "196969", "because", "wraith", "zebra", "wwwww", "33333", "simon1", "spider1", "snuffy", "philippe", "thunderb", "teddy1", "lesley", "marino13", "maria1", "redline", "renault", "aloha", "antoine", "handyman", "cerberus", "gamecock", "gobucks", "freesex", "duffman", "ooooo", "papa", "nuggets", "magician", "longbow", "preacher", "porno1", "county", "chrysler", "contains", "dalejr", "darius", "darlene", "dell", "navy", "buffy1", "hedgehog", "hoosiers", "honey1", "hott", "heyhey", "europe", "dutchess", "everest", "wareagle", "ihateyou", "sunflowe", "3434", "senators", "shag", "spoon", "sonoma", "stalker", "poochie", "terminal", "terefon", "laurence", "maradona", "maryann", "marty", "roman", "1007", "142536", "alibaba", "america1", "bartman", "astro", "goth", "century", "chicken1", "cheater", "four", "ghost1", "passpass", "oral", "r2d2c3po", "civic", "cicero", "myxworld", "kkkkk", "missouri", "wishbone", "infiniti", "jameson", "1a2b3c", "1qwerty", "wonderboy", "skip", "shojou", "stanford", "sparky1", "smeghead", "poiuy", "titanium", "torres", "lantern", "jelly", "jeanne", "meier", "1213", "bayern", "basset", "gsxr750", "cattle", "charlene", "fishing1", "fullmoon", "gilles", "dima", "obelix", "popo", "prissy", "ramrod", "unique", "absolute", "bummer", "hotone", "dynasty", "entry", "konyor", "missy1", "moses", "282828", "yeah", "xyz123", "stop", "426hemi", "404040", "seinfeld", "simmons", "pingpong", "lazarus", "matthews", "marine1", "manning", "recovery", "12345a", "beamer", "babyface", "greece", "gustav", "7007", "charity", "camilla", "ccccccc", "faggot", "foxy", "frozen", "gladiato", "duckie", "dogfood", "paranoid", "packers1", "longjohn", "radical", "tuna", "clarinet", "claudio", "circus", "danny1", "novell", "nights", "bonbon", "kashmir", "kiki", "mortimer", "modelsne", "moondog", "monaco", "vladimir", "insert", "1953", "zxc123", "supreme", "3131", "sexxx", "selena", "softail", "poipoi", "pong", "together", "mars", "martin1", "rogue", "alone", "avalanch", "audia4", "55bgates", "cccccccc", "chick", "came11", "figaro", "geneva", "dogboy", "dnsadm", "dipshit", "paradigm", "othello", "operator", "officer", "malone", "post", "rafael", "valencia", "tripod", "choice", "chopin", "coucou", "coach", "cocksuck", "common", "creature", "borussia", "book", "browning", "heritage", "hiziad", "homerj", "eight", "earth", "millions", "mullet", "whisky", "jacques", "store", "4242", "speedo", "starcraf", "skylar", "spaceman", "piggy", "pierce", "tiger2", "legos", "lala", "jezebel", "judy", "joker1", "mazda", "barton", "baker", "727272", "chester1", "fishman", "food", "rrrrrrrr", "sandwich", "dundee", "lumber", "magazine", "radar", "ppppppp", "tranny", "aaliyah", "admiral", "comics", "cleo", "delight", "buttfuck", "homeboy", "eternal", "kilroy", "kellie", "khan", "violin", "wingman", "walmart", "bigblue", "blaze", "beemer", "beowulf", "bigfish", "yyyyyyy", "woodie", "yeahbaby", "0123456", "tbone", "style", "syzygy", "starter", "lemon", "linda1", "merlot", "mexican", "11235813", "anita", "banner", "bangbang", "badman", "barfly", "grease", "carla", "charles1", "ffffffff", "screw", "doberman", "diane", "dogshit", "overkill", "counter", "coolguy", "claymore", "demons", "demo", "nomore", "normal", "brewster", "hhhhhhh", "hondas", "iamgod", "enterme", "everett", "electron", "eastside", "kayla", "minimoni", "mybaby", "wildbill", "wildcard", "ipswich", "200000", "bearcat", "zigzag", "yyyyyyyy", "xander", "sweetnes", "369369", "skyler", "skywalker", "pigeon", "peyton", "tipper", "lilly", "asdf123", "alphabet", "asdzxc", "babybaby", "banane", "barnes", "guyver", "graphics", "grand", "chinook", "florida1", "flexible", "fuckinside", "otis", "ursitesux", "tototo", "trust", "tower", "adam12", "christma", "corey", "chrome", "buddie", "bombers", "bunker", "hippie", "keegan", "misfits", "vickie", "292929", "woofer", "wwwwwwww", "stubby", "sheep", "secrets", "sparta", "stang", "spud", "sporty", "pinball", "jorge", "just4fun", "johanna", "maxxxx", "rebecca1", "gunther", "fatima", "fffffff", "freeway", "garion", "score", "rrrrr", "sancho", "outback", "maggot", "puddin", "trial", "adrienne", "987456", "colton", "clyde", "brain", "brains", "hoops", "eleanor", "dwayne", "kirby", "mydick", "villa", "19691969", "bigcat", "becker", "shiner", "silverad", "spanish", "templar", "lamer", "juicy", "marsha", "mike1", "maximum", "rhiannon", "real", "1223", "10101010", "arrows", "andres", "alucard", "baldwin", "baron", "avenue", "ashleigh", "haggis", "channel", "cheech", "safari", "ross", "dog123", "orion1", "paloma", "qwerasdf", "presiden", "vegitto", "trees", "969696", "adonis", "colonel", "cookie1", "newyork1", "brigitte", "buddyboy", "hellos", "heineken", "dwight", "eraser", "kerstin", "motion", "moritz", "millwall", "visual", "jaybird", "1983", "beautifu", "bitter", "yvette", "zodiac", "steven1", "sinister", "slammer", "smashing", "slick1", "sponge", "teddybea", "theater", "this", "ticklish", "lipstick", "jonny", "massage", "mann", "reynolds", "ring", "1211", "amazing", "aptiva", "applepie", "bailey1", "guitar1", "chanel", "canyon", "gagged", "fuckme1", "rough", "digital1", "dinosaur", "punk", "98765", "90210", "clowns", "cubs", "daniels", "deejay", "nigga", "naruto", "boxcar", "icehouse", "hotties", "electra", "kent", "widget", "india", "insanity", "1986", "2004", "best", "bluefish", "bingo1", "*****", "stratus", "strength", "sultan", "storm1", "44444", "4200", "sentnece", "season", "sexyboy", "sigma", "smokie", "spam", "point", "pippo", "ticket", "temppass", "joel", "manman", "medicine", "1022", "anton", "almond", "bacchus", "aztnm", "axio", "awful", "bamboo", "hakr", "gregor", "hahahaha", "5678", "casanova", "caprice", "camero1", "fellow", "fountain", "dupont", "dolphin1", "dianne", "paddle", "magnet", "qwert1", "pyon", "porsche1", "tripper", "vampires", "coming", "noway", "burrito", "bozo", "highheel", "hughes", "hookem", "eddie1", "ellie", "entropy", "kkkkkkkk", "kkkkkkk", "illinois", "jacobs", "1945", "1951", "24680", "21212121", "100000", "stonecold", "taco", "subzero", "sharp", "sexxxy", "skolko", "shanna", "skyhawk", "spurs1", "sputnik", "piazza", "testpass", "letter", "lane", "kurt", "jiggaman", "matilda", "1224", "harvard", "hannah1", "525252", "4ever", "carbon", "chef", "federico", "ghosts", "gina", "scorpio1", "rt6ytere", "madison1", "loki", "raquel", "promise", "coolness", "christina", "coldbeer", "citadel", "brittney", "highway", "evil", "monarch", "morgan1", "washingt", "1997", "bella1", "berry", "yaya", "yolanda", "superb", "taxman", "studman", "stephanie", "3636", "sherri", "sheriff", "shepherd", "poland", "pizzas", "tiffany1", "toilet", "latina", "lassie", "larry1", "joseph1", "mephisto", "meagan", "marian", "reptile", "rico", "razor", "1013", "barron", "hammer1", "gypsy", "grande", "carroll", "camper", "chippy", "cat123", "call", "chimera", "fiesta", "glock", "glenn", "domain", "dieter", "dragonba", "onetwo", "nygiants", "odessa", "password2", "louie", "quartz", "prowler", "prophet", "towers", "ultra", "cocker", "corleone", "dakota1", "cumm", "nnnnnnn", "natalia", "boxers", "hugo", "heynow", "hollow", "iceberg", "elvira", "kittykat", "kate", "kitchen", "wasabi", "vikings1", "impact", "beerman", "string", "sleep", "splinter", "snoopy1", "pipeline", "pocket", "legs", "maple", "mickey1", "manuela", "mermaid", "micro", "meowmeow", "redbird", "alisha", "baura", "battery", "grass", "chevys", "chestnut", "caravan", "carina", "charmed", "fraser", "frogman", "diving", "dogger", "draven", "drifter", "oatmeal", "paris1", "longdong", "quant4307s", "rachel1", "vegitta", "cole", "cobras", "corsair", "dadada", "noelle", "mylife", "nine", "bowwow", "body", "hotrats", "eastwood", "moonligh", "modena", "wave", "illusion", "iiiiiii", "jayhawks", "birgit", "zone", "sutton", "susana", "swingers", "shocker", "shrimp", "sexgod", "squall", "stefanie", "squeeze", "soul", "patrice", "poiu", "players", "tigers1", "toejam", "tickler", "line", "julie1", "jimbo1", "jefferso", "juanita", "michael2", "rodeo", "robot", "1023", "annie1", "bball", "guess", "happy2", "charter", "farm", "flasher", "falcon1", "fiction", "fastball", "gadget", "scrabble", "diaper", "dirtbike", "dinner", "oliver1", "partner", "paco", "lucille", "macman", "poopy", "popper", "postman", "ttttttt", "ursula", "acura", "cowboy1", "conan", "daewoo", "cyrus", "customer", "nation", "nemrac58", "nnnnn", "nextel", "bolton", "bobdylan", "hopeless", "eureka", "extra", "kimmie", "kcj9wx5n", "killbill", "musica", "volkswag", "wage", "windmill", "wert", "vintage", "iloveyou1", "itsme", "bessie", "zippo", "311311", "starligh", "smokey1", "spot", "snappy", "soulmate", "plasma", "thelma", "tonight", "krusty", "just4me", "mcdonald", "marius", "rochelle", "rebel1", "1123", "alfredo", "aubrey", "audi", "chantal", "fick", "goaway", "roses", "sales", "rusty2", "dirt", "dogbone", "doofus", "ooooooo", "oblivion", "mankind", "luck", "mahler", "lllllll", "pumper", "puck", "pulsar", "valkyrie", "tupac", "compass", "concorde", "costello", "cougars", "delaware", "niceguy", "nocturne", "bob123", "boating", "bronze", "hopkins", "herewego", "hewlett", "houhou", "hubert", "earnhard", "eeeeeeee", "keller", "mingus", "mobydick", "venture", "verizon", "imation", "1950", "1948", "1949", "223344", "bigbig", "blossom", "zack", "wowwow", "sissy", "skinner", "spiker", "square", "snooker", "sluggo", "player1", "junk", "jeannie", "jsbach", "jumbo", "jewel", "medic", "robins", "reddevil", "reckless", "123456a", "1125", "1031", "beacon", "astra", "gumby", "hammond", "hassan", "757575", "585858", "chillin", "fuck1", "sander", "lowell", "radiohea", "upyours", "trek", "courage", "coolcool", "classics", "choochoo", "darryl", "nikki1", "nitro", "bugs", "boytoy", "ellen", "excite", "kirsty", "kane", "wingnut", "wireless", "icu812", "1master", "beatle", "bigblock", "blanca", "wolfen", "summer99", "sugar1", "tartar", "sexysexy", "senna", "sexman", "sick", "someone", "soprano", "pippin", "platypus", "pixies", "telephon", "land", "laura1", "laurent", "rimmer", "road", "report", "1020", "12qwaszx", "arturo", "around", "hamish", "halifax", "fishhead", "forum", "dododo", "doit", "outside", "paramedi", "lonesome", "mandy1", "twist", "uuuuu", "uranus", "ttttt", "butcher", "bruce1", "helper", "hopeful", "eduard", "dusty1", "kathy1", "katherin", "moonbeam", "muscles", "monster1", "monkeybo", "morton", "windsurf", "vvvvvvv", "vivid", "install", "1947", "187187", "1941", "1952", "tatiana", "susan1", "31415926", "sinned", "sexxy", "senator", "sebastian", "shadows", "smoothie", "snowflak", "playstat", "playa", "playboy1", "toaster", "jerry1", "marie1", "mason1", "merlin1", "roger1", "roadster", "112358", "1121", "andrea1", "bacardi", "auto", "hardware", "hardy", "789789", "5555555", "captain1", "flores", "fergus", "sascha", "rrrrrrr", "dome", "onion", "nutter", "lololo", "qqqqqqq", "quick", "undertak", "uuuuuuuu", "uuuuuuu", "criminal", "cobain", "cindy1", "coors", "dani", "descent", "nimbus", "nomad", "nanook", "norwich", "bomb", "bombay", "broker", "hookup", "kiwi", "winners", "jackpot", "1a2b3c4d", "1776", "beardog", "bighead", "blast", "bird33", "0987", "stress", "shot", "spooge", "pelican", "peepee", "perry", "pointer", "titan", "thedoors", "jeremy1", "annabell", "altima", "baba", "hallie", "hate", "hardone", "5454", "candace", "catwoman", "flip", "faithful", "finance", "farmboy", "farscape", "genesis1", "salomon", "destroy", "papers", "option", "page", "loser1", "lopez", "r2d2", "pumpkins", "training", "chriss", "cumcum", "ninjas", "ninja1", "hung", "erika", "eduardo", "killers", "miller1", "islander", "jamesbond", "intel", "jarvis", "19841984", "2626", "bizzare", "blue12", "biker", "yoyoma", "sushi", "styles", "shitface", "series", "shanti", "spanker", "steffi", "smart", "sphinx", "please1", "paulie", "pistons", "tiburon", "limited", "maxwell1", "mdogg", "rockies", "armstron", "alexia", "arlene", "alejandr", "arctic", "banger", "audio", "asimov", "augustus", "grandpa", "753951", "4you", "chilly", "care1839", "chapman", "flyfish", "fantasia", "freefall", "santa", "sandrine", "oreo", "ohshit", "macbeth", "madcat", "loveya", "mallory", "rage", "quentin", "qwerqwer", "project", "ramirez", "colnago", "citizen", "chocha", "cobalt", "crystal1", "dabears", "nevets", "nineinch", "broncos1", "helene", "huge", "edgar", "epsilon", "easter", "kestrel", "moron", "virgil", "winston1", "warrior1", "iiiiiiii", "iloveyou2", "1616", "beat", "bettina", "woowoo", "zander", "straight", "shower", "sloppy", "specialk", "tinkerbe", "jellybea", "reader", "romero", "redsox1", "ride", "1215", "1112", "annika", "arcadia", "answer", "baggio", "base", "guido", "555666", "carmel", "cayman", "cbr900rr", "chips", "gabriell", "gertrude", "glennwei", "roxy", "sausages", "disco", "pass1", "luna", "lovebug", "macmac", "queenie", "puffin", "vanguard", "trip", "trinitro", "airwolf", "abbott", "aaa111", "cocaine", "cisco", "cottage", "dayton", "deadly", "datsun", "bricks", "bumper", "eldorado", "kidrock", "wizard1", "whiskers", "wind", "wildwood", "istheman", "interest", "italy", "25802580", "benoit", "bigones", "woodland", "wolfpac", "strawber", "suicide", "3030", "sheba1", "sixpack", "peace1", "physics", "pearson", "tigger2", "toad", "megan1", "meow", "ringo", "roll", "amsterdam", "717171", "686868", "5424", "catherine", "canuck", "football1", "footjob", "fulham", "seagull", "orgy", "lobo", "mancity", "truth", "trace", "vancouve", "vauxhall", "acidburn", "derf", "myspace1", "boozer", "buttercu", "howell", "hola", "easton", "minemine", "munch", "jared", "1dragon", "biology", "bestbuy", "bigpoppa", "blackout", "blowfish", "bmw325", "bigbob", "stream", "talisman", "tazz", "sundevil", "3333333", "skate", "shutup", "shanghai", "shop", "spencer1", "slowhand", "polish", "pinky1", "tootie", "thecrow", "leroy", "jonathon", "jubilee", "jingle", "martine", "matrix1", "manowar", "michaels", "messiah", "mclaren", "resident", "reilly", "redbaron", "rollins", "romans", "return", "rivera", "andromed", "athlon", "beach1", "badgers", "guitars", "harald", "harddick", "gotribe", "6996", "7grout", "5wr2i7h8", "635241", "chase1", "carver", "charlotte", "fallout", "fiddle", "fredrick", "fenris", "francesc", "fortuna", "ferguson", "fairlane", "felipe", "felix1", "forward", "gasman", "frost", "fucks", "sahara", "sassy1", "dogpound", "dogbert", "divx1", "manila", "loretta", "priest", "pornporn", "quasar", "venom", "987987", "access1", "clippers", "daylight", "decker", "daman", "data", "dentist", "crusty", "nathan1", "nnnnnnnn", "bruno1", "bucks", "brodie", "budapest", "kittens", "kerouac", "mother1", "waldo1", "wedding", "whistler", "whatwhat", "wanderer", "idontkno", "1942", "1946", "bigdawg", "bigpimp", "zaqwsx", "414141", "3000gt", "434343", "shoes", "serpent", "starr", "smurf", "pasword", "tommie", "thisisit", "lake", "john1", "robotics", "redeye", "rebelz", "1011", "alatam", "asses", "asians", "bama", "banzai", "harvest", "gonzalez", "hair", "hanson", "575757", "5329", "cascade", "chinese", "fatty", "fender1", "flower2", "funky", "sambo", "drummer1", "dogcat", "dottie", "oedipus", "osama", "macleod", "prozac", "private1", "rampage", "punch", "presley", "concord", "cook", "cinema", "cornwall", "cleaner", "christopher", "ciccio", "corinne", "clutch", "corvet07", "daemon", "bruiser", "boiler", "hjkl", "eyes", "egghead", "expert", "ethan", "kasper", "mordor", "wasted", "jamess", "iverson3", "bluesman", "zouzou", "090909", "1002", "switch", "stone1", "4040", "sisters", "sexo", "shawna", "smith1", "sperma", "sneaky", "polska", "thewho", "terminat", "krypton", "lawson", "library", "lekker", "jules", "johnson1", "johann", "justus", "rockie", "romano", "aspire", "bastards", "goodie", "cheese1", "fenway", "fishon", "fishin", "fuckoff1", "girls1", "sawyer", "dolores", "desmond", "duane", "doomsday", "pornking", "ramones", "rabbits", "transit", "aaaaa1", "clock", "delilah", "noel", "boyz", "bookworm", "bongo", "bunnies", "brady", "buceta", "highbury", "henry1", "heels", "eastern", "krissy", "mischief", "mopar", "ministry", "vienna", "weston", "wildone", "vodka", "jayson", "bigbooty", "beavis1", "betsy", "xxxxxx1", "yogibear", "000001", "0815", "zulu", "420000", "september", "sigmar", "sprout", "stalin", "peggy", "patch", "lkjhgfds", "lagnaf", "rolex", "redfox", "referee", "123123123", "1231", "angus1", "ariana", "ballin", "attila", "hall", "greedy", "grunt", "747474", "carpedie", "cecile", "caramel", "foxylady", "field", "gatorade", "gidget", "futbol", "frosch", "saiyan", "schmidt", "drums", "donner", "doggy1", "drum", "doudou", "pack", "pain", "nutmeg", "quebec", "valdepen", "trash", "triple", "tosser", "tuscl", "track", "comfort", "choke", "comein", "cola", "deputy", "deadpool", "bremen", "borders", "bronson", "break", "hotass", "hotmail1", "eskimo", "eggman", "koko", "kieran", "katrin", "kordell1", "komodo", "mone", "munich", "vvvvvvvv", "winger", "jaeger", "ivan", "jackson5", "2222222", "bergkamp", "bennie", "bigben", "zanzibar", "worm", "xxx123", "sunny1", "373737", "services", "sheridan", "slater", "slayer1", "snoop", "stacie", "peachy", "thecure", "times", "little1", "jennaj", "marquis", "middle", "rasta69", "1114", "aries", "havana", "gratis", "calgary", "checkers", "flanker", "salope", "dirty1", "draco", "dogface", "luv2epus", "rainbow6", "qwerty123", "umpire", "turnip", "vbnm", "tucson", "troll", "aileen", "codered", "commande", "damon", "nana", "neon", "nico", "nightwin", "neil", "boomer1", "bushido", "hotmail0", "horace", "enternow", "kaitlyn", "keepout", "karen1", "mindy", "mnbv", "viewsoni", "volcom", "wizards", "wine", "1995", "berkeley", "bite", "zach", "woodstoc", "tarpon", "shinobi", "starstar", "phat", "patience", "patrol", "toolbox", "julien", "johnny1", "joebob", "marble", "riders", "reflex", "120676", "1235", "angelus", "anthrax", "atlas", "hawks", "grandam", "harlem", "hawaii50", "gorgeous", "655321", "cabron", "challeng", "callisto", "firewall", "firefire", "fischer", "flyer", "flower1", "factory", "federal", "gambler", "frodo1", "funk", "sand", "sam123", "scania", "dingo", "papito", "passmast", "olive", "palermo", "ou8123", "lock", "ranch", "pride", "randy1", "twiggy", "travis1", "transfer", "treetop", "addict", "admin1", "963852", "aceace", "clarissa", "cliff", "cirrus", "clifton", "colin", "bobdole", "bonner", "bogus", "bonjovi", "bootsy", "boater", "elway7", "edison", "kelvin", "kenny1", "moonshin", "montag", "moreno", "wayne1", "white1", "jazzy", "jakejake", "1994", "1991", "2828", "blunt", "bluejays", "beau", "belmont", "worthy", "systems", "sensei", "southpark", "stan", "peeper", "pharao", "pigpen", "tomahawk", "teensex", "leedsutd", "larkin", "jermaine", "jeepster", "jimjim", "josephin", "melons", "marlon", "matthias", "marriage", "robocop", "1003", "1027", "antelope", "azsxdc", "gordo", "hazard", "granada", "8989", "7894", "ceasar", "cabernet", "cheshire", "california", "chelle", "candy1", "fergie", "fanny", "fidelio", "giorgio", "fuckhead", "ruth", "sanford", "diego", "dominion", "devon", "panic", "longer", "mackie", "qawsed", "trucking", "twelve", "chloe1", "coral", "daddyo", "nostromo", "boyboy", "booster", "bucky", "honolulu", "esquire", "dynamite", "motor", "mollydog", "wilder", "windows1", "waffle", "wallet", "warning", "virus", "washburn", "wealth", "vincent1", "jabber", "jaguars", "javelin", "irishman", "idefix", "bigdog1", "blue42", "blanked", "blue32", "biteme1", "bearcats", "blaine", "yessir", "sylveste", "team", "stephan", "sunfire", "tbird", "stryker", "3ip76k2", "sevens", "sheldon", "pilgrim", "tenchi", "titman", "leeds", "lithium", "lander", "linkin", "landon", "marijuan", "mariner", "markie", "midnite", "reddwarf", "1129", "123asd", "12312312", "allstar", "albany", "asdf12", "antonia", "aspen", "hardball", "goldfing", "7734", "49ers", "carlo", "chambers", "cable", "carnage", "callum", "carlos1", "fitter", "fandango", "festival", "flame", "gofast", "gamma", "fucmy69", "scrapper", "dogwood", "django", "magneto", "loose", "premium", "addison", "9999999", "abc1234", "cromwell", "newyear", "nichole", "bookie", "burns", "bounty", "brown1", "bologna", "earl", "entrance", "elway", "killjoy", "kerry", "keenan", "kick", "klondike", "mini", "mouser", "mohammed", "wayer", "impreza", "irene", "insomnia", "24682468", "2580", "24242424", "billbill", "bellaco", "blessing", "blues1", "bedford", "blanco", "blunts", "stinks", "teaser", "streets", "sf49ers", "shovel", "solitude", "spikey", "sonia", "pimpdadd", "timeout", "toffee", "lefty", "johndoe", "johndeer", "mega", "manolo", "mentor", "margie", "ratman", "ridge", "record", "rhodes", "robin1", "1124", "1210", "1028", "1226", "another", "babylove", "barbados", "harbor", "gramma", "646464", "carpente", "chaos1", "fishbone", "fireblad", "glasgow", "frogs", "scissors", "screamer", "salem", "scuba1", "ducks", "driven", "doggies", "dicky", "donovan", "obsidian", "rams", "progress", "tottenham", "aikman", "comanche", "corolla", "clarke", "conway", "cumslut", "cyborg", "dancing", "boston1", "bong", "houdini", "helmut", "elvisp", "edge", "keksa12", "misha", "monty1", "monsters", "wetter", "watford", "wiseguy", "veronika", "visitor", "janelle", "1989", "1987", "20202020", "biatch", "beezer", "bigguns", "blueball", "bitchy", "wyoming", "yankees2", "wrestler", "stupid1", "sealteam", "sidekick", "simple1", "smackdow", "sporting", "spiral", "smeller", "sperm", "plato", "tophat", "test2", "theatre", "thick", "toomuch", "leigh", "jello", "jewish", "junkie", "maxim", "maxime", "meadow", "remingto", "roofer", "124038", "1018", "1269", "1227", "123457", "arkansas", "alberta", "aramis", "andersen", "beaker", "barcelona", "baltimor", "googoo", "goochi", "852456", "4711", "catcher", "carman", "champ1", "chess", "fortress", "fishfish", "firefigh", "geezer", "rsalinas", "samuel1", "saigon", "scooby1", "doors", "dick1", "devin", "doom", "dirk", "doris", "dontknow", "load", "magpies", "manfred", "raleigh", "vader1", "universa", "tulips", "defense", "mygirl", "burn", "bowtie", "bowman", "holycow", "heinrich", "honeys", "enforcer", "katherine", "minerva", "wheeler", "witch", "waterboy", "jaime", "irving", "1992", "23skidoo", "bimbo", "blue11", "birddog", "woodman", "womble", "zildjian", "030303", "stinker", "stoppedby", "sexybabe", "speakers", "slugger", "spotty", "smoke1", "polopolo", "perfect1", "things", "torpedo", "tender", "thrasher", "lakeside", "lilith", "jimmys", "jerk", "junior1", "marsh", "masamune", "rice", "root", "1214", "april1", "allgood", "bambi", "grinch", "767676", "5252", "cherries", "chipmunk", "cezer121", "carnival", "capecod", "finder", "flint", "fearless", "goats", "funstuff", "gideon", "savior", "seabee", "sandro", "schalke", "salasana", "disney1", "duckman", "options", "pancake", "pantera1", "malice", "lookin", "love123", "lloyd", "qwert123", "puppet", "prayers", "union", "tracer", "crap", "creation", "cwoui", "nascar24", "hookers", "hollie", "hewitt", "estrella", "erection", "ernesto", "ericsson", "edthom", "kaylee", "kokoko", "kokomo", "kimball", "morales", "mooses", "monk", "walton", "weekend", "inter", "internal", "1michael", "1993", "19781978", "25252525", "worker", "summers", "surgery", "shibby", "shamus", "skibum", "sheepdog", "sex69", "spliff", "slipper", "spoons", "spanner", "snowbird", "slow", "toriamos", "temp123", "tennesse", "lakers1", "jomama", "julio", "mazdarx7", "rosario", "recon", "riddle", "room", "revolver", "1025", "1101", "barney1", "babycake", "baylor", "gotham", "gravity", "hallowee", "hancock", "616161", "515000", "caca", "cannabis", "castor", "chilli", "fdsa", "getout", "fuck69", "gators1", "sail", "sable", "rumble", "dolemite", "dork", "dickens", "duffer", "dodgers1", "painting", "onions", "logger", "lorena", "lookout", "magic32", "port", "poon", "prime", "twat", "coventry", "citroen", "christmas", "civicsi", "cocksucker", "coochie", "compaq1", "nancy1", "buzzer", "boulder", "butkus", "bungle", "hogtied", "honor", "hero", "hotgirls", "hilary", "heidi1", "eggplant", "mustang6", "mortal", "monkey12", "wapapapa", "wendy1", "volleyba", "vibrate", "vicky", "bledsoe", "blink", "birthday4", "woof", "xxxxx1", "talk", "stephen1", "suburban", "stock", "tabatha", "sheeba", "start1", "soccer10", "something", "starcraft", "soccer12", "peanut1", "plastics", "penthous", "peterbil", "tools", "tetsuo", "torino", "tennis1", "termite", "ladder", "last", "lemmein", "lakewood", "jughead", "melrose", "megane", "reginald", "redone", "request", "angela1", "alive", "alissa", "goodgirl", "gonzo1", "golden1", "gotyoass", "656565", "626262", "capricor", "chains", "calvin1", "foolish", "fallon", "getmoney", "godfather", "gabber", "gilligan", "runaway", "salami", "dummy", "dungeon", "dudedude", "dumb", "dope", "opus", "paragon", "oxygen", "panhead", "pasadena", "opendoor", "odyssey", "magellan", "lottie", "printing", "pressure", "prince1", "trustme", "christa", "court", "davies", "neville", "nono", "bread", "buffet", "hound", "kajak", "killkill", "mona", "moto", "mildred", "winner1", "vixen", "whiteboy", "versace", "winona", "voyager1", "instant", "indy", "jackjack", "bigal", "beech", "biggun", "blake1", "blue99", "big1", "woods", "synergy", "success1", "336699", "sixty9", "shark1", "skin", "simba1", "sharpe", "sebring", "spongebo", "spunk", "springs", "sliver", "phialpha", "password9", "pizza1", "plane", "perkins", "pookey", "tickling", "lexingky", "lawman", "joe123", "jolly", "mike123", "romeo1", "redheads", "reserve", "apple123", "alanis", "ariane", "antony", "backbone", "aviation", "band", "hand", "green123", "haley", "carlitos", "byebye", "cartman1", "camden", "chewy", "camaross", "favorite6", "forumwp", "franks", "ginscoot", "fruity", "sabrina1", "devil666", "doughnut", "pantie", "oldone", "paintball", "lumina", "rainbow1", "prosper", "total", "true", "umbrella", "ajax", "951753", "achtung", "abc12345", "compact", "color", "corn", "complete", "christi", "closer", "corndog", "deerhunt", "darklord", "dank", "nimitz", "brandy1", "bowl", "breanna", "holidays", "hetfield", "holein1", "hillbill", "hugetits", "east", "evolutio", "kenobi", "whiplash", "waldo", "wg8e3wjf", "wing", "istanbul", "invis", "1996", "benton", "bigjohn", "bluebell", "beef", "beater", "benji", "bluejay", "xyzzy", "wrestling", "storage", "superior", "suckdick", "taichi", "stellar", "stephane", "shaker", "skirt", "seymour", "semper", "splurge", "squeak", "pearls", "playball", "pitch", "phyllis", "pooky", "piss", "tomas", "titfuck", "joemama", "johnny5", "marcello", "marjorie", "married", "maxi", "rhubarb", "rockwell", "ratboy", "reload", "rooney", "redd", "1029", "1030", "1220", "anchor", "bbking", "baritone", "gryphon", "gone", "57chevy", "494949", "celeron", "fishy", "gladiator", "fucker1", "roswell", "dougie", "downer", "dicker", "diva", "domingo", "donjuan", "nympho", "omar", "praise", "racers", "trick", "trauma", "truck1", "trample", "acer", "corwin", "cricket1", "clemente", "climax", "denmark", "cuervo", "notnow", "nittany", "neutron", "native", "bosco1", "buffa", "breaker", "hello2", "hydro", "estelle", "exchange", "explore", "kisskiss", "kittys", "kristian", "montecar", "modem", "mississi", "mooney", "weiner", "washington", "20012001", "bigdick1", "bibi", "benfica", "yahoo1", "striper", "tabasco", "supra", "383838", "456654", "seneca", "serious", "shuttle", "socks", "stanton", "penguin1", "pathfind", "testibil", "thethe", "listen", "lightning", "lighting", "jeter2", "marma", "mark1", "metoo", "republic", "rollin", "redleg", "redbone", "redskin", "rocco", "1245", "armand", "anthony7", "altoids", "andrews", "barley", "away", "asswipe", "bauhaus", "bbbbbb1", "gohome", "harrier", "golfpro", "goldeney", "818181", "6666666", "5000", "5rxypn", "cameron1", "calling", "checker", "calibra", "fields", "freefree", "faith1", "fist", "fdm7ed", "finally", "giraffe", "glasses", "giggles", "fringe", "gate", "georgie", "scamper", "rrpass1", "screwyou", "duffy", "deville", "dimples", "pacino", "ontario", "passthie", "oberon", "quest1", "postov1000", "puppydog", "puffer", "raining", "protect", "qwerty7", "trey", "tribe", "ulysses", "tribal", "adam25", "a1234567", "compton", "collie", "cleopatr", "contract", "davide", "norris", "namaste", "myrtle", "buffalo1", "bonovox", "buckley", "bukkake", "burning", "burner", "bordeaux", "burly", "hun999", "emilie", "elmo", "enters", "enrique", "keisha", "mohawk", "willard", "vgirl", "whale", "vince", "jayden", "jarrett", "1812", "1943", "222333", "bigjim", "bigd", "zoom", "wordup", "ziggy1", "yahooo", "workout", "young1", "written", "xmas", "zzzzzz1", "surfer1", "strife", "sunlight", "tasha1", "skunk", "shauna", "seth", "soft", "sprinter", "peaches1", "planes", "pinetree", "plum", "pimping", "theforce", "thedon", "toocool", "leeann", "laddie", "list", "lkjh", "lara", "joke", "jupiter1", "mckenzie", "matty", "rene", "redrose", "1200", "102938", "annmarie", "alexa", "antares", "austin31", "ground", "goose1", "737373", "78945612", "789987", "6464", "calimero", "caster", "casper1", "cement", "chevrolet", "chessie", "caddy", "chill", "child", "canucks", "feeling", "favorite", "fellatio", "f00tball", "francine", "gateway2", "gigi", "gamecube", "giovanna", "rugby1", "scheisse", "dshade", "dudes", "dixie1", "owen", "offshore", "olympia", "lucas1", "macaroni", "manga", "pringles", "puff", "tribble", "trouble1", "ussy", "core", "clint", "coolhand", "colonial", "colt", "debra", "darthvad", "dealer", "cygnusx1", "natalie1", "newark", "husband", "hiking", "errors", "eighteen", "elcamino", "emmett", "emilia", "koolaid", "knight1", "murphy1", "volcano", "idunno", "2005", "2233", "block", "benito", "blueberr", "biguns", "yamahar1", "zapper", "zorro1", "0911", "3006", "sixsix", "shopper", "siobhan", "sextoy", "stafford", "snowboard", "speedway", "sounds", "pokey", "peabody", "playboy2", "titi", "think", "toast", "toonarmy", "lister", "lambda", "joecool", "jonas", "joyce", "juniper", "mercer", "max123", "manny", "massimo", "mariposa", "met2002", "reggae", "ricky1", "1236", "1228", "1016", "all4one", "arianna", "baberuth", "asgard", "gonzales", "484848", "5683", "6669", "catnip", "chiquita", "charisma", "capslock", "cashmone", "chat", "figure", "galant", "frenchy", "gizmodo1", "girlies", "gabby", "garner", "screwy", "doubled", "divers", "dte4uw", "done", "dragonfl", "maker", "locks", "rachelle", "treble", "twinkie", "trailer", "tropical", "acid", "crescent", "cooking", "cococo", "cory", "dabomb", "daffy", "dandfa", "cyrano", "nathanie", "briggs", "boners", "helium", "horton", "hoffman", "hellas", "espresso", "emperor", "killa", "kikimora", "wanda", "w4g8at", "verona", "ilikeit", "iforget", "1944", "20002000", "birthday1", "beatles1", "blue1", "bigdicks", "beethove", "blacklab", "blazers", "benny1", "woodwork", "0069", "0101", "taffy", "susie", "survivor", "swim", "stokes", "4567", "shodan", "spoiled", "steffen", "pissed", "pavlov", "pinnacle", "place", "petunia", "terrell", "thirty", "toni", "tito", "teenie", "lemonade", "lily", "lillie", "lalakers", "lebowski", "lalalala", "ladyboy", "jeeper", "joyjoy", "mercury1", "mantle", "mannn", "rocknrol", "riversid", "reeves", "123aaa", "11112222", "121314", "1021", "1004", "1120", "allen1", "ambers", "amstel", "ambrose", "alice1", "alleycat", "allegro", "ambrosia", "alley", "australia", "hatred", "gspot", "graves", "goodsex", "hattrick", "harpoon", "878787", "8inches", "4wwvte", "cassandr", "charlie123", "case", "chavez", "fighting", "gabriela", "gatsby", "fudge", "gerry", "generic", "gareth", "fuckme2", "samm", "sage", "seadog", "satchmo", "scxakv", "santafe", "dipper", "dingle", "dizzy", "outoutout", "madmad", "london1", "qbg26i", "pussy123", "randolph", "vaughn", "tzpvaw", "vamp", "comedy", "comp", "cowgirl", "coldplay", "dawgs", "delaney", "nt5d27", "novifarm", "needles", "notredam", "newness", "mykids", "bryan1", "bouncer", "hihihi", "honeybee", "iceman1", "herring", "horn", "hook", "hotlips", "dynamo", "klaus", "kittie", "kappa", "kahlua", "muffy", "mizzou", "mohamed", "musical", "wannabe", "wednesda", "whatup", "weller", "waterfal", "willy1", "invest", "blanche", "bear1", "billabon", "youknow", "zelda", "yyyyyy1", "zachary1", "01234567", "070462", "zurich", "superstar", "storms", "tail", "stiletto", "strat", "427900", "sigmachi", "shelter", "shells", "sexy123", "smile1", "sophie1", "stefano", "stayout", "somerset", "smithers", "playmate", "pinkfloyd", "phish1", "payday", "thebear", "telefon", "laetitia", "kswbdu", "larson", "jetta", "jerky", "melina", "metro", "revoluti", "retire", "respect", "1216", "1201", "1204", "1222", "1115", "archange", "barry1", "handball", "676767", "chandra", "chewbacc", "flesh", "furball", "gocubs", "fruit", "fullback", "gman", "gentle", "dunbar", "dewalt", "dominiqu", "diver1", "dhip6a", "olemiss", "ollie", "mandrake", "mangos", "pretzel", "pusssy", "tripleh", "valdez", "vagabond", "clean", "comment", "crew", "clovis", "deaths", "dandan", "csfbr5yy", "deadspin", "darrel", "ninguna", "noah", "ncc74656", "bootsie", "bp2002", "bourbon", "brennan", "bumble", "books", "hose", "heyyou", "houston1", "hemlock", "hippo", "hornets", "hurricane", "horseman", "hogan", "excess", "extensa", "muffin1", "virginie", "werdna", "idontknow", "info", "iron", "jack1", "1bitch", "151nxjmt", "bendover", "bmwbmw", "bills", "zaq123", "wxcvbn", "surprise", "supernov", "tahoe", "talbot", "simona", "shakur", "sexyone", "seviyi", "sonja", "smart1", "speed1", "pepito", "phantom1", "playoffs", "terry1", "terrier", "laser1", "lite", "lancia", "johngalt", "jenjen", "jolene", "midori", "message", "maserati", "matteo", "mental", "miami1", "riffraff", "ronald1", "reason", "rhythm", "1218", "1026", "123987", "1015", "1103", "armada", "architec", "austria", "gotmilk", "hawkins", "gray", "camila", "camp", "cambridg", "charge", "camero", "flex", "foreplay", "getoff", "glacier", "glotest", "froggie", "gerbil", "rugger", "sanity72", "salesman", "donna1", "dreaming", "deutsch", "orchard", "oyster", "palmtree", "ophelia", "pajero", "m5wkqf", "magenta", "luckyone", "treefrog", "vantage", "usmarine", "tyvugq", "uptown", "abacab", "aaaaaa1", "advance", "chuck1", "delmar", "darkange", "cyclones", "nate", "navajo", "nope", "border", "bubba123", "building", "iawgk2", "hrfzlz", "dylan1", "enrico", "encore", "emilio", "eclipse1", "killian", "kayleigh", "mutant", "mizuno", "mustang2", "video1", "viewer", "weed420", "whales", "jaguar1", "insight", "1990", "159159", "1love", "bliss", "bears1", "bigtruck", "binder", "bigboss", "blitz", "xqgann", "yeahyeah", "zeke", "zardoz", "stickman", "table", "3825", "signal", "sentra", "side", "shiva", "skipper1", "singapor", "southpaw", "sonora", "squid", "slamdunk", "slimjim", "placid", "photon", "placebo", "pearl1", "test12", "therock1", "tiger123", "leinad", "legman", "jeepers", "joeblow", "mccarthy", "mike23", "redcar", "rhinos", "rjw7x4", "1102", "13576479", "112211", "alcohol", "gwju3g", "greywolf", "7bgiqk", "7878", "535353", "4snz9g", "candyass", "cccccc1", "carola", "catfight", "cali", "fister", "fosters", "finland", "frankie1", "gizzmo", "fuller", "royalty", "rugrat", "sandie", "rudolf", "dooley", "dive", "doreen", "dodo", "drop", "oemdlg", "out3xf", "paddy", "opennow", "puppy1", "qazwsxedc", "pregnant", "quinn", "ramjet", "under", "uncle", "abraxas", "corner", "creed", "cocoa", "crown", "cows", "cn42qj", "dancer1", "death666", "damned", "nudity", "negative", "nimda2k", "buick", "bobb", "braves1", "brook", "henrik", "higher", "hooligan", "dust", "everlast", "karachi", "mortis", "mulligan", "monies", "motocros", "wally1", "weapon", "waterman", "view", "willie1", "vicki", "inspiron", "1test", "2929", "bigblack", "xytfu7", "yackwin", "zaq1xsw2", "yy5rbfsc", "100100", "0660", "tahiti", "takehana", "talks", "332211", "3535", "sedona", "seawolf", "skydiver", "shine", "spleen", "slash", "spjfet", "special1", "spooner", "slimshad", "sopranos", "spock1", "penis1", "patches1", "terri", "thierry", "thething", "toohot", "large", "limpone", "johnnie", "mash4077", "matchbox", "masterp", "maxdog", "ribbit", "reed", "rita", "rockin", "redhat", "rising", "1113", "14789632", "1331", "allday", "aladin", "andrey", "amethyst", "ariel", "anytime", "baseball1", "athome", "basil", "goofy1", "greenman", "gustavo", "goofball", "ha8fyp", "goodday", "778899", "charon", "chappy", "castillo", "caracas", "cardiff", "capitals", "canada1", "cajun", "catter", "freddy1", "favorite2", "frazier", "forme", "follow", "forsaken", "feelgood", "gavin", "gfxqx686", "garlic", "sarge", "saskia", "sanjose", "russ", "salsa", "dilbert1", "dukeduke", "downhill", "longhair", "loop", "locutus", "lockdown", "malachi", "mamacita", "lolipop", "rainyday", "pumpkin1", "punker", "prospect", "rambo1", "rainbows", "quake", "twin", "trinity1", "trooper1", "aimee", "citation", "coolcat", "crappy", "default", "dental", "deniro", "d9ungl", "daddys", "napoli", "nautica", "nermal", "bukowski", "brick", "bubbles1", "bogota", "board", "branch", "breath", "buds", "hulk", "humphrey", "hitachi", "evans", "ender", "export", "kikiki", "kcchiefs", "kram", "morticia", "montrose", "mongo", "waqw3p", "wizzard", "visited", "whdbtp", "whkzyc", "image", "154ugeiu", "1fuck", "binky", "blind", "bigred1", "blubber", "benz", "becky1", "year2005", "wonderfu", "wooden", "xrated", "0001", "tampabay", "survey", "tammy1", "stuffer", "3mpz4r", "3000", "3some", "selina", "sierra1", "shampoo", "silk", "shyshy", "slapnuts", "standby", "spartan1", "sprocket", "sometime", "stanley1", "poker1", "plus", "thought", "theshit", "torture", "thinking", "lavalamp", "light1", "laserjet", "jediknig", "jjjjj1", "jocelyn", "mazda626", "menthol", "maximo", "margaux", "medic1", "release", "richter", "rhino1", "roach", "renate", "repair", "reveal", "1209", "1234321", "amigos", "apricot", "alexandra", "asdfgh1", "hairball", "hatter", "graduate", "grimace", "7xm5rq", "6789", "cartoons", "capcom", "cheesy", "cashflow", "carrots", "camping", "fanatic", "fool", "format", "fleming", "girlie", "glover", "gilmore", "gardner", "safeway", "ruthie", "dogfart", "dondon", "diapers", "outsider", "odin", "opiate", "lollol", "love12", "loomis", "mallrats", "prague", "primetime21", "pugsley", "program", "r29hqq", "touch", "valleywa", "airman", "abcdefg1", "darkone", "cummer", "dempsey", "damn", "nadia", "natedogg", "nineball", "ndeyl5", "natchez", "newone", "normandy", "nicetits", "buddy123", "buddys", "homely", "husky", "iceland", "hr3ytm", "highlife", "holla", "earthlin", "exeter", "eatmenow", "kimkim", "karine", "k2trix", "kernel", "kirkland", "money123", "moonman", "miles1", "mufasa", "mousey", "wilma", "wilhelm", "whites", "warhamme", "instinct", "jackass1", "2277", "20spanks", "blobby", "blair", "blinky", "bikers", "blackjack", "becca", "blue23", "xman", "wyvern", "085tzzqi", "zxzxzx", "zsmj2v", "suede", "t26gn4", "sugars", "sylvie", "tantra", "swoosh", "swiss", "4226", "4271", "321123", "383pdjvl", "shoe", "shane1", "shelby1", "spades", "spain", "smother", "soup", "sparhawk", "pisser", "photo1", "pebble", "phones", "peavey", "picnic", "pavement", "terra", "thistle", "tokyo", "therapy", "lives", "linden", "kronos", "lilbit", "linux", "johnston", "material", "melanie1", "marbles", "redlight", "reno", "recall", "1208", "1138", "1008", "alchemy", "aolsucks", "alexalex", "atticus", "auditt", "ballet", "b929ezzh", "goodyear", "hanna", "griffith", "gubber", "863abgsg", "7474", "797979", "464646", "543210", "4zqauf", "4949", "ch5nmk", "carlito", "chewey", "carebear", "caleb", "checkmat", "cheddar", "chachi", "fever", "forgetit", "fine", "forlife", "giants1", "gates", "getit", "gamble", "gerhard", "galileo", "g3ujwg", "ganja", "rufus1", "rushmore", "scouts", "discus", "dudeman", "olympus", "oscars", "osprey", "madcow", "locust", "loyola", "mammoth", "proton", "rabbit1", "question", "ptfe3xxp", "pwxd5x", "purple1", "punkass", "prophecy", "uyxnyd", "tyson1", "aircraft", "access99", "abcabc", "cocktail", "colts", "civilwar", "cleveland", "claudia1", "contour", "clement", "dddddd1", "cypher", "denied", "dapzu455", "dagmar", "daisydog", "name", "noles", "butters", "buford", "hoochie", "hotel", "hoser", "eddy", "ellis", "eldiablo", "kingrich", "mudvayne", "motown", "mp8o6d", "wife", "vipergts", "italiano", "innocent", "2055", "2211", "beavers", "bloke", "blade1", "yamato", "zooropa", "yqlgr667", "050505", "zxcvbnm1", "zw6syj", "suckcock", "tango1", "swing", "stern", "stephens", "swampy", "susanna", "tammie", "445566", "333666", "380zliki", "sexpot", "sexylady", "sixtynin", "sickboy", "spiffy", "sleeping", "skylark", "sparkles", "slam", "pintail", "phreak", "places", "teller", "timtim", "tires", "thighs", "left", "latex", "llamas", "letsdoit", "lkjhg", "landmark", "letters", "lizzard", "marlins", "marauder", "metal1", "manu", "register", "righton", "1127", "alain", "alcat", "amigo", "basebal1", "azertyui", "attract", "azrael", "hamper", "gotenks", "golfgti", "gutter", "hawkwind", "h2slca", "harman", "grace1", "6chid8", "789654", "canine", "casio", "cazzo", "chamber", "cbr900", "cabrio", "calypso", "capetown", "feline", "flathead", "fisherma", "flipmode", "fungus", "goal", "g9zns4", "full", "giggle", "gabriel1", "fuck123", "saffron", "dogmeat", "dreamcas", "dirtydog", "dunlop", "douche", "dresden", "dickdick", "destiny1", "pappy", "oaktree", "lydia", "luft4", "puta", "prayer", "ramada", "trumpet1", "vcradq", "tulip", "tracy71", "tycoon", "aaaaaaa1", "conquest", "click", "chitown", "corps", "creepers", "constant", "couples", "code", "cornhole", "danman", "dada", "density", "d9ebk7", "cummins", "darth", "cute", "nash", "nirvana1", "nixon", "norbert", "nestle", "brenda1", "bonanza", "bundy", "buddies", "hotspur", "heavy", "horror", "hufmqw", "electro", "erasure", "enough", "elisabet", "etvww4", "ewyuza", "eric1", "kinder", "kenken", "kismet", "klaatu", "musician", "milamber", "willi", "waiting", "isacs155", "igor", "1million", "1letmein", "x35v8l", "yogi", "ywvxpz", "xngwoj", "zippy1", "020202", "****", "stonewal", "sweeney", "story", "sentry", "sexsexsex", "spence", "sonysony", "smirnoff", "star12", "solace", "sledge", "states", "snyder", "star1", "paxton", "pentagon", "pkxe62", "pilot1", "pommes", "paulpaul", "plants", "tical", "tictac", "toes", "lighthou", "lemans", "kubrick", "letmein22", "letmesee", "jys6wz", "jonesy", "jjjjjj1", "jigga", "joelle", "mate", "merchant", "redstorm", "riley1", "rosa", "relief", "14141414", "1126", "allison1", "badboy1", "asthma", "auggie", "basement", "hartley", "hartford", "hardwood", "gumbo", "616913", "57np39", "56qhxs", "4mnveh", "cake", "forbes", "fatluvr69", "fqkw5m", "fidelity", "feathers", "fresno", "godiva", "gecko", "gladys", "gibson1", "gogators", "fridge", "general1", "saxman", "rowing", "sammys", "scotts", "scout1", "sasasa", "samoht", "dragon69", "ducky", "dragonball", "driller", "p3wqaw", "nurse", "papillon", "oneone", "openit", "optimist", "longshot", "portia", "rapier", "pussy2", "ralphie", "tuxedo", "ulrike", "undertow", "trenton", "copenhag", "come", "delldell", "culinary", "deltas", "mytime", "nicky", "nickie", "noname", "noles1", "bucker", "bopper", "bullock", "burnout", "bryce", "hedges", "ibilltes", "hihje863", "hitter", "ekim", "espana", "eatme69", "elpaso", "envelope", "express1", "eeeeee1", "eatme1", "karaoke", "kara", "mustang5", "misses", "wellingt", "willem", "waterski", "webcam", "jasons", "infinite", "iloveyou!", "jakarta", "belair", "bigdad", "beerme", "yoshi", "yinyang", "zimmer", "x24ik3", "063dyjuy", "0000007", "ztmfcq", "stopit", "stooges", "survival", "stockton", "symow8", "strato", "2hot4u", "ship", "simons", "skins", "shakes", "sex1", "shield", "snacks", "softtail", "slimed123", "pizzaman", "pipe", "pitt", "pathetic", "pinto", "tigercat", "tonton", "lager", "lizzy", "juju", "john123", "jennings", "josiah", "jesse1", "jordon", "jingles", "martian", "mario1", "rootedit", "rochard", "redwine", "requiem", "riverrat", "rats", "1117", "1014", "1205", "althea", "allie", "amor", "amiga", "alpina", "alert", "atreides", "banana1", "bahamut", "hart", "golfman", "happines", "7uftyx", "5432", "5353", "5151", "4747", "byron", "chatham", "chadwick", "cherie", "foxfire", "ffvdj474", "freaked", "foreskin", "gayboy", "gggggg1", "glenda", "gameover", "glitter", "funny1", "scoobydoo", "scroll", "rudolph", "saddle", "saxophon", "dingbat", "digimon", "omicron", "parsons", "ohio", "panda1", "loloxx", "macintos", "lululu", "lollypop", "racer1", "queen1", "qwertzui", "prick", "upnfmc", "tyrant", "trout1", "9skw5g", "aceman", "adelaide", "acls2h", "aaabbb", "acapulco", "aggie", "comcast", "craft", "crissy", "cloudy", "cq2kph", "custer", "d6o8pm", "cybersex", "davecole", "darian", "crumbs", "daisey", "davedave", "dasani", "needle", "mzepab", "myporn", "narnia", "nineteen", "booger1", "bravo1", "budgie", "btnjey", "highlander", "hotel6", "humbug", "edwin", "ewtosi", "kristin1", "kobe", "knuckles", "keith1", "katarina", "muff", "muschi", "montana1", "wingchun", "wiggle", "whatthe", "walking", "watching", "vette1", "vols", "virago", "intj3a", "ishmael", "intern", "jachin", "illmatic", "199999", "2010", "beck", "blender", "bigpenis", "bengal", "blue1234", "your", "zaqxsw", "xray", "xxxxxxx1", "zebras", "yanks", "worlds", "tadpole", "stripes", "svetlana", "3737", "4343", "3728", "4444444", "368ejhih", "solar", "sonne", "smalls", "sniffer", "sonata", "squirts", "pitcher", "playstation", "pktmxr", "pescator", "points", "texaco", "lesbos", "lilian", "l8v53x", "jo9k2jw2", "jimbeam", "josie", "jimi", "jupiter2", "jurassic", "marines1", "maya", "rocket1", "ringer", "14725836", "12345679", "1219", "123098", "1233", "alessand", "althor", "angelika", "arch", "armando", "alpha123", "basher", "barefeet", "balboa", "bbbbb1", "banks", "badabing", "harriet", "gopack", "golfnut", "gsxr1000", "gregory1", "766rglqy", "8520", "753159", "8dihc6", "69camaro", "666777", "cheeba", "chino", "calendar", "cheeky", "camel1", "fishcake", "falling", "flubber", "giuseppe", "gianni", "gloves", "gnasher23", "frisbee", "fuzzy1", "fuzzball", "sauce", "save13tx", "schatz", "russell1", "sandra1", "scrotum", "scumbag", "sabre", "samdog", "dripping", "dragon12", "dragster", "paige", "orwell", "mainland", "lunatic", "lonnie", "lotion", "maine", "maddux", "qn632o", "poophead", "rapper", "porn4life", "producer", "rapunzel", "tracks", "velocity", "vanessa1", "ulrich", "trueblue", "vampire1", "abacus", "902100", "crispy", "corky", "crane", "chooch", "d6wnro", "cutie", "deal", "dabulls", "dehpye", "navyseal", "njqcw4", "nownow", "nigger1", "nightowl", "nonenone", "nightmar", "bustle", "buddy2", "boingo", "bugman", "bulletin", "bosshog", "bowie", "hybrid", "hillside", "hilltop", "hotlegs", "honesty", "hzze929b", "hhhhh1", "hellohel", "eloise", "evilone", "edgewise", "e5pftu", "eded", "embalmer", "excalibur", "elefant", "kenzie", "karl", "karin", "killah", "kleenex", "mouses", "mounta1n", "motors", "mutley", "muffdive", "vivitron", "winfield", "wednesday", "w00t88", "iloveit", "jarjar", "incest", "indycar", "17171717", "1664", "17011701", "222777", "2663", "beelch", "benben", "yitbos", "yyyyy1", "yasmin", "zapata", "zzzzz1", "stooge", "tangerin", "taztaz", "stewart1", "summer69", "sweetness", "system1", "surveyor", "stirling", "3qvqod", "3way", "456321", "sizzle", "simhrq", "shrink", "shawnee", "someday", "sparty", "ssptx452", "sphere", "spark", "slammed", "sober", "persian", "peppers", "ploppy", "pn5jvw", "poobear", "pianos", "plaster", "testme", "tiff", "thriller", "larissa", "lennox", "jewell", "master12", "messier", "rockey", "1229", "1217", "1478", "1009", "anastasi", "almighty", "amonra", "aragon", "argentin", "albino", "azazel", "grinder", "6uldv8", "83y6pv", "8888888", "4tlved", "515051", "carsten", "changes", "flanders", "flyers88", "ffffff1", "firehawk", "foreman", "firedog", "flashman", "ggggg1", "gerber", "godspeed", "galway", "giveitup", "funtimes", "gohan", "giveme", "geryfe", "frenchie", "sayang", "rudeboy", "savanna", "sandals", "devine", "dougal", "drag0n", "dga9la", "disaster", "desktop", "only", "onlyone", "otter", "pandas", "mafia", "lombard", "luckys", "lovejoy", "lovelife", "manders", "product", "qqh92r", "qcmfd454", "pork", "radar1", "punani", "ptbdhw", "turtles", "undertaker", "trs8f7", "tramp", "ugejvp", "abba", "911turbo", "acdc", "abcd123", "clever", "corina", "cristian", "create", "crash1", "colony", "crosby", "delboy", "daniele", "davinci", "daughter", "notebook", "niki", "nitrox", "borabora", "bonzai", "budd", "brisbane", "hotter", "heeled", "heroes", "hooyah", "hotgirl", "i62gbq", "horse1", "hills", "hpk2qc", "epvjb6", "echo", "korean", "kristie", "mnbvc", "mohammad", "mind", "mommy1", "munster", "wade", "wiccan", "wanted", "jacket", "2369", "bettyboo", "blondy", "bismark", "beanbag", "bjhgfi", "blackice", "yvtte545", "ynot", "yess", "zlzfrh", "wolvie", "007bond", "******", "tailgate", "tanya1", "sxhq65", "stinky1", "3234412", "3ki42x", "seville", "shimmer", "sheryl", "sienna", "shitshit", "skillet", "seaman", "sooners1", "solaris", "smartass", "pastor", "pasta", "pedros", "pennywis", "pfloyd", "tobydog", "thetruth", "lethal", "letme1n", "leland", "jenifer", "mario66", "micky", "rocky2", "rewq", "ripped", "reindeer", "1128", "1207", "1104", "1432", "aprilia", "allstate", "alyson", "bagels", "basic", "baggies", "barb", "barrage", "greatest", "gomez", "guru", "guard", "72d5tn", "606060", "4wcqjn", "caldwell", "chance1", "catalog", "faust", "film", "flange", "fran", "fartman", "geil", "gbhcf2", "fussball", "glen", "fuaqz4", "gameboy", "garnet", "geneviev", "rotary", "seahawk", "russel", "saab", "seal", "samadams", "devlt4", "ditto", "drevil", "drinker", "deuce", "dipstick", "donut", "octopus", "ottawa", "losangel", "loverman", "porky", "q9umoz", "rapture", "pump", "pussy4me", "university", "triplex", "ue8fpw", "trent", "trophy", "turbos", "troubles", "agent", "aaa340", "churchil", "crazyman", "consult", "creepy", "craven", "class", "cutiepie", "ddddd1", "dejavu", "cuxldv", "nettie", "nbvibt", "nikon", "niko", "norwood", "nascar1", "nolan", "bubba2", "boobear", "boogers", "buff", "bullwink", "bully", "bulldawg", "horsemen", "escalade", "editor", "eagle2", "dynamic", "ella", "efyreg", "edition", "kidney", "minnesot", "mogwai", "morrow", "msnxbi", "moonlight", "mwq6qlzo", "wars", "werder", "verygood", "voodoo1", "wheel", "iiiiii1", "159951", "1624", "1911a1", "2244", "bellagio", "bedlam", "belkin", "bill1", "woodrow", "xirt2k", "worship", "??????", "tanaka", "swift", "susieq", "sundown", "sukebe", "tales", "swifty", "2fast4u", "senate", "sexe", "sickness", "shroom", "shaun", "seaweed", "skeeter1", "status", "snicker", "sorrow", "spanky1", "spook", "patti", "phaedrus", "pilots", "pinch", "peddler", "theo", "thumper1", "tessie", "tiger7", "tmjxn151", "thematri", "l2g7k3", "letmeinn", "lazy", "jeffjeff", "joan", "johnmish", "mantra", "mariana", "mike69", "marshal", "mart", "mazda6", "riptide", "robots", "rental", "1107", "1130", "142857", "11001001", "1134", "armored", "alvin", "alec", "allnight", "alright", "amatuers", "bartok", "attorney", "astral", "baboon", "bahamas", "balls1", "bassoon", "hcleeb", "happyman", "granite", "graywolf", "golf1", "gomets", "8vjzus", "7890", "789123", "8uiazp", "5757", "474jdvff", "551scasi", "50cent", "camaro1", "cherry1", "chemist", "final", "firenze", "fishtank", "farrell", "freewill", "glendale", "frogfrog", "gerhardt", "ganesh", "same", "scirocco", "devilman", "doodles", "dinger", "okinawa", "olympic", "nursing", "orpheus", "ohmygod", "paisley", "pallmall", "null", "lounge", "lunchbox", "manhatta", "mahalo", "mandarin", "qwqwqw", "qguvyt", "pxx3eftp", "president", "rambler", "puzzle", "poppy1", "turk182", "trotter", "vdlxuc", "trish", "tugboat", "valiant", "tracie", "uwrl7c", "chris123", "coaster", "cmfnpu", "decimal", "debbie1", "dandy", "daedalus", "dede", "natasha1", "nissan1", "nancy123", "nevermin", "napalm", "newcastle", "boats", "branden", "britt", "bonghit", "hester", "ibxnsm", "hhhhhh1", "holger", "durham", "edmonton", "erwin", "equinox", "dvader", "kimmy", "knulla", "mustafa", "monsoon", "mistral", "morgana", "monica1", "mojave", "month", "monterey", "mrbill", "vkaxcs", "victor1", "wacker", "wendell", "violator", "vfdhif", "wilson1", "wavpzt", "verena", "wildstar", "winter99", "iqzzt580", "jarrod", "imback", "1914", "19741974", "1monkey", "1q2w3e4r5t", "2500", "2255", "blank", "bigshow", "bigbucks", "blackcoc", "zoomer", "wtcacq", "wobble", "xmen", "xjznq5", "yesterda", "yhwnqc", "zzzxxx", "streak", "393939", "2fchbg", "skinhead", "skilled", "shakira", "shaft", "shadow12", "seaside", "sigrid", "sinful", "silicon", "smk7366", "snapshot", "sniper1", "soccer11", "staff", "slap", "smutty", "peepers", "pleasant", "plokij", "pdiddy", "pimpdaddy", "thrust", "terran", "topaz", "today1", "lionhear", "littlema", "lauren1", "lincoln1", "lgnu9d", "laughing", "juneau", "methos", "medina", "merlyn", "rogue1", "romulus", "redshift", "1202", "1469", "12locked", "arizona1", "alfarome", "al9agd", "aol123", "altec", "apollo1", "arse", "baker1", "bbb747", "bach", "axeman", "astro1", "hawthorn", "goodfell", "hawks1", "gstring", "hannes", "8543852", "868686", "4ng62t", "554uzpad", "5401", "567890", "5232", "catfood", "frame", "flow", "fire1", "flipflop", "fffff1", "fozzie", "fluff", "garrison", "fzappa", "furious", "round", "rustydog", "sandberg", "scarab", "satin", "ruger", "samsung1", "destin", "diablo2", "dreamer1", "detectiv", "dominick", "doqvq3", "drywall", "paladin1", "papabear", "offroad", "panasonic", "nyyankee", "luetdi", "qcfmtz", "pyf8ah", "puddles", "privacy", "rainer", "pussyeat", "ralph1", "princeto", "trivia", "trewq", "tri5a3", "advent", "9898", "agyvorc", "clarkie", "coach1", "courier", "contest", "christo", "corinna", "chowder", "concept", "climbing", "cyzkhw", "davidb", "dad2ownu", "days", "daredevi", "de7mdf", "nose", "necklace", "nazgul", "booboo1", "broad", "bonzo", "brenna", "boot", "butch1", "huskers1", "hgfdsa", "hornyman", "elmer", "elektra", "england1", "elodie", "kermit1", "knife", "kaboom", "minute", "modern", "motherfucker", "morten", "mocha", "monday1", "morgoth", "ward", "weewee", "weenie", "walters", "vorlon", "website", "wahoo", "ilovegod", "insider", "jayman", "1911", "1dallas", "1900", "1ranger", "201jedlz", "2501", "1qaz", "bertram", "bignuts", "bigbad", "beebee", "billows", "belize", "bebe", "wvj5np", "wu4etd", "yamaha1", "wrinkle5", "zebra1", "yankee1", "zoomzoom", "09876543", "0311", "?????", "stjabn", "tainted", "3tmnej", "shoot", "skooter", "skelter", "sixteen", "starlite", "smack", "spice1", "stacey1", "smithy", "perrin", "pollux", "peternorth", "pixie", "paulina", "piston", "pick", "poets", "pine", "toons", "tooth", "topspin", "kugm7b", "legends", "jeepjeep", "juliana", "joystick", "junkmail", "jojojojo", "jonboy", "judge", "midland", "meteor", "mccabe", "matter", "mayfair", "meeting", "merrill", "raul", "riches", "reznor", "rockrock", "reboot", "reject", "robyn", "renee1", "roadway", "rasta220", "1411", "1478963", "1019", "archery", "allman", "andyandy", "barks", "bagpuss", "auckland", "gooseman", "hazmat", "gucci", "guns", "grammy", "happydog", "greek", "7kbe9d", "7676", "6bjvpe", "5lyedn", "5858", "5291", "charlie2", "chas", "c7lrwu", "candys", "chateau", "ccccc1", "cardinals", "fear", "fihdfv", "fortune12", "gocats", "gaelic", "fwsadn", "godboy", "gldmeo", "fx3tuo", "fubar1", "garland", "generals", "gforce", "rxmtkp", "rulz", "sairam", "dunhill", "division", "dogggg", "detect", "details", "doll", "drinks", "ozlq6qwm", "ov3ajy", "lockout", "makayla", "macgyver", "mallorca", "loves", "prima", "pvjegu", "qhxbij", "raphael", "prelude1", "totoro", "tusymo", "trousers", "tunnel", "valeria", "tulane", "turtle1", "tracy1", "aerosmit", "abbey1", "address", "clticic", "clueless", "cooper1", "comets", "collect", "corbin", "delpiero", "derick", "cyprus", "dante1", "dave1", "nounours", "neal", "nexus6", "nero", "nogard", "norfolk", "brent1", "booyah", "bootleg", "buckaroo", "bulls23", "bulls1", "booper", "heretic", "icecube", "hellno", "hounds", "honeydew", "hooters1", "hoes", "howie", "hevnm4", "hugohugo", "eighty", "epson", "evangeli", "eeeee1", "eyphed"];

module.exports = CommonPasswords;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
    };
}

/***/ }),
/* 150 */,
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Client = __webpack_require__(4);
var Clock = __webpack_require__(20);
var GTM = __webpack_require__(48);
var Header = __webpack_require__(27);
var Login = __webpack_require__(41);
var BinarySocket = __webpack_require__(5);
var Dialog = __webpack_require__(89);
var showPopup = __webpack_require__(90);
var setCurrencies = __webpack_require__(7).setCurrencies;
var SessionDurationLimit = __webpack_require__(155);
var updateBalance = __webpack_require__(163);
var State = __webpack_require__(6).State;
var urlFor = __webpack_require__(8).urlFor;
var getPropertyValue = __webpack_require__(0).getPropertyValue;

var BinarySocketGeneral = function () {
    var onOpen = function onOpen(is_ready) {
        Header.hideNotification();
        if (is_ready) {
            if (!Login.isLoginPages()) {
                if (!Client.isValidLoginid()) {
                    Client.sendLogoutRequest();
                    return;
                }
                BinarySocket.send({ website_status: 1, subscribe: 1 });
            }
            Clock.startClock();
        }
    };

    var onMessage = function onMessage(response) {
        Header.hideNotification('CONNECTION_ERROR');
        var is_available = false;
        switch (response.msg_type) {
            case 'website_status':
                if (response.website_status) {
                    is_available = /^up$/i.test(response.website_status.site_status);
                    if (is_available && !BinarySocket.availability()) {
                        window.location.reload();
                    } else if (!is_available) {
                        Header.displayNotification(response.website_status.message, true);
                    }
                    BinarySocket.availability(is_available);
                    setCurrencies(response.website_status);
                }
                break;
            case 'authorize':
                if (response.error) {
                    var is_active_tab = sessionStorage.getItem('active_tab') === '1';
                    if (getPropertyValue(response, ['error', 'code']) === 'SelfExclusion' && is_active_tab) {
                        sessionStorage.removeItem('active_tab');
                        Dialog.alert({ id: 'authorize_error_alert', message: response.error.message });
                    }
                    Client.sendLogoutRequest(is_active_tab);
                } else if (!Login.isLoginPages() && !/authorize/.test(State.get('skip_response'))) {
                    if (response.authorize.loginid !== Client.get('loginid')) {
                        Client.sendLogoutRequest(true);
                    } else {
                        Client.responseAuthorize(response);
                        BinarySocket.send({ balance: 1, subscribe: 1 });
                        BinarySocket.send({ get_settings: 1 });
                        BinarySocket.send({ get_account_status: 1 });
                        BinarySocket.send({ payout_currencies: 1 });
                        BinarySocket.send({ mt5_login_list: 1 });
                        setResidence(response.authorize.country || Client.get('residence'));
                        if (!Client.get('is_virtual')) {
                            BinarySocket.send({ get_self_exclusion: 1 });
                        }
                        BinarySocket.sendBuffered();
                        if (/bch/i.test(response.authorize.currency) && !Client.get('accepted_bch')) {
                            showPopup({
                                url: urlFor('user/warning'),
                                popup_id: 'warning_popup',
                                form_id: '#frm_warning',
                                content_id: '#warning_content',
                                validations: [{ selector: '#chk_accept', validations: [['req', { hide_asterisk: true }]] }],
                                onAccept: function onAccept() {
                                    Client.set('accepted_bch', 1);
                                }
                            });
                        }
                    }
                }
                break;
            case 'balance':
                updateBalance(response);
                break;
            case 'logout':
                Client.doLogout(response);
                break;
            case 'landing_company':
                Header.upgradeMessageVisibility();
                if (!response.error) {
                    Header.metatraderMenuItemVisibility();
                }
                break;
            case 'get_self_exclusion':
                SessionDurationLimit.exclusionResponseHandler(response);
                break;
            case 'get_settings':
                if (response.get_settings) {
                    setResidence(response.get_settings.country_code);
                    Client.set('email', response.get_settings.email);
                    GTM.eventHandler(response.get_settings);
                    if (response.get_settings.is_authenticated_payment_agent) {
                        $('#topMenuPaymentAgent').setVisibility(1);
                    }
                }
                break;
            // no default
        }
    };

    var setResidence = function setResidence(residence) {
        if (residence) {
            Client.set('residence', residence);
            BinarySocket.send({ landing_company: residence });
        }
    };

    var initOptions = function initOptions() {
        return {
            onOpen: onOpen,
            onMessage: onMessage,
            notify: Header.displayNotification,
            isLoggedIn: Client.isLoggedIn,
            getClientValue: Client.get
        };
    };

    return {
        initOptions: initOptions
    };
}();

module.exports = BinarySocketGeneral;

/***/ }),
/* 152 */,
/* 153 */,
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Language = __webpack_require__(13);

var createLanguageDropDown = function createLanguageDropDown(website_status) {
    var $languages = $('.languages');

    if ($languages.find('#display_language li').attr('class')) {
        return;
    }

    var select_language_id = '#select_language';
    var current_language = Language.get();

    $languages.find('#display_language li, ' + select_language_id + ' li').addClass(current_language).find('span.language').text(mapCodeToLanguage(current_language));

    var languages = website_status.supported_languages.sort(function (a, b) {
        return a === 'EN' || a < b ? -1 : 1;
    });
    var $select_language = $languages.find(select_language_id);
    languages.forEach(function (language) {
        if (!/es/i.test(language)) {
            $select_language.append($('<li/>', { class: language, text: mapCodeToLanguage(language) }));
        }
    });

    $select_language.find('.' + current_language + ':eq(1)').setVisibility(0);
    Language.onChange();
    $languages.setVisibility(1);
};

var mapCodeToLanguage = function mapCodeToLanguage(code) {
    return Language.getAll()[code];
};

module.exports = createLanguageDropDown;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var moment = __webpack_require__(9);
var Client = __webpack_require__(4);
var localize = __webpack_require__(2).localize;
var getPropertyValue = __webpack_require__(0).getPropertyValue;

var SessionDurationLimit = function () {
    var warning = void 0,
        timeout_before = void 0,
        timeout = void 0,
        timeout_logout = void 0;

    var init = function init() {
        clearTimeout(timeout_before);
        clearTimeout(timeout);
        clearTimeout(timeout_logout);
        $('#session_limit').remove();

        warning = 10 * 1000; // milliseconds before limit to display the warning message

        var limit = Client.get('session_duration_limit') * 1;
        var now = moment().unix();
        var start = Client.get('session_start') * 1;
        var math_limit = Math.pow(2, 31) - 1;
        var remained = (limit + start - now) * 1000;
        if (remained < 0) remained = warning;

        var setTimeOut = function setTimeOut() {
            timeout = setTimeout(displayWarning, remained - warning);
            timeout_logout = setTimeout(Client.sendLogoutRequest, remained);
        };

        // limit of setTimeout is this number
        if (remained > math_limit) {
            remained %= math_limit;
            timeout_before = setTimeout(init, remained);
        } else {
            setTimeOut();
        }
    };

    var exclusionResponseHandler = function exclusionResponseHandler(response) {
        if (getPropertyValue(response, 'error') || !getPropertyValue(response, 'get_self_exclusion')) {
            return;
        }

        var limit = response.get_self_exclusion.session_duration_limit * 60;
        if (isNaN(limit) || limit <= 0) return;

        Client.set('session_duration_limit', limit);
        window.addEventListener('storage', init, false);

        init();
    };

    var displayWarning = function displayWarning() {
        $('body').append($('<div/>', { id: 'session_limit', class: 'lightbox' }).append($('<div/>', { class: 'gr-padding-10 gr-gutter', text: localize('Your session duration limit will end in [_1] seconds.', [warning / 1000]) })));
        $('#session_limit').click(function () {
            $(this).remove();
        });
    };

    return {
        exclusionResponseHandler: exclusionResponseHandler
    };
}();

module.exports = SessionDurationLimit;

/***/ }),
/* 156 */,
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Symbols = __webpack_require__(67);
var BinarySocket = __webpack_require__(5);
var getHighstock = __webpack_require__(3).requireHighstock;
var localize = __webpack_require__(2).localize;

var DigitInfo = function () {
    var spots = [];
    var stream_id = null;
    // To avoid too many greens and reds
    var prev_min_index = -1;
    var prev_max_index = -1;

    var chart = void 0;

    var chart_config = {
        chart: {
            renderTo: 'last_digit_histo',
            defaultSeriesType: 'column',
            backgroundColor: '#eee',
            borderWidth: 1,
            borderColor: '#ccc',
            plotBackgroundColor: '#fff',
            plotBorderWidth: 1,
            plotBorderColor: '#ccc',
            height: 225 // This is "unresponsive", but so is leaving it empty where it goes to 400px.
        },
        title: { text: '' },
        credits: { enabled: false },
        exporting: { enabled: false },
        legend: {
            enabled: false
        },
        tooltip: {
            borderWidth: 1,
            formatter: function formatter() {
                var total = $('#tick_count').val();
                var percentage = this.y / total * 100;
                return '<strong>' + localize('Digit') + ':</strong> ' + this.x + '<br/><strong>' + localize('Percentage') + ':</strong> ' + percentage.toFixed(1) + '%';
            }
        },
        plotOptions: {
            column: {
                shadow: false,
                borderWidth: 0.5,
                borderColor: '#666',
                pointPadding: 0,
                groupPadding: 0.0,
                color: '#e1f0fb'
            },
            series: {
                dataLabels: {
                    enabled: true,
                    style: {
                        textShadow: false
                    },
                    formatter: function formatter() {
                        var total = $('#tick_count').val();
                        var percentage = this.point.y / total * 100;
                        return percentage.toFixed(2) + '%';
                    }
                }
            }
        },
        xAxis: {
            categories: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            lineWidth: 0,
            lineColor: '#999',
            tickLength: 10,
            tickColor: '#ccc'
        },
        yAxis: {
            title: { text: '' },
            maxPadding: 0,
            gridLineColor: '#e9e9e9',
            tickWidth: 1,
            tickLength: 3,
            tickColor: '#ccc',
            lineColor: '#ccc',
            endOnTick: true,
            opposite: false,
            labels: {
                align: 'left',
                x: 0,
                enabled: false,
                formatter: function formatter() {
                    var total = $('#tick_count').val();
                    var percentage = parseInt(this.value / total * 100);
                    return percentage + '%';
                }
            }
        }
    };

    var addContent = function addContent(underlying) {
        var domain = document.domain.split('.').slice(-2).join('.');
        var underlyings = [];
        var symbols = Symbols.getAllSymbols();
        Object.keys(symbols).forEach(function (key) {
            if (/^(R_|RD)/.test(key)) {
                underlyings.push(key);
            }
        });
        underlyings = underlyings.sort();
        var elem = '';
        for (var i = 0; i < underlyings.length; i++) {
            elem += '<option value="' + underlyings[i] + '">' + localize(symbols[underlyings[i]]) + '</option>';
        }
        $('#digit_underlying').html($(elem)).val(underlying);
        $('#digit_domain').text(domain.charAt(0).toUpperCase() + domain.slice(1));
        $('#digit_info_underlying').text($('#digit_underlying option:selected').text());
    };

    var onLatest = function onLatest() {
        var getLatest = function getLatest() {
            var $digit_underlying_option = $('#digit_underlying option:selected');
            var symbol = $digit_underlying_option.val();
            var count = $('#tick_count').val();
            $('#digit_info_underlying').text($digit_underlying_option.text());
            $('#digit_info_count').text(count);
            var request = {
                ticks_history: symbol,
                end: 'latest',
                count: count
            };
            if (chart.series[0].name !== symbol) {
                if ($('#underlying').find('option:selected').val() !== $('#digit_underlying').val()) {
                    request.subscribe = 1;
                    request.style = 'ticks';
                }
                if (stream_id !== null) {
                    BinarySocket.send({ forget: stream_id });
                    stream_id = null;
                }
            }
            BinarySocket.send(request, { callback: function callback(response) {
                    var type = response.msg_type;
                    if (type === 'tick') {
                        updateChart(response);
                    } else if (type === 'history') {
                        showChart(response.echo_req.ticks_history, response.history.prices);
                    }
                } });
        };
        $('#digit_underlying, #tick_count').off('change').on('change', getLatest);
    };

    var showChart = function showChart(underlying, underlying_spots) {
        getHighstock(function (Highcharts) {
            var new_spots = underlying_spots;
            if (typeof new_spots === 'undefined' || new_spots.length <= 0) {
                return;
            }
            var dec = new_spots[0].split('.')[1].length;
            for (var i = 0; i < new_spots.length; i++) {
                var val = parseFloat(new_spots[i]).toFixed(dec);
                new_spots[i] = val.substr(val.length - 1);
            }

            var getTitle = function getTitle() {
                return {
                    text: localize($('#last_digit_title').html(), [new_spots.length, $('#digit_underlying option:selected').text()])
                };
            };

            spots = new_spots;
            if (chart && $('#last_digit_histo').html()) {
                chart.xAxis[0].update({ title: getTitle() }, true);
                chart.series[0].name = underlying;
            } else {
                addContent(underlying); // this creates #last_digit_title
                chart_config.xAxis.title = getTitle();
                chart = new Highcharts.Chart(chart_config);
                chart.addSeries({ name: underlying, data: [] });
                onLatest();
                stream_id = null;
            }
            update();
        });
    };

    var update = function update(symbol, latest_spot) {
        if (typeof chart === 'undefined') {
            return null;
        }

        var series = chart.series[0]; // Where we put the final data.

        if (typeof latest_spot !== 'undefined' && series.name === symbol) {
            spots.unshift(latest_spot.slice(-1)); // Only last digit matters
            spots.pop();
        }

        // Always recompute and draw, even if theres no new data.
        // This is especially useful on first reuqest, but maybe in other ways.
        var filtered_spots = [];
        var filterFunc = function filterFunc(el) {
            return +el === digit;
        };
        var digit = 10;
        var min_max_counter = [];
        while (digit--) {
            var val = spots.filter(filterFunc).length;
            filtered_spots[digit] = val;
            if (typeof min_max_counter[val] === 'undefined') {
                min_max_counter[val] = 0;
            }
            min_max_counter[val]++;
        }
        var min = Math.min.apply(null, filtered_spots);
        var max = Math.max.apply(null, filtered_spots);
        var min_index = filtered_spots.indexOf(min);
        var max_index = filtered_spots.indexOf(max);
        // changing color
        if (min_max_counter[min] >= 1) {
            filtered_spots[min_index] = { y: min, color: '#CC0000' };
            if (prev_min_index === -1) {
                prev_min_index = min_index;
            } else if (prev_min_index !== min_index) {
                if (_typeof(filtered_spots[prev_min_index]) === 'object') {
                    filtered_spots[prev_min_index] = { y: filtered_spots[prev_min_index].y, color: '#e1f0fb' };
                } else {
                    filtered_spots[prev_min_index] = { y: filtered_spots[prev_min_index], color: '#e1f0fb' };
                }
                prev_min_index = min_index;
            }
        }

        if (min_max_counter[max] >= 1) {
            filtered_spots[max_index] = { y: max, color: '#2E8836' };
            if (prev_max_index === -1) {
                prev_max_index = max_index;
            } else if (prev_max_index !== max_index) {
                if (_typeof(filtered_spots[prev_max_index]) === 'object') {
                    filtered_spots[prev_max_index] = { y: filtered_spots[prev_max_index].y, color: '#e1f0fb' };
                } else {
                    filtered_spots[prev_max_index] = { y: filtered_spots[prev_max_index], color: '#e1f0fb' };
                }
                prev_max_index = max_index;
            }
        }
        return series.setData(filtered_spots);
    };

    var updateChart = function updateChart(tick) {
        if (stream_id) {
            if (chart.series[0].name === tick.tick.symbol) {
                stream_id = tick.tick.id || null;
                update(tick.tick.symbol, tick.tick.quote);
            } else {
                BinarySocket.send({ forget: tick.tick.id.toString() });
            }
        } else {
            update(tick.tick.symbol, tick.tick.quote);
        }
    };

    return {
        showChart: showChart,
        updateChart: updateChart
    };
}();

module.exports = DigitInfo;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var HighchartUI = __webpack_require__(159);
var MBContract = __webpack_require__(66);
var MBDefaults = __webpack_require__(28);
var Defaults = __webpack_require__(25);
var GetTicks = __webpack_require__(93);
var Lookback = __webpack_require__(29);
var ViewPopupUI = __webpack_require__(75);
var BinarySocket = __webpack_require__(5);
var jpClient = __webpack_require__(10).jpClient;
var addComma = __webpack_require__(7).addComma;
var getHighstock = __webpack_require__(3).requireHighstock;
var localize = __webpack_require__(2).localize;
var State = __webpack_require__(6).State;
var getPropertyValue = __webpack_require__(0).getPropertyValue;

var Highchart = function () {
    var chart = void 0,
        chart_promise = void 0,
        options = void 0,
        response_id = void 0,
        contract = void 0,
        request = void 0,
        min_point = void 0,
        max_point = void 0,
        lines_drawn = void 0,
        start_time = void 0,
        purchase_time = void 0,
        now_time = void 0,
        end_time = void 0,
        entry_tick_time = void 0,
        is_sold = void 0,
        sell_time = void 0,
        sell_spot_time = void 0,
        is_settleable = void 0,
        exit_tick_time = void 0,
        exit_time = void 0,
        underlying = void 0,
        margin = void 0,
        is_initialized = void 0,
        is_chart_delayed = void 0,
        is_chart_subscribed = void 0,
        stop_streaming = void 0,
        is_contracts_for_send = void 0,
        is_history_send = void 0,
        is_entry_tick_barrier_selected = void 0,
        is_response_id_set = void 0,
        prev_barriers = void 0; // For checking if barrier was updated

    var initOnce = function initOnce() {
        chart = options = response_id = contract = request = min_point = max_point = '';
        lines_drawn = [];

        is_initialized = is_chart_delayed = is_chart_subscribed = stop_streaming = is_response_id_set = is_contracts_for_send = is_history_send = is_entry_tick_barrier_selected = false;
    };

    var initializeValues = function initializeValues() {
        start_time = parseInt(contract.date_start);
        purchase_time = parseInt(contract.purchase_time);
        now_time = parseInt(contract.current_spot_time);
        end_time = parseInt(contract.date_expiry);
        entry_tick_time = parseInt(contract.entry_tick_time);
        is_sold = contract.is_sold;
        sell_time = parseInt(contract.sell_time);
        sell_spot_time = parseInt(contract.sell_spot_time);
        is_settleable = contract.is_settleable;
        exit_tick_time = parseInt(contract.exit_tick_time);
        exit_time = parseInt(is_sold && sell_time < end_time ? sell_spot_time : exit_tick_time || end_time);
        underlying = contract.underlying;
        prev_barriers = [];
    };

    // initialize the chart only once with ticks or candles data
    var initChart = function initChart(init_options) {
        var data = [];
        var type = '';
        var i = void 0;

        var pushTicks = function pushTicks(time, price) {
            // we need to add the marker as we are pushing the data points
            // since for large arrays, data doesn't get pushed to series[0].data
            // and we can't update markers if data is empty
            var int_time = parseInt(time);
            var is_match_entry = int_time === entry_tick_time;
            var is_match_exit = int_time === exit_tick_time;
            var tick_type = is_match_entry ? 'entry' : 'exit';
            data.push({
                x: int_time * 1000,
                y: price * 1,
                marker: is_match_entry || is_match_exit ? HighchartUI.getMarkerObject(tick_type) : ''
            });
        };

        var history = '';
        var candles = '';
        if (init_options.history) {
            // indicates line chart
            type = 'line';
            history = init_options.history;
            var times = history.times;
            var prices = history.prices;
            if (is_chart_delayed) {
                for (i = 0; i < times.length; ++i) {
                    pushTicks(times[i], prices[i]);
                }
            } else if (min_point && max_point) {
                var current_time = void 0;
                for (i = 0; i < times.length; ++i) {
                    current_time = parseInt(times[i]);
                    // only display the first tick before entry spot and one tick after exit spot
                    // as well as the set of ticks between them
                    if (current_time >= min_point && current_time <= max_point) {
                        pushTicks(current_time, prices[i]);
                    }
                }
            }
        } else if (init_options.candles) {
            // indicates candle chart
            candles = init_options.candles;
            type = 'candlestick';
            data = candles.map(function (c) {
                return [c.epoch * 1000, c.open * 1, c.high * 1, c.low * 1, c.close * 1];
            });
        }

        // element where chart is to be displayed
        var el = document.getElementById('analysis_live_chart');
        if (!el) {
            chart = null;
            return null;
        }

        var JPClient = jpClient();
        HighchartUI.setLabels(is_chart_delayed);
        HighchartUI.setChartOptions({
            JPClient: JPClient,
            type: type,
            data: data,
            height: el.parentElement.offsetHeight,
            title: localize(init_options.title),
            decimals: history ? history.prices[0] : candles[0].open,
            entry_time: entry_tick_time ? entry_tick_time * 1000 : start_time * 1000,
            exit_time: exit_time ? exit_time * 1000 : null,
            user_sold: userSold()
        });
        return getHighstock(function (Highcharts) {
            Highcharts.setOptions(HighchartUI.getHighchartOptions(JPClient));
            if (!el) chart = null;else {
                chart = Highcharts.StockChart(el, HighchartUI.getChartOptions());
                is_initialized = true;
            }
        });
    };

    // type 'x' is used to draw lines such as start and end times
    // type 'y' is used to draw lines such as barrier
    var addPlotLine = function addPlotLine(params, type) {
        chart[type + 'Axis'][0].addPlotLine(HighchartUI.getPlotlineOptions(params, type));
        if (userSold()) {
            HighchartUI.replaceExitLabelWithSell(chart.subtitle.element);
        }
    };

    // Remove plotLines by id
    var removePlotLine = function removePlotLine(id) {
        var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'y';

        chart[type + 'Axis'][0].removePlotLine(id);
    };

    var handleResponse = function handleResponse(response) {
        var type = response.msg_type;
        var error = response.error;
        if (/history|candles|tick|ohlc/.test(type) && !error) {
            options = { title: contract.display_name };
            options[type] = response[type];
            var history = response.history;
            var candles = response.candles;
            var tick = response.tick;
            var ohlc = response.ohlc;
            response_id = response[type].id;
            // send view popup the response ID so view popup can forget the calls if it's closed before contract ends
            if (response_id && !is_response_id_set) {
                if (State.get('is_trading') || State.get('is_mb_trading')) {
                    var page_underlying = State.get('is_mb_trading') ? MBDefaults.get('underlying') : Defaults.get('underlying');
                    if (page_underlying !== (tick || ohlc).symbol) {
                        ViewPopupUI.storeSubscriptionID(response_id, true);
                        ViewPopupUI.setStreamFunction();
                    } else {
                        ViewPopupUI.setStreamFunction(GetTicks.request);
                    }
                } else {
                    ViewPopupUI.storeSubscriptionID(response_id, true);
                }
                is_response_id_set = true;
            }
            if (history || candles) {
                var length = (history ? history.times : candles).length;
                if (length === 0) {
                    HighchartUI.showError('missing');
                    return;
                }
                if (history) {
                    var history_times = history.times;
                    getMinHistory(history_times);
                    getMaxHistory(history_times);
                } else if (candles) {
                    getMinCandle(candles);
                    getMaxCandle(candles);
                }
                // only initialize chart if it hasn't already been initialized
                if (!chart && !is_initialized) {
                    chart_promise = initChart(options);
                    if (!chart_promise || typeof chart_promise.then !== 'function') return;
                    chart_promise.then(function () {
                        if (!chart) return;

                        if (purchase_time !== start_time) {
                            drawLineX({
                                value: purchase_time,
                                label: localize('Purchase Time'),
                                color: '#7cb5ec'
                            });
                        }

                        // second condition is used to make sure contracts that have purchase time
                        // but are sold before the start time don't show start time
                        if (!is_sold || is_sold && sell_time && sell_time > start_time) {
                            drawLineX({ value: start_time });
                        }
                    });
                }
            } else if ((tick || ohlc) && !stop_streaming) {
                if (chart && chart.series) {
                    updateChart(options);
                }
            }
            if (chart_promise && typeof chart_promise.then === 'function') {
                if (entry_tick_time && !is_entry_tick_barrier_selected) {
                    chart_promise.then(selectEntryTickBarrier);
                }
                if (is_sold || is_settleable) {
                    chart_promise.then(function () {
                        updateZone('exit');
                        endContract();
                    });
                }
            }
        } else if (type === 'ticks_history' && error) {
            HighchartUI.showError('', error.message);
        }
    };

    var showChart = function showChart(proposal_contract, update) {
        contract = proposal_contract;
        initializeValues();
        if (!update) {
            initOnce();
        }
        if (!chart && !is_history_send) {
            requestData(update || '');
        } else if (chart && entry_tick_time && !is_entry_tick_barrier_selected) {
            selectEntryTickBarrier();
        }
        if (chart && (is_sold || is_settleable)) {
            updateZone('exit');
            endContract();
        }
    };

    var requestData = function requestData(update) {
        var calculate_granularity = calculateGranularity();
        var granularity = calculate_granularity[0];
        var duration = calculate_granularity[1];

        margin = granularity === 0 ? Math.max(300, 30 * duration / (60 * 60) || 0) : 3 * granularity;

        request = {
            ticks_history: underlying,
            start: ((purchase_time || start_time) - margin).toFixed(0), /* load more ticks first */
            end: end_time ? (end_time + margin).toFixed(0) : 'latest',
            style: granularity === 0 ? 'ticks' : 'candles',
            count: 4999, /* maximum number of ticks possible */
            adjust_start_time: 1
        };

        if (is_sold && sell_time < end_time) {
            request.end = sell_spot_time ? (parseInt(sell_spot_time) + margin).toFixed(0) : 'latest';
        }

        // switch start and end if start is after end
        if (!isNaN(request.end) && request.start > request.end) {
            request.end = [request.start, request.start = request.end][0];
        }

        if (granularity !== 0) {
            request.granularity = granularity;
        }

        if (!is_settleable && !sell_spot_time && window.time.valueOf() / 1000 < end_time && !is_chart_subscribed) {
            request.subscribe = 1;
        }

        var contracts_response = State.get('is_mb_trading') ? MBContract.getContractsResponse() : State.get(['response', 'contracts_for']);
        var stored_delay = sessionStorage.getItem('license.' + underlying);

        if (contracts_response && contracts_response.echo_req.contracts_for === underlying) {
            delayedChart(contracts_response);
        } else if (stored_delay) {
            handleDelay(stored_delay);
            sendTickRequest();
        } else if (!is_contracts_for_send && update === '') {
            BinarySocket.send({ contracts_for: underlying }).then(function (response) {
                var error = response.error;
                if (!error || error.code && error.code === 'InvalidSymbol') {
                    delayedChart(response);
                }
            });
            is_contracts_for_send = true;
        }
    };

    var delayedChart = function delayedChart(contracts_response) {
        if (contracts_response.contracts_for && contracts_response.contracts_for.feed_license) {
            var license = contracts_response.contracts_for.feed_license;
            handleDelay(license);
            saveFeedLicense(contracts_response.echo_req.contracts_for, license);
        }
        sendTickRequest();
    };

    var sendTickRequest = function sendTickRequest() {
        if (!entry_tick_time && !is_chart_delayed && start_time && window.time.unix() >= parseInt(start_time)) {
            HighchartUI.showError('', localize('Waiting for entry tick.'));
        } else if (!is_history_send) {
            is_history_send = true;
            if (request.subscribe) is_chart_subscribed = true;
            // BinarySocket.send(request, { callback: handleResponse });
            GetTicks.request('', request, handleResponse);
        }
    };

    var handleDelay = function handleDelay(feed_license) {
        if (feed_license !== 'realtime') {
            if (!is_settleable) {
                request.end = 'latest';
            }
            delete request.subscribe;
            is_chart_delayed = true;
        }
    };

    // update the color zones with the correct entry_tick_time and draw barrier
    var selectEntryTickBarrier = function selectEntryTickBarrier() {
        if (chart && entry_tick_time && !is_entry_tick_barrier_selected) {
            is_entry_tick_barrier_selected = true;
            drawBarrier();
            updateZone('entry');
            selectTick(entry_tick_time, 'entry');
        }
    };

    var updateZone = function updateZone(type) {
        if (chart && type && !userSold()) {
            var value = type === 'entry' ? entry_tick_time : exit_time;
            chart.series[0].zones[type === 'entry' ? 0 : 1].value = value * 1000;
        }
    };

    var drawBarrier = function drawBarrier() {
        if (chart.yAxis[0].plotLinesAndBands.length === 0) {
            var _contract = contract,
                contract_type = _contract.contract_type,
                barrier = _contract.barrier,
                high_barrier = _contract.high_barrier,
                low_barrier = _contract.low_barrier;

            if (barrier) {
                prev_barriers[0] = barrier; // Batman like the kids who "Cache".
                if (Lookback.isLookback(contract_type)) {
                    var label = Lookback.getBarrierLabel(contract_type);
                    addPlotLine({ id: 'barrier', value: barrier * 1, label: localize(label + ' ([_1])', [addComma(barrier)]), dashStyle: 'Dot' }, 'y');
                } else {
                    addPlotLine({ id: 'barrier', value: barrier * 1, label: localize('Barrier ([_1])', [addComma(barrier)]), dashStyle: 'Dot' }, 'y');
                }
            } else if (high_barrier && low_barrier) {
                prev_barriers[1] = high_barrier;
                prev_barriers[0] = low_barrier;
                if (Lookback.isLookback(contract_type)) {
                    var _Lookback$getBarrierL = Lookback.getBarrierLabel(contract_type),
                        _Lookback$getBarrierL2 = _slicedToArray(_Lookback$getBarrierL, 2),
                        high_label = _Lookback$getBarrierL2[0],
                        low_label = _Lookback$getBarrierL2[1];

                    addPlotLine({ id: 'high_barrier', value: high_barrier * 1, label: localize(high_label + ' ([_1])', [addComma(high_barrier)]), dashStyle: 'Dot' }, 'y');
                    addPlotLine({ id: 'low_barrier', value: low_barrier * 1, label: localize(low_label + ' ([_1])', [addComma(low_barrier)]), dashStyle: 'Dot', textBottom: true }, 'y');
                } else {
                    addPlotLine({ id: 'high_barrier', value: high_barrier * 1, label: localize('High Barrier ([_1])', [addComma(high_barrier)]), dashStyle: 'Dot' }, 'y');
                    addPlotLine({ id: 'low_barrier', value: low_barrier * 1, label: localize('Low Barrier ([_1])', [addComma(low_barrier)]), dashStyle: 'Dot', textBottom: true }, 'y');
                }
            }
        }
    };

    // Update barriers if needed.
    var updateBarrier = function updateBarrier() {
        var barrier = contract.barrier;
        var high_barrier = contract.high_barrier;
        var low_barrier = contract.low_barrier;
        // Update barrier only if it doesn't equal previous value
        if (barrier && barrier !== prev_barriers[0]) {
            // Batman: Good boy!
            prev_barriers[0] = barrier;
            removePlotLine('barrier', 'y');
            drawBarrier();
        } else if (high_barrier && low_barrier && (high_barrier !== prev_barriers[1] || low_barrier !== prev_barriers[0])) {
            prev_barriers[1] = high_barrier;
            prev_barriers[0] = low_barrier;
            removePlotLine('high_barrier', 'y');
            removePlotLine('low_barrier', 'y');
            drawBarrier();
        }
    };

    // set an orange circle on the entry/exit tick
    var selectTick = function selectTick(value, tick_type) {
        if (chart && value && tick_type && (options.tick || options.history) && chart.series[0].data.length !== 0) {
            var data = chart.series[0].data;
            if (!data || data.length === 0) return;
            var current_data = void 0;
            for (var i = data.length - 1; i >= 0; i--) {
                current_data = data[i];
                if (current_data && current_data.x && value * 1000 === current_data.x) {
                    current_data.update({ marker: HighchartUI.getMarkerObject(tick_type) });
                }
            }
        }
    };

    // calculate where to display the minimum value of the x-axis of the chart for line chart
    var getMinHistory = function getMinHistory(history_times) {
        var history_times_length = history_times.length;
        var history_times_int = void 0;
        for (var i = 0; i < history_times_length; i++) {
            history_times_int = parseInt(history_times[i]);
            if (entry_tick_time && history_times_int === entry_tick_time || purchase_time && start_time > purchase_time && history_times_int === purchase_time || history_times_int < purchase_time && parseInt(history_times[i === history_times_length - 1 ? i : i + 1]) > purchase_time) {
                // set the chart to display from the tick before entry_tick_time or purchase_time
                min_point = parseInt(history_times[i === 0 ? i : i - 1]);
                break;
            }
        }
        if (!min_point) min_point = parseInt(history_times[0]);
    };

    // calculate where to display the maximum value of the x-axis of the chart for line chart
    var getMaxHistory = function getMaxHistory(history_times) {
        var end = end_time;
        if (sell_spot_time && (sell_time || sell_spot_time) < end_time) {
            end = sell_spot_time;
        } else if (exit_tick_time) {
            end = exit_tick_time;
        }

        var history_times_length = history_times.length;
        if (is_settleable || is_sold) {
            for (var i = history_times_length - 1; i >= 0; i--) {
                if (parseInt(history_times[i]) === end) {
                    max_point = parseInt(history_times[i === history_times_length - 1 ? i : i + 1]);
                    break;
                }
            }
        }
        setMaxForDelayedChart(history_times, history_times_length);
    };

    // calculate where to display the minimum value of the x-axis of the chart for candle
    var getMinCandle = function getMinCandle(candles) {
        var candle_before_time = function candle_before_time(value) {
            return value && current_candle && parseInt(current_candle.epoch) <= value && candles[i === candles_length - 1 ? i : i + 1].epoch > value;
        };
        var i = void 0,
            current_candle = void 0;
        var candles_length = candles.length;
        for (i = 1; i < candles_length; i++) {
            current_candle = candles[i];
            if (candle_before_time(entry_tick_time) || candle_before_time(purchase_time)) {
                // set the chart to display from the candle before entry_tick_time or purchase_time
                min_point = parseInt(candles[i - 1].epoch);
                break;
            }
        }
    };

    // calculate where to display the maximum value of the x-axis of the chart for candle
    var getMaxCandle = function getMaxCandle(candles) {
        var end = sell_spot_time && sell_time < end_time ? sell_spot_time : end_time;
        var candle_length = candles.length;
        var current_candle = void 0,
            next_candle = void 0;
        if (is_settleable || is_sold) {
            for (var i = candle_length - 2; i >= 0; i--) {
                current_candle = candles[i];
                next_candle = candles[i + 1];
                if (!current_candle) return;
                if (parseInt(next_candle.epoch) < end) {
                    max_point = end_time;
                    break;
                }
                if (parseInt(current_candle.epoch) <= end && parseInt(next_candle.epoch) > end) {
                    max_point = parseInt(next_candle.epoch);
                    break;
                }
            }
        }
        setMaxForDelayedChart(candles, candle_length);
    };

    var setMaxForDelayedChart = function setMaxForDelayedChart(array, array_length) {
        if (is_chart_delayed) {
            var last_epoch = parseInt(array[array_length - 1].epoch);
            if (last_epoch > start_time) {
                max_point = last_epoch;
            } else {
                max_point = start_time;
            }
        }
        if (!max_point) max_point = end_time;
    };

    var drawLineX = function drawLineX(properties) {
        if (chart && properties.value && !new RegExp(properties.value).test(lines_drawn)) {
            addPlotLine({
                value: properties.value * 1000,
                label: properties.label || '',
                textLeft: properties.text_left === 'textLeft',
                dashStyle: properties.dash_style || '',
                color: properties.color || ''
            }, 'x');
            lines_drawn.push(properties.value);
        }
    };

    // draw the last line, mark the exit tick, and forget the streams
    var endContract = function endContract() {
        if (chart && !stop_streaming) {
            drawLineX({
                value: userSold() ? sell_time : end_time,
                text_left: 'textLeft',
                dash_style: 'Dash'
            });
            if (exit_tick_time) {
                selectTick(exit_tick_time, 'exit');
            }
            if (!contract.sell_spot && !contract.exit_tick) {
                if ($('#waiting_exit_tick').length === 0) {
                    $('#trade_details_message').append($('<div/>', { id: 'waiting_exit_tick', text: localize('Waiting for exit tick.') }));
                }
            } else {
                $('#waiting_exit_tick').remove();
            }
            setStopStreaming();
        }
    };

    var setStopStreaming = function setStopStreaming() {
        if (chart && (is_sold || is_settleable)) {
            var data = getPropertyValue(getPropertyValue(chart, ['series'])[0], ['options', 'data']);
            if (data && data.length > 0) {
                var last_data = data[data.length - 1];
                var i = 2;
                while (last_data.y === null) {
                    last_data = data[data.length - i];
                    i++;
                }
                var last = parseInt(last_data.x || last_data[0]);
                if (last > end_time * 1000 || last > (sell_time || sell_spot_time) * 1000) {
                    stop_streaming = true;
                } else {
                    // add a null point if the last tick is before end time to bring end time line into view
                    var time = userSold() ? sell_time || sell_spot_time : end_time;
                    chart.series[0].addPoint({ x: ((time || window.time.unix()) + margin) * 1000, y: null });
                }
            }
        }
    };

    var calculateGranularity = function calculateGranularity() {
        var duration = Math.min(exit_time, now_time) - (purchase_time || start_time);
        var granularity = void 0;
        // days * hours * minutes * seconds
        if (duration <= 60 * 60) granularity = 0; // less than 1 hour
        else if (duration <= 2 * 60 * 60) granularity = 120; // 2 hours
            else if (duration <= 6 * 60 * 60) granularity = 600; // 6 hours
                else if (duration <= 24 * 60 * 60) granularity = 900; // 1 day
                    else if (duration <= 5 * 24 * 60 * 60) granularity = 3600; // 5 days
                        else if (duration <= 30 * 24 * 60 * 60) granularity = 14400; // 30 days
                            else granularity = 86400; // more than 30 days

        return [granularity, duration];
    };

    // add new data points to the chart
    var updateChart = function updateChart(update_options) {
        var granularity = calculateGranularity()[0];
        var series = chart.series[0];
        if (granularity === 0) {
            var data = update_options.tick;
            chart.series[0].addPoint({ x: data.epoch * 1000, y: data.quote * 1 });
            updateBarrier();
        } else {
            var c = update_options.ohlc;
            var last = series.data[series.data.length - 1];
            if (!c || !last) return;
            var ohlc = [c.open_time * 1000, c.open * 1, c.high * 1, c.low * 1, c.close * 1];

            if (last.x !== ohlc[0]) {
                series.addPoint(ohlc, true, true);
            } else {
                last.update(ohlc, true);
            }
        }
    };

    var saveFeedLicense = function saveFeedLicense(save_contract, license) {
        var regex = new RegExp('license.' + contract);
        var match_found = false;

        for (var i = 0; i < sessionStorage.length; i++) {
            if (regex.test(sessionStorage.key(i))) {
                match_found = true;
                break;
            }
        }

        if (!match_found) {
            sessionStorage.setItem('license.' + save_contract, license);
        }
    };

    var userSold = function userSold() {
        return sell_time && sell_time < end_time || !sell_time && sell_spot_time && sell_spot_time < end_time;
    };

    return {
        showChart: showChart
    };
}();

module.exports = Highchart;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var localize = __webpack_require__(2).localize;

var HighchartUI = function () {
    var common_time_style = void 0,
        common_spot_style = void 0,
        txt = void 0,
        chart_options = void 0;

    var initLabels = function initLabels() {
        common_time_style = 'margin-bottom: 3px; margin-left: 10px; height: 0; width: 20px; border: 0; border-bottom: 2px; border-color: #e98024; display: inline-block;';
        common_spot_style = 'margin-left: 10px; display: inline-block; border-radius: 6px;';
    };

    var getLabels = function getLabels(option) {
        if (!common_time_style || !common_spot_style) {
            initLabels();
        }
        switch (option) {
            case 'start_time':
                return '<div style="' + common_time_style + ' border-style: solid;"></div> ' + localize('Start time') + ' ';
            case 'entry_spot':
                return '<div style="' + common_spot_style + ' border: 3px solid orange; width: 4px; height: 4px;"></div> ' + localize('Entry spot') + ' ';
            case 'exit_spot':
                return '<div style="' + common_spot_style + ' background-color: orange; width:10px; height: 10px;"></div> ' + localize('Exit spot') + ' ';
            case 'end_time':
                return '<div style="' + common_time_style + ' border-style: dashed;"></div> ' + localize('End time') + ' ';
            case 'delay':
                return '<span class="chart-delay"> ' + localize('Charting for this underlying is delayed') + ' </span>';
            default:
                return null;
        }
    };

    var setLabels = function setLabels(chart_delayed) {
        // display a guide for clients to know how we are marking entry and exit spots
        txt = (chart_delayed ? getLabels('delay') : '') + getLabels('start_time') + (history ? getLabels('entry_spot') + getLabels('exit_spot') : '') + getLabels('end_time');
    };

    var setChartOptions = function setChartOptions(params) {
        chart_options = {
            chart: {
                backgroundColor: null, /* make background transparent */
                height: Math.max(params.height, 450),
                renderTo: params.el,
                animation: false,
                marginLeft: 30,
                marginRight: 30
            },
            title: {
                text: params.title,
                style: { fontSize: '16px' }
            },
            credits: { enabled: false },
            tooltip: {
                xDateFormat: params.JPClient ? '%Y/%m/%d, %H:%M:%S' : '%A, %b %e, %H:%M:%S GMT',
                valueDecimals: params.decimals.split('.')[1].length || 3
            },
            subtitle: {
                text: txt,
                useHTML: true
            },
            xAxis: {
                labels: { overflow: 'justify', format: '{value:%H:%M:%S}' }
            },
            yAxis: {
                opposite: false,
                labels: { align: 'left' }
            },
            series: [{
                type: params.type,
                name: params.title,
                data: params.data,
                // zones are used to display color of the line
                zones: [{
                    // make the line grey until it reaches entry time or start time if entry spot time is not yet known
                    value: params.entry_time,
                    color: '#ccc'
                }, {
                    // make the line default color until exit time is reached
                    value: params.exit_time,
                    color: ''
                }, {
                    // make the line grey again after trade ended
                    color: '#ccc'
                }],
                zoneAxis: 'x',
                cropThreshold: Infinity,
                softThreshold: false,
                turboThreshold: Infinity,
                connectNulls: true
            }],
            exporting: { enabled: false },
            plotOptions: {
                line: {
                    marker: { radius: 2, enabled: true }
                },
                candlestick: {
                    lineColor: 'black',
                    color: 'red',
                    upColor: 'green',
                    upLineColor: 'black',
                    shadow: true
                }
            },
            rangeSelector: { enabled: false }
        };
        if (params.user_sold) {
            chart_options.series[0].zones.pop();
        }
    };

    var getHighchartOptions = function getHighchartOptions(JPClient) {
        return {
            // use comma as separator instead of space
            lang: { thousandsSep: ',' },
            global: {
                timezoneOffset: JPClient ? -9 * 60 : 0 // Converting chart time to JST.
            }
        };
    };

    var replaceExitLabelWithSell = function replaceExitLabelWithSell(subtitle) {
        var subtitle_length = subtitle.childNodes.length;
        var textnode = document.createTextNode(' ' + localize('Sell time') + ' ');
        for (var i = 0; i < subtitle_length; i++) {
            var item = subtitle.childNodes[i];
            if (/End time/.test(item.nodeValue)) {
                subtitle.replaceChild(textnode, item);
            }
        }
    };

    var getPlotlineOptions = function getPlotlineOptions(params, type) {
        var is_plotx = type === 'x';
        var options = {
            value: params.value,
            id: params.id || (is_plotx ? params.value : params.label),
            label: { text: params.label || '' },
            color: params.color || (is_plotx ? '#e98024' : 'green'),
            zIndex: is_plotx ? 2 : 1,
            width: params.width || 2,
            dashStyle: params.dashStyle || 'Solid'
        };

        if (is_plotx) {
            options.label.x = params.textLeft ? -15 : 5;
        } else {
            options.label.y = params.textBottom ? 15 : -5;
            options.label.align = 'center';
        }

        return options;
    };

    var showError = function showError(type, message) {
        $('#analysis_live_chart').html($('<p/>', { class: 'error-msg', text: type === 'missing' ? localize('Ticks history returned an empty array.') : message }));
    };

    var getMarkerObject = function getMarkerObject(type) {
        var color = type === 'entry' ? 'white' : 'orange';
        return { fillColor: color, lineColor: 'orange', lineWidth: 3, radius: 4, states: { hover: { fillColor: color, lineColor: 'orange', lineWidth: 3, radius: 4 } } };
    };

    return {
        setLabels: setLabels,
        setChartOptions: setChartOptions,
        getHighchartOptions: getHighchartOptions,
        replaceExitLabelWithSell: replaceExitLabelWithSell,
        getPlotlineOptions: getPlotlineOptions,
        showError: showError,
        getMarkerObject: getMarkerObject,
        getChartOptions: function getChartOptions() {
            return chart_options;
        }
    };
}();

module.exports = HighchartUI;

/***/ }),
/* 160 */,
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var formatMoney = __webpack_require__(7).formatMoney;

var Portfolio = function () {
    var getBalance = function getBalance(balance, currency) {
        var float_balance = parseFloat(balance);
        return currency ? formatMoney(currency, float_balance) : float_balance;
    };

    var getPortfolioData = function getPortfolioData(c) {
        return {
            transaction_id: c.transaction_id,
            contract_id: c.contract_id,
            payout: parseFloat(c.payout),
            expiry_time: c.expiry_time,
            longcode: c.longcode,
            shortcode: c.shortcode,
            currency: c.currency,
            buy_price: c.buy_price,
            app_id: c.app_id
        };
    };

    var getProposalOpenContract = function getProposalOpenContract(proposal) {
        return {
            contract_id: proposal.contract_id,
            bid_price: parseFloat(proposal.bid_price || 0),
            is_sold: proposal.is_sold,
            is_valid_to_sell: proposal.is_valid_to_sell,
            currency: proposal.currency
        };
    };

    var getSum = function getSum(values, value_type) {
        // value_type is: indicative or buy_price
        var sum = 0;
        var keys = Object.keys(values);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (values[key] && !isNaN(values[key][value_type])) {
                sum += parseFloat(values[key][value_type]);
            }
        }

        return sum;
    };

    return {
        getBalance: getBalance,
        getPortfolioData: getPortfolioData,
        getProposalOpenContract: getProposalOpenContract,
        getIndicativeSum: function getIndicativeSum(values) {
            return getSum(values, 'indicative');
        },
        getSumPurchase: function getSumPurchase(values) {
            return getSum(values, 'buy_price');
        }
    };
}();

module.exports = {
    Portfolio: Portfolio
};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MetaTraderConfig = __webpack_require__(106);
var Client = __webpack_require__(4);
var formatMoney = __webpack_require__(7).formatMoney;
var Validation = __webpack_require__(49);
var localize = __webpack_require__(2).localize;
var State = __webpack_require__(6).State;
var urlForStatic = __webpack_require__(8).urlForStatic;
var getPropertyValue = __webpack_require__(0).getPropertyValue;
var showLoadingImage = __webpack_require__(0).showLoadingImage;
var template = __webpack_require__(0).template;

var MetaTraderUI = function () {
    var $container = void 0,
        $list_cont = void 0,
        $mt5_account = void 0,
        $list = void 0,
        $detail = void 0,
        $action = void 0,
        $templates = void 0,
        _$form = void 0,
        $main_msg = void 0,
        validations = void 0,
        submit = void 0;

    var accounts_info = MetaTraderConfig.accounts_info;
    var actions_info = MetaTraderConfig.actions_info;

    var init = function init(submit_func) {
        submit = submit_func;
        $container = $('#mt_account_management');
        $mt5_account = $container.find('#mt5_account');
        $list_cont = $container.find('#accounts_list');
        $list = $list_cont.find('> div.list');
        $detail = $container.find('#account_details');
        $action = $container.find('#fst_action');
        $templates = $container.find('#templates').remove();
        $main_msg = $container.find('#main_msg');
        $container.find('[class*="act_"]').click(populateForm);

        MetaTraderConfig.setMessages($templates.find('#messages'));

        validations = MetaTraderConfig.validations();

        populateAccountTypes();
        populateAccountList();
    };

    var populateAccountList = function populateAccountList() {
        var $acc_name = $templates.find('> .acc-name');
        var acc_group_demo_set = false;
        var acc_group_real_set = false;
        Object.keys(accounts_info).sort(function (a, b) {
            return accounts_info[a].account_type > accounts_info[b].account_type ? 1 : -1;
        }).forEach(function (acc_type) {
            if ($list.find('[value="' + acc_type + '"]').length === 0) {
                if (/^demo/.test(acc_type)) {
                    if (!acc_group_demo_set) {
                        $list.append($('<div/>', { class: 'acc-group invisible', id: 'acc_group_demo', text: localize('Demo Accounts') }));
                        acc_group_demo_set = true;
                    }
                } else if (!acc_group_real_set) {
                    $list.append($('<div/>', { class: 'acc-group invisible', id: 'acc_group_real', text: localize('Real-Money Accounts') }));
                    acc_group_real_set = true;
                }
                var $acc_item = $acc_name.clone();
                $acc_item.attr('value', acc_type);
                $list.append($acc_item);
            }
        });

        var hideList = function hideList() {
            $list_cont.slideUp('fast', function () {
                $mt5_account.removeClass('open');
            });
        };

        // account switch events
        $mt5_account.off('click').on('click', function (e) {
            e.stopPropagation();
            if ($list_cont.is(':hidden')) {
                $mt5_account.addClass('open');
                $list_cont.slideDown('fast');
            } else {
                hideList();
            }
        });
        $list.off('click').on('click', '.acc-name', function () {
            if (!$(this).hasClass('disabled')) {
                setAccountType($(this).attr('value'), true);
            }
        });
        $(document).off('click.mt5_account_list').on('click.mt5_account_list', function () {
            hideList();
        });
    };

    var setAccountType = function setAccountType(acc_type, should_set_account) {
        if ($mt5_account.attr('value') !== acc_type) {
            Client.set('mt5_account', acc_type);
            $mt5_account.attr('value', acc_type).removeClass('empty');
            setMTAccountText();
            $list.find('.acc-name').removeClass('selected');
            $list.find('[value="' + acc_type + '"]').addClass('selected');
            $action.setVisibility(0);
            if (should_set_account) {
                setCurrentAccount(acc_type);
                $.scrollTo($('h1'), 300, { offset: -10 });
            }
        }
    };

    var updateAccount = function updateAccount(acc_type) {
        updateListItem(acc_type);
        setCurrentAccount(acc_type);
    };

    var setMTAccountText = function setMTAccountText() {
        var acc_type = $mt5_account.attr('value');
        if (acc_type) {
            var login = getPropertyValue(accounts_info[acc_type], ['info', 'login']);
            var title = '' + accounts_info[acc_type].title + (login ? ' (' + login + ')' : '');
            if (!new RegExp(title).test($mt5_account.text())) {
                $mt5_account.html(title);
            }
        }
    };

    var updateListItem = function updateListItem(acc_type) {
        var $acc_item = $list.find('[value="' + acc_type + '"]');
        $acc_item.find('.mt-type').text(accounts_info[acc_type].title.replace(/(demo|real)\s/i, ''));
        if (accounts_info[acc_type].info) {
            setMTAccountText();
            $acc_item.find('.mt-login').text('(' + accounts_info[acc_type].info.login + ')');
            $acc_item.setVisibility(1);
            if (/demo/.test(accounts_info[acc_type].account_type)) {
                $list.find('#acc_group_demo').setVisibility(1);
            } else {
                $list.find('#acc_group_real').setVisibility(1);
            }
            if (acc_type === Client.get('mt5_account')) {
                var mt_balance = formatMoney(MetaTraderConfig.getCurrency(acc_type), +accounts_info[acc_type].info.balance);
                $acc_item.find('.mt-balance').html(mt_balance);
                $action.find('.mt5-balance').html(mt_balance);
            }
            if (Object.keys(accounts_info).every(function (type) {
                return accounts_info[type].info;
            })) {
                $container.find('.act_new_account').remove();
            }
        } else {
            $acc_item.setVisibility(0);
        }
    };

    var displayAccountDescription = function displayAccountDescription(acc_type) {
        $container.find('#account_desc').html($templates.find('.account-desc .' + acc_type).clone());
    };

    var setCurrentAccount = function setCurrentAccount(acc_type) {
        if (Client.get('mt5_account') && Client.get('mt5_account') !== acc_type) return;

        displayAccountDescription(acc_type);

        if (accounts_info[acc_type].info) {
            // Update account info
            $detail.find('.acc-info div[data]').map(function () {
                var key = $(this).attr('data');
                var info = accounts_info[acc_type].info[key];
                var mapping = {
                    balance: function balance() {
                        return isNaN(info) ? '' : formatMoney(MetaTraderConfig.getCurrency(acc_type), +info);
                    },
                    leverage: function leverage() {
                        return '1:' + info;
                    },
                    login: function login() {
                        return info + ' (' + localize(/demo/.test(accounts_info[acc_type].account_type) ? 'Demo Account' : 'Real-Money Account') + ')';
                    }
                };
                $(this).html(typeof mapping[key] === 'function' ? mapping[key]() : info);
            });
            // $container.find('.act_cashier').setVisibility(!types_info[acc_type].is_demo);
            $container.find('.has-account').setVisibility(1);
        } else {
            $detail.find('.acc-info, .acc-actions').setVisibility(0);
        }
        $('#mt_loading').remove();
        $container.setVisibility(1);

        setAccountType(acc_type);

        if ($action.hasClass('invisible')) {
            loadAction(defaultAction(acc_type));
        }
    };

    var defaultAction = function defaultAction(acc_type) {
        var type = 'new_account';
        if (accounts_info[acc_type].info) {
            type = accounts_info[acc_type].is_demo ? 'password_change' : 'cashier';
        }
        return type;
    };

    var loadAction = function loadAction(action, acc_type) {
        $container.find('[class*=act_' + (action || defaultAction(acc_type)) + ']').click();
    };

    var populateForm = function populateForm(e) {
        var $target = $(e.target);
        if ($target.prop('tagName').toLowerCase() !== 'a') {
            $target = $target.parents('a');
        }
        $main_msg.setVisibility(0);

        var acc_type = Client.get('mt5_account');
        var action = $target.attr('class').split(' ').find(function (c) {
            return (/^act_/.test(c)
            );
        }).replace('act_', '');

        var cloneForm = function cloneForm() {
            _$form = $templates.find('#frm_' + action).clone();
            _$form.find('.' + (/demo/.test(acc_type) ? 'demo' : 'real') + '-only').setVisibility(1);
            var formValues = (actions_info[action] || {}).formValues;
            if (formValues) formValues(_$form, acc_type, action);

            // append form
            $action.find('#frm_action').html(_$form).setVisibility(1).end().setVisibility(1);

            if (action === 'password_change') {
                _$form.find('label[for*="_password"]').append(' (' + localize('for MT5 Account') + ' ' + accounts_info[acc_type].info.login + ')');
            }

            _$form.find('button[type="submit"]').each(function () {
                // cashier has two different actions
                var this_action = $(this).attr('action');
                actions_info[this_action].$form = $(this).parents('form');
                $(this).attr({ acc_type: acc_type }).on('click dblclick', submit);
                Validation.init('#frm_' + this_action, validations[this_action]);
            });

            handleNewAccountUI(action, acc_type, $target);
        };

        if (action === 'new_account') {
            cloneForm();
            return;
        }

        if (!actions_info[action]) {
            // Manage Fund
            cloneForm();
            _$form.find('.binary-account').text('' + localize('[_1] Account [_2]', ['Binary', Client.get('loginid')]));
            _$form.find('.binary-balance').html('' + formatMoney(Client.get('currency'), Client.get('balance')));
            _$form.find('.mt5-account').text('' + localize('[_1] Account [_2]', [accounts_info[acc_type].title, accounts_info[acc_type].info.login]));
            _$form.find('.mt5-balance').html('' + formatMoney(MetaTraderConfig.getCurrency(acc_type), accounts_info[acc_type].info.balance));
            _$form.find('label[for^="txt_amount_"]').append(' ' + MetaTraderConfig.getCurrency(acc_type));
            ['deposit', 'withdrawal'].forEach(function (act) {
                actions_info[act].prerequisites(acc_type).then(function (error_msg) {
                    if (error_msg) {
                        $container.find('#frm_' + act + ' .form').replaceWith($('<p/>', { class: 'unavailable' }));
                        displayMessage('#frm_' + act + ' .unavailable', error_msg, true);
                    }
                });
            });

            if (!accounts_info[acc_type].is_demo) {
                var msg = '';
                if (Client.get('is_virtual')) {
                    msg = MetaTraderConfig.needsRealMessage();
                } else if (Client.get('currency') !== MetaTraderConfig.getCurrency(acc_type)) {
                    msg = template($templates.find('#msg_currency_not_match').text(), [MetaTraderConfig.getCurrency(acc_type)]);
                }
                if (msg) {
                    displayMainMessage(msg, false);
                    $action.find('#frm_cashier').setVisibility(0);
                }
            }
            return;
        }

        actions_info[action].prerequisites(acc_type).then(function (error_msg) {
            if (error_msg) {
                // does not meet one of prerequisites
                displayMainMessage(error_msg);
                $action.find('#frm_action').empty().end().setVisibility(1);
                return;
            }

            if (!$action.find('#frm_' + action).length) {
                $main_msg.setVisibility(0);
            }

            cloneForm();
        });
    };

    // -----------------------
    // ----- New Account -----
    // -----------------------
    var handleNewAccountUI = function handleNewAccountUI(action, acc_type, $target) {
        var is_new_account = action === 'new_account';
        var $acc_actions = $container.find('.acc-actions');
        $acc_actions.find('.new-account').setVisibility(is_new_account);
        $acc_actions.find('.has-account').setVisibility(!is_new_account);
        $detail.setVisibility(!is_new_account);

        if (!is_new_account) {
            // set active tab
            $detail.setVisibility(1);
            $container.find('[class*="act_"]').removeClass('selected');
            $target.addClass('selected');
            return;
        }

        // is_new_account
        newAccountSetTitle();
        displayAccountDescription(action);
        _$form = actions_info[action].$form;
        if (Object.keys(accounts_info).every(function (a_type) {
            return !accounts_info[a_type].info;
        })) {
            _$form.find('#view_1 #btn_cancel').addClass('invisible');
        }

        // Navigation buttons: cancel, next, back
        _$form.find('#btn_cancel').click(function () {
            loadAction(null, acc_type);
            displayAccountDescription(accounts_info[acc_type].info ? acc_type : 'new_account');
            $.scrollTo($('h1'), 300, { offset: -10 });
        });
        var displayStep = function displayStep(step) {
            _$form.find('#mv_new_account div[id^="view_"]').setVisibility(0);
            _$form.find('#view_' + step).setVisibility(1);
            _$form.find('#view_2').find('.error-msg, .days_to_crack').setVisibility(0);
            _$form.find('input').val('');
        };
        _$form.find('#btn_next').click(function () {
            if (!$(this).hasClass('button-disabled')) {
                _$form.find('#view_2 #btn_submit_new_account').attr('acc_type', newAccountGetType());
                displayStep(2);
                _$form.find('#txt_name').val(State.getResponse('get_settings').first_name + ' ' + State.getResponse('get_settings').last_name);
                $.scrollTo($container.find('.acc-actions'), 300, { offset: -10 });
            }
        });
        _$form.find('#btn_back').click(function () {
            displayStep(1);
        });

        // Account type selection
        _$form.find('.mt5_type_box').click(selectAccountTypeUI);
    };

    var newAccountSetTitle = function newAccountSetTitle(acc_type) {
        $container.find('.acc-actions .new-account span').text(template($templates.find('#title_new_account').text(), [acc_type ? accounts_info[acc_type].title : '']));
    };

    var newAccountGetType = function newAccountGetType() {
        return _$form.find('.step-1 .selected').attr('data-acc-type') + '_' + _$form.find('.step-2 .selected').attr('data-acc-type');
    };

    var selectAccountTypeUI = function selectAccountTypeUI(e) {
        var action = 'new_account';
        var box_class = 'mt5_type_box';
        var $item = $(e.target);
        if (!$item.hasClass(box_class)) {
            $item = $item.parents('.' + box_class);
        }
        if (/\b(disabled|selected|existed)\b/.test($item.attr('class'))) return;
        $item.parents('.type-group').find('.' + box_class + '.selected').removeClass('selected');
        $item.addClass('selected');
        var selected_acc_type = $item.attr('data-acc-type');
        if (/(demo|real)/.test(selected_acc_type)) {
            newAccountSetTitle();
            displayAccountDescription(action);
            updateAccountTypesUI(selected_acc_type);
            _$form.find('#view_1 #btn_next').addClass('button-disabled');
            _$form.find('#view_1 .step-2').setVisibility(1);
            displayMessage('#new_account_msg', selected_acc_type === 'real' && Client.get('is_virtual') ? MetaTraderConfig.needsRealMessage() : '', true);
        } else {
            var new_acc_type = newAccountGetType();
            newAccountSetTitle(new_acc_type);
            displayAccountDescription(new_acc_type);
            actions_info[action].prerequisites(new_acc_type).then(function (error_msg) {
                displayMessage('#new_account_msg', error_msg || '');
                _$form.find('#view_1 #btn_next')[error_msg ? 'addClass' : 'removeClass']('button-disabled');
                _$form.find('#view_1 #btn_cancel').removeClass('invisible');
            });
        }
    };

    var updateAccountTypesUI = function updateAccountTypesUI(type) {
        Object.keys(accounts_info).filter(function (acc_type) {
            return acc_type.indexOf(type) === 0;
        }).forEach(function (acc_type) {
            var class_name = type === 'real' && Client.get('is_virtual') ? 'disabled' : '';
            if (accounts_info[acc_type].info) {
                class_name = 'existed';
            }
            _$form.find('.step-2 #' + acc_type.replace(type, 'rbtn')).removeClass('existed disabled selected').addClass(class_name);
        });
    };

    var populateAccountTypes = function populateAccountTypes() {
        var $acc_template = $templates.find('#rbtn_template').parent().remove();
        var $parent = $templates.find('#view_1 .step-2 .type-group');
        if (!$acc_template.length || !$parent.length) return;

        var count = 0;
        Object.keys(accounts_info).filter(function (acc_type) {
            return !accounts_info[acc_type].is_demo;
        }).forEach(function (acc_type) {
            count++;
            var $acc = $acc_template.clone();
            var type = acc_type.split('_').slice(1).join('_');
            var title = accounts_info[acc_type].short_title;
            $acc.find('.mt5_type_box').attr({ id: 'rbtn_' + type, 'data-acc-type': type }).find('img').attr('src', urlForStatic('/images/pages/metatrader/icons/acc_' + title.toLowerCase().replace(/\s/g, '_') + '.svg'));
            $acc.find('p').text(title);
            $parent.append($acc);
        });
        $templates.find('.hl-types-of-accounts').setVisibility(count > 1);
    };

    // -------------------
    // ----- General -----
    // -------------------
    var postValidate = function postValidate(acc_type, action) {
        var validate = actions_info[action].pre_submit;
        return validate ? validate(actions_info[action].$form, acc_type, displayFormMessage) : new Promise(function (resolve) {
            return resolve(true);
        });
    };

    var removeUrlHash = function removeUrlHash() {
        var url = location.href.split('#')[0];
        window.history.replaceState({ url: url }, document.title, url);
    };

    var hideFormMessage = function hideFormMessage(action) {
        actions_info[action].$form.find('#msg_form').html('').setVisibility(0);
    };

    var displayFormMessage = function displayFormMessage(message, action) {
        actions_info[action].$form.find('#msg_form').html(message).setVisibility(1);
    };

    var displayMainMessage = function displayMainMessage(message) {
        var should_scroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        $main_msg.html(message).setVisibility(1);
        if (should_scroll) {
            $.scrollTo($action, 500, { offset: -80 });
        }
    };

    var displayMessage = function displayMessage(selector, message, is_centered) {
        $container.find(selector).html(message).attr('class', 'notice-msg hint ' + (is_centered ? 'center-text' : 'align-start')).setVisibility(message.length);
    };

    var displayPageError = function displayPageError(message) {
        $('#page_msg').html(message).setVisibility(1);
        $('#mt_loading').remove();
    };

    var disableButton = function disableButton(action) {
        var $btn = actions_info[action].$form.find('button');
        if ($btn.length && !$btn.find('.barspinner').length) {
            $btn.attr('disabled', 'disabled');
            var $btn_text = $('<span/>', { text: $btn.text(), class: 'invisible' });
            showLoadingImage($btn[0], 'white');
            $btn.append($btn_text);
        }
    };

    var enableButton = function enableButton(action) {
        var $btn = actions_info[action].$form.find('button');
        if ($btn.length && $btn.find('.barspinner').length) {
            $btn.removeAttr('disabled').html($btn.find('span').text());
        }
    };

    return {
        init: init,
        setAccountType: setAccountType,
        loadAction: loadAction,
        updateAccount: updateAccount,
        postValidate: postValidate,
        removeUrlHash: removeUrlHash,
        hideFormMessage: hideFormMessage,
        displayFormMessage: displayFormMessage,
        displayMainMessage: displayMainMessage,
        displayPageError: displayPageError,
        disableButton: disableButton,
        enableButton: enableButton,

        $form: function $form() {
            return _$form;
        }
    };
}();

module.exports = MetaTraderUI;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PortfolioInit = __webpack_require__(105);
var updateContractBalance = __webpack_require__(73).updateContractBalance;
var Client = __webpack_require__(4);
var BinarySocket = __webpack_require__(5);
var formatMoney = __webpack_require__(7).formatMoney;
var getPropertyValue = __webpack_require__(0).getPropertyValue;

var updateBalance = function updateBalance(response) {
    if (getPropertyValue(response, 'error')) {
        return;
    }
    BinarySocket.wait('website_status').then(function () {
        var balance = response.balance.balance;
        Client.set('balance', balance);
        PortfolioInit.updateBalance();
        var currency = response.balance.currency;
        if (!currency) {
            return;
        }
        var view = formatMoney(currency, balance);
        updateContractBalance(balance);
        $('.topMenuBalance, .binary-balance').html(view).css('visibility', 'visible');
    });
};

module.exports = updateBalance;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputField = function (_React$PureComponent) {
    _inherits(InputField, _React$PureComponent);

    function InputField() {
        _classCallCheck(this, InputField);

        return _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).apply(this, arguments));
    }

    _createClass(InputField, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'input-field ' + (this.props.className ? this.props.className : '') },
                !!this.props.label && _react2.default.createElement(
                    'label',
                    { htmlFor: this.props.name, className: 'input-label' },
                    this.props.label
                ),
                !!this.props.prefix &&
                // TODO: fix alignment
                _react2.default.createElement(
                    'i',
                    null,
                    _react2.default.createElement('span', { className: 'symbols ' + this.props.prefix.toLowerCase() })
                ),
                _react2.default.createElement('input', {
                    type: this.props.type,
                    name: this.props.name,
                    step: this.props.is_currency ? '0.01' : undefined,
                    placeholder: this.props.placeholder || undefined,
                    disabled: this.props.is_disabled,
                    value: this.props.value,
                    onChange: this.props.onChange,
                    required: this.props.required || undefined
                }),
                !!this.props.helper && _react2.default.createElement(
                    'span',
                    { className: 'input-helper' },
                    this.props.helper
                )
            );
        }
    }]);

    return InputField;
}(_react2.default.PureComponent);

exports.default = InputField;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _socket = __webpack_require__(5);

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* TODO:
      1. to manage subscriptions and subscription ids
      2. to handle forget and then resubscribe when needed
      3. to handle another request with the same values while the previous one still valid (either stream or not)
      4. to ...
*/
var DAO = function () {
    var getActiveSymbols = function getActiveSymbols() {
        return _socket2.default.send({ active_symbols: 'brief' });
    };

    var getContractsFor = function getContractsFor(symbol) {
        return _socket2.default.send({ contracts_for: symbol });
    };

    var getPayoutCurrencies = function getPayoutCurrencies() {
        return _socket2.default.send({ payout_currencies: 1 });
    };

    var getWebsiteStatus = function getWebsiteStatus() {
        return _socket2.default.send({ website_status: 1 });
    };

    var getTicks = function getTicks(symbol, cb) {
        return _socket2.default.send({ ticks: symbol, subscribe: 1 }, { callback: cb });
    };

    return {
        getActiveSymbols: getActiveSymbols,
        getContractsFor: getContractsFor,
        getPayoutCurrencies: getPayoutCurrencies,
        getWebsiteStatus: getWebsiteStatus,
        getTicks: getTicks
    };
}();

module.exports = DAO;

/***/ }),
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(_ref) {
    var id = _ref.id,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        text = _ref.text,
        has_effect = _ref.has_effect,
        is_disabled = _ref.is_disabled,
        handleClick = _ref.handleClick;

    var classes = 'btn' + (has_effect ? ' effect' : '') + ' ' + className;
    return _react2.default.createElement(
        'button',
        { id: id, className: classes, onClick: handleClick || undefined, disabled: is_disabled },
        _react2.default.createElement(
            'span',
            null,
            text
        )
    );
};

exports.default = Button;

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _iscroll = __webpack_require__(616);

var _iscroll2 = _interopRequireDefault(_iscroll);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* TODO:
      1. to change to 24 hours format
      2. to handle disabled time period
      3. to handle null as initial value
*/

var TimePickerDropdown = function (_PureComponent) {
    _inherits(TimePickerDropdown, _PureComponent);

    function TimePickerDropdown(props) {
        _classCallCheck(this, TimePickerDropdown);

        var _this = _possibleConstructorReturn(this, (TimePickerDropdown.__proto__ || Object.getPrototypeOf(TimePickerDropdown)).call(this, props));

        _this.clear = function (event) {
            event.stopPropagation();
            _this.resetValues();
            _this.setState({
                hour: undefined,
                minute: undefined,
                meridiem: undefined
            });
            _this.props.onChange('');
        };

        _this.hours = ['12'].concat(_toConsumableArray([].concat(_toConsumableArray(Array(11).keys())).map(function (a) {
            return ('0' + (a + 1)).slice(-2);
        })));
        _this.minutes = [].concat(_toConsumableArray(Array(60).keys())).map(function (a) {
            return ('0' + a).slice(-2);
        });
        _this.meridiem = ['am', 'pm'];
        _this.state = {
            hour: props.value.split(':')[0],
            minute: (props.value.split(':')[1] || '').split(' ')[0],
            meridiem: (props.value.split(':')[1] || '').split(' ')[1] || '',
            is_hour_selected: false,
            is_minute_selected: false,
            is_meridiem_selected: false,
            last_updated_type: null
        };
        _this.selectHour = _this.selectOption.bind(_this, 'hour');
        _this.selectMinute = _this.selectOption.bind(_this, 'minute');
        _this.selectMeridiem = _this.selectOption.bind(_this, 'meridiem');
        _this.saveHourRef = _this.saveRef.bind(_this, 'hour');
        _this.saveMinuteRef = _this.saveRef.bind(_this, 'minute');
        _this.saveMeridiemRef = _this.saveRef.bind(_this, 'meridiem');
        return _this;
    }

    _createClass(TimePickerDropdown, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.initIScroll();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.hourScroll.destroy();
            this.minuteScroll.destroy();
            this.meridiemScroll.destroy();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var _state = this.state,
                is_hour_selected = _state.is_hour_selected,
                is_minute_selected = _state.is_minute_selected,
                is_meridiem_selected = _state.is_meridiem_selected;

            if (is_hour_selected && is_minute_selected && is_meridiem_selected) {
                this.resetValues();
                this.props.toggle();
            }

            var _state2 = this.state,
                hour = _state2.hour,
                minute = _state2.minute,
                meridiem = _state2.meridiem;

            if (hour && minute && meridiem && (hour !== prevState.hour || minute !== prevState.minute || meridiem !== prevState.meridiem)) {
                // Call on change only once when all of the values are selected and one of the value is changed
                this.props.onChange(hour + ':' + minute + ' ' + meridiem);
            }

            if (!prevProps.className && this.props.className === 'active') {
                this.resetValues();
            }
            if (prevState.last_updated_type !== this.state.last_updated_type && this.state.last_updated_type) {
                this.scrollToSelected(this.state.last_updated_type, 200);
                this.setState({ last_updated_type: null });
            }
        }
    }, {
        key: 'initIScroll',
        value: function initIScroll() {
            var iScrollOptions = {
                mouseWheel: true,
                useTransition: true
            };
            this.hourScroll = new _iscroll2.default('.time-picker-hours', iScrollOptions);
            this.minuteScroll = new _iscroll2.default('.time-picker-minutes', iScrollOptions);
            this.meridiemScroll = new _iscroll2.default('.time-picker-meridiem', iScrollOptions);
        }
    }, {
        key: 'scrollToSelected',
        value: function scrollToSelected(type, duration) {
            var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -30;

            // move to selected item
            var wrapper = {
                hour: this.hourScroll,
                minute: this.minuteScroll,
                meridiem: this.meridiemScroll
            };
            if (wrapper[type].scroller.querySelector('.selected')) {
                wrapper[type].scrollToElement('.selected', duration, null, offset, _iscroll2.default.utils.ease.elastic);
            } else {
                wrapper[type].scrollToElement('.list-item', duration, null, null);
            }
        }
    }, {
        key: 'resetValues',
        value: function resetValues() {
            this.setState({
                is_hour_selected: false,
                is_minute_selected: false,
                is_meridiem_selected: false
            });
            this.hourScroll.refresh();
            this.minuteScroll.refresh();
            this.meridiemScroll.refresh();
            this.scrollToSelected('hour', 0, 0);
            this.scrollToSelected('minute', 0, 0);
            this.scrollToSelected('meridiem', 0, 0);
        }
    }, {
        key: 'selectOption',
        value: function selectOption(type, value) {
            this.setState({
                last_updated_type: type
            });
            if (type === 'hour') {
                this.setState({
                    hour: value,
                    is_hour_selected: true
                });
            } else if (type === 'minute') {
                this.setState({
                    minute: value,
                    is_minute_selected: true
                });
            } else {
                this.setState({
                    meridiem: value,
                    is_meridiem_selected: true
                });
            }
        }
    }, {
        key: 'saveRef',
        value: function saveRef(type, node) {
            var _this2 = this;

            if (!node) return;
            var save = {
                hour: function hour(n) {
                    return _this2.hourSelect = n;
                },
                minute: function minute(n) {
                    return _this2.minuteSelect = n;
                },
                meridiem: function meridiem(n) {
                    return _this2.meridiemSelect = n;
                }
            };

            save[type](node);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                preClass = _props.preClass,
                value = _props.value,
                toggle = _props.toggle;

            return _react2.default.createElement(
                'div',
                { className: preClass + '-dropdown ' + this.props.className },
                _react2.default.createElement(
                    'div',
                    {
                        className: preClass + '-panel',
                        onClick: toggle
                    },
                    _react2.default.createElement(
                        'span',
                        { className: value ? '' : 'placeholder' },
                        value || (0, _localize.localize)('Select time')
                    ),
                    _react2.default.createElement('span', {
                        className: preClass + '-clear',
                        onClick: this.clear
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: preClass + '-selector' },
                    _react2.default.createElement(
                        'div',
                        {
                            ref: this.saveHourRef,
                            className: preClass + '-hours'
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'list-container' },
                            this.hours.map(function (h, key) {
                                return _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'list-item' + (_this3.state.hour === h ? ' selected' : ''),
                                        key: key,
                                        onClick: _this3.selectHour.bind(null, h)
                                    },
                                    h
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            ref: this.saveMinuteRef,
                            className: preClass + '-minutes'
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'list-container' },
                            this.minutes.map(function (mm, key) {
                                return _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'list-item' + (_this3.state.minute === mm ? ' selected' : ''),
                                        key: key,
                                        onClick: _this3.selectMinute.bind(null, mm)
                                    },
                                    mm
                                );
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            ref: this.saveMeridiemRef,
                            className: preClass + '-meridiem'
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'list-container' },
                            this.meridiem.map(function (a, key) {
                                return _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'list-item' + (_this3.state.meridiem === a ? ' selected' : ''),
                                        key: key,
                                        onClick: _this3.selectMeridiem.bind(null, a)
                                    },
                                    a
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return TimePickerDropdown;
}(_react.PureComponent);

var TimePicker = function (_PureComponent2) {
    _inherits(TimePicker, _PureComponent2);

    function TimePicker(props) {
        _classCallCheck(this, TimePicker);

        var _this4 = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

        _this4.toggleDropDown = function () {
            _this4.setState({ is_open: !_this4.state.is_open });
        };

        _this4.handleChange = function (arg) {
            // To handle nativepicker;
            var value = (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' ? _this4.convertTo12h(arg.target.value) : arg;

            if (value !== _this4.props.value) {
                _this4.props.onChange({ target: { name: _this4.props.name, value: value } });
            }
        };

        _this4.saveRef = function (node) {
            if (!node) return;
            if (node.nodeName === 'INPUT') {
                _this4.target_element = node;
                return;
            }
            _this4.wrapper_ref = node;
        };

        _this4.handleClickOutside = function (event) {
            if (_this4.wrapper_ref && !_this4.wrapper_ref.contains(event.target)) {
                if (_this4.state.is_open) {
                    _this4.setState({ is_open: false });
                }
            }
        };

        _this4.convertTo24h = function (value) {
            if (!value) return '';

            var _value$split = value.split(':'),
                _value$split2 = _slicedToArray(_value$split, 2),
                hour = _value$split2[0],
                other = _value$split2[1];

            var _other$split = other.split(' '),
                _other$split2 = _slicedToArray(_other$split, 2),
                minute = _other$split2[0],
                meridiem = _other$split2[1];

            if (meridiem.toLowerCase() === 'pm') {
                return (hour % 12 ? +hour + 12 : '12') + ':' + minute;
            }
            return (hour % 12 ? hour : '00') + ':' + minute;
        };

        _this4.convertTo12h = function (value) {
            if (!value) return '';

            var _value$split3 = value.split(':'),
                _value$split4 = _slicedToArray(_value$split3, 2),
                hour = _value$split4[0],
                minute = _value$split4[1];

            var meridiem = +hour >= 12 ? 'pm' : 'am';
            if (meridiem === 'pm' && hour > 12) {
                return ('0' + (+hour - 12)).slice(-2) + ':' + minute + ' ' + meridiem;
            }

            return (+hour === 0 ? 12 : hour) + ':' + minute + ' ' + meridiem;
        };

        _this4.state = {
            is_open: false,
            value: ''
        };
        return _this4;
    }

    _createClass(TimePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'render',
        value: function render() {
            var prefix_class = 'time-picker';
            var _props2 = this.props,
                is_nativepicker = _props2.is_nativepicker,
                value = _props2.value,
                name = _props2.name,
                placeholder = _props2.placeholder;

            var formatted_value = this.convertTo24h(value);
            return _react2.default.createElement(
                'div',
                {
                    ref: this.saveRef,
                    className: '' + prefix_class + (this.props.padding ? ' padding' : '') + (this.state.is_open ? ' active' : '')
                },
                is_nativepicker ? _react2.default.createElement('input', {
                    type: 'time',
                    id: prefix_class + '-input',
                    value: formatted_value,
                    onChange: this.handleChange,
                    name: name
                }) : _react2.default.createElement(
                    _react2.default.Fragment,
                    null,
                    _react2.default.createElement('input', {
                        ref: this.saveRef,
                        type: 'text',
                        readOnly: true,
                        id: prefix_class + '-input',
                        className: prefix_class + '-input ' + (this.state.is_open ? 'active' : ''),
                        value: value,
                        onClick: this.toggleDropDown,
                        name: name,
                        placeholder: placeholder
                    }),
                    _react2.default.createElement(TimePickerDropdown, {
                        className: this.state.is_open ? 'active' : '',
                        toggle: this.toggleDropDown,
                        onChange: this.handleChange,
                        preClass: prefix_class,
                        value: value
                    })
                )
            );
        }
    }]);

    return TimePicker;
}(_react.PureComponent);

exports.default = TimePicker;

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.disposeActions = exports.initActions = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// add files containing actions here.


var _mobx = __webpack_require__(98);

var _mobxUtils = __webpack_require__(619);

var _utility = __webpack_require__(0);

var _contract_type = __webpack_require__(368);

var ContractType = _interopRequireWildcard(_contract_type);

var _currency = __webpack_require__(369);

var Currency = _interopRequireWildcard(_currency);

var _duration = __webpack_require__(370);

var Duration = _interopRequireWildcard(_duration);

var _start_date = __webpack_require__(372);

var StartDate = _interopRequireWildcard(_start_date);

var _symbol = __webpack_require__(373);

var _Symbol = _interopRequireWildcard(_symbol);

var _test = __webpack_require__(374);

var Test = _interopRequireWildcard(_test);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(0, _mobx.useStrict)(true);

var reaction_disposers = [];

var defaultExports = _extends({}, ContractType, Currency, Duration, _Symbol, StartDate, Test);

var initActions = exports.initActions = function initActions(store) {
    Object.keys(defaultExports).forEach(function (methodName) {
        var method = defaultExports[methodName];

        if (/.*async$/i.test(methodName)) {
            defaultExports[methodName] = (0, _mobxUtils.asyncAction)(methodName + '.wrapper', /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload) {
                var snapshot, new_state;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                snapshot = (0, _utility.cloneObject)(store);
                                _context.next = 3;
                                return (0, _mobxUtils.asyncAction)(methodName, method)(snapshot, payload);

                            case 3:
                                new_state = _context.sent;

                                Object.keys(new_state).forEach(function (key) {
                                    store[key] = new_state[key];
                                });

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        } else {
            defaultExports[methodName] = (0, _mobx.action)(methodName, function (payload) {
                var snapshot = (0, _utility.cloneObject)(store);
                var new_state = method(snapshot, payload);
                Object.keys(new_state).forEach(function (key) {
                    store[key] = new_state[key];
                });
            });
        }
    });

    var reaction_map = {
        symbol: defaultExports.onChangeSymbolAsync,
        contract_types_list: defaultExports.onChangeContractTypeList,
        contract_type: defaultExports.onChangeContractType,
        amount: defaultExports.onChangeAmount,
        expiry_type: defaultExports.onChangeExpiry,
        expiry_date: defaultExports.onChangeExpiry,
        expiry_time: defaultExports.onChangeExpiry,
        duration_unit: defaultExports.onChangeExpiry,
        start_date: defaultExports.onChangeStartDate
    };

    Object.keys(reaction_map).forEach(function (reaction_key) {
        var disposer = (0, _mobx.reaction)(function () {
            return store[reaction_key];
        }, reaction_map[reaction_key]);
        reaction_disposers.push(disposer);
    });
};

var disposeActions = exports.disposeActions = function disposeActions() {
    reaction_disposers.forEach(function (disposer) {
        disposer();
    });
};

exports.default = defaultExports;

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullscreenDialog = function (_React$PureComponent) {
    _inherits(FullscreenDialog, _React$PureComponent);

    function FullscreenDialog() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, FullscreenDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FullscreenDialog.__proto__ || Object.getPrototypeOf(FullscreenDialog)).call.apply(_ref, [this].concat(args))), _this), _this.scrollToElIfNeeded = function (parent, el) {
            var viewport_offset = el.getBoundingClientRect();
            var hidden = viewport_offset.top + el.clientHeight + 20 > window.innerHeight;
            if (hidden) {
                var new_el_top = (window.innerHeight - el.clientHeight) / 2;
                parent.scrollTop += viewport_offset.top - new_el_top;
            }
        }, _this.handleClick = function (e) {
            if (e.target.tagName === 'INPUT' && e.target.type === 'number') {
                var scrollToTarget = _this.scrollToElIfNeeded.bind(null, e.currentTarget, e.target);
                window.addEventListener('resize', scrollToTarget, false);

                // remove listener, resize is not fired on iOS safari
                window.setTimeout(function () {
                    window.removeEventListener('resize', scrollToTarget, false);
                }, 2000);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FullscreenDialog, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.visible) {
                document.body.classList.add('no-scroll');
                document.getElementById('binary_app').classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
                document.getElementById('binary_app').classList.remove('no-scroll');
            }
        }

        // sometimes input is covered by virtual keyboard on mobile chrome, uc browser

    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                title = _props.title,
                visible = _props.visible,
                children = _props.children;


            return _react2.default.createElement(
                'div',
                {
                    className: 'fullscreen-dialog ' + (visible ? 'fullscreen-dialog--open' : ''),
                    onClick: this.handleClick.bind(this)
                },
                _react2.default.createElement(
                    'div',
                    { className: 'fullscreen-dialog__header' },
                    _react2.default.createElement(
                        'h2',
                        { className: 'fullscreen-dialog__title' },
                        title
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'icons btn-close fullscreen-dialog__close-btn',
                            onClick: this.props.onClose
                        },
                        _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/common/close.svg'), alt: 'Close' })
                    )
                ),
                _react2.default.createElement('div', { className: 'fullscreen-dialog__header-shadow-cover' }),
                _react2.default.createElement('div', { className: 'fullscreen-dialog__header-shadow' }),
                _react2.default.createElement(
                    'div',
                    { className: 'fullscreen-dialog__content' },
                    children
                )
            );
        }
    }]);

    return FullscreenDialog;
}(_react2.default.PureComponent);

exports.default = FullscreenDialog;

/***/ }),
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(268);

var _reactRouterDom = __webpack_require__(272);

var _connect = __webpack_require__(43);

var _trade_store = __webpack_require__(387);

var _trade_store2 = _interopRequireDefault(_trade_store);

var _ui_store = __webpack_require__(388);

var _ui_store2 = _interopRequireDefault(_ui_store);

var _header = __webpack_require__(365);

var _header2 = _interopRequireDefault(_header);

var _footer = __webpack_require__(364);

var _footer2 = _interopRequireDefault(_footer);

var _actions = __webpack_require__(220);

var _routes = __webpack_require__(125);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stores = {
    trade: new _trade_store2.default(),
    ui: new _ui_store2.default()
};

var initApp = function initApp() {
    (0, _actions.initActions)(stores.trade);
    stores.trade.init();

    var app = document.getElementById('binary_app');
    if (app) {
        (0, _reactDom.render)(_react2.default.createElement(BinaryApp, null), app);
    }
};

// TODO
// const onUnload = () => {
//     stores.trade.dispose();
//     disposeActions();
// };

var BinaryApp = function BinaryApp() {
    return _react2.default.createElement(
        _reactRouterDom.HashRouter,
        null,
        _react2.default.createElement(
            _connect.MobxProvider,
            { store: stores },
            _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { id: 'trading_header' },
                    _react2.default.createElement(_header2.default, {
                        items: [{ icon: 'trade', text: (0, _localize.localize)('Trade'), link_to: '/' }, { icon: 'portfolio', text: (0, _localize.localize)('Portfolio') }, { icon: 'statement', text: (0, _localize.localize)('Statement'), link_to: 'statement' }, { icon: 'cashier', text: (0, _localize.localize)('Cashier') }]
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'app_contents' },
                    _react2.default.createElement(_routes.BinaryRoutes, null)
                ),
                _react2.default.createElement(
                    'footer',
                    { id: 'trading_footer' },
                    _react2.default.createElement(_footer2.default, {
                        items: [{ icon: 'ic-statement', text: (0, _localize.localize)('Statement'), link_to: 'statement' }, { icon: 'ic-chat-bubble', text: (0, _localize.localize)('Notification') }, { icon: 'ic-lock-open', text: (0, _localize.localize)('Lock') }]
                    })
                )
            )
        )
    );
};

exports.default = initApp;

/***/ }),
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactPerfectScrollbar = __webpack_require__(269);

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _classnames = __webpack_require__(166);

var _classnames2 = _interopRequireDefault(_classnames);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccountSwitcher = function (_React$PureComponent) {
    _inherits(AccountSwitcher, _React$PureComponent);

    function AccountSwitcher(props) {
        _classCallCheck(this, AccountSwitcher);

        var _this = _possibleConstructorReturn(this, (AccountSwitcher.__proto__ || Object.getPrototypeOf(AccountSwitcher)).call(this, props));

        _this.toggleAccountsList = function () {
            _this.setState({
                is_collapsed: !_this.state.is_collapsed
            });
        };

        _this.switchAccount = function (account) {
            _this.setState({
                active_account: account
            });
            if (account.id !== _this.state.active_account.id) {
                if (_this.props.onChange) {
                    _this.props.onChange({ target: { name: 'currency', value: account.account_type } });
                }
            }
        };

        _this.state = {
            is_collapsed: false,
            active_account: _this.props.active_account[0]
        };
        return _this;
    }

    _createClass(AccountSwitcher, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var account_list_collapsed = {
                visibility: '' + (this.state.is_collapsed ? 'visible' : 'hidden')
            };

            var isAccountHidden = function isAccountHidden(account) {
                return account.id === _this2.state.active_account.id;
            };
            var getSwitcherAccountClass = function getSwitcherAccountClass(account) {
                return (0, _classnames2.default)('acc-switcher-account', {
                    'hide': isAccountHidden(account)
                });
            };

            var switcher_active_login_class = (0, _classnames2.default)('acc-switcher-active-login', {
                'collapsed': this.state.is_collapsed
            });
            var switcher_list_class = (0, _classnames2.default)('acc-switcher-list', {
                'collapsed': this.state.is_collapsed
            });

            return _react2.default.createElement(
                'div',
                { className: 'acc-switcher-container' },
                _react2.default.createElement(
                    'div',
                    { className: 'acc-switcher-header', onClick: this.toggleAccountsList },
                    _react2.default.createElement(
                        'div',
                        { className: switcher_active_login_class },
                        _react2.default.createElement(
                            'p',
                            { className: 'acc-switcher-accountid' },
                            this.state.active_account.id
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'acc-switcher-currency' },
                            this.state.active_account.account_type + ' ' + (0, _localize.localize)('Account')
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: switcher_list_class,
                        style: account_list_collapsed
                    },
                    _react2.default.createElement(
                        _reactPerfectScrollbar2.default,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'acc-switcher-items' },
                            this.props.accounts.map(function (account, idx) {
                                return _react2.default.createElement(
                                    _react2.default.Fragment,
                                    { key: idx },
                                    _react2.default.createElement(
                                        'div',
                                        {
                                            className: getSwitcherAccountClass(account),
                                            onClick: _this2.switchAccount.bind(null, account)
                                        },
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'acc-switcher-accountid' },
                                            account.id
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            { className: 'acc-switcher-currency' },
                                            account.account_type + ' ' + (0, _localize.localize)('Account')
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return AccountSwitcher;
}(_react2.default.PureComponent);

// TODO: Remove defaultProps and parse accounts from websockets/localstorage


AccountSwitcher.defaultProps = {
    accounts: [{ id: 'VRTC1234567', account_type: 'Virtual' }, { id: 'CR198765', account_type: 'USD' }, { id: 'CR986754', account_type: 'BTC' }, { id: 'CR985761', account_type: 'ETH' }, { id: 'CR247698', account_type: 'LTC' }, { id: 'CR579857', account_type: 'BCH' }]
};

exports.default = AccountSwitcher;

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Pagination = function Pagination(_ref) {
    var page = _ref.page,
        total = _ref.total,
        page_size = _ref.page_size,
        onChange = _ref.onChange;

    var handleChange = function handleChange(new_page) {
        if (new_page === page) return;
        onChange(new_page, calcPagesCount());
    };

    var calcPagesCount = function calcPagesCount() {
        return Math.ceil(total / page_size);
    };

    var handleNext = function handleNext() {
        if (page < calcPagesCount()) {
            handleChange(page + 1);
        }
    };

    var handlePrev = function handlePrev() {
        if (page > 1) {
            handleChange(page - 1);
        }
    };

    var renderEllipsis = function renderEllipsis(id) {
        return _react2.default.createElement('li', { className: 'pagination-item pagination-ellipsis', key: 'ellipsis-' + id });
    };

    var renderItem = function renderItem(page_num) {
        return _react2.default.createElement(
            'li',
            {
                className: 'pagination-item ' + (page_num === page ? 'pagination-item-active' : ''),
                key: page_num,
                onClick: function onClick() {
                    handleChange(page_num);
                }
            },
            _react2.default.createElement(
                'a',
                null,
                page_num
            )
        );
    };

    var renderItemRange = function renderItemRange(first, last) {
        var items = [];

        for (var page_num = first; page_num <= last; page_num++) {
            items.push(renderItem(page_num));
        }
        return items;
    };

    var renderItems = function renderItems() {
        var pages_count = calcPagesCount();

        if (pages_count <= 6) {
            return renderItemRange(1, pages_count);
        } else if (page <= 4) {
            return [].concat(_toConsumableArray(renderItemRange(1, 5)), [renderEllipsis(2)]);
        } else if (pages_count - page < 3) {
            return [renderItem(1), renderEllipsis(1)].concat(_toConsumableArray(renderItemRange(pages_count - 3, pages_count)));
        }
        // else
        return [renderItem(1), renderEllipsis(1)].concat(_toConsumableArray(renderItemRange(page - 1, page + 1)), [renderEllipsis(2)]);
    };

    return _react2.default.createElement(
        'ul',
        { className: 'pagination' },
        _react2.default.createElement(
            'li',
            {
                className: 'pagination-prev ' + (page === 1 ? 'pagination-disabled' : ''),
                onClick: handlePrev
            },
            _react2.default.createElement(
                'a',
                null,
                '<'
            )
        ),
        renderItems(),
        _react2.default.createElement(
            'li',
            {
                className: 'pagination-next ' + (page === calcPagesCount() ? 'pagination-disabled' : ''),
                onClick: handleNext
            },
            _react2.default.createElement(
                'a',
                null,
                '>'
            )
        )
    );
};

Pagination.defaultProps = {
    page: 1
};

/* TODO:
      1. to implement sorting by column (ASC/DESC)
      2. to implement filtering per column
      3. to make pagination more customisable
*/

var DataTable = function (_React$Component) {
    _inherits(DataTable, _React$Component);

    function DataTable(props) {
        _classCallCheck(this, DataTable);

        var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props));

        var data_source = props.data_source,
            pagination = props.pagination,
            page_size = props.page_size;


        _this.handlePageChange = _this.handlePageChange.bind(_this);
        _this.renderPagination = _this.renderPagination.bind(_this);
        _this.handlePageChange = _this.handlePageChange.bind(_this);
        _this.updateDisplayData = _this.updateDisplayData.bind(_this);

        _this.state = {
            display_data: pagination ? data_source.slice(0, page_size) : data_source,
            page: 1
        };
        return _this;
    }

    _createClass(DataTable, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.updateDisplayData(nextProps.data_source, this.state.page, nextProps.page_size);
        }
    }, {
        key: 'updateDisplayData',
        value: function updateDisplayData(data_source, page, page_size) {
            var start_id = (page - 1) * page_size;
            var end_id = start_id + page_size;

            this.setState({
                page: page,
                display_data: data_source.slice(start_id, end_id)
            });
        }
    }, {
        key: 'handlePageChange',
        value: function handlePageChange(page, pages_count) {
            this.updateDisplayData(this.props.data_source, page, this.props.page_size);

            if (!pages_count) return;

            var _props = this.props,
                pages_close_to_end = _props.pages_close_to_end,
                onCloseToEnd = _props.onCloseToEnd;

            var pagesLeft = pages_count - page;
            if (pagesLeft <= pages_close_to_end) {
                onCloseToEnd();
            }
        }
    }, {
        key: 'renderPagination',
        value: function renderPagination() {
            return _react2.default.createElement(
                'div',
                { className: 'table-pagination' },
                _react2.default.createElement(Pagination, {
                    page: this.state.page,
                    total: this.props.data_source.length,
                    page_size: this.props.page_size,
                    onChange: this.handlePageChange
                })
            );
        }
    }, {
        key: 'renderRow',
        value: function renderRow(transaction, id) {
            var defaultRenderCell = function defaultRenderCell(data, data_index) {
                return _react2.default.createElement(
                    'td',
                    { className: data_index, key: data_index },
                    data
                );
            };

            return _react2.default.createElement(
                'tr',
                { className: 'table-row', key: id },
                this.props.columns.map(function (_ref2) {
                    var data_index = _ref2.data_index,
                        renderCell = _ref2.renderCell;
                    return (renderCell || defaultRenderCell)(transaction[data_index], data_index, transaction);
                })
            );
        }
    }, {
        key: 'renderBodyRows',
        value: function renderBodyRows() {
            var _this2 = this;

            return this.state.display_data.map(function (transaction, id) {
                return _this2.renderRow(transaction, id);
            });
        }
    }, {
        key: 'renderHeaders',
        value: function renderHeaders() {
            return this.props.columns.map(function (col) {
                return _react2.default.createElement(
                    'th',
                    { key: col.data_index },
                    col.title
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var pagination = this.props.pagination;


            return _react2.default.createElement(
                'div',
                { className: 'table-container' },
                _react2.default.createElement(
                    'table',
                    { className: 'table' },
                    _react2.default.createElement(
                        'thead',
                        { className: 'table-thead' },
                        _react2.default.createElement(
                            'tr',
                            { className: 'table-row' },
                            this.renderHeaders()
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        { className: 'table-tbody' },
                        this.renderBodyRows()
                    )
                ),
                pagination && this.renderPagination()
            );
        }
    }]);

    return DataTable;
}(_react2.default.Component);

DataTable.defaultProps = {
    pagination: true,
    page_size: 10,
    pages_close_to_end: 5
};

exports.default = DataTable;

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(166);

var _classnames2 = _interopRequireDefault(_classnames);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _routes = __webpack_require__(125);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToggleDrawer = function (_React$PureComponent) {
    _inherits(ToggleDrawer, _React$PureComponent);

    function ToggleDrawer(props) {
        _classCallCheck(this, ToggleDrawer);

        var _this = _possibleConstructorReturn(this, (ToggleDrawer.__proto__ || Object.getPrototypeOf(ToggleDrawer)).call(this, props));

        _this.setRef = _this.setRef.bind(_this);
        _this.showDrawer = _this.showDrawer.bind(_this);
        _this.closeDrawer = _this.closeDrawer.bind(_this);
        return _this;
    }

    _createClass(ToggleDrawer, [{
        key: 'setRef',
        value: function setRef(node) {
            this.ref = node;
        }
    }, {
        key: 'showDrawer',
        value: function showDrawer() {
            this.ref.show();
        }
    }, {
        key: 'closeDrawer',
        value: function closeDrawer() {
            this.ref.hide();
        }
    }, {
        key: 'render',
        value: function render() {
            var toggle_class = (0, _classnames2.default)('navbar-icons', this.props.icon_class, {
                'menu-toggle': !this.props.icon_class
            });

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: toggle_class, onClick: this.showDrawer },
                    this.props.icon_link ? _react2.default.createElement('img', { src: this.props.icon_link }) : _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/header/menu.svg') })
                ),
                _react2.default.createElement(
                    Drawer,
                    {
                        ref: this.setRef,
                        alignment: this.props.alignment,
                        closeBtn: this.closeDrawer,
                        has_footer: this.props.has_footer
                    },
                    this.props.children
                )
            );
        }
    }]);

    return ToggleDrawer;
}(_react2.default.PureComponent);

var Drawer = function (_React$PureComponent2) {
    _inherits(Drawer, _React$PureComponent2);

    function Drawer(props) {
        _classCallCheck(this, Drawer);

        var _this2 = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this, props));

        _this2.state = {
            is_drawer_visible: false
        };
        _this2.setRef = _this2.setRef.bind(_this2);
        _this2.show = _this2.show.bind(_this2);
        _this2.hide = _this2.hide.bind(_this2);
        _this2.handleClickOutside = _this2.handleClickOutside.bind(_this2);
        return _this2;
    }

    _createClass(Drawer, [{
        key: 'setRef',
        value: function setRef(node) {
            this.ref = node;
        }
    }, {
        key: 'scrollToggle',
        value: function scrollToggle(state) {
            this.is_open = state;
            document.body.classList.toggle('no-scroll', this.is_open);
        }
    }, {
        key: 'show',
        value: function show() {
            this.setState({ is_drawer_visible: true });
            this.scrollToggle(true);
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.setState({ is_drawer_visible: false });
            this.scrollToggle(false);
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside(event) {
            event.stopPropagation();
            if (this.ref && !this.ref.contains(event.target)) {
                this.hide();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var visibility = {
                visibility: '' + (!this.state.is_drawer_visible ? 'hidden' : 'visible')
            };
            var drawer_bg_class = (0, _classnames2.default)('drawer-bg', {
                'show': this.state.is_drawer_visible
            });
            var drawer_class = (0, _classnames2.default)('drawer', {
                'visible': this.state.is_drawer_visible
            }, this.props.alignment);
            return _react2.default.createElement(
                'aside',
                { className: 'drawer-container' },
                _react2.default.createElement(
                    'div',
                    {
                        className: drawer_bg_class,
                        style: visibility,
                        onClick: this.handleClickOutside
                    },
                    _react2.default.createElement(
                        'div',
                        {
                            ref: this.setRef,
                            className: drawer_class,
                            style: visibility
                        },
                        _react2.default.createElement(DrawerHeader, {
                            alignment: this.props.alignment,
                            closeBtn: this.props.closeBtn
                        }),
                        this.props.children,
                        this.props.has_footer ? _react2.default.createElement('div', { className: 'drawer-footer' }) : null
                    )
                )
            );
        }
    }]);

    return Drawer;
}(_react2.default.PureComponent);

var DrawerItems = function (_React$PureComponent3) {
    _inherits(DrawerItems, _React$PureComponent3);

    function DrawerItems(props) {
        _classCallCheck(this, DrawerItems);

        var _this3 = _possibleConstructorReturn(this, (DrawerItems.__proto__ || Object.getPrototypeOf(DrawerItems)).call(this, props));

        _this3.state = {
            is_collapsed: false
        };
        _this3.collapseItems = _this3.collapseItems.bind(_this3);
        return _this3;
    }

    _createClass(DrawerItems, [{
        key: 'collapseItems',
        value: function collapseItems() {
            this.setState({
                is_collapsed: !this.state.is_collapsed
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var list_is_collapsed = {
                visibility: '' + (this.state.is_collapsed ? 'visible' : 'hidden')
            };
            var parent_item_class = (0, _classnames2.default)('parent-item', {
                'show': this.state.is_collapsed
            });
            var drawer_items_class = (0, _classnames2.default)('drawer-items', {
                'show': this.state.is_collapsed
            });
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'drawer-item', onClick: this.collapseItems },
                    _react2.default.createElement(
                        'span',
                        { className: parent_item_class },
                        this.props.text
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: drawer_items_class,
                        style: list_is_collapsed
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'items-group' },
                        this.props.items.map(function (item, idx) {
                            return _react2.default.createElement(
                                'div',
                                { className: 'drawer-item', key: idx },
                                _react2.default.createElement(
                                    _routes.BinaryLink,
                                    { to: item.link_to },
                                    _react2.default.createElement(
                                        'span',
                                        { className: item.icon || undefined },
                                        item.text
                                    )
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return DrawerItems;
}(_react2.default.PureComponent);

var DrawerItem = function (_React$PureComponent4) {
    _inherits(DrawerItem, _React$PureComponent4);

    function DrawerItem() {
        _classCallCheck(this, DrawerItem);

        return _possibleConstructorReturn(this, (DrawerItem.__proto__ || Object.getPrototypeOf(DrawerItem)).apply(this, arguments));
    }

    _createClass(DrawerItem, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'drawer-item' },
                _react2.default.createElement(
                    'a',
                    { href: this.props.href || 'javascript:;' },
                    _react2.default.createElement(
                        'span',
                        { className: this.props.icon || undefined },
                        this.props.text
                    )
                )
            );
        }
    }]);

    return DrawerItem;
}(_react2.default.PureComponent);

var DrawerHeader = function DrawerHeader(_ref) {
    var alignment = _ref.alignment,
        closeBtn = _ref.closeBtn;

    var drawer_header_class = (0, _classnames2.default)('drawer-header', alignment);
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        alignment && alignment === 'right' ? _react2.default.createElement(
            'div',
            { className: drawer_header_class },
            _react2.default.createElement(
                'div',
                { className: 'icons btn-close', onClick: closeBtn },
                _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/common/close.svg'), alt: 'Close' })
            )
        ) : _react2.default.createElement(
            'div',
            { className: drawer_header_class },
            _react2.default.createElement(
                'div',
                { className: 'icons btn-close', onClick: closeBtn },
                _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/common/close.svg'), alt: 'Close' })
            ),
            _react2.default.createElement(
                'div',
                { className: 'icons brand-logo' },
                _react2.default.createElement('img', { src: _url2.default.urlForStatic('images/trading_app/header/binary_logo_dark.svg'), alt: 'Binary.com' })
            )
        )
    );
};

module.exports = {
    Drawer: Drawer,
    DrawerItem: DrawerItem,
    DrawerItems: DrawerItems,
    ToggleDrawer: ToggleDrawer
};

/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LanguageSwitcher = function (_React$PureComponent) {
    _inherits(LanguageSwitcher, _React$PureComponent);

    function LanguageSwitcher(props) {
        _classCallCheck(this, LanguageSwitcher);

        var _this = _possibleConstructorReturn(this, (LanguageSwitcher.__proto__ || Object.getPrototypeOf(LanguageSwitcher)).call(this, props));

        _this.toggleLanguageList = function () {
            _this.setState({
                is_collapsed: !_this.state.is_collapsed
            });
        };

        _this.switchLanguage = function (lang) {
            _this.setState({
                active_language: lang
            });
        };

        _this.state = {
            is_collapsed: false,
            active_language: _this.props.languages[0]
        };
        return _this;
    }

    _createClass(LanguageSwitcher, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var language_list_collapsed = {
                // visibility needed in style props as workaround for briefly flashing hidden elements in css
                display: this.state.is_collapsed ? 'inline-block' : 'none'
            };

            var isLanguageActive = function isLanguageActive(lang) {
                return lang.id === _this2.state.active_language.id;
            };

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'drawer-item', onClick: this.toggleLanguageList },
                    _react2.default.createElement(
                        'span',
                        { className: 'parent-item ' + (this.state.active_language.id || '') },
                        (0, _localize.localize)('Language'),
                        ' : ',
                        this.state.active_language.name
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        className: 'lang-switcher-list',
                        style: language_list_collapsed
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'lang-switcher-list-header', onClick: this.toggleLanguageList },
                        _react2.default.createElement(
                            'span',
                            { className: 'lang-switcher-list-desc' },
                            (0, _localize.localize)('Choose your language')
                        )
                    ),
                    this.props.languages.map(function (language, idx) {
                        return _react2.default.createElement(
                            _react2.default.Fragment,
                            { key: idx },
                            _react2.default.createElement(
                                'div',
                                {
                                    className: 'lang-switcher-language ' + (isLanguageActive(language) ? 'active' : ''),
                                    onClick: _this2.switchLanguage.bind(null, language)
                                },
                                _react2.default.createElement(
                                    'p',
                                    { className: 'lang-switcher-name' },
                                    language.name
                                )
                            )
                        );
                    })
                )
            );
        }
    }]);

    return LanguageSwitcher;
}(_react2.default.PureComponent);

// TODO: Remove defaultProps


LanguageSwitcher.defaultProps = {
    languages: [{ id: 'EN', name: 'English' }, { id: 'DE', name: 'Deutsch' }, { id: 'FR', name: 'Français' }, { id: 'ID', name: 'Indonesia' }, { id: 'IT', name: 'Italiano' }, { id: 'JA', name: '日本語' }, { id: 'PL', name: 'Polish' }, { id: 'PT', name: 'Português' }, { id: 'RU', name: 'Русский' }, { id: 'TH', name: 'Thai' }, { id: 'VI', name: 'Tiếng Việt' }, { id: 'ZH_CN', name: '简体中文' }, { id: 'ZH_TW', name: '繁體中文' }]
};

exports.default = LanguageSwitcher;

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popover = function (_React$Component) {
    _inherits(Popover, _React$Component);

    function Popover(props) {
        _classCallCheck(this, Popover);

        var _this = _possibleConstructorReturn(this, (Popover.__proto__ || Object.getPrototypeOf(Popover)).call(this, props));

        _this.state = {
            is_open: false
        };
        return _this;
    }

    _createClass(Popover, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var popver = _react2.default.createElement(
                'div',
                { className: 'popover ' + (this.state.is_open ? 'open' : '') + ' ' + (this.props.alignment ? this.props.alignment : '') },
                this.props.title && _react2.default.createElement(
                    'div',
                    { className: 'popover-title' },
                    (0, _localize.localize)(this.props.title)
                ),
                this.props.subtitle && _react2.default.createElement(
                    'div',
                    { className: 'popover-subtitle' },
                    (0, _localize.localize)(this.props.subtitle)
                )
            );

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.Children.map(this.props.children, function (child) {
                    return _react2.default.cloneElement(child, {
                        onMouseEnter: function onMouseEnter() {
                            return _this2.setState({ is_open: true });
                        },
                        onMouseLeave: function onMouseLeave() {
                            return _this2.setState({ is_open: false });
                        }
                    }, popver);
                })
            );
        }
    }]);

    return Popover;
}(_react2.default.Component);

exports.default = Popover;

/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(9);

var _moment2 = _interopRequireDefault(_moment);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PortfolioDrawer = function (_React$Component) {
    _inherits(PortfolioDrawer, _React$Component);

    function PortfolioDrawer(props) {
        _classCallCheck(this, PortfolioDrawer);

        var _this = _possibleConstructorReturn(this, (PortfolioDrawer.__proto__ || Object.getPrototypeOf(PortfolioDrawer)).call(this, props));

        _this.handleWindowSizeChange = function () {
            _this.setState({ width: window.innerWidth });
        };

        _this.getIndicative = function (v) {
            var sign = v > 0 ? '+' : '-';
            return {
                value: v,
                display: sign + '$S' + Math.abs(v)
            };
        };

        _this.getRemainingTime = function (epoch) {
            var time_left = parseInt(_moment2.default.unix(epoch) - _this.props.server_time.unix());
            return time_left;
        };

        _this.handleVisibility = _this.handleVisibility.bind(_this);
        _this.state = {
            is_open: true,
            width: window.innerWidth
        };
        return _this;
    }

    _createClass(PortfolioDrawer, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            window.addEventListener('resize', this.handleWindowSizeChange);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('resize', this.handleWindowSizeChange);
        }
    }, {
        key: 'handleVisibility',
        value: function handleVisibility() {
            this.setState({ is_open: !this.state.is_open });
        }

        // TODO: returning correct indicative price & currency


        // TODO: calculate remaining time and render

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var width = this.state.width;

            var is_mobile = width <= 1024;
            var header = is_mobile ? _react2.default.createElement(
                'div',
                {
                    className: 'portfolio-drawer-header',
                    onClick: this.handleVisibility
                },
                _react2.default.createElement('span', { className: 'ic-portfolio' }),
                _react2.default.createElement(
                    'p',
                    null,
                    (0, _localize.localize)('Portfolio')
                ),
                _react2.default.createElement('span', { className: 'ic-close ' + (this.state.is_open ? 'open' : '') })
            ) : _react2.default.createElement(
                'div',
                { className: 'portfolio-drawer-header' },
                _react2.default.createElement('span', { className: 'ic-portfolio' }),
                _react2.default.createElement(
                    'p',
                    null,
                    (0, _localize.localize)('Portfolio Quick Menu')
                ),
                _react2.default.createElement('a', {
                    href: 'javascript:;',
                    className: 'ic-close',
                    onClick: this.props.onClick
                })
            );

            return _react2.default.createElement(
                'div',
                { className: 'portfolio-drawer' },
                header,
                _react2.default.createElement(
                    'div',
                    { className: 'portfolio-list ' + (this.state.is_open ? 'show' : '') },
                    this.props.portfolios.map(function (portfolio, idx) {
                        return _react2.default.createElement(
                            'div',
                            { key: idx, className: 'portfolio' },
                            _react2.default.createElement('span', { className: 'ic-portfolio' }),
                            _react2.default.createElement(
                                'div',
                                { className: 'asset' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'symbol' },
                                    portfolio.symbol
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'indicative-' + (_this2.getIndicative(portfolio.buy_price).value > 0 ? 'positive' : 'negative') },
                                    _this2.getIndicative(portfolio.buy_price).display
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'remaining-time' },
                                    (0, _moment2.default)(_this2.getRemainingTime(portfolio.expiry_time)).format(is_mobile ? 'HH:mm' : 'HH:mm:ss')
                                )
                            )
                        );
                    })
                )
            );
        }
    }]);

    return PortfolioDrawer;
}(_react2.default.Component);

module.exports = PortfolioDrawer;

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = function Tooltip(_ref) {
    var message = _ref.message,
        alignment = _ref.alignment,
        children = _ref.children,
        is_icon = _ref.is_icon;
    return _react2.default.createElement(
        'span',
        { className: 'tooltip', 'data-tooltip': message, 'data-tooltip-pos': alignment },
        is_icon ? _react2.default.createElement('i', { className: 'question-mark' }) : children
    );
};

exports.default = Tooltip;

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(9);

var _moment2 = _interopRequireDefault(_moment);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
    _inherits(Calendar, _React$Component);

    function Calendar(props) {
        _classCallCheck(this, Calendar);

        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

        _this.getDays = _this.getDays.bind(_this);
        _this.getDates = _this.getDates.bind(_this);
        _this.getMonths = _this.getMonths.bind(_this);
        _this.getYears = _this.getYears.bind(_this);
        _this.getDecades = _this.getDecades.bind(_this);

        _this.setToday = _this.setToday.bind(_this);
        _this.setActiveView = _this.setActiveView.bind(_this);

        _this.nextMonth = _this.nextMonth.bind(_this);
        _this.previousMonth = _this.previousMonth.bind(_this);

        _this.nextYear = _this.nextYear.bind(_this);
        _this.previousYear = _this.previousYear.bind(_this);

        _this.nextDecade = _this.nextDecade.bind(_this);
        _this.previousDecade = _this.previousDecade.bind(_this);

        _this.nextCentury = _this.nextCentury.bind(_this);
        _this.previousCentury = _this.previousCentury.bind(_this);

        _this.handleDateSelected = _this.handleDateSelected.bind(_this);
        _this.handleMonthSelected = _this.handleMonthSelected.bind(_this);
        _this.handleYearSelected = _this.handleYearSelected.bind(_this);
        _this.handleDecadeSelected = _this.handleDecadeSelected.bind(_this);

        _this.onChangeInput = _this.onChangeInput.bind(_this);
        _this.resetCalendar = _this.resetCalendar.bind(_this);

        var _props = _extends({}, props),
            startDate = _props.startDate,
            minDate = _props.minDate;

        var current_date = (0, _moment2.default)(startDate || minDate).format(_this.props.dateFormat);

        _this.state = {
            date: current_date, // calendar dates reference
            selected_date: current_date // selected date
        };
        return _this;
    }

    _createClass(Calendar, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ active_view: 'date' });
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var should_update = this.state.active_view !== nextState.active_view || this.state.date !== nextState.date || this.state.selected_date !== nextState.selected_date;
            return should_update || false;
        }
    }, {
        key: 'setToday',
        value: function setToday() {
            var now = (0, _moment2.default)().format(this.props.dateFormat);
            this.setState({
                date: now,
                selected_date: now,
                active_view: 'date'
            });
            this.props.handleDateChange(now, true);
        }
    }, {
        key: 'updateDate',
        value: function updateDate(value, unit, is_add) {
            this.setState({ date: (0, _moment2.default)(this.state.date)[is_add ? 'add' : 'subtract'](value, unit).format(this.props.dateFormat) });
        }
    }, {
        key: 'nextMonth',
        value: function nextMonth() {
            this.updateDate(1, 'months', true);
        }
    }, {
        key: 'previousMonth',
        value: function previousMonth() {
            this.updateDate(1, 'months', false);
        }
    }, {
        key: 'nextYear',
        value: function nextYear() {
            this.updateDate(1, 'years', true);
        }
    }, {
        key: 'previousYear',
        value: function previousYear() {
            this.updateDate(1, 'years', false);
        }
    }, {
        key: 'nextDecade',
        value: function nextDecade() {
            this.updateDate(10, 'years', true);
        }
    }, {
        key: 'previousDecade',
        value: function previousDecade() {
            this.updateDate(10, 'years', false);
        }
    }, {
        key: 'nextCentury',
        value: function nextCentury() {
            this.updateDate(100, 'years', true);
        }
    }, {
        key: 'previousCentury',
        value: function previousCentury() {
            this.updateDate(100, 'years', false);
        }
    }, {
        key: 'setActiveView',
        value: function setActiveView(active_view) {
            this.setState({ active_view: active_view });
        }
    }, {
        key: 'handleDateSelected',
        value: function handleDateSelected(e) {
            var current_date = (0, _moment2.default)(this.state.date);
            var date = (0, _moment2.default)(e.target.dataset.date);
            var min_date = (0, _moment2.default)(this.props.minDate).format(this.props.dateFormat);
            var max_date = (0, _moment2.default)(this.props.maxDate).format(this.props.dateFormat);

            var is_before = date.isBefore(min_date);
            var is_today = date.isSame(min_date);
            var is_after = date.isAfter(max_date);
            var is_prev_month = date.month() < current_date.month();
            var is_next_month = date.month() > current_date.month();

            if (is_prev_month && !is_before) {
                this.previousMonth();
            }
            if (is_next_month) {
                this.nextMonth();
            }

            if (!is_before && !is_after || is_today) {
                var formatted_date = date.format(this.props.dateFormat);
                this.setState({
                    date: formatted_date,
                    selected_date: formatted_date
                });
                this.props.handleDateChange(formatted_date);
            }
        }
    }, {
        key: 'updateSelected',
        value: function updateSelected(e, type) {
            var active_view = {
                month: 'date',
                year: 'month',
                decade: 'year'
            };
            var date = (0, _moment2.default)(this.state.date)[type === 'decade' ? 'year' : type](e.target.dataset[type].split('-')[0]).format(this.props.dateFormat);
            this.setState({
                date: date,
                selected_date: date,
                active_view: active_view[type]
            });
            this.props.handleDateChange(date, true);
        }
    }, {
        key: 'handleMonthSelected',
        value: function handleMonthSelected(e) {
            this.updateSelected(e, 'month');
        }
    }, {
        key: 'handleYearSelected',
        value: function handleYearSelected(e) {
            this.updateSelected(e, 'year');
        }
    }, {
        key: 'handleDecadeSelected',
        value: function handleDecadeSelected(e) {
            this.updateSelected(e, 'decade');
        }
    }, {
        key: 'onChangeInput',
        value: function onChangeInput(e) {
            var value = e.target.value;

            if (this.props.mode === 'duration' && value) {
                value = (0, _moment2.default)().add(value || 1, 'days');
            }

            this.setState({ selected_date: value }); // update calendar input

            if ((0, _moment2.default)(value, 'YYYY-MM-DD', true).isValid() || !value) {
                this.props.handleDateChange(value, true);

                if (!value) {
                    var _props2 = _extends({}, this.props),
                        startDate = _props2.startDate,
                        minDate = _props2.minDate;

                    var currentDate = (0, _moment2.default)(startDate || minDate).format(this.props.dateFormat);
                    this.setState({ date: currentDate });
                } else {
                    this.setState({ date: (0, _moment2.default)(value).format(this.props.dateFormat) }); // update calendar dates
                }
            }
        }
    }, {
        key: 'resetCalendar',
        value: function resetCalendar() {
            var date = (0, _moment2.default)(this.props.minDate).format(this.props.dateFormat);
            this.setState({
                date: date,
                selected_date: ''
            });
        }
    }, {
        key: 'getDays',
        value: function getDays() {
            var _this2 = this;

            var dates = [];
            var days = [];
            var num_of_days = (0, _moment2.default)(this.state.date).daysInMonth() + 1;
            var start_of_month = (0, _moment2.default)(this.state.date).startOf('month').format(this.props.dateFormat);
            var end_of_month = (0, _moment2.default)(this.state.date).endOf('month').format(this.props.dateFormat);
            var first_day = (0, _moment2.default)(start_of_month).day();
            var last_day = (0, _moment2.default)(end_of_month).day();

            var pad = function pad(value) {
                return ('0' + value).substr(-2);
            }; // pad zero

            for (var i = first_day; i > 0; i--) {
                dates.push((0, _moment2.default)(start_of_month).subtract(i, 'day').format(this.props.dateFormat));
            }
            for (var idx = 1; idx < num_of_days; idx += 1) {
                dates.push((0, _moment2.default)(this.state.date).format(this.props.dateFormat.replace('DD', pad(idx))));
            }
            for (var _i = 1; _i <= 6 - last_day; _i++) {
                dates.push((0, _moment2.default)(end_of_month).add(_i, 'day').format(this.props.dateFormat));
            }

            dates.forEach(function (date) {
                var is_disabled = (0, _moment2.default)(date).isBefore((0, _moment2.default)(start_of_month)) || (0, _moment2.default)(date).isAfter((0, _moment2.default)(end_of_month)) || (0, _moment2.default)(date).isBefore((0, _moment2.default)(_this2.props.minDate).subtract(1, 'day')) || (0, _moment2.default)(date).isAfter((0, _moment2.default)(_this2.props.maxDate));
                var is_active = (0, _moment2.default)(date).isSame((0, _moment2.default)(_this2.state.date)) && _this2.state.selected_date;
                var is_today = (0, _moment2.default)(date).isSame((0, _moment2.default)().utc(), 'day');

                days.push(_react2.default.createElement(
                    'span',
                    {
                        key: date,
                        className: 'calendar-date' + (is_active ? ' active' : '') + (is_today ? ' today' : '') + (is_disabled ? ' disabled' : ''),
                        onClick: _this2.handleDateSelected,
                        'data-date': date
                    },
                    (0, _moment2.default)(date).date()
                ));
            });

            return days;
        }
    }, {
        key: 'getDates',
        value: function getDates() {
            var days = this.getDays().map(function (day) {
                return day;
            });
            var week_headers = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

            return _react2.default.createElement(
                'div',
                { className: 'calendar-date-panel' },
                week_headers.map(function (item, idx) {
                    return _react2.default.createElement(
                        'span',
                        { key: idx, className: 'calendar-date-header' },
                        (0, _localize.localize)(item)
                    );
                }),
                days
            );
        }
    }, {
        key: 'getMonths',
        value: function getMonths() {
            var _this3 = this;

            var is_active = (0, _moment2.default)(this.state.selected_date).month();
            var month_headers = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return _react2.default.createElement(
                'div',
                { className: 'calendar-month-panel' },
                month_headers.map(function (item, idx) {
                    return _react2.default.createElement(
                        'span',
                        {
                            key: idx,
                            className: 'calendar-month' + (idx === is_active ? ' active' : ''),
                            onClick: _this3.handleMonthSelected,
                            'data-month': idx
                        },
                        (0, _localize.localize)(item)
                    );
                })
            );
        }
    }, {
        key: 'getYears',
        value: function getYears() {
            var _this4 = this;

            var is_active = (0, _moment2.default)(this.state.selected_date).year();
            var current_year = (0, _moment2.default)(this.state.date).year();
            var years = [];
            for (var year = current_year - 1; year < current_year + 11; year++) {
                years.push(year);
            }
            return _react2.default.createElement(
                'div',
                { className: 'calendar-year-panel' },
                years.map(function (year, idx) {
                    return _react2.default.createElement(
                        'span',
                        {
                            key: idx,
                            className: 'calendar-year' + (idx === 0 || idx === 11 ? ' disabled' : '') + (year === is_active ? ' active' : ''),
                            onClick: _this4.handleYearSelected,
                            'data-year': year
                        },
                        year
                    );
                })
            );
        }
    }, {
        key: 'getDecades',
        value: function getDecades() {
            var _this5 = this;

            var is_active = (0, _moment2.default)(this.state.selected_date).year();
            var current_year = (0, _moment2.default)(this.state.date).year();
            var decades = [];
            var min_year = current_year - 10;

            for (var i = 0; i < 12; i++) {
                var max_year = min_year + 9;
                var range = min_year + '-' + max_year;
                decades.push(range);
                min_year = max_year + 1;
            }

            return _react2.default.createElement(
                'div',
                { className: 'calendar-decade-panel' },
                decades.map(function (range, idx) {
                    return _react2.default.createElement(
                        'span',
                        {
                            key: idx,
                            className: 'calendar-decade' + (idx === 0 || idx === 11 ? ' disabled' : '') + (range.split('-')[0] === is_active ? 'active' : ''),
                            onClick: _this5.handleDecadeSelected,
                            'data-decade': range
                        },
                        range
                    );
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var view = this.state.active_view;

            var is_date_view = view === 'date';
            var is_month_view = view === 'month';
            var is_year_view = view === 'year';
            var is_decade_view = view === 'decade';

            var BtnPrevMonth = is_date_view && _react2.default.createElement('span', { type: 'button', className: 'calendar-next-month-btn', onClick: this.nextMonth });
            var BtnNextMonth = is_date_view && _react2.default.createElement('span', { type: 'button', className: 'calendar-prev-month-btn', onClick: this.previousMonth });

            var BtnPrevYear = _react2.default.createElement('span', {
                type: 'button',
                className: 'calendar-prev-year-btn',
                onClick: function onClick() {
                    return (is_date_view || is_month_view) && _this6.previousYear() || is_year_view && _this6.previousDecade() || is_decade_view && _this6.previousCentury();
                }
            });

            var BtnNextYear = _react2.default.createElement('span', {
                type: 'button',
                className: 'calendar-next-year-btn',
                onClick: function onClick() {
                    return (is_date_view || is_month_view) && _this6.nextYear() || is_year_view && _this6.nextDecade() || is_decade_view && _this6.nextCentury();
                }
            });

            var SelectMonth = is_date_view && _react2.default.createElement(
                'span',
                { type: 'button', className: 'calendar-select-month-btn', onClick: function onClick() {
                        return _this6.setActiveView('month');
                    } },
                (0, _moment2.default)(this.state.date).format('MMM')
            );

            var SelectYear = _react2.default.createElement(
                'span',
                {
                    type: 'button',
                    className: 'calendar-select-year-btn',
                    onClick: function onClick() {
                        return is_date_view || is_month_view ? _this6.setActiveView('year') : _this6.setActiveView('decade');
                    }
                },
                (0, _moment2.default)(this.state.date).year(),
                is_year_view && '-' + (0, _moment2.default)(this.state.date).add(9, 'years').year(),
                is_decade_view && '-' + (0, _moment2.default)(this.state.date).add(99, 'years').year()
            );

            var PanelCalendar = is_date_view && this.getDates() || is_month_view && this.getMonths() || is_year_view && this.getYears() || is_decade_view && this.getDecades();

            var value = this.props.mode === 'duration' ? getDayDifference(this.state.selected_date) : this.state.selected_date;

            return _react2.default.createElement(
                'div',
                { className: 'calendar' },
                _react2.default.createElement('input', {
                    type: 'text',
                    placeholder: this.props.mode === 'duration' ? (0, _localize.localize)('Select a duration') : (0, _localize.localize)('Select date'),
                    value: value,
                    onChange: this.onChangeInput,
                    className: 'calendar-input'
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'calendar-header' },
                    BtnPrevYear,
                    BtnPrevMonth,
                    _react2.default.createElement(
                        'div',
                        { className: 'calendar-select' },
                        SelectMonth,
                        SelectYear
                    ),
                    BtnNextMonth,
                    BtnNextYear
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'calendar-panel' },
                    PanelCalendar
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'calendar-footer' },
                    this.props.footer && _react2.default.createElement(
                        'span',
                        { className: 'calendar-footer-extra' },
                        this.props.footer
                    ),
                    this.props.showTodayBtn && _react2.default.createElement(
                        'span',
                        { className: 'calendar-footer-btn' },
                        _react2.default.createElement(
                            'a',
                            { role: 'button', onClick: this.setToday },
                            (0, _localize.localize)('Today')
                        )
                    )
                )
            );
        }
    }]);

    return Calendar;
}(_react2.default.Component);

Calendar.defaultProps = {
    dateFormat: 'YYYY-MM-DD',
    minDate: (0, _moment2.default)().utc().subtract(120, 'y').format('YYYY-MM-DD'), // by default, minDate is set to 120 years before today
    maxDate: (0, _moment2.default)().utc().add(120, 'y').format('YYYY-MM-DD') // by default, maxDate is set to 120 years after today
};

var getDayDifference = function getDayDifference(date) {
    var diff = (0, _moment2.default)(date).diff((0, _moment2.default)().utc(), 'days');
    return !date || diff < 0 ? '' : diff + 1;
};

var DatePicker = function (_React$PureComponent) {
    _inherits(DatePicker, _React$PureComponent);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        var _this7 = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        _this7.clearDateInput = function () {
            _this7.setState({ selected_date: '' });
            _this7.calendar.resetCalendar();
        };

        _this7.getPickerValue = function () {
            return _this7.props.mode === 'duration' ? getDayDifference(_this7.state.selected_date) : _this7.state.selected_date;
        };

        _this7.handleClickOutside = _this7.handleClickOutside.bind(_this7);
        _this7.handleVisibility = _this7.handleVisibility.bind(_this7);
        _this7.handleDateChange = _this7.handleDateChange.bind(_this7);
        _this7.handleMouseEnter = _this7.handleMouseEnter.bind(_this7);
        _this7.handleMouseLeave = _this7.handleMouseLeave.bind(_this7);

        _this7.state = {
            selected_date: (0, _moment2.default)(_this7.props.minDate).format(_this7.props.dateFormat),
            is_calendar_visible: false,
            is_close_btn_visible: false
        };
        return _this7;
    }

    _createClass(DatePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.onChange({ target: { name: this.props.name, value: this.getPickerValue() } });
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.props.onChange({ target: { name: this.props.name, value: this.getPickerValue() } });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside(e) {
            if (!this.mainNode.contains(e.target) && this.state.is_calendar_visible) {
                this.setState({ is_calendar_visible: false });
            }
        }
    }, {
        key: 'handleVisibility',
        value: function handleVisibility() {
            this.setState({
                is_calendar_visible: !this.state.is_calendar_visible
            });
        }
    }, {
        key: 'handleMouseEnter',
        value: function handleMouseEnter() {
            if (this.getPickerValue()) {
                this.setState({ is_close_btn_visible: true });
            }
        }
    }, {
        key: 'handleMouseLeave',
        value: function handleMouseLeave() {
            this.setState({ is_close_btn_visible: false });
        }
    }, {
        key: 'handleDateChange',
        value: function handleDateChange(selected_date, is_calendar_visible) {
            var value = selected_date;
            if (!(0, _moment2.default)(value).isValid) {
                value = '';
            }

            this.setState({
                selected_date: value,
                is_calendar_visible: is_calendar_visible
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this8 = this;

            var value = this.getPickerValue();
            if (this.props.is_nativepicker) {
                return _react2.default.createElement(
                    'div',
                    { ref: function ref(node) {
                            _this8.mainNode = node;
                        }, className: 'datepicker-container' },
                    _react2.default.createElement('input', {
                        id: this.props.id,
                        name: this.props.name,
                        type: 'date',
                        value: value,
                        onChange: function onChange(e) {
                            _this8.handleDateChange(e.target.value);
                        }
                    })
                );
            }
            return _react2.default.createElement(
                'div',
                { ref: function ref(node) {
                        _this8.mainNode = node;
                    }, className: 'datepicker-container' },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'datepicker-display-wrapper',
                        onMouseEnter: this.handleMouseEnter,
                        onMouseLeave: this.handleMouseLeave
                    },
                    _react2.default.createElement('input', {
                        id: this.props.id,
                        name: this.props.name,
                        className: 'datepicker-display',
                        value: value,
                        readOnly: true,
                        placeholder: this.props.mode === 'duration' ? (0, _localize.localize)('Select a duration') : (0, _localize.localize)('Select date'),
                        onClick: this.handleVisibility
                    }),
                    _react2.default.createElement('span', {
                        className: 'picker-calendar-icon ' + (this.state.is_close_btn_visible ? '' : 'show'),
                        onClick: this.handleVisibility
                    }),
                    _react2.default.createElement('span', {
                        className: 'close-circle-icon ' + (this.state.is_close_btn_visible ? 'show' : ''),
                        onClick: this.clearDateInput
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'datepicker-calendar ' + (this.state.is_calendar_visible ? 'show' : '') },
                    _react2.default.createElement(Calendar, _extends({
                        ref: function ref(node) {
                            _this8.calendar = node;
                        },
                        handleDateChange: this.handleDateChange
                    }, this.props))
                )
            );
        }
    }]);

    return DatePicker;
}(_react2.default.PureComponent);

DatePicker.defaultProps = {
    dateFormat: 'YYYY-MM-DD',
    mode: 'date'
};

exports.default = DatePicker;

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _popover = __webpack_require__(360);

var _popover2 = _interopRequireDefault(_popover);

var _connect = __webpack_require__(43);

var _routes = __webpack_require__(125);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TogglePortfolioDrawer = function TogglePortfolioDrawer(_ref) {
    var props = _objectWithoutProperties(_ref, []);

    return _react2.default.createElement(
        _popover2.default,
        {
            subtitle: 'Toggle Portfolio'
        },
        _react2.default.createElement('a', {
            href: 'javascript:;',
            className: '' + (props.is_portfolio_drawer_on ? 'ic-portfolio-active' : 'ic-portfolio'),
            onClick: props.togglePortfolioDrawer
        })
    );
};

var fullscreen_map = {
    event: ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'],
    element: ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'],
    fnc_enter: ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'],
    fnc_exit: ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen']
};

var ToggleFullScreen = function (_React$Component) {
    _inherits(ToggleFullScreen, _React$Component);

    function ToggleFullScreen(props) {
        _classCallCheck(this, ToggleFullScreen);

        var _this = _possibleConstructorReturn(this, (ToggleFullScreen.__proto__ || Object.getPrototypeOf(ToggleFullScreen)).call(this, props));

        _this.onFullScreen = function () {
            var is_full_screen = fullscreen_map.element.some(function (el) {
                return document[el];
            });
            _this.setState({ is_full_screen: is_full_screen });
        };

        _this.toggleFullScreen = _this.toggleFullScreen.bind(_this);
        _this.state = {
            is_full_screen: false
        };
        return _this;
    }

    _createClass(ToggleFullScreen, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            fullscreen_map.event.forEach(function (event) {
                document.addEventListener(event, _this2.onFullScreen, false);
            });
        }
    }, {
        key: 'toggleFullScreen',
        value: function toggleFullScreen(e) {
            e.stopPropagation();

            var to_exit = this.state.is_full_screen;
            var el = to_exit ? document : document.documentElement;
            var fncToCall = fullscreen_map[to_exit ? 'fnc_exit' : 'fnc_enter'].find(function (fnc) {
                return el[fnc];
            });

            if (fncToCall) {
                el[fncToCall]();
            } else {
                this.setState({ is_full_screen: false }); // fullscreen API is not enabled
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _popover2.default,
                {
                    subtitle: 'Toggle Fullscreen',
                    alignment: 'top-right'
                },
                _react2.default.createElement('a', {
                    href: 'javascript:;',
                    className: 'ic-fullscreen',
                    onClick: this.toggleFullScreen
                })
            );
        }
    }]);

    return ToggleFullScreen;
}(_react2.default.Component);

var TradingFooter = function (_React$Component2) {
    _inherits(TradingFooter, _React$Component2);

    function TradingFooter() {
        _classCallCheck(this, TradingFooter);

        return _possibleConstructorReturn(this, (TradingFooter.__proto__ || Object.getPrototypeOf(TradingFooter)).apply(this, arguments));
    }

    _createClass(TradingFooter, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.props.items.length && _react2.default.createElement(
                    'div',
                    { className: 'footer-links' },
                    _react2.default.createElement(TogglePortfolioDrawer, this.props),
                    this.props.items.map(function (item, idx) {
                        return _react2.default.createElement(
                            _popover2.default,
                            {
                                key: idx,
                                subtitle: item.text
                            },
                            _react2.default.createElement(
                                _routes.BinaryLink,
                                { key: idx, to: item.link_to, className: item.icon },
                                _react2.default.createElement('span', { title: item.text })
                            )
                        );
                    }),
                    _react2.default.createElement(ToggleFullScreen, null)
                )
            );
        }
    }]);

    return TradingFooter;
}(_react2.default.Component);

exports.default = (0, _connect.connect)(function (_ref2) {
    var ui = _ref2.ui;
    return {
        is_portfolio_drawer_on: ui.is_portfolio_drawer_on,
        togglePortfolioDrawer: ui.togglePortfolioDrawer
    };
})(TradingFooter);

/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactPerfectScrollbar = __webpack_require__(269);

var _reactPerfectScrollbar2 = _interopRequireDefault(_reactPerfectScrollbar);

var _drawer = __webpack_require__(358);

var _language_switcher = __webpack_require__(359);

var _language_switcher2 = _interopRequireDefault(_language_switcher);

var _account_switcher = __webpack_require__(356);

var _account_switcher2 = _interopRequireDefault(_account_switcher);

var _button = __webpack_require__(218);

var _button2 = _interopRequireDefault(_button);

var _localize = __webpack_require__(2);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _routes = __webpack_require__(125);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuDrawer = function MenuDrawer() {
    return _react2.default.createElement(
        'div',
        { className: 'drawer-items-container' },
        _react2.default.createElement(
            _reactPerfectScrollbar2.default,
            null,
            _react2.default.createElement(
                'div',
                { className: 'list-items-container' },
                _react2.default.createElement(_drawer.DrawerItems, {
                    text: (0, _localize.localize)('Account Settings'),
                    items: [{ text: (0, _localize.localize)('Personal Detail') }, { text: (0, _localize.localize)('Account Authentication') }, { text: (0, _localize.localize)('Financial Assessment') }, { text: (0, _localize.localize)('Professional Trader') }]
                }),
                _react2.default.createElement(_drawer.DrawerItems, {
                    text: (0, _localize.localize)('Security Settings'),
                    items: [{ text: (0, _localize.localize)('Self Exclusion') }, { text: (0, _localize.localize)('Trading Limits') }, { text: (0, _localize.localize)('Authorised Applications') }, { text: (0, _localize.localize)('API Token') }]
                }),
                _react2.default.createElement(_drawer.DrawerItems, {
                    text: (0, _localize.localize)('Trading History'),
                    items: [{ text: (0, _localize.localize)('Portfolio') }, { text: (0, _localize.localize)('Profit Table') }, { text: (0, _localize.localize)('Statement'), link_to: 'statement' }]
                }),
                _react2.default.createElement(_drawer.DrawerItem, { text: (0, _localize.localize)('Cashier') }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(_drawer.DrawerItem, { text: (0, _localize.localize)('Manage Password') }),
                _react2.default.createElement(_drawer.DrawerItem, { text: (0, _localize.localize)('Useful Resources') }),
                _react2.default.createElement(_drawer.DrawerItem, { text: (0, _localize.localize)('Login History') }),
                _react2.default.createElement('hr', null),
                _react2.default.createElement(_language_switcher2.default, null)
            )
        )
    );
};

var TradingHeader = function (_React$Component) {
    _inherits(TradingHeader, _React$Component);

    function TradingHeader() {
        _classCallCheck(this, TradingHeader);

        return _possibleConstructorReturn(this, (TradingHeader.__proto__ || Object.getPrototypeOf(TradingHeader)).apply(this, arguments));
    }

    _createClass(TradingHeader, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'header',
                    { id: this.props.id, className: 'shadow' },
                    _react2.default.createElement(
                        'div',
                        { className: 'menu-items' },
                        _react2.default.createElement(
                            'div',
                            { className: 'menu-left' },
                            _react2.default.createElement(
                                _drawer.ToggleDrawer,
                                { alignment: 'left', has_footer: true },
                                _react2.default.createElement(_account_switcher2.default, {
                                    active_account: [// TODO: remove dummy values
                                    { id: 'VRTC1234567', account_type: 'Virtual' }]
                                }),
                                _react2.default.createElement(MenuDrawer, null)
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'navbar-icons binary-logo' },
                                _react2.default.createElement('img', { className: 'logo-img', src: _url2.default.urlForStatic('images/trading_app/header/symbol.svg'), alt: 'Binary.com' })
                            ),
                            !!this.props.items.length && _react2.default.createElement(
                                'div',
                                { className: 'menu-links' },
                                this.props.items.map(function (item, idx) {
                                    return _react2.default.createElement(
                                        _routes.BinaryLink,
                                        { key: idx, to: item.link_to },
                                        _react2.default.createElement(
                                            'span',
                                            { className: item.icon, title: item.text },
                                            item.text
                                        )
                                    );
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'menu-right' },
                            _react2.default.createElement(AccountBalance, {
                                active_loginid: this.props.active_loginid,
                                client_accounts: this.props.client_accounts
                            })
                        ),
                        _react2.default.createElement(
                            _drawer.ToggleDrawer,
                            {
                                icon_class: 'notify-toggle',
                                alignment: 'right',
                                icon_link: _url2.default.urlForStatic('images/trading_app/header/icons/ic_notification_light.svg')
                            },
                            _react2.default.createElement(_drawer.DrawerItem, { text: 'Alert 1' }),
                            _react2.default.createElement(_drawer.DrawerItem, { text: 'Alert 2' }),
                            _react2.default.createElement(_drawer.DrawerItem, { text: 'Alert 3' })
                        )
                    )
                )
            );
        }
    }]);

    return TradingHeader;
}(_react2.default.Component);

var AccountBalance = function AccountBalance(_ref) {
    var active_loginid = _ref.active_loginid,
        client_accounts = _ref.client_accounts,
        onClick = _ref.onClick;

    // TODO: Use Client.get()
    var account = client_accounts[Object.keys(client_accounts)[0]];
    var button_text = account.is_virtual ? 'Upgrade' : 'Deposit';
    var balance = account.balance;
    var currency = account.currency;
    currency = currency ? currency.toLowerCase() : null;

    return _react2.default.createElement(
        'div',
        { className: 'acc-balance-container' },
        _react2.default.createElement(
            'div',
            { className: 'acc-balance' },
            _react2.default.createElement(
                'p',
                { className: 'acc-balance-accountid' },
                active_loginid || null
            ),
            _react2.default.createElement(
                'p',
                { className: 'acc-balance-amount' },
                _react2.default.createElement(
                    'i',
                    null,
                    _react2.default.createElement('span', { className: 'symbols ' + currency })
                ),
                balance || null
            )
        ),
        _react2.default.createElement(_button2.default, {
            id: 'acc-balance-btn',
            className: 'primary orange',
            has_effect: true,
            text: '' + (0, _localize.localize)(button_text),
            onClick: onClick
        })
    );
};

// TODO: Remove defaultProps dummy values and use Client.get()
TradingHeader.defaultProps = {
    active_loginid: 'VRTC1234567',
    client_accounts: { 'VRTC1234567': { 'currency': 'AUD', 'is_disabled': 0, 'is_virtual': 1, 'balance': '10000.00' } }
};

exports.default = TradingHeader;

/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(144);

__webpack_require__(145);

var _jquery = __webpack_require__(65);

var _jquery2 = _interopRequireDefault(_jquery);

var _app = __webpack_require__(282);

var _app2 = _interopRequireDefault(_app);

var _check_new_release = __webpack_require__(87);

var _client = __webpack_require__(4);

var _client2 = _interopRequireDefault(_client);

var _network_monitor = __webpack_require__(143);

var _network_monitor2 = _interopRequireDefault(_network_monitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: remove all dependencies to app folder, jquery, ...

window.$ = window.jQuery = _jquery2.default;
window.check_new_release = _check_new_release.checkNewRelease; // used by GTM to update page after a new release


var init = function init() {
    _client2.default.init();
    _network_monitor2.default.init();
    (0, _app2.default)();
};

document.addEventListener('DOMContentLoaded', init);
$(window).on('pageshow', function (e) {
    // Safari doesn't fire load event when using back button
    if (e.originalEvent.persisted) {
        init();
    }
});

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(9);

var _moment2 = _interopRequireDefault(_moment);

var _client = __webpack_require__(4);

var _client2 = _interopRequireDefault(_client);

var _socket = __webpack_require__(5);

var _socket2 = _interopRequireDefault(_socket);

var _clock = __webpack_require__(20);

var _country_base = __webpack_require__(10);

var _currency = __webpack_require__(7);

var _localize = __webpack_require__(2);

var _string_util = __webpack_require__(18);

var _data_table = __webpack_require__(357);

var _data_table2 = _interopRequireDefault(_data_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* TODO:
      1. to separate logic from UI
      2. to move socket calls to DAO
      3. to handle errors
      4. display loading, render table only after data is available
*/
var getStatementData = function getStatementData(statement, currency, is_jp_client) {
    var date_obj = new Date(statement.transaction_time * 1000);
    var moment_obj = _moment2.default.utc(date_obj);
    var date_str = moment_obj.format('YYYY-MM-DD');
    var time_str = moment_obj.format('HH:mm:ss') + ' GMT';
    var payout = parseFloat(statement.payout);
    var amount = parseFloat(statement.amount);
    var balance = parseFloat(statement.balance_after);

    return {
        action: (0, _localize.localize)((0, _string_util.toTitleCase)(statement.action_type)),
        date: is_jp_client ? (0, _clock.toJapanTimeIfNeeded)(+statement.transaction_time) : date_str + '\n' + time_str,
        ref: statement.transaction_id,
        payout: isNaN(payout) ? '-' : (0, _currency.formatMoney)(currency, payout, !is_jp_client),
        amount: isNaN(amount) ? '-' : (0, _currency.formatMoney)(currency, amount, !is_jp_client),
        balance: isNaN(balance) ? '-' : (0, _currency.formatMoney)(currency, balance, !is_jp_client),
        desc: (0, _localize.localize)(statement.longcode.replace(/\n/g, '<br />')),
        id: statement.contract_id,
        app_id: statement.app_id
    };
};

var Statement = function (_React$PureComponent) {
    _inherits(Statement, _React$PureComponent);

    function Statement(props) {
        _classCallCheck(this, Statement);

        var _this = _possibleConstructorReturn(this, (Statement.__proto__ || Object.getPrototypeOf(Statement)).call(this, props));

        _this.getNextBatch = _this.getNextBatch.bind(_this);

        var columns = [{
            title: (0, _localize.localize)('Date'),
            data_index: 'date'
        }, {
            title: (0, _localize.localize)('Ref.'),
            data_index: 'ref'
        }, {
            title: (0, _localize.localize)('Potential Payout'),
            data_index: 'payout'
        }, {
            title: (0, _localize.localize)('Action'),
            data_index: 'action'
        }, {
            title: (0, _localize.localize)('Description'),
            data_index: 'desc'
        }, {
            title: (0, _localize.localize)('Credit/Debit'),
            data_index: 'amount',
            renderCell: function renderCell(data, data_index) {
                var parseStrNum = function parseStrNum(str) {
                    return parseFloat(str.replace(',', '.'));
                };
                return _react2.default.createElement(
                    'td',
                    { className: data_index + ' ' + (parseStrNum(data) >= 0 ? 'profit' : 'loss'), key: data_index },
                    data
                );
            }
        }, {
            title: (0, _localize.localize)('Balance'),
            data_index: 'balance'
        }];

        _this.state = {
            columns: columns,
            data_source: [],
            is_loaded_all: false
        };
        return _this;
    }

    _createClass(Statement, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            // BinarySocket.send({ oauth_apps: 1 }).then((response) => {
            //     console.log('oauth response', response);
            // });
            this.getNextBatch();
        }
    }, {
        key: 'getNextBatch',
        value: function getNextBatch() {
            var _this2 = this;

            if (this.state.is_loaded_all) return;

            var BATCH_SIZE = 200;
            var req = {
                statement: 1,
                description: 1,
                limit: BATCH_SIZE,
                offset: this.state.data_source.length
            };

            var currency = _client2.default.get('currency');
            var is_jp_client = (0, _country_base.jpClient)();

            _socket2.default.send(req).then(function (response) {
                var formatted_transactions = response.statement.transactions.map(function (transaction) {
                    return getStatementData(transaction, currency, is_jp_client);
                });

                _this2.setState({
                    data_source: [].concat(_toConsumableArray(_this2.state.data_source), _toConsumableArray(formatted_transactions)),
                    is_loaded_all: formatted_transactions.length < BATCH_SIZE
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_data_table2.default, _extends({}, this.props, {
                data_source: this.state.data_source,
                columns: this.state.columns,
                onCloseToEnd: this.getNextBatch
            }));
        }
    }]);

    return Statement;
}(_react2.default.PureComponent);

exports.default = Statement;

/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onChangeContractType = exports.onChangeContractTypeList = undefined;

var _contract_type = __webpack_require__(110);

var _contract_type2 = _interopRequireDefault(_contract_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChangeContractTypeList = exports.onChangeContractTypeList = function onChangeContractTypeList(_ref) {
    var contract_type = _ref.contract_type,
        contract_types_list = _ref.contract_types_list;
    return _contract_type2.default.getContractType(contract_types_list, contract_type);
};

var onChangeContractType = exports.onChangeContractType = function onChangeContractType(_ref2) {
    var contract_type = _ref2.contract_type,
        contract_expiry_type = _ref2.contract_expiry_type,
        duration_unit = _ref2.duration_unit;
    return _contract_type2.default.getContractValues(contract_type, contract_expiry_type, duration_unit);
};

/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrenciesAsync = undefined;

var _dao = __webpack_require__(165);

var _dao2 = _interopRequireDefault(_dao);

var _currency = __webpack_require__(7);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getCurrenciesAsync = /*#__PURE__*/exports.getCurrenciesAsync = regeneratorRuntime.mark(function getCurrenciesAsync(_ref) {
    var _currencies_list;

    var currency = _ref.currency;
    var r, fiat, crypto, fields;
    return regeneratorRuntime.wrap(function getCurrenciesAsync$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return _dao2.default.getPayoutCurrencies();

                case 2:
                    r = _context.sent;
                    fiat = [];
                    crypto = [];


                    r.payout_currencies.forEach(function (cur) {
                        ((0, _currency.isCryptocurrency)(cur) ? crypto : fiat).push({ text: cur, value: cur });
                    });

                    fields = {
                        currencies_list: (_currencies_list = {}, _defineProperty(_currencies_list, (0, _localize.localize)('Fiat Currency'), fiat), _defineProperty(_currencies_list, (0, _localize.localize)('Cryptocurrency'), crypto), _currencies_list)
                    };


                    if (!currency) {
                        fields.currency = Object.values(fields.currencies_list).reduce(function (a, b) {
                            return [].concat(_toConsumableArray(a), _toConsumableArray(b));
                        }).find(function (c) {
                            return c;
                        }).value;
                    }

                    return _context.abrupt('return', fields);

                case 9:
                case 'end':
                    return _context.stop();
            }
        }
    }, getCurrenciesAsync, this);
});

/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onChangeExpiry = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = __webpack_require__(9);

var _moment2 = _interopRequireDefault(_moment);

var _contract_type = __webpack_require__(110);

var _contract_type2 = _interopRequireDefault(_contract_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChangeExpiry = exports.onChangeExpiry = function onChangeExpiry(_ref) {
    var expiry_type = _ref.expiry_type,
        duration_unit = _ref.duration_unit,
        expiry_date = _ref.expiry_date,
        expiry_time = _ref.expiry_time,
        contract_type = _ref.contract_type,
        server_time = _ref.server_time;

    // TODO: for contracts that only have daily, date_expiry should have a minimum of daily, not intraday
    var contract_expiry_type = expiry_type === 'duration' && duration_unit === 'd' ? 'daily' : 'intraday';
    if (expiry_type === 'endtime') {
        var time = ((expiry_time.split(' ') || [])[0] || '').split(':');
        var expires = (0, _moment2.default)(expiry_date).utc();
        if (time.length > 1) {
            expires.hour(time[0]).minute(time[1]);
        }
        if (expires.diff((0, _moment2.default)(server_time).utc(), 'days') >= 1) {
            contract_expiry_type = 'daily';
        }
    }

    return _extends({
        contract_expiry_type: contract_expiry_type
    }, contract_type && _contract_type2.default.getBarriers(contract_type, contract_expiry_type));
};

/***/ }),
/* 371 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _localize = __webpack_require__(2);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var duration_maps = {
    t: { display: 'ticks', order: 1 },
    s: { display: 'seconds', order: 2, to_second: 1 },
    m: { display: 'minutes', order: 3, to_second: 60 },
    h: { display: 'hours', order: 4, to_second: 60 * 60 },
    d: { display: 'days', order: 5, to_second: 60 * 60 * 24 }
};

var buildDurationConfig = function buildDurationConfig() {
    var durations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { min_max: {}, units_display: {} };
    var contract = arguments[1];

    durations.min_max[contract.start_type] = durations.min_max[contract.start_type] || {};
    durations.units_display[contract.start_type] = durations.units_display[contract.start_type] || [];

    var obj_min = getDurationFromString(contract.min_contract_duration);
    var obj_max = getDurationFromString(contract.max_contract_duration);

    durations.min_max[contract.start_type][contract.expiry_type] = {
        min: convertDurationUnit(obj_min.duration, obj_min.unit, 's'),
        max: convertDurationUnit(obj_max.duration, obj_max.unit, 's')
    };

    var arr_units = [];
    durations.units_display[contract.start_type].forEach(function (obj) {
        arr_units.push(obj.value);
    });
    if (/^tick|daily$/.test(contract.expiry_type)) {
        if (arr_units.indexOf(obj_min.unit) === -1) {
            arr_units.push(obj_min.unit);
        }
    } else {
        Object.keys(duration_maps).forEach(function (u) {
            if (arr_units.indexOf(u) === -1 && duration_maps[u].order >= duration_maps[obj_min.unit].order && duration_maps[u].order <= duration_maps[obj_max.unit].order) {
                arr_units.push(u);
            }
        });
    }

    durations.units_display[contract.start_type] = arr_units.sort(function (a, b) {
        return duration_maps[a].order > duration_maps[b].order ? 1 : -1;
    }).reduce(function (o, c) {
        return [].concat(_toConsumableArray(o), [{ text: (0, _localize.localize)(duration_maps[c].display), value: c }]);
    }, []);

    return durations;
};

var convertDurationUnit = function convertDurationUnit(value, from_unit, to_unit) {
    if (!value || !from_unit || !to_unit) return null;
    if (from_unit === to_unit || !('to_second' in duration_maps[from_unit])) return value;
    return value * duration_maps[from_unit].to_second / duration_maps[to_unit].to_second;
};

var getDurationFromString = function getDurationFromString(duration_string) {
    var duration = duration_string.toString().match(/[a-zA-Z]+|[0-9]+/g);
    return {
        duration: duration[0],
        unit: duration[1]
    };
};

module.exports = {
    buildDurationConfig: buildDurationConfig
};

/***/ }),
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
          value: true
});
exports.onChangeStartDate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _contract_type = __webpack_require__(110);

var _contract_type2 = _interopRequireDefault(_contract_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChangeStartDate = exports.onChangeStartDate = function onChangeStartDate(_ref) {
          var contract_type = _ref.contract_type,
              start_date = _ref.start_date,
              duration_unit = _ref.duration_unit;

          var obj_contract_start_type = _contract_type2.default.getStartType(start_date);
          var obj_duration_units_list = _contract_type2.default.getDurationUnitsList(contract_type, obj_contract_start_type.contract_start_type);
          var obj_duration_unit = _contract_type2.default.getDurationUnit(duration_unit, contract_type, obj_contract_start_type.contract_start_type);

          return _extends({}, obj_contract_start_type, obj_duration_units_list, obj_duration_unit);
};

/***/ }),
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.onChangeSymbolAsync = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _contract_type = __webpack_require__(110);

var _contract_type2 = _interopRequireDefault(_contract_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onChangeSymbolAsync = /*#__PURE__*/exports.onChangeSymbolAsync = regeneratorRuntime.mark(function onChangeSymbolAsync(_ref) {
    var symbol = _ref.symbol,
        contract_type = _ref.contract_type,
        contract_expiry_type = _ref.contract_expiry_type,
        duration_unit = _ref.duration_unit;
    var contract_types_list, new_contract_type;
    return regeneratorRuntime.wrap(function onChangeSymbolAsync$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return _contract_type2.default.buildContractTypesConfig(symbol);

                case 2:
                    contract_types_list = _contract_type2.default.getContractCategories();
                    new_contract_type = _contract_type2.default.getContractType(contract_types_list, contract_type).contract_type;

                    // always return the new contract type list
                    // if contract type hasn't changed, update any contract values that might have changed.
                    // if contract type has changed, let onChangeContractType handle updating values

                    return _context.abrupt('return', _extends({
                        contract_types_list: contract_types_list
                    }, new_contract_type === contract_type && _contract_type2.default.getContractValues(contract_type, contract_expiry_type, duration_unit)));

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, onChangeSymbolAsync, this);
});

/***/ }),
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initTime = exports.onChangeAmount = exports.getTicks = exports.getCountryAsync = undefined;

var _moment = __webpack_require__(9);

var _moment2 = _interopRequireDefault(_moment);

var _dao = __webpack_require__(165);

var _dao2 = _interopRequireDefault(_dao);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCountryAsync = /*#__PURE__*/exports.getCountryAsync = regeneratorRuntime.mark(function getCountryAsync() {
    var r;
    return regeneratorRuntime.wrap(function getCountryAsync$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return _dao2.default.getWebsiteStatus();

                case 2:
                    r = _context.sent;
                    return _context.abrupt('return', {
                        message: 'Your country is: ' + r.website_status.clients_country
                    });

                case 4:
                case 'end':
                    return _context.stop();
            }
        }
    }, getCountryAsync, this);
});

/* This action does not modify state directlly.
 * The payload will be the callback that get's called for each tick
 */
var getTicks = exports.getTicks = function getTicks(store, callback) {
    _dao2.default.getTicks('frxEURUSD', function (r) {
        var data = new Date(r.tick.epoch * 1000).toUTCString() + ': ' + r.tick.quote;
        callback(data);
    });
    return {};
};

var onChangeAmount = exports.onChangeAmount = function onChangeAmount(_ref) {
    var amount = _ref.amount;

    var barrier_2 = amount * 2;
    // console.log('Amount: ', amount, 'Low Barrier: ', barrier_2);
    return {
        barrier_2: barrier_2
    };
};

var initTime = exports.initTime = function initTime() {
    return {
        server_time: window.time || _moment2.default.utc()
    };
};

/***/ }),
/* 375 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _dropdown = __webpack_require__(124);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _fieldset = __webpack_require__(109);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _input_field = __webpack_require__(164);

var _input_field2 = _interopRequireDefault(_input_field);

var _client = __webpack_require__(4);

var _client2 = _interopRequireDefault(_client);

var _connect = __webpack_require__(43);

var _localize = __webpack_require__(2);

var _currency = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basis_list = [{ text: (0, _localize.localize)('Payout'), value: 'payout' }, { text: (0, _localize.localize)('Stake'), value: 'stake' }];

var Amount = function Amount(_ref) {
    var basis = _ref.basis,
        currency = _ref.currency,
        currencies_list = _ref.currencies_list,
        amount = _ref.amount,
        onChange = _ref.onChange,
        is_minimized = _ref.is_minimized,
        is_nativepicker = _ref.is_nativepicker;

    if (is_minimized) {
        return _react2.default.createElement(
            'div',
            { className: 'fieldset-minimized amount' },
            _react2.default.createElement('span', { className: 'icon invest-amount' }),
            _react2.default.createElement(
                'span',
                { className: 'fieldset-minimized__basis' },
                (basis_list.find(function (o) {
                    return o.value === basis;
                }) || {}).text
            ),
            '\xA0',
            _react2.default.createElement(
                'i',
                null,
                _react2.default.createElement('span', { className: 'symbols ' + (currency || '').toLowerCase() })
            ),
            (0, _currency.addComma)(amount, 2)
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            header: (0, _localize.localize)('Invest Amount'),
            icon: 'invest-amount',
            tooltip: (0, _localize.localize)('Text for Invest Amount goes here.')
        },
        _react2.default.createElement(
            'div',
            { className: 'amount-container' },
            _react2.default.createElement(_dropdown2.default, {
                list: basis_list,
                value: basis,
                name: 'basis',
                onChange: onChange,
                is_nativepicker: is_nativepicker
            }),
            _react2.default.createElement(_input_field2.default, {
                type: 'number',
                name: 'amount',
                value: amount,
                onChange: onChange,
                is_currency: true,
                prefix: currency,
                is_nativepicker: is_nativepicker
            })
        ),
        !_client2.default.get('currency') && _react2.default.createElement(_dropdown2.default, {
            list: currencies_list,
            value: currency,
            name: 'currency',
            onChange: onChange,
            is_nativepicker: is_nativepicker
        })
    );
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        basis: trade.basis,
        currency: trade.currency,
        currencies_list: trade.currencies_list,
        amount: trade.amount,
        onChange: trade.handleChange
    };
})(Amount);

/***/ }),
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _fieldset = __webpack_require__(109);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _input_field = __webpack_require__(164);

var _input_field2 = _interopRequireDefault(_input_field);

var _connect = __webpack_require__(43);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Barrier = function Barrier(_ref) {
    var barrier_1 = _ref.barrier_1,
        barrier_2 = _ref.barrier_2,
        onChange = _ref.onChange,
        is_minimized = _ref.is_minimized;

    if (is_minimized) {
        if (!barrier_2) {
            return _react2.default.createElement(
                'div',
                { className: 'fieldset-minimized barrier1' },
                _react2.default.createElement('span', { className: 'icon barriers' }),
                barrier_1
            );
        }
        return _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
                'div',
                { className: 'fieldset-minimized barrier1' },
                _react2.default.createElement('span', { className: 'icon barriers' }),
                barrier_1
            ),
            _react2.default.createElement(
                'div',
                { className: 'fieldset-minimized barrier2' },
                _react2.default.createElement('span', { className: 'icon barriers' }),
                barrier_2
            )
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            header: (0, _localize.localize)(barrier_2 ? 'High barrier' : 'Barrier'),
            icon: 'barriers',
            tooltip: (0, _localize.localize)('Text for Barriers goes here.')
        },
        _react2.default.createElement(_input_field2.default, {
            type: 'number',
            name: 'barrier_1',
            value: barrier_1,
            onChange: onChange
        }),
        !!barrier_2 && _react2.default.createElement(_input_field2.default, {
            type: 'number',
            name: 'barrier_2',
            value: barrier_2,
            onChange: onChange,
            is_currency: true
        })
    );
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        barrier_1: trade.barrier_1,
        barrier_2: trade.barrier_2,
        onChange: trade.handleChange
    };
})(Barrier);

/***/ }),
/* 377 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _connect = __webpack_require__(43);

var _contracts_popup = __webpack_require__(379);

var _contracts_popup2 = _interopRequireDefault(_contracts_popup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Contract = function Contract(_ref) {
    var contract_type = _ref.contract_type,
        contract_types_list = _ref.contract_types_list,
        onChange = _ref.onChange,
        other = _objectWithoutProperties(_ref, ['contract_type', 'contract_types_list', 'onChange']);

    return _react2.default.createElement(_contracts_popup2.default, _extends({
        name: 'contract_type',
        list: contract_types_list,
        value: contract_type,
        onChange: onChange
    }, other));
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        contract_type: trade.contract_type,
        contract_types_list: trade.contract_types_list,
        onChange: trade.handleChange
    };
})(Contract);

/***/ }),
/* 378 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(9);

var _moment2 = _interopRequireDefault(_moment);

var _input_field = __webpack_require__(164);

var _input_field2 = _interopRequireDefault(_input_field);

var _date_picker = __webpack_require__(363);

var _date_picker2 = _interopRequireDefault(_date_picker);

var _dropdown = __webpack_require__(124);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _fieldset = __webpack_require__(109);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _time_picker = __webpack_require__(219);

var _time_picker2 = _interopRequireDefault(_time_picker);

var _connect = __webpack_require__(43);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expiry_list = [{ text: (0, _localize.localize)('Duration'), value: 'duration' }, { text: (0, _localize.localize)('End Time'), value: 'endtime' }];

var min_date_duration = void 0,
    max_date_duration = void 0,
    min_date_expiry = void 0;

var Duration = function Duration(_ref) {
    var expiry_type = _ref.expiry_type,
        expiry_date = _ref.expiry_date,
        expiry_time = _ref.expiry_time,
        duration = _ref.duration,
        duration_unit = _ref.duration_unit,
        duration_units_list = _ref.duration_units_list,
        server_time = _ref.server_time,
        onChange = _ref.onChange,
        is_nativepicker = _ref.is_nativepicker,
        is_minimized = _ref.is_minimized;

    var moment_now = (0, _moment2.default)(server_time);
    if (!min_date_expiry || moment_now.date() !== min_date_expiry.date()) {
        min_date_duration = moment_now.clone().add(1, 'd');
        max_date_duration = moment_now.clone().add(365, 'd');
        min_date_expiry = moment_now.clone();
    }
    if (is_minimized) {
        var duration_unit_text = (duration_units_list.find(function (o) {
            return o.value === duration_unit;
        }) || {}).text;
        return _react2.default.createElement(
            'div',
            { className: 'fieldset-minimized duration' },
            _react2.default.createElement('span', { className: 'icon trade-duration' }),
            expiry_type === 'duration' ? duration + ' ' + duration_unit_text : (0, _moment2.default)(expiry_date).format('ddd - DD MMM, YYYY') + '\n' + expiry_time
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            time: server_time,
            header: (0, _localize.localize)('Trade Duration'),
            icon: 'trade-duration',
            tooltip: (0, _localize.localize)('Text for Duration goes here.')
        },
        _react2.default.createElement(_dropdown2.default, {
            list: expiry_list,
            value: expiry_type,
            name: 'expiry_type',
            onChange: onChange,
            is_nativepicker: is_nativepicker
        }),
        expiry_type === 'duration' ? _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(
                'div',
                { className: 'duration-container' },
                duration_unit === 'd' && !is_nativepicker ? _react2.default.createElement(_date_picker2.default, {
                    name: 'duration',
                    minDate: min_date_duration,
                    maxDate: max_date_duration,
                    mode: 'duration',
                    onChange: onChange,
                    is_nativepicker: is_nativepicker,
                    footer: (0, _localize.localize)('The minimum duration is 1 day')
                }) : _react2.default.createElement(_input_field2.default, {
                    type: 'number',
                    name: 'duration',
                    value: duration,
                    onChange: onChange,
                    is_nativepicker: is_nativepicker
                }),
                _react2.default.createElement(_dropdown2.default, {
                    list: duration_units_list,
                    value: duration_unit,
                    name: 'duration_unit',
                    onChange: onChange,
                    is_nativepicker: is_nativepicker
                })
            )
        ) : _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(_date_picker2.default, {
                name: 'expiry_date',
                showTodayBtn: true,
                minDate: min_date_expiry,
                onChange: onChange,
                is_nativepicker: is_nativepicker
            }),
            _react2.default.createElement(_time_picker2.default, {
                onChange: onChange,
                name: 'expiry_time',
                value: expiry_time,
                placeholder: '12:00 pm',
                is_nativepicker: is_nativepicker
            })
        )
    );
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        expiry_type: trade.expiry_type,
        expiry_date: trade.expiry_date,
        expiry_time: trade.expiry_time,
        duration: trade.duration,
        duration_unit: trade.duration_unit,
        duration_units_list: trade.duration_units_list,
        server_time: trade.server_time,
        onChange: trade.handleChange
    };
})(Duration);

/***/ }),
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _fullscreen_dialog = __webpack_require__(221);

var _fullscreen_dialog2 = _interopRequireDefault(_fullscreen_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContractsPopUp = function (_React$PureComponent) {
    _inherits(ContractsPopUp, _React$PureComponent);

    function ContractsPopUp(props) {
        _classCallCheck(this, ContractsPopUp);

        var _this = _possibleConstructorReturn(this, (ContractsPopUp.__proto__ || Object.getPrototypeOf(ContractsPopUp)).call(this, props));

        _this.handleVisibility = _this.handleVisibility.bind(_this);
        _this.handleSelect = _this.handleSelect.bind(_this);
        _this.setWrapperRef = _this.setWrapperRef.bind(_this);
        _this.handleClickOutside = _this.handleClickOutside.bind(_this);
        _this.state = {
            is_list_visible: false
        };
        return _this;
    }

    _createClass(ContractsPopUp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }, {
        key: 'handleSelect',
        value: function handleSelect(item) {
            if (item.value !== this.props.value) {
                this.props.onChange({ target: { name: this.props.name, value: item.value } });
            }
            this.handleVisibility();
        }
    }, {
        key: 'setWrapperRef',
        value: function setWrapperRef(node) {
            this.wrapper_ref = node;
        }
    }, {
        key: 'handleClickOutside',
        value: function handleClickOutside(event) {
            if (this.wrapper_ref && !this.wrapper_ref.contains(event.target) && this.state.is_list_visible) {
                this.setState({ is_list_visible: false });
            }
        }
    }, {
        key: 'handleVisibility',
        value: function handleVisibility() {
            this.setState({ is_list_visible: !this.state.is_list_visible });
        }
    }, {
        key: 'renderList',
        value: function renderList() {
            var _this2 = this;

            return Object.keys(this.props.list).map(function (key) {
                return _react2.default.createElement(
                    _react2.default.Fragment,
                    { key: key },
                    _react2.default.createElement(Contracts, {
                        contracts: _this2.props.list[key],
                        name: _this2.props.name,
                        value: _this2.props.value,
                        handleSelect: _this2.handleSelect
                    })
                );
            });
        }
    }, {
        key: 'renderPopupList',
        value: function renderPopupList() {
            return _react2.default.createElement(
                'div',
                { className: 'contracts-popup-list' },
                _react2.default.createElement(
                    'div',
                    { className: 'list-container' },
                    this.renderList()
                )
            );
        }
    }, {
        key: 'renderModal',
        value: function renderModal() {
            return _react2.default.createElement(
                _fullscreen_dialog2.default,
                {
                    title: 'Select Trading Type',
                    visible: this.state.is_list_visible,
                    onClose: this.handleVisibility
                },
                _react2.default.createElement(
                    'div',
                    { className: 'contracts-modal-list' },
                    this.renderList()
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var container_classes = ['contracts-popup-container'];
            if (this.props.className) container_classes.push(this.props.className);
            if (this.state.is_list_visible) container_classes.push('show');

            var getDisplayText = function getDisplayText(list, value) {
                var findInArray = function findInArray(arr_list) {
                    return (arr_list.find(function (item) {
                        return item.value === value;
                    }) || {}).text;
                };
                var text = '';
                if (!Array.isArray(list)) {
                    Object.keys(list).some(function (key) {
                        text = findInArray(list[key]);
                        return text;
                    });
                }
                return text;
            };
            return _react2.default.createElement(
                'div',
                {
                    ref: this.setWrapperRef,
                    className: container_classes.join(' ')
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'contracts-popup-display ' + (this.state.is_list_visible ? 'clicked' : ''),
                        onClick: this.handleVisibility,
                        onBlur: this.handleVisibility
                    },
                    _react2.default.createElement('i', { className: 'contract-icon ic-' + this.props.value }),
                    _react2.default.createElement(
                        'span',
                        { name: this.props.name, value: this.props.value },
                        getDisplayText(this.props.list, this.props.value)
                    )
                ),
                !this.props.is_mobile_widget && _react2.default.createElement('span', { className: 'select-arrow' }),
                this.props.is_mobile_widget ? this.renderModal() : this.renderPopupList()
            );
        }
    }]);

    return ContractsPopUp;
}(_react2.default.PureComponent);

var Contracts = function Contracts(_ref) {
    var contracts = _ref.contracts,
        name = _ref.name,
        value = _ref.value,
        handleSelect = _ref.handleSelect;
    return contracts.map(function (contract, idx) {
        return _react2.default.createElement(
            'div',
            {
                key: idx,
                className: 'list-item ' + (value === contract.value ? 'selected' : ''),
                name: name,
                value: contract.value,
                onClick: handleSelect.bind(null, contract)
            },
            _react2.default.createElement('i', { className: 'contract-icon ic-' + contract.value + (value === contract.value ? '' : '--invert') }),
            _react2.default.createElement(
                'span',
                { className: 'contract-title' },
                contract.text
            )
        );
    });
};

exports.default = ContractsPopUp;

/***/ }),
/* 380 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _fullscreen_dialog = __webpack_require__(221);

var _fullscreen_dialog2 = _interopRequireDefault(_fullscreen_dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MobileWidget = function (_React$PureComponent) {
    _inherits(MobileWidget, _React$PureComponent);

    function MobileWidget(props) {
        _classCallCheck(this, MobileWidget);

        var _this = _possibleConstructorReturn(this, (MobileWidget.__proto__ || Object.getPrototypeOf(MobileWidget)).call(this, props));

        _this.state = {
            open: false
        };
        _this.handleDialogClose = _this.handleDialogClose.bind(_this);
        _this.handleWidgetClick = _this.handleWidgetClick.bind(_this);
        return _this;
    }

    _createClass(MobileWidget, [{
        key: 'handleWidgetClick',
        value: function handleWidgetClick() {
            this.setState({
                open: true
            });
        }
    }, {
        key: 'handleDialogClose',
        value: function handleDialogClose() {
            this.setState({
                open: false
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var minimized_children = _react2.default.Children.map(this.props.children, function (child) {
                return _react2.default.cloneElement(child, {
                    is_minimized: true
                });
            });

            var full_children = _react2.default.Children.map(this.props.children, function (child) {
                return _react2.default.cloneElement(child, {
                    is_nativepicker: true
                });
            });

            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'mobile-widget', onClick: this.handleWidgetClick },
                    minimized_children
                ),
                _react2.default.createElement(
                    _fullscreen_dialog2.default,
                    {
                        title: 'Set parameters',
                        visible: this.state.open,
                        onClose: this.handleDialogClose
                    },
                    full_children
                )
            );
        }
    }]);

    return MobileWidget;
}(_react2.default.PureComponent);

exports.default = MobileWidget;

/***/ }),
/* 381 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _dropdown = __webpack_require__(124);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _fieldset = __webpack_require__(109);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _connect = __webpack_require__(43);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var last_digit_numbers = [].concat(_toConsumableArray(Array(10).keys())).map(function (number) {
    return {
        text: number,
        value: number
    };
});

var LastDigit = function LastDigit(_ref) {
    var last_digit = _ref.last_digit,
        onChange = _ref.onChange,
        is_nativepicker = _ref.is_nativepicker,
        is_minimized = _ref.is_minimized;

    if (is_minimized) {
        return _react2.default.createElement(
            'div',
            { className: 'fieldset-minimized' },
            _react2.default.createElement('span', { className: 'icon digits' }),
            (0, _localize.localize)('Last Digit') + ': ' + last_digit
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            header: (0, _localize.localize)('Last Digit Prediction'),
            icon: 'digits',
            tooltip: (0, _localize.localize)('Text for Last Digits goes here.')
        },
        _react2.default.createElement(_dropdown2.default, {
            list: last_digit_numbers,
            value: last_digit,
            name: 'last_digit',
            onChange: onChange,
            is_nativepicker: is_nativepicker
        })
    );
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        last_digit: trade.last_digit,
        onChange: trade.handleChange
    };
})(LastDigit);

/***/ }),
/* 382 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _button = __webpack_require__(218);

var _button2 = _interopRequireDefault(_button);

var _connect = __webpack_require__(43);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Purchase = function Purchase(_ref) {
    var trade_types = _ref.trade_types;
    return _react2.default.createElement(
        'fieldset',
        null,
        Object.keys(trade_types).map(function (type, idx) {
            return _react2.default.createElement(_button2.default, {
                key: idx,
                id: 'purchase_' + type,
                className: 'primary green',
                has_effect: true,
                text: (0, _localize.localize)('Purchase') + ' ' + trade_types[type]
            });
        })
    );
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        trade_types: trade.trade_types
    };
})(Purchase);

/***/ }),
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _dropdown = __webpack_require__(124);

var _dropdown2 = _interopRequireDefault(_dropdown);

var _fieldset = __webpack_require__(109);

var _fieldset2 = _interopRequireDefault(_fieldset);

var _time_picker = __webpack_require__(219);

var _time_picker2 = _interopRequireDefault(_time_picker);

var _connect = __webpack_require__(43);

var _localize = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StartDate = function StartDate(_ref) {
    var start_date = _ref.start_date,
        start_dates_list = _ref.start_dates_list,
        start_time = _ref.start_time,
        server_time = _ref.server_time,
        onChange = _ref.onChange,
        is_nativepicker = _ref.is_nativepicker,
        is_minimized = _ref.is_minimized;

    if (is_minimized) {
        return _react2.default.createElement(
            'div',
            { className: 'fieldset-minimized start-date' },
            _react2.default.createElement('span', { className: 'icon start-time' }),
            start_date === 'now' ? (0, _localize.localize)('Now') : (start_dates_list.find(function (o) {
                return o.value === +start_date;
            }) || {}).text + '\n' + start_time
        );
    }
    return _react2.default.createElement(
        _fieldset2.default,
        {
            time: server_time,
            header: (0, _localize.localize)('Start time'),
            icon: 'start-time',
            tooltip: (0, _localize.localize)('Text for Start Time goes here.')
        },
        _react2.default.createElement(_dropdown2.default, {
            name: 'start_date',
            value: start_date,
            list: start_dates_list,
            onChange: onChange,
            type: 'date',
            is_nativepicker: is_nativepicker
        }),
        start_date !== 'now' && _react2.default.createElement(
            _react2.default.Fragment,
            null,
            _react2.default.createElement(_time_picker2.default, {
                onChange: onChange,
                name: 'start_time',
                value: start_time,
                placeholder: '12:00 pm',
                is_nativepicker: is_nativepicker
            })
        )
    );
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        start_date: trade.start_date,
        start_dates_list: trade.start_dates_list,
        start_time: trade.start_time,
        server_time: trade.server_time,
        onChange: trade.handleChange
    };
})(StartDate);

/***/ }),
/* 384 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _connect = __webpack_require__(43);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Symbol = function _Symbol(_ref) {
    var symbol = _ref.symbol,
        symbols_list = _ref.symbols_list,
        onChange = _ref.onChange;
    return _react2.default.createElement(
        'fieldset',
        null,
        _react2.default.createElement(
            'select',
            { name: 'symbol', value: symbol, onChange: onChange },
            Object.keys(symbols_list).map(function (s) {
                return _react2.default.createElement(
                    'option',
                    { key: s, value: s },
                    symbols_list[s]
                );
            }),
            ';'
        )
    );
};

exports.default = (0, _connect.connect)(function (_ref2) {
    var trade = _ref2.trade;
    return {
        symbol: trade.symbol,
        symbols_list: trade.symbols_list,
        onChange: trade.handleChange
    };
})(_Symbol);

/***/ }),
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _connect = __webpack_require__(43);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test = function Test(_ref) {
    var entries = _ref.entries,
        json = _ref.json;
    return _react2.default.createElement(
        'div',
        { style: { fontSize: '10px', lineHeight: '15px' } },
        entries.map(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
                k = _ref3[0],
                v = _ref3[1];

            return _react2.default.createElement(
                'div',
                { key: k },
                _react2.default.createElement(
                    'strong',
                    null,
                    k,
                    ':'
                ),
                ' ',
                v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' ? JSON.stringify(v) : v
            );
        }),
        _react2.default.createElement('br', null),
        json
    );
};

exports.default = (0, _connect.connect)(function (_ref4) {
    var trade = _ref4.trade;
    return {
        entries: Object.entries(trade),
        json: JSON.stringify(trade).replace(/(:|,)/g, '$1 ')
    };
})(Test);

/***/ }),
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _amount = __webpack_require__(375);

var _amount2 = _interopRequireDefault(_amount);

var _barrier = __webpack_require__(376);

var _barrier2 = _interopRequireDefault(_barrier);

var _contract_type = __webpack_require__(377);

var _contract_type2 = _interopRequireDefault(_contract_type);

var _duration = __webpack_require__(378);

var _duration2 = _interopRequireDefault(_duration);

var _last_digit = __webpack_require__(381);

var _last_digit2 = _interopRequireDefault(_last_digit);

var _mobile_widget = __webpack_require__(380);

var _mobile_widget2 = _interopRequireDefault(_mobile_widget);

var _start_date = __webpack_require__(383);

var _start_date2 = _interopRequireDefault(_start_date);

var _symbol = __webpack_require__(384);

var _symbol2 = _interopRequireDefault(_symbol);

var _test = __webpack_require__(385);

var _test2 = _interopRequireDefault(_test);

var _purchase = __webpack_require__(382);

var _purchase2 = _interopRequireDefault(_purchase);

var _connect = __webpack_require__(43);

var _portfolio_drawer = __webpack_require__(361);

var _portfolio_drawer2 = _interopRequireDefault(_portfolio_drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TradeApp = function (_React$Component) {
    _inherits(TradeApp, _React$Component);

    function TradeApp() {
        _classCallCheck(this, TradeApp);

        return _possibleConstructorReturn(this, (TradeApp.__proto__ || Object.getPrototypeOf(TradeApp)).apply(this, arguments));
    }

    _createClass(TradeApp, [{
        key: 'isVisible',
        value: function isVisible(component_name) {
            var form_components = this.props.form_components;

            return ['duration', 'amount'].concat(_toConsumableArray(form_components)).includes(component_name);
        }
    }, {
        key: 'renderParamPickers',
        value: function renderParamPickers() {
            // TODO: there must be a better way
            var code_to_component = {
                start_date: _react2.default.createElement(_start_date2.default, { key: 'start_date' }),
                duration: _react2.default.createElement(_duration2.default, { key: 'duration' }),
                barrier: _react2.default.createElement(_barrier2.default, { key: 'barrier' }),
                last_digit: _react2.default.createElement(_last_digit2.default, { key: 'last_digit' }),
                amount: _react2.default.createElement(_amount2.default, { key: 'amount' })
            };

            return Object.keys(code_to_component).filter(this.isVisible.bind(this)).map(function (code) {
                return code_to_component[code];
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: 'trade_container', className: this.props.is_portfolio_drawer_on ? 'show' : undefined },
                _react2.default.createElement(
                    'div',
                    { className: 'chart-container notice-msg' },
                    _react2.default.createElement(_symbol2.default, null),
                    _react2.default.createElement(_contract_type2.default, { className: 'desktop-only' }),
                    _react2.default.createElement(_contract_type2.default, { className: 'mobile-only', is_mobile_widget: true }),
                    _react2.default.createElement(_test2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'sidebar-container desktop-only' },
                    this.renderParamPickers(),
                    _react2.default.createElement(_purchase2.default, null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'mobile-only' },
                    _react2.default.createElement(
                        _mobile_widget2.default,
                        null,
                        this.renderParamPickers()
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'offset-container' },
                    _react2.default.createElement(_portfolio_drawer2.default, {
                        onClick: this.props.togglePortfolioDrawer,
                        portfolios: this.props.portfolios,
                        server_time: this.props.server_time
                    })
                )
            );
        }
    }]);

    return TradeApp;
}(_react2.default.Component);

exports.default = (0, _connect.connect)(function (_ref) {
    var trade = _ref.trade,
        ui = _ref.ui;
    return {
        form_components: trade.form_components,
        portfolios: trade.portfolios,
        server_time: trade.server_time,
        is_portfolio_drawer_on: ui.is_portfolio_drawer_on,
        togglePortfolioDrawer: ui.togglePortfolioDrawer
    };
})(TradeApp);

/***/ }),
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _descriptor26, _descriptor27, _descriptor28;

var _moment = __webpack_require__(9);

var _moment2 = _interopRequireDefault(_moment);

var _mobx = __webpack_require__(98);

var _client = __webpack_require__(4);

var _client2 = _interopRequireDefault(_client);

var _contract_type = __webpack_require__(110);

var _contract_type2 = _interopRequireDefault(_contract_type);

var _index = __webpack_require__(220);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var TradeStore = (_dec = _mobx.action.bound, _dec2 = _mobx.action.bound, _dec3 = _mobx.action.bound, (_class = function () {
    function TradeStore() {
        _classCallCheck(this, TradeStore);

        this.time_interval = undefined;

        _initDefineProp(this, 'symbols_list', _descriptor, this);

        _initDefineProp(this, 'symbol', _descriptor2, this);

        _initDefineProp(this, 'contract_type', _descriptor3, this);

        _initDefineProp(this, 'contract_types_list', _descriptor4, this);

        _initDefineProp(this, 'trade_types', _descriptor5, this);

        _initDefineProp(this, 'contract_start_type', _descriptor6, this);

        _initDefineProp(this, 'contract_expiry_type', _descriptor7, this);

        _initDefineProp(this, 'form_components', _descriptor8, this);

        _initDefineProp(this, 'basis', _descriptor9, this);

        _initDefineProp(this, 'currency', _descriptor10, this);

        _initDefineProp(this, 'currencies_list', _descriptor11, this);

        _initDefineProp(this, 'amount', _descriptor12, this);

        _initDefineProp(this, 'expiry_type', _descriptor13, this);

        _initDefineProp(this, 'duration', _descriptor14, this);

        _initDefineProp(this, 'duration_unit', _descriptor15, this);

        _initDefineProp(this, 'duration_units_list', _descriptor16, this);

        _initDefineProp(this, 'expiry_date', _descriptor17, this);

        _initDefineProp(this, 'expiry_time', _descriptor18, this);

        _initDefineProp(this, 'barrier_1', _descriptor19, this);

        _initDefineProp(this, 'barrier_2', _descriptor20, this);

        _initDefineProp(this, 'start_dates_list', _descriptor21, this);

        _initDefineProp(this, 'start_date', _descriptor22, this);

        _initDefineProp(this, 'start_time', _descriptor23, this);

        _initDefineProp(this, 'last_digit', _descriptor24, this);

        _initDefineProp(this, 'message', _descriptor25, this);

        _initDefineProp(this, 'tick', _descriptor26, this);

        _initDefineProp(this, 'server_time', _descriptor27, this);

        _initDefineProp(this, 'portfolios', _descriptor28, this);
    }

    _createClass(TradeStore, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this.time_interval = setInterval(_index2.default.initTime, 1000);
            _index2.default.getCountryAsync();

            _index2.default.getTicks((0, _mobx.action)('getTicks', function (r) {
                _this.tick = r;
            }));

            if (!_client2.default.get('currency')) {
                _index2.default.getCurrenciesAsync();
            }
            _contract_type2.default.buildContractTypesConfig(this.symbol).then((0, _mobx.action)(function () {
                _this.contract_types_list = _contract_type2.default.getContractCategories();
            }));
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            clearInterval(this.time_interval);
            this.time_interval = undefined;
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            var _e$target = e.target,
                name = _e$target.name,
                value = _e$target.value;

            if (!(name in this)) {
                throw new Error('Invalid Argument: ' + name);
            }
            this[name] = value;
        }

        // Underlying


        // Contract Type


        // Amount


        // Duration


        // Barrier


        // Start Time


        // Last Digit


        // Test


        // TODO: retrieve from upper state


        // TODO: to remove dummy portfolio value

    }]);

    return TradeStore;
}(), (_applyDecoratedDescriptor(_class.prototype, 'init', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'dispose', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'dispose'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleChange', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'handleChange'), _class.prototype), _descriptor = _applyDecoratedDescriptor(_class.prototype, 'symbols_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return { frxAUDJPY: 'AUD/JPY', AS51: 'Australian Index', HSI: 'Hong Kong Index', DEAIR: 'Airbus', frxXAUUSD: 'Gold/USD', R_10: 'Volatility 10 Index' };
    }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'symbol', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return Object.keys(this.symbols_list)[0];
    }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'contract_type', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'contract_types_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return {};
    }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'trade_types', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'contract_start_type', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'contract_expiry_type', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'form_components', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'basis', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 'stake';
    }
}), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'currency', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return _client2.default.get('currency');
    }
}), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'currencies_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return {};
    }
}), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'amount', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 5;
    }
}), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'expiry_type', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 'duration';
    }
}), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'duration', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 15;
    }
}), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, 'duration_unit', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, 'duration_units_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, 'expiry_date', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return null;
    }
}), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, 'expiry_time', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '09:40 pm';
    }
}), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, 'barrier_1', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 0;
    }
}), _descriptor20 = _applyDecoratedDescriptor(_class.prototype, 'barrier_2', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 0;
    }
}), _descriptor21 = _applyDecoratedDescriptor(_class.prototype, 'start_dates_list', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [];
    }
}), _descriptor22 = _applyDecoratedDescriptor(_class.prototype, 'start_date', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 'now';
    }
}), _descriptor23 = _applyDecoratedDescriptor(_class.prototype, 'start_time', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '12:30 am';
    }
}), _descriptor24 = _applyDecoratedDescriptor(_class.prototype, 'last_digit', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return 3;
    }
}), _descriptor25 = _applyDecoratedDescriptor(_class.prototype, 'message', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor26 = _applyDecoratedDescriptor(_class.prototype, 'tick', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return '';
    }
}), _descriptor27 = _applyDecoratedDescriptor(_class.prototype, 'server_time', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return _moment2.default.utc();
    }
}), _descriptor28 = _applyDecoratedDescriptor(_class.prototype, 'portfolios', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return [{
            transaction_id: 32355620467,
            contract_id: 478981052055,
            payout: 10,
            expiry_time: 1522886399,
            longcode: 'Win payout if AUD/JPY is strictly higher than entry spot at close on 2018-04-04.',
            shortcode: 'CALL_FRXAUDJPY_10_1520263325_1522886399_S0P_0',
            currency: 'USD',
            buy_price: 1.06,
            app_id: 1,
            symbol: 'AUD/JPY'
        }, {
            transaction_id: 47272620508,
            contract_id: 432523746528,
            payout: 10,
            expiry_time: 15234686345,
            longcode: 'Win payout if AUD/JPY is strictly higher than entry spot at close on 2018-05-04.',
            shortcode: 'CALL_FRXAUDJPY_10_1520263325_1522886399_S0P_0',
            currency: 'USD',
            buy_price: -55.25,
            app_id: 1,
            symbol: 'Australian Index'
        }];
    }
})), _class));
exports.default = TradeStore;
;

/***/ }),
/* 388 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class, _descriptor;

var _mobx = __webpack_require__(98);

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var UIStore = (_dec = _mobx.action.bound, (_class = function () {
    function UIStore() {
        _classCallCheck(this, UIStore);

        _initDefineProp(this, 'is_portfolio_drawer_on', _descriptor, this);
    }

    _createClass(UIStore, [{
        key: 'togglePortfolioDrawer',
        value: function togglePortfolioDrawer() {
            // toggle show and hide Portfolio Drawer
            this.is_portfolio_drawer_on = !this.is_portfolio_drawer_on;
        }
    }]);

    return UIStore;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'is_portfolio_drawer_on', [_mobx.observable], {
    enumerable: true,
    initializer: function initializer() {
        return false;
    }
}), _applyDecoratedDescriptor(_class.prototype, 'togglePortfolioDrawer', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'togglePortfolioDrawer'), _class.prototype)), _class));
exports.default = UIStore;
;

/***/ })
],[366]);
//# sourceMappingURL=binary_app.js.map