package yuri.yuriserrano.imageliteapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yuri.yuriserrano.imageliteapi.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
