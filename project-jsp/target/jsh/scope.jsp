<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<c:import url="/header.jsp"/>
<div class="wrapper">
	<h2>Scope</h2>	

<% 
	try {
		int value = (int)application.getAttribute("value");
		value = value + 2;
		application.setAttribute("value", value);
%>
<p>application value : <%= value %></p>
<%
	} catch (NullPointerException e) {
%>
<p>value 값이 설정되지 않았습니다.</p>
<%
		application.setAttribute("value", 0);
	}
%>
</div>
<c:import url="/footer.jsp"/>