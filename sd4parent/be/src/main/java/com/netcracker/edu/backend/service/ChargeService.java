package com.netcracker.edu.backend.service;

public interface ChargeService {

    void scheduledCharge();
    void loadSubscriptions();
    void decreaseAmount();
    void decreaseDays();
    void checkSubscription();
    void saveTransaction();

}
