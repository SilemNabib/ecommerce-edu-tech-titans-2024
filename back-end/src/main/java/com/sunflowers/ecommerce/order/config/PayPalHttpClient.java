package com.sunflowers.ecommerce.order.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sunflowers.ecommerce.order.data.PaypalOrderRequest;
import com.sunflowers.ecommerce.order.response.PaypalCaptureResponse;
import com.sunflowers.ecommerce.order.response.PaypalOrderResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;

import static com.sunflowers.ecommerce.order.config.PayPalEndpoints.*;

@Component
@Slf4j
public class PayPalHttpClient {

    private final HttpClient httpClient;
    private final PaypalConfig paypalConfig;
    private final ObjectMapper objectMapper;

    @Autowired
    public PayPalHttpClient(PaypalConfig paypalConfig, ObjectMapper objectMapper) {
        this.paypalConfig = paypalConfig;
        this.objectMapper = objectMapper;
        httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_1_1)
                .build();
    }

    private String encodeBasicCredentials() {
        String credentials = paypalConfig.getClientId() + ":" + paypalConfig.getSecret();
        return "Basic " + Base64.getEncoder().encodeToString(credentials.getBytes());
    }

    public PaypalAccessToken getAccessToken() throws Exception {
        var request = HttpRequest.newBuilder()
                .uri(URI.create(createUrl(paypalConfig.getBaseUrl(), GET_ACCESS_TOKEN)))
                .header(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, encodeBasicCredentials())
                .header(HttpHeaders.ACCEPT_LANGUAGE, "en_US")
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .POST(HttpRequest.BodyPublishers.ofString("grant_type=client_credentials"))
                .build();
        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        var content = response.body();
        return objectMapper.readValue(content, PaypalAccessToken.class);
    }

    public PaypalOrderResponse createOrder(PaypalOrderRequest orderRequest) throws Exception {
        var accessTokenDto = getAccessToken();
        var payload = objectMapper.writeValueAsString(orderRequest);

        var request = HttpRequest.newBuilder()
                .uri(URI.create(createUrl(paypalConfig.getBaseUrl(), ORDER_CHECKOUT)))
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessTokenDto.getAccessToken())
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();
        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        var content = response.body();
        return objectMapper.readValue(content, PaypalOrderResponse.class);

    }

    public PaypalCaptureResponse captureOrder(String token) throws Exception {
        var accessTokenDto = getAccessToken();
        var captureUrl = createUrl(paypalConfig.getBaseUrl(), CAPTURE_ORDER, token);

        var request = HttpRequest.newBuilder()
                .uri(URI.create(captureUrl))
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessTokenDto.getAccessToken())
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .POST(HttpRequest.BodyPublishers.noBody())
                .build();

        var response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        var content = response.body();

        if(response.statusCode() != 201) {
            throw new Exception("Failed to capture order");
        }

        return objectMapper.readValue(content, PaypalCaptureResponse.class);
    }
}
