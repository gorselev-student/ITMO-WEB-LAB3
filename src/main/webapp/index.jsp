<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<jsp:useBean id="historyBean" class="ru.lab3.HistoryBean" scope="session"/>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Lab 3</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<div id="toast" class="toast hidden"></div>
<header id="main-header" class="glass-panel">
    <h1>Горшелев Кирилл Валерьевич</h1>
    <p>P3332, 46788</p>
</header>
<main class="container">
    <div class="content-wrapper">
        <section class="glass-panel">
            <canvas id="canvas" width="300" height="300"></canvas>
        </section>
        <section class="glass-panel">
            <h2>Enter params</h2>
            <form id="point-form" action="${pageContext.request.contextPath}/controller" method="POST">
                <div class="input-group">
                    <label for="x-input">X(-3 ... 5):</label>
                    <input type="text" id="x-input" name="x" placeholder="Enter X(-3 ... 5)">
                </div>
                <div class="input-group">
                    <label>Y:</label>
                    <div class="buttons-container" id="y-radios">
                        <c:forEach var="yVal" begin="-4" end="4" step="1">
                            <label><input type="radio" name="y" value="${yVal}"> ${yVal}</label>
                        </c:forEach>
                    </div>
                </div>
                <div class="input-group">
                    <label>R:</label>
                    <div class="buttons-container" id="r-radios">
                        <c:forEach var="rVal" items="${['1', '1.5', '2', '2.5', '3']}">
                            <label><input type="radio" name="r" value="${rVal}"> ${rVal}</label>
                        </c:forEach>
                    </div>
                </div>
                <div class="input-group">
                    <button type="submit" id="submit-btn">Check</button>
                </div>
            </form>
        </section>
    </div>
    <section class="results-section glass-panel">
        <h2>History</h2>
        <table id="results-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Результат</th>
                <th>Current server time</th>
                <th>Script working time</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach var="p" items="${historyBean.points}">
                <tr>
                    <td>${p.x}</td>
                    <td>${p.y}</td>
                    <td>${p.r}</td>
                    <td class="${p.hit ? 'hit' : 'miss'}">${p.hit ? 'Hit' : 'Miss'}</td>
                    <td>${p.currentTime}</td>
                    <td>${p.executionTime}</td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </section>
</main>
<script src="${pageContext.request.contextPath}/js/main.js"></script>
</body>
</html>