package yuri.yuriserrano.imageliteapi.mapper;

import org.springframework.stereotype.Component;
import yuri.yuriserrano.imageliteapi.dto.UserDTO;
import yuri.yuriserrano.imageliteapi.entity.User;

@Component
public class UserMapper {

    public User mapToUser(UserDTO userDTO) {
        return User.builder().
                name(userDTO.getName()).
                email(userDTO.getEmail()).
                password(userDTO.getPassword()).
                build();
    }
}
