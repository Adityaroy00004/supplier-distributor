package com.supplify.supplier_to_company.utilities;

import com.supplify.supplier_to_company.dtos.SupplierRegistrationDto;
import com.supplify.supplier_to_company.models.Supplier;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;


@Component
public class MappingUtilities {


    public Supplier mapToSupplier(SupplierRegistrationDto dto) {
        Supplier supplier = new Supplier();

        supplier.setName(dto.getName());
        supplier.setGstNumber(dto.getGstNumber());
        supplier.setPanNumber(dto.getPanNumber());
        supplier.setAddress(dto.getAddress());
        supplier.setContactPersonName(dto.getContactPersonName());
        supplier.setContactEmail(dto.getContactEmail());
        supplier.setContactPhone(dto.getContactPhone());
        supplier.setCountry(dto.getCountry());
        supplier.setIndustryCategory(dto.getIndustryCategory());
        supplier.setBusinessType(dto.getBusinessType());
        supplier.setYearOfEstablishment(dto.getYearOfEstablishment());
        supplier.setNumberOfEmployees(dto.getNumberOfEmployees());

        // Banking
        supplier.setBankAccountNumber(dto.getBankAccountNumber());
        supplier.setIfscOrSwift(dto.getIfscOrSwift());
        supplier.setBankName(dto.getBankName());
        supplier.setBranchAddress(dto.getBranchAddress());

        // Additional info
        supplier.setShippingCapabilities(dto.getShippingCapabilities());
        supplier.setPaymentTerms(dto.getPaymentTerms());
        supplier.setAnnualRevenueRange(dto.getAnnualRevenueRange());

        // System-generated fields
        supplier.setStatus("PENDING");             // Supplier is awaiting approval
        supplier.setReviewStatus("NOT_REVIEWED"); // Backend reviewer will mark later
        supplier.setIsActive(false);               // Becomes true after approval

        supplier.setReferenceId(generateReferenceId());
        supplier.setCreatedAt(LocalDateTime.now());
        supplier.setUpdatedAt(LocalDateTime.now());

        return supplier;
    }


    

    // Example referenceId generator: SUP-202511-0001
    private String generateReferenceId() {
        String prefix = "SUP-" + LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
        String randomPart = String.format("%04d", new Random().nextInt(10000));
        return prefix + "-" + randomPart;
    }
}
