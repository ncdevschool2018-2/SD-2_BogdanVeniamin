package com.netcracker.edu.backend.repository.specification;

import com.netcracker.edu.backend.entity.Subscription;

import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class SubscriptionSpecification {

    public static Specification<Subscription> subscriptionsFindByLogin(String login) {
        return new Specification<Subscription>() {
            @Override
            public Predicate toPredicate(Root<Subscription> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get("user").get("login"), login);
            }
        };
    }

}
