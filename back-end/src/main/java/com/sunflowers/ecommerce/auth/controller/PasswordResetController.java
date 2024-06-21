package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.request.ResetPwdRequest;
import com.sunflowers.ecommerce.auth.request.VerifyEmailRequest;
import com.sunflowers.ecommerce.auth.service.PasswordResetService;
import com.sunflowers.ecommerce.response.GeneralResponse;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling password reset requests.
 */
@RestController
@RequestMapping("/api/v1/auth/forgotPwd")
@RequiredArgsConstructor
public class PasswordResetController {

    private final PasswordResetService pwdResetService;

    /**
     * Handles password reset requests.
     * This method will take a VerifyEmailRequest object and return a GeneralResponse object.
     *
     * @param emailRequest the email request containing the user's email
     * @return the general response containing the status of the password reset request
     */
    @PostMapping("/verifyMail")
    public ResponseEntity<GeneralResponse<String>> verifyEmail(@RequestBody VerifyEmailRequest emailRequest){
        return ResponseEntity.ok(pwdResetService.verifyEmail(emailRequest));
    }

    /**
     * Handles password reset requests.
     * This method will take a ResetPwdRequest object and return a GeneralResponse object.
     *
     * @param resetPwdRequest the password reset request containing the user's email, otp code and new password
     * @return the general response containing the status of the password reset request
     */
    @PostMapping("/resetPwd")
    public ResponseEntity<GeneralResponse<Void>> resetPassword(@RequestBody ResetPwdRequest resetPwdRequest){
        return ResponseEntity.ok(pwdResetService.resetPassword(resetPwdRequest));
    }

    /**
     * Handles password reset exceptions.
     * This method will return a bad request response with an error message.
     *
     * @param e the password reset exception
     * @return the error response containing the error message
     */
    @ExceptionHandler({
            UsernameNotFoundException.class,
            ConstraintViolationException.class,
            IllegalArgumentException.class,
    })
    public ResponseEntity<GeneralResponse<Void>> handlePwdResetException(Exception e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                GeneralResponse.<Void>builder()
                        .statusCode(HttpStatus.BAD_REQUEST.value())
                        .message(e.getMessage())
                        .success(false)
                        .build()
        );
    }

    /**
     * Handles all other exceptions.
     * This method will return an internal server error response with an error message.
     *
     * @param e the exception
     * @return the error response containing the error message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<GeneralResponse<Void>> handleException(Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                GeneralResponse.<Void>builder()
                        .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .message(e.getMessage())
                        .success(false)
                        .build()
        );
    }
}
