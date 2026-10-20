<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<jsp:useBean id="point" class="ru.lab3.Point" scope="request"/>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Result</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
</head>
<body>
<main class="container">
    <section class="results-section glass-panel" style="margin-top: 50px; text-align: center;">
        <h2>Check Result</h2>
        <table id="results-table" style="margin-bottom: 20px;">
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>X</td>
                    <td><jsp:getProperty name="point" property="x"/></td>
                </tr>
                <tr>
                    <td>Y</td>
                    <td><jsp:getProperty name="point" property="y"/></td>
                </tr>
                <tr>
                    <td>R</td>
                    <td><jsp:getProperty name="point" property="r"/></td>
                </tr>
                <tr>
                    <td>Result</td>
                    <td class="${point.hit ? 'hit' : 'miss'}">
                        ${point.hit ? 'Hit' : 'Miss'}
                    </td>
                </tr>
                <tr>
                    <td>Server Time</td>
                    <td>${point.currentTime}</td>
                </tr>
                <tr>
                    <td>Execution Time</td>
                    <td>${point.executionTime}</td>
                </tr>
            </tbody>
        </table>
        <a href="${pageContext.request.contextPath}/controller" style="color: #44bd32; text-decoration: none; font-weight: bold;">
            Back to Form
        </a>
    </section>
</main>
</body>
</html>