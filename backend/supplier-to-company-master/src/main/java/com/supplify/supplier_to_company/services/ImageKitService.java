package com.supplify.supplier_to_company.services;

import com.supplify.supplier_to_company.exceptions.UploadFileException;
import io.imagekit.sdk.ImageKit;
import io.imagekit.sdk.exceptions.*;
import io.imagekit.sdk.models.FileCreateRequest;
import io.imagekit.sdk.models.results.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.io.IOException;

@Slf4j
@Service
public class ImageKitService {

    @Autowired
    private ImageKit imageKit;


    public Result uploadFile(MultipartFile file, String fileName, String folder) {
        int maxRetries = 3;
        int retryCount = 0;
        Exception lastException = null;

        // Validate file
        if (file == null || file.isEmpty()) {
            throw new UploadFileException("File is empty or null: " + fileName);
        }

        try {
            long fileSizeInMB = file.getSize() / (1024 * 1024);
            log.info("Attempting to upload file: {} (size: {} MB) to folder: {}", fileName, fileSizeInMB, folder);
            
            if (file.getSize() > 25 * 1024 * 1024) { // 25MB limit
                throw new UploadFileException("File size exceeds 25MB limit: " + fileName);
            }
        } catch (Exception e) {
            log.warn("Could not determine file size for: {}", fileName);
        }

        while (retryCount < maxRetries) {
            try {
                byte[] fileBytes = file.getBytes();
                log.debug("File size: {} bytes, attempt: {}/{}", fileBytes.length, retryCount + 1, maxRetries);
                
                String base64 = Base64.getEncoder().encodeToString(fileBytes);
                FileCreateRequest fileCreateRequest = new FileCreateRequest(
                        base64,
                        fileName
                );
                fileCreateRequest.setFolder(folder);
                fileCreateRequest.setUseUniqueFileName(true);
                
                Result result = imageKit.upload(fileCreateRequest);
                log.info("Successfully uploaded file: {} with URL: {}", fileName, result.getUrl());
                return result;
                
            } catch (IOException e) {
                lastException = e;
                log.error("IOException reading file '{}' on attempt {}/{}", fileName, retryCount + 1, maxRetries, e);
                throw new UploadFileException("Failed to read file: " + fileName);
                
            } catch (Exception e) {
                lastException = e;
                retryCount++;
                
                if (retryCount < maxRetries) {
                    long waitTime = retryCount * 1000L; // Exponential backoff: 1s, 2s, 3s
                    log.warn("Upload failed for '{}' on attempt {}/{}. Retrying in {}ms. Error: {}", 
                            fileName, retryCount, maxRetries, waitTime, e.getMessage());
                    try {
                        Thread.sleep(waitTime);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new UploadFileException("Upload interrupted for file: " + fileName);
                    }
                } else {
                    log.error("Failed to upload file '{}' after {} attempts. Exception type: {}", 
                            fileName, maxRetries, e.getClass().getName(), e);
                }
            }
        }
        
        throw new UploadFileException("Failed to upload file to ImageKit after " + maxRetries + " attempts: " + fileName);
    }

}
