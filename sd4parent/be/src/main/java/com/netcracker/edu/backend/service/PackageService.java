package com.netcracker.edu.backend.service;

import com.netcracker.edu.backend.entity.Package;

import java.util.Optional;

public interface PackageService {

    Package savePackage(Package bundle);
    Optional<Package> getPackageById(Long id);
    Iterable<Package> getAllPackages();
    void deletePackage(Long id);

}
