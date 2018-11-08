package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.WalletViewModel;
import com.netcracker.edu.fapi.service.WalletDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/w")
public class WalletDataController {

    @Autowired
    WalletDataService walletDataService;

    @RequestMapping
    public ResponseEntity<List<WalletViewModel>> getAllWallets() {
        return ResponseEntity.ok(walletDataService.getAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<WalletViewModel> saveWallet(@RequestBody WalletViewModel purse) {
        if(purse != null)
            return ResponseEntity.ok(walletDataService.saveWallet(purse));
        else
            return null;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteWallet(@PathVariable String id) {
        walletDataService.deleteWallet(Long.valueOf(id));
    }

}
