package yuri.yuriserrano.imageliteapi.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yuri.yuriserrano.imageliteapi.dto.CredentialsDTO;
import yuri.yuriserrano.imageliteapi.dto.UserDTO;
import yuri.yuriserrano.imageliteapi.entity.User;
import yuri.yuriserrano.imageliteapi.exception.DuplicatedTupleException;
import yuri.yuriserrano.imageliteapi.mapper.UserMapper;
import yuri.yuriserrano.imageliteapi.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @PostMapping
    public ResponseEntity save(@RequestBody UserDTO userDTO) {

        try {
            User user = userMapper.mapToUser(userDTO);
            userService.save(user);

            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicatedTupleException e) {
            Map<String, String> errors = new HashMap<>();
            errors.put("error", "User already exists!");

            return ResponseEntity.status(HttpStatus.CONFLICT).body(errors);
        }
    }

    @PostMapping("/auth")
    public ResponseEntity authenticate(@RequestBody CredentialsDTO credentialsDTO) {
        var token = userService.authenticate(credentialsDTO.getEmail(), credentialsDTO.getPassword());

        if(token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(token);
    }

}
