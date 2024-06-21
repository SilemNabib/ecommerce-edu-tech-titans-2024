package com.sunflowers.ecommerce.order.config;

public enum PayPalEndpoints {
    GET_ACCESS_TOKEN("/v1/oauth2/token"),
    GET_CLIENT_TOKEN("/v1/identity/generate-token"),
    CAPTURE_ORDER("/v2/checkout/orders/%s/capture"),
    ORDER_CHECKOUT("/v2/checkout/orders");

    private final String path;

    PayPalEndpoints(String path) {
        this.path = path;
    }

    public static String createUrl(String baseUrl, PayPalEndpoints endpoint) {
        return baseUrl + endpoint.path;
    }

    public static String createUrl(String baseUrl, PayPalEndpoints endpoint, Object... params) {
        return baseUrl + String.format(endpoint.path, params);
    }

}
