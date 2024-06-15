package com.sunflowers.ecommerce.email;

import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class MailBuilder {

    private String subject;
    private String mailText;

    public MailBody passwordResetToken(String email, int otp) {
        subject = "OTP for Forgot Password request";
        mailText = "This is the OTP for your Forgot Password request: " + otp;

        return MailBody.builder()
                .to(email)
                .subject(subject)
                .text(mailText)
                .build();
    }

    public MailBody emailVerification(String email, String verificationCode) {
        subject = "Email Verification";
        mailText = "Please use the following code to verify your email: " + verificationCode;

        return MailBody.builder()
                .to(email)
                .subject(subject)
                .text(mailText)
                .build();
    }
}
