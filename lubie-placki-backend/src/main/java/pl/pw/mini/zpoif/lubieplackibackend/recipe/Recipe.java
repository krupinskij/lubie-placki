package pl.pw.mini.zpoif.lubieplackibackend.recipe;

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
    private String text;

    public Recipe(String title, String text) {
        this.title = title;
        this.text = text;
    }

    public Recipe() {}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
