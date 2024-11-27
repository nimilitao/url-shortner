package com.nimilitao.UrlShortner.UrlRedirecter;

import com.nimilitao.UrlShortner.Shared.UrlData;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.cdimascio.dotenv.Dotenv;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class RedirectHandler implements RequestHandler<Map<String, Object>, Map<String, Object >> {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final S3Client s3Client = S3Client.builder().region(Region.of("us-east-2")).build();
    private final Dotenv dotenv = Dotenv.load();
    private final String s3BucketName = dotenv.get("S3_BUCKET_NAME");

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> input, Context context) {
        String pathParameters = input.get("rawPath").toString();
        String shortUrlCode = pathParameters.substring(pathParameters.lastIndexOf("/") + 1);

        if(shortUrlCode == null || shortUrlCode.isEmpty())
        {
            throw new IllegalArgumentException("Invalid output: 'shortUrlCode' is required.");
        }

        GetObjectRequest request = GetObjectRequest.builder()
                .bucket(s3BucketName)
                .key(shortUrlCode + ".json")
                .build();

        InputStream s3ObjectStream;

        try {
            System.out.println(request);
            s3ObjectStream = s3Client.getObject(request);
            System.out.println(s3ObjectStream);
        } catch (Exception exception) {
            throw new RuntimeException("Error fetching URL data from S3: " + exception.getMessage());
        }

        UrlData urlData;

        try {
            urlData = objectMapper.readValue(s3ObjectStream, UrlData.class);
        } catch (Exception exception) {
            throw new RuntimeException("Error deserializing URL data : " + exception.getMessage(), exception);
        }

        long currentTimeInSeconds = System.currentTimeMillis() / 1000;

        Map<String, Object> response = new HashMap<>();

        String s3FileName = shortUrlCode + ".json";

        if(currentTimeInSeconds > urlData.getExpirationTime())
        {
            try {
                deleteFileFromS3(s3FileName);
            } catch (Exception exception) {
                throw new RuntimeException("Error deleting URL data from S3: " + exception.getMessage());
            }

            response.put("statusCode", 410);
            response.put("body", "This URL has expired!");
        }

        Map<String, String> headers = new HashMap<>();
        headers.put("Location", urlData.getOriginalUrl());

        response.put("headers", headers);
        response.put("statusCode", 302);

        return response;
    }

    private void deleteFileFromS3(String fileName) {
        DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                .bucket(s3BucketName)
                .key(fileName)
                .build();

        s3Client.deleteObject(deleteRequest);
    }
}
