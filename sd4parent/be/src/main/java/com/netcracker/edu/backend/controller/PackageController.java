package com.netcracker.edu.backend.controller;

import com.netcracker.edu.backend.entity.Package;
import com.netcracker.edu.backend.service.PackageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    private PackageService packageService;

    @Autowired
    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Package> getPackageById(@PathVariable(name = "id") Long id) {
        Optional<Package> pack = packageService.getPackageById(id);
        if(pack.isPresent()) {
            return ResponseEntity.ok(pack.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public Iterable<Package> getAllPackages() { return packageService.getAllPackages(); }

    @RequestMapping(method = RequestMethod.POST)
    public Package savePackage(@RequestBody Package bundle) {
        return packageService.savePackage(bundle);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deletePackage(@PathVariable(name = "id") Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.noContent().build();
    }
}
