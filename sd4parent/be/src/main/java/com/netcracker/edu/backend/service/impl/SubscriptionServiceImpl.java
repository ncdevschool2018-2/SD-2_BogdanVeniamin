package com.netcracker.edu.backend.service.impl;

import com.netcracker.edu.backend.entity.Subscription;
import com.netcracker.edu.backend.service.SubscriptionService;
import com.netcracker.edu.backend.repository.SubscriptionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static com.netcracker.edu.backend.repository.specification.SubscriptionSpecification.subscriptionsFindByLogin;

@Component
public class SubscriptionServiceImpl implements SubscriptionService {

    private SubscriptionRepository repository;

    @Autowired
    public SubscriptionServiceImpl(SubscriptionRepository repository) {
        this.repository = repository;
    }

    @Override
    public Subscription saveSubscription(Subscription sub) {
        return this.repository.save(sub);
    }

    @Override
    public Optional<Subscription> getSubscriptionById(Long id) {
        return this.repository.findById(id);
    }

    @Override
    public Iterable<Subscription> getAllSubscriptions() {
        return this.repository.findAll();
    }

    @Override
    public void deleteSubscription(Long id) {
        this.repository.deleteById(id);
    }

    @Override
    public Iterable<Subscription> getSubscriptionsByLogin(String login) {
        return this.repository.findAll(subscriptionsFindByLogin(login));
    }

}
