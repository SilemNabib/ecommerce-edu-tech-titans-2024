package com.sunflowers.ecommerce.auth.controller;

import com.sunflowers.ecommerce.auth.request.VerifyEmailRequest;
import com.sunflowers.ecommerce.auth.service.PasswordResetService;
import com.sunflowers.ecommerce.response.GeneralResponse;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.Random;

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
    public ResponseEntity<GeneralResponse<Void>> verifyEmail(@RequestBody VerifyEmailRequest emailRequest){

        try {
            return ResponseEntity.ok(pwdResetService.verifyEmail(emailRequest));
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    GeneralResponse.<Void>builder()
                            .statusCode(HttpStatus.NOT_FOUND.value())
                            .message(e.getMessage())
                            .success(false)
                            .build()
            );
        } catch (ConstraintViolationException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // TODO: Secure method for generate a better otp

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}
