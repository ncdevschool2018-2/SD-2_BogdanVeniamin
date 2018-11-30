package com.netcracker.edu.fapi.service;

import com.netcracker.edu.fapi.models.SubscribeConditionViewModel;
import com.netcracker.edu.fapi.models.SubscriptionViewModel;

import java.util.List;

public interface SubscriptionDataService {

    List<SubscriptionViewModel> getAll();
    SubscriptionViewModel getSubscriptionById(Long id);
    SubscriptionViewModel saveSubscription(SubscriptionViewModel sub);
    void deleteSubscription(Long id);
    List<SubscriptionViewModel> getSubscriptionsByLogin(String login);
    SubscribeConditionViewModel computePrice(SubscribeConditionViewModel condition);
}
