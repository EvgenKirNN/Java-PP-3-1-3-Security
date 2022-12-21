package ru.kata.spring.boot_security.demo.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /*
    Не знаю, что лучше использовать против ошибки LazyInitializationException.
    По умолчанию (при связи one-to-many) производится ленивая загрузка зависимости (roles).
    И надо либо изменить стратегию на Eager, но это, вроде, на производительность влияет,
    и в динамике мы не можем переключить с lazy на eager, а потом обратно.
    Либо граф объектов (EntityGraph) использовать. Рекомендуют с JPA 2.1 (но это не точно)
     */
    @EntityGraph(attributePaths = "roles")
    Optional<User> findByUsername(String username);

}
