package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.auth.entity.PasswordResetToken;
import com.sunflowers.ecommerce.auth.entity.User;
import com.sunflowers.ecommerce.auth.repository.PasswordResetRepository;
import com.sunflowers.ecommerce.auth.repository.UserRepository;
import com.sunflowers.ecommerce.auth.request.ResetPwdRequest;
import com.sunflowers.ecommerce.auth.request.VerifyEmailRequest;
import com.sunflowers.ecommerce.email.EmailService;
import com.sunflowers.ecommerce.email.MailBody;
import com.sunflowers.ecommerce.response.GeneralResponse;
import com.sunflowers.ecommerce.utils.FrontLinks;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    /**
     * This method sends an OTP to the user's email address for password reset.
     * Sends an OTP to the user's email address for password reset.
     * @param emailRequest the email request containing the user's email
     * @return a general response indicating the status of the operation
     */
    public GeneralResponse<String> verifyEmail(VerifyEmailRequest emailRequest) {

        User user = userRepository.findByEmail(emailRequest.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("Not user with that email"));

        int otp = otpGenerator();

        PasswordResetToken prt = PasswordResetToken.builder()
                .id(user.getId())
                .otp(otp)
                .expirationTime(new Date(System.currentTimeMillis() + 70 * 1000))
                .build();

        String text = "Please use the following code to verify your email: " + otp
                + "\n\nThis code will expire in 60 minutes."
                + "\n\nIf you did not request this code, please ignore this email."
                + "\n\n\n\n" + FrontLinks.RESET_PASSWORD + "?token=" + user.getId().toString();

        emailService.sendEmail(
                MailBody.builder()
                .to(emailRequest.getEmail())
                .subject("OTP for Forgot Password request")
                .text(text)
                .build()
        );

        passwordResetRepository.findById(user.getId())
                .ifPresent(passwordResetRepository::delete);

        passwordResetRepository.save(prt);

        return GeneralResponse.<String>builder()
                .statusCode(HttpStatus.OK.value())
                .message("The password reset token has been sent to the e-mail address.")
                .success(true)
                .data(user.getId().toString())
                .build();
    }

    public GeneralResponse<Void> resetPassword(ResetPwdRequest request) {
        PasswordResetToken prt = passwordResetRepository.findById(
                userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found")).getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!prt.getOtp().toString().equals(request.getOtp())) {
            throw new IllegalArgumentException("Invalid OTP");
        }

        if (!AuthService.validatePassword(request.getPassword()) ) {
            throw new IllegalArgumentException("Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character");
        }

        User user = userRepository.findById(prt.getId())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        passwordResetRepository.delete(prt);

        return GeneralResponse.<Void>builder()
                .statusCode(HttpStatus.OK.value())
                .message("Password reset successful")
                .success(true)
                 .build();
    }

    //TODO: mejorar el generador de OTP
    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }

}
