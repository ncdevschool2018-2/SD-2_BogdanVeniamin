package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entity.Addition;
import com.netcracker.edu.backend.service.AdditionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/additions")
public class AdditionController {

    private AdditionService additionService;

    @Autowired
    public AdditionController(AdditionService additionService) {
        this.additionService = additionService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Addition> getAdditionById(@PathVariable(name = "id") Long id) {
        Optional<Addition> addition = additionService.getAdditionById(id);
        if(addition.isPresent()) {
            return ResponseEntity.ok(addition.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Addition> getAllAdditions() { return additionService.getAllAdditions(); }

    @RequestMapping(method = RequestMethod.POST)
    public Addition saveAddition(@RequestBody Addition extension) {
        return additionService.saveAddition(extension);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteAddition(@PathVariable(name = "id") Long id) {
        additionService.deleteAddition(id);
        return ResponseEntity.noContent().build();
    }

}
