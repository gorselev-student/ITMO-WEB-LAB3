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
            <h2>Ввод данных</h2>
            <form id="point-form" action="${pageContext.request.contextPath}/controller" method="POST">
                <div class="input-group">
                    <label>X:</label>
                    <div class="buttons-container" id="x-buttons">
                        <c:forEach var="xVal" items="-5,-4,-3,-2,-1,0,1,2,3">
                            <button type="button" class="r-btn x-btn" value="${xVal}">${xVal}</button>
                        </c:forEach>
                    </div>
                    <input type="hidden" id="x-hidden" name="x" value="">
                </div>
                <div class="input-group">
                    <label for="y-input">Y (-3 ... 3):</label>
                    <input type="text" id="y-input" name="y" placeholder="Enter Y (-3 ... 3)">
                </div>
                <div class="input-group">
                    <label for="r-select">R:</label>
                    <select id="r-select" name="r" style="width: 100%; padding: 10px; border-radius: 4px; background: rgba(255,255,255,0.1); color: black;">
                        <c:forEach var="rVal" begin="1" end="5">
                            <option value="${rVal}" ${rVal eq sessionScope.lastR or (empty sessionScope.lastR and rVal == 5) ? 'selected' : ''}>${rVal}</option>
                        </c:forEach>
                    </select>
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
                <th>Result</th>
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