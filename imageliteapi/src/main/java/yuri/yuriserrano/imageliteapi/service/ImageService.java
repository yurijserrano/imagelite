package yuri.yuriserrano.imageliteapi.service;

import yuri.yuriserrano.imageliteapi.entity.Image;
import yuri.yuriserrano.imageliteapi.enums.ImageExtension;

import java.util.List;
import java.util.Optional;

public interface ImageService {
    Image save(Image image);
    Optional<Image> getById(String id);

    List<Image> search(ImageExtension extension, String query);
}
