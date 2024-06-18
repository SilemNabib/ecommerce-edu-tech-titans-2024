package com.sunflowers.ecommerce.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * GeneralResponse is a generic class for wrapping the response of a REST API.
 * It includes a status code, a message, a success flag, and the actual data.
 *
 * @param <T> the type of the data in the response
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GeneralResponse<T> {

    private int statusCode;
    private String message;
    boolean success;
    private T data;

}