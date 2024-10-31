package yuri.yuriserrano.imageliteapi.mapper;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import yuri.yuriserrano.imageliteapi.dto.ImageDTO;
import yuri.yuriserrano.imageliteapi.entity.Image;
import yuri.yuriserrano.imageliteapi.enums.ImageExtension;

import java.io.IOException;
import java.util.List;

@Component
public class ImageMapper {

    public Image mapToImage(MultipartFile file, String name, ImageExtension extension, List<String> tags) throws IOException {


        return Image.builder()
                .name(name)
                .tags(String.join(",", tags))
                .size(file.getSize())
                .extension(extension)
                .file(file.getBytes())
                .build();
    }

    public ImageDTO mapToImageDTO(Image image, String url) {
        return ImageDTO.builder().
                url(url).
                extension(image.getExtension().name().toLowerCase()).
                name(image.getName()).
                size(image.getSize()).
                uploadDate(image.getUploadDate().toLocalDate()).
                build();
    }
}
