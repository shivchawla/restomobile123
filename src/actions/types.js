// auth types

export const FIRST_NAME_CHANGED = 'first_name_changed';
export const LAST_NAME_CHANGED = 'last_name_changed';
export const EMAIL_CHANGED = 'email_changed';
export const PASSWORD_CHANGED = 'password_changed';
export const FORGET_EMAIL_CHANGED = 'forget_email_changed';
export const LOGIN_USER = 'login_user';
export const LOGIN_USER_SUCCESS = 'login_user_success';
export const LOGIN_USER_FAIL = 'login_user_fail';
export const LOGOUT_SUCCESS = 'logout_success';
export const REGISTER_USER = 'register_user';
export const REGISTER_USER_SUCCESS = 'register_user_success';
export const REGISTER_USER_FAIL = 'register_user_fail';
export const LOAD_JWT = 'load_jwt';
export const REMOVE_JWT = 'remove_jwt';
export const RESET_PASSWORD_EMAIL_SENT = 'reset_password_email_sent';
export const LOAD_USER_ID = 'load_user_id';
export const REMOVE_USER_ID = 'remove_user_id';
export const REMOVE_USER_TYPE = 'remove_user_type';
export const LOAD_USER_TYPE = 'load_user_type';

// auth business user

export const RESTO_NAME_CHANGED = 'resto_name_changed';
export const COMPANY_NAME_CHANGED = 'company_name_changed';
export const COMPANY_ADDRESS_CHANGED = 'company_address_changed';
export const PROVINCE_CHANGED = 'province_changed';
export const CITY_CHANGED = 'city_changed';
export const ZIP_CODE_CHANGED = 'zip_code_changed';
export const POSITION_CHANGED = 'position_changed';
export const MOBILE_NUMBER_CHANGED = 'mobile_number_changed';
export const PHONE_NUMBER_CHANGED = 'phone_number_changed';
export const NPWP_CHANGED = 'npwp_changed';
export const REMOVE_NPWP = 'remove_npwp';


// shipping address actions

export const SHIPPING_ADDRESS_FORM_UPDATE = 'shipping_address_form_update';
export const RESET_LOCATION = 'reset_location';
export const RESET_FORM = 'reset_form';
export const UPDATE_LONGITUDE_LATITUDE = 'update_longitude_latitude';
export const UPDATE_ADDRESS_QUERY = 'update_address_query';
export const FETCH_SHIPPING_ADDRESSES = 'fetch_shipping_address';
export const FETCH_SHIPPING_ADDRESSES_SUCCESS = 'fetch_shipping_address_success';
export const FETCH_SHIPPING_ADDRESS_FAIL = 'fetch_shipping_address_fail';
export const LOAD_SHIPPING_ADDRESS_FORM = 'load_shipping_address_form';
export const ADD_SHIPPING_ADDRESS = 'add_shipping_address';
export const ADD_SHIPPING_ADDRESS_SUCCESS = 'add_shipping_address_success';
export const ADD_SHIPPING_ADDRESS_FAIL = 'add_shipping_address_fail';
export const DELETE_SHIPPING_ADDRESS = 'delete_shipping_address';
export const DELETE_SHIPPING_ADDRESS_SUCCESS = 'delete_shipping_address_success';
export const DELETE_SHIPPING_ADDRESS_FAIL = 'delete_shipping_address_fail';
export const UPDATE_SHIPPING_ADDRESS = 'update_shipping_address';
export const UPDATE_SHIPPING_ADDRESS_SUCCESS = 'update_shipping_address_success';
export const UPDATE_SHIPPING_ADDRESS_FAIL = 'update_shipping_address_fail';

// orders actions

export const SHOW_THANK_YOU_MODAL = 'show_thank_you_modal';
export const HIDE_THANK_YOU_MODAL = 'hide_thank_you_modal';
export const START_FETCH_ORDERS = 'start_fetch_orders';
export const FETCH_ORDERS_SUCCESS = 'fetch_orders_success';
export const FETCH_ORDERS_FAIL = 'fetch_orders_fail';

// reviews actions

export const ADD_REVIEW_FORM_UPDATE = 'add_review_form_udpate';
export const RESET_REVIEW_FORM = 'reset_review_form';
export const START_FETCH_PRODUCT_REVIEWS = 'start_fetch_product_reviews';
export const FETCH_PRODUCT_REVIEWS_SUCCESS = 'fetch_product_reviews_success';
export const FETCH_PRODUCT_REVIEWS_FAIL = 'fetch_product_reviews_fail';
export const START_CREATE_PRODUCT_REVIEW = 'start_create_product_review';
export const CREATE_PRODUCT_REVIEW_SUCCESS = 'create_product_review_success';
export const CREATE_PRODUCT_REVIEW_FAIL = 'create_product_review_fail';
export const START_DELETE_PRODUCT_REVIEW = 'start_delete_product_review';
export const DELETE_PRODUCT_REVIEW_SUCCESS = 'delete_product_review_success';
export const DELETE_PRODUCT_REVIEW_FAIL = 'delete_product_review_fail';


