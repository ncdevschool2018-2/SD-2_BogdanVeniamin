package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entity.Subscription;
import com.netcracker.edu.backend.service.SubscriptionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private SubscriptionService subscriptionService;

    @Autowired
    SubscriptionController(SubscriptionService subscriptionService) { this.subscriptionService = subscriptionService; }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Subscription> getSubscriptionById(@PathVariable(name = "id") Long id) {
        Optional<Subscription> subscription = subscriptionService.getSubscriptionById(id);
        if(subscription.isPresent())
            return ResponseEntity.ok(subscription.get());
        else
            return ResponseEntity.notFound().build();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Subscription> getAllSubscriptions() {
        return subscriptionService.getAllSubscriptions();
    }

    @RequestMapping(method = RequestMethod.POST)
    public Subscription saveSubscription(@RequestBody Subscription action) {
        return subscriptionService.saveSubscription(action);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Subscription> deleteSubscription(@PathVariable(name = "id") Long id) {
        subscriptionService.deleteSubscription(id);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value="/", method = RequestMethod.GET)
    public Iterable<Subscription> getSubscriptionsByLogin(@RequestParam("login") String login) {
        return subscriptionService.getSubscriptionsByLogin(login);
    }
}