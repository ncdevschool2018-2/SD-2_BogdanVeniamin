package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entity.MoneyOperation;
import com.netcracker.edu.backend.entity.User;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long>, JpaSpecificationExecutor<User> {

    @Modifying
    @Transactional
    @Query("update User account set account.role = case when account.role = 'USER' then 'BAN' else 'USER' end where account.id = :id")
    void banUser(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query("update User account set account.lastDateLogin = :date where account.id = :id")
    void checkUser(@Param("id") Long id, @Param("date") String date);
}
