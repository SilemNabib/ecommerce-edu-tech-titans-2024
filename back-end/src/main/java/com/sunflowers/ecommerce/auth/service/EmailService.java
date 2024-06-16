package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.email.MailBody;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * Service class for handling email-related operations.
 */
@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final Environment env;

    /**
     * Sends an email in a separate thread to avoid blocking the main application flow.
     *
     * @param mail the {@link MailBody} object containing the email details such as subject, text, and recipient.
     */
    public void sendEmail(MailBody mail) {
        new Thread(() -> {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(env.getProperty("MAIL_USERNAME"));
            message.setSubject(mail.subject());
            message.setText(mail.text());
            message.setTo(mail.to());

            mailSender.send(message);
        }).start();
    }
}
