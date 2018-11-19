package com.netcracker.edu.backend.repository;

import com.netcracker.edu.backend.entity.Subscription;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionRepository extends CrudRepository<Subscription, Long>, JpaSpecificationExecutor<Subscription> {
}
