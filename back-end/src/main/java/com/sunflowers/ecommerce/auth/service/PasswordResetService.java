package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.PasswordResetToken;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.PasswordResetRepository;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import com.sunflowers.ecommerce.auth.request.VerifyEmailRequest;
import com.sunflowers.ecommerce.email.EmailService;
import com.sunflowers.ecommerce.email.MailBody;
import com.sunflowers.ecommerce.response.GeneralResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Random;

/**
 * Service class for handling password reset operations.
 */
@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordResetRepository passwordResetRepository;

    /**
     * This method sends an OTP to the user's email address for password reset.
     * Sends an OTP to the user's email address for password reset.
     * @param emailRequest the email request containing the user's email
     * @return a general response indicating the status of the operation
     */
    public GeneralResponse<Void> verifyEmail(VerifyEmailRequest emailRequest) {

        User user = userRepository.findByEmail(emailRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Not user with that email"));

        int otp = otpGenerator();

        PasswordResetToken prt = PasswordResetToken.builder()
                .id(user.getId())
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 70 * 1000))
                .build();

        emailService.sendEmail(
                MailBody.builder()
                .to(emailRequest.getEmail())
                .subject("OTP for Forgot Password request")
                .text("This is the OTP for your Forgot Password request: " + otp)
                .build()
        );

        passwordResetRepository.findById(user.getId())
                .ifPresent(passwordResetRepository::delete);

        passwordResetRepository.save(prt);

        return GeneralResponse.<Void>builder()
                .statusCode(HttpStatus.OK.value())
                .message("The password reset token has been sent to the e-mail address.")
                .success(true)
                .build();
    }

    //TODO: mejorar el generador de OTP
    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }

}
