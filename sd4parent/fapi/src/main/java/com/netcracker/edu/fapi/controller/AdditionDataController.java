package com.netcracker.edu.fapi.controller;

import com.netcracker.edu.fapi.models.AdditionViewModel;
import com.netcracker.edu.fapi.service.AdditionDataService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/a")
public class AdditionDataController {

    @Autowired
    private AdditionDataService additionDataService;

    @RequestMapping
    public ResponseEntity<List<AdditionViewModel>> getAllAdditions() {
        return ResponseEntity.ok(additionDataService.getAll());
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<AdditionViewModel> getAdditionById(@PathVariable String id) {
        return ResponseEntity.ok(additionDataService.getAdditionById(Long.valueOf(id)));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<AdditionViewModel> saveAddition(@RequestBody AdditionViewModel extension) {
        if (extension != null) {
            return ResponseEntity.ok(additionDataService.saveAddition(extension));
        }
        return null;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deleteAddition(@PathVariable String id) {
        additionDataService.deleteAddition(Long.valueOf(id));
    }

}
