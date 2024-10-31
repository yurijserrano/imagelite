package yuri.yuriserrano.imageliteapi.service;

import yuri.yuriserrano.imageliteapi.entity.User;
import yuri.yuriserrano.imageliteapi.security.AccessToken;

public interface UserService {
    User getByEmail(String email);
    User save(User user);
    AccessToken authenticate(String email, String password);
}
