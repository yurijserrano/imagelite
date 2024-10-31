package yuri.yuriserrano.imageliteapi.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;
import yuri.yuriserrano.imageliteapi.entity.Image;
import yuri.yuriserrano.imageliteapi.enums.ImageExtension;
import yuri.yuriserrano.imageliteapi.repository.specs.GenericSpecs;

import java.util.List;

import static org.springframework.data.jpa.domain.Specification.anyOf;
import static org.springframework.data.jpa.domain.Specification.where;
import static yuri.yuriserrano.imageliteapi.repository.specs.GenericSpecs.conjunction;
import static yuri.yuriserrano.imageliteapi.repository.specs.ImageSpecs.*;

public interface ImageRepository extends JpaRepository<Image, String>, JpaSpecificationExecutor<Image> {


    /**
     * Find images by extension and name or tags like
     * @param extension
     * @param query
     * @return List of images
     *
     * SELECT * FROM images WHERE 1 = 1 AND extension = 'PNG' AND (name LIKE '%query%' OR tags LIKE '%query%')
     */
    default List<Image> findByExtensionAndNameOrTagsLike(ImageExtension extension, String query){
        // SELECT * FROM images WHERE 1 = 1
        Specification<Image> specification = where(conjunction());

        if(extension != null){
            // AND extension = 'PNG'
            specification = specification.and(extensionEqual(extension));
        }

        if(StringUtils.hasText(query)){
            // AND (name LIKE '%query%' OR tags LIKE '%query%')
            specification = specification.and(anyOf(nameLike(query), tagsLike(query)));
        }

        return findAll(specification);
    }
}
