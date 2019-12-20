package pl.pw.mini.zpoif.lubieplackibackend.recipe.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.RecipeRepository;

@Service
public class RecipeServiceImpl implements RecipeService {
    private RecipeRepository recipeRepository;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
}
