package com.netcracker.edu.backend.service.impl;

import com.netcracker.edu.backend.entity.Subscription;
import com.netcracker.edu.backend.entity.Transaction;
import com.netcracker.edu.backend.repository.SubscriptionRepository;
import com.netcracker.edu.backend.repository.TransactionRepository;
import com.netcracker.edu.backend.service.ChargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import com.netcracker.edu.backend.repository.WalletRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class ChargeServiceImpl implements ChargeService {

    private ArrayList<Subscription> subscriptions = new ArrayList<>();

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public void loadSubscriptions() {
        subscriptions.clear();
        Iterable<Subscription> iterableSubs = subscriptionRepository.findAll();
        for(Subscription sub: iterableSubs) {
            subscriptions.add(sub);
        }

    }

    private boolean checkMoney(Subscription sub) {
        boolean status;

        if(sub.getUser().getWallet().getMoney() < sub.getCost()) {
            status = false;
            subscriptionRepository.falseStatus(sub.getId());
        } else {
            status = true;
            subscriptionRepository.trueStatus(sub.getId());
        }

        return status;
    }

    @Override
    public void decreaseAmount() {

        for(Subscription sub: subscriptions) {
            if(checkMoney(sub)) {
                subscriptionRepository.trueStatus(sub.getId());
                walletRepository.chargeMoney(sub.getCost(), sub.getUser().getWallet().getId());
                System.out.println("Cost: " + sub.getCost());
                System.out.println("Money[" + sub.getUser().getWallet().getId() + "]: " + sub.getUser().getWallet().getMoney());
            }
        }
    }

    @Override
    @Scheduled(cron = "0 0 9 * * *")
    public void scheduledCharge() {
        loadSubscriptions();
        decreaseDays();
        checkSubscription();
        decreaseAmount();
        saveTransaction();
    }

    @Override
    public void decreaseDays() {
        for(Subscription sub: subscriptions) {
            if(checkMoney(sub)) {
                subscriptionRepository.decreaseDuration(sub.getId());
                sub.setDuration(sub.getDuration() - 1);
            }
        }
    }

    @Override
    public void checkSubscription() {
        ArrayList<Subscription> toDelete = new ArrayList<>();

        for(Subscription sub: subscriptions) {
            if(sub.getDuration() >= 0) {
                System.out.println("Left days[" + sub.getId() + "]: " + sub.getDuration());
            }
            else {
                toDelete.add(sub);
                subscriptionRepository.deleteById(sub.getId());
            }
        }

        for(Subscription deleteSub: toDelete) {
            subscriptions.remove(deleteSub);
        }
    }

    @Override
    public void saveTransaction() {
        Transaction action;

        for(Subscription sub: subscriptions) {
            action = new Transaction(sub.getUser().getWallet(), "MINUS", sub.getCost(), sub.getPost().getTitle());
            transactionRepository.save(action);
        }
    }
}
