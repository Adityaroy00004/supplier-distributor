package com.supplify.supplier_to_company.config;

import com.supplify.supplier_to_company.models.Role;
import com.supplify.supplier_to_company.models.Supplier;
import com.supplify.supplier_to_company.models.SupplierUser;
import com.supplify.supplier_to_company.models.User;
import com.supplify.supplier_to_company.repositories.SupplierRepository;
import com.supplify.supplier_to_company.repositories.SupplierUserRepository;
import com.supplify.supplier_to_company.services.RoleService;
import com.supplify.supplier_to_company.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    UserService userService;

    @Autowired
    SupplierRepository supplierRepository;

    @Autowired
    RoleService roleService;

    @Autowired
    SupplierUserRepository supplierUserRepository;

    @Override
    public void run(String... args) throws Exception {
        String email = "supplier@example.com";
        User user = userService.findByEmail(email);
        if (user == null) {
            String supplierName = "Demo Supplier";

            // Create Supplier
            Supplier supplier = new Supplier();
            supplier.setName(supplierName);
            supplier.setContactEmail(email);
            supplier.setContactPhone("1234567890");
            supplier.setAddress("Demo Address");
            supplier.setStatus("ACTIVE");
            supplier.setIsActive(true);
            supplier.setGstNumber("DEMOGST123");
            supplier.setPanNumber("DEMOPAN123");
            supplier.setCreatedAt(LocalDateTime.now());
            supplier.setUpdatedAt(LocalDateTime.now());

            supplier = supplierRepository.save(supplier);

            // Create Role
            Role adminRole = roleService.createAdminRoleForSupplier(supplierName);

            // Create User
            SupplierUser supplierUser = new SupplierUser();
            supplierUser.setEmail(email);
            supplierUser.setPassword("password123");
            supplierUser.setFirstName("Demo");
            supplierUser.setLastName("Supplier");
            supplierUser.setPhoneNumber("1234567890");
            supplierUser.setStatus("ACTIVE");
            supplierUser.setUserType("SUPPLIER_USER");
            supplierUser.setRoles(List.of(adminRole));
            supplierUser.setSupplier(supplier);
            supplierUser.setCreatedAt(LocalDateTime.now());
            supplierUser.setUpdatedAt(LocalDateTime.now());

            supplierUserRepository.save(supplierUser);

            System.out.println("Demo user created: " + email + " with password: password123");
        } else {
            System.out.println("Demo user already exists: " + email);
        }
    }
}
