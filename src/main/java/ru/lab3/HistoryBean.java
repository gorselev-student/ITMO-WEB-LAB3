package ru.lab3;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class HistoryBean implements Serializable {
    private List<Point> points;

    public HistoryBean() {
        this.points = new ArrayList<>();
    }

    public List<Point> getPoints() {
        return points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    public void addPoint(Point point) {
        this.points.add(point);
    }
}