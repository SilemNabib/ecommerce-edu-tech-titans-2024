package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.email.MailBody;
import com.sunflowers.ecommerce.email.MailBuilder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final Environment env;

    @Getter
    private final MailBuilder mailBuilder;

    public void sendEmail(MailBody mailBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(env.getProperty("MAIL_USERNAME"));
        message.setSubject(mailBody.subject());
        message.setText(mailBody.text());
        message.setTo(mailBody.to());

        mailSender.send(message);
    }
}
