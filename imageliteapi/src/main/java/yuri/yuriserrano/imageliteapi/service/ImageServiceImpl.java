package yuri.yuriserrano.imageliteapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yuri.yuriserrano.imageliteapi.entity.Image;
import yuri.yuriserrano.imageliteapi.enums.ImageExtension;
import yuri.yuriserrano.imageliteapi.repository.ImageRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    @Override
    @Transactional
    public Image save(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public Optional<Image> getById(String id) {
        return imageRepository.findById(id);
    }

    @Override
    public List<Image> search(ImageExtension extension, String query) {
        return imageRepository.findByExtensionAndNameOrTagsLike(extension, query);
    }
}
