package com.sunflowers.ecommerce.auth.service;

import com.sunflowers.ecommerce.email.MailBody;
import com.sunflowers.ecommerce.email.MailBuilder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final Environment env;

    @Setter
    private MailBody mail;

    @Getter
    private final MailBuilder mailBuilder;

    public void sendEmail() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(env.getProperty("MAIL_USERNAME"));
        message.setSubject(mail.subject());
        message.setText(mail.text());
        message.setTo(mail.to());

        mailSender.send(message);
    }
}
