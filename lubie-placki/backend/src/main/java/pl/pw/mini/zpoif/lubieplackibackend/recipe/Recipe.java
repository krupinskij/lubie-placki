package pl.pw.mini.zpoif.lubieplackibackend.recipe;

import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name="recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    @Type(type = "pl.pw.mini.zpoif.lubieplackibackend.recipe.GenericArray")
    private String[][] ingredients;

    @Column
    @Type(type = "pl.pw.mini.zpoif.lubieplackibackend.recipe.GenericArray")
    private String[] directions;

    @Column
    @Type(type = "pl.pw.mini.zpoif.lubieplackibackend.recipe.GenericArray")
    private String[] hints;

    public Recipe(String title, String description, String[][] ingredients, String[] directions, String[] hints) {
        this.title = title;
        this.description = description;
        this.ingredients = ingredients;
        this.directions = directions;
        this.hints = hints;
    }

    public Recipe() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[][] getIngredients() {
        return ingredients;
    }

    public void setIngredients(String[][] ingredients) {
        this.ingredients = ingredients;
    }

    public String[] getDirections() {
        return directions;
    }

    public void setDirections(String[] directions) {
        this.directions = directions;
    }

    public String[] getHints() {
        return hints;
    }

    public void setHints(String[] hints) {
        this.hints = hints;
    }
}
