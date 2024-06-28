package com.sunflowers.ecommerce.auth.request;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResetPwdRequest {
    String email;
    String password;
    String otp;
}