// home actions

export const START_FETCH_HOME = 'start_fetch_home';
export const FETCH_HOME_SUCCESS = 'fetch_home_success';
export const START_FETCH_PRODUCT_SUGGESTIONS = 'start_fetch_product_suggestions';
export const FETCH_PRODUCT_SUGGESTIONS_SUCCESS = 'fetch_product_suggestions_success';
export const FETCH_PRODUCT_SUGGESTIONS_FAIL = 'fetch_product_suggestions_fail';
export const CLEAR_SEARCH_SUGGESTIONS = 'clear_search_suggestions';
export const START_FETCH_SEARCH_RESULTS = 'start_fetch_search_results';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'fetch_search_results_success';
export const FETCH_SEARCH_RESULT_FAIL = 'fetch_search_results_fail';
export const START_SUBMIT_FEEDBACK = 'start_submit_feedback';
export const SUBMIT_FEEDBACK_SUCCESS = 'submit_feedback_success';
export const SUBMIT_FEEDBACK_FAIL = 'submit_feedback_fail';
export const START_FETCH_PRODUCTS = 'start_fetch_products';
export const FETCH_PRODUCTS_SUCCESS = 'fetch_products_success';
export const FETCH_PRODUCTS_FAIL = 'fetch_products_fail';

// vendor actions
export const START_FETCH_VENDOR = 'start_fetch_vendor';
export const FETCH_VENDOR_SUCCESS = 'fetch_vendor_success';
export const START_FETCH_ALL_VENDORS = 'start_fetch_all_vendors';
export const FETCH_ALL_VENDORS_SUCCESS = 'fetch_all_vendors_success';
export const FETCH_ALL_VENDORS_FAIL = 'fetch_all_vendors_fail';

// cart actions
export const START_FETCH_CHECKOUT = 'start_fetch_checkout';
export const FETCH_CHECKOUT_SUCCESS = 'fetch_checkout_success';
export const FETCH_CHECKOUT_FAIL = 'fetch_checkout_fail';
export const START_UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS = 'start_update_checkout_resto_shipping_addresss';
export const UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS_SUCCESS = 'update_checkout_resto_shipping_address_success';
export const UPDATE_CHECKOUT_RESTO_SHIPPING_ADDRESS_FAIL = 'update_checkout_resto_shipping_address_fail';
export const START_UPDATE_QUANTITY_ITEM = 'start_update_quantity_item';
export const UPDATE_QUANTITY_ITEM_SUCCESS = 'update_quantity_item_success';
export const UPDATE_QUANTITY_ITEM_FAILED = 'update_quantity_item_failed';
export const START_ADD_TO_CART = 'start_add_to_cart';
export const ADD_TO_CART_SUCCESS = 'add_to_cart_success';
export const ADD_TO_CART_FAIL = 'add_to_cart_fail';
export const START_REMOVE_CHECKOUT = 'start_remove_checkout';
export const REMOVE_CHECKOUT_SUCCESS = 'remove_checkout_success';
export const REMOVE_CHECKOUT_FAIL = 'remove_checkout_fail';
export const START_UPDATE_SHIPPING_NAME = 'start_update_shipping_name';
export const UPDATE_CHECKOUT_SHIPPING_NAME_SUCCESS = 'update_checkout_shipping_name_success';
export const UPDATE_CHECKOUT_SHIPPING_NAME_FAIL = 'update_checkout_shipping_name_fail';
export const START_MIDTRANS_PAY = 'start_midtrans_pay';
export const MIDTRANS_PAY_SUCCESS = 'midtrans_pay_success';
export const MIDTRANS_PAY_FAIL = 'midtrans_pay_fail';
export const START_FETCH_SHIPPING_METHODS = 'start_fetch_shipping_methods';
export const FETCH_SHIPPING_METHODS_SUCCESS = 'fetch_shipping_methods_success';
export const FETCH_SHIPPING_METHODS_FAIL = 'fetch_shipping_methods_fail';
export const START_PAYLATER = 'start_paylater';
export const PAYLATER_SUCCESS = 'paylater_success';
export const PAYLATER_FAIL = 'paylater_fail';

