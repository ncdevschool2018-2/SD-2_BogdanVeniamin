package com.netcracker.edu.fapi.service.impl;

import com.netcracker.edu.fapi.models.SubscribeConditionViewModel;
import com.netcracker.edu.fapi.models.SubscriptionRenewalViewModel;
import com.netcracker.edu.fapi.models.SubscriptionViewModel;
import com.netcracker.edu.fapi.service.SubscriptionDataService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class SubscriptionDataServiceImpl implements SubscriptionDataService {

    @Value("${backend.server.url}")
    private String backendServerUrl;

    @Override
    public List<SubscriptionViewModel> getAll() {
        RestTemplate restTemplate = new RestTemplate();
        SubscriptionViewModel[] subscriptionViewModelResponse = restTemplate.getForObject(backendServerUrl + "api/subscriptions", SubscriptionViewModel[].class);
        return subscriptionViewModelResponse == null ? Collections.emptyList() : Arrays.asList(subscriptionViewModelResponse);
    }

    @Override
    public SubscriptionViewModel getSubscriptionById(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(backendServerUrl + "api/subscriptions/" + id, SubscriptionViewModel.class);
    }

    @Override
    public SubscriptionViewModel saveSubscription(SubscriptionViewModel sub) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "api/subscriptions", sub, SubscriptionViewModel.class).getBody();
    }

    @Override
    public void deleteSubscription(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.delete(backendServerUrl + "api/subscriptions/" + id);
    }

    @Override
    public List<SubscriptionViewModel> getSubscriptionsByLogin(String login) {
        RestTemplate restTemplate = new RestTemplate();
        SubscriptionViewModel[] subscriptionViewModelResponse = restTemplate.getForObject(backendServerUrl + "api/subscriptions/?login=" + login, SubscriptionViewModel[].class);
        return subscriptionViewModelResponse == null ? Collections.emptyList() : Arrays.asList(subscriptionViewModelResponse);
    }

    @Override
    public SubscribeConditionViewModel computePrice(SubscribeConditionViewModel condition) {
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.postForEntity(backendServerUrl + "api/subscriptions/compute", condition, SubscribeConditionViewModel.class).getBody();
    }

    @Override
    public void extendSubscription(SubscriptionRenewalViewModel sub) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.postForEntity(backendServerUrl + "api/subscriptions/extend", sub, SubscriptionRenewalViewModel.class).getBody();
    }
}
