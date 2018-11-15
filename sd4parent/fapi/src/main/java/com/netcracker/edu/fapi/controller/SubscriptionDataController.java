package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.SubscriptionViewModel;
import com.netcracker.edu.fapi.service.SubscriptionDataService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/s")
public class SubscriptionDataController {

    @Autowired SubscriptionDataService subscriptionDataService;

    @RequestMapping
    public  ResponseEntity<List<SubscriptionViewModel>> getAllSubscriptions() {
        return ResponseEntity.ok(subscriptionDataService.getAll());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<SubscriptionViewModel> getSubscriptionById(@PathVariable String id) {
        return ResponseEntity.ok(subscriptionDataService.getSubscriptionById(Long.valueOf(id)));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<SubscriptionViewModel> saveSubscription(@RequestBody SubscriptionViewModel sub) {
        if(sub != null) {
            return ResponseEntity.ok(subscriptionDataService.saveSubscription(sub));
        }
        return null;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteSubscription(@PathVariable String id) {
        subscriptionDataService.deleteSubscription(Long.valueOf(id));
    }

}
