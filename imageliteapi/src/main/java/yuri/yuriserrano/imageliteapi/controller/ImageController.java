package yuri.yuriserrano.imageliteapi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import yuri.yuriserrano.imageliteapi.dto.ImageDTO;
import yuri.yuriserrano.imageliteapi.entity.Image;
import yuri.yuriserrano.imageliteapi.enums.ImageExtension;
import yuri.yuriserrano.imageliteapi.mapper.ImageMapper;
import yuri.yuriserrano.imageliteapi.service.ImageService;


import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/v1/images")
@Slf4j
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;
    private final ImageMapper imageMapper;

    @PostMapping
    public ResponseEntity save(@RequestParam("file") MultipartFile file,
                               @RequestParam("name") String name,
                               @RequestParam("tags") List<String> tags) {
        log.info("Saving image: name ({}), size ({})", file.getOriginalFilename(), file.getSize());
        log.info("Name defined to the image: {}", name);
        log.info("Tags defined to the image: {}", tags);
        log.info("Content Type: {}", file.getContentType());

        MediaType mediaType = MediaType.valueOf(Objects.requireNonNull(file.getContentType()));
        log.info("Media Type: {}", mediaType);

        Optional<ImageExtension> extensionOpt = ImageExtension.valueOf(mediaType)
                .or(() -> ImageExtension.fromFilename(Objects.requireNonNull(file.getOriginalFilename())));

        if (extensionOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Unsupported image format");
        }

        Image image;

        try {
            image = imageMapper.mapToImage(file, name, extensionOpt.get(), tags);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error reading file");
        }

        Image savedImage = imageService.save(image);
        URI imageUri = buildImageURL(savedImage);

        return ResponseEntity.created(imageUri).build();
    }


    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable String id) {
        var possibleImage = imageService.getById(id);

        if (possibleImage.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        var image = possibleImage.get();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(image.getExtension().getMediaType());
        headers.setContentLength(image.getSize());
        headers.setContentDispositionFormData("inline; filename=\"" + image.getFileName() + "\"", image.getFileName());

        return new ResponseEntity<>(image.getFile(), headers, HttpStatus.OK);

    }

    // localhost:8080/v1/images/search?extension=png&query=universe
    @GetMapping
    public ResponseEntity<List<ImageDTO>> search(@RequestParam(value = "extension", required = false, defaultValue = "") String extension,
                                                 @RequestParam(value = "query", required = false) String query) {


        var result = imageService.search(ImageExtension.ofName(extension), query);

        var images = result.stream().map(image -> {
            var url = buildImageURL(image);
            return imageMapper.mapToImageDTO(image, url.toString());
        }).collect(Collectors.toList());

        return ResponseEntity.ok(images);

    }

    private URI buildImageURL(Image image) {
        String imagePath = String.format("/%s", image.getId());

        return ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path(imagePath)
                .build()
                .toUri();

    }


}
