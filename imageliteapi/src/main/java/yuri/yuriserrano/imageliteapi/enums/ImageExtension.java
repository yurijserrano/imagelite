package yuri.yuriserrano.imageliteapi.enums;

import lombok.Getter;
import org.springframework.http.MediaType;

import java.util.Arrays;
import java.util.Optional;

public enum ImageExtension {
    PNG(MediaType.IMAGE_PNG, "png"),
    GIF(MediaType.IMAGE_GIF, "gif"),
    JPEG(MediaType.IMAGE_JPEG, "jpg", "jpeg"),
    BMP(MediaType.parseMediaType("image/bmp"), "bmp"),
    TIFF(MediaType.parseMediaType("image/tiff"), "tiff"),
    WEBP(MediaType.parseMediaType("image/webp"), "webp");

    @Getter
    private final MediaType mediaType;
    private final String[] fileExtensions;

    ImageExtension(MediaType mediaType, String... fileExtensions) {
        this.mediaType = mediaType;
        this.fileExtensions = fileExtensions;
    }

    public static Optional<ImageExtension> valueOf(MediaType mediaType) {
        return Arrays.stream(values())
                .filter(ie -> ie.mediaType.equals(mediaType))
                .findFirst();
    }

    public static Optional<ImageExtension> ofFileExtension(String extension) {
        return Arrays.stream(values())
                .filter(ie -> Arrays.asList(ie.fileExtensions).contains(extension.toLowerCase()))
                .findFirst();
    }

    public static Optional<ImageExtension> fromFilename(String filename) {
        int lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex > 0 && lastDotIndex < filename.length() - 1) {
            String extension = filename.substring(lastDotIndex + 1).toLowerCase();
            return ofFileExtension(extension);
        }
        return Optional.empty();
    }

    public static ImageExtension ofName(String name) {
        return Arrays.stream(values())
                .filter(ie -> ie.name().equalsIgnoreCase(name))
                .findFirst()
                .orElse(null);
    }
}