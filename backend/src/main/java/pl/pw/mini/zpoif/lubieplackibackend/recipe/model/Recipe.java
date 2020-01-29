package pl.pw.mini.zpoif.lubieplackibackend.recipe.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pl.pw.mini.zpoif.lubieplackibackend.comment.model.Comment;
import pl.pw.mini.zpoif.lubieplackibackend.recipe.util.JsonLocalDateTimeSerializer;
import pl.pw.mini.zpoif.lubieplackibackend.user.model.User;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="recipes")
public class Recipe implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String type;

    @Column
    @JsonSerialize(using = JsonLocalDateTimeSerializer.class)
    private LocalDateTime add_date;

    @ElementCollection
    @OneToMany(mappedBy="recipe")
    private List<Ingredient> ingredients;

    @ElementCollection
    @OneToMany(mappedBy="recipe")
    private List<Direction> directions;

    @ElementCollection
    @OneToMany(mappedBy="recipe")
    private List<Hint> hints;

    @JsonIgnore
    private byte[] photo;

    @ElementCollection
    @OneToMany(mappedBy="recipe")
    private List<Tag> tags;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ElementCollection
    @OneToMany(mappedBy = "recipe")
    @JsonIgnore
    private List<Rating> ratings;

    @ElementCollection
    @OneToMany(mappedBy = "recipe")
    @JsonIgnore
    private List<Comment> comments;

    public Recipe() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getAdd_date() {
        return add_date;
    }

    public void setAdd_date(LocalDateTime add_date) {
        this.add_date = add_date;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public List<Direction> getDirections() {
        return directions;
    }

    public void setDirections(List<Direction> directions) {
        this.directions = directions;
    }

    public List<Hint> getHints() {
        return hints;
    }

    public void setHints(List<Hint> hints) {
        this.hints = hints;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Rating> getRatings() {
        return ratings;
    }

    public void setRatings(List<Rating> ratings) {
        this.ratings = ratings;
    }

    public double getAverageRating() {
        double average = 0;
        double count = 0;

        for(Rating rating: ratings) {
            average+=rating.getRating();
            count++;
        }

        if(count!=0) average/=count;

        return average;
    }

    public double getCountRating() {
        return ratings.size();
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
