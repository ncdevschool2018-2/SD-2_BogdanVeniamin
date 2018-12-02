package com.netcracker.edu.backend.service.impl;

import com.netcracker.edu.backend.entity.SubscribeCondition;
import com.netcracker.edu.backend.entity.Subscription;
import com.netcracker.edu.backend.entity.SubscriptionRenewal;
import com.netcracker.edu.backend.service.SubscriptionService;
import com.netcracker.edu.backend.repository.SubscriptionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
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

        sub.setDuration(convertDuration(sub.getDuration()));
        sub.setCost(sub.getCost()/sub.getDuration());

        return this.repository.save(sub);
    }

    private int convertDuration(int duration) {
        int[] monthDays = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int currentMonth = Integer.parseInt(LocalDateTime.now().toString().split("-")[1]);
        int days = 0;

        int finalMonth = currentMonth + duration;

        if(finalMonth > 12) {
            finalMonth -= 12;
            for(int i=currentMonth; i<monthDays.length; i++) {
                days += monthDays[i-1];
            }

            for(int i=0; i<finalMonth; i++) {
                days += monthDays[i];
            }
        } else {
            for(int i=currentMonth; i<finalMonth; i++) {
                days += monthDays[i-1];
            }
        }

        return days;
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

    @Override
    public SubscribeCondition computePrice(SubscribeCondition condition) {
        Double currentDiscount = 0.0;

        if(condition.getDuration() > 0 && condition.getDuration() < 4)
            currentDiscount = 0.0;
        if(condition.getDuration() > 3 && condition.getDuration() < 7)
            currentDiscount = condition.getDiscount()/3;
        if(condition.getDuration() > 6 && condition.getDuration() < 10)
            currentDiscount = condition.getDiscount()*2/3;
        if(condition.getDuration() > 9 && condition.getDuration() < 13)
            currentDiscount = condition.getDiscount();

        Double wholePrice = condition.getPrice() * condition.getDuration();
        Double discountPrice = condition.getPrice() * currentDiscount * condition.getDuration()/100;
        condition.setPrice(wholePrice - discountPrice);
        condition.setDiscount(currentDiscount);

        return condition;
    }

    @Override
    public void extendSubscription(SubscriptionRenewal sub) {
        int oldDuration = repository.findById(sub.getId()).get().getDuration();

        int newDuration = this.convertDuration(sub.getDuration());

        float newCost = sub.getCost()/(oldDuration + newDuration);

        repository.changeCost(sub.getId(), newCost);
        repository.extendSubscription(sub.getId(), newDuration);
    }
}
