package ru.lab3;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet(name = "AreaCheckServlet", value = "/check")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        long startTime = System.nanoTime();
        double x, y, r;
        try {
            x = Double.parseDouble(request.getParameter("x"));
            y = Double.parseDouble(request.getParameter("y"));
            r = Double.parseDouble(request.getParameter("r"));
        } catch (NumberFormatException | NullPointerException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid parameters");
            return;
        }

        HttpSession session = request.getSession();
        session.setAttribute("lastR", request.getParameter("r"));

        boolean hit = false;
        if (x >= 0 && y >= 0) {
            hit = false;
        } else if (x <= 0 && y >= 0) {
            hit = (x * x + y * y <= r * r);
        } else if (x <= 0 && y <= 0) {
            hit = (x >= -r && y >= -r);
        } else if (x >= 0 && y <= 0) {
            hit = (y >= (x - r / 2.0));
        }

        String currentTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
        String executionTime = String.format("%.3f ms", (System.nanoTime() - startTime) / 1_000_000.0);
        Point point = new Point(x, y, r, hit, currentTime, executionTime);

        HttpSession sesion = request.getSession();
        HistoryBean historyBean = (HistoryBean) session.getAttribute("historyBean");
        if (historyBean == null) {
            historyBean = new HistoryBean();
        }
        historyBean.addPoint(point);
        session.setAttribute("historyBean", historyBean);
        request.setAttribute("point", point);
        request.getRequestDispatcher("/result.jsp").forward(request, response);
    }
}