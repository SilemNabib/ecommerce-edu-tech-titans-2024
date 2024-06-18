package com.sunflowers.ecommerce.email;

import lombok.Builder;

/**
 * The MailBody record represents the body of an email in the e-commerce system.
 * It includes details such as the recipient, the subject, and the text of the email.
 */
@Builder
public record MailBody(
        String to,
        String subject,
        String text) {
}