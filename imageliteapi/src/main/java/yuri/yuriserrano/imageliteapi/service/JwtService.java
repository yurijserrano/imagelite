package yuri.yuriserrano.imageliteapi.service;

import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import yuri.yuriserrano.imageliteapi.entity.User;
import yuri.yuriserrano.imageliteapi.exception.InvalidTokenException;
import yuri.yuriserrano.imageliteapi.security.AccessToken;
import yuri.yuriserrano.imageliteapi.security.SecretKeyGenerator;

import javax.crypto.SecretKey;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final SecretKeyGenerator secretKeyGenerator;

    public AccessToken generateToken(User user) {

        SecretKey key = secretKeyGenerator.getKey();
        Date expirationDate = generateExpirationDate();
        Map<String, Object> claims = generateTokenClaims(user);

        String token = Jwts
                .builder()
                .signWith(key)
                .subject(user.getEmail())
                .expiration(expirationDate)
                .claims(claims)
                .compact();

        return new AccessToken(token);
    }

    private Date generateExpirationDate() {
        var expirationMinutes = 60;
        LocalDateTime now = LocalDateTime.now().plusMinutes(expirationMinutes);

        return Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
    }

    private Map<String, Object> generateTokenClaims(User user) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("name", user.getName());

        return claims;
    }

    public String getEmailFromToken(String tokenJwt) {
        try {
            JwtParser build = Jwts.parser()
                    .verifyWith(secretKeyGenerator.getKey())
                    .build();
            Jws<Claims> jwsClaims = build.parseSignedClaims(tokenJwt);
            Claims claims = jwsClaims.getPayload();

            return claims.getSubject();
        } catch(JwtException e) {
            throw new InvalidTokenException(e.getMessage());
        }
    }

}
